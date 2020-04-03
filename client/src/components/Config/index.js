import React,{ useState } from 'react';
import axios from 'axios';

// ===================================
//  Load Components
// ===================================
import FormField from './../utils/formFields';
import { update, generateData, isFormValid, redirect } from './../utils/mixFunction';


const Config = (props) => {

    /*--------------------------------------
    |--- @Global State
    --------------------------------------*/
    const [ formdata, setFormdata ] = useState({
        username:{
            element:'input',
            value:'',
            config:{
                name:'username_input',
                type:'username',
                id:'username',
                className: 'form-control form-control-sm',
                placeholder: 'Username'
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage:''
        },
        email: {
            element: 'input',
            value: '',
            config: {
                name:'email_input',
                type:'email',
                id:'email',
                className: 'form-control form-control-sm',
                placeholder:'Email',
            },
            validation: {
                required: true,
                email: true
            },
            valid: false,
            validationMessage: ''
        },
        gender: {
            element: 'select',
            value: '',
            config: {
                name: 'gender_select',
                type: 'select',
                className: 'form-control form-control-sm',
                options: [
                    { key: '', value: 'Select Option' },
                    { key: 'male', value: 'Male' },
                    { key: 'female', value: 'Female' },
                ]
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: ''
        },
        password: {
            element: 'input',
            value: '',
            config: {
                name: 'password_input',
                type: 'password',
                id:'password',
                className: 'form-control form-control-sm',
                placeholder: 'Enter you password',
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: ''
        },
        confirmPassword: {
            element: 'input',
            value: '',
            config: {
                name: 'password_input',
                type: 'password',
                id:'confirmPassword',
                className: 'form-control form-control-sm',
                placeholder: 'Confirm password',
            },
            validation: {
                required: true,
                confirm: 'password'
            },
            valid: false,
            validationMessage: ''
        }
    })

    /*--------------------------------------
    |--- @WelcomeAction
    --------------------------------------*/
    const [ activeWelcome, setActiveWelcome ] = useState(true)
    const displayWelcomeMessage = () => {
        setActiveWelcome(false)
        setActiveInstall(true)
    }

    /*--------------------------------------
    |--- @Active Installer Form
    --------------------------------------*/
    const [ activeInstall, setActiveInstall ] = useState(false)


    /*--------------------------------------
    |--- @Form Input Update Form Function
    --------------------------------------*/
    const updateForm = (element, content = '') => {
        const newFormData = update(element, content, formdata);
        setFormdata(newFormData);
    }

    
    /*--------------------------------------
    |--- @Form Submit Function
    --------------------------------------*/
    const [ errorMessage, setErrorMessage ] = useState({
        access: false,
        message: ''
    });
    const [ restartServer, setRestartServer ] = useState(false);
    const submitForm = (event) => {
        event.preventDefault();

        const dataToSubmit = generateData(formdata);
        const formIsValid = isFormValid(formdata);

        if(formIsValid){

            let dataValue = {
                ...dataToSubmit,
                role: 'superadmin',
                status: 'active'
            }

            axios.post(`/api/users/config`, dataValue).then(response => {
                setActiveInstall(false)
                setRestartServer(true)
            });
        }else{
            setErrorMessage({
                access: true,
                message:"Please check your input fields"
            })
            setTimeout(() => {
                setErrorMessage({
                    access: false,
                    message: ''
                })
            }, 3000);
        }

    }
    
    return (
        <React.Fragment>

            {/* -----------------------------
            ||---@Redirect Home
            ----------------------------- */}
            {!props.user.userData.config ?
                redirect()
            :null}

            {/* -----------------------------
            ||---@Display Form
            ----------------------------- */}
            <section id="x_installer_section" className="pt-5">
            
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            <div className="x_installer_welcome d-flex align-items-center justify-content-center">

                                {/*--------------------------------------------
                                    |--- @Welcome message
                                --------------------------------------------*/}
                                {activeWelcome ?
                                    <div className="shadow-sm p-3 bg-white rounded">

                                        {/* Logo */}
                                        <div className="logo"></div>
                                        <small className="m-0">Welcome, Before getting started, we need some information on the superadmin registration. You will need to know the following items before proceeding.</small>

                                        <ul className="list-group list-group-flush mt-3 mb-3">
                                            <li className="list-group-item pl-0 pr-0 p-2" style={{ borderTop:0 }}>
                                                <small>Username</small>    
                                            </li>
                                            <li className="list-group-item pl-0 pr-0 p-2">
                                                <small>Email</small>
                                            </li>
                                            <li className="list-group-item pl-0 pr-0 p-2">
                                                <small>Password</small>
                                            </li>
                                            <li className="list-group-item pl-0 pr-0 p-2" style={{ borderBottom:0 }}>
                                                <small>Confirm Password</small>
                                            </li>
                                        </ul>

                                        <button 
                                            type="button" 
                                            className="btn btn-link btn-sm"
                                            onClick={ () => displayWelcomeMessage() }
                                        >Let's go!</button>

                                    </div>
                                :null}

                                {/*--------------------------------------------
                                    |--- @Installer Form
                                --------------------------------------------*/}
                                {activeInstall ?
                                    <div className="shadow-sm p-3 bg-white rounded">
                                        <h6>Information needed</h6>
                                        <small>Please provide the following information. Don’t worry, you can always change these settings later.</small>

                                        <hr/>
                                        <div className="form_area mb-3">
                                            {errorMessage.access ?
                                                <div className="alert alert-warning">
                                                    <small>{errorMessage.message}</small>
                                                </div>                        
                                            :null}
                                        </div>
                                        <div className="form_area mb-3">
                                            <form onSubmit={(event) => submitForm(event)}>

                                                <div className="form-group row align-items-center">
                                                    <label htmlFor="username" className="col-sm-3 col-form-label">
                                                        <small>Username</small>
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <FormField
                                                            id={'username'}
                                                            formdata={formdata.username}
                                                            change={(element) => updateForm(element)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row align-items-center">
                                                    <label htmlFor="email" className="col-sm-3 col-form-label">
                                                        <small>Email</small>
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <FormField
                                                            id={'email'}
                                                            formdata={formdata.email}
                                                            change={(element) => updateForm(element)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row align-items-center">
                                                    <label htmlFor="gender" className="col-sm-3 col-form-label">
                                                        <small>Gender</small>
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <FormField
                                                            id={'gender'}
                                                            formdata={formdata.gender}
                                                            change={(element) => updateForm(element)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row align-items-center">
                                                    <label htmlFor="password" className="col-sm-3 col-form-label">
                                                        <small>Password</small>
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <FormField
                                                            id={'password'}
                                                            formdata={formdata.password}
                                                            change={(element) => updateForm(element)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row align-items-center">
                                                    <label htmlFor="confirmPassword" className="col-sm-3 col-form-label">
                                                        <small>Confirm Password</small>
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <FormField
                                                            id={'confirmPassword'}
                                                            formdata={formdata.confirmPassword}
                                                            change={(element) => updateForm(element)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-group row align-items-center">
                                                    <label htmlFor="confirmPassword" className="col-sm-3 col-form-label">
                                                        <small>User type</small>
                                                    </label>
                                                    <div className="col-sm-9">
                                                        <small className="font-italic font-weight-bolder">
                                                            Superadmin
                                                        </small>
                                                    </div>
                                                </div>


                                                <button 
                                                    type="button" 
                                                    onClick={(event) => submitForm(event)}
                                                    className="btn btn-primary btn-sm mt-3"
                                                >Submit</button>  
                                            </form>
                                        </div>   

                                    </div>
                                :null}

                                {restartServer ?
                                    <div className="alert alert-primary">
                                        Successfully insert superadmin, Please update your server config file & login.
                                    </div>
                                :null}

                            </div>

                        </div>
                    </div>
                </div>
            
            </section>
        </React.Fragment>
    );
};

export default Config;