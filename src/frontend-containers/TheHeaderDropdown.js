import CIcon from '@coreui/icons-react';
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';
import AuthService from "../utils/AuthService";
const TheHeaderDropdown = () => {
  const history = useHistory();
  const auth = new AuthService();

  const signOut = (event) => {
    auth.logout();
    history.push("/");
  };

  const profile = (event) => {
    history.push("/profile");
  };

  const order = (event) => {
    history.push("/my-orders");
  };

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div class="d-flex align-items-center"> <div className="c-avatar">
          <CImg
            src={'https://res.cloudinary.com/rajith/image/upload/v1626406581/feed%20the%20need/download_bovubh.jpg'}
            className="c-avatar-img mr-3"
            alt="admin@bootstrapmaster.com"
          />
        </div>
         <div className="wordBreak">{localStorage.getItem("name")}</div> 
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/* <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem> 
         <CDropdownItem>
          <CIcon name="cil-bell" className="mfe-2" />
          Updates
          <CBadge color="info" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-envelope-open" className="mfe-2" />
          Messages
          <CBadge color="success" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-task" className="mfe-2" />
          Tasks
          <CBadge color="danger" className="mfs-auto">42</CBadge>
        </CDropdownItem>
        <CDropdownItem>
          <CIcon name="cil-comment-square" className="mfe-2" />
          Comments
          <CBadge color="warning" className="mfs-auto">42</CBadge>
        </CDropdownItem> */}

        <CDropdownItem onClick={profile}>
          <CIcon name="cil-user" className="mfe-2" />Profile
        </CDropdownItem>
        <CDropdownItem onClick={order}>
          <CIcon name="cil-basket" className="mfe-2" />
          Orders
        </CDropdownItem>
        <CDropdownItem divider />
        <CDropdownItem onClick={signOut}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Signout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
