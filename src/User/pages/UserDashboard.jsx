

import { useEffect } from "react";
export default function UserDashboard() {

  
useEffect(() => {
  const check = async () => {
    const res = await fetch("http://localhost:5000/api/secureuser/user/me", {
      credentials: "include",
    });

    if (!res.ok) {
      window.location.replace("/user/login");
      return;
    }
  };

  check();
}, []);


  return <div className="text-slate-700">User (dummy)</div>;
}
