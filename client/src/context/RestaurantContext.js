import React, {useState, createContext} from 'react';

export const RestaurantContext = createContext()



export const RestaurantContextProvider = props =>{

    const [restaurants, setRestaurants] = useState([])

    const addRestaurants = newRestaurant =>{
        setRestaurants([...restaurants, newRestaurant])
    }

    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    return(
        <RestaurantContext.Provider value ={{restaurants, setRestaurants, addRestaurants, selectedRestaurant, setSelectedRestaurant}}>
            {props.children}
        </RestaurantContext.Provider>
    )
}
