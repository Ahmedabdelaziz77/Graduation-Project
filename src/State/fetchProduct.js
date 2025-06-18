// products
import axios from "axios";
const api = "/api/products";
export const fetchProducts = async () => {
  try {
    const { data } = await axios.get(api);
    console.log("products response", data);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
