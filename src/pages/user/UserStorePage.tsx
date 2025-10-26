import { Checkbox, Input, Select } from "antd";
import { Link } from "react-router";

const { Search } = Input;
const { Option } = Select;

const UserStorePage = () => {
  return (
    <div className="w-full min-h-screen h-full text-black p-5 pb-10">
      <div className="flex justify-center items-center flex-col">
        <div className="w-28 h-28 lg:w-40 lg:h-40 flex justify-center items-center mb-4">
          <img
            src="/images/maxi.png"
            alt="maxi slika"
            className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h1 className="text-2xl font-bold mt-1">Maxi</h1>
        <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-500">
          Supermarket
        </p>
      </div>
      <div className="mt-5 flex flex-col items-end w-full">
        {/* Search and Select */}
        <div className="mt-5 flex flex-col lg:flex-row 2xl:flex-row gap-5 w-full max-w-5xl">
          <div>
            <Checkbox>Premium discount</Checkbox>
          </div>
          <div className="flex-1">
            <Search
              placeholder="Search products..."
              onSearch={(values) => console.log(values)}
              enterButton
              className="w-full"
            />
          </div>
          <div className="w-full lg:w-1/3">
            <Select className="w-full" placeholder="Select category...">
              <Option value="all">All</Option>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-5">
        {Array.from({ length: 12 }).map((_, index) => (
          <Link to={`/user/stores/1/product/${index}`} key={index}>
            {/* Make this relative so the badge anchors correctly */}
            <div className="relative w-fit h-fit rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center flex-1 mb-5">
              {/* Discount badge */}
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md z-10">
                -20%
              </div>

              {/* Product image */}
              <div className="w-50 2xl:w-78 bg-gray-200 rounded-xl overflow-hidden">
                <img src="/images/shoe product 1.png" alt="product image" />
              </div>

              {/* Product info */}
              <div className="text-center mt-3">
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
  );
};
export { UserStorePage };
