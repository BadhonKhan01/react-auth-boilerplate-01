import React from 'react';
import Fontawesome from 'react-fontawesome';

const Pagination = (props) => {

    return (

        <nav>
            <ul className="pagination pagination-sm">

            {/* -----------------------------
            ||---@Load Previous Pages
            ----------------------------- */}
                {props.getItems ?
                    props.getItems.previous ?
                        <li className="page-item">
                            <button
                                type="button"
                                className="page-link"
                                onClick={() => props.getItem(props.getItems.previous.previouspages)}
                            >
                                <Fontawesome
                                    name="angle-double-left"
                                />
                            </button>                        
                        </li>
                    :
                        <li className="page-item disabled">
                            <button
                                type="button"
                                className="page-link"
                            >
                                <Fontawesome
                                    name="angle-double-left"
                                />
                            </button>                        
                        </li>
                : null}

            {/* -----------------------------
            ||---@Count Page Numbers
            ----------------------------- */}
                {props.getItems ?
                    props.getItems.countPages.map(item => (
                        <li key={item} className={props.currentPages === item ? "page-item active" : 'page-item'}>
                            <button
                                type="button"
                                onClick={() => props.getItem(item)}
                                className="page-link"
                            >{item}</button>
                        </li>
                    ))
                : null}


            {/* -----------------------------
            ||---@Load Next Pages
            ----------------------------- */}
                {props.getItems ?
                    props.getItems.next ?
                        <li className="page-item">

                            <button
                                type="button"
                                onClick={() => props.getItem(props.getItems.next.nextpages)}
                                className="page-link" 
                            >
                                <Fontawesome
                                    name="angle-double-right"
                                />
                            </button>
                        </li>
                    :
                        <li className="page-item disabled">
                            <button type="button" className="page-link" >
                                <Fontawesome
                                    name="angle-double-right"
                                />
                            </button>
                        </li>
                : null}
            </ul>
        </nav>

    );
};

export default Pagination;