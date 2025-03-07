import { Modal } from 'react-bootstrap';
import React from 'react';
import "../Modal/CommonModal.scss";


const CommonModal = (props) => {
    const { body, title, modalClass, ...rest } = props
    return (
        <Modal backdrop="static" {...rest} size="lg" className={`themeModal_2 ${modalClass}`} centered>
            <Modal.Header closeButton><Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title></Modal.Header>
            <Modal.Body>{body}</Modal.Body>
        </Modal>
    )
}

export default CommonModal;