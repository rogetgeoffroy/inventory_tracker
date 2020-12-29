import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeItem = this.onChangeItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      item: ''
    }
  }

  onChangeItem(e) {
    this.setState({
      item: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const user = {
      item: this.state.item
    }

    console.log(user);

    axios.post('http://localhost:5000/users/add', user)
      .then(res => console.log(res.data));

    this.setState({
      item: ''
    })
  }

  render() {
    return (
      <div className="create-new-inventory-item-container">
        <h3>Create New Item</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group row"> 
            <label class="col-sm-1 col-form-label">Item: </label>
            <div class="col-sm-11">
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.item}
                  onChange={this.onChangeItem}
                  />
            </div>
          </div>
          <div className="form-group">
            <input type="submit" value="Create Item" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}