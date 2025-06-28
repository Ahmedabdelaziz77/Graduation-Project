import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadOcrMatch } from "../../../State/customer/aiSlice";
import { addToCart } from "../../../State/customer/cartSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OCRUploader from "./OCRUploader";
import OCRResultTable from "./OCRResultTable";
import TransparentSpinner from "../../../components/TransparentSpinner";

function OCRPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { ocrResult, loading } = useSelector((state) => state.ai);

  const [image, setImage] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [addingProductId, setAddingProductId] = useState(null);
  const [bulkAdding, setBulkAdding] = useState(false);

  const handleRunOCR = () => {
    if (image) dispatch(uploadOcrMatch(image));
  };

  const handleQuantityChange = (productId, value) => {
    setQuantities((prev) => ({ ...prev, [productId]: value }));
  };

  const handleAddToCart = async (product, quantity) => {
    setAddingProductId(product.id);
    try {
      await dispatch(addToCart({ productId: product.id, quantity })).unwrap();
      toast.success(`Added ${product.name} to cart`);
    } catch {
      toast.error(`Failed to add ${product.name}`);
    } finally {
      setAddingProductId(null);
    }
  };

  const handleAddAllToCart = async () => {
    setBulkAdding(true);
    let allSuccess = true;

    for (const match of ocrResult?.matches || []) {
      const { product, available_quantity, requested_quantity } = match;
      const quantity =
        quantities[product.id] ??
        Math.min(requested_quantity, available_quantity);
      try {
        await dispatch(addToCart({ productId: product.id, quantity })).unwrap();
      } catch {
        allSuccess = false;
      }
    }

    toast[allSuccess ? "success" : "warn"](
      allSuccess ? "All products added to cart" : "Some products failed to add"
    );
    setBulkAdding(false);
    navigate("/cart");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-20">
      <h1 className="text-4xl font-bold text-center text-primary-color mb-6">
        OCR Smart Product Matcher
      </h1>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
        Upload an image of a product list — we&apos;ll extract the products with
        AI and match them to our catalog.
      </p>

      <OCRUploader image={image} setImage={setImage} onRunOCR={handleRunOCR} />

      {loading ? (
        <div className="flex justify-center items-center min-h-screen">
          <TransparentSpinner />
        </div>
      ) : (
        ocrResult?.matches?.length > 0 && (
          <OCRResultTable
            matches={ocrResult.matches}
            quantities={quantities}
            addingProductId={addingProductId}
            bulkAdding={bulkAdding}
            onQuantityChange={handleQuantityChange}
            onAddToCart={handleAddToCart}
            onAddAll={handleAddAllToCart}
          />
        )
      )}
    </div>
  );
}

export default OCRPage;
