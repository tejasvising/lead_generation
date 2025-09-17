import React ,{useEffect,useLayoutEffect} from 'react';

import logo from './logo.svg';
import "@fontsource/outfit"; // Defaults to weight 400
import "@fontsource/outfit/400.css"; 

import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Tabs from './components/Tabs';
import LeadsTab from './components/LeadsTab';
import DialerTab from './components/DialerTab';
import DialerSetup from './components/DialerSetup';
import MainLayout from './components/MainLayout';
import Dashboard from './components/Dashboard';
import PyramidChart from './components/PyramidChart'
//import { Dashboard } from '@mui/icons-material';

function App() {
  useLayoutEffect(() => {
    console.log('useLayoutEffect!!!!')
    var a = window.parent.document.getElementById("blankp1_bp_Ext9bp_title_Ext9");
    if(a!=null)a.style.display="none";
  }, []);
  return (
    <Router>
    <Routes>
        {/* <Route path='/' element={<Home />}/> */}
        <Route path='/' element={<><Navbar/><Dashboard/></>}/>
        <Route path='/application' element={<><Navbar/><LeadsTab/></>}/>
        <Route path='/dialCall' element={<><Navbar/><DialerSetup/></>}/>
        <Route path='/report' element={<><Navbar/><MainLayout/></>}/>
        <Route path='/pyramid' element={<><Navbar/><PyramidChart/></>}/>
        {/* <Route path='/triggerschecker' element={<><Navbar/><Checker/></>}/>
        <Route path='/triggersapprover' element={<><Navbar/><Approver/></>}/>
        <Route path="/customer-details/:id" element={<CustomerDetailsPage />} />
        <Route path='/checker' element={<><Navbar/><Checker/></>}/>
        <Route path='/approver' element={<><Navbar/><Approver/></>}/>
        <Route path='/rmoverdue' element={<Home />}/>
        <Route path='/rmupcoming' element={<Home />}/>
        <Route path='/showall' element={<Home />}/>
        <Route path="/customer-details-ibps/:id" element={<CustomerIBPS />} /> */}
   </Routes>
   </Router>
  );
}

export default App;
