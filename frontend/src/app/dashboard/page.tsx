"use client";
import PrivateRoute from "../../components/containers/PrivateRoute";
import { Fab, Pagination, PaginationItem } from "@mui/material";
import AddEditContactModal from "@/components/modals/AddUser";
import {
  addEditUser,
  deleteUserContact,
  nextSet,
  setCurrentOffset,
  USER_LIST_FETCH_COUNT,
  userContacts,
} from "@/model/contact/userListService";
import { UserContact } from "shared";
import { useEffect } from "react";
import { useStore } from "effector-react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useConfirm } from "material-ui-confirm";
export default function Dashboard() {
  const userContactsData = useStore(userContacts);
  const confirm = useConfirm();
  useEffect(() => {
    nextSet();
  }, []);
  return (
    <PrivateRoute>
      <div
        className={
          "w-full min-w-full border-box max-w-full h-auto min-h-screen flex flex-col items-center justify-start p-10"
        }
      >
        {userContactsData?.count ? (
          <>
            <br />
            <br />
            <br />
            <div
              className={
                "w-full min-w-full max-w-full xs:grid flex items-center justify-between m-3"
              }
              style={{ borderBottom: "1px solid #FFFFFF" }}
            >
              <span
                className={
                  "w-1/4 min-w-1/4 max-w-1/4 font-rem text-xl text-white"
                }
              >
                NAME
              </span>
              <span
                className={
                  "w-1/4 min-w-1/4 max-w-1/4 font-rem text-xl text-white"
                }
              >
                PHONE
              </span>
              <span
                className={
                  "w-1/4 min-w-1/4 max-w-1/4 font-rem text-xl text-white"
                }
              >
                EMAIL
              </span>
              <div
                className={
                  "w-1/4 min-w-1/4 max-w-1/4 font-rem text-xl text-white flex items-center justify-end"
                }
              />
            </div>
            {userContactsData?.data.map((userContact) => (
              <>
                <div
                  className={
                    "w-full min-w-full max-w-full xs:grid flex items-center justify-between m-3"
                  }
                >
                  <span
                    className={
                      "w-1/4 min-w-1/3 max-w-1/4 font-rem text-xl text-white"
                    }
                  >
                    {userContact.name}
                  </span>
                  <span
                    className={
                      "w-1/4 min-w-1/3 max-w-1/4 font-rem text-xl text-white"
                    }
                  >
                    {userContact.phone}
                  </span>
                  <span
                    className={
                      "w-1/4 min-w-1/3 max-w-1/4 font-rem text-xl text-white"
                    }
                  >
                    {userContact.email}
                  </span>
                  <div
                    className={
                      "w-1/4 min-w-1/4 max-w-1/4 font-rem gap-8 text-xl text-white flex items-center justify-end"
                    }
                  >
                    <EditIcon
                      style={{ color: "white" }}
                      onClick={() => addEditUser(userContact)}
                    />
                    <DeleteIcon
                      style={{ color: "white" }}
                      onClick={async () => {
                        await confirm({
                          title:
                            "Are you sure you want to delete this contact?",
                          description: `This will permanently delete "${userContact.name}" from your contacts`,
                        });
                        await deleteUserContact(userContact);
                      }}
                    />
                  </div>
                </div>
              </>
            ))}
            <br />
            <br />
            <br />
            <div className="w-auto rounded-xl bg-gray-100 bg-opacity-50 px-6 py-4">
              <Pagination
                count={Math.ceil(
                  userContactsData?.count / USER_LIST_FETCH_COUNT,
                )}
                page={userContactsData?.offset / USER_LIST_FETCH_COUNT + 1}
                color={"primary"}
                sx={{
                  button: { color: "#ffffff", fontSize: "1.5rem" },
                  text: { color: "#ffffff", fontSize: "1.5rem" },
                }}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                    sx={{
                      "& .MuiPaginationItem-root": {
                        color: "#ffffff",
                        fontSize: "1.5rem",
                      },
                    }}
                  />
                )}
                onChange={(_, page: number) => {
                  console.log("in Pagination, page is: " + page);
                  setCurrentOffset((page - 1) * USER_LIST_FETCH_COUNT);
                }}
              />
            </div>
          </>
        ) : (
          <div className={"w-full h-full items-center justify-center"}>
            <h2 className={"text-center font-rem text-5xl"}>
              No Records Available
            </h2>
          </div>
        )}
        <Fab
          style={{
            position: "fixed",
            bottom: "5vw",
            right: "5vw",
            backgroundColor: "#2196F3",
          }}
          onClick={() => {
            addEditUser({
              name: "",
              phone: "",
              email: "",
            } as unknown as UserContact);
          }}
        >
          <span style={{ fontSize: "2rem", color: "white" }}>+</span>
        </Fab>
        <AddEditContactModal />
      </div>
    </PrivateRoute>
  );
}
