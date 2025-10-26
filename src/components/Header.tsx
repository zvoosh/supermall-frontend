import { CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

const { Search } = Input;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
              className={` ${
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
              className={` ${
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
              className={` ${
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
        <div className="hidden md:block text-xl font-semibold">Super mall Wally</div>
        <div className="hidden xl:flex gap-10 items-center">
          <Link
            to={"/user/stores/"}
            className={`px-5 py-2 border cursor-pointer select-none ${
              location.pathname.includes("/user/stores/") &&
              "underline underline-offset-5"
            }`}
          >
            All shops
          </Link>
          <Link
            to={"/user/actions/"}
            className={`px-5 py-2 border cursor-pointer select-none ${
              location.pathname.includes("/user/actions/") &&
              "underline underline-offset-5"
            }`}
          >
            Actions
          </Link>
          <Link
            to={"/user/cart/"}
            className={`px-5 py-2 border cursor-pointer select-none ${
              location.pathname.includes("/user/cart/") &&
              "underline underline-offset-5"
            }`}
          >
            Cart
          </Link>
        </div>
      </div>
      <div className="flex gap-2">
        <div>
          <Search enterButton placeholder="Search the website..." />
        </div>
        {location.pathname !== "/admin/stores/" &&
          location.pathname !== "/user/stores/" && (
            <Button type="primary" onClick={() => navigate(-1)}>
              Back
            </Button>
          )}
        <Button type="primary" onClick={() => navigate(-1)}>
          Logout
        </Button>
      </div>
    </div>
  );
};
export { Header };
