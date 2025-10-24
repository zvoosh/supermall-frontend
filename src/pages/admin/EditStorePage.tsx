import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Select, Upload } from "antd";

const { Option } = Select;

const EditStorePage = () => {
  const [editstore] = Form.useForm();

  return (
    <div className="w-full h-full flex flex-col items-center text-black p-5 pb-0">
      <h1 className="text-2xl">Edit store</h1>
      <div className="w-full h-full mt-10">
        <Form name="basic" form={editstore} layout="vertical" autoComplete="off">
          <Col xs={24}>
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
          <Col xs={24}>
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
              <Select>
                <Option value="all">All</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
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
          <Col xs={24}>
            <Form.Item
              name="image"
              className="flex justify-end"
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
                    message.success(`${info.file.name} uploaded successfully`);
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
            <Button type="primary" htmlType="submit">Submit</Button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export { EditStorePage };
