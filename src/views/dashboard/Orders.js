
import React, { lazy, useState, useEffect } from 'react';
import AuthService from "../../utils/AuthService";
import { CButton, CCol, CRow } from "@coreui/react";
import { Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import MyDialog from "./MyDialog.js";

const WidgetsDropdown = lazy(() => import("../widgets/WidgetsDropdown.js"));
const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));

const Orders = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentOrder, hsetCurrentOrder] = useState();
  const [isSuccess, setSuccess] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const auth = new AuthService();
  const [orders, setOrders] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  
  const handleDialogClose = (event) => {
    setIsDialogOpen(false);
  };

  const handleDeleteDialogClose = (event) => {
    setIsDeleteDialogOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`${apiUrl}/admin/orders/all`, {
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
            setOrders(result.orders);
            setIsLoading(false);
          }
        ).catch(err => {
          console.log(err);
        });
    }

    auth.isAuthenticated && fetchData();
  }, [isSuccess, currentOrder]);

  const data = orders;

  const columns = [
     {
        title: "Product Name",
        field: "productName",
    },
    {
      title: "Posted By",
      field: "postedByName",
    },
    {
      title: "Posted By Email",
      field: "postedByEmail",
    },
    {
      title: "Buyer Name",
      field: "buyerName",
    },
    {
      title: "Buyer Email",
      field: "buyerEmail",
    },
  ];
  return (
    <div>
      <MaterialTable
        title="Orders"
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
            icon: "visibility",
            tooltip: "View Order",
            onClick: (event, rowData) => {
              setIsDialogOpen(true);
              hsetCurrentOrder(rowData);
            },
          }
        ]}
      />

      <MyDialog
       title="Order Details"
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
      >
      <Paper style={{ padding: "2em" }}>
      {currentOrder && 
        <div> 
          <p><b>Title:</b> {currentOrder.productName}</p>
          <p><b>Description:</b> {currentOrder.description}</p>
          <p><b>Posted By:</b> {currentOrder.postedByName}</p>
          <p><b>Posted Email:</b> {currentOrder.postedByEmail}</p>
          <p><b>Buyer Name:</b> {currentOrder.buyerName}</p>
          <p><b>Buyer Email:</b> {currentOrder.buyerEmail}</p>
          <p><b>Date:</b> {currentOrder.date}</p>
      </div> }

        <div style={{ marginTop: "3em" }}>
          <CRow className="align-items-center">
            <CCol col="12" xl className="mb-3 mb-xl-0">
              <CButton block color="danger" onClick={handleDialogClose}>
                Close
              </CButton>
            </CCol>
          </CRow>
        </div>
      </Paper>
      </MyDialog>
    </div>
  );
};

export default Orders;
