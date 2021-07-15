import { CButton, CCol, CRow } from "@coreui/react";
import { Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { lazy, useState } from "react";
import MyDialog from "./MyDialog.js";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Users = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [dialogWord, setDialogWord] = useState("");
  const [dialogId, setDialogId] = useState("");
  const [value, setValue] = useState(false);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleDialogClose = (event) => {
    setIsDialogOpen(false);
  };

  const handleDeleteDialogClose = (event) => {
    setIsDeleteDialogOpen(false);
  };

  const data = [
    { name: "John", email: "john@gmail.com", age: 12, gender: "Male" },
    { name: "Bren", email: "bren@gmail.com", age: 24, gender: "Male" },
    { name: "Marry", email: "marry@gmail.com", age: 18, gender: "Female" },
    { name: "Shohail", email: "shohail@gmail.com", age: 25, gender: "Male" },
    { name: "Aseka", email: "aseka@gmail.com", age: 19, gender: "Female" },
    { name: "Meuko", email: "meuko@gmail.com", age: 12, gender: "Female" },
  ];

  const columns = [
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Age",
      field: "age",
    },
    {
      title: "Gender",
      field: "gender",
    },
  ];
  return (
    <div>
      <MaterialTable
        title="Users"
        data={data}
        columns={columns}
        options={{
          search: true,
          paging: true,
          filtering: true,
          exportButton: true,
          actionsColumnIndex: -1,
        }}
        actions={[
          {
            icon: "edit",
            tooltip: "Edit User",
            onClick: (event, rowData) => {
              setIsDialogOpen(true);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) => {
              setIsDeleteDialogOpen(true);
            },
          },
        ]}
      />

      <MyDialog
        title="Block User"
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      >
        <Paper style={{ padding: "2em" }}>
        <div>
        <p>Are you sure you want to block the user?</p>
      </div>

      <div style={{ marginTop: "3em" }}>
        <CRow className="align-items-center">
          <CCol col="12" xl className="mb-3 mb-xl-0">
            <CButton block color="primary">
              Yes
            </CButton>
          </CCol>
          <CCol col="12" xl className="mb-3 mb-xl-0">
            <CButton block color="danger" onClick={handleDialogClose}>
              No
            </CButton>
          </CCol>
        </CRow>
      </div>
        </Paper>
      </MyDialog>

      <MyDialog
        title="Delete User"
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <Paper style={{ padding: "2em" }}>
          <div>
            <p>Are you sure you want to delete the user?</p>
          </div>

          <div style={{ marginTop: "3em" }}>
            <CRow className="align-items-center">
              <CCol col="12" xl className="mb-3 mb-xl-0">
                <CButton block color="primary">
                  Yes
                </CButton>
              </CCol>
              <CCol col="12" xl className="mb-3 mb-xl-0">
                <CButton block color="danger" onClick={handleDeleteDialogClose}>
                  No
                </CButton>
              </CCol>
            </CRow>
          </div>
        </Paper>
      </MyDialog>
    </div>
  );
};

export default Users;
