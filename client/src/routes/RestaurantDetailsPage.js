import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import RestaurantsFinder from "../api/RestaurantsFinder";
import AddReview from "../components/AddReview";
import Reviews from "../components/Reviews";
import StarRating from "../components/StarRating";
import { RestaurantContext } from "../context/RestaurantContext";

const RestaurantDetailsPage = () => {
	const { id } = useParams();
	const { selectedRestaurant, setSelectedRestaurant } = useContext(
		RestaurantContext
	);

	useEffect(() => {
		try {
			const fetchData = async () => {
				const {data} = await RestaurantsFinder.get(`/${id}`);
				setSelectedRestaurant(data)
            };
            fetchData()
		} catch (error) {
			console.log(error.message);
		}
	}, [id, setSelectedRestaurant]);
	
    return (
			<div>
				{selectedRestaurant && (
					<>
						<h1 className='text-center display-1'>
							{selectedRestaurant.restaurant[0].name}
						</h1>
						<div className='text-center'>
							<StarRating
								rating={selectedRestaurant.restaurant[0].average_rating}
							/>
							<span className='text-warning ml-1'>
								{selectedRestaurant.restaurant[0].count
									? ` ${selectedRestaurant.restaurant[0].count} reviews`
									: " 0 reviews"}
							</span>
						</div>
						<div className='mt-3'>
							<Reviews reviews={selectedRestaurant.review} />
						</div>
						<AddReview />
					</>
				)}
			</div>
		);
};

export default RestaurantDetailsPage;
