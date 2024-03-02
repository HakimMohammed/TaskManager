import { useAuth } from "../../providers/authProvider/authProvider"

export default function Home() {

    const {currentUser} = useAuth();
    return(
        <h1>Welcome Home! {currentUser?.email   }</h1>
    )
}