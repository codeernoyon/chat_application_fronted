export const HOST = process.env.HOST;
const HOSTAPI = `${HOST}/api/v1`;

// ------ user api routing -------- //
export const USER = `${HOSTAPI}/user`;
export const UPDATEUSERINFO = `${HOSTAPI}/updateUserInfo`;
export const GETUSERS = `${HOSTAPI}/allUsers`;
export const SENDMESSAGE = `${HOSTAPI}/message`;
export const GETALLMESSAGE = `${HOSTAPI}/getMessages`;
export const UPDATEMESSAGES = `${HOSTAPI}/updateAllMessage`;
export const AUDIOMESSAGE = `${HOSTAPI}/audioMessage`;
export const ALLMESSAGESUSER = `${HOSTAPI}/allMessagesUsers`;
