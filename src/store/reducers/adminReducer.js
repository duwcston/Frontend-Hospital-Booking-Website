import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    gender: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors:[]
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = {...state};
            copyState.genders = action.data;
            return {
                ...copyState,   
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.genders = action.data;
            state.isLoadingnGender=false;
            return {
                ...state,   
            }

        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoadingnGender = false;
            state.genders = [];
            return {
                ...state,   
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,   
            }

        case actionTypes.FETCH_POSITION_FAILED:
            state.positions = [];
            return {
                ...state,   
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,   
            }

        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,   
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,   
            }

        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,   
            }
         case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.topDoctors;
            return {
                ...state,   
            }

        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.topDoctors = [];
            return {
                ...state,   
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.topDoctors;
            return {
                ...state,   
            }

        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.topDoctors = [];
            return {
                ...state,   
            }
        default:
            return state;
    }
}

export default appReducer;