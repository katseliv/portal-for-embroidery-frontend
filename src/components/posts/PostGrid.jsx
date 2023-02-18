import React from 'react';
import PostItem from "./PostItem";
import Preloader from "../common/Preloader";

const PostGrid = (props) => {
    // const [posts, setPosts] = useState(props.posts);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [isFetching, setIsFetching] = useState(props.isFetching);
    // const [totalCount, setTotalCount] = useState(0);
    //
    // useEffect(() => {
    //     if (isFetching) {
    //         props.getPosts(currentPage);
    //         setCurrentPage(prevState => prevState + 1);
    //         setTotalCount();
    //     }
    // }, [currentPage, isFetching, props])
    //
    // const scrollHandler = (e) => {
    //     if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100
    //         && posts.length < totalCount) {
    //         setIsFetching(true);
    //     }
    // }

    if (props.isFetching) {
        return <Preloader/>;
    }

    let mappedPosts = props.posts.map(post => <PostItem key={post.id} number={post.id}
                                                        image={post.designBase64StringImage}
                                                        title={post.designName} text={post.description}
                                                        onDeletePost={props.onDeletePost} countLikes={post.countLikes}
                                                        liked={post.liked} like={props.like} dislike={props.dislike}/>);

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-4 fw-normal text-center">Designs</h1><br/>
            <div className="container w-100">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {mappedPosts}
                </div>
            </div>
        </div>
    );
}

export default PostGrid;