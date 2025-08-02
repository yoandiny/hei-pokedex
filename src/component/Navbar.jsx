import { Outlet } from "react-router-dom";
import pokedex_logo from "../assets/images/pokedex-removebg-preview.png";

export default function Navbar() {
  return (
    <>
    <nav className="flex justify-center items-center bg-white py-2">
      <div className="flex items-center space-x-4">
        <img src={pokedex_logo} alt="Logo Pokémon" className="w-50 py-3"/>
      </div>
    </nav>

    <main>
      <Outlet />
    </main>
    
    </>
  );
}