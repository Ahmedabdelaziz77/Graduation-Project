import RecommendationCard from "./RecommendationCard";

function RecommendationList({
  recommendations,
  showAll,
  handleAddToCart,
  addedProducts,
  addingToCart,
}) {
  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        📦 Recommended Smart Devices
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((rec, idx) => (
          <RecommendationCard
            key={idx}
            rec={rec}
            idx={idx}
            showAll={showAll}
            onAddToCart={handleAddToCart}
            alreadyAdded={addedProducts.includes(rec.id ?? idx)}
            addingToCart={addingToCart === (rec.id ?? idx)}
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;
