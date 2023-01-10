import { userService } from '../../services/user.service'
const INITIAL_STATE = {
    user: userService.getLoggedinUser(),
    users: [],
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, user: { ...action.user } }
        case 'SET_USERS':
            const { users } = state
            return { ...state, users: { ...action.users } }
        case 'REMOVE_USER':
            return { ...state, users: { ...users.filter(user => user._id !== action.userId) } }
        case 'UPDATE_USER':
            return { ...state, users: { ...users.map(user => user._id === action.user._id ? action.user : user) } }
        default:
            return state;
    }

}