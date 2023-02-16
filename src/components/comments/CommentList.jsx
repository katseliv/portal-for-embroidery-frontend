import React from "react";
import Preloader from "../common/Preloader";
import PageNavigation from "../common/PageNavigation";
import CommentItem from "./CommentItem";
import {Field, reduxForm, reset} from "redux-form";
import {TextArea} from "../common/form-control/FormControl";
import {maxLengthCreator, requiredField} from "../../utils/validators/validators";

let CommentList = (props) => {
    let commentsData = props.comments
        .map(comment => <CommentItem key={comment.id} id={comment.id}
                                     author={comment.userFirstName + " " + comment.userLastName}
                                     text={comment.text} date={comment.creationDatetime}
                                     onUpdateComment={props.onUpdateComment}
                                     onDeleteComment={props.onDeleteComment}/>);

    return (
        <div className="container overflow-hidden">
            <h1 className="h4 mb-4 fw-normal text-center">Comments</h1><br/>
            {props.isAuthenticated ?
                <div className="container px-5 overflow-hidden">
                    <div className="form-floating">
                        <CommentReduxForm onSubmit={props.onAddComment}/>
                    </div>
                </div> : null}
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
    const maxLength100 = maxLengthCreator(100);
    return (
        <form onSubmit={props.handleSubmit}>
            <Field component={TextArea} name={"text"} validate={[requiredField, maxLength100]}
                   placeholder="Please, write a comment ..."/>
            <div className="py-4 d-md-flex justify-content-md-end">
                <button className="btn btn-success mb-3">Send</button>
            </div>
        </form>
    );
}

const resetForm = (result, dispatch) => dispatch(reset("commentForm"));

const CommentReduxForm = reduxForm({
    form: "commentForm",
    onSubmitSuccess: resetForm,
})(CommentForm);

export default CommentList;