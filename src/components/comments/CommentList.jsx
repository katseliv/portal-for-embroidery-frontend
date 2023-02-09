import React from "react";
import Preloader from "../common/Preloader";
import CommentItem from "./CommentItem";
import PageNavigation from "../common/PageNavigation";
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../common/form-control/FormControl";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";

let CommentList = (props) => {
    let commentsData = props.comments
        .map(comment => <CommentItem key={comment.id} id={comment.id} author={comment.userFirstName + " " + comment.userLastName}
                                     text={comment.text} date={comment.creationDatetime}
                                     onUpdateComment={props.onUpdateComment}
                                     liked={comment.liked} like={props.like} dislike={props.dislike}/>);

    return (
        <div className="container overflow-hidden">
            <h1 className="h4 mb-4 fw-normal text-center">Comments</h1><br/>
            <div className="container px-5 overflow-hidden">
                <div className="form-floating">
                    <CommentReduxForm onSubmit={props.onAddComment}/>
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

const CommentForm = (props) => {
    const maxLength10 = maxLengthCreator(10);
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={TextArea} name={"newCommentText"} validate={[requiredField, maxLength10]}
                   placeholder="Please, write a comment ..."/>
            <div className="py-4 d-md-flex justify-content-md-end">
                <button className="btn btn-success mb-3">Send</button>
            </div>
        </form>
    );
}

const CommentReduxForm = reduxForm({
    form: "commentForm"
})(CommentForm);

export default CommentList;