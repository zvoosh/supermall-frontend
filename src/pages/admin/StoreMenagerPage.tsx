import { DeleteOutlined } from "@ant-design/icons";
import { Col, Divider, Input } from "antd";
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
];

const StoreMenagerPage = () => {
  return (
    <div className="flex flex-col gap-5 w-screen text-black p-5 pb-0">
      <div className="flex flex-col gap-5 w-full items-end">
        <Link to={'/admin/addstore'} className="text-blue-500">+ add store</Link>
        <Col xs={24} className="w-full">
          <Search
            placeholder="Search stores..."
            onSearch={(values) => console.log(values)}
            enterButton
          />
        </Col>
      </div>
      {/* list of components */}
      <div>
        {objects &&
          objects.map((obj) => (
            <Link to={`/admin/stores/${obj.id}`}>
              <div className="flex justify-between items-center">
                {/* image */}
                <div className="w-20 h-20 flex justify-center items-center">
                  <img
                    src={obj.imageUrl}
                    alt={obj.name}
                    className="object-contain w-full h-full "
                  />
                </div>
                {/* header */}
                <div className="flex flex-col text-center">
                  <span className="text-lg font-bold">{obj.name}</span>
                  <span className="text-sm font-bold text-gray-400">
                    {obj.category}
                  </span>
                </div>
                {/* actions */}
                <div className="flex flex-col gap-2">
                  <DeleteOutlined className="!text-red-500" />
                </div>
              </div>
              <Divider></Divider>
            </Link>
          ))}
      </div>
    </div>
  );
};
export { StoreMenagerPage };
