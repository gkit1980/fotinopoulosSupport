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

import { useState } from "react";

// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";

import LanguageIcon from '@mui/icons-material/Language';

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/rsz_shutterstock.jpg";
import logo_fotinopoulos from 'assets/images/Fotinopoulos_logo_name.png';


function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const handleSignIn = async (username,password) => {
    try {

       // Validate the inputs
      if (!username || !password) {
        console.error('Username and password are required');
        return;
      }

      // Fetch username and password from the database
      const response = await fetch('https://entypafotinopoulosserver.azurewebsites.net/authenticate/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
           'Access-Control-Allow-Origin': '*'
        }
      });

      if (response.ok) {
        // Redirect to dashboard
      
        window.location.href = '/dashboard';
      } else {
        // Display client error
        console.error('Authentication failed');
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  return (
    <BasicLayout image={bgImage} >
      <img src={logo_fotinopoulos} alt="description of image" style={{ position: 'absolute', top: 0, left: 0 , width: '30vw' }} />
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Είσοδος στο σύστημα
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={3}>
              <MDTypography component={MuiLink} href="https://www.facebook.com/teletesfoteinopoulos.gr" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={3}>
              <MDTypography component={MuiLink} href="https://teletesfoteinopoulos.gr" variant="body1" color="white">
                <LanguageIcon color="inherit" />
              </MDTypography>
            </Grid>
            {/* <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid> */}
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput type="email" label="Email" fullWidth value={email} onChange={e => setEmail(e.target.value)}  />
            </MDBox>
            <MDBox mb={2}>
              <MDInput type="password" label="Κωδικός" fullWidth value={password} onChange={e => setPassword(e.target.value)}  />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Να με θυμάσαι
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={()=>handleSignIn(email,password)}>
                Είσοδος
              </MDButton>
            </MDBox>
            {/* <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox> */}
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
