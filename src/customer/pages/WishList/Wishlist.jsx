import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MiniError from "../../../components/MiniError";
import { fetchFavourites } from "../../../State/customer/favouriteSlice";
import WishlistCard from "./WishlistCard";
import Spinner from "../../../components/Spinner";

const Wishlist = () => {
  const dispatch = useDispatch();

  const {
    list: favourites,
    loading,
    error,
  } = useSelector((state) => state.favourite);

  const [displayedFavourites, setDisplayedFavourites] = useState([]);

  useEffect(() => {
    dispatch(fetchFavourites());
  }, [dispatch]);

  // Sync local state when redux list updates
  useEffect(() => {
    setDisplayedFavourites(favourites);
  }, [favourites]);

  const handleRemoveFromLocal = (productId) => {
    setDisplayedFavourites((prev) => prev.filter((p) => p.id !== productId));
  };

  return (
    <div className="my-10 px-4">
      <h1 className="text-3xl font-bold text-gray-700 text-center uppercase pb-5">
        My Wishlist ❤️
      </h1>

      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : error ? (
        <div className="flex flex-col items-center mt-10">
          <MiniError />
          <p>{error}</p>
        </div>
      ) : displayedFavourites.length === 0 ? (
        <p className="text-center text-gray-500 mt-10">
          No favorites added yet.
        </p>
      ) : (
        <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
          {displayedFavourites
            .filter(
              (product, index, self) =>
                index === self.findIndex((p) => p.id === product.id)
            )
            .map((product) => (
              <WishlistCard
                key={product.id}
                product={product}
                onRemove={handleRemoveFromLocal}
              />
            ))}
        </section>
      )}
    </div>
  );
};

export default Wishlist;
