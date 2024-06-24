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
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'; // Import skeleton CSS

import { useEffect,useState } from "react";



// Dashboard componentsimport Projects from "layouts/dashboard/components/Projects";
import NotificationsOverview from "layouts/dashboard/components/NotificationsOverview";
import { set } from "date-fns";


function Dashboard() {
  const { sales, tasks } = reportsLineChartData;

  const [countFunerals,setCountFunerals] = useState(0);
  const [countMemorials,setCountMemorials] = useState(0);




  useEffect(() => {
    fetch('https://entypafotinopoulosserver.azurewebsites.net/funeral/')
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setCountFunerals(data.length);
        // setIsLoading(false);
      });
  }, []);
  
  
  
  useEffect(() => {
    fetch('https://entypafotinopoulosserver.azurewebsites.net/memorial/')
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setCountMemorials(data.length);
        // setMappedData(data);
        // setIsLoading(false);
      });
  }, []);
  



  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={4}>

          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="leaderboard"
                title="Κηδείες"
                count={countFunerals === 0 ? <Skeleton width={50} /> : countFunerals}
                percentage={{
                  color: "success",
                  amount: "+3%",
                  label: "απο τον προηγούμενο μήνα",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="store"
                title="Μνημόσυνα"
                count={countMemorials === 0 ? <Skeleton width={50} /> : countMemorials}
                percentage={{
                  color: "success",
                  amount: "+1%",
                  label: "απο τον προηγούμενο μήνα",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Κηδείες την εβδομαδα"
                  description="Εβδομαδιαία αναφορά"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Μνημόσυνα"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in today sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid> */}
            {/* <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="completed tasks"
                  description="Last Campaign Performance"
                  date="just updated"
                  chart={tasks}
                />
              </MDBox>
            </Grid> */}
          </Grid>
        </MDBox>
        <MDBox>
          <Grid container spacing={0}>
            <Grid item xs={12} md={12} lg={12}>
              <NotificationsOverview />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
