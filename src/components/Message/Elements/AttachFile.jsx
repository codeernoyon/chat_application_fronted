import PhotoPicker from "@/components/common/PhotoPicker";
import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import { SENDMESSAGE } from "@/utils/ApiRoutes";
import { storage } from "@/utils/FirebaseConfig";
import { deleteImageObject, uploadFiles } from "@/utils/fireBase";
import axios from "axios";
import { useEffect, useState } from "react";
import { ImAttachment } from "react-icons/im";

const AttachFile = () => {
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [compressImg, setCompressImg] = useState("");
  const [{ userInfo, currentMessageUser, socket }, dispatch] =
    useStateProvider();
  // handle photo picker
  const handlePhotoPicker = () => {
    setShowPhotoPicker(true);
  };
  // handle photo picker change
  const handlePhotoPickerChange = async (e) => {
    setShowPhotoPicker(false);
    try {
      // ----------  image compress option ----------
      let option = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1040,
        useWebWorker: true,
      };
      // ----------  image compress ----------
      const file = e.target.files[0];
      if (file.size > 3000000) {
        return;
      }
      // // store image with file type
      let fileType;

      // check type for compress image with file type
      if (
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/svg+xml"
      ) {
        fileType = "image";
      } else {
        fileType = "file";
      }
      // create folder with email account name
      const folder = `messages/${userInfo?.email}`;
      // upload image firebase && get image link
      const messageUrl = await uploadFiles(storage, folder, [file]);
      setCompressImg(messageUrl);
      // call api for send message in backend
      const { data } = await axios.post(SENDMESSAGE, {
        email: userInfo?.email,
        message: messageUrl[0],
        sender: userInfo?._id,
        receiver: currentMessageUser?._id,
        fileType,
      });
      // socket event listener
      socket.current.emit("send_message", {
        ...data.data,
      });
      // add message live on global state
      dispatch({
        type: reducerCase.ADD_MESSAGE,
        newMessage: { ...data.data },
      });
    } catch (error) {
      deleteImageObject(compressImg, storage);
      console.log(error);
    }
  };

  useEffect(() => {
    if (showPhotoPicker) {
      const element = document.getElementById("photo_picker");
      element.click();
      document.body.focus = (e) => {
        setShowPhotoPicker(false);
      };
    }
  }, [showPhotoPicker]);
  return (
    <div
      className="text-[25px] text-slate-400 cursor-pointer hover:text-slate-200"
      onClick={handlePhotoPicker}
    >
      <ImAttachment />
      {showPhotoPicker && <PhotoPicker onChange={handlePhotoPickerChange} />}
    </div>
  );
};

export default AttachFile;
