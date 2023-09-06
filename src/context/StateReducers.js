import { reducerCase } from "./constants";

export const initialState = {
  user: null,
  showSlide: {},
  showMessageCurrentUser: false,
  allUsersFromDb: [],
  currentMessageUser: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    // user info
    case reducerCase.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    // slide show
    case reducerCase.SHOW_SLIDE:
      return {
        ...state,
        showSlide: action.showSlide,
      };
    // show message
    case reducerCase.SHOW_MESSAGE_CURRENT_USER:
      console.log({ ...state });
      return {
        ...state,
        showMessageCurrentUser: action.showMessageCurrentUser,
      };
    // all users save
    case reducerCase.ALL_USERS_FROM_DB:
      return {
        ...state,
        allUsersFromDb: action.allUsersFromDb,
      };
    // set user data save
    case reducerCase.CURRENT_MESSAGE_USER:
      return {
        ...state,
        currentMessageUser: action.currentMessageUser,
      };
    default:
      return state;
  }
};
