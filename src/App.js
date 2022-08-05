import './App.css';
import Home from './components/Home'
import Login from './components/Login'
import { Routes, Route } from "react-router-dom";
import Addword from './components/Addword'
import PrivacyPolicy from './components/PrivacyPolicy';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/addword' element={<Addword />} />
        <Route path='/privacy-policy' element={<PrivacyPolicy />} />
        <Route path='/admin' element={<AdminPanel/>} />
        <Route path="/admin-login" element={<AdminLogin/>}/>
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
