import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddressCard from "./AddressCard";
import { fetchUserAddresses } from "../../../State/customer/addressSlice";
import Spinner from "../../../components/Spinner";

function Address() {
  const dispatch = useDispatch();
  const {
    list: addresses,
    loading,
    error,
  } = useSelector((state) => state.address);

  useEffect(() => {
    dispatch(fetchUserAddresses());
  }, [dispatch]);

  if (loading)
    return (
      <div className="text-center py-5">
        <Spinner />
      </div>
    );
  if (error)
    return <div className="text-center text-red-500 py-5">{error}</div>;

  return (
    <div className="space-y-3">
      {addresses.length === 0 ? (
        <div className="text-center text-gray-500">No addresses found.</div>
      ) : (
        addresses.map((address, index) => (
          <AddressCard key={index} address={address} />
        ))
      )}
    </div>
  );
}

export default Address;
