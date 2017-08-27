import React, {Component} from 'react';
import './Modal.css';

class Modal extends Component {

  componentDidMount(){
    console.log(this.props.book)
  }

  render(){
    return (
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
        </div>
        <div className="modal-footer">
          <h3>Modal Footer</h3>
        </div>
      </div>
    )
  }
}

export default Modal;
