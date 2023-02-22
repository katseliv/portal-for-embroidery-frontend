import React from "react";
import "./PageNavigation.css";

const aStyle = {color: "#530FAD"};
const buttonLimit = 5;

let PageNavigation = (props) => {
    let getStartPageNumber = (totalPages, pageNumber) => {
        if (totalPages <= buttonLimit) {
            return 1;
        } else if (pageNumber > totalPages - Math.ceil(buttonLimit / 2)) {
            return totalPages - buttonLimit + 1;
        } else {
            return Math.max(pageNumber - Math.floor(buttonLimit / 2), 1);
        }
    }

    let totalPages = Math.ceil(props.totalCount / props.pageSize);
    let startPageNumber = getStartPageNumber(totalPages, props.currentPage);
    let endPageNumber = Math.max(Math.min(props.currentPage + Math.floor(buttonLimit / 2), totalPages), buttonLimit);

    let pages = [];
    for (let i = startPageNumber; i <= endPageNumber; i++) {
        pages.push(i);
    }

    return (
        <nav className="pagination justify-content-center px-5 py-3 w-100">
            <ul className="pagination">
                <li className="page-item" key={0} onClick={() => {props.onPageChange(1);}}>
                    <span className="page-link" style={aStyle} aria-hidden="true">&laquo;</span>
                </li>
                {pages.map(page => {
                    return <li className={props.currentPage === page ? "page-item active" : "page-item"}
                               key={page} onClick={() => {props.onPageChange(page);}}>
                        <span className="page-link">{page}</span>
                    </li>;
                })}
                <li className="page-item" key={totalPages} onClick={() => {props.onPageChange(totalPages);}}>
                    <span className="page-link" style={aStyle} aria-hidden="true">&raquo;</span>
                </li>
            </ul>
        </nav>
    )
}

export default PageNavigation;