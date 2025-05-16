import AddressCard from "./AddressCard";

function Address() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((item) => (
        <AddressCard key={item} />
      ))}
    </div>
  );
}

export default Address;
