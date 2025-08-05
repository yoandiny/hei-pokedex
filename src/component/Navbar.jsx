import { Outlet, Link } from "react-router-dom";
import pokedex_logo from "../assets/images/pokedex-removebg-preview.png";

export default function Navbar() {
  return (
    <>
        
      <div className="flex flex-col justify-center  items-center bg-white py-2">
         <Link to="/"><img src={pokedex_logo} alt="Logo Pokémon" className="w-50 py-3"/></Link>
        <div className="flex md:w-3xl lg:w-6xl items-center border-2 rounded-md overflow-hidden">
          <input
              type="search"
              className="px-4 py-2 w-full focus:outline-none"
              placeholder="Search name, type, number "
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
  
      <main>
        <Outlet />
      </main>
    
    </>
  );
}