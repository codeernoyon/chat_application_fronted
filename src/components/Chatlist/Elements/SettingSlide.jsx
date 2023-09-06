import SearchBar from "@/components/common/SearchBar";
import { useStateProvider } from "@/context/StateContext";
import { reducerCase } from "@/context/constants";
import Image from "next/image";
import SettingSlideList from "./SettingSlideList";

const SettingSlide = () => {
  const [{ userInfo }] = useStateProvider();
  const [{}, dispatch] = useStateProvider();

  // -------- handle profile click function -----------
  const handleProfileClick = () => {
    dispatch({
      type: reducerCase.SHOW_SLIDE,
      showSlide: {
        status: true,
        option: "profile",
      },
    });
  };
  // -------- handle search click function -----------
  const handleSearchClick = () => {};

  return (
    <div className="h-full">
      {/* ------ search ber ------ */}
      <SearchBar
        placeHolder="Search setting options"
        click={handleSearchClick}
      />
      {/* ------ profile section ------- */}
      <div
        className="p-5 flex items-center gap-5 hover:bg-panel-header-background2 cursor-pointer"
        onClick={() => handleProfileClick()}
      >
        {/* image */}
        <Image
          src={userInfo?.imageUrl}
          alt="photo"
          height={80}
          width={80}
          className="rounded-full"
        />
        {/* name & description */}
        <div className="flex flex-col text-slate-200">
          <span className="text-[20px]">{userInfo?.name}</span>
          <span>{userInfo?.description}</span>
        </div>
      </div>
      {/* -------- list ------ */}
      <SettingSlideList />
    </div>
  );
};

export default SettingSlide;
