import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import {
  AddProductPage,
  AddStorePage,
  EditStorePage,
  LoginPage,
  ProductPage,
  // RegisterPage,
  StoreMenagerPage,
  StorePage,
  UserActionsPage,
  UserCartPage,
  UserProductPage,
  UserStorePage,
  UserStoresPage,
} from "./pages";
import { PageLayout, ProtectedRoute } from "./components";

function App() {
  return (
    <div className="w-screen h-screen">
      <Routes>
        <Route path="/" element={<Navigate to="/user/stores/" replace />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="register/23121999" element={<RegisterPage />} /> */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <PageLayout />
            </ProtectedRoute>
          }
        >
          <Route path="stores" element={<StoreMenagerPage />} />
          <Route path="stores/:id" element={<StorePage />} />
          <Route
            path="stores/:id/product/:productId"
            element={<ProductPage />}
          />
          <Route path="stores/:id/addproduct" element={<AddProductPage />} />
          <Route path="addstore" element={<AddStorePage />} />
          <Route path="editstore/:id" element={<EditStorePage />} />
        </Route>
        <Route path="/user" element={<PageLayout />}>
          <Route path="stores" element={<UserStoresPage />} />
          <Route path="stores/:id" element={<UserStorePage />} />
          <Route
            path="stores/:id/product/:productId"
            element={<UserProductPage />}
          />
          <Route path="actions" element={<UserActionsPage />} />
          <Route path="cart" element={<UserCartPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
