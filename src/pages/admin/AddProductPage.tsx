import { UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Row, Upload } from "antd";
import { useProductMutation } from "../../api";
import { useNavigate, useParams } from "react-router";
import { UploadMultiple } from "../../components/UploadMultiple";

const AddProductPage = () => {
  const [newproduct] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();
  const { mutate: productMutation } = useProductMutation();

  const onFinish = (values: {
    name: string;
    img: string;
    price: number;
    discount: number;
    description: string;
    storeId: string;
  }) => {
    const file = newproduct.getFieldsValue().img.file;

    if (!(file instanceof File)) {
      message.error("Image file is missing or invalid");
      return;
    }

    const payload = {
      name: values.name,
      description: values.description,
      price: values.price,
      discount: values.discount,
      img: file,
      storeId: id!,
    };

    productMutation(payload);
    navigate(-1);
  };

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
          onFinish={onFinish}
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
                <Input placeholder="Product name..." maxLength={31} />
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
                name="img"
                label="Product image"
                rules={[{ required: true, message: "Please upload an image" }]}
              >
                <Upload
                  maxCount={1}
                  showUploadList={true}
                  beforeUpload={(file) => {
                    console.log("file", file);
                    newproduct.setFieldsValue({ img: file });
                    return false;
                  }}
                >
                  <Button icon={<UploadOutlined />}>Upload image</Button>
                </Upload>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <UploadMultiple />
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
