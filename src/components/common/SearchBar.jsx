import { useRef, useState } from "react";
import {
  AiOutlineArrowLeft,
  AiOutlineClose,
  AiOutlineSearch,
} from "react-icons/ai";
function SearchBar({ placeHolder, click }) {
  const [search, setSearch] = useState("");
  const [focus, setFocus] = useState(false);
  const ref = useRef();

  // handle the input change function
  const handleChange = (e) => {
    setSearch(e.target.value);
    setFocus(true);
  };
  // handle the input onfocus function
  const handleFocus = () => {
    setFocus(true);
  };
  // handle the input focus blur function
  const handleBlur = () => {
    if (search === "") {
      setFocus(false);
    }
  };
  // when click close icon clear search value
  const clearSearchInputValue = () => {
    setSearch("");
    ref.current.focus();
  };
  // when click close icon clear search value
  const leftArrowClick = () => {
    setSearch("");
    setFocus(false);
  };
  // when click search icon focus input element
  const clickSearch = () => {
    ref.current.focus();
    click();
  };

  return (
    <div className="px-3 py-2">
      <div className="bg-secondary flex items-center px-5 rounded-lg">
        {/* search icon */}
        <div className="h-full pr-8 cursor-pointer">
          {focus ? (
            <span className="bg-white" onClick={leftArrowClick}>
              <AiOutlineArrowLeft className="text-[25px] text-green-600" />
            </span>
          ) : (
            <span className="bg-white" onClick={clickSearch}>
              <AiOutlineSearch className="text-[25px]" />
            </span>
          )}
        </div>
        <input
          ref={ref}
          type="text"
          placeholder={placeHolder}
          value={search}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className="bg-transparent py-2  w-full focus:outline-none focus:placeholder-shown:placeholder-transparent font-[400]"
        />
        {/* close icon */}
        <div
          className={`${
            focus ? "opacity-100" : "opacity-0"
          } p-2 cursor-pointer`}
          onClick={() => clearSearchInputValue()}
        >
          <AiOutlineClose />
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
