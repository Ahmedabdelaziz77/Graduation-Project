import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  analyzeImage,
  regeneratePlacements,
} from "../../../State/customer/aiSlice";
import { addToCart } from "../../../State/customer/cartSlice";
import TransparentSpinner from "../../../components/TransparentSpinner";
import { toast } from "react-toastify";
import ImageUpload from "./ImageUpload";
import PlacementResult from "./PlacementResult";
import RecommendationList from "./RecommendationList";

function AiSmartSuggestions() {
  const dispatch = useDispatch();
  const { analyzeResult, loading } = useSelector((state) => state.ai);

  const [image, setImage] = useState(null);
  const [localResult, setLocalResult] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [regenerating, setRegenerating] = useState(false);
  const [addedProducts, setAddedProducts] = useState([]);
  const [addingToCart, setAddingToCart] = useState(null);

  useEffect(() => {
    if (analyzeResult) setLocalResult(analyzeResult);
  }, [analyzeResult]);

  const handleImageChange = (e) => setImage(e.target.files[0]);

  const handleSubmit = () => {
    if (!image) return;

    const img = new Image();
    const objectUrl = URL.createObjectURL(image);

    img.onload = () => {
      const width = img.naturalWidth;
      const height = img.naturalHeight;
      URL.revokeObjectURL(objectUrl);

      if (width < 2000 || height < 1000) {
        toast.warn("⚠️ Image must be at least 2000x3000px.");
        return;
      }

      const formData = new FormData();
      formData.append("file", image);

      dispatch(analyzeImage(formData)).then((res) => {
        if (res.payload) {
          toast.success("✅ Image analyzed!");
          setLocalResult(res.payload);
          setAddedProducts([]);
        } else {
          toast.error("❌ Analysis failed.");
        }
      });
    };

    img.onerror = () => toast.error("❌ Failed to load image.");
    img.src = objectUrl;
  };

  const handleRegenerate = async () => {
    try {
      setRegenerating(true);
      const { payload } = await dispatch(regeneratePlacements());
      if (payload?.imageUrl) {
        setLocalResult((prev) => ({
          ...prev,
          imageUrl: payload.imageUrl,
          recommendations: payload.recommendations,
        }));
        toast.success("🎉 New placement generated!");
        setAddedProducts([]);
      } else {
        toast.warn("⚠️ No image returned.");
      }
    } catch {
      toast.error("❌ Regeneration failed.");
    } finally {
      setRegenerating(false);
    }
  };

  const handleAddToCart = async (rec, idx) => {
    const productId = rec.id ?? idx;
    setAddingToCart(productId);
    try {
      await dispatch(addToCart({ productId: rec.id, quantity: 1 })).unwrap();
      setAddedProducts((prev) => [...prev, productId]);
      toast.success(`${rec.name} added to cart`);
    } catch {
      toast.error(`❌ Failed to add ${rec.name}`);
    } finally {
      setAddingToCart(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-primary-color text-center mb-10">
        🧠 AI Smart Home Recommender
      </h1>

      <ImageUpload
        loading={loading}
        handleImageChange={handleImageChange}
        handleSubmit={handleSubmit}
      />

      {loading && (
        <div className="flex justify-center items-center min-h-[300px]">
          <TransparentSpinner />
        </div>
      )}

      {!loading && localResult && (
        <>
          <PlacementResult
            localResult={localResult}
            regenerating={regenerating}
            handleRegenerate={handleRegenerate}
            showAll={showAll}
            setShowAll={setShowAll}
          />
          <RecommendationList
            recommendations={localResult.recommendations}
            showAll={showAll}
            handleAddToCart={handleAddToCart}
            addedProducts={addedProducts}
            addingToCart={addingToCart}
          />
        </>
      )}
    </div>
  );
}

export default AiSmartSuggestions;
