import React from 'react';
import './Modal.css';
import PropTypes from 'prop-types';

const Modal = (props) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={() => props.onClose()}>&times;</span>
          <h2>{props.book.title}</h2>
          <h4>{props.book.subtitle}</h4>
        </div>
        <div className="modal-body">
          <p>{props.book.description}</p>
          <p><strong>Categories: </strong>{props.book.categories.join(" ,")}</p>
          <p><strong>Publisher: </strong>{props.book.publisher}</p>
          <p><strong>Date Published: </strong>{props.book.publishedDate}</p>
        </div>
        <div className="modal-footer">
          <h3></h3>
        </div>
      </div>
    </div>

  )
}

Modal.propTypes = {
  book: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}

export default Modal;
