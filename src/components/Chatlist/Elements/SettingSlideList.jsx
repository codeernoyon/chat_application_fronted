import ThemeSvg from "@/components/common/ThemeSvg";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { BiSolidHelpCircle } from "react-icons/bi";
import { CgFileDocument } from "react-icons/cg";
import { FaKeyboard } from "react-icons/fa";
import { HiOutlineLogout } from "react-icons/hi";
import { IoMdLock, IoMdNotifications } from "react-icons/io";
import { MdOutlineSecurity, MdWallpaper } from "react-icons/md";
import { TbArrowBigDownFilled } from "react-icons/tb";

const SettingSlideList = () => {
  const router = useRouter();

  // --------- setting options ---------
  const settingOptions = [
    {
      icon: <IoMdNotifications />,
      title: "notification",
      callback: () => {
        toast.success("This option is coming soon.....");
      },
    },
    {
      icon: <IoMdLock />,
      title: "confidentiality",
      callback: () => {
        toast.success("This option is coming soon.....");
      },
    },
    {
      icon: <MdOutlineSecurity />,
      title: "security",
      callback: () => {
        toast.success("This option is coming soon.....");
      },
    },
    {
      icon: <ThemeSvg />,
      title: "theme",
      callback: () => {
        toast.success("This option is coming soon.....");
      },
    },
    {
      icon: <MdWallpaper />,
      title: "chat wallpaper",
      callback: () => {
        toast.success("This option is coming soon.....");
      },
    },
    {
      icon: <TbArrowBigDownFilled />,
      title: "automatic download of media",
      callback: () => {
        toast.success("This option is coming soon.....");
      },
    },
    {
      icon: <CgFileDocument />,
      title: "request account information",
      callback: () => {
        toast.success("This option is coming soon.....");
      },
    },
    {
      icon: <FaKeyboard />,
      title: "keyboard shortcut",
      callback: () => {
        toast.success("This option is coming soon.....");
      },
    },
    {
      icon: <BiSolidHelpCircle />,
      title: "help",
      callback: () => {
        toast.success("This option is coming soon.....");
      },
    },
    {
      icon: <HiOutlineLogout />,
      title: "log out",
      callback: () => {
        localStorage.setItem("User", JSON.stringify(null));
        router.push("/login");
      },
    },
  ];
  return (
    <div className="overflow-scroll h-full">
      <ul className="overflow-scroll h-[500px]">
        {settingOptions?.map(({ title, icon, callback }, index) => (
          <li
            key={index}
            className="pl-5 hover:bg-panel-header-background2 cursor-pointer"
            onClick={() => callback()}
          >
            <div className="flex h-full w-full items-center gap-5">
              {/* icon */}
              <span className="text-[24px]">{icon}</span>
              {/* text */}
              <span className=" text-slate-300 py-5 w-full border-b-[1px] border-panel-header-background2  capitalize">
                {title}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingSlideList;
