import React, {useEffect, useContext} from "react";
import RestaurantsFinder from "../api/RestaurantsFinder";
import RestaurantFinder from '../api/RestaurantsFinder'
import {RestaurantContext} from '../context/RestaurantContext'
import {useHistory} from 'react-router-dom'
import StarRating from "./StarRating";

const RestaurantList = (props) => {
	let history = useHistory()
	const {restaurants, setRestaurants} = useContext(RestaurantContext)
    useEffect(()=>{
       const fetchData = async()=>{
            try {
                const { data } = await RestaurantFinder.get("/");
                setRestaurants(data)
			} catch (error) {
                console.log(error.message);
            }
       }
       fetchData()
	},[setRestaurants])
	
	const handleDelete = async (id)=>{
		try {
			
			await RestaurantsFinder.delete(`/${id}`)
			setRestaurants(restaurants.filter(restaurant => restaurant.id !== id))
		} catch (error) {
			console.log(error.message);
		}
	}

	const handleUpdate = (id)=>{
		history.push(`/restaurants/${id}/update`)
	}

	const handleRestaurantSelect = (id )=>{
		history.push(`/restaurants/${id}`)
	}
	const renderRating = (restaurant)=>{ 
		if (!restaurant.count) {
			return <span className='text-warning'>
			0 reviews</span>
		}
		return(<>
			<StarRating rating={restaurant.id} />
			<span className='text-warning ml-1'>
			{' '} {restaurant.count} reviews </span>
		</>)
	}
	return (
		<div className='list-group'>
			<table className='table table-hover table-dark'>
				<thead>
					<tr className='bg-primary'>
						<th scope='col'>Restaurant</th>
						<th scope='col'>Location</th>
						<th scope='col'>Price Range</th>
						<th scope='col'>Rating</th>
						<th scope='col'>Edit</th>
						<th scope='col'>Delete</th>
					</tr>
				</thead>
				<tbody>
					{restaurants.map((restaurant) => (
						<tr key={restaurant.id}>
							<td
								style={{ cursor: "pointer" }}
								onClick={() => handleRestaurantSelect(restaurant.id)}
							>
								{restaurant.name}
							</td>
							<td>{restaurant.location}</td>
							<td>{"$".repeat(restaurant.price_range)}</td>
							<td>{renderRating(restaurant)}</td>
							<td>
								<button
									onClick={() => handleUpdate(restaurant.id)}
									className='btn btn-warning'
								>
									Edit
								</button>
							</td>
							<td>
								<button
									onClick={() => handleDelete(restaurant.id)}
									className='btn btn-danger'
								>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default RestaurantList;
