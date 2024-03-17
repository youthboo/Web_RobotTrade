const router = require('express').Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt')
const Joi = require('joi')

router.post("/", async(req, res) => {
    try {
        const {error} = validate(req.body);
        if (error)
            return res.status(400).send({message: error.details[0].message})

        const user = await User.findOne({email: req.body.email})
        if (user)
            return res.status(409).send({message: "User with given email already exist!"})

        const salt = await bcrypt.genSalt(Number(process.env.SALT))
        const hashPassword = await bcrypt.hash(req.body.password, salt)

        await new User({...req.body, password: hashPassword}).save();
        res.status(201).send({message: 'User created successfully'})

    } catch (error) {
        res.status(500).send({message: 'Internal Server Error'})
    }

})

// GET all non-admin users
router.get('/', async (req, res) => {
  try {
      const nonAdminUsers = await User.find({ isAdmin: false });
      res.status(200).send(nonAdminUsers);
  } catch (error) {
      res.status(500).send({ message: 'Internal Server Error' });
  }
});

router.get('/count', async (req, res) => {
  try {
      const count = await User.countDocuments({ isAdmin: false });
      res.status(200).json({ count });
  } catch (error) {
      console.error('Error counting users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

// UPDATE USER
router.put("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    if (req.body.email !== user.email) {
      const emailInUse = await User.findOne({ email: req.body.email });
      if (emailInUse) {
        return res.status(400).send("Email already in use");
      }
    }

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      user.password = hashedPassword;
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin || user.isAdmin;
    user.status = req.body.status || user.status; // อัปเดตสถานะของผู้ใช้

    const updatedUser = await user.save();

    res.status(200).send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      status: updatedUser.status, // เพิ่มสถานะในการส่งข้อมูลกลับไปยังไคลเอนต์
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// DELETE USER
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send("User not found");
    }
    await user.deleteOne(); // หรือใช้ findByIdAndDelete(req.params.id)
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send("Internal Server Error");
  }
});


module.exports = router;


module.exports = router;




