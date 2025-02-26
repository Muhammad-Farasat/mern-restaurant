import Cart from "../Models/Cart.js";
import Food from "../Models/Food.js";
import Restaurant from "../Models/Restaurant.js"


export const addFood = async(req, res) => {
    try {   
        
        const { name, description, price, image } = req.body
        const restaurantId = req.user.id

        if (!name || !description || !price || !image) {
            return res.status(400).json({message: "Fill all fields"})
        }

        const food = await new Food({name, description, price, image, restaurantId})

        await food.save()

        await Restaurant.findByIdAndUpdate(restaurantId, {
            $push: {foodItems: food._id}
        })

        return res.status(200).json({success: true, food})

    } catch (error) {
        console.error("Error in add food controller", error);
        res.status(500).json({error: "Internal server error", error})
    }
}

export const deleteFood = async(req, res) => {
    try {
        
        const {foodId} = req.body
        const restaurantId = req.user.id
        
        console.log("This is ID from body", foodId);
        
        const food = await Food.findByIdAndDelete(foodId)

        const restaurant = await Restaurant.findByIdAndUpdate(restaurantId, {
            $pull: { foodItems: foodId },
        },{new: true}
    );

        if (!food) {
            console.log("This is food", food);
            return res.status(400).json({message: "No Food"})
        }

        if (!restaurant) {
            console.log("This is restaurant",restaurant);
            return res.status(400).json({message: "No restaurant"})
        }

        return res.status(200).json({success: true,  message: "Deleted successfully"})

    } catch (error) {
        console.error("Error in deleting food", error);
        res.status(500).json({error: "Internal server error", error})
    }
}

export const updateFood = async(req, res) => {
    try {
        
        const {name, description, price, image, foodId, restaurantId} = req.body

        console.log(name, description, price, image, foodId, restaurantId);

        if (!foodId) {
           return res.status(400).json({message: "Id not found"})
        }

        const updatedFood = {name, description, price, image}

        const food = await Food.findByIdAndUpdate(foodId, updatedFood, {new: true})

        return res.status(200).json({success: true, food})

    } catch (error) {
        console.error("Error in updating food", error);
        res.status(500).json({error: "Internal server error", error})
    }
}

export const getFoods = async(req, res) => {
    try {
        
        const {restaurantId} = req.query

        let foods = await Food.find({restaurantId})

        // console.log("This is restaurant ID", restaurantId);
        
        return res.status(200).json({success: true, foods})

    } catch (error) {
        console.error("Error in getting all food", error);
        res.status(500).json({error: "Internal server error", error})
    }
}

export const specificFood = async(req, res) => {
    try {
        
        const {id} = req.body

        const food = await Food.findById(id)

        return res.status(200).json(food)

    } catch (error) {
        console.error("Error in getting food", error);
        res.status(500).json({error: "Internal server error", error})
    }
}