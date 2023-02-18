import React from 'react';
import heart from "../../images/heart.svg";
import heartFill from "../../images/heart-fill.svg";
import {NavLink} from "react-router-dom";

const textStyle = {
    // color: '#ffd200',
    color: '#6F0AAA',
};

const PostItem = (props) => {
    return (
        <div className="col">
            <div className="card h-100">
                <img src={`data:image/jpeg;base64,${props.image}`} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.text}</p>
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-8">
                            <NavLink to={`/designs/${props.number}`} className="card-link link-success">More</NavLink>
                            <a className="card-link link-danger" href="javascript: undefined;" onClick={() => {
                                props.onDeletePost(props.number);
                            }}>Delete</a>
                        </div>
                        <div className="col-4 text-end">
                            {/*disabled={props.isLikingInProgress.some(c => id === c.id)}*/}
                            {props.liked
                                ? <img src={heartFill} onClick={() => {
                                    props.dislike(props.number)
                                }} alt={"Unlike"}/>
                                : <img src={heart} onClick={() => {
                                    props.like(props.number)
                                }} alt={"Like"}/>}
                            <span className="px-2" style={textStyle}>{props.countLikes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostItem;