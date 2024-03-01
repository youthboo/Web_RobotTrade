import './styles.css'
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from './routes/Home';
import About from './routes/Trade';
import Service from './routes/Service';
import Contact from './routes/Contact';
import Signup from './components/Signup/index';
import Login from './components/Login/index';

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
        <Route path='/signup' exact element={<Signup />}/>
        <Route path='/login' exact element={<Login />}/>

        
      </Routes>

    </div>
  );
}

export default App
