import React,{ useState, useEffect } from 'react';

// ===================================
//  Load Custom Style
// ===================================
import './scss/style.scss';

// ===================================
//  Load Redux
// ===================================
import { useDispatch } from 'react-redux';
import { getSingleUser, updateUser } from './../../../redux/actions/user_actions';

// ===================================
//  Load Components
// ===================================
import Layout from './../../../hoc/Admin/layout';
import FormField from './../../utils/formFields';
import { update, generateData, isFormValid } from './../../utils/mixFunction';
import FlashMessage from './../../utils/FlashMessage';
import Upload from './../../utils/upload';
import CheckRole from './container/CheckRole';


const Edit = (props) => {

    /*--------------------------------------
    |--- @Global State & variable
    --------------------------------------*/
    const editId = props.match.params.id;
    const dispatch = useDispatch();
    const [ flashMessage, setFlashMessage ] = useState({});

    /*--------------------------------------
    |--- @Form States
    --------------------------------------*/
    const [ formdata, setFormdata ] = useState({
        username: {
            element: 'input',
            value: '',
            config: {
                name:'username_input',
                type:'text',
                className: 'form-control',
                placeholder:'Username',
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: ''
        },
        age: {
            element: 'input',
            value: '',
            config: {
                name:'age_input',
                type:'text',
                className: 'form-control',
                placeholder:'age',
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: ''
        },
        email: {
            element: 'input',
            value: '',
            config: {
                name:'email_input',
                type:'email',
                className: 'form-control',
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
                className: 'custom-select',
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
        phone: {
            element: 'input',
            value: '',
            config: {
                name:'phone_input',
                type:'text',
                className: 'form-control',
                placeholder:'Phone',
            },
            validation: {
                required: false
            },
            valid: true,
            validationMessage: ''
        },
        address: {
            element: 'textarea',
            value: '',
            config: {
                name:'address_input',
                type:'text',
                rows: '5',
                className: 'form-control',
                placeholder:'address',
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: ''
        },
        role: {
            element: 'select',
            value: '',
            config: {
                name: 'role_select',
                type: 'select',
                className: 'custom-select',
                options: [
                    { key: '', value: 'Select Option' },
                    { key: 'subscriber', value: 'Subscriber' },
                    { key: 'contributor', value: 'Contributor' },
                    { key: 'author', value: 'Author' },
                    { key: 'editor', value: 'Editor' },
                    { key: 'administrator', value: 'Administrator' }
                ]
            },
            validation: {
                required: true
            },
            valid: false,
            validationMessage: ''
        },
        status: {
            element: 'select',
            value: '',
            config: {
                name: 'status_select',
                type: 'select',
                className: 'custom-select',
                options: [
                    { key: '', value: 'Select Option' },
                    { key: 'active', value: 'Active' },
                    { key: 'deactivate', value: 'Deactivate' },
                    { key: 'processing', value: 'Processing' }
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
                className: 'form-control',
                placeholder: 'Enter you password',
            },
            validation: {
                required: false
            },
            valid: true,
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
                required: false,
                confirm: 'password'
            },
            valid: true,
            validationMessage: ''
        }
    })
    const [ cloneFormData ] = useState({ ...formdata });

    //*-------------------------------*/
    //   @Load Data
    //--------------------------------*/  
    useEffect(() => {
        dispatch(getSingleUser(editId)).then(response => {
            const getData = response.payload;
            for(let key in cloneFormData) {
                if(key !== 'password' && key !== 'confirmPassword'){
                    cloneFormData[key].value = getData[key];
                    cloneFormData[key].valid = true
                }
            }
            if(getData.profileimage){
                setImageData(getData.profileimage)
            }
            setFormdata(cloneFormData);
        })

    }, [cloneFormData, editId, dispatch])


    /*--------------------------------------
    |--- @Upload Image Information Data
    --------------------------------------*/
    const [ imageData, setImageData ] = useState();
    const getImageData = (data) => {
        setImageData(data);
    }

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
    const submitForm = (event) => {
        event.preventDefault();

        const dataToSubmit = generateData(formdata);
        const formIsValid = isFormValid(formdata);

        let dataValue = {
            ...dataToSubmit,
            _id: editId
        }

        if(imageData){
            dataValue = {
                ...dataToSubmit,
                profileimage: imageData._id,
                _id: editId
            }
        }
        
        if(formIsValid){
            dispatch(updateUser(dataValue)).then( response => {
                if(response.payload.success){
                    setFlashMessage({
                        access: true,
                        type: 'success',
                        message: 'Update user successfully'
                    })
                }
            } )
        }
    }

    return (
        <Layout {...props}>
            
            <div className="container-fluid">
                <div className="row">

                    <div className="col-md-12">
                        {/*--------------------------------------------
                        |--- @Flash Message Display Area
                        --------------------------------------------*/}
                        <React.Fragment>
                            <FlashMessage message={flashMessage} />
                        </React.Fragment>
                    </div>

                    <div className="col-md-3 text-center p-3">
                        <div className="imageArea d-flex justify-content-center">
                            {/* -----------------------------
                            ||---@Profile Image
                            ----------------------------- */}
                            <Upload 
                                imageData={ (data) => getImageData(data) } 
                                profileimage={imageData}
                                width="200px"
                                height="200px"
                            />
                        </div>
                        <div className="m-2">
                            {/* ----------------------------------
                            ||---@User Name
                            ---------------------------------- */}
                            <div className="auth-username font-weight-bold">{formdata.username.value}</div>

                            {/* ----------------------------------
                            ||---@User Role Checking Components
                            ---------------------------------- */}
                            <CheckRole role={formdata.role.value} />
                        </div>
                    </div>

                    <div className="col-md-9 p-3">
                        <div className="auth-form-area">

                            {/* -----------------------------
                            ||---@Profile Form
                            ----------------------------- */}
                            <form onSubmit={(event) => submitForm(event)} className="row">

                                <div className="form-group col-md-6">
                                    <label className="col-form-label">
                                        <small>
                                            <strong>Username:</strong>
                                        </small>
                                    </label>
                                    <FormField
                                        id={'username'}
                                        formdata={formdata.username}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label">
                                        <small>
                                            <strong>Age:</strong>
                                        </small>
                                    </label>
                                    <FormField
                                        id={'age'}
                                        formdata={formdata.age}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label">
                                        <small>
                                            <strong>Gender:</strong>
                                        </small>
                                    </label>
                                    <FormField
                                        id={'gender'}
                                        formdata={formdata.gender}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label">
                                        <small>
                                            <strong>Phone:</strong>
                                        </small>
                                    </label>
                                    <FormField
                                        id={'phone'}
                                        formdata={formdata.phone}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="col-form-label">
                                        <small>
                                            <strong>Address:</strong>
                                        </small>
                                    </label>
                                    <FormField
                                        id={'address'}
                                        formdata={formdata.address}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <label className="col-form-label">
                                        <small>
                                            <strong>Email:</strong>
                                        </small>
                                    </label>
                                    <FormField
                                        id={'email'}
                                        formdata={formdata.email}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label">
                                        <small>
                                            <strong>Role:</strong>
                                        </small>
                                    </label>
                                    <FormField
                                        id={'role'}
                                        formdata={formdata.role}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label">
                                        <small>
                                            <strong>States:</strong>
                                        </small>
                                    </label>
                                    <FormField
                                        id={'status'}
                                        formdata={formdata.status}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label">
                                        <small>
                                            <strong>Password:</strong>
                                        </small>
                                    </label>
                                    <FormField
                                        id={'password'}
                                        formdata={formdata.password}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div className="form-group col-md-6">
                                    <label className="col-form-label">
                                        <small>
                                            <strong>Confirm Password:</strong>
                                        </small>
                                    </label>
                                    <FormField
                                        id={'confirmPassword'}
                                        formdata={formdata.confirmPassword}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>

                                <div className="col-md-6 pt-4">
                                    <button type="button" className="btn btn-primary" onClick={(event) => submitForm(event)}>Save</button>
                                </div>
                            </form>

                        </div>
                    </div>

                </div>
            </div>

        </Layout>
    );
};

export default Edit;