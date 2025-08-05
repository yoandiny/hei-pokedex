import PokeList from '../component/PokeList'
import {useState} from "react";
import Navbar from "../component/Navbar.jsx";

const Homepage = () => {
    const [searchTerm, setSearchTerm] = useState("")
  return (
    <div>
      <Navbar onSearch={setSearchTerm}/>
      <PokeList searchTerm={searchTerm}/>
    </div>
  )
}

export default Homepage
