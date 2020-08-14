import React from 'react';
import './App.css';
import Classifier from './components/Classifier/Classifier';
import ImageList from './components/imageList/imageList';
import MyNavbar from './components/Navigation/Navbar';
import {BrowserRouter, Route, Switch} from 'react-router-dom'



function App() {
  return (
    <BrowserRouter>
        <MyNavbar/>
        <div className="App">
          <Switch>
            <Route exact path='/' component={Classifier}/>
            <Route exact path= '/list' component={ImageList} />
            <Route exact path='*' component={Classifier}/>
          </Switch>
        </div>
    </BrowserRouter>
    
  );
}

export default App;
