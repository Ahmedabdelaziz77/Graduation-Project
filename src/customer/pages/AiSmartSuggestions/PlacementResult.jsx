function PlacementResult({
  localResult,
  regenerating,
  handleRegenerate,
  showAll,
  setShowAll,
}) {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold mb-4">🕵️ Detected Objects</h2>
        <div className="flex flex-wrap gap-3">
          {localResult.detectedObjects.map((obj, i) => (
            <span
              key={i}
              className="bg-teal-100 text-teal-700 px-4 py-1 rounded-full text-sm"
            >
              {obj}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          🖼 Placement Visualization
        </h2>
        <img
          src={localResult.imageUrl}
          alt="Annotated"
          className="w-full max-h-[600px] object-contain rounded-lg shadow border mb-4"
        />
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <p className="text-gray-600 text-sm max-w-xl">
            ⚠️ This may not be 100% accurate. Regenerate if needed (image size:{" "}
            <b>2000x3000</b>).
          </p>
          <button
            onClick={handleRegenerate}
            disabled={regenerating}
            className="bg-yellow-500 text-white px-6 py-2 rounded hover:bg-yellow-600 transition disabled:opacity-50"
          >
            {regenerating ? "Regenerating..." : "Regenerate Placement"}
          </button>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <input
          type="checkbox"
          id="showAll"
          checked={showAll}
          onChange={() => setShowAll((p) => !p)}
          className="w-4 h-4 accent-primary-color"
        />
        <label htmlFor="showAll" className="text-sm text-gray-700 font-medium">
          Show all explanations
        </label>
      </div>
    </>
  );
}

export default PlacementResult;
