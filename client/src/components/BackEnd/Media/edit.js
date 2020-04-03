import React,{ useState, useEffect } from 'react';

// ===================================
//  Load Custom Style
// ===================================
import './scss/style.scss';

// ===================================
//  Load Redux
// ===================================
import { useDispatch } from 'react-redux';
import { getSingleMedia, updateMedia } from './../../../redux/actions/media_actions';

// ===================================
//  Load Components
// ===================================
import Layout from './../../../hoc/Admin/layout';
import FormField from './../../utils/formFields';
import { update, generateData, isFormValid } from './../../utils/mixFunction';
import FlashMessage from './../../utils/FlashMessage';


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
        displayname:{
            element:'input',
            value:'',
            config:{
                name:'name_input',
                type:'text',
                className: 'form-control',
                placeholder:'Name',
                id: `${props.mediaId}-name`
            },
            validation:{
                required: true
            },
            valid: false,
            validationMessage:''
        },
        alt:{
            element:'textarea',
            value:'',
            config:{
                name:'alt_input',
                className: 'form-control',
                placeholder:'alt',
                id: `${props.mediaId}-alt`
            },
            validation:{
                required: false
            },
            valid: true,
            validationMessage:''
        },
        caption:{
            element:'textarea',
            value:'',
            config:{
                name:'caption_input',
                className: 'form-control',
                placeholder:'caption',
                id: `${props.mediaId}-caption`
            },
            validation:{
                required: false
            },
            valid: true,
            validationMessage:''
        },
        description:{
            element:'textarea',
            value:'',
            config:{
                name:'description_input',
                className: 'form-control',
                placeholder:'description',
                id: `${props.mediaId}-description`
            },
            validation:{
                required: false
            },
            valid: true,
            validationMessage:''
        }
    })
    const [ cloneFormData ] = useState({ ...formdata });

    //*-------------------------------*/
    //   @Load Data
    //--------------------------------*/  
    const [ loadImage, setLoadImage ] = useState('');
    useEffect(() => {
        dispatch(getSingleMedia(editId)).then(response => {
            const getData = response.payload;
            for(let key in cloneFormData) {
                cloneFormData[key].value = getData[key];
                cloneFormData[key].valid = true
            }
            
            setLoadImage(`${window.location.origin}/api/media/image?year=${response.payload.year}&month=${response.payload.month}&urlname=${response.payload.urlname}`);
            setFormdata(cloneFormData);
        })

    }, [editId, dispatch, cloneFormData])


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
        if(formIsValid){

            const dataValue = {
                ...dataToSubmit,
                _id: editId
            }

            dispatch(updateMedia(dataValue)).then( response => {
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

                    <div className="col-md-6 text-center p-3">
                        {/* -----------------------------
                        ||---@Upload Image
                        ----------------------------- */}
                        <img src={loadImage} alt={ formdata.displayname.value } className="img-thumbnail"/>
                    </div>

                    <div className="col-md-6 p-3">
                        <div className="media-form-area">
                            {/* -----------------------------
                            ||---@Profile Form
                            ----------------------------- */}
                            <form onSubmit={(event) => submitForm(event)}>
                                
                                <div className="form-group">
                                    <label htmlFor="image-name" className="col-form-label">
                                        <small>
                                            <strong>Name:</strong>
                                        </small>
                                    </label>
                                    <FormField
                                        id={'displayname'}
                                        formdata={formdata.displayname}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image-alt" className="col-form-label">
                                        <small>
                                            <strong>Alt:</strong>
                                        </small>
                                    </label>
                                    <FormField
                                        id={'alt'}
                                        formdata={formdata.alt}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image-caption" className="col-form-label">
                                        <small>
                                            <strong>Caption:</strong>
                                        </small>
                                    </label>
                                    <FormField
                                        id={'caption'}
                                        formdata={formdata.caption}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="image-description" className="col-form-label">
                                        <small>
                                            <strong>Description:</strong>
                                        </small>
                                    </label>
                                    <FormField
                                        id={'description'}
                                        formdata={formdata.description}
                                        change={(element) => updateForm(element)}
                                    />
                                </div>
                                <div className="col-md-6 pt-4 pl-0">
                                    <button type="button" className="btn btn-primary" onClick={(event) => submitForm(event)}>Update</button>
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