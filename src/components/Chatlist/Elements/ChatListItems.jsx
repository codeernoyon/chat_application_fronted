import MessageStatus from "@/components/common/MessageStatus";
import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import { ALLMESSAGESUSER, GETALLMESSAGE } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiSolidMicrophone } from "react-icons/bi";
import { BsImage } from "react-icons/bs";

const ChatListItems = () => {
  const [{ userInfo }, dispatch] = useStateProvider();
  const [allUsers, setAllUsers] = useState([]);

  // -------- handle profile click function -----------
  const handleProfileClick = async (e, user) => {
    e.stopPropagation();

    // set user for start loading
    dispatch({
      type: reducerCase.LOADING,
      loading: true,
    });
    // set user for current message user
    dispatch({
      type: reducerCase.CURRENT_MESSAGE_USER,
      currentMessageUser: { ...user },
    });
    // set data for show message user
    dispatch({
      type: reducerCase.SHOW_MESSAGE_CURRENT_USER,
      showMessageCurrentUser: true,
    });
    try {
      // api hit url and get all messages
      const { data } = await axios.get(
        `${GETALLMESSAGE}/${userInfo?.email}/${userInfo?._id}/${user?._id}`
      );

      // store all messages in stats variable
      dispatch({
        type: reducerCase.ALL_MESSAGES,
        allMessages: data.allMessages,
      });
      // set user for  end loading
      dispatch({
        type: reducerCase.LOADING,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const getAllUsers = async () => {
      console.log(`${ALLMESSAGESUSER}/${userInfo?._id}`);
      try {
        const { data } = await axios.get(`${ALLMESSAGESUSER}/${userInfo?._id}`);
        setAllUsers(data.users);

        // set data for global state
        dispatch({
          type: reducerCase.ALL_USERS_FROM_DB,
          allUsersFromDb: allUsers,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (userInfo) getAllUsers();
  }, []);
  return (
    <div className="pb-10">
      <div className="overflow-y-scroll h-[80vh] ">
        {allUsers?.map((item) => (
          <div key={item.user[0]?._id} className="my-5">
            {/* ------ profile section ------- */}
            <div
              className="p-5 flex items-center gap-5 hover:bg-panel-header-background2 cursor-pointer"
              onClick={(e) => handleProfileClick(e, item.user[0])}
            >
              {/* image */}
              <Image
                src={item.user[0]?.imageUrl}
                alt="photo"
                height={50}
                width={50}
                className="rounded-full"
              />
              {/* name & description */}
              <div className="flex flex-col text-slate-200">
                <span className="text-[18px]">{item.user[0]?.name}</span>
                <span className="mt-1 text-slate-400 flex items-center gap-3">
                  {userInfo?._id === item?.sender && (
                    <MessageStatus messageStatus={item.status} />
                  )}
                  <div>
                    {item.fileType === "text" && (
                      <span className="truncate">{item.message}</span>
                    )}
                    {item.fileType === "image" && (
                      <div className="flex items-center gap-2">
                        <span>
                          <BsImage />
                        </span>
                        <span>Photo</span>
                      </div>
                    )}
                    {item.fileType === "audio" && (
                      <div className="flex items-center gap-1">
                        <span>
                          <BiSolidMicrophone />
                        </span>
                        <span>Audio</span>
                      </div>
                    )}
                  </div>
                  {/*  */}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatListItems;
