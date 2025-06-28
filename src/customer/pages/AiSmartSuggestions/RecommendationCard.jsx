function RecommendationCard({
  rec,
  idx,
  showAll,
  onAddToCart,
  alreadyAdded,
  addingToCart,
}) {
  return (
    <div className="bg-white border rounded-lg shadow p-4 flex flex-col h-full">
      <img
        src={rec.image}
        alt={rec.name}
        className="h-48 object-contain rounded"
      />
      <h3 className="text-lg font-bold mt-2">{rec.name}</h3>
      <p className="text-green-600 font-semibold">{rec.price} EGP</p>
      <p className="text-sm text-gray-500">
        📍 ({rec.placement.x}, {rec.placement.y})
      </p>

      <button
        onClick={() => onAddToCart(rec, idx)}
        disabled={alreadyAdded || addingToCart}
        className={`mt-2 px-4 py-2 rounded text-white font-medium flex justify-center items-center transition ${
          alreadyAdded ? "bg-gray-400" : "bg-primary-color hover:bg-teal-700"
        }`}
      >
        {addingToCart ? (
          <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            />
          </svg>
        ) : alreadyAdded ? (
          "✔️ Added to Cart"
        ) : (
          "Add to Cart"
        )}
      </button>

      {showAll && (
        <div className="mt-3 p-4 bg-yellow-50 border border-yellow-300 rounded-lg text-yellow-900 text-sm max-h-60 overflow-y-auto shadow-inner transition-all duration-300 ease-in-out">
          <div className="flex items-start gap-2">
            <span className="text-xl mt-1">💡</span>
            <p className="whitespace-pre-wrap leading-relaxed">
              {rec.explanation.slice(0, rec.explanation.lastIndexOf(".") + 1)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default RecommendationCard;
