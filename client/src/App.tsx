import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
import { useAuthStore } from "@/store/authStore";

const App = () => {
  const fetchUser = useAuthStore((state) => state.fetchUser);

  useEffect(() => {
    // automatically attempt to get user info from cookie when app loads
    fetchUser();
  }, [fetchUser]);

  return (
    <>
      <Toaster richColors position="top-right" />
      <Outlet />
    </>
  );
};

export default App;
