import React, {Component} from 'react';
import Modal from './Modal'

class Book extends Component {

  constructor(props){
    super(props);
    this.state = {
      modalOpen: false
    }
    this.openModal = this.openModal.bind(this)
  }

  componentWillMount(){
    this.setState({shelf: this.props.book.shelf});
  }

  changeShelf = (e) => {
    this.setState({shelf: e.target.value});
    this.props.handleChangeShelf(this.props.book, e.target.value)
  }

  openModal() {
    this.setState({modalOpen: true})
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  render(){
    let image = `url("${this.props.book.imageLinks.smallThumbnail}")`;
    return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: image }}></div>
            <div className="book-shelf-changer">
              <select value={this.state.shelf} onChange={this.changeShelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">
            {this.props.book.authors && this.props.book.authors.map((author, index) => <span key={index}>{author}</span>)}
          </div>
          <div>
            <span onClick={() => this.openModal()}>See details</span>
          </div>
          {this.state.modalOpen && <Modal book={this.props.book} onClose={this.closeModal}/>}
      </div>
    )
  }
}

export default Book;
