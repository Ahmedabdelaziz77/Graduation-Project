function OCRUploader({ image, setImage, onRunOCR }) {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-start gap-12 mb-16">
      {/* Upload Box */}
      <div className="w-full lg:w-1/2 bg-white/80 backdrop-blur-lg shadow-lg border border-gray-200 rounded-xl p-8 transition-all">
        <h2 className="text-2xl font-bold text-primary-color mb-6">
          📤 Upload Product List
        </h2>

        <label
          htmlFor="file-upload"
          className="block w-full cursor-pointer bg-primary-color text-white text-center py-3 px-4 rounded-md font-medium hover:bg-teal-700 transition"
        >
          {image ? `✅ Selected: ${image.name}` : "📎 Choose Image"}
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/*"
          className="hidden"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button
          className={`mt-6 w-full bg-green-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-green-700 transition disabled:opacity-50`}
          onClick={onRunOCR}
          disabled={!image}
        >
          🚀 Run OCR & Match
        </button>

        <p className="text-sm text-gray-500 mt-3">
          Supported formats: JPG, PNG. Recommended size: 1000x1000+.
        </p>
      </div>

      {/* Sample Preview */}
      <div className="w-full lg:w-1/2 text-center">
        <p className="text-sm font-medium text-gray-600 mb-2">
          🖼 Sample Product List Image
        </p>
        <div className="rounded-lg overflow-hidden border shadow-md bg-white">
          <img
            src="/products.PNG"
            alt="sample"
            className="w-full h-auto max-h-[300px] object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default OCRUploader;
