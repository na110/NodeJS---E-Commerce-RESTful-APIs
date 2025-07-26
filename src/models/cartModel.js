import mongoose, { Schema } from "mongoose";

// define cart item schema {product, quntity, unitprice}
//

const CartStatusEnum = ["active", "completed"];

const cartItemSchema = new Schema({
  prodcut: { type: Schema.Types.ObjectId, ref: "products", required: true },
  quantity: { type: Number, required: true, default: 1 },
  unitPrice: { type: Number, required: true },
});

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "users" },
  items: { type: [cartItemSchema] },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    eum: CartStatusEnum,
    required: true,
    default: "active",
  },
});

const cartModel = mongoose.model("carts", cartSchema);

export default cartModel;
