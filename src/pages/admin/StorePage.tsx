import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Input, Select } from "antd";
import { Link, useParams } from "react-router";

const { Search } = Input;
const { Option } = Select;

const StorePage = () => {
  const { id } = useParams();

  return (
    <div className="w-full h-full text-black p-5 pb-0">
      <div className="flex justify-center items-center flex-col">
        <div className="w-30 h-30">
          <img src="/images/maxi.png" alt="maxi slika" />
        </div>
        <h1 className="text-2xl font-bold mt-1">
          Maxi
          <Link to={`/admin/editstore/${id}`}>
            <EditOutlined className="!text-blue-500" />
          </Link>
        </h1>
        <p className="text-md font-medium text-gray-500">Supermarket</p>
      </div>
      <div className="mt-5">
        <div className="flex flex-col gap-2">
          <span className="text-blue-500">+ add discount</span>
          <Link
            to={"/admin/stores/:id/addproduct"}
            className="text-blue-500 w-fit h-hit"
          >
            + add product
          </Link>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          <Col xs={24} className="w-full">
            <Search
              placeholder="Search products..."
              onSearch={(values) => console.log(values)}
              enterButton
            />
          </Col>
          <Col xs={24} className="w-full">
            <Select className="w-full" placeholder="Select category...">
              <Option value="all">All</Option>
            </Select>
          </Col>
        </div>
      </div>
      <div className="flex flex-col items-center gap-5 mt-5">
        <Link to={`/admin/stores/1/details`}>
          <div className="w-fit h-fit">
            <div className="w-50 bg-gray-200">
              <img src="/images/shoe product 1.png" alt="product image" />
            </div>
            <div className="text-center">
              <p className="text-lg font-bold flex gap-3 justify-center">
                Product name <DeleteOutlined className="!text-red-500" />
              </p>
              <p className="text-gray-400 text-lg">22$</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};
export { StorePage };
