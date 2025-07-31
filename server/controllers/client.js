import Product from "../models/Product.js";
import ProductStat from "../models/ProductStats.js";
import User from "../models/User.js";
import Transaction from "../models/Transactions.js";
import getCountryIso3 from "country-iso-2-to-3";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({ productId: product._id });
        return {
          ...product._doc,
          stat,
        };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
export const getCustomers = async (req, res) => {
  try {
    // Assuming you have a Customer model to fetch customer data
    const customers = await User.find({role: 'user'}).select('-password');
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
export const getTransactions = async (req, res) => {
  try {
    const {page=1, pageSize=20, sort=null, search=""} = req.query;
    const generateSort = () => {
      try {
        const sortParsed = JSON.parse(sort);
        return {
          [sortParsed.field]: sortParsed.sort === "asc" ? 1 : -1,
        };
      } catch (err) {
        return {};
      }
    };
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const pageSizeNum = Math.max(1, parseInt(pageSize, 10) || 20);
    const sortFormatted = Boolean(sort) ? generateSort() : {};
    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, "i") } },
        { userId: { $regex: new RegExp(search, "i")} },
      ],
    }).sort(sortFormatted)
      .skip((pageNum - 1) * pageSizeNum)
      .limit(pageSizeNum);
    const total=await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    })
    res.status(200).json({transactions, total});
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
export const getGeography = async (req, res) => {
  try {
    const user=await User.find();
    const mappedLocations = user.reduce((acc, {country})=>{
    const countryIso3 = getCountryIso3(country);
      if (!acc[countryIso3]) {
        acc[countryIso3] = 0;
      }
      acc[countryIso3]++;
      return acc;
    }, {});
    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return { id: country, value: count };
      }
    );
    res.status(200).json(formattedLocations);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}