import axios from "axios"

const initialState = {
    email: null,
    firstName: null,
    lastName: null,
}

const REQUEST_USER_DATA = "REQUEST_USER_DATA"

export function reqUserData() {
    let data = axios.get("/auth/user-data").then((res) => res.data.user)
    console.log(data)
    return {
        type: REQUEST_USER_DATA,
        payload: data,
    }
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case REQUEST_USER_DATA + "_PENDING":
            return { ...state, loading: true }

        case REQUEST_USER_DATA + "_FULFILLED":
            return {
                ...state,
                email: action.payload.email,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                loading: false,
            }

        case REQUEST_USER_DATA + "_REJECTED":
            return { ...state, loading: false }

        default:
            return state
    }
}
