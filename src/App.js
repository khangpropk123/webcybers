import React, { Component } from 'react';
import Header from './components/Header';
import { Switch, Route } from 'react-router-dom'
import Feed from './components/Feed'
import Profile from './components/Profile'
import ArticleView from './components/ArticleView'
import Editor from './components/Editor'
import requireAuthentication from './utils/requireAuth'
import SignInWith from './components/SignInWith'
import AboutUs from './components/AboutUs'
import Contact from './components/Contact'
import MyProfile from './components/MyProfile'
import EditArticle from './components/EditArticle'
import Series from './components/Series'
import SeriesReader from './components/SeriesReader'
import Admin from './components/Admin'
//import  from './component'

class App extends Component {
    render() {
        const pathname = window.location.pathname
        return ( 
            <div>
            { !pathname.includes('editor') ? <Header /> : '' }
                <SignInWith/>
                <Switch>
                
                    <Route exact path="/" component={Feed} />
                    <Route path="/aboutus" component={AboutUs}/>
                    <Route path="/contact" component={Contact}/>
                    <Route path="/profile/:id" component={Profile} />
                    <Route path="/series" component={Series}/>
                    <Route path="/mypage" component={requireAuthentication(MyProfile)}/> 
                    <Route path="/articleview/:id" component={ArticleView} />
                    <Route path="/editor/" component={requireAuthentication(Editor)} />
                    <Route path="/edit-article/:id" component={requireAuthentication(EditArticle)} />
                    <Route path="/series-reader/:id" component={SeriesReader}/>
                    <Route path="/panel" component={Admin}/>
                    <Route path="**" component={Feed} />
                </Switch>
               
            </div>
        );
    }
}

export default App;