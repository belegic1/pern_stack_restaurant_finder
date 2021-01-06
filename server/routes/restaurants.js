import express from "express";

import db from "../db/index.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const restaurants = await db.query('select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1)as average_rating from reviews group by restaurant_id) reviews on restaurants.id =reviews.restaurant_id');
	res.json(restaurants.rows);
});

router.get("/:id", async (req, res) => {
	try {
        const restaurant = await db.query(
					"select * from restaurants left join (select restaurant_id, count(*), trunc(avg(rating),1)as average_rating from reviews group by restaurant_id) reviews on restaurants.id =reviews.restaurant_id where id = $1",
					[req.params.id]
				);
        const review = await db.query(
			"select * from reviews where restaurant_id = $1",[
                req.params.id
            ]
				);
        if (!restaurant) {
            return res.status(404).json({message: 'Not Found'})
        }
        res.json({restaurant: restaurant.rows, review: review.rows})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.post('/', async(req,res)=>{
    try {
         const restaurant = await db.query(
						"insert into restaurants(name,location,price_range)values($1,$2,$3) returning *",
						[req.body.name, req.body.location, req.body.price_range]
                    );
            res.json({
                message: 'Success',
                 data: restaurant.rows
            })
        
    } catch (error) {
       res.status(401).json(error.message)
    }
})


router.put('/:id', async (req, res)=>{
    try {
        const restaurant = await db.query('update restaurants set name = $1, location = $2, price_range = $3 where id = $4 returning *',[
            req.body.name, req.body.location, req.body.price_range, req.params.id
        ])
        res.json({message: 'success', data: restaurant.rows})
    } catch (error) {
        res.status(401).json(error.message)
    }
})

router.delete('/:id', async (req, res)=>{
    try {
        const restaurant = await db.query('delete from restaurants where id = $1',[req.params.id])
        res.json({message: 'success'})
    } catch (error) {
        console.log(error.message);
    }
})

router.post('/:id/addReview', async(req, res)=>{
    try {
        const review = await db.query('insert into reviews(restaurant_id,name,review, rating)values($1,$2,$3,$4) returning *', [
          req.params.id , req.body.name, req.body.review ,req.body.rating,
        ])
        res.status(201).json(review.rows)
    } catch (error) {

        console.log(error.message);
    }
})

export default router;
