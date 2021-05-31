import User from "../models/user";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const loginController = {
  async authenticateUser(req, res) {
    try {
      const { password, email } = req.body;
      if (!password && !email) {
        return res.status(200).json({ message: "required field not present" });
      }

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(200).json({
          message: "User not found! Do you want to register instead?",
        });
      }

      if (user && (await bcrypt.compare(password, user.password))) {
        const userResponse = {
          _id: user._id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };

        return jwt.sign(
          { user: userResponse },
          process.env.SESSION_SECRET,
          (err, token) => {
            if (!err) {
              res.json({ user: token, user_id: userResponse._id });
            }
          }
        );
        // return res.json(userResponse);
      } else {
        return res
          .status(200)
          .json({ message: "email or password doesn't match!" });
      }
    } catch (err) {
      throw Error(`eror while authenticating the user ${err}`);
    }
  },
};

export default loginController;
