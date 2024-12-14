const Carts = require("../models/Carts");

//get carts using email
const getCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await Carts.find(query).exec();

    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//post a cart when add-to-cart btn is clicked
const addToCart = async (req, res) => {
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;

  try {
    // Check if the item already exists in the cart for the user
    const existingCartItem = await Carts.findOne({ menuItemId });

    if (existingCartItem) {
      return res
        .status(400)
        .json({ message: "Product already exists in the cart" });
    }

    // If the item doesn't exist in the cart, create a new cart item
    const cartItem = await Carts.create({
      menuItemId,
      name,
      recipe,
      image,
      price,
      quantity,
      email,
    });
    // console.log(cartItem);
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete a cart item
const deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deletedCart = await Carts.findByIdAndDelete(cartId);
    if (!deletedCart) {
      return res.status(401).json({ message: "Cart not found" });
    }
    res.status(200).json({ message: "Cart Item deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//update a cart item
const updateCart = async (req, res) => {
  const cartId = req.params.id;
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;

  try {
    const updatedCart = await Carts.findByIdAndUpdate(
      cartId,
      { menuItemId, name, recipe, image, price, quantity, email },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(updatedCart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//get single cart
const getSingleCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const cartItem = await Carts.findById(cartId);
    if (!cartItem) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCartByEmail,
  addToCart,
  deleteCart,
  updateCart,
  getSingleCart,
};