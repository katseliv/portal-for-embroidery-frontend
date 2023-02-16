import React from 'react';
import heart from "../../images/heart.svg";
import heartFill from "../../images/heart-fill.svg";
import {NavLink} from "react-router-dom";

function PostItem(props) {
    return (
        <div className="col">
            <div className="card h-100">
                <img src={props.image} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.text}</p>
                </div>
                {/*<ul className="list-group list-group-flush">*/}
                {/*    <li className="list-group-item">An item</li>*/}
                {/*</ul>*/}
                <div className="card-body text-end">
                    <NavLink to={`/designs/${props.number}`} className="card-link link-success px-3">More</NavLink>
                    {/*<a href="/designs/design" className="card-link px-3">More</a>*/}
                    {/*disabled={props.isLikingInProgress.some(c => id === c.id)}*/}
                    {props.liked
                        ? <img src={heartFill} onClick={() => {props.dislike(props.id)}} alt={"Unlike"}/>
                        : <img src={heart} onClick={() => {props.like(props.id)}} alt={"Like"}/>}
                </div>
            </div>
        </div>
    );
}

export default PostItem;