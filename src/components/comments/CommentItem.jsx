import heartFill from "../../images/heart-fill.svg";
import heart from "../../images/heart.svg";

const iStyle = {
    color: "#530FAD"
};

const borderStyle = {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#00000019",
    borderRadius: "0.25rem"
}

function CommentItem(props) {
    return (
        <div aria-live="polite" aria-atomic="true"
             className="container justify-content-center align-items-center px-5 py-3 w-100">
            <div className="comment" style={borderStyle} role="alert" aria-live="assertive" aria-atomic="true">
                <div className="toast-header">
                    <i className="rounded me-2 bi-person-fill align-content-center" style={iStyle}></i>
                    <strong className="me-auto">{props.author}</strong>
                    <small>{props.date}</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Закрыть">
                    </button>
                </div>
                <div className="toast-body">
                    {props.text}
                    <div className="text-end">

                        {props.liked
                            ? <img src={heartFill} onClick={() => {props.dislike(props.id)}} alt={"Unlike"}/>
                            : <img src={heart} onClick={() => {props.like(props.id)}} alt={"Like"}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentItem;