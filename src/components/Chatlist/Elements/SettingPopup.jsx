import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

const SettingPopup = ({ setShowSetting, setShowSlideData }) => {
  const router = useRouter();
  // show setting popup data
  const showSettingPopupData = [
    {
      title: "New Group",
      callback: () => {
        toast.success("This option is coming soon.....");
      },
    },
    {
      title: "New Community",
      callback: () => {
        toast.success("This option is coming soon.....");
      },
    },
    {
      title: "Star Messages",
      callback: () => {
        toast.success("This option is coming soon.....");
      },
    },
    {
      title: "Setting",
      callback: (option) => {
        setShowSlideData({
          status: true,
          option: option,
        });
      },
      option: "setting",
    },
    {
      title: "Log out",
      callback: () => {
        localStorage.setItem("User", JSON.stringify(null));
        router.push("/login");
      },
    },
  ];
  //   handle click function
  const handleClick = (e, callback, option) => {
    e.stopPropagation();
    setShowSetting(false);
    callback(option);
  };

  return (
    <div className="absolute w-[200px] top-[50px] right-0 border-[1px] border-green-600 bg-panel-header-background2 rounded-lg py-3 z-[9999]">
      <ul className="w-full flex flex-col">
        {showSettingPopupData?.map(({ title, callback, option }, index) => (
          <li
            key={index}
            className="pl-5 pr-10 py-2 hover:bg-slate-700"
            onClick={(e) => handleClick(e, callback, option)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SettingPopup;
