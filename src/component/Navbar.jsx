import { Outlet, Link } from "react-router-dom";
import pokedex_logo from "../assets/images/pokedex-removebg-preview.png";
import {useState} from "react";

export default function Navbar({onSearch}) {
    const [inputValue, setInputValue] = useState("");
    const handleSubmit =(e)=>{
        e.preventDefault()
        onSearch(inputValue.trim().toLowerCase())
    }
  return (
    <>
        
      <div className="flex flex-col justify-center  items-center bg-white py-2">
         <Link to="/"><img src={pokedex_logo} alt="Logo Pokémon" className="w-50 py-3"/></Link>
        <form onSubmit={handleSubmit} className="flex md:w-3xl lg:w-6xl items-center border-2 rounded-md overflow-hidden">
          <input
              type="search"
              className="px-4 py-2 w-full focus:outline-none"
              placeholder="Search name, type, number "
              onChange={(e)=>setInputValue(e.target.value)}
          />
          <button type="submit" className="w-20 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4">
            <i className="scale-130 fa fa-search"></i>
          </button>
        </form>
      </div>
  
      <main>
        <Outlet />
      </main>
    
    </>
  );
}