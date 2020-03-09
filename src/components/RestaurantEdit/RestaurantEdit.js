import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import RestaurantForm from '../RestaurantForm/RestaurantForm'
// import Layout from '../shared/Layout'

class RestaurantEdit extends Component {
  constructor (props) {
    super(props)

    this.state = {
      restaurant: {
        name: ''
      },
      updated: false
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/restaurants/${this.props.match.params.id}`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ restaurant: res.data.restaurant }))
      .catch(console.error)
  }
  /*
  Async/Await version:
  async componentDidMount () {
    try {
      const response = await axios(`${apiUrl}/restaurants/${this.props.match.params.id}`)
      this.setState({ restaurant: response.data.restaurant })
    } catch (err) {
      console.error(err)
    }
  }
  */

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }

    const editedRestaurant = Object.assign(this.state.restaurant, updatedField)

    this.setState({ restaurant: editedRestaurant })
  }

  handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/restaurants/${this.props.match.params.id}`,
      method: 'PATCH',
      data: { restaurant: this.state.restaurant },
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(() => this.setState({ updated: true }))
      .catch(console.error)
  }
  /*
  async handleSubmit = event => {
    event.preventDefault()
    try {
      const response = await axios({
        url: `${apiUrl}/restaurants/${this.props.match.params.id}`,
        method: 'PATCH',
        data: { restaurant: this.state.restaurant },
        headers: {
          Authorization: `Bearer ${this.props.user.token}`
        }
      })
      this.setState({ updated: true })
    } catch (err) {
      console.error(err)
    }
  }
  */

  render () {
    const { restaurant, updated } = this.state
    const { handleChange, handleSubmit } = this

    if (updated) {
      return <Redirect to={`/restaurants/${this.props.match.params.id}`} />
    }

    return (
      <div>
        <RestaurantForm
          restaurant={restaurant}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/restaurants/${this.props.match.params.id}`}
        />
      </div>
    )
  }
}

export default RestaurantEdit
