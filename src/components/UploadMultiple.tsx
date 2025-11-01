import { useState } from "react";
import { Upload, Button, message, Spin, Card } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";

const UploadMultiple = () => {
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleSubmit = async () => {
    if (!file) return message.warning("Please select a file first!");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const res = await fetch("https://supermall.backend.dusanprogram.eu/api/products/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();

      message.success(`Uploaded ${data.count} products successfully!`);
      setFile(null);
    } catch (error) {
      message.error("Failed to upload products");
      console.error(error);
    } finally {
      setLoading(false);
      navigate(`/admin/stores/${id}`);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md shadow-md p-6 rounded-2xl">
        <h1 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          Multiple Product Upload
        </h1>

        <div className="flex flex-col gap-4">
          <Upload
            beforeUpload={(file: File) => {
              setFile(file);
              message.success(`${file.name} selected`);
              return false;
            }}
            onRemove={() => {
              setFile(null);
            }}
            accept=".csv,.xlsx"
            maxCount={1}
          >
            <Button icon={<UploadOutlined />}>
              Select File (.csv or .xlsx)
            </Button>
          </Upload>

          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={!file}
            className="mt-2"
          >
            {loading ? <Spin size="small" /> : "Upload Products"}
          </Button>
        </div>

        <p className="text-gray-500 text-sm mt-4 text-center">
          Excel should include columns like:
          <br />
          <code>name | price | description | imageUrl | storeId</code>
        </p>
      </Card>
    </div>
  );
};

export { UploadMultiple };
