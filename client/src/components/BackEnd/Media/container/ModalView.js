import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';


const ModalView = (props) => {

    const data = props.data;
    const [displayModal, setDisplayModal] = useState(false);

    //*-------------------------------*/
    //   @Get Image Dimensions
    //--------------------------------*/ 
    const [ imageDimensions, setImageDimensions ] = useState()
    const onImageLoad = ({target:img}) => {
        setImageDimensions({
            width: img.naturalWidth,
            height: img.naturalHeight
        })
    }

    return (
        <React.Fragment>

            <button
                type="button"
                className="btn btn-link text-success p-0 pr-3 mr-3 border-right"
                onClick={() => setDisplayModal(true)}
            >
                {props.buttonText}
            </button>

            {displayModal ?
                <React.Fragment>
                    <div 
                        className={displayModal ? "modal fade bd-example-modal-xl show d-block" : "modal fade bd-example-modal-xl"}
                        style={{ overflowY: 'scroll' }}
                    >
                        <div className="modal-dialog modal-xl" role="document">
                            <div className="modal-content bg-dark">
                                <div className="container">
                                    <div className="row">

                                        <div className="col-md-9 p-0 d-flex justify-content-center align-items-center">
                                            {data ?
                                                <img
                                                    onLoad={ onImageLoad }
                                                    src={`${window.location.origin}/api/media/image?year=${data.year}&month=${data.month}&urlname=${data.urlname}`}
                                                    alt={data.alt ? data.alt : data.urlname}
                                                    className="img-fluid"
                                                />
                                            :null}
                                            
                                        </div>

                                        <div className="col-md-3 pt-4 pb-4 border-left bg-white">
                                            <div className="modal-header p-0 border-0">
                                                <h6>Upload Details</h6>
                                                <button 
                                                    type="button" 
                                                    className="close pr-0 pl-0 mr-2"
                                                    onClick={ () => setDisplayModal(false) }
                                                >
                                                    <span>&times;</span>
                                                </button>
                                            </div>

                                            <hr />
                                            <div className="x_details">
                                                <p className="m-0" style={{ overflow: 'hidden' }}> <strong> {data.displayname} </strong></p>
                                                <p className="m-0" style={{ overflow: 'hidden' }}>
                                                    <Moment format="DD-MMM-YYYY">
                                                        {data.createdAt}
                                                    </Moment>
                                                </p>
                                                <p className="m-0 text-muted" style={{ overflow: 'hidden' }}> {data.type} </p>
                                                <p className="m-0 text-muted" style={{ overflow: 'hidden' }}> {data.size} bytes </p>
                                                {imageDimensions ?
                                                    <p className="m-0 text-muted overflow-hidden">{imageDimensions.width} × {imageDimensions.height} pixels</p>
                                                :null}

                                                {/*-------------------------------
                                                    |--- @Action Media 
                                                -------------------------------*/}
                                                <div className="mt-1 mb-1 d-flex align-items-center">

                                                    {/*-------------------------------
                                                        |--- @Edit Media
                                                    -------------------------------*/}
                                                    <Link to={`/media/edit/${data.id}`}>Edit</Link>

                                                </div>

                                            </div>
                                            <hr />

                                            <div className="x_alt_text d-flex flex-column">
                                                <main>
                                                    <strong className="float-left mr-2" >Alt Text:</strong> 
                                                    <p className="text-muted">{data.alt}</p>
                                                </main>
                                            </div>

                                            <div className="x_caption_text d-flex flex-column">
                                                <main>
                                                    <strong className="float-left mr-2" >Caption:</strong> 
                                                    <p className="text-muted">{data.caption}</p>
                                                </main>
                                            </div>

                                            <div className="x_description_text d-flex flex-column">
                                                <main>
                                                    <strong className="float-left mr-2" >Description:</strong> 
                                                    <p className="text-muted">{data.description}</p>
                                                </main>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="modal-backdrop fade d-block" style={{ background: 'rgba(0, 0, 0, .7)', opacity: '1' }}></div>
                </React.Fragment>
            : null}


        </React.Fragment>
    );
};

export default ModalView;