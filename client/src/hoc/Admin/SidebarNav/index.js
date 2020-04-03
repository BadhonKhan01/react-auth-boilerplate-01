import React,{ useState } from 'react';
import { Link } from 'react-router-dom';

// ==========================================
//      Custom Style
// ==========================================
import './scss/style.scss';

// ==========================================
//      Connect Redux
// ==========================================
import { useDispatch } from 'react-redux';
import { logoutUser } from './../../../redux/actions/user_actions';


const SidebarNav = (props) => {
    const [ submenuKey, setSubmenuKey ] = useState('');
    const [ sidebarMenu ] = useState([
        {
            name:'Dashboard',
            to:'/dashboard',
            icon: 'tachometer',
            submenu:false
        },
        {
            name:'Media',
            to:'/media',
            icon: 'picture-o',
            submenu:true,
            subMenuItem:[
                {
                    name:'All Media',
                    to:'/media',
                },
                {
                    name: 'Media Trash',
                    to:'/media/trash'
                }
            ]
        },
        {
            name:'User',
            to:'/user',
            icon: 'user',
            submenu:true,
            subMenuItem:[
                {
                    name:'All Users',
                    to:'/user',
                },
                {
                    name:'Add New',
                    to:'/user/add',
                },
                {
                    name:'Your Profile',
                    to:'/user/profile',
                },
                {
                    name: 'User Trash',
                    to:'/user/trash'
                }
            ]
        }
    ]);

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

    /*------------------------------
    |--- @Menu Toggle Switch
    |--- @Menu Index Check & Active
    --------------------------------*/
    const onToggle = (index) => {

        if(submenuKey === index){
            setSubmenuKey('');
        }else{
            setSubmenuKey(index);
        }
    }

    /*--------------------------
    |--- @Check Menus Link & 
    |--- @Active Menus
    ----------------------------*/
    const checkNavLink = (path) => {
        if(props.location.pathname.startsWith(path)){
            return 'x_active_menu';
        }
    }
    
    return (
        
        <nav className={props.displaySidebarNav ? 
                "col-xl-1 col-lg-2 col-md-3 col-6 bg-light sidebar"
            :
                "col-xl-1 col-lg-2 col-md-3 bg-light sidebar d-none d-md-none d-lg-block"
        }>
            <div className="sidebar-sticky">
                <ul className="nav flex-column">
                    {sidebarMenu.map( ( menuItem, index ) => (
                        <li 
                            key={index} 
                            onClick={ () => onToggle(index) }
                            className={
                                submenuKey === index ? 
                                    'nav-item' 
                                : 
                                    /*--------------------------------
                                    |--- @Call checkNavLink Function
                                    |--- @For Check Active Menus
                                    ---------------------------------*/
                                    checkNavLink(menuItem.to)
                            }
                        >
                            <Link className="nav-link" to={menuItem.to}>
                                <span data-feather="home"></span>
                                {menuItem.name}
                            </Link>
                            
                            { /*---------------------------------------
                                |--- @Render Submenu
                                |--- @For Check Submenu "True Or False"
                                ----------------------------------------*/
                                menuItem.subMenuItem ? 
                                    (<ul className="nav flex-column x_submenu">
                                        {menuItem.subMenuItem.map( (subLink, indexItem) => (
                                            <li 
                                                key={indexItem}  
                                                className={
                                                    props.location.pathname === subLink.to ? 
                                                        'x_submenu_active' 
                                                    :null
                                                }
                                            >
                                                <Link to={subLink.to}>{subLink.name}</Link>
                                            </li>
                                        ))}
                                    </ul>)
                                :null
                            }
                        </li> 
                    ))}
                    {props.displaySidebarNav ?
                        <li 
                            className="nav-link"
                            onClick={ () => logout(props) }
                        >
                            Logout
                        </li>
                    :null}
                </ul>
            </div>
        </nav>
    );
};

export default SidebarNav;