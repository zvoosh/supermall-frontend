import { DeleteOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Upload } from "antd";

const ProductPage = () => {
  const [product] = Form.useForm();
  return (
    <div className="w-full h-full text-black p-5 pb-0">
      <div className="flex flex-col items-center">
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
        <div className="mt-5">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, omnis
          dolor! Doloribus sapiente sit mollitia. Excepturi blanditiis iure
          laborum dolores.
        </div>
        <div className="w-full mt-5">
          <Form
            name="basic"
            form={product}
            layout="vertical"
            autoComplete="off"
          >
            <Col xs={24}>
              <Form.Item name="name">
                <Input placeholder="Product name..." />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="price">
                <Input type="number" placeholder="Price..." />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="description">
                <Input placeholder="Description..." />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="discount">
                <Input placeholder="Discount..." />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <Form.Item name="image" className="flex justify-end">
                <Upload
                  name="image"
                  action={"api/upload/image"}
                  maxCount={1}
                  showUploadList={true}
                  accept="image/*"
                  onChange={(info) => {
                    const { status } = info.file;
                    if (status === "done") {
                      message.success(
                        `${info.file.name} uploaded successfully`
                      );
                      // optionally trigger a refetch or update product state
                    } else if (status === "error") {
                      message.error(`${info.file.name} upload failed`);
                    }
                  }}
                  beforeUpload={(file) => {
                    const isImage = file.type.startsWith("image/");
                    if (!isImage) {
                      message.error("Only image files are allowed!");
                    }
                    return isImage;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload image</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Form>
        </div>
      </div>
    </div>
  );
};
export { ProductPage };
