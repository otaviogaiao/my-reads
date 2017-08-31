import React, {Component} from 'react';
import './Modal.css';

class Modal extends Component {

  render(){
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={() => this.props.onClose()}>&times;</span>
            <h2>{this.props.book.title}</h2>
            <h4>{this.props.book.subtitle}</h4>
          </div>
          <div className="modal-body">
            <p>{this.props.book.description}</p>
            <p><strong>Categories: </strong>{this.props.book.categories.join(" ,")}</p>
            <p><strong>Publisher: </strong>{this.props.book.publisher}</p>
            <p><strong>Date Published: </strong>{this.props.book.publishedDate}</p>
          </div>
          <div className="modal-footer">
            <h3></h3>
          </div>
        </div>
      </div>

    )
  }
}

export default Modal;
