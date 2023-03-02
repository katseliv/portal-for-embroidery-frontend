import React from "react";
import Preloader from "../common/Preloader";
import PageNavigation from "../common/PageNavigation";
import CommentItem from "./CommentItem";
import {Field, reduxForm} from "redux-form";
import {TextArea} from "../common/form-control/FormControl";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";

const CommentList = (props) => {
    let commentsData = props.comments
        .map(comment => <CommentItem key={comment.id} number={comment.id}
                                     author={comment.userFirstName + " " + comment.userLastName}
                                     text={comment.text} date={comment.creationDatetime}
                                     isAuthenticated={props.isAuthenticated}
                                     onUpdateComment={props.onUpdateComment}
                                     onDeleteComment={props.onDeleteComment}/>);

    if (props.isFetching) {
        return <Preloader/>;
    }

    return (
        <div className="container overflow-hidden">
            <h1 className="h4 mb-4 fw-normal text-center">Comments</h1><br/>
            {props.isAuthenticated ?
                <div className="container px-5 overflow-hidden">
                    <div className="form-floating">
                        <CommentReduxForm onSubmit={props.onAddComment}/>
                    </div>
                </div> : null}
            {commentsData}
            <PageNavigation totalCount={props.totalCount}
                            pageSize={props.pageSize}
                            currentPage={props.currentPage}
                            onPageChange={props.onPageChange}/>
        </div>
    );
}

const CommentForm = (props) => {
    const maxLength500 = maxLengthCreator(500);
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={TextArea} name={"text"} validate={[requiredField, maxLength500]}
                   placeholder="Please, write a comment ..."/>
            <div className="py-4 d-md-flex justify-content-md-end">
                <button className="btn btn-success mb-3">Send</button>
            </div>
        </form>
    );
}

const CommentReduxForm = reduxForm({
    form: "commentForm",
})(CommentForm);

export default CommentList;