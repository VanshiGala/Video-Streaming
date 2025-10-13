import React, { useEffect } from "react";
import axios from "axios"
function Home() {

  useEffect(() => {
    axios.get("http://localhost:8000/home")
    .then((res)=>console.log(res))
    .catch(error=>{console.log("Error")})
  },[]);

  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}

export default Home;
