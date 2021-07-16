
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
  const [isLoading, setIsLoading] = useState(true);
  const [currentPost, setCurrentPost] = useState();
  const [isSuccess, setSuccess] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const auth = new AuthService();
  const [posts, setPosts] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleCurrentPost = async (event, rowData) => {
    await fetch(`${apiUrl}/admin/posts/${rowData._id}`, {
      method: 'put',
      headers: {
        "Content-Type": 'application/json',
        "x-auth-token": auth.getToken()
      },
      body: JSON.stringify({
       "isApproved" : !rowData.isApproved
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (!result.success) {
            throw (result);
          }
          setCurrentPost(result.posts);
          handleDialogClose();
        }
      ).catch(err => {
        console.log(err);
      });
  };

  const handleDeleteCurrentPost = async (event, rowData) => {
    await fetch(`${apiUrl}/admin/posts/${rowData._id}`, {
      method: 'delete',
      headers: {
        "Content-Type": 'application/json',
        "x-auth-token": auth.getToken()
      },
     })
      .then(res => res.json())
      .then(
        (result) => {
          if (!result.success) {
            throw (result);
          }
          setSuccess(result.success);
          handleDeleteDialogClose();
        }
      ).catch(err => {
        console.log(err);
      });
  };
  

  const handleDialogClose = (event) => {
    setIsDialogOpen(false);
  };

  const handleDeleteDialogClose = (event) => {
    setIsDeleteDialogOpen(false);
  };

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
            setIsLoading(false);
          }
        ).catch(err => {
          console.log(err);
        });
    }

    auth.isAuthenticated && fetchData();
  }, [isSuccess, currentPost]);

  const data = posts && posts;

  const columns = [
    {
      field: 'image',
      title: 'Image',
      render: rowData => <img src={rowData.image} style={{width: 50, height: 50, borderRadius: '50%'}}/>
    },
    {
        title: "Name",
        field: "name",
    },
    {
      title: "Email",
      field: "email",
    },
    {
      title: "Location",
      field: "location",
    },
    {
      title: "Post Status",
      field: "isApproved",
      render: rowData => {
        return rowData.isApproved === true ? <p style={{fontSize: '1rem'}} className="badge badge-success" >Yes</p> : <p style={{fontSize: '1rem'}} className="badge badge-danger">No</p>}
    },
  ];
  return (
    <div>
      <MaterialTable
        title="Posts"
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
            tooltip: "Edit Post",
            onClick: (event, rowData) => {
              setIsDialogOpen(true);
              setCurrentPost(rowData);
            },
          },
          {
            icon: "delete",
            tooltip: "Delete Post",
            onClick: (event, rowData) => {
              setIsDeleteDialogOpen(true);
              setCurrentPost(rowData);
            },
          },
        ]}
      />

      <MyDialog
       title={currentPost && currentPost.isApproved ? "Disapprove Post" : "Approve Post" }
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      >
        <Paper style={{ padding: "2em" }}>
        <div>
       {currentPost && currentPost.isApproved ?<p>Are you sure you want to disapprove the post?</p>
       : <p>Are you sure you want to approve the post?</p> }
      </div>

      <div style={{ marginTop: "3em" }}>
        <CRow className="align-items-center">
          <CCol col="12" xl className="mb-3 mb-xl-0">
            <CButton block color="primary" onClick={(e)=>handleCurrentPost(e, currentPost)}>
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
                <CButton block color="primary"  onClick={(e)=>handleDeleteCurrentPost(e, currentPost)}>
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
