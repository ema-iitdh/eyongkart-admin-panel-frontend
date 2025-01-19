import { ROUTES } from "@/constants/routes";
import useAuthenticationStore from "@/store/useAuthenticationStore"
import { Navigate, Outlet } from "react-router-dom";

export const RedirectAuthenticatedUser = () => {
    const { isAuthenticated } = useAuthenticationStore();

    if (isAuthenticated) {
        <Navigate path={ROUTES.DASHBOARD} />
    }

    return <Outlet />
}