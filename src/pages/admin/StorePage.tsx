import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Col, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { Link, useParams } from "react-router";

const { Search } = Input;
const { Option } = Select;

const StorePage = () => {
  const [discount] = Form.useForm();
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen h-full text-black p-5 pb-10">
      {/* my margin bottom isn't working on more product items */}
      <div className="flex justify-center items-center flex-col">
        <div className="w-28 h-28 lg:w-40 lg:h-40 flex justify-center items-center mb-4">
          <img
            src="/images/maxi.png"
            alt="maxi slika"
            className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <h1 className="text-2xl font-bold mt-1">
          Maxi
          <Link to={`/admin/editstore/${id}`}>
            <EditOutlined className="!text-blue-500 !ml-2" />
          </Link>
        </h1>
        <p className="text-sm sm:text-base lg:text-lg font-medium text-gray-500">
          Supermarket
        </p>
      </div>
      <div className="mt-5 flex flex-col items-end w-full">
        {/* Action links */}
        <div className="flex flex-col gap-2 items-end">
          <span
            className="text-blue-500 cursor-pointer hover:text-blue-700 transition"
            onClick={showModal}
          >
            + add discount
          </span>
          <Link
            to={"/admin/stores/:id/addproduct"}
            className="text-blue-500 hover:text-blue-700 w-fit transition"
          >
            + add product
          </Link>
        </div>

        {/* Search and Select */}
        <div className="mt-5 flex flex-col lg:flex-row 2xl:flex-row gap-5 w-full max-w-5xl">
          <div className="flex-1">
            <Search
              placeholder="Search products..."
              onSearch={(values) => console.log(values)}
              enterButton
              className="w-full"
            />
          </div>
          <div className="w-full lg:w-1/3">
            <Select
              className="w-full"
              placeholder="Select category..."
              dropdownMatchSelectWidth={false}
            >
              <Option value="all">All</Option>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10 mt-5">
        {Array.from({ length: 12 }).map((_, index) => (
          <Link to={`/admin/stores/1/details`} key={index}>
            <div className="w-fit h-fit rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center flex-1 mb-5">
              <div className="w-50 2xl:w-78 bg-gray-200">
                <img src="/images/shoe product 1.png" alt="product image" />
              </div>
              <div className="text-center">
                <p className="text-xl font-semibold flex gap-2 justify-center">
                  Product name <DeleteOutlined className="!text-red-500" />
                </p>
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg">
                  22$
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Modal
        title="Basic Modal"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="basic"
          form={discount}
          layout="vertical"
          autoComplete="off"
          className="w-full"
        >
          {/* Product discount */}
          <Col xs={24}>
            <Form.Item
              name="discount"
              label="Product discount (%):"
              rules={[
                {
                  required: true,
                  message: (
                    <span className="text-white">
                      Please enter product's discount
                    </span>
                  ),
                },
              ]}
            >
              <Input
                placeholder="Discount..."
                type="number"
                min={0}
                max={100}
                step="1"
              />
            </Form.Item>
          </Col>
        </Form>
      </Modal>
    </div>
  );
};
export { StorePage };
