import React from 'react';
import css from "../assets/css/Modal.css";
const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                {children}

            </section>
        </div>
    );
};

export  default  Modal;


