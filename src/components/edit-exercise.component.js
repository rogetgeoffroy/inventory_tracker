import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from 'react-router-dom';
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default class EditExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeItem = this.onChangeItem.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeSize = this.onChangeSize.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.onChangeSku = this.onChangeSku.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      item: '',
      image: '',
      description: '',
      price: 0,
      size: '',
      color: '',
      sku: 0,
      date: new Date(),
      users: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          item: response.data.item,
          image: response.data.image,
          description: response.data.description,
          price: response.data.price,
          size: response.data.size,
          color: response.data.color,
          sku: response.data.sku,
          date: new Date(response.data.date)
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          this.setState({
            users: response.data.map(user => user.item),
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  onChangeItem(e) {
    this.setState({
      item: e.target.value
    })
  }

  onChangeImage(e) {
    this.setState({
      image: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangePrice(e) {
    this.setState({
      price: e.target.value
    })
  }

  onChangeSize(e) {
    this.setState({
      size: e.target.value
    })
  }

  onChangeColor(e) {
    this.setState({
      color: e.target.value
    })
  }

  onChangeSku(e) {
    this.setState({
      sku: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      item: this.state.item,
      image: this.state.image,
      description: this.state.description,
      price: this.state.price,
      size: this.state.size,
      color: this.state.color,
      sku: this.state.sku,
      date: this.state.date
    }

    console.log(exercise);

    axios.post('http://localhost:5000/exercises/update/' + this.props.match.params.id, exercise)
      .then(res => console.log(res.data));

    window.location = '/';
  }



  render() {
    return (
    <div className="edit-inventory-items-container">
      <Link to="/" className="navbar-brand"><FontAwesomeIcon icon={faArrowLeft} /> Back</Link>
      <h3>Edit Item Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group row"> 
          <label class="col-sm-2 col-form-label">Item:</label>
          <div class="col-sm-10">
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.item}
                onChange={this.onChangeItem}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
        </div>
        <div className="form-group row"> 
          <label class="col-sm-2 col-form-label">Image:</label>
          <div class="col-sm-10">
            <input  type="text"
                required
                className="form-control"
                value={this.state.image}
                onChange={this.onChangeImage}
                />
          </div>
        </div>
        <div className="form-group row"> 
          <label class="col-sm-2 col-form-label">Description:</label>
          <div class="col-sm-10">
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
        </div>
        <div className="form-group row">
          <label class="col-sm-2 col-form-label">Price (in USD): </label>
          <div class="col-sm-10">
            <input 
                type="text" 
                className="form-control"
                value={this.state.price}
                onChange={this.onChangePrice}
                />
          </div>
        </div>
        <div className="form-group row"> 
          <label class="col-sm-2 col-form-label">Size: </label>
          <div class="col-sm-10">
            <input  type="text"
                required
                className="form-control"
                value={this.state.size}
                onChange={this.onChangeSize}
                />
          </div>
        </div>
        <div className="form-group row"> 
          <label class="col-sm-2 col-form-label">Color: </label>
          <div class="col-sm-10">
            <input  type="text"
                required
                className="form-control"
                value={this.state.color}
                onChange={this.onChangeColor}
                />
          </div>
        </div>
        <div className="form-group row">
          <label class="col-sm-2 col-form-label">SKU: </label>
          <div class="col-sm-10">
            <input 
                type="text" 
                className="form-control"
                value={this.state.sku}
                onChange={this.onChangeSku}
                />
          </div>
        </div>
        <div className="form-group row">
          <label class="col-sm-2 col-form-label">Date: </label>
          <div class="col-sm-10">
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Edit Exercise Item" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}