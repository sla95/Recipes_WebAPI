import { Layout } from 'antd';
import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Nav from './components/nav';
import Home from './components/home';
import Account from './components/account';
import Login from './components/login';
import Post from './components/post';
import Register from './components/register';
import Recipe from './components/createrecipe';

import UserContext from './contexts/user';

const { Header, Content, Footer } = Layout;

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: {loggedIn: false}
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(user) {
    console.log("User is now being set on the context");
    user.loggedIn = true;
    this.setState({user:user});
  }

  logout() {
    console.log("Removing user from the app context");
    this.setState({user: {loggedIn:false}});
  }

  render(){
    const context = {
      user: this.state.user,
      login: this.login,
      logout: this.logout
    };

    return (
      <UserContext.Provider value={context}>
        <Router>
          <Header>
            <Nav />
          </Header>
          
          <Content>
            <Switch>
              <Route path="/account" children={<Account />} />
              <Route path="/login" children={<Login />} />
              <Route path="/register" children={<Register />} />
              <Route path="/createrecipe" children={<Recipe />} />
              <Route path="/post/:id" children={<Post />} />
              <Route path="/" children={<Home />} exact />
            </Switch>
          </Content>

          <Footer style={{ textAlign: 'center' }}>Created a Recipes API for the Web API Development Coursework</Footer>

        </Router>
      </UserContext.Provider>  
    );
  }
}

export default App;

// navigation bar and its contents