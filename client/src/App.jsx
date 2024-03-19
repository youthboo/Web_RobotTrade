import './styles.css';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/Trade';
import Portfolio from './routes/Portfolio';
import Payment from './routes/Payment';
import Signup from './components/Signup/index';
import Login from './components/Login/index';
import Dash from './components/Admin/Dashboard';
import Summary from './components/Admin/Summary';
import UserList from './components/Admin/UserList';
import Model from './components/Admin/Model';
import UserPort from './components/Page/UserPort';
import BotConnect from './components/Page/BotConnect';
import UserPayment from './components/Page/UserPayment';

function App() {
  
  const user = localStorage.getItem('token');
  const isAdmin = user ? JSON.parse(user).isAdmin : false; // ตรวจสอบว่าผู้ใช้เป็น admin หรือไม่

  return (
    <div className='App'>
      <Routes>
        {user ? <Route path='/' element={<Home />} /> : null}
        <Route path='/' element={<Home />}/>
        <Route path='/trade' element={<About />}/>
        {!user && <Route path='/trade/botConnect' element={<Navigate to="/signup" />} />}
        <Route path='/trade/botConnect' element={<BotConnect />}/>
        <Route path='/portfolio' element={<Portfolio />}/>
        {!user && <Route path='/portfolio/userPort' element={<Navigate to="/signup" />} />}
        <Route path='/portfolio/userPort' element={<UserPort />}/>
        <Route path='/payment' element={<Payment />}/>
        {!user && <Route path='/payment/userPayment' element={<Navigate to="/signup" />} />}
        <Route path='/payment/userPayment' element={<UserPayment />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>

        {isAdmin && (
          <>
            <Route path='/admin' element={<Dash />} />
            <Route path='/admin/summary' element={<Summary />} />
            <Route path='/admin/userlist' element={<UserList />} />
            <Route path='/admin/model' element={<Model />} />
          </>
        )}

      </Routes>
    </div>
  );
}

export default App;