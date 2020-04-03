import React,{ useState } from 'react';

const LoadImage = (props) => {
    const imageInfo = props.imageInfo;

    //*-------------------------------*/
    //---@Image LazyLoad
    //--------------------------------*/  
    const [ lazyLoad, setLazyLoad ] = useState(false);
    const imgloaded = () => {
        setLazyLoad(true)
    }

    return (
        <React.Fragment>
            <img 
                className="img-fluid" 
                src={`${props.origin}/api/media/image?year=${imageInfo.year}&month=${imageInfo.month}&urlname=${imageInfo.urlname}`}   
                alt={imageInfo.displayname} 
                onLoad={ imgloaded }
            />
            {/*--------------------------------------------
            |--- @Loader
            --------------------------------------------*/}
            {!lazyLoad ?
                <div className="uploadLoader">
                    <div className="preloader"></div>
                </div>
            :null}
        </React.Fragment>
    );
};

export default LoadImage;