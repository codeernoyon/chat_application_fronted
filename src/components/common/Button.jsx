/*
 // ----it's a button component --- //
=> title use for element title
=>className props use for warper div design
=> iconclassName props use for design icon
=> if have a icon for this element for that use icon props 
=> onclick props for handle click function for this element
*/

function Button({ title, icon, className, iconclassName, onClick }) {
  return (
    <div
      className={`flex justify-center items-center cursor-pointer ${className}`}
      onClick={onClick}
    >
      {icon && <span className={`${iconclassName}`}>{icon}</span>}
      {title}
    </div>
  );
}

export default Button;
