import React from 'react';
import { HashRouter as Router, Route, Routes, Switch } from 'react-router-dom'
import { AppHeader } from './cmps/AppHeader';
import { SideBar } from './cmps/SideBar';
import { CategoryPage } from './views/CategoryPage';
import { HomePage } from './views/HomePage';
import { StationDetails } from './views/StationDetails';
import { LoginSignup } from './views/LoginSignup';
import { BottomNav } from './cmps/BottomNav'
import { UserAlert } from './cmps/UserAlert'

function App() {

  return (
    <Router>
      <AppHeader />
      <SideBar />
      {/* <div className='placeholder'></div> */}
      <Routes>
        <Route path="/playlist/:id" element={<StationDetails />} />
        <Route path="/playlist" element={<StationDetails />} />
        <Route path="/login" element={<LoginSignup />} />
        <Route path="/login/signup" element={<LoginSignup />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<CategoryPage />} />
      </Routes>
      <BottomNav />
      <UserAlert />
    </Router>
  );
}

export default App;