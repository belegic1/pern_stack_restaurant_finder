import React from 'react'

const StarRating = ({rating}) => {
    const stars = []
    let rat = rating -1
    for (let i = 0; i < 5; i++) {
        if(i <= rat){
            stars.push('fas fa-star text-warning')
        }
        else if( i === Math.ceil(rat && !Number.isInteger(rat))){
            stars.push('fas fa-star-half-alt text-waring')
        }
        else{
            stars.push('far fa-star')
        }
        
    }
    return (
			<>
				{stars.map((star, i) => (
					<i key={i} className={star}></i>
				))}
			</>
		);
}

export default StarRating
