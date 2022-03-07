import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Cart } from "./components/Cart";
import { Wishlist } from "./components/Wishlist";
import { HomePage } from "./components/HomePage";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;
