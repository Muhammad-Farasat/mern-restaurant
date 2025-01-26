import Cart from "../Models/Cart.js";
import Food from "../Models/Food.js";

export const addFood = async(req, res) => {
    try {
        
        const { name, description, price, image } = req.body

        if (!name || !description || !price || !image) {
            return res.status(400).json({message: "Fill all fields"})
        }

        const food = await new Food({name, description, price, image})

        const data = await food.save()

        return res.status(200).json({success: true, data})

    } catch (error) {
        console.error("Error in add food controller", error);
        res.status(500).json({error: "Internal server error", error})
    }
}

export const deleteFood = async(req, res) => {
    try {
        
        const {id} = req.body
        
        const food = await Food.findByIdAndDelete(id)

        return res.status(200).json({success: true, message: "Deleted successfully"})

    } catch (error) {
        console.error("Error in deleting food", error);
        res.status(500).json({error: "Internal server error", error})
    }
}

export const updateFood = async(req, res) => {
    try {
        
        const {name, description, price, image, id} = req.body

        const updatedFood = {name, description, price, image}

        const food = await Food.findByIdAndUpdate(id, updatedFood, {new: true})

        return res.status(200).json({success: true, food})

    } catch (error) {
        console.error("Error in updating food", error);
        res.status(500).json({error: "Internal server error", error})
    }
}

export const getFoods = async(req, res) => {
    try {
        
        let food = await Food.find({})

        return res.status(200).json({success: true, food})

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