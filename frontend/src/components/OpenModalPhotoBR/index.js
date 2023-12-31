import React from "react";
import { useModal } from "../../context/Modal";
import './openModalPhotoBR.css'

function OpenModalPhotoBR({
  modalComponent, // component to render inside the modal
  image, // img src
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (typeof onButtonClick === "function") onButtonClick();
    if (typeof onModalClose === "function") setOnModalClose(onModalClose);
    setModalContent(modalComponent);
  };

  return <img id='modalPhotoBR' onClick={onClick} src={image} />;
}

export default OpenModalPhotoBR;
