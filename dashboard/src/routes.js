import { Navigate } from "react-router-dom";
import DashboardLayout from "src/components/DashboardLayout";
import MainLayout from "src/components/MainLayout";
import Account from "src/pages/Account";
import CustomerList from "src/pages/CustomerList";
import Dashboard from "src/pages/Dashboard";
import Login from "src/pages/Login";
import NotFound from "src/pages/NotFound";
import ProductList from "src/pages/ProductList";
import Register from "src/pages/Register";
import Settings from "src/pages/Settings";
import Invoices from "./pages/Invoices";
import Orders from "./pages/Orders";
import Commision from "./pages/Commision";
import Services from "./pages/Services";
import Subscription from "./pages/Subscription";
import Tickets from "./pages/Tickets";
import { auth } from "./firebase";

const user = auth.currentUser;

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "subscriptions", element: <Subscription /> },
      { path: "invoices", element: <Invoices /> },
      { path: "search", element: <Orders /> },
      { path: "commisions", element: <Commision /> },
      { path: "campaign", element: <Services /> },
      { path: "enrich", element: <Tickets /> },
      { path: "account", element: <Account /> },
      { path: "settings", element: <Settings /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "404", element: <NotFound /> },
      { path: "/", element: <Navigate to="/app/dashboard" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
