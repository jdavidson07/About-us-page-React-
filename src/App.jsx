import Navbar from "./Navbar";
import AboutUs from "./Aboutus";
import ChatSystem from "./ChatSystem";
import ScrollButton from "./Scrollbutton";
import Footer from "./Footer";
import { SearchProvider } from "./SearchContext";

export default function App() {
  return (
    <SearchProvider>
      <Navbar />
      <AboutUs />
      <Footer />
      <ChatSystem />
      <ScrollButton />
    </SearchProvider>
  );
}
