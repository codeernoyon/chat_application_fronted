import { reducerCase } from "./constants";

export const initialState = {
  user: null,
  showSlide: {},
  showMessage: true,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case reducerCase.SET_USER:
      return {
        ...state,
        userInfo: action.userInfo,
      };
    case reducerCase.SHOW_SLIDE:
      return {
        ...state,
        showSlide: action.showSlide,
      };
    case reducerCase.sHOW_MESSAGE:
      return {
        ...state,
        ShowMessage: action.showMessage,
      };
    default:
      return state;
  }
};
