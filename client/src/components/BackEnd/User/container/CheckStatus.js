import React from 'react';
import FontAwesome from 'react-fontawesome';


const CheckStatus = (props) => {

    const renderStatus = () => {
        let template = '';
        switch (props.status) {
            case 'superadmin':
                template = <FontAwesome className="text-primary" name="superpowers"/>
            break;

            case 'active':
                template = <FontAwesome className="text-success" name="check"/>
            break;

            case 'deactivate':
                template = <FontAwesome className="text-danger" name="eye-slash"/>
            break;

            case 'processing':
                template = <FontAwesome className="text-info" name="cogs"/>
            break;
            
            default:
                    template = null;
            break;
        }

        return template;
    }

    return (
        <React.Fragment>
            {renderStatus()}
        </React.Fragment>
    );
};

export default CheckStatus;