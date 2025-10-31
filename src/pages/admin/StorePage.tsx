import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { AutoComplete, Input, Spin } from "antd";
import { Link, useParams } from "react-router";
import { useDeleteProductMutation, useStoreIdQuery } from "../../api";
import { useState, type JSX } from "react";

const StorePage = () => {
  const [options, setOptions] = useState<
    { value: string; label: JSX.Element }[]
  >([]);

  const { id } = useParams();

  const { data, isLoading } = useStoreIdQuery(id!);
  const { mutate: deleteProductMutation } = useDeleteProductMutation();
  
  const getDiscountedPrice = (
    product: {
      id: string;
      name: string;
      img: string;
      price: number;
      discount: number;
      description: string;
    },
    storeDiscount = 0
  ) => {
    const base = product.price;
    const productDiscount = product.discount || 0;

    // Combine discounts however you want
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
          <Link
            to={`/admin/stores/${id}/product/${product.id}`}
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
      }));

    setOptions(filtered);
  };

  const onDelete = (productId: string) => {
    console.log("id", id);
    deleteProductMutation({ id: productId, storeId: id });
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
      {/* my margin bottom isn't working on more product items */}
      {data ? (
        <>
          <div className="flex justify-center items-center flex-col">
            <div className="w-28 h-28 lg:w-40 lg:h-40 flex justify-center items-center mb-4">
              <img
                src={data.img}
                alt={data.name}
                className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <h1 className="text-2xl font-bold mt-1">
              {data.name}
              <Link to={`/admin/editstore/${data.id}`}>
                <EditOutlined className="!text-blue-500 !ml-2" />
              </Link>
            </h1>
            <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-500">
              {data.category}
            </p>
          </div>
          <div className="mt-5 flex flex-col items-end w-full">
            {/* Action links */}
            <div className="flex flex-col gap-2 items-end">
              <Link
                to={`/admin/stores/${data.id}/addproduct`}
                className="text-blue-500 hover:text-blue-700 w-fit transition"
              >
                + add product
              </Link>
            </div>

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

          <div className="flex flex-wrap justify-center gap-10 mt-5">
            {data.products.map((product, index) => (
              <div key={index} className="relative select-none">
                {combinedDiscount(product.discount, data.discount) > 0 && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md z-10">
                    -{combinedDiscount(product.discount, data.discount)}%
                  </div>
                )}
                <div className="w-fit h-fit font-semibold rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center flex-1 mb-5">
                  <div className="w-50 2xl:w-78 bg-gray-200">
                    <img src={product.img} alt={product.name} />
                  </div>
                  <div className="text-center mt-5">
                    <Link to={`/admin/stores/${id}/product/${product.id}`} state={data.discount}>
                      <p className="text-xl flex gap-2 justify-center break-words ">
                        {product.name}
                      </p>
                      <p
                        className={`mt-5 text-gray-400 text-sm sm:text-base lg:text-lg ${
                          product.discount || data.discount > 0 ? "line-through" : ""
                        }`}
                      >
                        {product.price}$
                      </p>
                      <p
                        className={`mt-1 text-green-600 text-md sm:text-base lg:text-xl ${
                          product.discount || data.discount > 0 ? "block" : "invisible"
                        }`}
                      >
                        {getDiscountedPrice(product, data.discount)}$
                      </p>
                    </Link>
                  </div>
                  <DeleteOutlined
                    className="!text-red-500 mt-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(product.id);
                    }}
                  />
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
export { StorePage };
