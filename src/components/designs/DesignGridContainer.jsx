import {connect} from "react-redux";
import DesignGrid from "./DesignGrid";

let mapStateToProps = (state) => {
    return {
        designItems: state.designPage.designs
    }
}

const DesignGridContainer = connect(mapStateToProps)(DesignGrid);

export default DesignGridContainer;