import { useQuery } from "@tanstack/react-query";
import { checkSession } from "../api";
import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";

/**
 * A component that protects routes by checking the user's session status.
 * If the session is loading, it displays a loading message.
 * If there is an error (e.g., the user is not authenticated), it redirects to the login page.
 * Otherwise, it renders the child components.
 *
 * @param {React.ReactNode} children - The child components to render if the user is authenticated.
 * @returns {JSX.Element} The rendered child components or a loading message or a redirect.
 */
interface ProtectedRouteProps {
    children: React.ReactNode;
}
// const ProtectedRoute: React.FC<ProtectedRoute> = ({children}) => {}
// function ProtectedRoute({ children }: ProtectedRouteProps) {
//     const { data, isLoading, isError } = useQuery({
//         queryKey: ["session"],
//         queryFn: checkSession,
//         refetchOnWindowFocus: false,
//         retry: 1,
//     });
//     console.log(data);
//     console.log(isError);
//     if (isLoading) return <div>Loading...</div>
//     if ((isError)) return <Navigate to="/login" />;
//     return children;
// }
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    console.log("Protected route got hit");
    const { isLoading, isError } = useAuth();

    if (isLoading) return <div>Loading...</div>
    if ((isError)) return <Navigate to="/login" />;
    return children;
}
export default ProtectedRoute;