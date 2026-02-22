import mongoose from "mongoose";

const storeSchema = new mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Seller",
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      default: "",
    },

    phone: String,
    email: String,
    gst: String,

    address: String,
    mapLink: String,
    views: {
      type: Number,
      default: 0,
    },

    whatsappClicks: {
      type: Number,
      default: 0,
    },
    socials: {
      instagram: String,
      facebook: String,
      whatsapp: String,
      website: String,
    },

    logo: String,
    category: String,
  },
  { timestamps: true },
);

export default mongoose.model("Store", storeSchema);
