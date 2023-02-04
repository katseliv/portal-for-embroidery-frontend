import React from "react";
import Preloader from "../common/Preloader";
import CommentItem from "./CommentItem";
import PageNavigation from "../common/PageNavigation";

const textareaStyle = {height: 100};

let CommentList = (props) => {

    let commentsData = props.comments
        .map(comment => <CommentItem id={comment.id} author={comment.userFirstName + " " + comment.userLastName}
                                     text={comment.text} date={comment.creationDatetime} onUpdateComment={props.onUpdateComment}
                                     liked={comment.liked} like={props.like} dislike={props.dislike}/>)

    return (
        <div className="container overflow-hidden">
            <h1 className="h4 mb-4 fw-normal text-center">Comments</h1><br/>
            <div className="container px-5 overflow-hidden">
                <div className="form-floating">
                        <textarea id="floatingTextarea2" className="form-control" placeholder="Leave a comment here"
                                  style={textareaStyle} onChange={props.onCommentChange}
                                  ref={props.newCommentItem} value={props.newCommentText}>
                            </textarea>
                    <label htmlFor="floatingTextarea2">Please, write a comment ...</label>
                    <div className="py-4 d-md-flex justify-content-md-end">
                        <button className="btn btn-success mb-3" onClick={props.onAddComment}>Send</button>
                    </div>
                </div>
            </div>

            {props.isFetching ? <Preloader/> : null}

            {commentsData}

            <PageNavigation totalCount={props.totalCount}
                            pageSize={props.pageSize}
                            currentPage={props.currentPage}
                            onPageChange={props.onPageChange}/>
        </div>
    );
}

export default CommentList;