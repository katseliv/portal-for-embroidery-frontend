import React, {useState} from 'react';
import PostItem from "./PostItem";
import Preloader from "../common/Preloader";
import PostProfileCreate from "./PostProfileCreate";
import Searcher from "../common/Searcher";

const PostGrid = (props) => {
    const [createMode, setCreateMode] = useState(false);
    // const [currentPage, setCurrentPage] = useState(1);

    // const [posts, setPosts] = useState(props.posts);
    // const [isFetching, setIsFetching] = useState(props.isFetching);
    // const [totalCount, setTotalCount] = useState(0);
    //

    // useEffect(() => {
    //     if (isFetching) {
    //         props.getPostsByNumber(currentPage);
    //         setCurrentPage(prevState => prevState + 1);
    //         setTotalCount();
    //     }
    // }, [isFetching])


    // useEffect(() => {
    //     document.addEventListener("scroll", scrollHandler);
    //     return () => {
    //         document.removeEventListener("scroll", scrollHandler);
    //     };
    // }, [])

    if (props.isFetching) {
        return <Preloader/>;
    }

    const activateCreateMode = () => {
        setCreateMode(true);
        props.getDesigners();
        props.getDesigns();
    };

    const onAddPost = (post) => {
        props.onAddPost(post);
        setCreateMode(false);
    }

    const onGetPosts = () => {
        props.getPosts();
    }

    const onGetPostsByTag = (tag) => {
        props.getPostsByTag(tag.request);
    }

    // const scrollHandler = (event) => {
    //     if (event.target.documentElement.scrollHeight - (event.target.documentElement.scrollTop + window.innerHeight) < 100
    //         && props.totalCount !== 0
    //     ) {
    //         console.log("scroll");
    //         props.getPostsByNumber(currentPage);
    //         setCurrentPage(currentPage + 1);
    //     }
    // }

    // const onScrollList = (event) => {
    //     const scrollBottom = event.target.scrollTop + event.target.offsetHeight === event.target.scrollHeight;
    //     if (scrollBottom) {
    //         props.getPostsByNumber(currentPage);
    //         setCurrentPage(currentPage + 1);
    //         // const total = 100;
    //         // const data = []; // lenght == 40
    //         //
    //         // if(data.lenght < total) {
    //         //     apiMethod({ start: data.lenght, count: 20 });
    //         // }
    //     }
    // };


    let mappedPosts = props.posts.map(post => <PostItem key={post.id} number={post.id}
                                                        image={post.designBase64StringImage} title={post.designName}
                                                        text={post.description} onDeletePost={props.onDeletePost}
                                                        countLikes={post.countLikes}
                                                        isAuthenticated={props.isAuthenticated}
                                                        liked={post.liked} like={props.like} dislike={props.dislike}/>);

    return (
        <div>
            {createMode
                ? <PostProfileCreate designers={props.designers} designs={props.designs}
                                     isFetching={props.isFetching} onAddPost={onAddPost}/>
                : <div className="container p-5 overflow-hidden">
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