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
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

import { useState,useEffect,useMemo, memo } from "react";

import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
// Images
import fotinopoulos from "assets/images/fotinopoulos.png";
import DialogFuneral from "components/DialogFuneral";
import { makeStyles } from '@mui/styles'

// Data

import funeralsTableData from "layouts/funerals/data/funeralsTableData";




const useStyles = makeStyles({
  logo: {
    width: '90px', // Or any other size
    height: 'auto',
    // Add more styles as needed
  },
});

     

 function Funerals() {

  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);


  const classes = useStyles();
  const {columns,rows} = funeralsTableData(searchValue,open,setIsLoading);


  const handleClick = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const notifyEvent = (formData) => {

    const createdNotificationFormData = {
      title: 'Νέα Κηδεία',
      message: `Η κηδεία του ${formData.fullname} έχει δημιουργηθεί απο τον χρήστη gkit1980@yahoo.com`,
      user: 'gkit1980@yahoo.com',
      createdAt: Date.now(),
    }
  
    fetch('https://entypafotinopoulosserver.azurewebsites.net/notification/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createdNotificationFormData),
    })
  
  
  }

  const handleSubmit = (formData) => 
    {
      setIsLoading(true);
      setOpen(false);


      const parts = formData.idPublicationDate.split("/");
      const year = parseInt(parts[2], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript Date
      const day = parseInt(parts[0], 10);

      const dateObject = new Date(year, month, day);
     

    const createdFuneralFormData = {
      burialDate: formData.burialDate,
      burialLocation: formData.burialLocation,
      afm: formData.afm,
      age: parseInt(formData.age, 10),
      amka: formData.amka,
      anouncementId: formData.anouncementId,
      fatherMotherName: formData.fatherMotherName,
      idAuthority: formData.idAuthority,
      idNumber: formData.idNumber,
      idPublicationDate: dateObject,
      foreas: formData.foreas,
      fullname: formData.fullname,
      id: formData.id,
      placeOfDeath: formData.placeOfDeath,
      profession: formData.profession,
      residence: formData.residence,
      spouseName: formData.spouseName,
    };
  
    const createdAnouncementFormData = {
      brothers: formData.an_brothers,
      childs: formData.an_childs,
      grandchilds: formData.an_grandchilds,
      nieces:formData.an_nieces,
      others:formData.an_others,
      spouse:formData.an_spouse,
      address:formData.an_address,
      wreaths:formData.an_wreaths
    };
  
    const createdRelativeFormData = {
      relationdegree: formData.rel_relationdegree,
      fullname: formData.rel_fullname,
      fatherfullname: formData.rel_fatherfullname,
      motherfullname: formData.rel_motherfullname,
      birthDate: formData.rel_birthdate,
      birthlocation: formData.rel_birthlocation,
      residence: formData.rel_residence,
      idNumber: formData.rel_idNumber,
      idPublicationDate: formData.rel_idPublicationDate,
      idAuthority: formData.rel_idAuthority,
      afm: formData.rel_afm,
      doy: formData.rel_doy,
      amka: formData.rel_amka,
      phone: formData.rel_phone,
      email: formData.rel_email,
      iban: formData.rel_iban,
      taxisCodeUser: formData.rel_taxisCodeUser,
      taxisCodePassword: formData.rel_taxisCodePassword
    }
  
  
  
  
        fetch('https://entypafotinopoulosserver.azurewebsites.net/funeral/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(createdFuneralFormData),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);

                let anouncementId = data.anouncement;
                let relativeId = data.relative;

                fetch(`https://entypafotinopoulosserver.azurewebsites.net/anouncement/${anouncementId}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(createdAnouncementFormData),
                })
                .then(response => response.json())
                .then(data => {
                  console.log('Success:', data);
                
                } )
                .catch((error) => {
                  console.error('Error:', error);
                })



                fetch(`https://entypafotinopoulosserver.azurewebsites.net/relative/${relativeId}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(createdRelativeFormData),
                })
                .then(response => response.json())
                .then(data => {
                  console.log('Success:', data);
                

                  notifyEvent(formData);
                  
                })
                .catch((error) => {
                  console.error('Error:', error);
                }); 



                



  
        })
        .catch((error) => {
          console.error('Error:', error);
        });
  
  
       
  
  
      
  
    }
       

  return (
    <DashboardLayout>
      <DashboardNavbar onSearchChange={handleSearchChange}/>
      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDBox display="flex" alignItems="center" gap={"50vw"} flex-direction="row">
                    <MDTypography variant="h5" color="white">
                    Κηδείες - Πληροφορίες
                    </MDTypography>
                    
                    <MDTypography variant="h6" color="white" onClick={handleClick}>
                    Δημιουργία Εντύπου
                    </MDTypography>
                    <DialogFuneral 
                       logo={fotinopoulos}
                       open={open} 
                       handleClose={handleClose}
                       className={classes.logo}
                       handleSubmit={handleSubmit}
                       createMode={true}
                    />
                </MDBox>

              </MDBox>
              <MDBox pt={3}>
              {
              isLoading ? <LoadingSpinner asOverlay /> : (
                    <DataTable
                        table={{ columns, rows }}
                        isSorted={false}
                        entriesPerPage={false}
                        showTotalEntries={false}
                        noEndBorder
                  />
                  )
              }
              </MDBox>
            </Card>
          </Grid>
  
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Funerals;
