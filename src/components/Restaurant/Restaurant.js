import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
// import Layout from '../shared/Layout'

class Restaurant extends Component {
  constructor (props) {
    super(props)

    this.state = {
      restaurant: null,
      deleted: false
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

  destroy = () => {
    axios({
      url: `${apiUrl}/restaurants/${this.props.match.params.id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
  }
  /*
  async destroy = () => {
    try {
      const response = await axios({
        url: `${apiUrl}/restaurants/${this.props.match.params.id}`,
        method: 'DELETE'
      })
      this.setState({ deleted: true })
    } catch (err) {
      console.error(err)
    }
  }
  */

  render () {
    const { restaurant, deleted } = this.state

    if (!restaurant) {
      return <p>Loading...</p>
    }

    if (deleted) {
      return <Redirect to={
        { pathname: '/', state: { msg: 'Restaurant succesfully deleted!' } }
      } />
    }

    return (
      <div>
        <h4>{restaurant.name}</h4>
        <button onClick={this.destroy}>Delete Restaurant</button>
        <Link to={`/restaurants/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/restaurants">Back to all restaurants</Link>
      </div>
    )
  }
}

export default Restaurant
