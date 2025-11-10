import { AutoComplete, Input, Spin } from "antd";
import { useNavigate, useParams } from "react-router";
import { useStoreIdQuery } from "../../api";
import { useState, type JSX } from "react";
import type { TProduct } from "../../types/types";

const UserStorePage = () => {
  const [options, setOptions] = useState<
    { value: string; label: JSX.Element }[]
  >([]);

  const navigate = useNavigate();

  const { id } = useParams();
  const { data, isLoading } = useStoreIdQuery(id!);
  const getDiscountedPrice = (
    product: TProduct,
    storeDiscount = 0
  ) => {
    const base = product.price;
    const productDiscount = product.discount || 0;

    const totalDiscount = productDiscount + storeDiscount;

    return +(base * (1 - totalDiscount / 100)).toFixed(2);
  };

  const handleSearch = (value: string) => {
    if (!data?.products) {
      setOptions([]);
      return;
    }

    const filtered = data.products
      .filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      )
      .map((product) => ({
        value: product.name,
        label: (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate(`/user/stores/${id}/product/${product.id}`);
            }}
          >
            <img
              src={product.img as string}
              alt={product.name}
              className="w-6 h-6 object-contain"
            />
            <span>{product.name}</span>
          </div>
        ),
      }));

    setOptions(filtered);
  };
  const combinedDiscount = (productDiscount: number, storeDiscount: number) => {
    return productDiscount && storeDiscount
      ? productDiscount + storeDiscount
      : productDiscount || storeDiscount;
  };

  if (isLoading) {
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <Spin tip="Loading..." size="large" />
    </div>;
  }
  return (
    <div className="w-full min-h-screen h-full text-black p-5 pb-10">
      {data ? (
        <>
          <div className="flex justify-center items-center flex-col">
            <div className="w-28 h-28 lg:w-40 lg:h-40 flex justify-center items-center mb-4">
              <img
                src={data.img as string}
                alt={data.name}
                className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h1 className="text-2xl font-bold mt-1">{data.name}</h1>
            <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-500">
              {data.category}
            </p>
          </div>
          <div className="mt-5 flex flex-col items-end w-full">
            {/* Search and Select */}
            <div className="mt-5 flex flex-col lg:flex-row 2xl:flex-row gap-5 w-full max-w-5xl ">
              <div className="flex justify-end w-full">
                <AutoComplete
                  options={options}
                  onSearch={handleSearch}
                  placeholder="Search products..."
                  className="w-full max-w-md"
                >
                  <Input.Search enterButton allowClear />
                </AutoComplete>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-5 mt-5">
            {data.products.map((product, index) => (
              <div key={index} className="relative select-none">
                {combinedDiscount(product.discount, data.discount) > 0 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md z-10">
                    -{combinedDiscount(product.discount, data.discount)}%
                  </div>
                )}
                <div className="w-[300px] lg:w-[350px] h-fit  font-semibold  flex flex-col items-center text-center flex-1 mb-5">
                  <div
                    className="w-[300px] h-[300px] bg-gray-200 flex items-center justify-center hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      navigate(`/user/stores/${id}/product/${product.id}`);
                    }}
                  >
                    <img
                      src={product.img as string}
                      alt={product.name}
                      className="max-h-[300px]"
                    />
                  </div>
                  <div className="text-center mt-5 cursor-auto">
                    <div
                      className="cursor-pointer"
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: "smooth" });
                        navigate(`/user/stores/${id}/product/${product.id}`, {
                          state: id,
                        });
                      }}
                    >
                      <p className="text-xl flex gap-2 justify-center break-words ">
                        {product.name}
                      </p>
                      <p
                        className={`mt-5 cursor-default text-gray-400 text-lg ${
                          product.discount || data.discount > 0
                            ? "line-through"
                            : ""
                        }`}
                      >
                        {product.price}$
                      </p>
                      <p
                        className={`mt-1 cursor-default text-green-600 text-xl ${
                          product.discount || data.discount > 0
                            ? "block"
                            : "invisible"
                        }`}
                      >
                        {getDiscountedPrice(product, data.discount)}$
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <Spin tip="Loading..." size="large" />
        </div>
      )}
    </div>
  );
};
export { UserStorePage };
