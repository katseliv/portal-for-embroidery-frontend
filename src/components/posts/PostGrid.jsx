import React, {useState} from 'react';
import PostItem from "./PostItem";
import Preloader from "../common/Preloader";
import PostProfileCreate from "./PostProfileCreate";
import Searcher from "../common/Searcher";

const gridStyle = {
    overflowAnchor: "none"
};

const PostGrid = (props) => {
    const [createMode, setCreateMode] = useState(false);

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

    const onLoadPosts = () => {
        props.getPostsByNumberAndSize(props.currentPage + 1);
        const element = document.getElementById("footer");
        element.scrollIntoView({behavior: "smooth", block: "end"});
    }

    const onGetPosts = () => {
        props.getPosts();
    }

    const onGetPostsByTag = (tag) => {
        props.getPostsByTag(tag.request);
    }

    const mappedPosts = props.posts.map(post => <PostItem key={post.id} number={post.id}
                                                          image={post.designBase64StringImage}
                                                          title={post.designName}
                                                          text={post.description} onDeletePost={props.onDeletePost}
                                                          countLikes={post.countLikes}
                                                          isAuthenticated={props.isAuthenticated}
                                                          liked={post.liked} like={props.like}
                                                          dislike={props.dislike}/>);

    return (
        <div>
            {createMode
                ? <PostProfileCreate designers={props.designers} designs={props.designs}
                                     authorizedUserId={props.authorizedUserId}
                                     authorizedUserRole={props.authorizedUserRole}
                                     isFetching={props.isFetching} onAddPost={onAddPost}/>
                : <div className="container p-5 overflow-hidden">
                    <h1 className="h4 fw-normal text-center">Designs</h1>
                    <div className="container py-5">
                        <div className="row row-cols-2 row-cols-md-2 g-4">
                            <div className="col">
                                <button className="btn btn-outline-secondary w-25 me-2" onClick={onGetPosts}>
                                    Back
                                </button>
                                {props.isAuthenticated && (props.authorizedUserRole === "ADMIN" || props.authorizedUserRole === "DESIGNER") &&
                                    <button className="btn btn-outline-success w-25 me-2" onClick={activateCreateMode}>
                                        New Post
                                    </button>}
                            </div>
                            <div className="col">
                                <Searcher onSubmit={onGetPostsByTag} placeholder={"Search by Tag"}/>
                            </div>
                        </div>
                    </div>
                    <div className="container w-100" style={gridStyle}>
                        <div className="row row-cols-1 row-cols-md-4 g-4">
                            {mappedPosts}
                        </div>
                    </div>
                    {!props.isEndOfPost &&
                        <div className="px-2 py-5 text-center">
                            <button className="btn btn-lg btn-outline-secondary w-25 mx-1" onClick={onLoadPosts}>
                                Load More
                            </button>
                        </div>}
                </div>}
        </div>
    );
}

export default PostGrid;