import { useEffect, useRef } from "react";

function ContextMenu({
  showContextMenu,
  setShowContextMenu,
  contextMenuPosition,
  contextOPtions,
}) {
  const optionItemRef = useRef();
  // handle option function when click option item
  const handleOptionClick = (e, callback) => {
    e.stopPropagation();
    setShowContextMenu(false);
    callback();
  };

  useEffect(() => {
    const handleOutSideClick = (e) => {
      if (e.target.id !== "context-opener") {
        if (
          optionItemRef.current &&
          !optionItemRef.current.contains(e.target)
        ) {
          setShowContextMenu(false);
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
      ref={optionItemRef}
      className={`fixed bg-dropdown-background  py-3 z-[100] rounded-md border-[1px] border-green-500`}
      style={{
        top: contextMenuPosition.y + 15,
        left: contextMenuPosition.x + 15,
      }}
    >
      <ul>
        {contextOPtions?.map(({ title, callback }) => (
          <li
            key={title}
            id="show-avatar"
            className="hover:bg-slate-700 cursor-pointer pl-5  pr-10 py-2 2xl:text-[20px]"
            onClick={(e) => handleOptionClick(e, callback)}
          >
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContextMenu;
