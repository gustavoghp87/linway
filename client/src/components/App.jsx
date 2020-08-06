import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";
import OtroPage from "./OtroPage";
import NavBar from "./NavBar";
import Footer from "./Footer";
import 'react-bootstrap';


function App() {

  return (
    <Suspense fallback={(<div>Cargando...</div>)}>
      <NavBar />
      <div style={{maxWidth:'90%', paddingTop:'75px', margin:'auto', minHeight:'calc(100vh - 80px)'}}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/otro" component={OtroPage} />
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}


export default App;
