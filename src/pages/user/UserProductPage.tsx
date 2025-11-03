import { Button, Row, Spin } from "antd";
import { Link, useParams } from "react-router";
import { useProductIdQuery, useStoreIdQuery } from "../../api";

const UserProductPage = () => {
  const { productId, id } = useParams();
  const { data, isLoading } = useProductIdQuery(productId!);
  const { data: store, isLoading: load } = useStoreIdQuery(id!);

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

    const totalDiscount = productDiscount + storeDiscount;

    return +(base * (1 - totalDiscount / 100)).toFixed(2);
  };

  if (isLoading || load) {
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <Spin tip="Loading..." size="large" />
    </div>;
  }

  return (
    <div className="w-full h-full text-black p-5 xl:p-10 flex flex-col items-center">
      {data && store ? (
        <>
          <div className="w-4/5 flex flex-col lg:flex-row items-center justify-center gap-6 2xl:mt-15">
            <div className="w-full lg:w-1/2 xl:w-[800px] xl:h-[500px] bg-gray-100 rounded-xl overflow-hidden shadow-md p-4 flex justify-center items-center">
              <img
                src={data.img}
                alt={data.name}
                className="object-contain w-full h-full"
              />
            </div>

            <div className="flex-1 flex flex-col gap-6 xl:p-10 self-start">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold flex items-center gap-2">
                  {data.name}
                </h2>
                <div className="flex text-center flex-col relative">
                  <span
                    className={`text-lg sm:text-xl lg:text-2xl xl:text-5xl font-semibold ${
                      data.discount || store.discount > 0 ? "line-through" : ""
                    }`}
                  >
                    {data.price}$
                  </span>
                  <span
                    className={`text-green-600 text-xl sm:text-2xl lg:text-3xl xl:text-7xl font-semibold ${
                      data.discount || store.discount > 0 ? "block" : "hidden"
                    }`}
                  >
                    {getDiscountedPrice(data, store.discount)}$
                  </span>
                </div>
              </div>
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg xl:w-3/5">
                {data.description}
              </p>
              <Row justify={"end"} className="mt-5">
                <Button type="primary">Add to cart</Button>
              </Row>
            </div>
          </div>
          <div className="mt-30 w-full max-w-5xl flex justify-center flex-col items-center">
            <h3 className="text-2xl font-semibold mb-10 text-center">
              Similar items
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {store.products
                ?.filter((p) => p.id !== data.id)
                .sort(() => Math.random() - 0.5)
                .slice(0, 3)
                .map((product) => (
                  <Link
                    to={`/user/stores/${id}/product/${product.id}`}
                    key={product.id}
                    className="w-[300px] lg:w-[350px] h-fit  font-semibold  flex flex-col items-center text-center flex-1 mb-5"
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      className="object-contain w-full h-48 mb-4"
                    />
                    <h4 className="font-semibold text-lg">{product.name}</h4>
                    <p className="text-gray-600 mb-2">
                      {getDiscountedPrice(product, store.discount)}$
                    </p>
                  </Link>
                ))}
            </div>
          </div>
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export { UserProductPage };
