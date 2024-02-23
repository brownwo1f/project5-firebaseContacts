import React from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import AddUpdateContacts from "./AddUpdateContacts";
import useDisclose from "../Hooks/useDisclose";
import { toast } from "react-toastify";

const ContactCard = ({ contact }) => {
  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "contacts", id));
      toast.success("Contact Deleted Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const { isModalOpen, onClose, onOpen } = useDisclose();

  return (
    <>
      <div className="justify-left my-1 mt-4 flex items-center rounded-lg bg-yellow p-2 ">
        <RiAccountCircleFill className={`text-3xl text-dark-yellow`} />
        <div className="w-[70%] flex-col px-2 text-left">
          <h2 className="h-5 text-sm font-medium">{contact.name}</h2>
          <p className="text-xs">{contact.email}</p>
        </div>
        <FaEdit className="mx-1 cursor-pointer text-xl" onClick={onOpen} />
        <FaTrash
          onClick={() => deleteContact(contact.id)}
          className="text-1xl mx-1 cursor-pointer text-red-500"
        />
      </div>
      <AddUpdateContacts
        contact={contact}
        isUpdate
        isModalOpen={isModalOpen}
        onClose={onClose}
      />
    </>
  );
};

export default ContactCard;
