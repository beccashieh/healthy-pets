import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';
import Navbar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './components/Login';
import LogOut from './components/LogOut';
import React, { Component } from "react"
import "./App.css"
import firebase from "firebase"
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth"

firebase.initializeApp({
  apiKey: "AIzaSyDz36s2csIU48ULaVEKGENh81pCUvYCVBk",
  authDomain: "healthy-pets-32ee4.firebaseapp.com"
})

class App extends Component {
  // constructor(props) {
  //   super(props);

  // }
  state = { isSignedIn: false }

  componentDidMount = () => {
    console.log(this.state.isSignedIn)
  };

  signInSuccess = () => {
    this.setState({ isSignedIn: true })
  };
  // uiConfig = {
  //   signInFlow: "popup",
  //   signInOptions: [
  //     firebase.auth.FacebookAuthProvider.PROVIDER_ID,
  //     firebase.auth.EmailAuthProvider.PROVIDER_ID
  //   ],
  //   callbacks: {
  //     signInSuccess: () => false
  //   }
  // }

  // componentDidMount = () => {
  //   firebase.auth().onAuthStateChanged(user => {
  //     this.setState({ isSignedIn: !!user })
  //     console.log("user", user)
  //   })
  // }




  render() {
    return (
      <Router>
        <div className="App">

          <span>
            <Navbar isSignedIn={this.state.isSignedIn} />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/profile" component={Profile} />
              <Route path="/logout" component={LogOut} />
              {/* <button onClick={() => firebase.auth().signOut()}>Sign out!</button> */}
              <Route path="/login" component={Login} successfulSignin={this.successfulSignin} />
              {/* <StyledFirebaseAuth
                    uiConfig={this.uiConfig}
                    firebaseAuth={firebase.auth()}
                  /> */}
              <Route component={Home} />
            </Switch>
          </span>
        </div>
      </Router>
    )
  }
}

export default App














  // render() {
  //   return (
  //     <Router>
  //         <div className="App">
  //           <Navbar />
  //           <div className="container">
  //             <Route path="/" exact={true} component={Home} />
  //             <SecureRoute path="/profile" exact={true} component={Profile} />
  //             <Route
  //               path="/login"
  //               render={() => (
  //                 <Login baseUrl="https://dev-217893.okta.com" />
  //               )}
  //             />
  //             <Route path="/implicit/callback" component={ImplicitCallback} />
  //           </div>
  //         </div>
  //     </Router>
  //   );
  // }
// }

// export default App;
