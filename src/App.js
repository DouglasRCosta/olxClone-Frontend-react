import React from "react";
import { connect } from 'react-redux';
import { MainRoutes } from './Routes';
import Header from "./components/partials/Header";
import Footer from "./components/partials/Footer";
import { Template } from './components/Template'
import './App.css'

function Page(props) {
  return (

    <>
      <Template>
        <Header />
        <MainRoutes />
        <Footer />
      </Template>
    </>





  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Page);
