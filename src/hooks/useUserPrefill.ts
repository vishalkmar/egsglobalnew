import { useEffect, useState } from "react";

type UserData = {
  id?: string;
  email?: string;
  name?: string;
  phone?: string;
};

export default function useUserPrefill() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        const res = await fetch((import.meta.env.VITE_API_URL || "http://localhost:5000/api") + "/auth/user/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        if (!res.ok) {
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data?.user) setUser(data.user);
      } catch (err) {
        // ignore
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading };
}
