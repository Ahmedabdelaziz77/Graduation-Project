import TransparentSpinner from "../../../components/TransparentSpinner";

function OCRTableRow({
  match,
  quantity,
  onQuantityChange,
  onAddToCart,
  addingProductId,
}) {
  const {
    product,
    similarity,
    requested_quantity,
    available_quantity,
    missing_quantity,
  } = match;

  return (
    <tr className="border-b">
      <td className="p-3 flex items-center gap-3">
        <img
          src={product.image}
          alt={product.name}
          className="w-12 h-12 object-contain rounded"
        />
        {product.name}
      </td>
      <td className="p-3 text-green-600 font-semibold">
        {Math.round(similarity * 100)}%
      </td>
      <td className="p-3">{requested_quantity}</td>
      <td className="p-3">{available_quantity}</td>
      <td className="p-3 text-red-600">{missing_quantity}</td>
      <td className="p-3">
        <input
          type="number"
          min="1"
          max={available_quantity}
          className="w-20 border rounded px-2 py-1"
          value={quantity ?? requested_quantity}
          onChange={(e) => onQuantityChange(product.id, +e.target.value)}
        />
      </td>
      <td className="p-3">
        <button
          className="text-sm text-white bg-primary-color px-4 py-1 rounded hover:bg-teal-700 disabled:opacity-50"
          disabled={addingProductId === product.id}
          onClick={() => onAddToCart(product, quantity ?? available_quantity)}
        >
          {addingProductId === product.id ? (
            <TransparentSpinner size={20} />
          ) : (
            "Add to Cart"
          )}
        </button>
      </td>
    </tr>
  );
}

export default OCRTableRow;
