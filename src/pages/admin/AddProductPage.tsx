import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Upload } from "antd";

const AddProductPage = () => {
  const [newproduct] = Form.useForm();

  return (
    <div className="w-full h-full flex flex-col items-center text-black p-5 pb-0">
      <h1 className="text-2xl">Create new product</h1>
      <div className="w-full h-full mt-10">
        <Form
          name="basic"
          form={newproduct}
          layout="vertical"
          autoComplete="off"
        >
          <Col xs={24}>
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
          <Col xs={24}>
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
              <Input placeholder="Description..." />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="discount"
              label="Product discount:"
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
              <Input placeholder="Discount..." />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="image"
              className="flex justify-end"
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
                    message.success(`${info.file.name} uploaded successfully`);
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
          <Row justify={"end"}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export { AddProductPage };
