const { bcryptData, comparePassword } = require('../helpers/bcrypt');
const generateToken = require('../helpers/generateToken');

const User = require('../model/user');

class UserController {
  static async signUp(req, res, next) {
    try {
      const { fullName, username, password, confirmPassword, gender } =
        req.body;

      if (!fullName || fullName == '') {
        throw {
          name: 'validateError',
          message: 'Fullname cannot be empty',
        };
      }

      if (!username || username == '') {
        throw {
          name: 'validateError',
          message: 'Username cannot be empty',
        };
      }

      if (!password || password == '') {
        throw {
          name: 'validateError',
          message: 'Password cannot be empty',
        };
      }

      if (password != confirmPassword) {
        throw {
          name: 'validateError',
          message: 'Passwords and confirm password does not match',
        };
      }
      if (!gender || gender == '') {
        throw {
          name: 'validateError',
          message: 'Gender cannot be empty',
        };
      }
      const user = await User.findOne({ username });
      if (user) {
        throw {
          name: 'validateError',
          message: 'Username already exist',
        };
      }

      const hashedPassword = bcryptData(password);

      const boyPic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const girlPic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

      const newUser = new User({
        fullName,
        username,
        password: hashedPassword,
        gender,
        profilePic: gender === 'male' ? boyPic : girlPic,
      });

      if (newUser) {
        let access_token = generateToken(newUser._id, res);
        await newUser.save();
        res.status(201).json({
          _id: newUser.id,
          fullName: newUser.fullName,
          username: newUser.username,
          profilePic: newUser.profilePic,
          access_token,
        });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        throw {
          name: 'validateError',
          message: 'Invalid username or password',
        };
      }
      const checkPassword = comparePassword(password, user.password);

      if (!checkPassword) {
        throw {
          name: 'validateError',
          message: 'Invalid username or password',
        };
      }

      let access_token = generateToken(user._id, res);

      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
        access_token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getUserData(req, res, next) {
    try {
      const loggedIn = req.user._id;
      const filteredUsers = await User.find({
        _id: { $ne: loggedIn },
      }).select('-password');

      res.status(200).json(filteredUsers);
    } catch (error) {
      console.log(error);
      next.status(error);
    }
  }
}

module.exports = UserController;
