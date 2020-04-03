import React,{ useState } from 'react';

// ==========================================
//      Connect Redux
// ==========================================
import { useDispatch } from 'react-redux';
import { resetpassword } from './../../redux/actions/user_actions';

// ===================================
//  Load Components
// ===================================
import FormField from '../utils/formFields';
import { update, generateData, isFormValid } from '../utils/mixFunction';
import FlashMessage from './../utils/FlashMessage';

const Resetpassword = (props) => {

    /*--------------------------------------
    |---@Global State
    --------------------------------------*/
    const dispatch = useDispatch();
    const [ flashMessage, setFlashMessage ] = useState({});
    const [ formdata, setFormdata ] = useState({
        password: {
            element: 'input',
            value: '',
            config: {
                name: 'password_input',
                type: 'password',
                className: 'form-control',
                placeholder: 'New password',
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
                className: 'form-control',
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
    |---@Form Input Update Form Function
    --------------------------------------*/
    const updateForm = (element, content = '') => {
        const newFormData = update(element, content, formdata);
        setFormdata(newFormData);
    }

    /*--------------------------------------
    |--- @Form Submit Function
    --------------------------------------*/
    const submitForm = (event) => {
        event.preventDefault();

        const dataToSubmit = generateData(formdata);
        const formIsValid = isFormValid(formdata);

        const dataValue = {
            ...dataToSubmit,
            resetToken: props.match.params.token
        }

        if(formIsValid){
            dispatch(resetpassword(dataValue)).then( response => {
                let getResponse = response.payload;
                
                if(getResponse.success){

                    setFlashMessage({
                        access: true,
                        type: 'success',
                        message: "Your password has been updated successfully."
                    })
                    

                }else{
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
                message: "Please check your input fields"
            })
        }
    }


    return (
        <React.Fragment>

            <section className="pt-5">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">

                            {/*--------------------------------------------
                            |--- @Flash Message Display Area
                            --------------------------------------------*/}
                            <React.Fragment>
                                <FlashMessage message={flashMessage} />
                            </React.Fragment>

                            <div className="form_area">
                                <form onSubmit={(event) => submitForm(event)}>

                                    <div className="form-group">
                                        <FormField
                                            id={'password'}
                                            formdata={formdata.password}
                                            change={(element) => updateForm(element)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <FormField
                                            id={'confirmPassword'}
                                            formdata={formdata.confirmPassword}
                                            change={(element) => updateForm(element)}
                                        />
                                    </div>

                                    <button 
                                        type="button" 
                                        onClick={(event) => submitForm(event)}
                                        className="btn btn-primary"
                                    >Submit</button>  

                                </form>
                            </div>  

                        </div>
                    </div>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Resetpassword;