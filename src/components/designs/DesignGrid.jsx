import React from 'react';
import DesignItem from "./DesignItem";

function DesignGrid(props) {
    let designItemsData = props.designItems.map(designItem => <DesignItem image={designItem.image}
                                                                          title={designItem.title}
                                                                          text={designItem.text}/>)

    return (
        <div className="container p-5 overflow-hidden">
            <h1 className="h4 mb-4 fw-normal text-center">Designs</h1><br/>
            <div className="container w-100">
                <div className="row row-cols-1 row-cols-md-4 g-4">
                    {designItemsData}
                </div>
            </div>
        </div>
    );
}

export default DesignGrid;