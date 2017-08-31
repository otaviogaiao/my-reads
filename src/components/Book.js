import React, {Component} from 'react';
import Modal from './Modal';
import StarRatingComponent from 'react-star-rating-component';
import _ from 'lodash';

class Book extends Component {

  constructor(props){
    super(props);
    this.state = {
      modalOpen: false
    }
    this.openModal = this.openModal.bind(this)
  }

  componentWillMount(){
    this.setState({shelf: this.props.book.shelf, rating: this.props.book.averageRating});
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

//O rating vai se perder ao trocar ou recarregar a tela pois a API não fornece função para alterar isso no servidor
  changeRating(e){
    this.setState({rating: e, starColor: '#FF0000'})
    //chama função de alterar Rating no servidor
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
                {this.props.shelves.map((shelf) => {
                  return <option value={shelf} key={shelf}>{_.startCase(shelf)}</option>
                })}
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.book.title}</div>
          <div className="book-authors">
            {this.props.book.authors && this.props.book.authors.map((author, index) => <span key={index}>{author}</span>)}
          </div>
          <StarRatingComponent
                    name={this.props.book.id}
                    starCount={5}
                    value={this.props.book.averageRating}
                    starColor={this.state.starColor}
                    onStarClick={(e)=>{this.changeRating(e)}}
          />
          <div>
            <span onClick={() => this.openModal()} className="book-detail-link">See details</span>
          </div>
          {this.state.modalOpen && <Modal book={this.props.book} onClose={this.closeModal}/>}
      </div>
    )
  }
}

export default Book;
