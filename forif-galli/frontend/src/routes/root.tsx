import Navbar from "@/components/navigation-bar";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <Navbar />
      <div className="w-full">
        <Outlet />
      </div>
    </>
  );
}
