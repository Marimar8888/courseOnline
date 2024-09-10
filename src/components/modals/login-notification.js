import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('.app-wrapper');

const LoginNotification = ({ isOpen, onRequestClose, message }) => {
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Login Required"
            className="Modal"
            overlayClassName="Overlay"
            shouldCloseOnOverlayClick={true}
        >
            <div className='modal-notificacion-wrapper'>
                <div className='modal-notification-text'>
                    <h2>Aviso</h2>
                    <p>{message}</p>
                </div>
                <div className='btn-close'>
                    <button className="btn" onClick={onRequestClose}>Cerrar</button>
                </div>
            </div>
        </ReactModal>
    );
};

export default LoginNotification;