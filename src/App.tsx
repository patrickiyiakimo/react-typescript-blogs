import Blogs from "./components/Blogs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  const navProps = {
    first: "Home",
    second: "Blogs",
    third: "Contact",
  };
  return (
    <div className="App">
      <div>
        <Navbar lists={navProps} />
      </div>
      <div>
        <Hero name="Blogs!" />
      </div>
      <div>
        <Blogs />
      </div>
      <div>
        <Contact />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
