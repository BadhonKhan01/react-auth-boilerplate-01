import React, { useState } from 'react';

// ===================================
//  Load Components
// ===================================
import CheckRole from './CheckRole';
import CheckStatus from './CheckStatus';

// ===================================
//  Load Demo Image
// ===================================
import DemoImage from './../../../../resources/img/user_avatar.png';


const ModalView = (props) => {
    const data = props.data;
    const [displayModal, setDisplayModal] = useState(false);

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
                                        <div className="col-md-12 pt-4 pb-4 border-left bg-white">
                                            <div className="modal-header p-0 border-0">
                                                <h6>User Details</h6>
                                                <button 
                                                    type="button" 
                                                    className="close pr-0 pl-0 mr-2"
                                                    onClick={ () => setDisplayModal(false) }
                                                >
                                                    <span>&times;</span>
                                                </button>
                                            </div>
                                            <hr />
                                            
                                            <div className="media row">
                                                <div className="col-md-4">
                                                    {
                                                        data.profileimage ?
                                                            <img src={`${window.location.origin}/api/media/image?year=${data.profileimage.year}&month=${data.profileimage.month}&urlname=${data.profileimage.urlname}`} className="mr-3 img-fluid" alt={data.profileimage.urlname} />
                                                        :
                                                            <img src={DemoImage} className="mr-3 img-fluid" alt="DemoImage" />
                                                    }
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="media-body">
                                                        <ul className="list-group">
                                                            <li className="list-group-item">
                                                                <strong className="text-muted float-left mr-2" >Username:</strong> 
                                                                <p className="m-0">{data.username}</p>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <strong className="text-muted float-left mr-2" >Age:</strong> 
                                                                <p className="m-0">{data.age}</p>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <strong className="text-muted float-left mr-2" >Gender:</strong> 
                                                                <p className="m-0">{data.gender}</p>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <strong className="text-muted float-left mr-2" >Phone:</strong> 
                                                                <p className="m-0">{data.phone}</p>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <strong className="text-muted float-left mr-2" >Address:</strong> 
                                                                <p className="m-0">{data.address}</p>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <strong className="text-muted float-left mr-2" >Email:</strong> 
                                                                <p className="m-0">{data.email}</p>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <strong className="text-muted float-left mr-2" >Role:</strong> 
                                                                {/* ----------------------------------
                                                                ||---@User Role Checking Components
                                                                ---------------------------------- */}
                                                                <CheckRole role={data.role} />
                                                            </li>
                                                            <li className="list-group-item">
                                                                <strong className="text-muted float-left mr-2" >Post:</strong> 
                                                                <p className="m-0">{data.post}</p>
                                                            </li>
                                                            <li className="list-group-item">
                                                                <strong className="text-muted float-left mr-2" >Status:</strong> 
                                                                {/* -----------------------------------
                                                                ||---@User Status Checking Components
                                                                ----------------------------------- */}
                                                                <CheckStatus status={data.status} />
                                                                
                                                            </li>
                                                        </ul>

                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>            
                    <div className="modal-backdrop fade d-block" style={{ background: 'rgba(0, 0, 0, .7)', opacity: '1' }}></div>
                </React.Fragment>
            :null}
        </React.Fragment>
    );
};

export default ModalView;