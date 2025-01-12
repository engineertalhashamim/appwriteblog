import React, { useState, useEffect } from "react"
import appwriteService from "../appwrite/config"
import { Container, PostCard } from "../components"
import authService from "../appwrite/auth";

const Home = () => {
    const [posts, setPosts] = useState([]);
    useEffect(()=>{
        appwriteService.getPost().then((posts)=>{
            if(posts){
              setPosts(posts.documents)
            }
        })
    }, [])


const [user1, setuser1] = useState([]);
useEffect(()=>{
    const checkUSer = async ()=>{
        try {
            const currentUser = await authService.getCurrentUser();
            if(currentUser) {
                setuser1(currentUser.name || currentUser.email)
            }
        } catch(error) {
            console.error("Error checking user existence:", error);
        }
    };
    checkUSer();
},[])


    if (user1==true) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                   <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            {/* <h1 className="text-2xl font-bold hover:text-gray-500">Login to read posts</h1> */}
                        </div>
                   </div>
            
                    <p>User Existsss: <strong>{user1}</strong></p>
            
                </Container>
            </div>
        )
    } else {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                   <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            {/* <h1 className="text-2xl font-bold hover:text-gray-500">Login to read posts</h1> */}
                        </div>
                   </div>
                    <p><strong>Please Login to read or create post</strong></p>
                    <div className="flex flex-wrap">
                            {posts.map((post)=> (
                                    <div className="p-2 w-1/4" key={post.$id}>
                                        <PostCard {...post}/>
                                    </div>
                                ))}
                   </div> 
                </Container>
            </div>
        )
    }

    // return (
    //     <div className="w-full py-8">
    //         <Container>
    //            <div className="flex flex-wrap">
    //                 {posts.map((post)=> (
    //                         <div className="p-2 w-1/4" key={post.$id}>
    //                             <PostCard {...post}/>
    //                         </div>
    //                     ))}
    //            </div> 
    //         </Container>
    //     </div>
    // )



}

export default Home
