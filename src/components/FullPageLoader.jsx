function FullPageLoader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-teal-50 z-50">
      <div className="text-center">
        <div className="loader mb-4"></div>
        <h1 className="text-3xl font-bold text-teal-700 animate-pulse">
          EZsmart
        </h1>
      </div>
    </div>
  );
}

export default FullPageLoader;
