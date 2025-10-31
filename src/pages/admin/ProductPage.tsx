import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, Spin } from "antd";
import { useNavigate, useParams } from "react-router";
import {
  useDeleteProductMutation,
  useEditProductMutation,
  useProductIdQuery,
} from "../../api";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const ProductPage = () => {
  const [product] = Form.useForm();
  const { id, productId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isLoading } = useProductIdQuery(productId!);
  const { mutate: editProductMutation } = useEditProductMutation();
  const { mutate: deleteProductMutation } = useDeleteProductMutation();

  useEffect(() => {
    product.setFieldsValue(data);
  }, [data]);

  const onFinish = (values: {
    id: string;
    name: string;
    price: number;
    discount: number;
    description: string;
  }) => {
    editProductMutation(values);
    if (productId) {
      queryClient.refetchQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["product", productId] });
      queryClient.invalidateQueries({ queryKey: ["stores", id] });
    }
  };

  const onDelete = (id: string) => {
    deleteProductMutation({ id });
    navigate(-1);
  };

  if (isLoading) {
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <Spin tip="Loading..." size="large" />
    </div>;
  }

  return (
    <div className="w-full h-full text-black p-5 xl:p-10 flex flex-col items-center">
      {data ? (
        <>
          <div className="w-4/5 flex flex-col lg:flex-row items-center justify-center gap-6 2xl:mt-15">
            <div className="w-full lg:w-1/2 xl:w-2/5 bg-gray-100 rounded-xl overflow-hidden shadow-md p-4 flex justify-center items-center">
              <img
                src={data?.img}
                alt={data?.name}
                className="object-contain w-full h-full"
              />
            </div>

            <div className="flex-1 flex flex-col gap-6 xl:p-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <h2 className="text-xl sm:text-2xl lg:text-4xl font-bold flex items-center gap-2">
                  {data?.name}
                  <DeleteOutlined
                    className="text-red-500 text-lg lg:text-2xl cursor-pointer"
                    onClick={() => {
                      onDelete(data.id);
                    }}
                  />
                </h2>
                <div className="flex text-center flex-col relative">
                  <span
                    className={`text-lg sm:text-xl lg:text-2xl xl:text-5xl font-semibold ${
                      data.discount > 0 ? "line-through" : ""
                    }`}
                  >
                    {data.price}$
                  </span>
                  <span
                    className={`text-green-600 text-xl sm:text-2xl lg:text-3xl xl:text-7xl font-semibold ${
                      data.discount > 0 ? "block" : "hidden"
                    }`}
                  >
                    {data.discount
                      ? data.price - (data.price * data.discount) / 100
                      : data.price}
                    $
                  </span>
                </div>
              </div>

              <p className="text-gray-700 text-sm sm:text-base lg:text-lg xl:w-3/5">
                {data?.description}
              </p>

              <div className="w-full xl:w-3/5 mt-5 xl:mt-10 mb-5">
                <Form
                  name="basic"
                  form={product}
                  layout="vertical"
                  onFinish={onFinish}
                  autoComplete="off"
                >
                  <Col xs={24}>
                    <Form.Item name="id" label="Product ID:" className="hidden">
                      <Input placeholder="Product ID..." />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item name="name" label="Product name:">
                      <Input placeholder="Product name..." maxLength={31} />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item name="price" label="Product price:">
                      <Input type="number" placeholder="Price..." />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item name="description" label="Product description:">
                      <Input.TextArea rows={3} placeholder="Description..." />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item name="discount" label="Product discount:">
                      <Input placeholder="Discount..." />
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
          </div>
        </>
      ) : (
        <>Loading</>
      )}
    </div>
  );
};

export { ProductPage };
