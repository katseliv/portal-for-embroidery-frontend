import plants from '../images/plants.png';
import liquid from '../images/liquid.png';
import liquid2 from '../images/liquid2.png';
import abstract from '../images/abstract.png';
import abstract2 from '../images/abstract2.png';

let initialState = {
    designs: [
        {id: 1, image: plants,},
        {id: 2, image: liquid,},
        {id: 3, image: abstract},
        {id: 4, image: abstract2},
        {id: 5, image: liquid2},
    ]
}

export const designReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}