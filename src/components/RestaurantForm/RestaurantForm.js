import React from 'react'
import { Link } from 'react-router-dom'

const RestaurantForm = ({ restaurant, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Name</label>
    <input
      placeholder="Name of restaurant"
      value={restaurant.name}
      name="name"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default RestaurantForm
