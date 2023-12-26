import axios from "axios"
import Footer from "../Components/Footer"
import HomePosts from "../Components/HomePosts"
import Navbar from "../Components/Navbar"
import { IF, URL } from "../url.js"
import { useContext, useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Loader from '../Components/Loader.jsx'
import { UserContext } from "../Context/UserContext"


const Home = () => {
    const { search } = useLocation()
    // console.log(search)
    const [ posts, setPosts ] = useState( [] )
    const [ noResults, setNoResults ] = useState( false )
    const [ loader, setLoader ] = useState( false )
    const { user } = useContext( UserContext )
    // console.log(user)

    const fetchPosts = async () => {
        setLoader( true )
        try
        {
            const res = await axios.get( URL + "/posts/" + search )
            // console.log(res.data)
            setPosts( res.data )
            if ( res.data.length === 0 )
            {
                setNoResults( true );
            }
            else
            {
                setNoResults( false );
            }
            setLoader( false );
        }
        catch ( err )
        {
            console.log( err )
            setLoader( false );
        }
    }

    useEffect( () => {
        fetchPosts()

    }, [ search ] )

    return (
        <>
            <Navbar />
            <div className="px-8 md:px-[200px] min-h-[80vh]">
                { loader ? (
                    <div className="h-[40vh] flex justify-center items-center"><Loader /></div>
                ) : noResults ? (
                    <h3 className="text-center font-bold mt-16">No posts available</h3>
                ) : (
                    Array.isArray(posts) && posts.length > 0 ? (
                        posts.map((post) => (
                            <Link to={user ? `/posts/post/${post._id}` : "/login"} key={post._id}>
                                <HomePosts post={post} />
                            </Link>
                        ))
                    ) : (
                        <h3 className="text-center font-bold mt-16">No posts available</h3>
                    )
                )}
            </div>
            <Footer />
        </>
    );
};

export default Home;