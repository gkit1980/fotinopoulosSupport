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

import { useEffect, useState,useRef,useContext } from "react";
import { makeStyles } from '@mui/styles'
import DialogMemorial from "components/DialogMemorial";
import { Dialog,DialogContent,DialogTitle,DialogActions,DialogContentText,Button } from '@mui/material';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { AuthContext } from "../../../context/auth-context";
import { set } from "date-fns";








const useStyles = makeStyles({
  logo: {
    width: '90px', // Or any other size
    height: 'auto',
    // Add more styles as needed
  },
});



export default function data(text,open,create,setIsLoading) {

  const auth = useContext(AuthContext);

  const MemorialHeaders=['Ημερομηνία','Ημερομηνία Γέννησης','40/Ημερο-Ετήσιο','Εκκλησία','Διεύθυνση','Τηλέφωνα','Δίσκος','Κέικ','Σάκ-Τσαντ-Κουτ','Στολισμός','Προγράμματα','Τιμή','Σχόλια'];
  const AnouncementHeaders=['Αδέλφια','Τέκνα','Εγγόνια','Ανίψια','Λοιποί συγγενείς','Σύζυγος','Διεύθυνση','Επιπλέον Πληροφορίες','Στεφάνια'];

  const dialogRef = useRef(null);
  const [mappedData, setMappedData] = useState([]);
  const classes = useStyles();

  const [selectedRowId, setSelectedRowId] = useState(null);

  const [selectedRow, setSelectedRow] = useState(null);

  const [dialogType, setDialogType] = useState(null);
  const [openForDelete, setOpenForDelete] = useState(false);

    //handle notification events
    const [existingMemorialData, setExistingMemorialData] = useState(null);
    const [existingAnouncementData, setExistingAnouncementData] = useState(null);
  

  dayjs.extend(customParseFormat);


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

  item.birthDate=formatDate(item.birthDate);

  setSelectedRowId(item._id);
   setSelectedRow(item);
   setDialogType('edit');

   let existingMemoriallData = {
    id: item._id,
    date: item.date,
    birthDate: item.birthDate,
    fortydOrYear: item.fortydOrYear,
    church: item.church,
    address: item.address,
    phones: item.phones,
    disc: item.disc,
    cake: item.cake,
    sakTsantKout: item.sakTsantKout,
    stolismos: item.stolismos,
    schedules: item.schedules,
    fullname: item.fullname,
    price: item.price,
    comment: item.comment,
    anouncement: item.anouncement
   
  };
  setExistingMemorialData(existingMemoriallData);


  //fetch the anouncement data
  fetch(`https://entypafotinopoulosserver.azurewebsites.net/anouncement/${item.anouncement}`)
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    let existingAnouncementData = {
      brothers: data.brothers,
      childs: data.childs,
      grandchilds: data.grandchilds,
      nieces:data.nieces,
      others:data.others,
      spouse:data.spouse,
      address:data.address,
      additionalinfo:data.additionalinfo,
      wreaths:data.wreaths,
      _id:data._id
    };

    setExistingAnouncementData(existingAnouncementData);
  });


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
     birthDate: formData.birthDate,
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
          setSelectedRow(null);
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
    date: formData.selectedDate,
    birthDate: formData.birthDate,
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
    comment: formData.comment,
    anouncement: formData.anouncementId    
  };

 





     //convert the date string to date object--SOS!!!
  
  updatedMemorialFormData.birthDate=stringToDateFormat(updatedMemorialFormData.birthDate);
  updatedMemorialFormData.date=dayjs(updatedMemorialFormData.date, "DD/MM/YYYY HH:mm", true);


  const updatedAnouncementFormData = {
    wreaths: formData.an_wreaths,
    spouse: formData.an_spouse,
    childs: formData.an_childs,
    grandchilds: formData.an_grandchilds,
    brothers: formData.an_brothers,
    nieces: formData.an_nieces,
    others: formData.an_others,
    address: formData.an_address,
    additionalinfo: formData.an_additionalinfo   
  };


  //compare the existing data with the new data
  let memorialChanges=compareJSONForMemorial(existingMemorialData,updatedMemorialFormData);
  let anouncemenChanges=compareJSONForAnouncement(existingAnouncementData,updatedAnouncementFormData);




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
    
      notifyUpdateEvent(memorialChanges,formData.fullname,'Στοιχεία Μνημοσύνου');
    })
    .catch((error) => {
      console.error('Error:', error);
    })


      // Send a PUT request to the server

      if(formData.anouncementId!=null && formData.anouncementId!="")
      {
          fetch(`https://entypafotinopoulosserver.azurewebsites.net/anouncement/${formData.anouncementId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedAnouncementFormData),
          })
          .then(response => response.json())
          .then(data => {
            console.log('Success:', data);
            notifyUpdateEvent(anouncemenChanges,formData.fullname,'Αγγελτήρια');
            setIsLoading(false); 
            setSelectedRow(null);
            setSelectedRowId(null);
          
            
          } )
          .catch((error) => {
            console.error('Error:', error);
          })
      }
      else  //create an anouncement
      {
        fetch('https://entypafotinopoulosserver.azurewebsites.net/anouncement/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedAnouncementFormData),
        })  
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          notifyUpdateEvent(anouncemenChanges,formData.fullname,'Αγγελτήρια');
          setIsLoading(false); 
          setSelectedRow(null);
          setSelectedRowId(null);
        
          
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      }








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



// Format the date to a string
const formatDate = (isoString) => {
  const date = new Date(isoString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};


//convert the date string to date object
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


const notifyUpdateEvent = (changes,fullname,category) => {



  const propertyStrings =Object.entries(changes).map(([key, values]) => {
    return `${key}: Νέα τιμή: ${values.newValue}, Παλιά Τιμή: ${values.oldValue}`;
  }).join('; ')


 if(propertyStrings!="")
{

  const updatedNotificationFormData = {
    title: `Διόρθωση Μνημόσυνου ${category} του ${fullname} από τον χρήστη ${auth.username}`,
    message: propertyStrings,
    user: `${auth.username}`,
    createdAt: Date.now(),
  }

  fetch('https://entypafotinopoulosserver.azurewebsites.net/notification/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNotificationFormData),
  })


}
}

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



const compareJSONForMemorial=(existing, updated, path = '')=> {
 
  let changes= {};
  let convertChanges={};

  for (let key in existing) {
      const currentPath = path ? `${path}.${key}` : key;

      if (updated.hasOwnProperty(key)) {
          if (typeof existing[key] === 'object' && existing[key] !== null && !Array.isArray(existing[key])) {
              // If the value is an object, compare recursively
              compare(existing[key], updated[key], currentPath);
          } else {
              // If the value is a primitive, compare directly
              if (existing[key] !== updated[key]) {
                  changes[currentPath] = { oldValue: existing[key], newValue: updated[key] };
              }
          }
      } else {
          // If the key doesn't exist in the updated object
          changes[currentPath] = { oldValue: existing[key], newValue: undefined };
      }
  }

  // Check for keys that are in the updated object but not in the existing object
  for (let key in updated) {
      const currentPath = path ? `${path}.${key}` : key;

      if (!existing.hasOwnProperty(key)) {
          changes[currentPath] = { oldValue: undefined, newValue: updated[key] };
      }
  }

   convertChanges=mapMemorialValuesToHeaders(MemorialHeaders,changes);

  return convertChanges;
}

const compareJSONForAnouncement=(existing, updated, path = '')=> {
 
  let changes= {};
  let convertChanges={};

  for (let key in existing) {
      const currentPath = path ? `${path}.${key}` : key;

      if (updated.hasOwnProperty(key)) {
          if (typeof existing[key] === 'object' && existing[key] !== null && !Array.isArray(existing[key])) {
              // If the value is an object, compare recursively
              compare(existing[key], updated[key], currentPath);
          } else {
              // If the value is a primitive, compare directly
              if (existing[key] !== updated[key]) {
                  changes[currentPath] = { oldValue: existing[key], newValue: updated[key] };
              }
          }
      } else {
          // If the key doesn't exist in the updated object
          changes[currentPath] = { oldValue: existing[key], newValue: undefined };
      }
  }

  // Check for keys that are in the updated object but not in the existing object
  for (let key in updated) {
      const currentPath = path ? `${path}.${key}` : key;

      if (!existing.hasOwnProperty(key)) {
          changes[currentPath] = { oldValue: undefined, newValue: updated[key] };
      }
  }

   convertChanges=mapAnouncementValuesToHeaders(AnouncementHeaders,changes);

  return convertChanges;
}


const mapMemorialValuesToHeaders=(headers, obj)=> {
   
  
  const headerMapping = {
    "Ημερομηνία": "date",
    "Ημερομηνία Γέννησης": "birthDate",
    "40/Ημερο-Ετήσιο": "fortydOrYear",
    "Εκκλησία": "church",
    "Διεύθυνση": "address",
    "Τηλέφωνα": "phones",
    "Δίσκος": "disc",
    "Κέικ": "cake",
    "Σάκ-Τσαντ-Κουτ": "sakTsantKout",
    "Στολισμός": "stolismos",
    "Προγράμματα": "schedules",
    "Ανθρωπος": "fullname",
    "Τιμή": "price",
    "Σχόλια": "comment"
  };

  return headers.reduce((acc, header) => {
    const key = headerMapping[header];
    if (key && obj.hasOwnProperty(key)) {
      acc[header] = obj[key];
    }
    return acc;
  }, {});

}

const mapAnouncementValuesToHeaders=(headers, obj)=> {
   
  
  const headerMapping = {
    "Αδέλφια": "brothers",
    "Τέκνα":  "childs",
    "Εγγόνια": "grandchilds",
    "Ανίψια": "nieces",
    "Λοιποί συγγενείς":"others",
    "Σύζυγος":"spouse",
    "Διεύθυνση":"address",
    "Επιπλέον Πληροφορίες":"additionalinfo",
    "Στεφάνια":"wreaths"
  }

  return headers.reduce((acc, header) => {
    const key = headerMapping[header];
    if (key && obj.hasOwnProperty(key)) {
      acc[header] = obj[key];
    }
    return acc;
  }, {});

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
      anouncement: item.anouncement,
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
          open={selectedRowId === item._id}
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






