import React,{ useState, useEffect } from 'react';
import FontAwesome from 'react-fontawesome';

const FlashMessage = ({ message }) => {

    const [ displayMessage, setDisplayMessage ] = useState({
        access: false,
        type: '',
        message: ''
    })

    useEffect( () => {
        setDisplayMessage(message)
    },[message] )

    const renderTemplate = () => {
        if(displayMessage.access){
            return(
                <React.Fragment>
                    <div className={(displayMessage.type === 'danger') ? "ct_alert ct_danger" : "ct_alert ct_success"}>
                        <div className="text-center">
                            <div className="ct_alert_icon pb-3">
                                {(displayMessage.type === 'danger') ? <FontAwesome name="times"/> : <FontAwesome name="check"/> }
                            </div>
                            <div className="ct_alert_text">
                                {displayMessage.message}
                            </div>
                        </div>
                    </div>
                    { resetFlash() }
                </React.Fragment>
            )
        }
    }

    //*-------------------------------*/
    //---@Remove Flash Message
    //--------------------------------*/ 
    const resetFlash = () => {
        setTimeout(() => {
            setDisplayMessage({
                type: '',
                message: ''
            })
        }, 3000);
    }

    return (
        <React.Fragment>
            {renderTemplate()}
        </React.Fragment>
    );
};

export default FlashMessage;