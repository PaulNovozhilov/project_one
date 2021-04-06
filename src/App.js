import './App.css';
import React from "react";
import {Route, BrowserRouter} from "react-router-dom";
import {Menu} from "./components/Menu";
import {PostList} from "./components/PostList";
import {Post} from "./components/Post";
import {AddPost} from "./components/AddPost";
import {Reg} from "./components/Reg";


function App() {
    return (
        <div className="container">
            <BrowserRouter>
                <Menu/>
                <Route exact path="/" render={()=><PostList/>} />
                <Route path="/addPost" render={()=><AddPost/>}/>
                <Route path="/Reg" render={()=><Reg/>}/>
                <Route path="/post/:id" render={(props)=><Post {...props}/>}/>
            </BrowserRouter>
        </div>
    );
}

export default App;