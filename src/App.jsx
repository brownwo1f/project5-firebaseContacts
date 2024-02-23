import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaSearch } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { collection, getDocs, onSnapshot } from "firebase/firestore"; //importing collection
import { db } from "./config/firebase";
import AddUpdateContacts from "./components/AddUpdateContacts";
import ContactCard from "./components/ContactCard";
import useDisclose from "./Hooks/useDisclose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFound from "./components/NotFound";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isModalOpen, onClose, onOpen } = useDisclose();

  const searchContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts"); // grabing our collection made on firebase (contacts)
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        // similar to e.target.value --> what we are doing is to extracting contact data from the received object
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filterContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value),
      );
      setContacts(filterContacts); // setting the data received into contacts variable
      return filterContacts;
    });
  };

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts"); // grabing our collection made on firebase (contacts)

        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            // similar to e.target.value --> what we are doing is to extracting contact data from the received object
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists); // setting the data received into contacts variable
          return contactLists;
        });
      } catch (error) {}
    };

    getContacts();
  }, []);

  return (
    <>
      <div className="mx-auto max-w-[370px] px-4">
        <Navbar />

        <div className=" relative flex items-center">
          <FaSearch className="absolute ml-2 text-2xl text-white" />
          <input
            onChange={searchContacts}
            className="h-10 flex-grow rounded-md border border-white bg-transparent pl-10 text-white"
            placeholder="Search Contacts..."
          ></input>
          <FaCirclePlus
            onClick={onOpen}
            className="ml-3 cursor-pointer text-5xl text-white"
          />
        </div>
        <div>
          {contacts.length <= 0 ? (
            <NotFound></NotFound>
          ) : (
            contacts?.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddUpdateContacts
        isModalOpen={isModalOpen}
        onClose={onClose}
      ></AddUpdateContacts>
      <ToastContainer position="bottom-center"></ToastContainer>
    </>
  );
};

export default App;
