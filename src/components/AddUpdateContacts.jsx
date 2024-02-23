import React from "react";
import Modal from "./Modal";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { addDoc, updateDoc, doc, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValiadation = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const AddUpdateContacts = ({ isModalOpen, onClose, isUpdate, contact }) => {
  const addContacts = async (contact) => {
    try {
      const contactRef = collection(db, "contacts"); // grabing our collection made on firebase (contacts)
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateContacts = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts", id); // grabing our collection made on firebase (contacts)
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isModalOpen={isModalOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValiadation}
          initialValues={
            isUpdate
              ? { name: contact.name, email: contact.email }
              : { name: "", email: "" }
          }
          onSubmit={(values) => {
            console.log(values);
            isUpdate ? updateContacts(values, contact.id) : addContacts(values);
          }}
        >
          <Form className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name</label>
              <Field name="name" className="h-10 rounded-lg border"></Field>
              <div className="text-xx text-red-500">
                <ErrorMessage name="name"></ErrorMessage>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <Field
                name="email"
                type="email"
                className="h-10 rounded-lg border"
              ></Field>
              <div className="text-xx text-red-500">
                <ErrorMessage name="email"></ErrorMessage>
              </div>
            </div>
            <button
              type="submit"
              className="self-end rounded-lg bg-orange px-3 py-1.5"
            >
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </>
  );
};

export default AddUpdateContacts;
