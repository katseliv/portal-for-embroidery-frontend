import React, {useEffect, useState} from 'react';
import PostItem from "./PostItem";

function PostGrid(props) {
    let [posts, setPosts] = useState([]);

    useEffect(() => {

    }, [])

    posts = props.posts.map(post => <PostItem number={post.id} image={post.image} title={post.title}
                                                  text={post.text} liked={post.liked}
                                                  like={props.like} dislike={props.dislike}/>)

    const scrollHandler = (e) => {

    }

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-4 fw-normal text-center">Designs</h1><br/>
            <div className="container w-100">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {posts}
                </div>
            </div>
        </div>
    );
}

export default PostGrid;