import React, {useState} from 'react';
import PostItem from "./PostItem";
import Preloader from "../common/Preloader";
import PostProfileCreate from "./PostProfileCreate";
import Searcher from "../common/Searcher";

const PostGrid = (props) => {
    const [createMode, setCreateMode] = useState(false);
    // const [posts, setPosts] = useState(props.posts);
    // const [currentPage, setCurrentPage] = useState(1);
    // const [isFetching, setIsFetching] = useState(props.isFetching);
    // const [totalCount, setTotalCount] = useState(0);
    //
    // useEffect(() => {
    //     if (isFetching) {
    //         props.getPostsByNumber(currentPage);
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

    const activateCreateMode = () => {
        setCreateMode(true);
    };

    const onAddPost = (post) => {
        post = {designerId: 3, designId: 5, ...post}
        props.onAddPost(post);
        setCreateMode(false);
    }

    const onGetPosts = () => {
        props.getPosts();
    }

    const onGetPostsByTag = (tag) => {
        props.getPostsByTag(tag.request);
    }

    let mappedPosts = props.posts.map(post => <PostItem key={post.id} number={post.id}
                                                        image={post.designBase64StringImage} title={post.designName}
                                                        text={post.description} onDeletePost={props.onDeletePost}
                                                        countLikes={post.countLikes} isAuthenticated={props.isAuthenticated}
                                                        liked={post.liked} like={props.like} dislike={props.dislike}/>);

    return (
        <div>
            {createMode ? <PostProfileCreate onAddPost={onAddPost}/> :
                <div className="container p-5 overflow-hidden">
                    <h1 className="h4 fw-normal text-center">Designs</h1>
                    <Searcher onSubmit={onGetPostsByTag} placeholder={"Search by Tag"}/>
                    <div className="container w-100">
                        <div className="row row-cols-1 row-cols-md-4 g-4">
                            {mappedPosts}
                        </div>
                    </div>
                    <div className="px-2 py-5">
                        <button className="btn btn-lg btn-outline-secondary w-25 mx-1" onClick={onGetPosts}>
                            Back
                        </button>
                        <button className="btn btn-lg btn-outline-success w-25 mx-1" onClick={activateCreateMode}>
                            Create New Post
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default PostGrid;