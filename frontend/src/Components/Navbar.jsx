import { Link, useLocation, useNavigate } from "react-router-dom"
import { BsSearch } from 'react-icons/bs'
import { FaBars } from 'react-icons/fa'
import { useContext, useState } from "react"
import Menu from "./Menu"
import { UserContext } from "../Context/UserContext.jsx"


const Navbar = () => {

    const [ prompt, setPrompt ] = useState( "" )
    const [ menu, setMenu ] = useState( false )
    const navigate = useNavigate()
    const path = useLocation().pathname

    const showMenu = () => {
        setMenu( !menu )
    }

    const { user } = useContext( UserContext )
    // console.log(user)

    return (
        <div className="bg-blue-700 text-white flex items-center justify-between px-6 md:px-[200px] py-4 rounded-b-2xl shadow-lg">
            <h1 className="text-xl md:text-xl font-extrabold"><Link to="/" className=" inline-block pb-1">Blog Feed</Link></h1>
            { path === "/" && <div className="flex justify-center items-center space-x-3">

                <p onClick={ () => navigate( prompt ? "?search=" + prompt : navigate( "/" ) ) } className="cursor-pointer"><BsSearch /></p>

                <input onChange={ ( e ) => setPrompt( e.target.value ) } className="outline px-9 rounded-full border-2" placeholder="Search a post" type="text" />

            </div> }
            <div className=" hidden md:flex items-center justify-center space-x-2 md:space-x-4">
                { user ? <h3><Link to="/write" className="text-lg font-bold ">Write</Link></h3> : <h3><Link to="/login" className="text-lg font-bold ">Login</Link></h3> }
                { user ? <div onClick={ showMenu }>
                    <p className="cursor-pointer relative"><FaBars /></p>
                    { menu && <Menu /> }
                </div> : <h3><Link to="/register" className="text-lg font-bold">Register</Link></h3> }
            </div>
            <div onClick={ showMenu } className="md:hidden text-lg">
                <p className="cursor-pointer relative"><FaBars /></p>
                { menu && <Menu /> }
            </div>

        </div>
    )
}

export default Navbar
