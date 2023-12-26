import { Link, useNavigate } from "react-router-dom"
import Footer from "../Components/Footer"
import { useContext, useState } from "react"
import axios from "axios"
import { URL } from "../url.js"
import { UserContext } from "../Context/UserContext"


const Login = () => {
    const [ email, setEmail ] = useState( "" )
    const [ password, setPassword ] = useState( "" )
    const [ error, setError ] = useState( false )
    const { setUser } = useContext( UserContext )
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        try
        {
            const res = await axios.post( URL + "/api/auth/login", { email, password }, { withCredentials: true } )
            // console.log(res.data)
            setUser( res.data );
            navigate( "/" );

        }
        catch ( err )
        {
            setError( true )
            console.log( err )

        }

    }
    return (
        <>
            <div className="bg-blue-700 text-white flex items-center justify-between px-6 md:px-[200px] py-4 rounded-b-2xl shadow-lg">
                <h1 className="text-xl md:text-xl font-extrabold"><Link to="/">Blog Feed</Link></h1>
                <h3><Link to="/register" className="text-lg font-bold">Register</Link></h3>
            </div>
            <div className="w-full flex justify-center items-center h-[80vh] ">
                <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
                    <div className="bg-paleYellow p-8 rounded-2xl border-2 border-black border-solid shadow-lg">
                        <h1 className="text-xl font-bold text-center mb-6">Log in to your account</h1>
                        <form>
                            <input onChange={ ( e ) => setEmail( e.target.value ) } className="w-full px-4 py-2 border-2 mb-3 border-black outline-0" type="text" placeholder="Enter your email"
                                autoComplete="email" />
                            <input onChange={ ( e ) => setPassword( e.target.value ) } className="w-full px-4 py-2 mb-3 border-2 border-black outline-0" type="password" placeholder="Enter your password"
                                autoComplete="current-password" />
                            <button onClick={ handleLogin } className="w-full px-4 py-4 text-lg font-bold text-white bg-blue-700 rounded-lg hover:bg-royalBlue hover:text-white border-2 border-black border-solid">Log in</button>
                        </form>

                        { error && <h3 className="text-red-500 text-sm ">Something went wrong</h3> }
                        <div className="flex justify-center items-center space-x-3 mt-2">
                            <p>New here?</p>
                            <p className="text-blue-900 hover:text-royalBlue"><Link to="/register">Register</Link></p>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default Login
