// import { createSelector } from 'reselect';
// import Select from "react-select";

export const todoListSelector = (state) => state.user.listUsers;
export const categoriesListSelector = (state) => state.categories.listCategories;
export const brandsListSelector = (state) => state.brands.listBrands;
export const countriesListSelector = (state) => state.countries.listCountries;
export const vendorsListSelector = (state) => state.vendors.listVendors;


export const vendorsRemainingSelector = (state) => {
    const todosRemaining = state.vendors.listVendors.filter((todo) => {
        return todo.name.includes(state.filters.vendor)
    });
    return todosRemaining;
}