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
import Button from '@mui/material/Button'; // Import Material-UI Button


// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";


function NotificationsOverview() {

  const [notifications, setNotifications] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 20; // Number of notifications per page

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


  // Pagination logic
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications ? notifications.slice(indexOfFirstNotification, indexOfLastNotification) : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
         Τελευταίες Ενέργειες
        </MDTypography>
        <MDBox mt={1} mb={2}>
       <div>
              {notifications==null ? (
              <Skeleton width={1000} height={20}/>
          ) : (
            <ul>
              {currentNotifications.map((notification, index) => (
                <li key={index}>
                <MDTypography variant="h6" fontWeight="regular" k>{notification.title}:{notification.message} στίς {formatDate(notification.createdAt)}</MDTypography>
                </li>

              ))}
            </ul>
          )}
        </div>
        {notifications && (
          <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '20px',gap: '20px' }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                style={{ color: 'white' }}
              >
                Προηγούμενο
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => paginate(currentPage + 1)}
                disabled={indexOfLastNotification >= notifications.length}
                style={{ color: 'white' }}
              >
                Επόμενο
              </Button>
            </div>
          )}
        </MDBox>
      </MDBox>
 
    </Card>
  );
}

export default NotificationsOverview;
