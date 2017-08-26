import React, {Component} from 'react';

class Book extends Component {

  constructor(props){
    super(props);
    this.state = {}
  }

  componentWillMount(){
    this.setState({shelf: this.props.book.shelf});
  }

  changeShelf = (e) => {
    this.setState({shelf: e.target.value});
    this.props.handleChangeShelf(this.props.book, e.target.value)
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
            {this.props.book.authors.map((author, index) => <span key={index}>{author}</span>)}
          </div>
      </div>
    )
  }
}

export default Book;
