import { DeleteOutlined } from "@ant-design/icons";
import { Col, Input, Row } from "antd";
import { Link } from "react-router";

const { Search } = Input;

const objects = [
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
  },
  {
    id: 2,
    name: "Beosport",
    category: "Sportwear",
    imageUrl: "/images/beosport.png",
  },
];

const StoreMenagerPage = () => {
  return (
    <div className="flex flex-col gap-5 w-screen text-black p-5 pb-0">
      <Row justify={"end"} gutter={[12, 12]}>
        <Col xs={24} className="!text-end">
          <Link to={"/admin/addstore"} className="text-blue-500">
            + add store
          </Link>
        </Col>
        <Col xs={24} xxl={4} className="w-full">
          <Search
            placeholder="Search stores..."
            onSearch={(values) => console.log(values)}
            enterButton
          />
        </Col>
      </Row>
      {/* list of components */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full p-4">
        {objects?.map((obj) => (
          <Link
            key={obj.id}
            to={`/admin/stores/${obj.id}`}
            className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center"
          >
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
              <span className="text-sm text-gray-500 mt-1">{obj.category}</span>
            </div>

            <div className="mt-4 flex justify-center">
              <DeleteOutlined className="!text-red-500 text-xl opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export { StoreMenagerPage };
