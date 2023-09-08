import SearchBar from "../common/SearchBar";
import HeaderIcons from "./HeaderIcons";

function ChatListHeader() {
  // ------ handle search click function -----
  const handleSearchClick = () => {};
  return (
    <div className="w-full">
      <HeaderIcons />
      {/* search ber for searching */}
      <SearchBar
        placeHolder="Search or Start new chat"
        click={handleSearchClick}
      />
    </div>
  );
}

export default ChatListHeader;
