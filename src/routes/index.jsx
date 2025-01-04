import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import ProtectedRoute from "./ProtectedRoutes";
import Login from "@/pages/auth/Login";
import Signup from "@/pages/auth/Signup";
import Dashboard from "@/pages/dashboard/Dashboard";
import SideBarLayout from "@/layouts/SidebarLayout";
import { OrderPage } from "@/pages/orderPage/OrderPage";

export default function AppRoutes() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route element={<ProtectedRoute />}>
                    <Route element={<SideBarLayout />}>
                        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                        <Route path={ROUTES.ORDERPAGE} element={<OrderPage />} />
                    </Route>
                </Route>

                <Route path={ROUTES.LOGIN} element={<Login />} />
                <Route path={ROUTES.SIGNUP} element={<Signup />} />
            </Routes>
        </Suspense>
    )
}