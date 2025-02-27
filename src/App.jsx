import { Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar";
import Testimonial from "./components/Testimonial";
import SpendWiseHero from "./components/SpendWiseHero";
import SpendWiseNewsletter from "./components/SpendWiseNewsletter";
import ConnectWithUs from "./components/ConnectWithUs";
import MapDisplay from "./components/MapDisplay";

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>

      <main className="container mx-auto p-6">
        <Outlet />
        <Testimonial />
        <SpendWiseHero />
        <SpendWiseNewsletter />
        <ConnectWithUs />
        <MapDisplay />
      </main>
    </>
  );
}

export default App;
