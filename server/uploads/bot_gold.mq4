#include <Zmq/Zmq.mqh>

// Global Variables
int ZMQ_SOCKET_TIMEOUT = 10000000; // Timeout for socket operations in milliseconds
input int RSI_Period = 14;
input int EMA_Period = 100;
input double LotSize = 0.1;
ulong lastClosedOrderTicket = 0; // ประกาศตัวแปรเพื่อเก็บ ticket ของออเดอร์ล่าสุดที่ปิด
bool dataSent = false; // ประกาศตัวแปรเพื่อเก็บสถานะการส่งข้อมูล

// กำหนดตัวแปรสำหรับเก็บราคา
double lastEMA;
double lastRSI;

// Context for ZeroMQ
Context zmqContext("price_volume_time_publisher");

void OnTick()
{
    // Send price data to Python and receive predictions
    SendPriceDataToPython();

    // Wait for order close data from Python
    WaitForOrderCloseData();
    
}

// Function to wait for order close data from Python
void WaitForOrderCloseData()
{
    // Context for ZeroMQ
    Context context("price_volume_time_publisher");

    // Get account balance, equity, and the latest closed order
    double balance = AccountBalance();
    double equity = AccountEquity();
    double profit = AccountProfit();
    int ordersCount = OrdersHistoryTotal();  // Total number of closed orders
    int userLogin = AccountInfoInteger(ACCOUNT_LOGIN);
    
    string userLoginStr = IntegerToString(userLogin);

    // Prepare JSON data to send to Node.js
    string jsonData = StringFormat("{\"balance\":%f, \"equity\":%f, \"userLogin\":%s", balance, equity, userLoginStr);
   
    // Select the latest closed order
    if (ordersCount > 0)
    {
        if (OrderSelect(ordersCount - 1, SELECT_BY_POS, MODE_HISTORY)) // Select the last closed order
        {
            ulong ticket = OrderTicket();
            double orderProfit = OrderProfit();
            string symbol = OrderSymbol(); // Get symbol of the latest closed order

            // Check if the current closed order is the last closed order
            if (ticket != lastClosedOrderTicket)
            {
                jsonData += StringFormat(", \"order\":{\"ticket\":%lu, \"profit\":%f}, \"symbol\":\"%s\"", ticket, orderProfit, symbol);
                jsonData += StringFormat(", \"profit\":%f}", orderProfit); // Add order profit to JSON data

                // If data has been sent previously, reset the flag to allow sending again
                if (dataSent)
                {
                    dataSent = false;
                }

                // Update the last closed order ticket
                lastClosedOrderTicket = ticket;
            }
        }
        else
        {
            jsonData += "}"; // Close JSON object if no closed orders found
        }
    }
    else
    {
        jsonData += "}"; // Close JSON object if no closed orders found
    }

    // Create a ZeroMQ socket
    Socket socket(context, ZMQ_REQ);

    // Connect to the Node.js server
    if (!socket.connect("tcp://localhost:8000"))
    {
        Print("Failed to connect to Node.js server. Error code: ", zmq_errno());
        return;
    }

    // Send JSON data to Node.js if data has not been sent after a closed order
    if (!dataSent)
    {
        ZmqMsg message(jsonData);
        if (!socket.send(message))
        {
            Print("Failed to send data to Node.js. Error code: ", zmq_errno());
            return;
        }

        // Display message in Terminal
        Print("Sent message to Node.js:", jsonData);

        // Set dataSent to true to indicate that data has been sent
        dataSent = true;
    }
}


// Function to send price data to Python and receive predictions
void SendPriceDataToPython()
{
    // Fetching close prices from last 3 bars
    double closePrice1 = iClose(NULL, PERIOD_M15, 1);
    double closePrice2 = iClose(NULL, PERIOD_M15, 2);
    double closePrice3 = iClose(NULL, PERIOD_M15, 3);
    double closePrice4 = iClose(NULL, PERIOD_M15, 4);
    double closePrice5 = iClose(NULL, PERIOD_M15, 5);

    // Get current datetime
    datetime currentTime = TimeCurrent();

    // Prepare JSON data to send to Python
    string jsonData = StringFormat("{\"closePrice1\":%f, \"closePrice2\":%f, \"closePrice3\":%f, \"closePrice4\":%f, \"closePrice5\":%f, \"datetime\": %d}", closePrice1, closePrice2, closePrice3, closePrice4, closePrice5, currentTime);

    // Create a ZeroMQ socket
    Socket zmqSocket(zmqContext, ZMQ_REQ);

    

    // Connect to the Python server
    if (!zmqSocket.connect("tcp://localhost:8001"))
    {
        Print("Failed to connect to Python server. Error code: ", zmq_errno());
        return;
    }

    // Send JSON data to Python
    ZmqMsg message(jsonData);
    if (!zmqSocket.send(message))
    {
        Print("Failed to send price data to Python. Error code: ", zmq_errno());
        return;
    }

    // Receive predicted close price from Python
    ZmqMsg reply;
    if (!zmqSocket.recv(reply))
    {
        Print("Failed to receive reply from Python. Error code: ", zmq_errno());
        return;
    }

    // Extract received data from Python
    string receivedMessage = reply.getData();
    double predictedClosePrice = StringToDouble(receivedMessage);

    // Print predicted close price and current close price from the chart
    Print("Predicted Close: ", predictedClosePrice, " Close: ", iClose(NULL, 0, 1));
    

    double currentEMA = iMA(NULL, 0, EMA_Period, 0, MODE_EMA, PRICE_CLOSE, 0);
    double currentRSI = iRSI(NULL, 0, RSI_Period, PRICE_CLOSE, 0);
    double currentPrice = Bid;

    // เช็คเงื่อนไขเพื่อเปิดออเดอร์ Buy
    if (currentRSI < 30 && lastRSI >= 30 && currentPrice > currentEMA && currentPrice < predictedClosePrice)
    {
        // เปิดออเดอร์ Buy
        OrderSend(Symbol(), OP_BUY, LotSize, Ask, 3, 0, 0, "Buy Order", 0, 0, clrNONE);
    }

    // เช็คเงื่อนไขเพื่อปิดออเดอร์ Buy
    if (currentRSI >= 70 && lastRSI < 70)
    {
        // ปิดทุกออเดอร์ Buy ที่เปิดอยู่
        CloseAllOrders(OP_BUY);
    }

    // เช็คเงื่อนไขเพื่อเปิดออเดอร์ Sell
    if (currentRSI > 70 && lastRSI <= 70 && currentPrice < currentEMA && currentPrice > predictedClosePrice)
    {
        // เปิดออเดอร์ Sell
        OrderSend(Symbol(), OP_SELL, LotSize, Bid, 3, 0, 0, "Sell Order", 0, 0, clrNONE);
    }

    // เช็คเงื่อนไขเพื่อปิดออเดอร์ Sell
    if (currentRSI <= 30 && lastRSI > 30)
    {
        // ปิดทุกออเดอร์ Sell ที่เปิดอยู่
        CloseAllOrders(OP_SELL);
    }

    // อัปเดตค่าของ lastEMA และ lastRSI
    lastEMA = currentEMA;
    lastRSI = currentRSI;
}

// Function to close all orders of the specified command
void CloseAllOrders(int cmd)
{
    for (int i = OrdersTotal() - 1; i >= 0; i--)
    {
        if (OrderSelect(i, SELECT_BY_POS) && OrderType() == cmd)
        {
            OrderClose(OrderTicket(), OrderLots(), OrderClosePrice(), 3, clrNONE);
        }
    }
}
