
import React, { lazy, useState, useEffect } from 'react';
import AuthService from "../../utils/AuthService";
import { CButton, CCol, CRow } from "@coreui/react";
import { Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import MyDialog from "./MyDialog.js";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Posts = () => {
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


  const auth = new AuthService();
  const [posts, setPosts] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${apiUrl}/admin/posts/all`, {
        method: 'get',
        headers: {
          "Content-Type": 'application/json',
          "x-auth-token": auth.getToken()
        }
      })
        .then(res => res.json())
        .then(
          (result) => {
            if (!result.success) {
              throw (result);
            }
            // console.log("result", result.users);
            setPosts(result.posts);
          }
        ).catch(err => {
          console.log(err);
        });
    }

    auth.isAuthenticated && fetchData();
  }, []);

  const data = posts && posts;

  const columns = [
    {
        title: "Name",
        field: "name",
    },
    {
      title: "Location",
      field: "location",
    },
    {
      title: "Status",
      field: "isApproved",
    },
  ];
  return (
    <div>
      <MaterialTable
        title="Posts"
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
            tooltip: "Edit Post",
            onClick: (event, rowData) => {
              setIsDialogOpen(true);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Post",
            onClick: (event, rowData) => {
              setIsDeleteDialogOpen(true);
            },
          },
        ]}
      />

      <MyDialog
        title="Approve Post"
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      >
        <Paper style={{ padding: "2em" }}>
        <div>
        <p>Are you sure you want to approve the post?</p>
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
        title="Delete Post"
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <Paper style={{ padding: "2em" }}>
          <div>
            <p>Are you sure you want to delete the post?</p>
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

export default Posts;
