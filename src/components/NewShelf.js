import React, {Component} from 'react';
import * as BooksAPI from '../BooksAPI';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import './Modal.css';
import './NewShelf.css';

class NewShelf extends Component {

  state = {
    value: '',
    loading: false
  }

  newShelf = '';

  createNewShelf(){
    if(this.state.value.length > 0){
      this.setState({loading: true})
      BooksAPI.addShelf(this.state.value).then(()=>{
        this.newShelf = this.state.value;
        this.setState({loading: false});
        this.props.onClose(this.newShelf)
      }).catch((error) => {
        console.log(error);
        this.setState({loading: false})
      })
    }
  }

  handleChange = (e) =>{
    this.setState({value: e.target.value});
  }

  render(){
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <span className="close" onClick={() => this.props.onClose(this.newShelf)}>&times;</span>
            <h2>Add new shelf</h2>
          </div>
          <div className="modal-body">
            {this.state.loading ?
              <div>
                <CircularProgress size={80} thickness={5} />
              </div> :
              <div>
              <TextField
                 floatingLabelText="Shelf"
                 value={this.state.value}
                 onChange={this.handleChange}
                 className="shelf-text-field"
               /><br />
               <RaisedButton label="Save" backgroundColor="#2962FF" labelColor="#FAFAFA" className="create-button" onClick={() => this.createNewShelf()}/>
            </div>}



          </div>
          <div className="modal-footer">
            <h3></h3>
          </div>
        </div>
      </div>
    )
  }
}

export default NewShelf;
