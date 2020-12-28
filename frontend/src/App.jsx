import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NavBar } from './cmps/NavBar';
import { Footer } from './cmps/Footer';
import { FoodApp } from './pages/FoodApp';
import { UserDetails } from './pages/UserDetails';
import { Chefs } from './pages/Chefs';
import { ReservationPage } from './pages/ReservationPage';
import { SignUp } from './pages/SignUp';

import {Chat} from './pages/Chat'

function App() {

  return (
    <div className="app-wrapper">
      <NavBar />
      <Switch>
        <Route component={ReservationPage} path='/reservations' />
        <Route component={UserDetails} path='/details/:userId' />
        <Route component={ Chat } path="/chat" exact />
        <Route component={Chefs} path='/chef' />
        <Route component={ SignUp } exact path="/signup"  />
        <Route component={FoodApp} path='/' />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;