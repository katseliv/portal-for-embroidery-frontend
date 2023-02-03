import React from 'react';

function DesignItem(props) {
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
                <div className="card-body">
                    <a href="/designs/design" className="card-link">More</a>
                </div>
            </div>
        </div>
    );
}

export default DesignItem;