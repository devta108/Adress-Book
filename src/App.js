import React, { useReducer, useEffect } from "react";

import { Container, Col, Row } from "reactstrap";

// react-router-dom3
import { BrowserRouter as Router, Navigate, Route, Link } from "react-router-dom";

// react toastify stuffs
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// firebase stuffs
//TODO: import firebase config and firebase database

// components
import AddContact from "./Pages/AddContact";
import Contacts from "./Pages/Contacts";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import ViewContact from "./Pages/ViewContact";
import PageNotFound from "./Pages/PageNotFound";

// context api stuffs
//TODO: import reducers and contexts
import { ContactContext } from "./Context/Context";
import reducer fr;

//initlizeing firebase app with the firebase config which are in ./utils/firebaseConfig
//TODO: initialize FIREBASE

// first state to provide in react reducer
const initialState = {
  contacts: [],
  contact: {},
  contactToUpdate: null,
  contactToUpdateKey: null,
  isLoading: false
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // will get contacts from firebase and set it on state contacts array
  const getContacts = async () => {
    // TODO: load existing data
  };

  // getting contact  when component did mount
  useEffect(() => {
    //FIXME: call methods if needed
  }, []);

  return (
    <Router>
      {/* FIXME: Provider is not configured */}
      <ContactContext.Provider>
        <ToastContainer />
        <Header />
        <Container>
          <Navigate>
            <Route exact path="/contact/add" component={AddContact} />
            <Route exact path="/contact/view" component={ViewContact} />
            <Route exact path="/" component={Contacts} />
            <Route exact path="*" component={PageNotFound} />
          </Navigate>
        </Container>

        <Footer />
      </ContactContext.Provider>
    </Router>
  );
};

export default App;
