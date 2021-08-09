import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, default: 0 },
    comment: { type: String, required: true },
    user_avatar: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    summary: {
      type: String,
    },
    story: {
      type: String,
    },
    details: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    vectary_link: {
      type: String,
    },
    slug: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    in_stock: {
      type: Number,
      default: 0,
    },
    sold: {
      type: Number,
      default: 0,
    },
    num_ratings: {
      type: Number,
      default: 0,
    },
    reviews: [reviewSchema],
    likes: {
      type: Number,
      default: 0,
    },
    viewers: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

let Dataset =
  mongoose.models.product || mongoose.model("product", productSchema);

export default Dataset;
