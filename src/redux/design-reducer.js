import plants from '../images/plants.png';
import liquid from '../images/liquid.png';
import liquid2 from '../images/liquid2.png';
import abstract from '../images/abstract.png';
import abstract2 from '../images/abstract2.png';

let initialState = {
    designs: [
        {
            id: 1,
            image: plants,
            title: 'Plants',
            text: 'This is a longer card with supporting text below as a natural\n' +
                'lead-in to additional content. This content is a little bit longer.'
        },
        {
            id: 2,
            image: liquid,
            title: 'Liquid',
            text: 'This is a longer card with supporting text below as a natural\n' +
                'lead-in to additional content. This content is a little bit longer.'
        },
        {
            id: 3,
            image: abstract,
            title: 'Abstract',
            text: 'This is a longer card with supporting text below as a natural\n' +
                'lead-in to additional content. This content is a little bit longer.'
        },
        {
            id: 4,
            image: abstract2,
            title: 'Abstract',
            text: 'This is a longer card with supporting text below as a natural\n' +
                'lead-in to additional content. This content is a little bit longer.'
        },
        {
            id: 5,
            image: liquid2,
            title: 'Liquid',
            text: 'This is a longer card with supporting text below as a natural\n' +
                'lead-in to additional content. This content is a little bit longer.'
        },

    ]
}

export const designReducer = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state;
    }
}