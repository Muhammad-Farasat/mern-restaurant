import jwt from "jsonwebtoken";

const verifyToken = (cookieName) => {
  return (req, res, next) => {
    try {
      const auth = req.cookies[cookieName];

      if (!auth) {
        return res.status(400).json({ message: "Token not found" });
      }

      const decoded = jwt.verify(auth, process.env.JWT_SECRET);

      req.user = decoded;

      next();
    } catch (error) {
      console.error("Error in authentication", error);
      res.status(500).json({ error: "Error in authentication", error });
    }
  };
};


export const verifyCustomerToken = verifyToken("authorization")
export const verifyRestaurantToken = verifyToken("restaurant-auth") 

