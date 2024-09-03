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

import { useState,useEffect,useContext } from "react";
// Images
import fotinopoulos from "assets/images/fotinopoulos.png";
import DialogMemorial from "components/DialogMemorial";
import { makeStyles } from '@mui/styles'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner';

// Data

import memorialTableData from "layouts/memorials/data/memorialTableData";
import { AuthContext } from "../../context/auth-context";



const useStyles = makeStyles({
  logo: {
    width: '90px', // Or any other size
    height: 'auto',
    // Add more styles as needed
  },
});

     

function Memorials() {

  const auth = useContext(AuthContext);


  const [isLoading, setIsLoading] = useState(true);
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const [create, setCreate] = useState(false); 
  const [sortField, setSortField] = useState('Date'); // Default sort field
  const [sortOrder, setSortOrder] = useState('desc'); // Default sort order

  const classes = useStyles();
  const {columns,rows} = memorialTableData(searchValue,open,create,setIsLoading,sortField, sortOrder);




  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  const stringToDateFormat = (dateString) => {

    if(dateString==null)
      return null;
     /////Fetch existing anouncement data and relative data
     const parts = dateString.split("/");
     const year = parseInt(parts[2], 10);
     const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript Date
     const day = parseInt(parts[0], 10);
  
     const dateObject = new Date(year, month, day);
  
     return dateObject;
  
  }
   

  const handleSubmit = (formData) => 
    {

      setIsLoading(true);
      setOpen(false);
    


        const parts = formData.selectedDate.split("/");
        const year = parseInt(parts[2], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript Date
        const day = parseInt(parts[0], 10);

        const dateObject = new Date(year, month, day);

      const createdMemorialFormData = {
        date: dateObject,
        birthDate: formData.birthDate,
        fortydOrYear: formData.fortydOrYear,
        church: formData.church,
        address: formData.address,
        phones: formData.phones,
        disc: formData.disc,
        cake: formData.cake,
        sakTsantKout: formData.sakTsantKout,
        stolismos: formData.stolismos,
        schedules:formData.schedules,
        fullname: formData.fullname,
        price: formData.price,
        comment: formData.comment,
     };
   
     createdMemorialFormData.birthDate=stringToDateFormat(createdMemorialFormData.birthDate);


     const createdAnouncementFormData = {
      brothers: formData.an_brothers,
      childs: formData.an_childs,
      grandchilds: formData.an_grandchilds,
      nieces:formData.an_nieces,
      others:formData.an_others,
      spouse:formData.an_spouse,
      address:formData.an_address,
      additionalinfo:formData.an_additionalinfo,
      wreaths:formData.an_wreaths
    };



      if(formData.memorialAnouncementId=="")
       {

        //create anouncement
        fetch('https://entypafotinopoulosserver.azurewebsites.net/anouncement/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(createdAnouncementFormData),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);

          setIsLoading(false);

          createdMemorialFormData.anouncement=data._id;    //take the id of the created anouncement and add it to the memorial data

                fetch('https://entypafotinopoulosserver.azurewebsites.net/memorial/', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(createdMemorialFormData),
                })  
                .then(response => response.json())
                .then(data => {
                  console.log('Success:', data);
                  setCreate(true);
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
      else
      {

        fetch('https://entypafotinopoulosserver.azurewebsites.net/memorial/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(createdMemorialFormData),
        })  
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setCreate(true);
          notifyEvent(formData);

  
        })
        .catch((error) => {
          console.error('Error:', error);
        });

       //update anouncement
        fetch(`https://entypafotinopoulosserver.azurewebsites.net/anouncement/${formData.memorialAnouncementId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(createdAnouncementFormData),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          setSelectedRow(null);
        })
        .catch((error) => {
          console.error('Error:', error);
        });



      }
    }
       

  const notifyEvent = (formData) => {

      const createdNotificationFormData = {
        title: 'Νέο Μνημόσυνο',
        message: `Το Μνημόσυνο του ${formData.fullname} έχει δημιουργηθεί απο τον χρήστη **${auth.username}**`,
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
                    Μνημόσυνα - Πληροφορίες
                    </MDTypography>
                    
                    <MDTypography variant="h6" color="white" onClick={handleClick}>
                    Δημιουργία Εντύπου
                    </MDTypography>
                    <DialogMemorial 
                       logo={fotinopoulos}
                       open={open} 
                       handleClose={handleClose}
                       className={classes.logo}
                       handleSubmit={handleSubmit}
                       create={create}
                    />
                </MDBox>

              </MDBox>
              <MDBox pt={3}>
              {
              isLoading ? <LoadingSpinner asOverlay /> : (
                    <DataTable
                      table={{ columns, rows }}
                      isSorted={true}
                      entriesPerPage={true}
                      showTotalEntries={true}
                      noEndBorder
                      sortField={sortField}
                      sortOrder={sortOrder}
                      oncSortChange={(field) => {
                        const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
                        setSortField(field);
                        setSortOrder(order);
                      }}
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

export default Memorials;
