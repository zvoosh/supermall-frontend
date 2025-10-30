import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Select, Upload } from "antd";
import { useStoreMutation } from "../../api";
import { useNavigate } from "react-router";

const { Option } = Select;

const AddStorePage = () => {
  const [newstore] = Form.useForm();
  const navigate = useNavigate();

  const { mutate: storeMutation } = useStoreMutation();

  const onFinish = (values: {
    name: string;
    category: string;
    subcategory: string;
    discount: number;
    img: File;
    floor: number;
  }) => {
    const file = newstore.getFieldsValue().img.file

    if (!(file instanceof File)) {
      message.error("Image file is missing or invalid");
      return;
    }

    const payload = {
      name: values.name,
      category: values.category,
      subcategory: values.subcategory,
      discount: values.discount,
      floor: values.floor,
      img: file,
    };

    storeMutation(payload);
    navigate("/admin/stores/")
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center text-black p-5">
      <h1 className="text-2xl font-semibold text-center">Create new store</h1>
      <div className="w-full max-w-2xl mt-10">
        <Form
          name="basic"
          form={newstore}
          onFinish={onFinish}
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
                <Input placeholder="Category..." />
              </Form.Item>
            </Col>

            {/* Store subcategory */}
            <Col xs={24} sm={12}>
              <Form.Item
                name="subcategory"
                label="Store subcategory:"
                rules={[
                  {
                    required: true,
                    message: (
                      <span className="text-white">
                        Please enter store's subcategory
                      </span>
                    ),
                  },
                ]}
              >
                <Select placeholder="Select category">
                  <Option value="accessories">Accessories</Option>
                  <Option value="cinema">Cinema</Option>
                  <Option value="kids">Kids</Option>
                  <Option value="underwear">Underwear</Option>
                  <Option value="electronics">Electronics</Option>
                  <Option value="gastro">Gastro</Option>
                  <Option value="coffee_shop_&_restorants">
                    Coffee Shop & restorants
                  </Option>
                  <Option value="book_&_multimedia">Books & multimedia</Option>
                  <Option value="beauty_&_health">Beauty & health</Option>
                  <Option value="fashion">Fashion</Option>
                  <Option value="foot_wear">Foot wear</Option>
                  <Option value="specialized_shops">Specialized shops</Option>
                  <Option value="sport">Sport</Option>
                  <Option value="all_for_home">All for home</Option>
                  <Option value="services">Services</Option>
                </Select>
              </Form.Item>
            </Col>

            {/* Floor */}
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
                <Input
                  placeholder="Floor..."
                  type="number"
                  maxLength={1}
                  max={4}
                  min={1}
                />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item
                name="discount"
                label="Store discount:"
                rules={[
                  {
                    required: true,
                    message: (
                      <span className="text-white">
                        Please enter the discount for the store
                      </span>
                    ),
                  },
                ]}
              >
                <Input
                  placeholder="Discount..."
                  type="number"
                  maxLength={2}
                  max={100}
                  min={0}
                />
              </Form.Item>
            </Col>

            {/* Upload image */}
            <Col xs={24} sm={12}>
              <Form.Item
                name="img"
                label="Store image"
                rules={[{ required: true, message: "Please upload an image" }]}
              >
                <Upload
                  maxCount={1}
                  showUploadList={true}
                  beforeUpload={(file) => {
                    console.log("file", file);
                    newstore.setFieldsValue({ img: file });
                    return false;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload image</Button>
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

export { AddStorePage };
