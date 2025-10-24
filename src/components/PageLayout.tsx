import { Outlet } from "react-router";
import { Header } from "./Header";

const PageLayout = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-white text-white aboreto flex flex-col items-center overflow-y-auto">
      <Header />
      <Outlet />
    </div>
  );
};

export { PageLayout };
