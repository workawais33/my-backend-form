const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const app = express();
const cors = require("cors");
require('dotenv').config();  

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/product", async (req, res) => {
  try {
    const products = await Product.find().sort({createdAt:"desc"});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/api/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/product", async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


app.put("/api/product/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.stock = req.body.stock || product.stock;
    product.description = req.body.description || product.description;
    product.image = req.body.image || product.image;

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/api/product/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Connection failed!", err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
 