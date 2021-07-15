import MaterialTable from "material-table";
import React, { lazy, useState, useEffect } from 'react';
import AuthService from "../../utils/AuthService";

const WidgetsDropdown = lazy(() => import('../widgets/WidgetsDropdown.js'))
const WidgetsBrand = lazy(() => import('../widgets/WidgetsBrand.js'))

const Users = () => {
  const auth = new AuthService();
  const [users, setUsers] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
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
          }
        ).catch(err => {
          console.log(err);
        });
    }

    auth.isAuthenticated && fetchData();
  }, []);

  const data = users && users;
  // [
  //     { name: "John", email: "john@gmail.com", age: 12, gender: "Male" },
  //     { name: "Bren", email: "bren@gmail.com", age: 24, gender: "Male" },
  //     { name: "Marry", email: "marry@gmail.com", age: 18, gender: "Female" },
  //     { name: "Shohail", email: "shohail@gmail.com", age: 25, gender: "Male" },
  //     { name: "Aseka", email: "aseka@gmail.com", age: 19, gender: "Female" },
  //     { name: "Meuko", email: "meuko@gmail.com", age: 12, gender: "Female" },
  //   ];


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
    },
  ];
  return (
    <div>
      <MaterialTable title="Users" data={data} columns={columns} options={{ search: true, paging: true, filtering: true, exportButton: true }} />
    </div>
  )
}

export default Users
