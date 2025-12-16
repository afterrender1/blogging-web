"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "@/redux/store";
import { useEffect } from "react";
import { checkUser } from "@/redux/features/auth/authSlice";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <FetchUser>{children}</FetchUser>
    </Provider>
  );
}

function FetchUser({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("https://blogging-web-production.up.railway.app/api/auth/me", {
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          dispatch(checkUser(data.user || null));
        } else {
          dispatch(checkUser(null));
        }
      } catch {
        dispatch(checkUser(null));
      }
    };
    fetchUser();
  }, [dispatch]);

  return children;
}
