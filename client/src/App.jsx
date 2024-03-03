import './styles.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './routes/Home';
import About from './routes/Trade';
import Service from './routes/Portfolio';
import Contact from './routes/Contact';
import Signup from './components/Signup/index';
import Login from './components/Login/index';
import AppAdmin from './components/Admin/AppAdmin';
import Dashboard from './components/Admin/Dashboard';

function App() {
  
  const user = localStorage.getItem('token')
  return (
    <div className='App'>
      <Routes>
        {user ? <Route path='/' element={<Home />} /> : null}
        <Route path='/' element={<Home />}/>
        <Route path='/trade' element={<About />}/>
        <Route path='/portfolio' element={<Service />}/>
        <Route path='/aboutus' element={<Contact />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/admin' element={<AppAdmin />}/>
        <Route path='/admin/dashboard' element={<Dashboard />}/>
      </Routes>

    </div>
  );
}

export default App
