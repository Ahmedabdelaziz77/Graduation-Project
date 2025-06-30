import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center max-w-xl">
        <h1 className="text-4xl font-bold text-primary-color mb-4">
          Thank You!
        </h1>
        <p className="text-gray-700 text-lg mb-6">
          We’ve received your smart home customization request. 🎉
        </p>
        <p className="text-gray-600 mb-4">
          Our team will review your details and get back to you as soon as
          possible. You&apos;ll receive a confirmation via email or phone.
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <Link
            to="/"
            className="bg-primary-color text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
          >
            Back to Home
          </Link>
          <Link
            to="/offerCustomize"
            className="border border-primary-color text-primary-color px-6 py-3 rounded-lg hover:bg-primary-color hover:text-white transition"
          >
            Submit Another Offer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
