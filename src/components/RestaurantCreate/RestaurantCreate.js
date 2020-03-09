import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import RestaurantForm from '../RestaurantForm/RestaurantForm'
// import Layout from '../shared/Layout'

class RestaurantCreate extends Component {
  constructor (props) {
    super(props)

    this.state = {
      restaurant: {
        name: ''
      },
      createdRestaurantId: null
    }
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedRestaurant = Object.assign(this.state.restaurant, updatedField)

    this.setState({ restaurant: editedRestaurant })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/restaurants`,
      method: 'POST',
      data: { restaurant: this.state.restaurant },
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ createdRestaurantId: res.data.restaurant._id }))
      .catch(console.error)
  }
  /*
  async handleSubmit = event => {
    event.preventDefault()
    try {
      const response = await axios({
        url: `${apiUrl}/restaurants`,
        method: 'POST',
        data: { restaurant: this.state.restaurant }
      })
      this.setState({ createdRestaurantId: response.data.restaurant.id })
    } catch (err) {
      console.error(err)
    }
  }
  */

  render () {
    const { handleChange, handleSubmit } = this
    const { createdRestaurantId, restaurant } = this.state

    if (createdRestaurantId) {
      return <Redirect to={`/restaurants/${createdRestaurantId}`} />
    }

    return (
      <div>
        <RestaurantForm
          restaurant={restaurant}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath="/"
        />
      </div>
    )
  }
}

export default RestaurantCreate
