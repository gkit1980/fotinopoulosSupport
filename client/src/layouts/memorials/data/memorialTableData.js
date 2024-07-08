/* eslint-disable */


/**
* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";

// Images
import fotinopoulos from "assets/images/fotinopoulos.png";

import { useEffect, useState,useRef } from "react";
import { makeStyles } from '@mui/styles'
import DialogMemorial from "components/DialogMemorial";
import { Dialog,DialogContent,DialogTitle,DialogActions,DialogContentText,Button } from '@mui/material';
import { format,parseISO } from 'date-fns';








const useStyles = makeStyles({
  logo: {
    width: '90px', // Or any other size
    height: 'auto',
    // Add more styles as needed
  },
});



export default function data(text,open,create,setIsLoading) {


  const dialogRef = useRef(null);
  const [mappedData, setMappedData] = useState([]);
  const classes = useStyles();

  const [selectedRowId, setSelectedRowId] = useState(null);

  const [selectedRow, setSelectedRow] = useState(null);

  const [dialogType, setDialogType] = useState(null);
  const [openForDelete, setOpenForDelete] = useState(false);
  




useEffect(() => {
  fetch('https://entypafotinopoulosserver.azurewebsites.net/memorial/')
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setMappedData(data);
      setIsLoading(false);
    });
}, [text,open,create]);




 const handleClickOpen = (item) => {
  setSelectedRowId(item._id);
   setSelectedRow(item);
   setDialogType('edit');
 };

 const handleClickOpenForView = (item) => { 
    
  setSelectedRowId(item._id); // Assuming `id` is the unique identifier for each row
  setSelectedRow(item);

  setDialogType('view');


};


const handleClickOpenForDelete = (item) => { 
    
  setSelectedRowId(item._id); // Assuming `id` is the unique identifier for each row
  setSelectedRow(item);
  setOpenForDelete(true);



};


 const handleClose = () => {
  setSelectedRowId(null); 
   setSelectedRow(null);
   setOpenForDelete(false);
 };

//Create a new memorial
const handleCreate = (formData) => {
  // Handle create logic...
  setIsLoading(true);

const parts = formData.date.split("/");
const year = parseInt(parts[2], 10);
const month = parseInt(parts[1], 10) - 1; // Month is 0-indexed in JavaScript Date
const day = parseInt(parts[0], 10);

const dateObject = new Date(year, month, day);
 
  const createdMemorialFormData = {
     id: formData.id,
     date: dateObject,
     fortydOrYear: formData.fortydOrYear,
     church: formData.church,
     address: formData.address,
     phones: formData.phones,
     disc: formData.disc,
     cake: formData.cake,
     sakTsantKout: formData.sakTsantKout,
     stolismos: formData.stolismos,
     fullname: formData.fullname,
     price: formData.price,
     comment: formData.comment,
  };



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
        setSelectedRow(null);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error:', error);
      });


}


// Update an existing memorial
const handleUpdate = (formData) => {

  setIsLoading(true);


  // Handle update logic...
  const updatedMemorialFormData = {
    id: formData.id,
    date: formData.date,
    fortydOrYear: formData.fortydOrYear,
    church: formData.church,
    address: formData.address,
    phones: formData.phones,
    disc: formData.disc,
    cake: formData.cake,
    sakTsantKout: formData.sakTsantKout,
    schedules: formData.schedules,
    stolismos: formData.stolismos,
    fullname: formData.fullname,
    price: formData.price,
    comment: formData.comment
  };





   // Send a PUT request to the server
    fetch(`https://entypafotinopoulosserver.azurewebsites.net/memorial/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMemorialFormData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setSelectedRow(null);

      fetch('https://entypafotinopoulosserver.azurewebsites.net/memorial/')
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setMappedData(data);
      setIsLoading(false);
     
   //   notifyEvent(formData);

    });


    
    })
    .catch((error) => {
      console.error('Error:', error);
    })





}

// Add the handleDelete function
const handleDelete = (id) => {
  // Send a DELETE request to the server

  fetch(`https://entypafotinopoulosserver.azurewebsites.net/memorial/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success Delete:', data);

    setSelectedRow(null);
    // Update the mappedData state to remove the deleted item
    setMappedData(mappedData.filter(item => item._id !== id));
    setIsLoading(false);
  })
  .catch((error) => {
    console.error('Error:', error);
  });


}

const handleConfirmDelete = (id) => {
  handleDelete(id);
  handleClose();
};


// Handle the form submission
const handleSubmit = (formData) => {
  if (selectedRow) {
    handleUpdate(formData);
  } else {
    handleCreate(formData);
  }
};



const formatDate = (date) => {
  try {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      throw new RangeError('Invalid time value');
    }
    return format(parsedDate, 'dd/MM/yyyy');
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date';
  }
};


const notifyEvent = (formData) => {

  const createdNotificationFormData = {
    title: 'Νέο Μνημόσυνο',
    message: `Το μνημόσυνο του ${formData.fullname} έχει δημιουργηθει`,
    user: 'gkit1990@yahoo.com',
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
  
  return {
    columns: [
      { Header: "Ανθρωπος", accessor: "Fullname", align: "left" },
      { Header: "Ημερομηνία", accessor: "Date", width: "5%", align: "left" },
      { Header: "40/Ημερο-Ετήσιο", accessor: "FortydOrYear",width: "10%", align: "left" },
      { Header: "Εκκλησία", accessor: "Church", align: "center" },
      { Header: "Διεύθυνση", accessor: "Address", align: "center" },
      { Header: "Τηλέφωνα", accessor: "Phones", align: "center" },
      { Header: "Δίσκος", accessor: "Disc", align: "center" },
      { Header: "Κέικ", accessor: "Cake", align: "center" },
      { Header: "Σάκ-Τσαντ-Κουτ", accessor: "SakTsantKout",width: "10%", align: "center" },
      { Header: "Στολισμός", accessor: "Stolismos", align: "center" },
      { Header: "Προγράμματα", accessor: "Schedules", align: "center" },
      { Header: "Τιμή", accessor: "Price", align: "center" },
      { Header: "Αναλυτικα", accessor: "more", align: "center" },
      { Header: "", accessor: "edit", align: "center" },
      { Header: "", accessor: "delete", align: "center" }
    ],

    rows: mappedData.filter(item => item.fullname.includes(text)).map((item) => ({
      Fullname: item.fullname,
      Date: formatDate(item.date),
      FortydOrYear: (
        <MDBox ml={-1}>
          {/* <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" /> */}
          {item.fortydOrYear}
        </MDBox>
      ),
      Church: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.church}
        </MDTypography>
      ),
      Address: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.address}
        </MDTypography>
      ),
      Phones: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.phones}
        </MDTypography>
      ),
      Disc: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.disc}
        </MDTypography>
      ),
      Cake: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.cake}
        </MDTypography>
      ),
      SakTsantKout: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.sakTsantKout}
        </MDTypography>
      ),
      Stolismos: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.stolismos}
        </MDTypography>
      ),
      Schedules: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.schedules}
        </MDTypography>
      ),
      Price: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.price}
        </MDTypography>
      ),
      Comment: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.comment}
        </MDTypography>
      ),
      more: (
        <>
        <MDBox ml={-1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            <MDButton 
              component="a"
              // href="https://www.google.com" 
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color="info"
              onClick={() => handleClickOpenForView(item)}
            >
              Περισσότερα
            </MDButton>
          </MDTypography>
        </MDBox>
                {/* Render the specific Dialog for the selected row */}
                {selectedRowId === item._id && dialogType === 'view' && (
                  <DialogMemorial
                    ref={dialogRef}
                    selectedRowDeath={selectedRow}
                    logo={fotinopoulos}
                    className={classes.logo}
                    open={selectedRowId === item._id}
                    handleClose={handleClose}
                    handleSubmit={handleSubmit}
                    isReadOnly={true}
                  />
                )}
                  </>
      ),
      edit: (
        <>
          <MDBox ml={-1}>
            <MDTypography display="block" variant="button" fontWeight="medium">
              <MDButton 
                component="a"
                // href="https://www.google.com" 
                target="_blank"
                rel="noreferrer"
                variant="outlined"
                size="small"
                color="secondary"
                onClick={() => handleClickOpen(item)}
              >
                <Icon sx={{ fontWeight: "bold" }}>edit</Icon> διορθωση
              </MDButton>
            </MDTypography>
          </MDBox>
        {/* Render the specific Dialog for the selected row */}
      {selectedRowId === item._id && dialogType === 'edit' && (
        <DialogMemorial
          ref={dialogRef}
          selectedRowDeath={selectedRow}
          logo={fotinopoulos}
          className={classes.logo}
          open={!!selectedRow}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          isReadOnly={false}
        />
      )}
        </>
      ),
      delete: (
        <>
        <MDBox ml={-1}>
          <MDTypography display="block" variant="button" fontWeight="medium">
            <MDButton 
              component="a"
              // href="https://www.google.com" 
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color="primary"
              onClick={() => handleClickOpenForDelete(item._id)} 
            >
              <Icon sx={{ fontWeight: "bold" }}>delete</Icon> Διαγραφη
            </MDButton>
          </MDTypography>
        </MDBox>
         <Dialog
         open={openForDelete}
         onClose={handleClose}
         BackdropProps={{
          style: { backgroundColor: 'transparent'  }
        }}
          >
         <DialogTitle style={{ textAlign: 'center' }}>Επιβεβαίωση Διαγραφής</DialogTitle>
         <DialogContent>
           <DialogContentText>
             Είστε σίγουρος ότι θέλετε να διαγράψετε αυτό το μνημόσυνο;
           </DialogContentText>
         </DialogContent>
         <DialogActions style={{ justifyContent: 'center' }}>
           <Button onClick={handleClose} color="primary">
             Ακύρωση
           </Button>
           <Button onClick={()=> handleConfirmDelete(item._id)} color="primary">
             Επιβεβαίωση
           </Button>
         </DialogActions>
       </Dialog>
       </>
      ),

    })),
  };
}  






