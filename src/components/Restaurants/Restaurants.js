import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'

class Restaurants extends Component {
  constructor (props) {
    super(props)

    this.state = {
      restaurants: []
    }
  }

  componentDidMount () {
    axios({
      url: `${apiUrl}/restaurants`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(res => this.setState({ restaurants: res.data.restaurants }))
      .catch(console.error)
  }
  /*
  Async/Await version:
  async componentDidMount () {
    try {
      const response = await axios(`${apiUrl}/restaurants`)
      this.setState({ restaurants: response.data.restaurants })
    } catch (err) {
      console.error(err)
    }
  }
  */

  render () {
    const restaurants = this.state.restaurants.map(restaurant => (
      <li key={restaurant._id}>
        <Link to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link>
      </li>
    ))

    return (
      <div>
        <h4>Restaurants</h4>
        <ul>
          {restaurants}
        </ul>
      </div>
    )
  }
}

export default Restaurants
