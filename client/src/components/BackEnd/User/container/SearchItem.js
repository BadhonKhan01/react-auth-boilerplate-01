import React,{ useState } from 'react';

// ===================================
//  Load Redux
// ===================================
import { useDispatch } from 'react-redux';
import { searchUsers } from './../../../../redux/actions/user_actions';

// ===================================
//  Load Components
// ===================================
import FormField from '../../../utils/formFields';
import { update, generateData, isFormValid } from '../../../utils/mixFunction';

const SearchItem = (props) => {

    /*--------------------------------------
    |--- @Global State & variables
    --------------------------------------*/
    const isLoginUser = props.isLoginUser;
    const dispatch = useDispatch();
    const [formdata, setFormdata] = useState({
        search: {
            element: 'input',
            value: '',
            config: {
                name: 'search_input',
                type: 'text',
                className: 'form-control mr-sm-2 form-control-sm',
                placeholder: 'Search username',
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
                dispatch(searchUsers(dataToSubmit.search)).then( response => {
                    if(response.payload.search){
                        let newUserData = [];
                        response.payload.search.map( item => {
                            if(item._id !== isLoginUser ){
                                return newUserData.push({
                                    id: item._id,
                                    select: false,
                                    username: item.username,
                                    age: item.age,
                                    gender: item.gender,
                                    phone: item.phone,
                                    address: item.address,
                                    imageName: item.imageName ? item.imageName : null,
                                    email: item.email,
                                    role: item.role,
                                    post: item.post,
                                    status: item.status,
                                    createdAt: item.createdAt
                                })
                            }else{
                                return '';
                            }
                        } )
                        props.searchNetwork(newUserData);
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
                >Search {props.type}</button>
            </form>
        </React.Fragment>
    );
};

export default SearchItem;