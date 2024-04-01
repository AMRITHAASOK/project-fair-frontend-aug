
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Pages/Home';
import Dashboard from './Pages/Dashboard';
import PageNotFound from './Pages/PageNotFound';
import Project from './Pages/Project';
import Auth from './Pages/Auth';
function App() {
  return (
    <div className="App">
    
     <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Auth/>}/>
        <Route path='/register' element={<Auth register/>}/>
        <Route path='/dashboard' element={<Dashboard/>} />
        <Route path='/project' element={<Project/>}/>
        <Route path='*' element={<PageNotFound/>}/>
     </Routes>
     <Footer/>
    </div>
  );
}

export default App;
