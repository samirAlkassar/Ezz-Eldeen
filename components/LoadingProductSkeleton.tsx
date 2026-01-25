const LoadingProductSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-xl md:rounded-2xl p-3 md:p-5 w-full h-full">
      <div className="w-full aspect-[4/3] bg-gray-100 mb-4 rounded-xl animate-pulse" />
      <span className="block w-full h-6 md:h-7 bg-gray-200 rounded-lg animate-pulse" />

      <div className="flex gap-2 mt-2 mb-3">
        <span className="block w-1/3 h-6 bg-gray-100 rounded-lg animate-pulse" />
        <span className="block w-2/5 h-6 bg-gray-100 rounded-lg animate-pulse" />
      </div>

      <div className="pt-3 flex justify-between items-center">
        <span className="block h-9 w-9 bg-gray-200 rounded-lg animate-pulse" />
        <span className="block h-10 w-32 md:w-36 rounded-full bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
};


export default LoadingProductSkeleton;