import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Footer from "../sections/Footer";
import logo from "../assets/logo.png"; // adjust path to your logo

export default function PoliciesLayout() {
  return (
    <div className="min-h-screen bg-[#080808]">
      <Navbar logo={logo} />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer logo={logo} />
    </div>
  );
}