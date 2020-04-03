import React from 'react';

const CheckRole = (props) => {

    const renderRole = () => {
        let template = '';
        switch (props.role) {
            case 'superadmin':
                template = <span className="badge badge-primary text-capitalize">Super Admin</span>
            break;

            case 'administrator':
                template = <span className="badge badge-secondary text-capitalize">Administrator</span>
            break;

            case 'editor':
                template = <span className="badge badge-success text-capitalize">Editor</span>
            break;

            case 'author':
                template = <span className="badge badge-warning text-capitalize">Author</span>
            break;

            case 'contributor':
                template = <span className="badge badge-info text-capitalize">Contributor</span>
            break;

            case 'subscriber':
                template = <span className="badge badge-dark text-capitalize">Subscriber</span>
            break;
            
            default:
                    template = null
                break;
        }

        return template;
    }

    return (
        <React.Fragment>
            {renderRole()}
        </React.Fragment>
    );
};

export default CheckRole;