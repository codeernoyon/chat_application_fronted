import { createPortal } from "react-dom";

function PhotoPicker({ onChange }) {
  const component = (
    <input
      id="photo_picker"
      type="file"
      accept=".jpg, .jpeg, .png, .svg, .pdf, .docx, .zip, .txt"
      hidden
      onChange={onChange}
    />
  );

  return createPortal(
    component,
    document.getElementById("photo_picker_element")
  );
}

export default PhotoPicker;
