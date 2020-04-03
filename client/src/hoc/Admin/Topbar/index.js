import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

// ==========================================
//      Load Style
// ==========================================
import './scss/style.scss';

// ==========================================
//      Load Style
// ==========================================
import Logo from './../../../resources/img/fingerprint.gif';
import AvatarSmall from './../../../resources/img/user_avatar_small.png';

// ==========================================
//      Connect Redux
// ==========================================
import { useDispatch } from 'react-redux';
import { logoutUser } from './../../../redux/actions/user_actions';

const Topbar = (props) => {
    /*--------------------------------------
    |--- @Global State
    --------------------------------------*/
    const dispatch = useDispatch();

    //*-------------------------------*/
    //   @Dispatch Function
    //--------------------------------*/  
    const logout = (props) => {
        
        dispatch(logoutUser()).then(response => {
            if(response.payload.success){
                props.history.push('/login');
            }
        });
    }
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light fixed-top auth_top_nav">
            {!props.displaySidebarNav ?
                <button 
                    type="button"
                    className="navbar-toggler text-light"
                    onClick={ () => props.mobileMenuAction(!props.displaySidebarNav) }
                >
                    <FontAwesome
                        name="bars"
                    />
                </button>            
            :
                <button 
                    type="button"
                    className="navbar-toggler text-light"
                    onClick={ () => props.mobileMenuAction(!props.displaySidebarNav) }
                >
                    <FontAwesome
                        name="close"
                    />
                </button>
            }

            <Link 
                to="/"
                className="navbar-brand text-white" 
            >
                <div className="topLogo" style={{ backgroundImage: `url(${Logo})` }}></div>
            </Link>

            <div className="collapse navbar-collapse">
                <div className="navbar-nav mr-auto mt-2 mt-lg-0"></div>
                <div className="form-inline my-2 my-lg-0">
                    <div className="topProfileMeta d-flex justify-content-center align-items-center">

                        <p className="profile-mata-title text-white m-0">
                            Hello, {props.user.userData ?
                                props.user.userData.username
                            :null}
                        </p>

                        <div className="profile-meta row">
                            <div className="col-4 p-0">
                                <div className="profile-image">
                                    {props.user.userData ?
                                        <img
                                            src={`${window.location.origin}/api/media/image?year=${props.user.userData.profileimage.year}&month=${props.user.userData.profileimage.month}&urlname=${props.user.userData.profileimage.urlname}`}
                                            alt={props.user.userData.profileimage.alt}
                                            className="img-fluid"
                                        />
                                    :
                                        <img src={AvatarSmall} className="img-fluid" alt="Logo"/>
                                    }
                                </div>
                            </div>
                            <div className="col-8 p-0">
                                <div className="profile-mata-button">
                                    <p className="profile-name text-white m-0">
                                        {props.user.userData ?
                                            props.user.userData.username
                                        :null}
                                    </p>
                                    <p className="m-0">
                                        <Link to="/user/profile" className="btn btn-light text-white bg-transparent border-0 p-0">
                                            Edit Profile
                                        </Link>
                                    </p>
                                    <button 
                                        type="button" 
                                        className="btn btn-light text-white bg-transparent border-0 p-0 auth_logout"
                                        onClick={ () => logout(props) }
                                    >Logout</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <button 
                        type="button" 
                        className="btn btn-light text-white bg-transparent border-0 p-0 auth_logout"
                        onClick={ () => logout() }
                    >Logout</button> */}
                </div>
            </div>
        </nav>
    );
};

// export default connect()(Topbar);
export default Topbar;