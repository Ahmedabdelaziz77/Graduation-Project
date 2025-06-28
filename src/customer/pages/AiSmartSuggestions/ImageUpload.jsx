function ImageUpload({ loading, handleImageChange, handleSubmit }) {
  return (
    <div className="bg-white shadow rounded p-6 mb-10">
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border px-4 py-2 rounded-md w-full sm:w-2/3 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary-color file:text-white hover:file:bg-teal-700"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-primary-color text-white px-6 py-2 rounded hover:bg-teal-700 transition disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Image"}
        </button>
      </div>
    </div>
  );
}

export default ImageUpload;
