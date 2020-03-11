import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

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
          console.log(res)
          this.setState({ restaurants: res.data.restaurants })
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
    const randomRestaurant = this.state.restaurants[ Math.floor(Math.random() * (this.state.restaurants.length)) ]
    return (
      <div>
        <button onClick={this.shuffleArray}> Randomize </button>
        {randomRestaurant && randomRestaurant.name}
      </div>
    )
  }
}

// Randomize.propTypes = {
// restaurants: React.PropTypes.array
// }
export default Randomize
