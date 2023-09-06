import Image from "next/image";
import { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

function Avatar({
  updateUserInfo,
  showAvatarImage,
  setShowAvatarImage,
  setAvatarImage,
}) {
  const ref = useRef();
  // avatar picture options
  const avatarOptions = [
    "/avatars/1.png",
    "/avatars/2.png",
    "/avatars/3.png",
    "/avatars/4.png",
    "/avatars/5.png",
    "/avatars/6.png",
    "/avatars/7.png",
    "/avatars/8.png",
    "/avatars/9.png",
  ];
  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (e.target.id !== "show-avatar") {
        if (ref.current && !ref.current.contains(e.target)) {
          console.log("click");
          setShowAvatarImage(!showAvatarImage);
        }
      }
    };
    document.addEventListener("click", handleOutSideClick);
    return () => {
      document.removeEventListener("click", handleOutSideClick);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="absolute w-[75%] top-[200px] left-[50%] translate-x-[-50%] bg-panel-header-background2 p-5 rounded-xl border-[1px] border-green-600"
    >
      <div className="pb-3 flex justify-end">
        <span
          onClick={() => setShowAvatarImage(!showAvatarImage)}
          className="p-3 rounded-full hover:bg-panel-header-background cursor-pointer"
        >
          <AiOutlineClose className="text-[25px]" />
        </span>
      </div>
      <div className="flex flex-wrap gap-5 justify-center">
        {avatarOptions.map((item, index) => (
          <div
            key={item}
            className="cursor-pointer"
            onClick={() => {
              setAvatarImage(avatarOptions[index]);
              setShowAvatarImage(false);
              updateUserInfo({ imageUrl: avatarOptions[index] });
            }}
          >
            <Image src={item} alt="avatar" height={70} width={70} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Avatar;
