
import { CButton, CCol, CRow } from "@coreui/react";
import { Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import React, { lazy, useEffect, useState } from 'react';
import AuthService from "../../utils/AuthService";
import MyDialog from "./MyDialog.js";
import Pusher from 'pusher-js';

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Users = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [rowData, setRowData] = useState("");
  const auth = new AuthService();
  const [users, setUsers] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleDialogClose = (event) => {
    setIsDialogOpen(false);
  };

  const handleDeleteDialogClose = (event) => {
    setIsDeleteDialogOpen(false);
  };

  const handleDialogBlock = async (event, rowData) =>{

      await fetch(`${apiUrl}/admin/users/${rowData._id}`, {
        method: 'put',
        headers: {
          "Content-Type": 'application/json',
          "x-auth-token": auth.getToken()
        },
        body: JSON.stringify({
         "isBlocked" : !rowData.isBlocked
        })
      })
        .then(res => res.json())
        .then(
          (result) => {
            if (!result.success) {
              throw (result);
            }
            // console.log("result", result);
            setUsers(result.users);
            handleDeleteDialogClose();
          }
        ).catch(err => {
          console.log(err);
        });
  };


  const handleDialogAdmin = async (event, rowData) =>{

    await fetch(`${apiUrl}/admin/users/${rowData._id}`, {
      method: 'put',
      headers: {
        "Content-Type": 'application/json',
        "x-auth-token": auth.getToken()
      },
      body: JSON.stringify({
       "admin" : !rowData.admin
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (!result.success) {
            throw (result);
          }
          setUsers(result.users);
          handleDialogClose();
        }
      ).catch(err => {
        console.log(err);
      });
};

  const rerender = () => {
    const fetchData = async () => {
      await fetch(`${apiUrl}/admin/users/all`, {
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
            setUsers(result.users);
            setIsLoading(false);
          }
        ).catch(err => {
          console.log(err);
        });
    }

    auth.isAuthenticated && fetchData();
  }

  useEffect(() => {
    const pusher = new Pusher('cf5a8b64cd1a3450c0cf', {
      cluster: 'us2',
      encrypted: true
    });
    const channel = pusher.subscribe('1221714');
    channel.bind('re-render', data => {
      rerender();
    });
    rerender();
  }, []);

  const data = users && users;


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
      title: "Blocked",
      field: "isBlocked",
      render: rowData => {
        return rowData.isBlocked === true ? <p style={{fontSize: '1rem'}} className="badge badge-danger">Blocked</p> : <p style={{fontSize: '1rem'}} className="badge badge-success">Active</p>}
    },
  ];
  return (
    <div>
      <MaterialTable
        title="Users"
        data={data}
        columns={columns}
        isLoading={isLoading}
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
              setRowData(rowData)
            },
          },
          {
            icon: "block",
            tooltip: "Block/UnBlock User",
            onClick: (event, rowData) => {
              setIsDeleteDialogOpen(true);
              setRowData(rowData)
            },
          },
        ]}
      />

      <MyDialog
        title={rowData && rowData.admin ? "Remove Admin" : "Create Admin" }
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      >
        <Paper style={{ padding: "2em" }}>
        <div>
        {rowData && rowData.admin ?  <p>Are you sure you want to remove Admin for this user?</p> : 
          <p>Are you sure you want to make Admin for this user?</p> }
      </div>

      <div style={{ marginTop: "3em" }}>
        <CRow className="align-items-center">
          <CCol col="12" xl className="mb-3 mb-xl-0">
            <CButton block color="primary" onClick={(e) => handleDialogAdmin(e, rowData)}>
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
        title={rowData && rowData.isBlocked ? "UnBlock User" : "Block User" }
        isOpen={isDeleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <Paper style={{ padding: "2em" }}>
          <div>
           {rowData && rowData.isBlocked ? <p>Are you sure you want to unblock the user?</p>
           : <p>Are you sure you want to block the user?</p>}
          </div>

          <div style={{ marginTop: "3em" }}>
            <CRow className="align-items-center">
              <CCol col="12" xl className="mb-3 mb-xl-0">
                <CButton block color="primary" onClick={(e) => handleDialogBlock(e, rowData)}>
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
