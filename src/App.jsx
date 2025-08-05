import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout/layout.jsx";
import Home from "./pages/Home/Home.jsx";

import { ToastContainer } from "react-toastify";
import {Provider} from 'react-redux';
import store from "./Redux/store.js";
import Products from "./pages/Products/Products.jsx";
import ContactUs from "./pages/ContactUs/ContactUs.jsx";
import AdminPanel from "./pages/adminPanel/AdminPanel.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Login from "./pages/login/login.jsx";
import Register from "./pages/register/register.jsx";
import AddItem from "./pages/addProduct/AddProduct.jsx";
import { ProductProvider } from "./context/productContext.jsx";
import { UserProvider } from "./context/userContext.jsx";
import GetFilterCat from "./pages/GetFilterCat/GetFilterCat.jsx";
import ProdutDet from "./pages/productDet/produtDet.jsx";
import ProtectedRoute from "./pages/ProtecteRoute/ProtectRoute.jsx";




const routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, 
    children: [
      { index: true, element:<ProtectedRoute><Home /></ProtectedRoute>  },
      { path: "/products", element: <Products /> },
      { path: "/ContactUs", element: <ContactUs /> },
      { path: "/register", element: <Register /> },
      { path: "/login", element: <Login /> },
      { path: "/GetFilterCat/:category", element: <GetFilterCat /> },
      { path: "/productDet/:id", element: <ProdutDet /> },
      
        {
        path: "admin",
        element: <AdminPanel/>,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "AddItem", element: <AddItem /> },
          // { path: "allOrders", element: <AdminRoute><AllOrders /></AdminRoute> },
          // { path: "allProducts", element: <AdminRoute><AllProducts /></AdminRoute> },
          // { path: "AllUser", element: <AdminRoute><AllUser /></AdminRoute> },
          // { path: "GetContacts", element: <AdminRoute><GetContacts /></AdminRoute> },
        ],
      },
    ],
  },
]);

export default function App() {
  return (
    <Provider store={store}>
<ProductProvider>
<UserProvider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
      />
        <RouterProvider router={routers} />
</UserProvider>
      </ProductProvider>   
    </Provider>
  );  
}
