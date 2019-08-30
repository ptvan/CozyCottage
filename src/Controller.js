import React, { Component } from 'react';
import Viz from './Viz.js'

export default class Controller extends Component {
  state = {
	  color: "", 
	  width: "", 
	  toDraw: [], 
	}

  onSubmit = (evt) => {
  	evt.preventDefault(); 
  	const newShape = {
  	   color: this.state.color, 
  	   width: this.state.width,
  	}
    this.setState({ toDraw: [...this.state.toDraw, newShape]})
  } 

  onChange = (evt) => {
  	this.setState({[evt.target.name]: evt.target.value})
  }

  render() {
    return(
      <div className="controller">
        <form onSubmit={this.onSubmit}>
        <label htmlFor="colorSelect">Filter:</label>
        <select id="colorSelect" name="color" onChange={this.onChange} value={this.state.color||"default"}>
          <option disabled value="default">choose</option>
          <option value="listed_price">price</option>
          <option value="house_sqft">house size</option>
          <option value="lot_sqft">lot size</option>
          <option value="n_bedrooms">bedrooms</option>
          <option value="n_bathrooms">bathrooms</option>
          
        </select>
        <label htmlFor="pixelInput">value:</label>
        <input id="pixelInput" name="width" onChange={this.onChange} />
        <button type="submit">filter</button>
        </form>
        { this.state.toDraw.length ? <Viz shapes={this.state.toDraw}/> : null}
      </div>

    )
  }
}