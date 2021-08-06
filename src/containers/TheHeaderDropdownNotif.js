import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CProgress
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import Pusher from 'pusher-js';
import React, { lazy, useEffect, useState } from 'react';

const TheHeaderDropdownNotif = () => {
  const [count, setCount] = useState(0);
  const [notificationData, setNotificationData] = useState([]);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    const pusher = new Pusher('cf5a8b64cd1a3450c0cf', {
      cluster: 'us2',
      encrypted: true
    });
    const channel = pusher.subscribe('1221714');
    channel.bind('re-render', data => {
      setNewData(prevArray => [...prevArray, data]);
    });

  }, []);

  useEffect(() => {

    if (newData.length < 6) {
      setCount(newData.length);
      setNotificationData(newData);
      if (newData.length == 5) {
        setCount("5+");
      }
    }
  }, [newData]);


  const updateData = (item) => {
    var results = notificationData.filter(function (entry) {
      return entry.id != item.id
    });
    setNotificationData(results);
    setCount(results.length);
    setNewData(results);
  }


  return (
    <CDropdown
      inNav
      className="c-header-nav-item mx-2"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <CIcon name="cil-bell" />
        <CBadge shape="pill" color="danger">{count}</CBadge>
      </CDropdownToggle>
      <CDropdownMenu placement="bottom-end" className="pt-0">
        <CDropdownItem
          header
          tag="div"
          className="text-center"
          color="light"
        >
          <strong>You have {count} notifications</strong>
        </CDropdownItem>
        {notificationData && notificationData.map((item, i) =>
          item.type == "users" ?
            <CDropdownItem key={i} onClick={(e) => updateData(item)}><CIcon name="cil-user-follow" className="mr-2 text-success" />
              {item.username} {item.message}</CDropdownItem>
            :
            <CDropdownItem key={i} onClick={(e) => updateData(item)}><CIcon name="cil-user-follow" className="mr-2 text-success" />
              {item.message} by {item.username}.</CDropdownItem>
        )}
        {/*<CDropdownItem><CIcon name="cil-user-unfollow" className="mr-2 text-danger" /> User deleted</CDropdownItem>
        <CDropdownItem><CIcon name="cil-chart-pie" className="mr-2 text-info" /> Sales report is ready</CDropdownItem>
        <CDropdownItem><CIcon name="cil-basket" className="mr-2 text-primary" /> New client</CDropdownItem>
        <CDropdownItem><CIcon name="cil-speedometer" className="mr-2 text-warning" /> Server overloaded</CDropdownItem> */}
        {/* <CDropdownItem
          header
          tag="div"
          color="light"
        >
          <strong>Server</strong>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>CPU Usage</b></small>
          </div>
          <CProgress size="xs" color="info" value={25} />
          <small className="text-muted">348 Processes. 1/4 Cores.</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>Memory Usage</b></small>
          </div>
          <CProgress size="xs" color="warning" value={70} />
          <small className="text-muted">11444GB/16384MB</small>
        </CDropdownItem>
        <CDropdownItem className="d-block">
          <div className="text-uppercase mb-1">
            <small><b>SSD 1 Usage</b></small>
          </div>
          <CProgress size="xs" color="danger" value={90} />
          <small className="text-muted">243GB/256GB</small>
        </CDropdownItem> */}
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdownNotif