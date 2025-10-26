const UserCartPage = () => {
  return (
    <div className="h-full w-full xl:px-10 xl:pt-5 2xl:px-30 2xl:pt-5 text-black">
      <div className="w-full mx-auto bg-white p-4 sm:p-6">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Your Shopping Cart
        </h1>

        {/* Cart Items */}
        <div className="space-y-6">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="flex flex-col sm:flex-row items-center justify-between border-b pb-4 gap-4 sm:gap-6"
            >
              {/* Image */}
              <div className="w-28 h-28 sm:w-24 sm:h-24 flex-shrink-0">
                <img
                  src="/images/shoe product 1.png"
                  alt="Product"
                  className="w-full h-full object-cover rounded"
                />
              </div>

              {/* Details */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
                  Product Name
                </h2>
                <p className="text-sm sm:text-base text-gray-500">Category</p>
              </div>

              {/* Price & Quantity */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-6">
                <span className="text-lg sm:text-xl font-bold text-gray-800">
                  $29.99
                </span>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 rounded hover:bg-gray-300">
                    -
                  </button>
                  <span className="px-3 text-base sm:text-lg">1</span>
                  <button className="px-2 py-1 rounded hover:bg-gray-300">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-lg sm:text-xl font-semibold text-gray-700">
            Total: <span className="text-blue-600">$89.97</span>
          </div>
          <button className="w-full sm:w-auto px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export { UserCartPage };
