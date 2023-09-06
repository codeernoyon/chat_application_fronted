import Avatar from "@/components/common/Avatar";
import ContextMenu from "@/components/common/ContextMenu";
import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import { UPDATEUSERINFO } from "@/utils/ApiRoutes";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BsFillCameraFill } from "react-icons/bs";
import { MdDone, MdModeEditOutline } from "react-icons/md";

const ProfileSlide = () => {
  // dispatch function for set user global state
  const [{ userInfo }] = useStateProvider();
  const [{}, dispatch] = useStateProvider();
  const [user, setUser] = useState({ ...userInfo });
  const [name, setName] = useState(user?.name);
  const [avatarImage, setAvatarImage] = useState(user?.imageUrl);
  const [showAvatarImage, setShowAvatarImage] = useState(false);
  const [description, setDescription] = useState(user?.description);
  const [uName, setUName] = useState(false);
  const [uDes, setUDes] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({
    x: "",
    y: "",
  });
  /*
  => it's a function for update user information in database
  => it's take some parameters
  */
  const updateUserInfo = async (updatedData) => {
    // update user info
    try {
      const res = await axios.put(UPDATEUSERINFO, {
        email: userInfo?.email,
        ...updatedData,
      });
      setUser(res.data.updateUser);

      toast.success("Update successfully");
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  };

  // handle name change function
  const handleChangeName = async () => {
    setUName(!uName);

    // ------- update data -------- //
    if (uName) {
      updateUserInfo({ name });
    }
  };

  // handle name change function
  const handleChangeDes = async () => {
    setUDes(!uDes);

    // ------- update data -------- //
    if (uDes) {
      updateUserInfo({ description });
    }
  };
  // show context menu function for visible context menu box
  const handleContextMenu = (e) => {
    e.stopPropagation();
    setShowContextMenu(true);
    setContextMenuPosition({
      x: e.pageX,
      y: e.pageY,
    });
  };
  // context menu options
  const contextOptions = [
    {
      title: "Take photo",
      callback: () => {
        toast.error("This option is not enable for now");
      },
    },
    {
      title: "Avatar photo",
      callback: async () => {
        setShowAvatarImage(!showAvatarImage);
      },
    },
    {
      title: "Upload photo",
      callback: () => {
        toast.error("This option is not enable for now");
      },
    },
    {
      title: "Remove photo",
      callback: async () => {
        setAvatarImage("/default_avatar.png");
        updateUserInfo({ imageUrl: "/default_avatar.png" });
      },
    },
  ];

  // it's use effect use for update user currently on global state and local storage
  useEffect(() => {
    // updated user set on local storage
    localStorage.setItem("User", JSON.stringify(user));
    // set user information on global state it can use any components
    dispatch({
      type: reducerCase.SET_USER,
      userInfo: {
        ...user,
      },
    });
  }, [user, dispatch, localStorage]);
  return (
    <div className="pt-12 w-full h-full px-10">
      {/* image */}
      <div className="flex justify-center items-center ">
        <div className="rounded-full overflow-hidden  cursor-pointer relative group">
          {/* layout overlap */}
          <div
            className="absolute top-0 left-0 rounded-full bg-black bg-opacity-50 z-20 w-full h-full  justify-center items-center flex-col text-slate-200 group-hover:flex hidden"
            id="context-opener"
            onClick={(e) => handleContextMenu(e)}
          >
            {/* camera icon */}
            <BsFillCameraFill className="text-[40px]" />
            {/* text */}
            <span className="text-[20px]">
              Change your <br /> profile picture
            </span>
          </div>
          <Image
            src={avatarImage}
            alt="user photo"
            height={180}
            width={180}
            className="z-0"
          />
        </div>
      </div>
      {/* -------- avatar menu ------- */}
      {showAvatarImage && (
        <Avatar
          updateUserInfo={updateUserInfo}
          showAvatarImage={showAvatarImage}
          setShowAvatarImage={setShowAvatarImage}
          setAvatarImage={setAvatarImage}
        />
      )}

      {/* -------- context menu ------- */}
      {showContextMenu && (
        <ContextMenu
          showContextMenu={showContextMenu}
          contextMenuPosition={contextMenuPosition}
          setShowContextMenu={setShowContextMenu}
          contextOPtions={contextOptions}
        />
      )}
      {/* ------------- name --------------- */}
      <div className="mt-10">
        {/* label */}
        <div>
          <span className="2xl:text-[18px] text-green-700">Your Name</span>
        </div>
        {/* name & input */}
        <div className="flex justify-between items-center mt-2">
          <div className="text-[20px] 2xl:text-[23px] w-full">
            {!uName ? (
              <span className="text-slate-200">{name}</span>
            ) : (
              <input
                type="text"
                value={name}
                className="w-full border-b-[1px] border-slate-500 bg-transparent pb-3 pl-1 focus:outline-none"
                onChange={(e) => setName(e.target.value)}
              />
            )}
          </div>
          {/* update icon */}
          <div className="cursor-pointer" onClick={handleChangeName}>
            {uName ? (
              <MdDone className="text-[28px]" />
            ) : (
              <MdModeEditOutline className="text-[28px]" />
            )}
          </div>
        </div>
        {/* ------ bottom des ----- */}
        <div className="mt-4">
          <p className="2xl:text-[20px]  ">
            This is not your username or PIN. Your WhatsApp contacts will see
            it.
          </p>
        </div>
      </div>
      {/* ---------- description ------------------ */}
      <div className="mt-10">
        {/* label */}
        <div>
          <span className="2xl:text-[18px] text-green-700">About Youself</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div className="text-[20px] 2xl:text-[23px] w-full">
            {!uDes ? (
              <span className="text-slate-200">{description}</span>
            ) : (
              <input
                type="text"
                value={description}
                className="w-full border-b-[1px] border-slate-500 bg-transparent pb-3 pl-1 focus:outline-none"
                onChange={(e) => setDescription(e.target.value)}
              />
            )}
          </div>
          <div className="cursor-pointer" onClick={handleChangeDes}>
            {uDes ? (
              <MdDone className="text-[28px]" />
            ) : (
              <MdModeEditOutline className="text-[28px]" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSlide;
