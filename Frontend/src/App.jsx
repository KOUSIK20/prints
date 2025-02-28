import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css'; 
import PricingComponent from './PricingComponent';
import AuthPage from './AuthPage';
import Payment from './Payment';
import { Mainpage } from './Mainpage';
import Parts from './Parts';
import PrintPage from './PrintPage';
import AssemblePrint from './AssemblePrint';

function App() {
  
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/pricing" element={<PricingComponent />} /> 
        <Route path="/payment" element={<Payment/>}/>
        <Route path='/Home' element={<Mainpage/>}/>
        <Route path='/part' element={<Parts/>}/>
        <Route path='/print' element={<PrintPage/>}/>
        <Route path='/printpage' element={<AssemblePrint/>}/>
      </Routes>
    </Router>
  );
}

export default App;
