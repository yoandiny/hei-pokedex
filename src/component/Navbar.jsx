import { Outlet, Link } from "react-router-dom";
import pokedex_logo from "../assets/images/pokedex-removebg-preview.png";

export default function Navbar() {
  return (
    <>
    <nav className="flex justify-center items-center bg-white py-2">
      <div className="flex items-center space-x-4">
       <Link to="/"><img src={pokedex_logo} alt="Logo Pokémon" className="w-50 py-3"/></Link>
      </div>
    </nav>

    <main>
      <Outlet />
    </main>
    
    </>
  );
}