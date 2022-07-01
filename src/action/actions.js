import { DECREMENT, INCREMENT, FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_ERROR } from "./types";
import axios from "axios";

export const increaseCounter = () => {
    return {
        type: INCREMENT,
    };
};

export const decreaseCounter = () => {
    return {
        type: DECREMENT,
    };
};

// start doing finish
export const fetchAllUsers = () => {
    return async (dispatch, getState) => {
        dispatch(fetchUserRequest());
        try {
            const res = await axios.get("https://62ad1db69fa81d00a7bd4d8d.mockapi.io/api/v1/transactions");
            const data = res && res.data ? res.data : []
            dispatch(fetchUserSucess(data));
        } catch (error) {
            console.log(error);
            dispatch(fetchUserError(error));
        }
    };
};

export const fetchUserRequest = () => {
    return {
        type: FETCH_USER_REQUEST,
    };
};

export const fetchUserSucess = (data) => {
    return {
        type: FETCH_USER_SUCCESS,
        dataUsers: data
    };
};

export const fetchUserError = () => {
    return {
        type: FETCH_USER_ERROR
    };
};

// Table Product
export const fetchAllProducts = () => {
    return async (dispatch, getState) => {
        //dispatch(fetchProductRequest());
        try {
            // .post(url, data, {
            //     headers: {
            //       aaid: this.ID,
            //       token: this.Token
            //     }
            //   })
            const res = await axios.post("https://api.gearfocus.div4.pgtest.co/apiAdmin/users/list", `{
                "page":1,
                "count":25,
                "search":"",
                "memberships":[],
                "types":[],
                "status":[],
                "country":"",
                "state":"",
                "address":"",
                "phone":"",
                "date_type":"R",
                "date_range":[],
                "sort":"last_login",
                "order_by":"DESC",
                "tz":7
               }`, {
                headers: {
                    Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
                }
            });
            console.log('trả về', res)
            // const data = res && res.data ? res.data : []
            // dispatch(fetchProductSucess(data));
        } catch (error) {
            console.log(error);
            // dispatch(fetchProdcutError(error));
        }
    };
};

export const fetchProductRequest = () => {
    return {
        type: 'FETCH_PRODUCT_REQUEST',
    };
};

export const fetchProductSucess = (data) => {
    return {
        type: 'FETCH_PRODUCT_REQUEST',
        dataUsers: data
    };
};

export const fetchProductError = () => {
    return {
        type: 'FETCH_PRODUCT_REQUEST'
    };
};

export const statusFilterChange = (status) => {
    return {
        type: 'filters/statusFilterChange',
        payload: status,
    };
};

export const clientFilterChange = (client) => {
    return {
        type: 'filters/clientFilterChange',
        payload: client,
    };
};

export const searchFilterChange = (search) => {
    return {
        type: 'filters/searchFilterChange',
        payload: search,
    };
};

export const deleteUser = (id) => {
    return {
        type: 'DELETE_USER',
        payload: id,
    };
};