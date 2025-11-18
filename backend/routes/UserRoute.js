import User from "../models/User.js";
import express from "express";
import { jwtCheck } from "../auth/auth0.js";

const router = express.Router();

router.post("/users", jwtCheck, async (req, res) => {
  //console.log()
  try {
    //extract data
   const auth0Id = req.auth.payload.sub; 
    const email = req.body.email;
    const name = req.body.name;
    let user = await User.findOne({ auth0Id });
    if (!user) {
      user = new User({ auth0Id, email, name });
      await user.save();
    }
    //create session
   // req.session.userId = user._id;

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;







//inside jwt -> header, payload, signature
//payload -> contains data/ imp fields
//sub -> subject (unique identifier of authenticated user)
//req.body -> frontend data