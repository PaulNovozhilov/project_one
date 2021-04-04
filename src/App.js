import './App.css';
import React from "react";
import {Route, BrowserRouter} from "react-router-dom";
import {Menu} from "./components/Menu";
import {PostList} from "./components/PostList";
import {Post} from "./components/Post";


function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <Menu/>
                <Route exact path="/" render={()=><PostList/>} />
                <Route path="/about" render={()=><h1>О нас</h1>}/>
                <Route path="/contact-us" render={()=><h1>Контакты</h1>}/>
                <Route path="/post" render={()=><Post/>}/>
            </BrowserRouter>
        </div>
    );
}

export default App;