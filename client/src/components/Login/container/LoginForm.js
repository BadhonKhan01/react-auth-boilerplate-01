import React,{ useState } from 'react';

// ==========================================
//      Load Style & Image
// ==========================================
import './../scss/style.scss';
import Logo from './../../../resources/img/fingerprint.gif';

// ==========================================
//      Connect Redux
// ==========================================
import { useDispatch } from 'react-redux';
import { loginUser } from './../../../redux/actions/user_actions';

// ===================================
//  Load Components
// ===================================
import FormField from './../../utils/formFields';
import { update, generateData, isFormValid } from './../../utils/mixFunction';
import FlashMessage from './../../utils/FlashMessage';

const LoginForm = (props) => {

    /*--------------------------------------
    |--- @Global State
    --------------------------------------*/
    const dispatch = useDispatch();
    const [ flashMessage, setFlashMessage ] = useState({});
    const [ formdata, setFormdata ] = useState({
        email:{
            element:'input',
            value:'',
            config:{
                name:'email_input',
                type:'email',
                id:'email',
                className: 'form-control form-control-sm',
                placeholder:'Enter email'
            },
            validation:{
                required: true,
                email: true
            },
            valid: false,
            validationMessage:''
        },
        password:{
            element:'input',
            value:'',
            config:{
                name:'password_input',
                type:'password',
                id:'password',
                className: 'form-control form-control-sm',
                placeholder:'Password'
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage:''
        }
    });

    /*--------------------------------------
    |--- @Form Input Update Function
    --------------------------------------*/
    const updateForm = (element, content = '') => {
        const newFormData = update(element, content, formdata);
        setFormdata(newFormData);
    }

    /*--------------------------------------
    |--- @Form Submit Function
    --------------------------------------*/
    const submitForm = (event, submitType = '') => {
        event.preventDefault();

        const dataToSubmit = generateData(formdata);
        const formIsValid = isFormValid(formdata);
        if(formIsValid){
            dispatch(loginUser(dataToSubmit)).then( response => {
                if(response.payload.success){
                    props.history.push('/dashboard')
                }else{

                    setFlashMessage({
                        access: true,
                        type: 'danger',
                        message: 'Something wrong please try again'
                    })
                    
                }
            } )
        }else{
            setFlashMessage({
                access: true,
                type: 'danger',
                message: 'Please check your input fields'
            })
        }
        
    }

    return (
        <React.Fragment>
            
            {/*--------------------------------------------
            |--- @Flash Message Display Area
            --------------------------------------------*/}
            <React.Fragment>
                <FlashMessage message={flashMessage} />
            </React.Fragment>

            <section className="login_area">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form_area d-flex align-items-center">
                                <div className="w-100">
                                    <div className="form_header text-center">
                                        <img src={Logo} alt="Logo" />
                                        <p>React Auth Boilerplate</p>
                                    </div>
                                    <div className="form_body">
                                        <form onSubmit={(event) => submitForm(event)}>
                                            <div className="form-group">
                                                <FormField
                                                    id={'email'}
                                                    formdata={formdata.email}
                                                    change={(element) => updateForm(element)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <FormField
                                                    id={'password'}
                                                    formdata={formdata.password}
                                                    change={(element) => updateForm(element)}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <button 
                                                    type="button" 
                                                    className="btn btn-link forgot_pass p-0"
                                                    onClick={ () => props.accessControl(false) }
                                                >Forgot password</button>

                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary"
                                                    onClick={(event) => submitForm(event)}
                                                >
                                                    Login
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </React.Fragment>
    );
};

export default LoginForm;