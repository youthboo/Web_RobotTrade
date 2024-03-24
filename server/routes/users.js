const router = require('express').Router();
const { User, validate } = require('../models/user');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

router.post("/", async (req, res) => {
  try {
      if (!req.body.IDcard || !req.body.port) {
          return res.status(400).send({ message: "ID Card and Port Number are required" });
      }

      const { error } = validate(req.body);
      if (error) {
          return res.status(400).send({ message: error.details[0].message });
      }

      const user = await User.findOne({ email: req.body.email });
      if (user) {
          return res.status(409).send({ message: "User with given email already exists!" });
      }

      // ตรวจสอบว่ามีผู้ใช้ที่ใช้ ID card หรือ port number เหมือนกันแล้วหรือไม่
      const existingUser = await User.findOne({ $or: [{ IDcard: req.body.IDcard }, { port: req.body.port }] });
      if (existingUser) {
          return res.status(409).send({ message: "User with given ID card or Port number already exists!" });
      }

      // สร้าง salt และ hash password
      const salt = await bcrypt.genSalt(10); 
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // สร้างผู้ใช้ใหม่และบันทึกลงในฐานข้อมูล
      const newUser = new User({
          IDcard: req.body.IDcard,
          port: req.body.port,
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword 
      });
      await newUser.save();

      const token = jwt.sign({ _id: newUser._id }, process.env.JWTPRIVATEKEY, { expiresIn: '7d' });

      res.status(201).send({ token, message: 'User created successfully' });

  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).send({ message: 'Internal Server Error' });
  }
});

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

    const updatedUser = await user.save();

    res.status(200).send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
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
    await user.deleteOne(); 
    res.status(200).send("User deleted successfully");
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;

