import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Button, Carousel, Col, Form, Input, Row } from "antd";
import { Link } from "react-router";
import motherImage from "/images/mother.png";
import shoppingImage from "/images/shopping.png";
const LoginPage = () => {
  const [login] = Form.useForm();
  return (
    <div className="w-full h-screen bg-gray-700 text-white flex flex-col justify-between items-center relative">
      <div className="w-full h-full flex flex-col lg:flex-row justify-between items-center">
        <div className="w-full lg:w-1/2 h-screen overflow-hidden shadow-2xl relative">
          <Carousel
            autoplay
            autoplaySpeed={5000}
            dots={false}
            infinite
            className="w-full h-full"
          >
            <div>
              <img
                src={motherImage}
                alt="mother image"
                className="w-full h-screen object-cover"
              />
            </div>
            <div>
              <img
                src={shoppingImage}
                alt="shopping image"
                className="w-full h-screen object-cover"
              />
            </div>
          </Carousel>

          <div className="absolute inset-0 flex justify-center items-center bg-black/40 backdrop-blur-sm lg:hidden">
            <div className="w-[90%] sm:w-[70%] bg-white/95 border p-6 rounded-xl shadow-lg">
              <div className="text-2xl font-semibold text-center mb-6 text-gray-800">
                Super Mall Wally
              </div>
              <Form
                form={login}
                layout="vertical"
                name="basic"
                autoComplete="off"
                onFinish={(values) => console.log(values)}
              >
                <Row gutter={[24, 24]}>
                  <Col xs={24}>
                    <Form.Item
                      label={<span className="text-black">Username:</span>}
                      name="username"
                      colon={false}
                      rules={[
                        {
                          required: true,
                          message: "Please enter your username",
                        },
                      ]}
                    >
                      <Input placeholder="Username" />
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item
                      label={<span className="text-black">Password:</span>}
                      name="password"
                      colon={false}
                      rules={[
                        {
                          required: true,
                          min: 6,
                          message: "Password must be at least 6 characters",
                        },
                      ]}
                    >
                      <Input.Password placeholder="Password" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row justify="end" className="flex gap-5 items-center">
                  <Link to={"/register"}>Register</Link>
                  <Link to={"/admin/stores"}>admin</Link>
                  <Link to={"/user/stores"}>user</Link>
                  <Button htmlType="submit" type="primary">
                    Login
                  </Button>
                </Row>
              </Form>
            </div>
          </div>
        </div>

        <div className="hidden lg:flex w-1/2 flex-col justify-between items-center h-full p-10">
          <div className="text-3xl font-semibold">Super Mall Wally</div>
          <div className="w-full bg-white md:w-3/5 lg:w-2/3 xl:w-2/4 2xl:w-2/5 border p-5 rounded-xl border-gray-200 shadow-md">
            <Form
              form={login}
              layout="vertical"
              name="basic"
              autoComplete="off"
              onFinish={(values) => console.log(values)}
            >
              <Row gutter={[24, 24]}>
                <Col xs={24}>
                  <Form.Item
                    label={<span className="text-black">Username:</span>}
                    name="username"
                    colon={false}
                    rules={[
                      { required: true, message: "Please enter your username" },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    label={<span className="text-black">Password:</span>}
                    name="password"
                    colon={false}
                    rules={[
                      {
                        required: true,
                        min: 6,
                        message: "Password must be at least 6 characters",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                </Col>
              </Row>
              <Row justify="end" className="flex gap-5 items-center">
                <Link to={"/register"}>Register</Link>
                <Link to={"/admin/stores"}>admin</Link>
                <Link to={"/user/stores"}>user</Link>
                <Button htmlType="submit" type="primary">
                  Login
                </Button>
              </Row>
            </Form>
          </div>
          <div className="flex gap-10 text-2xl">
            <InstagramOutlined />
            <FacebookOutlined />
            <TwitterOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};
export { LoginPage };
