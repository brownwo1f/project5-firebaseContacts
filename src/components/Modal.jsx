import React from "react";
import { createPortal } from "react-dom"; // to overcome the problem to psoitioning in css
import { IoIosCloseCircle } from "react-icons/io";

const Modal = ({ isModalOpen, onClose, children }) => {
  return createPortal(
    <>
      {isModalOpen && (
        <div className="absolute top-0 z-40 grid h-screen w-screen place-items-center backdrop-blur">
          <div className="relative z-50 m-auto min-h-[200px] min-w-[80%] rounded-lg bg-white p-4">
            <div className="flex justify-end">
              <IoIosCloseCircle onClick={onClose} className="text-2xl" />
            </div>
            {children}
          </div>
        </div>
      )}
    </>,
    document.getElementById("modal-root"), //we are opening this portal in a new dedicated root div in index.html
  );
};

export default Modal;
