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

import { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";

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
import { AuthContext } from "../../../context/auth-context";


function Basic() {

  const auth = useContext(AuthContext);

  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');



  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const navigate = useNavigate(); // Step 2: Call useNavigate to get the navigate function

  const handleSignIn = async (username,password) => {
    setIsLoading(true); // Start loading

    try {
      const response = await fetch('https://entypafotinopoulosserver.azurewebsites.net/authenticate/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
  
      if (!response.ok) {
        setLoginError('Λάθος στοιχεία εισόδου. Παρακαλώ δοκιμάστε ξανά.');
        return; // Exit the function early if response is not OK
      }
  
      const data = await response.json();

      auth.login(data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
    finally {
      setIsLoading(false); // Stop loading after sign-in attempt
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
             {/* Display error message if loginError is not empty */}
         {loginError && (
          <MDBox mt={2} mb={1}>
            <MDTypography variant="caption" color="error">
              {loginError}
            </MDTypography>
          </MDBox>
        )}
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={()=>handleSignIn(email,password)}
                 disabled={isLoading} // Disable button when loading
                >
                 {isLoading ? 'ΦΟΡΤΩΣΗ...' : 'ΕΙΣΟΔΟΣ'} 
              </MDButton>
            </MDBox>
           
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
