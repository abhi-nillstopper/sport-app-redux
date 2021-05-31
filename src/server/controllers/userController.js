import bcrypt from "bcrypt";
import User from "../models/user";
import jwt from "jsonwebtoken";

const UserController = {
  async createUser(req, res) {
    try {
      const { firstName, lastName, password, email } = req.body;
      const existentUser = await User.findOne({ email });

      if (!existentUser) {
        const hashedPassword = await bcrypt.hash(password, 10);
        let userResponse = await User.create({
          firstName,
          lastName,
          password: hashedPassword,
          email,
        });

        userResponse = userResponse.toObject();
        delete userResponse["password"];
        
        return jwt.sign(
          { user: userResponse },
          process.env.SESSION_SECRET,
          (err, token) => {
            if (!err) {
              res.json({ user: token, user_id: userResponse._id });
            }
          }
        );

        // return res.json({
        //   _id: user._id,
        //   email: user.email,
        //   firstName: user.firstName,
        //   lastName: user.lastName,
        // });
      }
      return res.status(400).json({
        message: "email already exist!  do you want to login instead? ",
      });
    } catch (error) {
      throw error(`Error while Registering new user :  ${err}`);
    }
  },

  async getUserById(req, res) {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId);
      return res.json(user);
    } catch (error) {
      return res.status(400).json({
        message: "User ID does not exist, do you want to register instead?",
      });
    }
  },
};

export default UserController;
