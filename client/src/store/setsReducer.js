import { SET_CREATE, SET_EDIT, SET_MESSAGE, ERROR } from "./types";

const initialState = {
    error: '',
    message: '',
    create: false,
    edit: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ERROR:
            return {
                ...state,
                error: action.payload
            };
        case SET_EDIT:
            return {
                ...state,
                edit: action.payload
            };
        case SET_CREATE:
            return {
                ...state,
                create: action.payload
            };
        case SET_MESSAGE:
            return {
                ...state,
                message: action.payload
            };
        default:
            return state;
    }
};
