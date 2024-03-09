const UserPort = () => {
  const [mt4Data, setMt4Data] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userLogin, setUserLogin] = useState('');
  const [showData, setShowData] = useState(false); 
  const [currentMonthData, setCurrentMonthData] = useState([]); // เก็บข้อมูลของเดือนปัจจุบัน

  useEffect(() => {
      if (showData) {
          fetchData(); 
      }
  }, [showData]);

  useEffect(() => {
      // เมื่อเริ่มเดือนใหม่ (วันที่ 1) ให้ล้างข้อมูลของเดือนเก่าทิ้งและคำนวณ profit และ commission payment ใหม่
      const currentDate = new Date();
      if (currentDate.getDate() === 1) {
          setCurrentMonthData([]);
      }
  }, []);

  const handleLoginChange = (event) => {
      setUserLogin(event.target.value);
  };

  const handleButtonClick = () => {
      setShowData(true); 
  };

  const fetchData = async () => {
      try {
          setLoading(true);
          const response = await axios.get('http://localhost:5555/api/mt4data');
          setMt4Data(response.data);
          setCurrentMonthData(response.data); // เมื่อมีการ fetch ข้อมูลใหม่ให้เซ็ตข้อมูลของเดือนปัจจุบันด้วย
      } catch (error) {
          console.error('Error fetching MT4 data:', error);
      } finally {
          setLoading(false);
      }
  };

  // คำนวณ profit และ commission payment จากข้อมูลของเดือนปัจจุบัน
  const totalProfit = currentMonthData.reduce((total, data) => total + data.profit, 0);
  const commissionPayment = parseFloat((totalProfit * 0.07).toFixed(2));

  return (
      <div>
          <h1 className='topic'>My Portfolio</h1>
          <div className="input-container">
              <label htmlFor="loginInput">Enter your Port Number</label>
              <input 
                  className='input-portnum'
                  type="text" 
                  id="loginInput" 
                  value={userLogin} 
                  onChange={handleLoginChange} 
              />
              <button className='btn-showdata' onClick={handleButtonClick}>Show Data</button>
          </div>
          {showData && !loading && (
              <div>
                  <p>Total Profit: {totalProfit.toFixed(2)}</p>
                  <p>Commission Payment: {commissionPayment.toFixed(2)}</p>
                  <table>
                      <thead>
                          <tr>
                              <th>User Login</th>
                              <th>Balance</th>
                              <th>Equity</th>
                              <th>Profit</th>
                              <th>Symbol</th>
                          </tr>
                      </thead>
                      <tbody>
                          {currentMonthData.map(data => (
                              <tr key={data._id}>
                                  <td>{data.userLogin}</td>
                                  <td>{data.balance}</td>
                                  <td>{data.equity}</td>
                                  <td>{data.profit.toFixed(2)}</td>
                                  <td>{data.symbol}</td>
                              </tr>
                          ))}
                      </tbody>
                  </table>
              </div>
          )}
      </div>
  );
};

export default UserPort;
