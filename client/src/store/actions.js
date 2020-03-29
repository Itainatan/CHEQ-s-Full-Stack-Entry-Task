import axios from "axios";
import { SET_EDIT, SET_CREATE, SET_VAST, SET_MESSAGE, SET_XML, ERROR, SET_LIST } from "./types";

export const fetchList = () => async dispatch => {
    try {
        const res = await axios.get(
            "/api/vasts/fetch_vasts"
        );
        dispatch({
            type: SET_LIST,
            payload: res.data.list
        });
    }
    catch (err) {
        dispatch({
            type: ERROR,
            payload: err
        });
    }
};

export const setEdit = (bool, vast) => dispatch => {
    dispatch({
        type: SET_EDIT,
        payload: bool
    });
    dispatch({
        type: SET_CREATE,
        payload: false
    });
    dispatch({
        type: SET_VAST,
        payload: vast
    });
    dispatch({
        type: SET_MESSAGE,
        payload: ''
    });
};

export const setCreate = (bool) => dispatch => {
    dispatch({
        type: SET_CREATE,
        payload: bool
    });
    dispatch({
        type: SET_EDIT,
        payload: false
    });
    dispatch({
        type: SET_VAST,
        payload: null
    });
    dispatch({
        type: SET_MESSAGE,
        payload: ''
    });
};

export const createVast = (vast) => async dispatch => {
    try {
        const res = await axios.post(
            "/api/vasts/create_vast", { vast }
        );
        dispatch({
            type: SET_LIST,
            payload: res.data.list
        });
        dispatch({
            type: SET_CREATE,
            payload: false
        });
        dispatch({
            type: SET_MESSAGE,
            payload: 'vast created successfully'
        });
        setTimeout(() =>
            dispatch({
                type: SET_MESSAGE,
                payload: ''
            }),
            3000);
    }
    catch (err) {
        dispatch({
            type: ERROR,
            payload: err
        });
    }
};

export const editVast = (vast) => async dispatch => {
    try {
        const res = await axios.post(
            "/api/vasts/edit_vast", { vast }
        );
        dispatch({
            type: SET_LIST,
            payload: res.data.list
        });
        dispatch({
            type: SET_EDIT,
            payload: false
        });
        dispatch({
            type: SET_MESSAGE,
            payload: 'vast edited successfully'
        });
        setTimeout(() =>
            dispatch({
                type: SET_MESSAGE,
                payload: ''
            }),
            3000);
    }
    catch (err) {
        dispatch({
            type: ERROR,
            payload: err
        });
    }
};

export const getXml = (id) => async dispatch => {
    try {
        const res = await axios.get(
            `/api/vasts/vast/id=${id}`
        );
        console.log(res.data.xmlResponse)
        dispatch({
            type: SET_XML,
            payload: res.data.xmlResponse
        });
    }
    catch (err) {
        dispatch({
            type: ERROR,
            payload: err
        });
    }
};