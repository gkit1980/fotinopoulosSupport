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

import { useState,useContext} from "react";

import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';
// Images
import fotinopoulos from "assets/images/fotinopoulos.png";
import DialogFuneral from "components/DialogFuneral";
import { makeStyles } from '@mui/styles'
import { AuthContext } from "../../context/auth-context";

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

  const auth = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const [createFuneral, setCreateFuneral] = useState(false);


  const classes = useStyles();
  const {columns,rows} = funeralsTableData(searchValue,open,setIsLoading,createFuneral)


  const handleClick = () => {
    setOpen(true);
    
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const notifyCreateEvent = (formData) => {

    const createdNotificationFormData = {
      title: 'Νέα Κηδεία',
      message: `Η κηδεία του ${formData.fullname} έχει δημιουργηθεί απο τον χρήστη ${auth.username}`,
      user: `${auth.username}`,
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


      setCreateFuneral(true);

       
      //funeral Dates

      const partsBurialDate = formData.burialDate.split("/");
      const yearBurialDate = parseInt(partsBurialDate[2], 10);
      const monthBurialDate = parseInt(partsBurialDate[1], 10) - 1; // Month is 0-indexed in JavaScript Date
      const dayBurialDate = parseInt(partsBurialDate[0], 10);

      const dateObjectBurialDate = new Date(yearBurialDate, monthBurialDate, dayBurialDate);


      const parts = formData.idPublicationDate.split("/");
      const year = parseInt(parts[2], 10);
      const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript Date
      const day = parseInt(parts[0], 10);

      const dateObject = new Date(year, month, day);


      ///Relative Dates
      const partsRel = formData.rel_birthdate.split("/");
      const yearRel = parseInt(partsRel[2], 10);
      const monthRel = parseInt(partsRel[1], 10) - 1; // Month is 0-indexed in JavaScript Date
      const dayRel = parseInt(partsRel[0], 10);

      const dateObjectRelBirthDate = new Date(yearRel, monthRel, dayRel);


      const partsRelIdPublicationDate = formData.rel_idPublicationDate.split("/");
      const yearRelIdPublicationDate = parseInt(partsRelIdPublicationDate[2], 10);
      const monthRelIdPublicationDate = parseInt(partsRelIdPublicationDate[1], 10) - 1; // Month is 0-indexed in JavaScript Date
      const dayRelIdPublicationDate = parseInt(partsRelIdPublicationDate[0], 10);

      const dateObjectRelIdPublicationDate = new Date(yearRelIdPublicationDate, monthRelIdPublicationDate, dayRelIdPublicationDate);

      //end
     

    const createdFuneralFormData = {
      burialDate: dateObjectBurialDate,
      church: formData.church,
      burialLocation: formData.burialLocation,
      receiptNumber: formData.receiptNumber,
      hasDocument: formData.hasDocument,
      hasRequest: formData.hasRequest,
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
      otherInfo: formData.otherInfo
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
      birthDate: dateObjectRelBirthDate,
      birthlocation: formData.rel_birthlocation,
      residence: formData.rel_residence,
      idNumber: formData.rel_idNumber,
      idPublicationDate: dateObjectRelIdPublicationDate,
      idAuthority: formData.rel_idAuthority,
      afm: formData.rel_afm,
      doy: formData.rel_doy,
      amka: formData.rel_amka,
      phone: formData.rel_phone,
      phone2: formData.rel_phone2,
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
                setIsLoading(false);

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
                


                  setCreateFuneral(false);
                  notifyCreateEvent(formData);
                  
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
