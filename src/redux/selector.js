// import { createSelector } from 'reselect';
// import Select from "react-select";

export const searchTextSelector = (state) => state.filters.invoice;
export const filterClientSelector = (state) => state.filters.client;
export const filterStatusSelector = (state) => state.filters.status;
export const todoListSelector = (state) => state.user.listUsers;

export const todosRemainingSelector = (state) => {
    const todosRemaining = state.user.listUsers.filter((todo) => {
        return todo.status.includes(state.filters.status)
            && todo.client.includes(state.filters.client)
            && todo.invoice.includes(state.filters.invoice)
    });
    return todosRemaining;
}