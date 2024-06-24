/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import React, { useEffect,useState } from 'react';
import Skeleton from 'react-loading-skeleton';


// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";


function NotificationsOverview() {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
     
    fetch('https://entypafotinopoulosserver.azurewebsites.net/notification/')
    .then(response => response.json())
    .then(data => {

      data.sort((a, b) => {
        // Convert createdAt to Date objects if they are not already
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
      
        return dateB - dateA; // For ascending order; use `dateB - dateA` for descending
      });
      console.log('Success:', data);
      setNotifications(data);
     
    });
    
}, []);


const formatDate = (isoString) => {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};


  


  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
         Τελευταίες Ενέργειες
        </MDTypography>
        <MDBox mt={1} mb={2}>
       <div>
              {notifications.length === 0 ? (
              <Skeleton width={1000} height={20}/>
          ) : (
            <ul>
              {notifications.map((notification, index) => (
                <li key={index}>
                <MDTypography variant="h6" fontWeight="regular" k>{notification.title}:{notification.message} στίς {formatDate(notification.createdAt)}</MDTypography>
                </li>

              ))}
            </ul>
          )}
        </div>

        </MDBox>
      </MDBox>
      {/* <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title="$2400, Design changes"
          dateTime="22 DEC 7:20 PM"
        />
        <TimelineItem
          color="error"
          icon="inventory_2"
          title="New order #1832412"
          dateTime="21 DEC 11 PM"
        />
        <TimelineItem
          color="info"
          icon="shopping_cart"
          title="Server payments for April"
          dateTime="21 DEC 9:34 PM"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title="New card added for order #4395133"
          dateTime="20 DEC 2:20 AM"
        />
        <TimelineItem
          color="primary"
          icon="vpn_key"
          title="New card added for order #4395133"
          dateTime="18 DEC 4:54 AM"
          lastItem
        />
      </MDBox> */}
    </Card>
  );
}

export default NotificationsOverview;
