// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./login";
import Signup from "./signup";
import ForgotPassword from "./forgotpass";
import Home from "./Home";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import LearnMore from "./LearnMore";
import AboutUs from "./Aboutus";
import Exercise from "./Exercise";
import Tutorial from "./Tutorial";
import Contact from "./Contact";
import  BootstrapTutorial  from "./Bootstrap";
import JavaTutorial from "./Java";
import CSharpTutorial from "./csharp";
import PythonTutorial from "./Python";
import CppTutorial from "./C++";
import CTutorial from "./c";
import CSSTutorial from "./CSS";
import HTMLTutorial from "./HTML";
import JavaScriptTutorial from "./Javascript";
import PHPTutorial from "./PHP";
import JQueryTutorial from "./JQuery";
import MySQLTutorial from "./MySQL";
import DjangoTutorial from "./DJango";
import NodeTutorial from "./Node";
import ReactTutorial from "./React";
import User from "./User";
import LearnMorePage from "./LearnMorePage";
import ContactPage from "./ContactPage";
import AboutUsPage from "./AboutPage"
import Profile from "./profile";

const App = () => {
  const [user] = useAuthState(auth);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home /> } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/Home" element={user ? <Home /> : <Navigate to="/" />} /> 
        <Route path="/learnmore" element={<LearnMore />} />
        <Route path="/Tutorial" element={<Tutorial />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Aboutus" element={<AboutUs />} />
        <Route path="/User" element={<User />} />
        <Route path="/Exercise" element={<Exercise />} />
        <Route path="/Bootstrap" element={<BootstrapTutorial />} />
        <Route path="/Java" element={<JavaTutorial />} />
        <Route path="/csharp" element={<CSharpTutorial />} />
        <Route path="/Python" element={<PythonTutorial />} />
        <Route path="/C++" element={<CppTutorial />} />
        <Route path="/c" element={<CTutorial />} />
        <Route path="/CSS" element={<CSSTutorial />} />
        <Route path="/HTML" element={<HTMLTutorial />} />
        <Route path="/Javascript" element={<JavaScriptTutorial />} />
        <Route path="/PHP" element={<PHPTutorial />} />
        <Route path="/JQuery" element={<JQueryTutorial />} />
        <Route path="/MySQL" element={<MySQLTutorial />} />
        <Route path="/DJango" element={<DjangoTutorial />} />
        <Route path="/Node" element={<NodeTutorial />} />
        <Route path="/React" element={<ReactTutorial />} />
        <Route path="/LearnMorePage" element={<LearnMorePage />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/AboutUsPage" element={<AboutUsPage />} />
        
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;