import axios from "axios"

const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false,
}

const REQUEST_BUDGET_DATA = "REQUEST_BUDGET_DATA"
const ADD_PURCHASE = "ADD_PURCHASE"
const REMOVE = "REMOVE"

export function reqBudgetData() {
    let data = axios.get("/api/budget-data").then((res) => res.data)
    console.log(1111, data)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data,
    }
}

export function addPurchase(price, description, category) {
    let data = axios
        .post("/api/budget-data/purchase", {
            description,
            price,
            category,
        })
        .then((res) => res.data)
    return {
        type: ADD_PURCHASE,
        payload: data,
    }
}

export function removePurchase(id) {
    let data = axios
        .delete(`/api/budget-data/purchase/${id}`)
        .then((res) => res.data)
    return {
        type: REMOVE,
        payload: data,
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_BUDGET_DATA + "_PENDING":
            return { ...state, loading: true }

        case REQUEST_BUDGET_DATA + "_FULFILLED":
            return { 
                purchases: action.payload.purchases,
                budgetLimit: action.payload.budgetLimit,
                loading: false }

        case REQUEST_BUDGET_DATA + "_REJECTED":
            return { ...state, loading: false }

        case ADD_PURCHASE + "_PENDING":
            return { ...state, loading: true }

        case ADD_PURCHASE + "_FULFILLED":
            return { ...state, purchases: action.payload, loading: false }

        case ADD_PURCHASE + "_REJECTED":
            return { ...state, loading: false }

        case REMOVE + "_PENDING":
            return { ...state, loading: true }

        case REMOVE + "_FULFILLED":
            return { ...state, purchases: action.payload, loading: false }

        case REMOVE + "_REJECTED":
            return { ...state, loading: false }

        default:
            return state
    }
}
