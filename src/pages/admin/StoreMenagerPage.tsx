import { DeleteOutlined } from "@ant-design/icons";
import { Col, Input, Row, Spin } from "antd";
import { Link, useNavigate } from "react-router";
import { useDeleteStoreMutation, useStoreQuery } from "../../api";
import { useState } from "react";

const { Search } = Input;

const StoreMenagerPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, isLoading } = useStoreQuery();
  const { mutate: deleteMutation } = useDeleteStoreMutation();
  const navigate = useNavigate();

  const handleSearch = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const onDelete = (id: string) => {
    deleteMutation(id);
  };
  const filtered =
    Array.isArray(data) && data.length > 0
      ? data.filter(
          (stores: {
            id: string;
            name: string;
            category: string;
            subcategory: string;
            discount: number;
            img: File;
            floor: number;
          }) => stores.name.toLowerCase().includes(searchTerm)
        )
      : [];

  if (isLoading) {
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <Spin tip="Loading..." size="large" />
    </div>;
  }

  return (
    <div className="flex flex-col gap-5 w-screen text-black p-5 pb-0 select-none">
      <Row justify={"end"} gutter={[12, 12]}>
        <Col xs={24} className="!text-end">
          <Link
            to={"/admin/addstore"}
            className="text-blue-500"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            + add store
          </Link>
        </Col>
        <Col xs={24} xxl={4} className="w-full">
          <Search
            placeholder="Search stores..."
            onSearch={handleSearch}
            enterButton
            allowClear
          />
        </Col>
      </Row>
      {/* list of components */}
      {filtered && filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full p-4">
          {filtered?.map(
            ({
              id,
              name,
              img,
              category,
              discount,
            }: {
              id: string;
              name: string;
              img: string;
              category: string;
              discount: number;
            }) => (
                <div
                  key={id}
                  className="relative block group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 flex flex-col items-center text-center"
                >
                  {discount > 0 && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-full shadow-md z-10">
                      -{discount}%
                    </div>
                  )}
                  <div
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                      navigate(`/admin/stores/${id}`);
                    }}
                  >
                    <div className="w-28 h-28 2xl:w-40 2xl:h-40 flex justify-center items-center mb-4">
                      <img
                        src={img}
                        alt={name}
                        className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>

                    <div className="flex flex-col items-center">
                      <span className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                        {name}
                      </span>
                      <span className="text-sm text-gray-500 mt-1">
                        {category}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-center">
                    <DeleteOutlined
                      className="!text-red-500 text-xl opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(id);
                      }}
                    />
                  </div>
                </div>
            )
          )}
        </div>
      ) : (
        <div className="w-full text-2xl text-center font-semibold">
          No stores currently in the mall...
        </div>
      )}
    </div>
  );
};
export { StoreMenagerPage };
