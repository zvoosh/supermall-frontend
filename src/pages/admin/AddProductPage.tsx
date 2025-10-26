import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Upload } from "antd";

const AddProductPage = () => {
  const [newproduct] = Form.useForm();

  return (
    <div className="w-full min-h-screen flex flex-col items-center text-black p-5">
      <h1 className="text-2xl font-semibold text-center">Create new product</h1>

      <div className="w-full max-w-3xl mt-10 pb-10">
        <Form
          name="basic"
          form={newproduct}
          layout="vertical"
          autoComplete="off"
          className="w-full"
        >
          <Row gutter={[16, 16]}>
            {/* Product name */}
            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="Product name:"
                rules={[
                  {
                    required: true,
                    message: (
                      <span className="text-white">
                        Please enter a product name
                      </span>
                    ),
                  },
                ]}
              >
                <Input placeholder="Product name..." />
              </Form.Item>
            </Col>

            {/* Product price */}
            <Col xs={24} sm={12}>
              <Form.Item
                name="price"
                label="Product price:"
                rules={[
                  {
                    required: true,
                    message: (
                      <span className="text-white">
                        Please enter product's price
                      </span>
                    ),
                  },
                ]}
              >
                <Input type="number" placeholder="Price..." />
              </Form.Item>
            </Col>

            {/* Product description */}
            <Col xs={24}>
              <Form.Item
                name="description"
                label="Product description:"
                rules={[
                  {
                    required: true,
                    message: (
                      <span className="text-white">
                        Please enter product's description
                      </span>
                    ),
                  },
                ]}
              >
                <Input.TextArea rows={3} placeholder="Description..." />
              </Form.Item>
            </Col>

            {/* Product discount */}
            <Col xs={24} sm={12}>
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
                <Input placeholder="Discount..." type="number" />
              </Form.Item>
            </Col>

            {/* Upload image */}
            <Col xs={24} sm={12}>
              <Form.Item
                name="image"
                label="Product image:"
                rules={[
                  {
                    required: true,
                    message: (
                      <span className="text-white">
                        Please upload product's image
                      </span>
                    ),
                  },
                ]}
              >
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
                  <Button
                    icon={<UploadOutlined />}
                    className="w-full sm:w-auto"
                  >
                    Upload image
                  </Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

          {/* Submit button */}
          <Row justify="end" className="mt-4">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full sm:w-auto"
            >
              Submit
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export { AddProductPage };
