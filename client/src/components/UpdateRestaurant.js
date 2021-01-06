import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import RestaurantsFinder from "../api/RestaurantsFinder";
import {useHistory} from "react-router-dom"

const UpdateRestaurant = (props) => {
    const { id } = useParams();
    let history = useHistory()
    
    const [name,setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('')

    useEffect(()=>{
        try {
            const fetchData = async () => {
                const {data} = await RestaurantsFinder.get(`/${id}`);
                setName(data[0].name)
                setLocation(data[0].location)
                setPriceRange(data[0].price_range)
            };
            fetchData();
        } catch (error) {
            console.log(error.message);
        }
        
    },[id])

    const handleSubmit =async e =>{
        e.preventDefault()
        const {data} =await RestaurantsFinder.put(`/${id}`, {
            name, location, price_range: priceRange
        })
        history.push('/')
    }

	return (
        <div>
        
			<form onSubmit={handleSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Name</label>
                    <input
                        value={name}
                        onChange={e =>setName(e.target.value)}
						id='name'
						type='text'
						className='form-control'
						placeholder='Location'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='name'>Location</label>
                    <input
                        value={location}
                        onChange={e => setLocation(e.target.value)}
						id='location'
						type='text'
						className='form-control'
						placeholder='Location'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='priceRange'>Price Range</label>
                    <input value={priceRange}
                    onChange={e => setPriceRange(e.target.value)} id='priceRange' type='number' className='form-control' />
                </div>
                <button type='submit' className='btn btn-primary mt-3'>Save</button>
			</form>
		</div>
	);
};

export default UpdateRestaurant;
