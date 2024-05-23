import { getAllCodeService , createNewUserService, deleteUserService, getAllUser} from '../../services/userService';
import actionTypes from './actionTypes';
import {toast} from "react-toastify"
export const fetchGenderStart = () => {
    return async (dispatch, getState) =>{
        try{
            dispatch({type:actionTypes.FETCH_GENDER_START})
            let res = await getAllCodeService("GENDER");
            if(res && res.errCode === 0){
                dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch(fetchGenderFailed())
            }
        }catch(e){
            dispatch(fetchGenderFailed())
            console.log('featchGenderStart error',e);
        }
    }
    //type: actionTypes.FETCH_GENDER_START
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) =>{
        try{
            let res = await getAllCodeService("POSITION");
            if(res && res.errCode === 0){
                dispatch(fetchPositionSuccess(res.data))
            }else{
                dispatch(fetchPositionFailed())
            }
        }catch(e){
            dispatch(fetchPositionFailed())
            console.log('featchPositionStart error',e);
        }
    }
}

export const fetchRoleStart = () => {
        return async (dispatch, getState) =>{
            try{
                let res = await getAllCodeService("ROLE");
                if(res && res.errCode === 0){
                    dispatch(fetchRoleSuccess(res.data))
                }else{
                    dispatch(fetchRoleFailed())
                }
            }catch(e){
                dispatch(fetchRoleFailed())
                console.log('featchRoleStart error',e);
            }
        }
        
}

export const createNewUser = (data) => {
    return async (dispatch, getState) =>{
        try{
            let res = await createNewUserService(data);
            if(res && res.errCode === 0){
                //toast.success("Create a new user succeed");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart())
            }else{
                dispatch(saveUserFailed())
            }
        }catch(e){
            dispatch(saveUserFailed())
            console.log('saveuserFaild error',e);
        }
    }
}
export const saveUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const saveUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED
})

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) =>{
        try{
            let res = await getAllUser("ALL");
            if(res && res.errCode === 0){
               
                dispatch(fetchAllUsersSuccess(res.users.reverse()))
            }else{
                toast.error("Fetch all users error!")
                dispatch(fetchAllUsersFailed())
               
            }
        }catch(e){
            toast.error("Fetch all users error!")
            dispatch(fetchAllUsersFailed())
            console.log("fetchAllUserFailed error",e)
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILED
})

export const deletaUser = (UserId) => {
    return async (dispatch, getState) =>{
        try{
            let res = await deleteUserService(UserId);
            if(res && res.errCode === 0){
                toast.success('Delete the user succeed!')
                dispatch(deleteUserSuccess())
                dispatch(fetchAllUsersStart())
            }else{
                toast.error("Delete the users error!")
                dispatch(deleteUserFailed())
               
            }
        }catch(e){
            toast.error("Delete the users error!")
            dispatch(deleteUserFailed())
            console.log("saveUserFailed error",e)
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
   
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED
})