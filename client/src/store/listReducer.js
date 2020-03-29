import { SET_LIST, SET_VAST, SET_XML } from "./types";

const initialState = {
    list: null,
    vast: {},
    xml: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_LIST:
            return {
                ...state,
                list: action.payload,
            };
        case SET_VAST:
            return {
                ...state,
                vast: action.payload
            };
        case SET_XML:
            return {
                ...state,
                xml: action.payload,
            };
        default:
            return state;
    }
};
