import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { matchImageProducts } from "../../../State/ocrSlice";
import Spinner from "../../../components/Spinner";

function OCR() {
  const dispatch = useDispatch();
  const { matches, loading } = useSelector((state) => state.ocr);

  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleRunOCR = () => {
    if (image) {
      dispatch(matchImageProducts(image));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-10 py-20">
      <h1 className="text-4xl font-bold text-center text-primary-color mb-6">
        OCR Smart Product Matcher
      </h1>
      <p className="text-center text-gray-600 max-w-3xl mx-auto mb-10">
        Upload an image or screenshot of a product list — our system will
        extract product names, versions, and quantities, then match them to the
        available catalog using AI.
      </p>

      <div className="flex justify-center items-start gap-10">
        <div className="w-1/2">
          <label className="font-semibold mb-2 block">Upload Your Image</label>
          <input
            type="file"
            accept="image/*"
            className="w-full border px-4 py-2 rounded-md"
            onChange={handleImageChange}
          />
          <button
            className="mt-4 bg-primary-color text-white px-6 py-2 rounded-md hover:bg-teal-700"
            onClick={handleRunOCR}
          >
            Run OCR & Match
          </button>
        </div>
        <div className="w-1/2">
          <p className="font-medium text-sm text-gray-500 mb-1">
            Sample Format:
          </p>
          <img
            src="/products.jpg"
            className="border shadow rounded-md w-full max-h-[300px] object-contain"
            alt="sample"
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-10">
          <Spinner />
        </div>
      ) : (
        matches.length > 0 && (
          <div className="mt-16 animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-700 mb-6">
              Matching Results
            </h2>
            <table className="w-full table-auto border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-3 text-left">Product Name</th>
                  <th className="p-3 text-left">Matched Product</th>
                  <th className="p-3 text-left">Confidence</th>
                  <th className="p-3 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {matches.map(({ product, similarity }, index) => (
                  <tr className="border-b" key={index}>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3">{product.name}</td>
                    <td className="p-3 text-green-600 font-semibold">
                      {Math.round(similarity * 100)}%
                    </td>
                    <td className="p-3">
                      <button className="text-sm text-white bg-primary-color px-4 py-1 rounded hover:bg-teal-700">
                        Add to Cart
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right mt-6">
              <button className="bg-primary-color text-white px-6 py-2 rounded-md hover:bg-teal-700">
                Add All to Cart
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default OCR;
