import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Upload } from "antd";

const ProductPage = () => {
  const [product] = Form.useForm();
  return (
    <div className="w-full h-full text-black p-5 xl:p-10 flex flex-col items-center">
      <div className="w-4/5 flex flex-col lg:flex-row items-center justify-center gap-6 2xl:mt-15">
        <div className="w-full lg:w-1/2 xl:w-2/5 bg-gray-100 rounded-xl overflow-hidden shadow-md p-4 flex justify-center items-center">
          <img
            src="/images/shoe product 1.png"
            alt="product image"
            className="object-contain w-full h-full"
          />
        </div>

        <div className="flex-1 flex flex-col gap-6 xl:p-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold flex items-center gap-2">
              Product Name
              <DeleteOutlined className="text-red-500 text-lg lg:text-2xl cursor-pointer" />
            </h2>
            <span className="text-lg sm:text-xl lg:text-2xl xl:text-5xl font-semibold">
              $22
            </span>
          </div>

          <p className="text-gray-700 text-sm sm:text-base lg:text-lg xl:w-3/5">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, omnis
            dolor! Doloribus sapiente sit mollitia. Excepturi blanditiis iure
            laborum dolores.
          </p>

          <div className="w-full xl:w-3/5 mt-5 xl:mt-10 mb-5">
            <Form
              name="basic"
              form={product}
              layout="vertical"
              autoComplete="off"
            >
              <Col xs={24}>
                <Form.Item name="name" label="Product name:">
                  <Input placeholder="Product name..." />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="price" label="Product price:">
                  <Input type="number" placeholder="Price..." />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="description" label="Product description:">
                  <Input placeholder="Description..." />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="discount" label="Product discount:">
                  <Input placeholder="Discount..." />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item
                  name="image"
                  className="flex justify-start sm:justify-end"
                >
                  <Upload
                    name="image"
                    action={"api/upload/image"}
                    maxCount={1}
                    showUploadList
                    accept="image/*"
                    onChange={(info) => {
                      const { status } = info.file;
                      if (status === "done") {
                        message.success(
                          `${info.file.name} uploaded successfully`
                        );
                      } else if (status === "error") {
                        message.error(`${info.file.name} upload failed`);
                      }
                    }}
                    beforeUpload={(file) => {
                      const isImage = file.type.startsWith("image/");
                      if (!isImage)
                        message.error("Only image files are allowed!");
                      return isImage;
                    }}
                  >
                    <Button icon={<UploadOutlined />}>Upload image</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Row justify={'end'}>
                <Button type="primary">Submit</Button>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ProductPage };
