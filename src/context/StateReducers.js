import { reducerCase } from "./constants";

export const initialState = {
  user: null,
  showSlide: {},
  showMessageCurrentUser: false,
  allUsersFromDb: [],
  currentMessageUser: {},
  allMessages: [],
  onlineUsers: [],
  socket: undefined,
  showSmDeviceMessage: false,
  loading: false,
  voiceCall: undefined,
  videoCall: undefined,
  incomingVoiceCall: undefined,
  incomingVideoCall: undefined,
  endCall: undefined,
  WRTCPeer: undefined,
  WRTCOffer: undefined,
  WRTCAnswer: undefined,
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
    // set all message  save
    case reducerCase.ALL_MESSAGES:
      return {
        ...state,
        allMessages: action.allMessages,
      };
    // set all message  save
    case reducerCase.ADD_MESSAGE:
      return {
        ...state,
        allMessages: [...state.allMessages, action.newMessage],
      };
    // set socket
    case reducerCase.SET_SOCKET:
      return {
        ...state,
        socket: action.socket,
      };
    // online users
    case reducerCase.ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.onlineUsers,
      };
    // SHOW SM DEVICE MESSAGE
    case reducerCase.SHOWSMDEVICEMESSAGE:
      return {
        ...state,
        showSmDeviceMessage: action.showSmDeviceMessage,
      };
    // loading
    case reducerCase.LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    // voice call
    case reducerCase.VOICE_CALL:
      return {
        ...state,
        voiceCall: action.voiceCall,
      };
    //  video call
    case reducerCase.VIDEO_CALL:
      return {
        ...state,
        videoCall: action.videoCall,
      };
    // incoming voice call
    case reducerCase.INCOMING_VOICE_CALL:
      return {
        ...state,
        incomingVoiceCall: action.incomingVoiceCall,
      };
    // incoming video call
    case reducerCase.INCOMING_VIDEO_CALL:
      return {
        ...state,
        incomingVideoCall: action.incomingVideoCall,
      };
    // end call
    case reducerCase.END_CALL:
      return {
        ...state,
        voiceCall: undefined,
        videoCall: undefined,
        incomingVideoCall: undefined,
        incomingVoiceCall: undefined,
      };
    // WRTC Peer set
    case reducerCase.WRTC_PEER:
      return {
        ...state,
        WRTCPeer: action.WRTCPeer,
      };
    // WRTC Peer set
    case reducerCase.WRTC_OFFER:
      return {
        ...state,
        WRTCOffer: action.WRTCOffer,
      };
    // WRTC Peer set
    case reducerCase.WRTC_ANSWER:
      return {
        ...state,
        WRTCAnswer: action.WRTCAnswer,
      };
    default:
      return state;
  }
};
