import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Select, Upload } from "antd";

const { Option } = Select;

const EditStorePage = () => {
  const [editstore] = Form.useForm();

  return (
    <div className="w-full min-h-screen flex flex-col items-center text-black p-5">
      <h1 className="text-2xl font-semibold text-center">Edit store</h1>

      <div className="w-full max-w-2xl mt-10">
        <Form
          name="basic"
          form={editstore}
          layout="vertical"
          autoComplete="off"
          className="w-full"
        >
          <Row gutter={[16, 16]}>
            {/* Store name */}
            <Col xs={24} sm={12}>
              <Form.Item
                name="name"
                label="Store name:"
                rules={[
                  {
                    required: true,
                    message: (
                      <span className="text-white">
                        Please enter the store name
                      </span>
                    ),
                  },
                ]}
              >
                <Input placeholder="Store name..." />
              </Form.Item>
            </Col>

            {/* Store category */}
            <Col xs={24} sm={12}>
              <Form.Item
                name="category"
                label="Store category:"
                rules={[
                  {
                    required: true,
                    message: (
                      <span className="text-white">
                        Please enter store's category
                      </span>
                    ),
                  },
                ]}
              >
                <Select placeholder="Select category">
                  <Option value="all">All</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Store floor */}
            <Col xs={24} sm={12}>
              <Form.Item
                name="floor"
                label="Store floor:"
                rules={[
                  {
                    required: true,
                    message: (
                      <span className="text-white">
                        Please enter the floor of the store
                      </span>
                    ),
                  },
                ]}
              >
                <Input placeholder="Floor..." type="number" />
              </Form.Item>
            </Col>

            {/* Upload image */}
            <Col xs={24} sm={12}>
              <Form.Item
                name="image"
                label="Store image:"
                rules={[
                  {
                    required: true,
                    message: (
                      <span className="text-white">
                        Please upload an image file
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

export { EditStorePage };
