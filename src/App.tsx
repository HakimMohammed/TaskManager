import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import { AuthProvider } from "./providers/authProvider/authProvider";

function App(): JSX.Element {
  return (
    <AuthProvider>
      <Login />
    </AuthProvider>
    // <Register />
  );
}

export default App;
