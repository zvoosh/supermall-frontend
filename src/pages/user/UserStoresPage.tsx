import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import { useState } from "react";
import { Link } from "react-router";

const { Search } = Input;

const objects = [
  {
    id: 1,
    name: "Maxi",
    category: "Supermarket",
    imageUrl: "/images/maxi.png",
    discount: 20,
  },
  {
    id: 1,
    name: "Maxi",
    category: "Supermarket",
    imageUrl: "/images/maxi.png",
  },
  {
    id: 2,
    name: "Beosport",
    category: "Sportwear",
    imageUrl: "/images/beosport.png",
  },
  {
    id: 1,
    name: "Maxi",
    category: "Supermarket",
    imageUrl: "/images/maxi.png",
  },
  {
    id: 2,
    name: "Beosport",
    category: "Sportwear",
    imageUrl: "/images/beosport.png",
  },
  {
    id: 1,
    name: "Maxi",
    category: "Supermarket",
    imageUrl: "/images/maxi.png",
  },
  {
    id: 2,
    name: "Beosport",
    category: "Sportwear",
    imageUrl: "/images/beosport.png",
  },
  {
    id: 1,
    name: "Maxi",
    category: "Supermarket",
    imageUrl: "/images/maxi.png",
    discount: 20,
  },
  {
    id: 1,
    name: "Maxi",
    category: "Supermarket",
    imageUrl: "/images/maxi.png",
  },
  {
    id: 2,
    name: "Beosport",
    category: "Sportwear",
    imageUrl: "/images/beosport.png",
  },
  {
    id: 1,
    name: "Maxi",
    category: "Supermarket",
    imageUrl: "/images/maxi.png",
  },
  {
    id: 2,
    name: "Beosport",
    category: "Sportwear",
    imageUrl: "/images/beosport.png",
    discount: 20,
  },
  {
    id: 2,
    name: "Beosport",
    category: "Sportwear",
    imageUrl: "/images/beosport.png",
  },
  {
    id: 1,
    name: "Maxi",
    category: "Supermarket",
    imageUrl: "/images/maxi.png",
  },
  {
    id: 2,
    name: "Beosport",
    category: "Sportwear",
    imageUrl: "/images/beosport.png",
  },
  {
    id: 1,
    name: "Maxi",
    category: "Supermarket",
    imageUrl: "/images/maxi.png",
  },
  {
    id: 2,
    name: "Beosport",
    category: "Sportwear",
    imageUrl: "/images/beosport.png",
  },
  {
    id: 2,
    name: "Beosport",
    category: "Sportwear",
    imageUrl: "/images/beosport.png",
    discount: 20,
  },
  {
    id: 1,
    name: "Maxi",
    category: "Supermarket",
    imageUrl: "/images/maxi.png",
  },
  {
    id: 2,
    name: "Beosport",
    category: "Sportwear",
    imageUrl: "/images/beosport.png",
  },
  {
    id: 1,
    name: "Maxi",
    category: "Supermarket",
    imageUrl: "/images/maxi.png",
  },
  {
    id: 2,
    name: "Beosport",
    category: "Sportwear",
    imageUrl: "/images/beosport.png",
  },
];

const UserStoresPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="flex flex-col gap-5 w-screen text-black p-5 pb-0">
      <Row justify={"end"} gutter={[12, 12]} className="flex items-center">
        <Col xs={24} xxl={4} className="w-full">
          <Input placeholder="Floor..." type="number" min={0} max={4} />
        </Col>
        <Col xs={24} xxl={4} className="w-full">
          <Search
            placeholder="Search stores..."
            onSearch={(values) => console.log(values)}
            enterButton
          />
        </Col>
      </Row>
      {/* Toggle Button for Mobile */}
      <button
        className="sm:hidden flex items-center gap-2 bg-gray-100 rounded-xl p-2 w-fit mt-3 hover:bg-gray-200 transition-all"
        onClick={() => setIsSidebarOpen((prev) => !prev)}
      >
        {isSidebarOpen ? (
          <CloseOutlined className="text-lg" />
        ) : (
          <MenuOutlined className="text-lg" />
        )}
        <span className="text-sm font-medium">
          {isSidebarOpen ? "Close Menu" : "Categories"}
        </span>
      </button>

      <div className="w-full flex h-full relative">
        {/* Sidebar */}
        <div
          className={`
            fixed sm:static top-0 left-0 h-full sm:h-auto bg-white sm:bg-transparent 
            z-40 sm:z-auto shadow-md sm:shadow-none overflow-y-auto
            transition-all duration-300 ease-in-out
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full sm:translate-x-0"
            }
            sm:w-40 lg:w-44 2xl:w-66 flex-shrink-0 flex flex-col gap-5 p-4
          `}
        >
          {[
            "All shops",
            "Accessories",
            "Cinema",
            "Kids",
            "Underwear",
            "Electronics",
            "Gastro",
            "Coffee shops & restaurants",
            "Books & multimedia",
            "Beauty & health",
            "Fashion",
            "Foot wear",
            "Specialized shops",
            "Sport",
            "All for home",
            "Services",
          ].map((category, i) => (
            <div
              key={i}
              className="cursor-pointer hover:text-blue-600 transition-colors"
            >
              {category}
            </div>
          ))}
        </div>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 sm:hidden z-30"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Grid */}
        <div className="flex-grow overflow-y-auto p-4 sm:ml-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {objects?.map((obj) => (
              <Link
                key={obj.id}
                to={`/user/stores/${obj.id}`}
                className="relative group bg-gray-50 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center"
              >
                {obj.discount && obj.discount > 0 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md z-10">
                    -{obj.discount}%
                  </div>
                )}

                <div className="w-28 h-28 2xl:w-40 2xl:h-40 flex justify-center items-center mb-4">
                  <img
                    src={obj.imageUrl}
                    alt={obj.name}
                    className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                  />
                </div>

                <div className="flex flex-col items-center">
                  <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                    {obj.name}
                  </span>
                  <span className="text-sm text-gray-500 mt-1">
                    {obj.category}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export { UserStoresPage };
