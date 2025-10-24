import { Button } from "antd";
import { useLocation, useNavigate } from "react-router";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full flex justify-between p-5 bg-red-700 text-center text-xl">
      <div>Super mall Wally</div>
      <div className="flex gap-2">
        {location.pathname === "/admin/stores/" && <Button type="primary">Logout</Button>}
        {location.pathname !== "/admin/stores/" && (
          <Button type="primary" onClick={() => navigate(-1)}>Back</Button>
        )}
      </div>
    </div>
  );
};
export { Header };
