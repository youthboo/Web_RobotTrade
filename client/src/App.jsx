import './styles.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './routes/Home';
import About from './routes/Trade';
import Service from './routes/Portfolio';
import Contact from './routes/Contact';
import Signup from './components/Signup/index';
import Login from './components/Login/index';
import Dash from './components/Admin/Dashboard'
import Summary from './components/Admin/Summary';
import UserList from './components/Admin/UserList';
import Model from './components/Admin/Model';
import EditUser from './components/Admin/EditUser';

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
        <Route path='/admin' element={<Dash />}/>
          <Route path="/admin/summary" element={<Summary/>} />
          <Route path="/admin/userlist" element={<UserList/>} />
          <Route path="/admin/model" element={<Model/>} />
          <Route path="/admin/users/:id/edit" element={<EditUser />} />

      </Routes>

    </div>
  );
}

export default App
