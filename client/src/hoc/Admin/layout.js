import React,{ useState } from 'react';

// ===================================
//  Global Style
// ===================================
import './scss/style.scss';

// ===================================
//  Load Components
// ===================================
import SidebarNav from './SidebarNav';
import Topbar from './Topbar';
import Footer from './Footer';

const Layout = (props) => {
    const [ displaySidebarNav, setDispaySidebarNav ] = useState(false);
    
    /*--------------------------------
    |--- @Mobile Menu Action Function 
    --------------------------------*/
    const mobileMenuAction = (data) => {
        setDispaySidebarNav(data)
    }

    return (
        <section id="x_main_area">

            <div className="container-fluid">
                <div className="row">
                    <Topbar
                        {...props}
                        displaySidebarNav={displaySidebarNav}
                        mobileMenuAction={ (data) => mobileMenuAction(data) }
                    />
                </div>
            </div>

            <div className="container-fluid">
                <div className="row">

                    {/*--------------------------------------------
                    |--- @Load Admin Sidebar Nav
                    --------------------------------------------*/}
                
                    <SidebarNav
                        {...props}
                        displaySidebarNav={displaySidebarNav}
                    />
                    
                    {/*--------------------------------------------
                    |--- @Load Admin Content
                    --------------------------------------------*/}
                    <main role="main" className="col-xl-11 col-lg-10 col-md-12 ml-sm-auto px-4">
                        <div className="pt-4 pb-4">
                            { props.children }
                        </div>

                        {/*--------------------------------------------
                        |--- @Load Admin Footer
                        --------------------------------------------*/}
                        <Footer/>
                    </main>

                </div>
            </div>
        </section>
    );

};

export default Layout;