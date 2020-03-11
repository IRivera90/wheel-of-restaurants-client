import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const randomRestaurant = (restaurants) => restaurants[ Math.floor(Math.random() * (restaurants.length)) ]

class Randomize extends Component {
  constructor () {
    super()

    this.state = { restaurants: [] }
  }
  componentDidMount () {
    axios({
      url: `${apiUrl}/restaurants`,
      method: 'get',
      headers: {
        Authorization: `Bearer ${this.props.user.token}`
      }
    })
      .then(
        res => {
          this.setState({ restaurants: res.data.restaurants, randRestaurant: randomRestaurant(res.data.restaurants) })
        })
      .catch(console.error)
  }

  // const j = Math.floor(Math.random() * (i + 1))
  // const temp = restaurants[i]
  // restaurants[i] = restaurants[j]
  // restaurants[j] = temp

  render () {
    // const shuffledRestaurants = this.state.restaurants.map(restaurant => (
    //   <li key={restaurant._id}>
    //     <Link to={`/restaurants/${restaurant._id}`}>{restaurant.name}</Link>
    //   </li>
    // ))
    return (
      <div>
        <button onClick={() => this.setState({ randRestaurant: randomRestaurant(this.state.restaurants) })}> Randomize </button>
        <div> {this.state.randRestaurant && this.state.randRestaurant.name} </div>
      </div>
    )
  }
}

// Randomize.propTypes = {
// restaurants: React.PropTypes.array
// }
export default Randomize
