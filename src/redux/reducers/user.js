import { SET_USER } from "../actionTypes";

const initialState = {
  User: { id: "", name: "", email: "" }
};

const user = function(state = initialState, action) {
  switch (action.type) {
    case SET_USER: {
      return action.payload.user
    }
    default: {
      return state;
    }
  }
}

export { user }
