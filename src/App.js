import React, { useReducer, useEffect } from "react";

import { Container, Col, Row } from "reactstrap";

// react-router-dom3
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

// react toastify stuffs
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// bootstrap css
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// firebase stuffs
//TODO: import firebase config and firebase database
import {firebaseConfig} from "./Utils/config";
import firebase from "firebase/compat/app";
import "firebase/storage";
import "firebase/compat/database";
// components
import AddContact from "./Pages/AddContact";
import Contacts from "./Pages/Contacts";
import Header from "./Layouts/Header";
import Footer from "./Layouts/Footer";
import ViewContact from "./Pages/ViewContact";
import PageNotFound from "./Pages/PageNotFound";

// context api stuffs
//TODO: import reducers and contexts
import Reducer from "./Context/Reducer";
import { ContactContext } from "./Context/Context";
import { SET_CONTACT, SET_LOADING } from "./Context/action.types";

//initlizeing firebase app with the firebase config which are in ./utils/firebaseConfig
//TODO: initialize FIREBASE
firebase.initializeApp(firebaseConfig);
// first state to provide in react reducer
const initialState = {
  contacts: [],
  contact: {},
  contactToUpdate: null,
  contactToUpdateKey: null,
  isLoading: false
};

const App = () => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  // will get contacts from firebase and set it on state contacts array
  const getContacts = async () => {
    // TODO: load existing data
    dispatch({
      type: SET_LOADING,
      payload: true
    })

    const contactsReference = await firebase.database().ref('/contacts');
    contactsReference.on('value', snapshot =>{
      dispatch({
        type: SET_CONTACT,
        payload: snapshot.val()
      });
      dispatch({
        type: SET_LOADING,
        payload: false
      })
    })
  };

  // getting contact  when component did mount
  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Router>
      <ContactContext.Provider value={{state, dispatch}}>
        <ToastContainer />
        <Header />
        <Container>
          <Routes>
            <Route exact path="/contact/add" element={<AddContact />} />
            <Route exact path="/contact/view" element={<ViewContact />} />
            <Route exact path="/" element={<Contacts />} />
            <Route exact path="*" component={<PageNotFound />} />
          </Routes>
        </Container>

        <Footer />
      </ContactContext.Provider>
    </Router>
  );
};

export default App;
