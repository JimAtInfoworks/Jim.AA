import { Outlet } from "react-router-dom";
import { Header } from "../ui/components/layout/header";
import { Footer } from "../ui/components/layout/footer";

export default function Root() {
  return (
    <div id="home" className="landing-wrapper overflow-hidden">
      <Header />
      <div className="layout-wrapper">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}