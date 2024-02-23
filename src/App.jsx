import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { FaSearch } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./config/firebase";

const App = () => {
  //const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        const contactsSnapshot = await getDocs(contactsRef);
        const contactLists = contactsSnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });
        console.log(data);
      } catch (error) {}
    };

    getContacts();
  }, []);

  return (
    <div className="mx-auto max-w-[370px] px-4">
      <Navbar />

      <div className=" relative flex items-center">
        <FaSearch className="absolute ml-2 text-2xl text-white" />
        <input className="h-10 flex-grow rounded-md border border-white bg-transparent pl-10 text-white"></input>
        <FaCirclePlus className="ml-3 cursor-pointer text-5xl text-white  " />
      </div>
    </div>
  );
};

export default App;
