import React, { useState } from 'react';

// ===================================
//  Load Components
// ===================================
import LoginForm from './container/LoginForm';
import ForgotForm from './container/ForgotForm';


const Login = (props) => {
    
    /*--------------------------------------
    |--- @Global State
    --------------------------------------*/
    const [ accessControl, setAccessControl ] = useState(true);

    const getAccess = (data) => {
        setAccessControl(data);
    }
    
    
    return (
        <React.Fragment>
            <section className="pt-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">

                            {/*--------------------------------------------
                                |--- @Login Form Form
                            --------------------------------------------*/}
                            {accessControl ?
                                <LoginForm {...props} accessControl={ (data) => getAccess(data) } />
                            :null}
                            
                            {/*--------------------------------------------
                                |--- @Forgot Password Form Form
                            --------------------------------------------*/}
                            {!accessControl ?
                                <ForgotForm {...props} accessControl={ (data) => getAccess(data) }/>
                            :null}

                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Login;