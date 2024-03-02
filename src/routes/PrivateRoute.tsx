import { Outlet, Navigate} from "react-router-dom";
import { useAuth } from "../providers/authProvider/authProvider" 

const PrivateRoute= () => {
    const {currentUser} = useAuth();

    return currentUser? <Outlet /> : <Navigate to={"/sign-in"} />
}

export default PrivateRoute;

