import React, { useState } from "react";
import { useHistory, useLocation, useParams } from "react-router-dom";
import RestaurantsFinder from "../api/RestaurantsFinder";

const AddReview = () => {
    const history = useHistory()
    const location = useLocation()
    const {id} = useParams()
	const [name, setName] = useState("");
	const [review, setReview] = useState("");
    const [rating, setRating] = useState("Rating");

    const handleSubmit =async e =>{
        e.preventDefault()
        const {data} = await RestaurantsFinder.post(`/${id}/addReview`, {
            name, review,rating
        })

        history.push('/')
        history.push(location.pathname)

    }
	return (
		<div className='mb-2'>
			<form onSubmit={handleSubmit}>
				<div className='form-row'>
					<div className='form-group  col-4'>
						<label htmlFor='name'>Name</label>
						<input
							className='form-control'
							id='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							type='text'
							placeholder='Name'
						/>
					</div>
					<div className='form-group col-4 mt-3'>
						<label htmlFor='rating'>Rating:{' '} </label>
                        <select value={rating}
                        id='rating'
                        onChange={(e) =>setRating(e.target.value)}
                         className='custom-select'
                        >
                         <option disabled>Rating</option>
                         <option value='1'>1</option>
                         <option value='2'>2</option>
                         <option value='3'>3</option>
                         <option value='4'>4</option>
                         <option value='5'>5</option>
                         </select>
					</div>
					<div className='form-group'>
						<label htmlFor='review'>Text</label>
						<textarea
							className='form-control'
							id='review'
							value={review}
							onChange={(e) => setReview(e.target.value)}
							type='text'
							placeholder='text'
						></textarea>
					</div>

					<button type='submit' className='btn btn-primary mt-3'>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddReview;
