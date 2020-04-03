import React,{ useState } from 'react';
import FontAwesome from 'react-fontawesome';

// ===================================
//  Load Redux
// ===================================
import { useDispatch } from 'react-redux';
import { changeRole } from './../../../../redux/actions/user_actions';

// ===================================
//  Load Components
// ===================================
import FormField from './../../../utils/formFields';
import { update, generateData, isFormValid } from './../../../utils/mixFunction';


const MultiAction = (props) => {

    /*--------------------------------------
    |--- @Global State
    --------------------------------------*/
    const selectedItem = props.selectedItem;
    const dispatch = useDispatch();

    /*--------------------------------------
    |--- @Form States
    --------------------------------------*/
    const [ formdata, setFormdata ] = useState({
        role: {
            element: 'select',
            value: '',
            config: {
                name: 'role_select',
                type: 'select',
                className: 'form-control mr-sm-2 form-control-sm',
                options: [
                    { key: '', value: 'Change role' },
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
        }
    })

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
    const submitForm = async event => {
        event.preventDefault();
        
        //*----------------------------------------------*/
        //---@Generate From Template & Check Validation
        //-----------------------------------------------*/
        const dataToSubmit = generateData(formdata);
        const formIsValid = isFormValid(formdata);

        if (formIsValid) {
            //*----------------------------------------*/
            //---@Change User Role Dispatch Function
            //-----------------------------------------*/
            if(selectedItem.length > 0){
                dispatch(changeRole(dataToSubmit.role, selectedItem)).then( response => {
                    if(response.payload.success){
                        props.resetData(response.payload.success);
                    }
                } )
            }
        }
    }


    return (
        <React.Fragment>
            
            <div className="pr-3">

                {/* -----------------------------
                ||---@All Item
                ----------------------------- */}
                <button 
                    className="btn btn-link text-success p-0 pr-2 mr-2" 
                    onClick={(data) => props.loadAllItem(true)}
                    style={{ borderTop: "0px", borderBottom: "0px" }}
                >
                    Total {props.type} (<span>{props.getItems ? props.getItems.countItems : null}</span>)
                </button>

                {/* -----------------------------
                ||---@Delete Multiple Item
                ----------------------------- */}
                <button 
                    className="btn btn-link text-danger p-0 border-0" 
                    onClick={(data) => props.multi_itemsDelete(true)}
                >
                    <FontAwesome
                        name="trash-o"
                    /> Delete
                </button>

            </div>

            <div>
                {/* -----------------------------
                ||---@Change Role
                ----------------------------- */}
                <form onSubmit={(event) => submitForm(event)} className="form-inline">
                    <FormField
                        id={'role'}
                        formdata={formdata.role}
                        change={(element) => updateForm(element)}
                    />
                    <button 
                        type="button" 
                        className="btn btn-light btn-sm shadow-sm rounded border" 
                        onClick={(event) => submitForm(event)}
                    >
                        Change
                    </button>
                </form>
            </div>



        </React.Fragment>
    );
};

export default MultiAction;