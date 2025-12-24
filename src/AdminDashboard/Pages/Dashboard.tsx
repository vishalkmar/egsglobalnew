


import { useEffect } from "react";

export default function Dashboar (){

  useEffect(() => {
  const check = async () => {
    const res = await fetch("http://localhost:5000/api/secureadmin/admin/me", {
      credentials: "include",
    });

    if (!res.ok) {
      window.location.replace("/admin/login");
      return;
    }
  };

  check();
}, []);


    return (<>
          <h1>Admin Dashboard </h1>
    </>)
}