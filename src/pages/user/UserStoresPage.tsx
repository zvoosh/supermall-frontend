import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Col, Input, Row, Spin } from "antd";
import { useState } from "react";
import { Link } from "react-router";
import { useStoreQuery } from "../../api";

const categories = [
  { label: "All shops", value: "all_shops" },
  { label: "Accessories", value: "accessories" },
  { label: "Cinema", value: "cinema" },
  { label: "Kids", value: "kids" },
  { label: "Underwear", value: "underwear" },
  { label: "Electronics", value: "electronics" },
  { label: "Gastro", value: "gastro" },
  { label: "Coffee shops & restaurants", value: "coffee_shops_&_restaurants" },
  { label: "Books & multimedia", value: "books_&_multimedia" },
  { label: "Beauty & health", value: "beauty_&_health" },
  { label: "Fashion", value: "fashion" },
  { label: "Foot wear", value: "foot_wear" },
  { label: "Specialized shops", value: "specialized_shops" },
  { label: "Sport", value: "sport" },
  { label: "All for home", value: "all_for_home" },
  { label: "Services", value: "services" },
];

const UserStoresPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all_shops");
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);
  const { data, isLoading } = useStoreQuery();

  const filtered =
    Array.isArray(data) && data.length > 0
      ? data.filter((store) => {
          const matchesSearch = store.name.toLowerCase().includes(searchTerm);
          const matchesCategory =
            selectedCategory === "all_shops" ||
            store.subcategory === selectedCategory;
          const matchesFloor =
            selectedFloor === null || store.floor === selectedFloor;

          return matchesSearch && matchesCategory && matchesFloor;
        })
      : [];

  if (isLoading) {
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <Spin tip="Loading..." size="large" />
    </div>;
  }
  return (
    <div className="flex flex-col gap-5 w-screen text-black p-5 pb-0">
      <Row justify={"end"} gutter={[12, 12]} className="flex items-center">
        <Col xs={24} xxl={4} className="w-full">
          <Input
            placeholder="Floor..."
            type="number"
            min={0}
            max={4}
            onChange={(e) => {
              const value = e.target.value;
              setSelectedFloor(value === "" ? null : Number(value));
            }}
            allowClear
          />
        </Col>
        <Col xs={24} xxl={4} className="w-full">
          <Input
            placeholder="Search stores..."
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(value.toLowerCase());
            }}
            allowClear
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
          {categories.map(({ label, value }) => (
            <div
              key={value}
              className={`cursor-pointer hover:text-blue-600 transition-colors ${
                selectedCategory === value ? "text-blue-600 font-semibold" : ""
              }`}
              onClick={() => {
                setSelectedCategory(value);
                setIsSidebarOpen(false);
              }}
            >
              {label}
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
          {filtered && filtered.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {filtered?.map(
                ({
                  id,
                  name,
                  img,
                  category,
                  discount,
                }: {
                  id: string;
                  name: string;
                  img: string;
                  category: string;
                  discount: number;
                }) => (
                  <Link
                    key={id}
                    to={`/user/stores/${id}`}
                    className="relative group bg-gray-50 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center"
                  >
                    {discount > 0 && (
                      <div className="absolute top-3 right-3 bg-red-500 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md z-10">
                        -{discount}%
                      </div>
                    )}

                    <div className="w-28 h-28 2xl:w-40 2xl:h-40 flex justify-center items-center mb-4">
                      <img
                        src={img}
                        alt={name}
                        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                        {name}
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        {category}
                      </span>
                    </div>
                  </Link>
                )
              )}
            </div>
          ) : (
            <div className="w-full text-2xl text-center font-semibold">
              Hmm... nothing here yet! Maybe the perfect shop is just around the
              corner.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export { UserStoresPage };
