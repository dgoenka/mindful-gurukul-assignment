"use client";
import { Box, Modal } from "@mui/material";
import { Formik } from "formik";
import { isValidPhoneNumber } from "libphonenumber-js";
import { AuthButton } from "@/components/buttons/AuthButton";
import { useStore } from "effector-react";
import {
  addEditUser,
  userToBeAddedOrEditedStore,
} from "../../model/contact/userListService";
import { useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { UserContact } from "shared";
export default function AddEditContactModal() {
  const userToBeAddedOrEdited = useStore(userToBeAddedOrEditedStore);
  useEffect(() => {
    console.log(
      "in AddEditContactModal, userToBeAddedOrEditedStore is" +
        !!userToBeAddedOrEdited,
    );
  }, [userToBeAddedOrEdited]);
  const handleClose = () => addEditUser(null);
  // @ts-ignore
  const isEditing = () => userToBeAddedOrEdited?.["_id"];

  return userToBeAddedOrEdited ? (
    <>
      <Modal open={true} onClose={handleClose}>
        <Box
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: "1.5rem",
            border: "2px solid transparent",
            boxShadow: "14px",
            padding: "24px",
            gap: "12px",
            display: "flex",
            flexDirection: "column",
            width: "min(90vw, 500px)",
          }}
        >
          <div className={"w-full flex items-center justify-between"}>
            <h2 className={"font-rem text-5xl text-black"}>
              {isEditing() ? "Edit User" : "Add User"}
            </h2>

            <CloseIcon
              style={{ color: "black", cursor: "pointer" }}
              onClick={handleClose}
            />
          </div>
          <Formik
            initialValues={userToBeAddedOrEdited}
            validate={(values) => {
              const errors: any = {};
              if (!values.name) {
                errors.name = "Required";
              }

              if (!values.phone) {
                errors.phone = "Required";
              } else if (!isValidPhoneNumber(values.phone)) {
                errors.phone = "Invalid phone number";
              }

              if (!values.email) {
                errors.email = "Required";
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = "Invalid email address";
              }

              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setTimeout(async () => {
                /*if(isEditing()) {
                   await addContact(values as unknown as UserContact);
                 } else {
                     await editContact({
                         ...addEditUser,
                         ...values,
                     }  as unknown as UserContact);
                 }*/

                setSubmitting(false);
                handleClose();
              }, 400);
            }}
          >
            {({
              // @ts-ignore
              values,
              // @ts-ignore
              errors,
              // @ts-ignore
              touched,
              // @ts-ignore
              handleChange,

              // @ts-ignore
              setFieldValue,
              // @ts-ignore
              handleBlur,
              // @ts-ignore
              handleSubmit,
              // @ts-ignore
              isSubmitting,
            }) => (
              <form
                className={
                  "w-full max-w-[480px]  flex flex-col gap-5 items-center justify-center"
                }
                onSubmit={handleSubmit}
                autoComplete={"off"}
              >
                <div
                  className={"w-full flex flex-col items-center justify-center"}
                >
                  <input
                    className="rounded-full p-4 w-full font-rem text-xl text-black"
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {errors.name && touched.name && errors.name}
                </div>
                <div
                  className={"w-full flex flex-col items-center justify-center"}
                >
                  <input
                    className="rounded-full p-4 w-full font-rem text-xl text-black"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && errors.email}
                </div>

                <div
                  className={"w-full flex flex-col items-center justify-center"}
                >
                  <input
                    className="rounded-full p-4 w-full font-rem text-xl text-black"
                    type="phone"
                    name="phone"
                    placeholder="Phone"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone}
                  />
                  {errors.phone && touched.phone && errors.phone}
                </div>
                <AuthButton type="submit" disabled={isSubmitting}>
                  Save
                </AuthButton>
              </form>
            )}
          </Formik>
        </Box>
      </Modal>
    </>
  ) : null;
}
