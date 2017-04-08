import { GM_SET_GAUTH2, GM_UPDATE_AUTHID } from './actions'

const googleAuth = (state = {}, action) => {
  switch (action.type) {
    case GM_SET_GAUTH2:
      return Object.assign({}, state, { auth2: action.auth2 })
    case GM_UPDATE_AUTHID:
      return Object.assign({}, state, { authId: action.authId})
    default:
      return state;
  }
};

export default reducer;
