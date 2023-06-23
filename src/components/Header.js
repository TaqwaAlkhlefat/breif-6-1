import React from 'react';
import { NavLink, BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUpForm from './sign_up';

function Header() {
    return (
      <>
   
        <nav class="navbar navbar-default navbar-fixed-top">
          <div class="container">
            <div class="navbar-header">
              <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>                        
              </button>
              <NavLink class="navbar-brand" to="#myPage">Logo</NavLink>
            </div>
            <div class="collapse navbar-collapse" id="myNavbar">
              <ul class="nav navbar-nav navbar-right">
                <li><NavLink to="/">ABOUT</NavLink></li>
                <li><NavLink to="/ContractList">ContractList</NavLink></li>
                <li><NavLink to="/Main">Main</NavLink></li>
                <li><NavLink to="/Values">Values</NavLink></li>
                <li><NavLink to="/Features">Features</NavLink></li>
                <li><NavLink to='/sign_up'> sign up</NavLink> </li>
               
              </ul>
            </div>
          </div>
        </nav>
      

       
      </>
    );
  }
  
  export default Header;
  