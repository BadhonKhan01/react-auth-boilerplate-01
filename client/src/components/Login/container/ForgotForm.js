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
import { checkEmail } from './../../../redux/actions/user_actions';

// ===================================
//  Load Components
// ===================================
import FormField from './../../utils/formFields';
import { update, generateData, isFormValid } from './../../utils/mixFunction';
import FlashMessage from './../../utils/FlashMessage';

const ForgotForm = (props) => {

    /*--------------------------------------
    |--- @Global State
    --------------------------------------*/
    const dispatch = useDispatch();
    const [ flashMessage, setFlashMessage ] = useState({});
    const [ matchEmail, setMatchEmail ] = useState({
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
        }
    });
    const [ cloneMatchEmail ] = useState({ ...matchEmail });

    /*--------------------------------------
    |--- @Form Input Update Form Function
    --------------------------------------*/
    const updateMatchEmailForm = (element, content = '') => {
        const newFormData = update(element, content, matchEmail);
        setMatchEmail(newFormData);
    }

    /*--------------------------------------
    |--- @Form Submit Function
    --------------------------------------*/
    const submitForm = (event) => {
        event.preventDefault();

        const dataToSubmit = generateData(matchEmail);
        const formIsValid = isFormValid(matchEmail);
        if(formIsValid){
            dispatch(checkEmail(dataToSubmit)).then( response => {
                let getResponse = response.payload;
                if(getResponse.success){
                    
                    setFlashMessage({
                        access: true,
                        type: 'success',
                        message: 'Your email has been sent successfully'
                    })

                }else{
                    setMatchEmail(cloneMatchEmail);
                    setFlashMessage({
                        access: true,
                        type: 'danger',
                        message: getResponse.message
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
                                        <div className="alert alert-light pl-0 pr-0 pb-0">
                                            Please enter your email address. You will receive a link to create a new password via email.
                                        </div>
                                            <div className="form-group">
                                                <FormField
                                                    id={'email'}
                                                    formdata={matchEmail.email}
                                                    change={(element) => updateMatchEmailForm(element)}
                                                />
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <button 
                                                    type="button" 
                                                    className="btn btn-link forgot_pass p-0"
                                                    onClick={ () => props.accessControl(true) }
                                                >Back</button>

                                                <button 
                                                    type="submit" 
                                                    className="btn btn-primary"
                                                    onClick={(event) => submitForm(event)}
                                                >
                                                    Submit
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

export default ForgotForm;