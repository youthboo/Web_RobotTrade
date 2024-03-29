#include <Zmq/Zmq.mqh>

// Global Variables
int ZMQ_SOCKET_TIMEOUT = 10000000; // Timeout for socket operations in milliseconds
input int RSI_Period = 14;
input int EMA_Period = 100;
input double LotSize = 0.1;

// กำหนดตัวแปรสำหรับเก็บราคา
double lastEMA;
double lastRSI;

//+------------------------------------------------------------------+
//| Expert initialization function                                   |
//+------------------------------------------------------------------+
int OnInit()
{
    return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Expert deinitialization function                                 |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
}

//+------------------------------------------------------------------+
//| Expert tick function                                             |
//+------------------------------------------------------------------+
void OnTick()
{
    // Context for ZeroMQ
    Context context("price_volume_time_publisher");

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
    Socket socket(context, ZMQ_REQ);

    // Connect to the Python server
    if (!socket.connect("tcp://localhost:5555"))
    {
        Print("Failed to connect to Python server. Error code: ", zmq_errno());
        return;
    }

    // Send JSON data to Python
    ZmqMsg message(jsonData);
    if (!socket.send(message))
    {
        Print("Failed to send price data to Python. Error code: ", zmq_errno());
        return;
    }

    // Receive predicted close price from Python
    ZmqMsg reply;
    if (!socket.recv(reply))
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
   if(currentRSI < 30 && lastRSI >= 30 && currentPrice > currentEMA && currentPrice < predictedClosePrice)
   {
      // เปิดออเดอร์ Buy
      OrderSend(Symbol(), OP_BUY, LotSize, Ask, 3, 0, 0, "Buy Order", 0, 0, clrNONE);
   }
   
   // เช็คเงื่อนไขเพื่อปิดออเดอร์ Buy
   if(currentRSI >= 70 && lastRSI < 70)
   {
      // ปิดทุกออเดอร์ Buy ที่เปิดอยู่
      CloseAllOrders(OP_BUY);
   }
   
   // เช็คเงื่อนไขเพื่อเปิดออเดอร์ Sell
   if(currentRSI > 70 && lastRSI <= 70 && currentPrice < currentEMA && currentPrice > predictedClosePrice)
   {
      // เปิดออเดอร์ Sell
      OrderSend(Symbol(), OP_SELL, LotSize, Bid, 3, 0, 0, "Sell Order", 0, 0, clrNONE);
   }
   
   // เช็คเงื่อนไขเพื่อปิดออเดอร์ Sell
   if(currentRSI <= 30 && lastRSI > 30)
   {
      // ปิดทุกออเดอร์ Sell ที่เปิดอยู่
      CloseAllOrders(OP_SELL);
   }
   
   // อัปเดตค่าของ lastEMA และ lastRSI
   lastEMA = currentEMA;
   lastRSI = currentRSI;
   
   Sleep(1000);
   
}

// ฟังก์ชันสำหรับปิดทุกออเดอร์ของรหัสคำสั่งที่กำหนด
void CloseAllOrders(int cmd)
{
   for(int i=OrdersTotal()-1; i>=0; i--)
   {
      if(OrderSelect(i, SELECT_BY_POS) && OrderType() == cmd)
      {
         OrderClose(OrderTicket(), OrderLots(), OrderClosePrice(), 3, clrNONE);
      }
   }
}