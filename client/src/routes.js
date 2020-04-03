import React from 'react';
import { Switch, Route } from 'react-router-dom';
// ===================================
//  Load Auth Checking Components
// ===================================
import Auth from './hoc/auth';

// ===================================
//  Load Config
// ===================================
import Config from './components/Config';

// ===================================
//  Load Back End Components
// ===================================
    
    /*---------------------------------
    ||---@Load All Dashboard Routes
    ---------------------------------*/
    import Dashboard from './components/BackEnd/Dashboard';

    /*---------------------------------
    ||---@Load All User Routes
    ---------------------------------*/
    import User from './components/BackEnd/User';
    import AddUser from './components/BackEnd/User/add';
    import EditUser from './components/BackEnd/User/edit';
    import UserProfile from './components/BackEnd/User/profile';
    import UserTrash from './components/BackEnd/User/trash';

    /*---------------------------------
    ||---@Media
    ---------------------------------*/
    import Media from './components/BackEnd/Media';
    import MediaTrash from './components/BackEnd/Media/trash';
    import EditMedia from './components/BackEnd/Media/edit';
    

// ===================================
//  Load Front End Components
// ===================================
    import Page from './components/FrontEnd/page';
    import Login from './components/Login';
    import Resetpassword from './components/Login/resetpassword';




const Routes = () => {
    return (
        <Switch>


            {/*=========================================
            ||---@Config SuperAdmin
            =========================================*/}
                <Route exact path="/config" component={Auth(Config, null)} />

            {/*=========================================
            ||---@Back End Route
            =========================================*/}

                {/*------------------------
                ||---@All Dashboard Routes
                -------------------------*/}
                <Route exact path="/dashboard" component={Auth(Dashboard, true)} />

                {/*------------------------
                ||---@All User Routes
                -------------------------*/}
                <Route exact path="/user" component={Auth(User, true)} />
                <Route exact path="/user/add" component={Auth(AddUser, true)} />
                <Route exact path="/user/edit/:id" component={Auth(EditUser, true)} />
                <Route exact path="/user/profile" component={Auth(UserProfile, true)} />
                <Route exact path="/user/trash" component={Auth(UserTrash, true)} />

                {/*------------------------
                ||---@Media
                -------------------------*/}
                <Route exact path="/media" component={Auth(Media, true)} />
                <Route exact path="/media/trash" component={Auth(MediaTrash, true)} />
                <Route exact path="/media/edit/:id" component={Auth(EditMedia, true)} />
                

            {/*=========================================
            ||---@Front End Route
            =========================================*/}
                <Route exact path="/" component={Auth(Page, null)} />
                <Route exact path="/login" component={Auth(Login, false)} />
                <Route exact path="/resetpassword/:token" component={Auth(Resetpassword, false)} />

        </Switch>
    );
};

export default Routes;