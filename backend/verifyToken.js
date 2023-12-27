import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const verifyToken = (req, res, next) => {

  const token = req.cookies.token;
  // console.log(token);

  if (!token) {
    return res.status(401).json("You are not authenticated!");
  }

  try {
    // Use the JWT directly from the cookies
    jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
      if (err) {
        return res.status(403).json("Token is not valid!");
      }

      req.userId = data._id;
      next();
    });
  } catch (error) {
    return res.status(500).json("Internal Server Error");
  }
};

export default verifyToken;