import { Route, Routes } from "react-router";
import "./App.css";
import {
  AddProductPage,
  AddStorePage,
  EditStorePage,
  LoginPage,
  ProductPage,
  RegisterPage,
  StoreMenagerPage,
  StorePage,
} from "./pages";
import { PageLayout } from "./components";

function App() {
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="/admin" element={<PageLayout />}>
          <Route path="stores" element={<StoreMenagerPage />} />
          <Route path="stores/:id" element={<StorePage />} />
          <Route path="stores/:id/details" element={<ProductPage />} />
          <Route path="stores/:id/addproduct" element={<AddProductPage />} />
          <Route path="addstore" element={<AddStorePage />} />
          <Route path="editstore/:id" element={<EditStorePage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
