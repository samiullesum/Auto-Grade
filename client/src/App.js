import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import './index.css';

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";


import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register/Register";
import Login from "./components/auth/Login/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import Header from './components/Header';
import Quizes from './components/assessments/Quiz/Quizes';
import Assignments from './components/assessments/Assignment/Assignments';
import Projects from './components/assessments/Project/Project';
import Midterm from './components/assessments/Midterm/Midterm';
import Final from './components/assessments/Final/Final';
import UploadQuizes from './components/assessments/Quiz/UploadQuiz';
import UploadAssignments from './components/assessments/Assignment/UploadAssignment';
import UploadProject from './components/assessments/Project/UploadProject';
import UploadMidterm from './components/assessments/Midterm/UploadMidterm';
import UploadFinal from './components/assessments/Final/UploadFinal';
import CreateCourse from './components/createCourse/CreateCourse';

import Grades from './components/generateFinalGrade/Grades';

import "./App.css";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/quizes/:course/:section" component={Quizes} />
              <PrivateRoute exact path="/assignments/:course/:section" component={Assignments} />
              <PrivateRoute exact path="/projects/:course/:section" component={Projects} />
              <PrivateRoute exact path="/midterm/:course/:section" component={Midterm} />
              <PrivateRoute exact path="/final/:course/:section" component={Final} />
              <PrivateRoute exact path="/upload-quiz-marks" component={UploadQuizes} />
              <PrivateRoute exact path="/upload-assignment-marks" component={UploadAssignments} />
              <PrivateRoute exact path="/upload-project-marks" component={UploadProject} />
              <PrivateRoute exact path="/upload-midterm-marks" component={UploadMidterm} />
              <PrivateRoute exact path="/upload-final-marks" component={UploadFinal} />
              <PrivateRoute exact path="/create-course" component={CreateCourse} />

              <PrivateRoute exact path="/generate-grades/:course/:section" component={Grades} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
