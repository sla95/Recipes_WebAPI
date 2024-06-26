import React from 'react';
import {useContext} from 'react';
import { Menu } from 'antd';
import { Link } from "react-router-dom";
import UserContext from '../contexts/user';

function Nav(props) {
  const context = useContext(UserContext);
  const loggedIn = context.user.loggedIn;
  console.log(context);
  let LoginNav;
  if (!loggedIn) {
    LoginNav = (
      <>
      <Menu.Item key="2">
        <Link to="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="4">
        <Link to="/login">Login</Link>
      </Menu.Item>
      </>
    )
  } else {
    LoginNav = (
      <>
      <Menu.Item key="2"><Link to="/account">Account</Link></Menu.Item>
      <Menu.Item key="3"><Link to="/createrecipe">Create Recipe</Link></Menu.Item>
      <Menu.Item key="4" onClick={context.logout}>
        <Link to="/">Logout</Link>
      </Menu.Item>
      </>
    )
  }
  return (
    <>
    <div className="logo" />
    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
      <Menu.Item key="1"><Link to="/">Home</Link></Menu.Item>
      {LoginNav}
    </Menu>
    </>
  );
}

export default Nav;

// enabling the navigation bar to direct a user to the required page