import React from 'react';
import FontAwesome from 'react-fontawesome';

const MultiAction = (props) => {

    return (
        <React.Fragment>
            
            {/* -----------------------------
            ||---@Total Item Count
            ----------------------------- */}
            {/* {getItems ?
                <div className="font-weight-normal">
                    <span className="text-success">
                        {getItems.countItems} items
                    </span>
                </div>
            :null} */}


            <div className="pr-3">

                {/* -----------------------------
                ||---@Delete Multiple Item
                ----------------------------- */}
                <button 
                    className="btn btn-link text-success p-0 pr-2 mr-2" 
                    onClick={() => props.loadAllItem(true)}
                    style={{ borderTop: "0px", borderBottom: "0px" }}
                >
                    Total {props.type} (<span>{props.getItems ? props.getItems.countItems : null}</span>)
                </button>


                {/* -----------------------------
                ||---@Restore Multiple Item
                ----------------------------- */}
                {/* <Link
                    to={`/media/trash`}
                    className="btn btn-link text-success p-0 pr-2 mr-2" 
                >
                    <FontAwesome
                        name="ban"
                    /> Trash
                </Link>  */}

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

        </React.Fragment>
    );
};

export default MultiAction;