import { UPDATE_STATUS, SIGNED_IN } from './constants'

const reducer = (state = {}, action) => {
  let session = state.session

  switch (action.type) {
    UPDATE_STATUS:
      return state;
    SIGNED_IN:
      return Object.assign({}, state, {
        session:
      })
    default:
      return state;
  }
};

export default reducer;
