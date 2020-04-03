import React,{ useState } from 'react';
import FontAwesome from 'react-fontawesome';

// ===================================
//  Load Redux
// ===================================
import { useDispatch } from 'react-redux';
import { searchMedia } from './../../../redux/actions/media_actions';

// ===================================
//  Load Components
// ===================================
import FormField from './../formFields';
import { update, generateData, isFormValid } from './../mixFunction';

const SearchItem = (props) => {

    /*--------------------------------------
    |--- @Global State & variables
    --------------------------------------*/
    const dispatch = useDispatch();
    const [formdata, setFormdata] = useState({
        search: {
            element: 'input',
            value: '',
            config: {
                name: 'search_input',
                type: 'text',
                className: 'form-control mr-sm-2 form-control-sm',
                placeholder: 'Search name',
                style: { paddingRight: '35px' }
            },
            validation: {
                required: false
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
    const submitForm = (event) => {
        event.preventDefault();
        const dataToSubmit = generateData(formdata);
        const formIsValid = isFormValid(formdata);
        if (formIsValid) {
            if(dataToSubmit.search !== ''){
                dispatch(searchMedia(dataToSubmit.search)).then( response => {
                    if(response.payload.search){
                        props.searchNetwork(response.payload.search);
                    }
                } )
            }
        }
    }


    return (
        <React.Fragment>
            <form onSubmit={(event) => submitForm(event)} className="form-inline">
                <FormField
                    id={'search'}
                    formdata={formdata.search}
                    change={(element) => updateForm(element)}
                />

                <button 
                    type="submit" 
                    className="btn btn-light btn-sm shadow-sm rounded border"
                    onClick={(event) => submitForm(event)}
                >
                    <FontAwesome
                        name="search"
                    />
                </button>
            </form>
        </React.Fragment>
    );
};

export default SearchItem;