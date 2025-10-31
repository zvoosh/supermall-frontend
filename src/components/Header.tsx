import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { AutoComplete, Button, Input } from "antd";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useProductsQuery } from "../api";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: products = [] } = useProductsQuery();
  const [options, setOptions] = useState([]);

  const handleSearch = (value: string) => {
    const filtered = products
      .filter(
        (product: {
          id: string;
          name: string;
          img: string;
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
          img: string;
          price: number;
          discount: number;
          description: string;
          storeId: string;
        }) => ({
          value: product.name,
          label: (
            <Link
              to={`/admin/stores/${product.storeId}/product/${product.id}`}
              className="flex items-center gap-2"
            >
              <img
                src={product.img}
                alt={product.name}
                className="w-6 h-6 object-contain"
              />
              <span>{product.name}</span>
            </Link>
          ),
        })
      );

    setOptions(filtered);
  };

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = sessionStorage.getItem("admin");

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
              className={`${isLoggedIn === "loggedin" ? "hidden" : ""} ${
                location.pathname.includes("/user/stores/")
                  ? "underline underline-offset-4"
                  : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              All shops
            </Link>
            <Link
              to={"/user/actions/"}
              className={`${isLoggedIn === "loggedin" ? "hidden" : ""} ${
                location.pathname.includes("/user/actions/")
                  ? "underline underline-offset-4"
                  : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Actions
            </Link>
            <Link
              to={"/user/cart/"}
              className={`${isLoggedIn === "loggedin" ? "hidden" : ""} ${
                location.pathname.includes("/user/cart/")
                  ? "underline underline-offset-4"
                  : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Cart
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
              isLoggedIn === "loggedin" ? "hidden" : ""
            } px-5 py-2 border cursor-pointer select-none ${
              location.pathname.includes("/user/stores/") &&
              "underline underline-offset-5"
            }`}
          >
            All shops
          </Link>
          <Link
            to={"/user/actions/"}
            className={`${
              isLoggedIn === "loggedin" ? "hidden" : ""
            } px-5 py-2 border cursor-pointer select-none ${
              location.pathname.includes("/user/actions/") &&
              "underline underline-offset-5"
            }`}
          >
            Actions
          </Link>
          <Link
            to={"/user/cart/"}
            className={`${
              isLoggedIn === "loggedin" ? "hidden" : ""
            } px-5 py-2 border cursor-pointer select-none ${
              location.pathname.includes("/user/cart/") &&
              "underline underline-offset-5"
            }`}
          >
            Cart
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
            <Button type="primary" onClick={() => navigate(-1)}>
              Back
            </Button>
          )}
        {isLoggedIn !== "loggedin" ? (
          <Button
            type="primary"
            onClick={() => {
              navigate("/login");
              sessionStorage.setItem("admin", "");
            }}
          >
            Login
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => {
              navigate("/");
              sessionStorage.setItem("admin", "");
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
