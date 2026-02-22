import Store from "../models/Store.js";

// helper: generate slug
const generateSlug = (name) => {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") +
    "-" +
    Math.floor(1000 + Math.random() * 9000)
  );
};

// CREATE STORE
export const createStore = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Store name is required" });
    }

    // Check if store already exists for seller
    const existingStore = await Store.findOne({ seller: req.user.id });
    if (existingStore) {
      return res.status(400).json({ message: "Seller already has a store" });
    }

    const slug = generateSlug(name);

    const store = await Store.create({
      seller: req.user.id,
      name,
      slug,
      description,
    });

    res.status(201).json({
      message: "Store created successfully",
      store,
    });
  } catch (error) {
    console.error("Create store error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
// track clicks
export const trackClicks =  async (req, res) => {
  const { storeId } = req.body;

  const store = await Store.findById(storeId);
  if (!store) return res.status(404).json({ message: "Store not found" });

  store.whatsappClicks += 1;
  await store.save();

  res.json({ success: true });
}
// get sytore b slug
export const getStoreBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    const store = await Store.findOne({ slug });

    if (!store) return res.status(404).json({ message: "Store not found" });

    // 🔥 increment views
    store.views += 1;

    await store.save();
    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }

  //   res
  // {
  //     "_id": "697decf97817acca31fcfc7c",(store id)
  //     "seller": "697cebd564418065cf4c0b90",(seller id)
  //     "name": "Mahadev Cloths",
  //     "slug": "mahadev-cloths-3971",
  //     "description": "seller of sarees and dress",
  //     "createdAt": "2026-01-31T11:52:25.200Z",
  //     "updatedAt": "2026-01-31T11:52:25.200Z",
  // }
};

// getMyStore
export const getMyStore = async (req, res) => {
  try {
    console.log("Decoded user:", req.user);

    const stores = await Store.find({});
    console.log("All stores in DB:", stores);

    const store = await Store.findOne({
      seller: req.user.id,
    });

    console.log("Looking for seller:", req.user.id);
    console.log("Store found:", store);

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    res.json(store);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STORE SETTINGS
export const updateStore = async (req, res) => {
  try {
    const sellerId = req.user.id;

    const store = await Store.findOne({ seller: sellerId });

    if (!store) {
      return res.status(404).json({ message: "Store not found" });
    }

    const {
      name,
      description,
      phone,
      email,
      address,
      mapLink,
      gst,
      socials,
      logo,
      category,
    } = req.body;

    if (name !== undefined) store.name = name;
    if (description !== undefined) store.description = description;
    if (phone !== undefined) store.phone = phone;
    if (email !== undefined) store.email = email;
    if (address !== undefined) store.address = address;
    if (mapLink !== undefined) store.mapLink = mapLink;
    if (gst !== undefined) store.gst = gst;
    if (logo !== undefined) store.logo = logo;
    if (category !== undefined) store.category = category;

    if (socials) {
      store.socials = {
        ...store.socials,
        ...socials,
      };
    }

    await store.save();

    res.json({
      message: "Store updated successfully",
      store,
    });
  } catch (error) {
    console.error("Update store error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
