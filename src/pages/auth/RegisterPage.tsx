import {
  FacebookOutlined,
  InstagramOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";
import { Link } from "react-router";

const RegisterPage = () => {
  const [register] = Form.useForm();
  return (
    <div className="w-full h-full bg-red-700 text-white flex flex-col justify-between items-center p-10">
      <div className="text-2xl">Super mall Wally</div>
      <div className="w-full">
        <Form
          form={register}
          layout="vertical"
          name="basic"
          autoComplete="off"
          onFinish={(values) => {
            console.log(values);
          }}
        >
          <Col xs={24}>
            <Form.Item
              label={<span className="text-white">Full name:</span>}
              name="fullname"
              colon={false}
              rules={[
                {
                  required: true,
                  message: (
                    <span className="text-white">
                      Please enter your full name
                    </span>
                  ),
                },
              ]}
            >
              <Input placeholder="Full name" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label={<span className="text-white">Email:</span>}
              name="email"
              colon={false}
              rules={[
                {
                  required: true,
                  message: (
                    <span className="text-white">Please enter your email</span>
                  ),
                },
              ]}
            >
              <Input placeholder="Email" type="email" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label={<span className="text-white">Username:</span>}
              name="username"
              colon={false}
              rules={[
                {
                  required: true,
                  message: (
                    <span className="text-white">
                      Please enter your username
                    </span>
                  ),
                },
              ]}
            >
              <Input placeholder="Username" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              label={<span className="text-white">Password:</span>}
              name="password"
              colon={false}
              rules={[
                {
                  required: true,
                  message: (
                    <span className="text-white">
                      Password must be at least 6 characters or is incorrect
                    </span>
                  ),
                  len: 6,
                },
              ]}
            >
              <Input placeholder="Password" type="password" />
            </Form.Item>
          </Col>
          <Row justify="end" className="flex gap-5 items-center">
            <Link to={"/"} className="!text-white !underline">
              Login
            </Link>
            <Button htmlType="submit">Register</Button>
          </Row>
        </Form>
      </div>
      <div className="flex gap-10 text-2xl">
        <InstagramOutlined />
        <FacebookOutlined />
        <TwitterOutlined />
      </div>
    </div>
  );
};
export { RegisterPage };
