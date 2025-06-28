import OCRTableRow from "./OCRTableRow";
import TransparentSpinner from "../../../components/TransparentSpinner";

function OCRResultTable({
  matches,
  quantities,
  addingProductId,
  bulkAdding,
  onQuantityChange,
  onAddToCart,
  onAddAll,
}) {
  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Matching Results
      </h2>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Product</th>
            <th className="p-3">Confidence</th>
            <th className="p-3">Requested</th>
            <th className="p-3">Available</th>
            <th className="p-3">Missing</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {matches.map((match, index) => (
            <OCRTableRow
              key={index}
              match={match}
              quantity={quantities[match.product.id]}
              onQuantityChange={onQuantityChange}
              onAddToCart={onAddToCart}
              addingProductId={addingProductId}
            />
          ))}
        </tbody>
      </table>
      <div className="text-right mt-6">
        <button
          className="bg-primary-color text-white px-6 py-2 rounded-md hover:bg-teal-700 disabled:opacity-60"
          onClick={onAddAll}
          disabled={bulkAdding}
        >
          {bulkAdding ? <TransparentSpinner size={24} /> : "Add All to Cart"}
        </button>
      </div>
    </div>
  );
}

export default OCRResultTable;
