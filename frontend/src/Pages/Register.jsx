import { Link, useNavigate } from "react-router-dom"
import Footer from "../Components/Footer"
import { useState } from "react"
import axios from 'axios'
import { URL } from '../url.js'


const Register = () => {
    const [ username, setUsername ] = useState( "" )
    const [ email, setEmail ] = useState( "" )
    const [ password, setPassword ] = useState( "" )
    const [ error, setError ] = useState( false )
    const navigate = useNavigate();

    const handleRegister = async ( e ) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try
        {
            const res = await axios.post( URL + "/auth/register", { username, email, password } );
            setUsername( res.data.username );
            setEmail( res.data.email );
            setPassword( res.data.password );
            setError( false );
            navigate( "/login" );
            setUsername( " " );
            setEmail( " " );
            setPassword( " " );

        }
        catch ( err )
        {
            setError( true );
            console.log( "Registration failed", err );
        }

    }

    return (
        <>

            <div className="bg-blue-700 text-white flex items-center justify-between px-6 md:px-[200px] py-4 rounded-b-2xl shadow-lg">

                <h1 className="text-lg md:text-xl font-extrabold"><Link to="/">Blog Feed</Link></h1>

                <h3><Link to="/login" className="text-lg font-bold">Login</Link></h3>
            </div>

            <div className="w-full flex justify-center items-center h-[80vh] ">
               
                    <div className="flex flex-col justify-center items-center space-y-4 w-[80%] md:w-[25%]">
                    <div className="bg-paleYellow p-8 rounded-2xl border-2 border-black border-solid shadow-lg">
                        <h1 className="text-xl font-bold text-center mb-6">Create an account</h1>
                        <form>
                            <input onChange={ ( e ) => setUsername( e.target.value ) } className="w-full px-4 py-2 mb-3 border-2 border-black outline-0" type="text" placeholder="Enter your username"
                                autoComplete="username" />

                            <input onChange={ ( e ) => setEmail( e.target.value ) } className="w-full px-4 py-2 mb-3 border-2 border-black outline-0" type="text" placeholder="Enter your email"
                                autoComplete="email" />

                            <input onChange={ ( e ) => setPassword( e.target.value ) } className="w-full px-4 py-2 mb-3 border-2 border-black outline-0" type="password" placeholder="Enter your password"
                                autoComplete="current-password" />

                            <button onClick={ handleRegister }
                                type="submit"
                                className="w-full px-4 py-4 text-lg font-bold text-white bg-blue-700 rounded-lg hover:bg-royalBlue hover:text-white border-2 border-black border-solid"
                            >
                                Register
                            </button>

                        </form>

                        { error && <h3 className="text-red-500 text-sm ">Something went wrong</h3> }
                        <div className="flex justify-center items-center space-x-2 mt-2">
                            <p>Already have an account?</p>
                            <p className="text-blue-900 hover:text-royalBlue"><Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>

         

        </>

    )
}

export default Register
