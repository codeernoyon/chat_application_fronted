import SearchBar from "@/components/common/SearchBar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import { GETUSERS } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const NewMessage = () => {
  const [{ userInfo }, dispatch] = useStateProvider();
  const [allUsers, setAllUsers] = useState([]);

  // ------ handle search click function -----
  const handleSearchClick = () => {};

  // -------- handle profile click function -----------
  const handleProfileClick = (e, user) => {
    e.stopPropagation();
    // set data for show message user
    dispatch({
      type: reducerCase.SHOW_MESSAGE_CURRENT_USER,
      showMessageCurrentUser: true,
    });
    // set user for current message user
    dispatch({
      type: reducerCase.CURRENT_MESSAGE_USER,
      currentMessageUser: { ...user },
    });
  };

  useEffect(() => {
    const getAllUsers = async () => {
      try {
        let allGetUsers = [];
        const res = await axios.post(GETUSERS, {
          email: userInfo?.email,
        });
        res.data.allUsers.forEach((user) => {
          if (user._id !== userInfo?._id) {
            allGetUsers.push(user);
          }
        });

        // set data for state
        setAllUsers(allGetUsers);

        // set data for global state
        dispatch({
          type: reducerCase.ALL_USERS_FROM_DB,
          allUsersFromDb: allGetUsers,
        });
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);
  return (
    <div className="pb-10">
      {/* search ber for new user search */}
      <SearchBar placeHolder="Search for new chat" click={handleSearchClick} />
      <div className="overflow-y-scroll h-[80vh] ">
        {allUsers?.map((user) => (
          <div key={user._id} className="my-5">
            {/* ------ profile section ------- */}
            <div
              className="p-5 flex items-center gap-5 hover:bg-panel-header-background2 cursor-pointer"
              onClick={(e) => handleProfileClick(e, user)}
            >
              {/* image */}
              <Image
                src={user?.imageUrl}
                alt="photo"
                height={50}
                width={50}
                className="rounded-full"
              />
              {/* name & description */}
              <div className="flex flex-col text-slate-200">
                <span className="text-[18px]">{user?.name}</span>
                <span className="text-sm text-slate-400">
                  {user?.description}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewMessage;
