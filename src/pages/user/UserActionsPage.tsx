import { Col, Input, Row, Spin } from "antd";
import { useNavigate } from "react-router";
import { useStoreQuery } from "../../api";
import { useState } from "react";

const UserActionsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useStoreQuery();
  const navigate = useNavigate();

  const filtered =
    Array.isArray(data) && data.length > 0
      ? data.filter((store) => {
          const matchesSearch = store.name.toLowerCase().includes(searchTerm);
          return matchesSearch;
        })
      : [];

  if (isLoading) {
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <Spin tip="Loading..." size="large" />
    </div>;
  }
  return (
    <div className="flex flex-col gap-5 w-screen text-black p-5 pb-0">
      <Row justify={"end"} className="flex items-center">
        <Col xs={24} xxl={4} className="w-full">
          <Input
            placeholder="Search stores..."
            onChange={(e) => {
              const value = e.target.value;
              setSearchTerm(value.toLowerCase());
            }}
            allowClear
          />
        </Col>
      </Row>

      <div className="w-full h-full relative">
        {/* Grid */}
        <div className="flex-grow overflow-y-auto p-4 sm:ml-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-7">
            {filtered
              ?.filter((obj) => obj.discount && obj.discount > 0)
              .map((obj) => (
                <div
                  key={obj.id}
                  className="relative cursor-pointer group bg-gray-50 rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center"
                  onClick={() => {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    navigate(`/user/stores/${obj.id}`);
                  }}
                >
                  <div className="absolute top-3 right-3 bg-red-500 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md">
                    -{obj.discount}%
                  </div>

                  <div className="w-28 h-28 2xl:w-40 2xl:h-40 flex justify-center items-center mb-4">
                    <img
                      src={obj.img}
                      alt={obj.name}
                      className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                      {obj.name}
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      {obj.category}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export { UserActionsPage };
