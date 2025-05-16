// products
import axios from "axios";
const api = "https://dummyjson.com/products";
export const fetchProducts = async () => {
  try {
    const res = await axios.get(api);
    console.log("products response", res);
  } catch (err) {
    console.error(err);
  }
};
