import {
    DECREMENT,
    INCREMENT,
    FETCH_USER_REQUEST,
    FETCH_USER_SUCCESS,
    FETCH_USER_ERROR,
    FETCH_CATEGORY_REQUEST,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_ERROR,
    FETCH_BRAND_REQUEST,
    FETCH_BRAND_SUCCESS,
    FETCH_BRAND_ERROR,
    FETCH_COUNTRY_REQUEST,
    FETCH_COUNTRY_SUCCESS,
    FETCH_COUNTRY_ERROR,
} from "./types";
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

// API categories
export const fetchAllCatrgories = () => {
    return async (dispatch, getState) => {
        dispatch(fetchCategoryRequest());
        try {
            const res = await axios.get("https://api.gearfocus.div4.pgtest.co/api/categories/list");
            // console.log('data là', res.data.data)
            const data = res.data && res.data.data ? res.data.data : []
            dispatch(fetchCategorySucess(data));
        } catch (error) {
            console.log(error);
            dispatch(fetchCategoryError(error));
        }
    };
};

export const fetchCategoryRequest = () => {
    return {
        type: FETCH_CATEGORY_REQUEST,
    };
};

export const fetchCategorySucess = (data) => {
    return {
        type: FETCH_CATEGORY_SUCCESS,
        dataCategories: data
    };
};

export const fetchCategoryError = () => {
    return {
        type: FETCH_CATEGORY_ERROR
    };
};

// API brands
export const fetchAllBrands = () => {
    return async (dispatch, getState) => {
        dispatch(fetchBrandRequest());
        try {
            const res = await axios.get("https://api.gearfocus.div4.pgtest.co/apiAdmin/brands/list",
                {
                    headers: {
                        Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
                    }
                }
            );
            const data = res.data && res.data.data ? res.data.data : []
            dispatch(fetchBrandSucess(data));
        } catch (error) {
            console.log(error);
            dispatch(fetchBrandError(error));
        }
    };
};

export const fetchBrandRequest = () => {
    return {
        type: FETCH_BRAND_REQUEST,
    };
};

export const fetchBrandSucess = (data) => {
    return {
        type: FETCH_BRAND_SUCCESS,
        dataBrands: data
    };
};

export const fetchBrandError = () => {
    return {
        type: FETCH_BRAND_ERROR
    };
}

// API Countries
export const fetchAllCountries = () => {
    return async (dispatch, getState) => {
        dispatch(fetchCountryRequest());
        try {
            const res = await axios.get("https://api.gearfocus.div4.pgtest.co/apiAdmin/commons/country",
                {
                    headers: {
                        Authorization: '9.5a8eefea2a1299f87e8e1a74994827840debf897a605c603444091fa519da275',
                    }
                }
            );
            const data = res.data && res.data.data ? res.data.data : []
            dispatch(fetchCountrySucess(data));
        } catch (error) {
            console.log(error);
            dispatch(fetchCountryError(error));
        }
    };
};

export const fetchCountryRequest = () => {
    return {
        type: FETCH_COUNTRY_REQUEST,
    };
};

export const fetchCountrySucess = (data) => {
    return {
        type: FETCH_COUNTRY_SUCCESS,
        dataCountries: data
    };
};

export const fetchCountryError = () => {
    return {
        type: FETCH_COUNTRY_ERROR
    };
}

// Table Product
export const fetchAllProducts = () => {
    return async (dispatch, getState) => {
        try {
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
        } catch (error) {
            console.log(error);
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