import PhotoPicker from "@/components/common/PhotoPicker";
import { useStateProvider } from "@/context/StateContext";
import { storage } from "@/utils/FirebaseConfig";
import { uploadFiles } from "@/utils/fireBase";
import imageCompression from "browser-image-compression";
import { useEffect, useState } from "react";
import { ImAttachment } from "react-icons/im";

const AttachFile = () => {
  const [showPhotoPicker, setShowPhotoPicker] = useState(false);
  const [{ userInfo }] = useStateProvider();
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
      // store image with file type
      let compressImg;

      // check type for compress image with file type
      if (
        file.type === "image/jpg" ||
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/svg+xml"
      ) {
        compressImg = await imageCompression(file, option);
      } else {
        compressImg = file;
      }
      const folder = `messages/${userInfo?.email}`;
      const messageUrl = await uploadFiles(storage, folder, [compressImg]);
      console.log(messageUrl);
    } catch (error) {
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
