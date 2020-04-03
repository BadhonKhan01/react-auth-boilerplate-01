import React from 'react';
import { Redirect } from 'react-router-dom';

// ===================================
//  @Redirect Function
// ===================================
export const redirect = (url = '') => {
    return (
        <React.Fragment>
            <Redirect to={`/${url}`} />
        </React.Fragment>
    )
}

// ===================================
//  @Form Validate Function
// ===================================
export const validate = (element, formdata = []) => {
    let error = [true, ''];


    if(element.validation.email){
        const valid = /\S+@\S+\.\S+/.test(element.value);
        const message = `${!valid ? 'Must be a valid email' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if(element.validation.confirm){
        const valid = element.value.trim() === formdata[element.validation.confirm].value;
        const message = `${!valid ? 'Passwords do not match' : ''}`;
        error = !valid ? [valid, message] : error;
    }

    if (element.validation.required) {
        const valid = element.value.trim() !== '';
        const message = `${!valid ? 'This field is required' : ''}`;
        error = !valid ? [valid, message] : error;
    }
    return error;
}

// ===================================
//  @Update Form Fields Function
// ===================================
export const update = (element, content = '', formdata) => {
    const newFormData = { ...formdata };
    const newElement = { ...newFormData[element.id] }

    // @Content Config For Image
    if (content === '') {
        newElement.value = element.event.target.value;
    } else {
        newElement.value = content;
    }

    let valiData = validate(newElement, formdata);
    newElement.valid = valiData[0];
    newElement.validationMessage = valiData[1];    
    newFormData[element.id] = newElement;
    return newFormData;
}

// ===================================
//  @Submited Data Generate Function
// ===================================
export const generateData = (formdata) => {
    let dataToSubmit = {};
    for (let key in formdata) {
        if(key !== 'confirmPassword'){
            dataToSubmit[key] = formdata[key].value;
        }
    }
    return dataToSubmit;
}

// ===================================
//  @Form Validate Function
// ===================================
export const isFormValid = (formdata) => {
    let isFormValid = true;
    for (const key in formdata) {
        isFormValid = formdata[key].valid && isFormValid;

        if(formdata[key].valid === true){
            isFormValid = true;
        }
    }
    return isFormValid;
}

// ===================================
//  @Check User Role
// ===================================
// export const CheckRole = (props) => {
//     let type = '';
//     let role = props.role;
//     switch (role) {
//         case 0:
//                 type = 'Superadmin';
//             break;

//         case 1:
//                 type = 'Administrator';
//             break;

//         case 2:
//                 type = 'Editor';
//             break;

//         case 3:
//                 type = 'Author';
//             break;

//         case 4:
//                 type = 'Contributor';
//             break;

//         case 5:
//                 type = 'Subscriber';
//             break;
            
//         default:
//                 type = '';
//             break;
//     }

//     return type;
// }
