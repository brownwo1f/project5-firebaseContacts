import React, { useState } from "react";

const useDisclose = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onOpen = () => {
    setIsModalOpen(true);
  };
  const onClose = () => {
    setIsModalOpen(false);
  };
  return { onClose, onOpen, isModalOpen };
};

export default useDisclose;
