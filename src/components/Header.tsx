import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Input } from "antd";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useProductsQuery } from "../api";
import type { AutoCompleteProps } from "antd";

type OptionType = Required<AutoCompleteProps>["options"][number];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: products = [] } = useProductsQuery();
  const location = useLocation();
  const navigate = useNavigate();
  const [options, setOptions] = useState<OptionType[]>([]);
  const user = sessionStorage.getItem("user");
  const parsedData = user ? JSON.parse(user) : null;

  const userData = parsedData.userData;

  const handleSearch = (value: string) => {
    const filtered = products
      .filter(
        (product: {
          id: string;
          name: string;
          price: number;
          discount: number;
          description: string;
          storeId: string;
        }) => product.name.toLowerCase().includes(value.toLowerCase())
      )
      .map(
        (product: {
          id: string;
          name: string;
          price: number;
          discount: number;
          description: string;
          storeId: string;
          img: string;
        }) => ({
          value: `${product.name}-${product.id}`,
          label: (
            <div
              key={product.id}
              className="flex items-center gap-2 text-blue-700 cursor-pointer"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                navigate(
                  userData.role === "admin"
                    ? `/admin/stores/${product.storeId}/product/${product.id}`
                    : `/user/stores/${product.storeId}/product/${product.id}`
                );
              }}
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-6 h-6 object-contain"
              />
              <span>{product.name}</span>
            </div>
          ),
        })
      );

    setOptions(filtered);
  };

  return (
    <div className="w-full flex justify-between items-center p-5 bg-gray-700 text-center text-xl gap-5">
      <div className="tracking-wide flex items-center gap-10">
        <div
          className="xl:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <CloseOutlined className="text-lg" />
          ) : (
            <MenuOutlined className="text-lg" />
          )}
        </div>
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex flex-col p-6 gap-6 text-lg font-medium">
            <div className="font-semibold text-xl">Super mall Wally</div>
            <Link
              to={"/user/stores/"}
              className={`${userData.role === "admin" ? "hidden" : ""} ${
                location.pathname === "/user/stores/"
                  ? "underline underline-offset-4"
                  : ""
              }`}
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              Shops
            </Link>
            <Link
              to={"/user/actions/"}
              className={`${userData.role === "admin" ? "hidden" : ""} ${
                location.pathname === "/user/actions/"
                  ? "underline underline-offset-4"
                  : ""
              }`}
              onClick={() => {
                setIsMenuOpen(false);
              }}
            >
              Special Offers
            </Link>
          </div>
        </div>
        {isMenuOpen && (
          <div
            className="fixed inset-0 bg-black/40 sm:hidden z-30"
            onClick={() => setIsMenuOpen(false)}
          />
        )}
        <div className="hidden md:block text-xl font-semibold">
          Super mall Wally
        </div>
        <div className="hidden xl:flex gap-10 items-center">
          <Link
            to={"/user/stores/"}
            className={`${
              userData.role === "admin" ? "hidden" : ""
            } px-5 py-2 border cursor-pointer select-none ${
              location.pathname === "/user/stores/" &&
              "underline underline-offset-5"
            }`}
          >
            Shops
          </Link>
          <Link
            to={"/user/actions/"}
            className={`${
              userData.role === "admin" ? "hidden" : ""
            } px-5 py-2 border cursor-pointer select-none ${
              location.pathname === "/user/actions/" &&
              "underline underline-offset-5"
            }`}
          >
            Special Offers
          </Link>
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <AutoComplete
          options={options}
          onSearch={handleSearch}
          placeholder="Search products..."
          className="w-full max-w-md"
        >
          <Input.Search enterButton allowClear />
        </AutoComplete>
        {location.pathname !== "/admin/stores/" &&
          location.pathname !== "/user/stores/" && (
            <Button
              type="primary"
              onClick={() => {
                navigate(-1);
              }}
            >
              Back
            </Button>
          )}
        {userData.role && (
          <Button
            type="primary"
            onClick={() => {
              navigate("/");
              sessionStorage.setItem("user", JSON.stringify(null));
            }}
          >
            Logout
          </Button>
        )}
      </div>
    </div>
  );
};
export { Header };
