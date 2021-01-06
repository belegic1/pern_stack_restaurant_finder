import React from 'react'
import AddressRestaurant from '../components/AddressRestaurant'
import Header from '../components/Header'
import RestaurantList from '../components/RestaurantList'

const Home = () => {
    return (
        <div>
            <Header/>
            <AddressRestaurant/>
            <RestaurantList/>
        </div>
    )
}

export default Home
