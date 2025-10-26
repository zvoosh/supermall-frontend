import { Button } from "antd";
import { Link } from "react-router";

const UserProductPage = () => {
  return (
    <div className="w-full h-full text-black p-5 xl:p-10 flex flex-col items-center">
      <div className="w-4/5 flex flex-col lg:flex-row items-start justify-center gap-6 2xl:mt-15">
        {/* Product Image */}
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 bg-gray-100 rounded-xl overflow-hidden shadow-md p-4 flex justify-center items-center">
          <img
            src="/images/shoe product 1.png"
            alt="product image"
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex-1 flex flex-col gap-6 xl:p-10 justify-between h-full">
          <div>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold flex items-center gap-2">
                Product Name
              </h2>
              <span className="text-lg sm:text-xl lg:text-2xl xl:text-5xl font-semibold">
                $22
              </span>
            </div>
            <p className="text-gray-700 text-sm sm:text-base lg:text-lg xl:w-3/5 xl:mt-10">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo,
              omnis dolor! Doloribus sapiente sit mollitia. Excepturi blanditiis
              iure laborum dolores.
            </p>
          </div>

          <div className="self-end">
            <Button type="primary">Add to cart</Button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="font-semibold text-2xl mb-5">Similar items</div>
        <div className="flex flex-wrap justify-center gap-5 mt-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <Link to={`/user/stores/1/product/${index}`} key={index}>
              <div className="w-fit h-fit rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center flex-1 mb-5">
                <div className="w-50 2xl:w-78 bg-gray-200">
                  <img src="/images/shoe product 1.png" alt="product image" />
                </div>
                <div className="text-center">
                  <p className="text-xl font-semibold flex gap-2 justify-center">
                    Product name
                  </p>
                  <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
                    22$
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export { UserProductPage };
