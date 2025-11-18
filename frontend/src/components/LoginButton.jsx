import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button onClick={() => loginWithRedirect()} className="button login  border-2 p-2 rounded mb-2 ml-2">
      Log In
    </button>
  );
};

export default LoginButton;
