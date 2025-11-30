import { Search, User2Icon } from "lucide-react";
import { useAuth0 } from "@auth0/auth0-react";
import {useNavigate} from "react-router-dom"
function Navbar() {
  const {isAuthenticated, loginWithRedirect, logout}= useAuth0();
  const navigate = useNavigate()

  return (
    <nav className="relative flex items-center h-16 px-4 bg-white shadow-md">
      <h3 className="text-2xl font-bold">StreamIt</h3>

      <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <div className="flex items-center border rounded-full overflow-hidden shadow-md bg-white">
          <button className="p-3 bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
            <Search />
          </button>
          <input
            type="text"
            placeholder="Search videos"
            className="flex-`grow` p-3 outline-none"
          />
        </div>
      </div>

      <div className="ml-auto flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="px-2 py-2 hover:bg-gray-300 text-black rounded cursor-pointer"
            >
              Logout
            </button>
            <User2Icon size={30} />
          <button onClick={()=>navigate("/Upload")}>Upload</button>
          </>
        ) : (
          <>
            <button
              onClick={() => loginWithRedirect()}
              className="px-2 py-2 hover:bg-gray-300 text-black cursor-pointer font-medium border rounded-xl"
            >
              Login
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;






//nav -> HTMl semantic; helps browsers and SEO tools understand that it is for navigation
//left-1/2 -> positions left-edge
//tranform-translate-x-1/2 -> shift div by 50%
//ml-auto -> pushes div to right
//flex -> input sit in a row
//flex-grow -> Makes the input take all remaining horizontal space after the button.


