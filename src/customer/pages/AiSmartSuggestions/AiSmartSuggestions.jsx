import { useState } from "react";
import axios from "axios";

function AiSmartSuggestions() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!image) return;
    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        "http://localhost:8000/analyze-image",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">AI Smart Home Recommender</h2>

      <input type="file" onChange={handleImageChange} className="mb-4" />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Analyzing..." : "Analyze Image"}
      </button>

      {result && (
        <div className="mt-6">
          <h3 className="text-xl font-medium mb-2">
            Detected Room: {result.roomType}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {result.recommendations.map((rec, idx) => (
              <div key={idx} className="border p-4 rounded shadow">
                <h4 className="font-bold">{rec.device}</h4>
                <p className="text-sm">📍 {rec.position}</p>
                <p className="text-xs text-gray-500 italic">💡 {rec.reason}</p>

                {rec.product && (
                  <div className="mt-2">
                    <img
                      src={rec.product.image}
                      alt={rec.product.name}
                      className="w-24 h-24 object-contain mb-1"
                    />
                    <p className="font-medium">{rec.product.name}</p>
                    <p className="text-green-600 font-bold">
                      {rec.product.price} EGP
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AiSmartSuggestions;
