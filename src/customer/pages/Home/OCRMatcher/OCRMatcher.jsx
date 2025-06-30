import { Link } from "react-router-dom";

function OCRMatcher() {
  return (
    <section className="relative bg-white py-20 px-6 text-teal-700 overflow-hidden">
      <div
        data-aos="fade-up"
        className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12"
      >
        <div className="md:w-1/2">
          <h2 className="text-5xl font-bold mb-4 leading-tight">
            OCR-Based Product Matching
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-gray-700">
            Just upload a receipt or product list image — our OCR engine matches
            items to smart home devices instantly.
          </p>
          <Link
            to="/buy-products-from-image"
            className="inline-block bg-teal-600 hover:bg-teal-700 transition text-white font-semibold px-6 py-3 rounded-md shadow-md"
          >
            Try OCR Matching
          </Link>
        </div>
        <div className="md:w-1/2">
          <img
            src="/public/matching-products.png"
            alt="OCR Matching"
            className="w-full object-contain rounded-xl shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Top separator */}
      <svg
        className="absolute top-0 left-0 w-full h-24 text-teal-100 rotate-180"
        viewBox="0 0 1440 320"
      >
        <path
          fill="currentColor"
          fillOpacity="1"
          d="M0,288L60,256C120,224,240,160,360,160C480,160,600,224,720,224C840,224,960,160,1080,149.3C1200,139,1320,181,1380,202.7L1440,224L1440,0L0,0Z"
        ></path>
      </svg>
    </section>
  );
}

export default OCRMatcher;
