
// Material Dashboard 2 React components
/* eslint-disable */

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import Icon from "@mui/material/Icon";
import { Dialog,DialogContent,DialogTitle,DialogActions,DialogContentText,Button } from '@mui/material';

// Images
import fotinopoulos from "assets/images/fotinopoulos.png";

import { useEffect, useState,useRef,useContext } from "react";
import DialogFuneral from "components/DialogFuneral";
import { makeStyles } from '@mui/styles'
import { AuthContext } from "../../../context/auth-context";





const useStyles = makeStyles({
  logo: {
    width: '90px', // Or any other size
    height: 'auto',
    // Add more styles as needed
  },
});



export default function data(text,open,setIsLoading,createFuneral) {

  const auth = useContext(AuthContext);


  const FuneralHeaders=['Ονοματεπώνυμο','Ηλικία','Ονομα πατερα & μητέρας','ΑΦΜ','ΑΔΤ','Αρχή έκδοσης ΑΔΤ','Ημερομηνία έκδοσης ΑΔΤ','AMKA','Φορέας Συντ/σης ή Ασφαλισης','Ονομ/νυμο συζύγου','Επάγγελμα','Τόπος Κατοικίας','Τόπος Θανάτου']
  const AnouncementHeaders=['Αδέλφια','Τέκνα','Εγγόνια','Ανίψια','Λοιποί συγγενείς','Σύζυγος','Διεύθυνση','Στεφάνια'];
  const RelativeHeaders=['Βαθμός συγγένειας','Ονοματεπώνυμο','Ονομα/Επώνυμο πατέρα','Ονομα/Επώνυμο μητέρας','Ημερομηνία Γέννησης','Τόπος Γέννησης','ΑΔΤ','Ημερομηνία Έκδοσης ΑΔΤ','Αρχή Έκδοσης ΑΔΤ','ΔΟΥ','ΑΜΚΑ','Τηλέφωνο Επικοινωνίας','Τηλέφωνο Επικοινωνίας 2','Email','IBAN','Κωδικός Φορολογικού Φορέα','Συνθηματικό Φορολογικού Φορέα'];

// Create a ref for the dialog content
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [mappedData, setMappedData] = useState([]);
  const classes = useStyles();

// Step 1: Use a state variable to track the currently open dialog by row identifier (e.g., `selectedRowId`).
  const [selectedRowId, setSelectedRowId] = useState(null);

  const [selectedRow, setSelectedRow] = useState(null);

  const [dialogType, setDialogType] = useState(null);

  const [openForDelete, setOpenForDelete] = useState(false);

  //handle notification events
  const [existingFuneralData, setExistingFuneralData] = useState(null);
  const [existingAnouncementData, setExistingAnouncementData] = useState(null);
  const [existingRelativeData, setExistingRelativeData] = useState(null);



useEffect(() => {
  fetch('https://entypafotinopoulosserver.azurewebsites.net/funeral/')
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      setMappedData(data);

      if(!createFuneral)
      setIsLoading(false);

     
    });
}, [text,open,createFuneral]);



 const handleClickOpen = (item) => {

  item.idPublicationDate=formatDate(item.idPublicationDate)
   
   setSelectedRowId(item._id);
   setSelectedRow(item);
   setDialogType('edit');


   let existingFuneralData = {
    burialDate: item.burialDate,
    burialLocation: item.burialLocation,
    afm: item.afm,
    age: item.age,
    amka: item.amka,
    anouncementId: item.anouncement,
    fatherMotherName: item.fatherMotherName,
    idAuthority: item.idAuthority,
    idNumber: item.idNumber,
    idPublicationDate: item.idPublicationDate,
    foreas: item.foreas,
    fullname: item.fullname,
    id: item._id,
    placeOfDeath: item.placeOfDeath,
    profession: item.profession,
    residence: item.residence,
    spouseName: item.spouseName,
    relativeId: item.relative
  };
  setExistingFuneralData(existingFuneralData);

  fetch(`https://entypafotinopoulosserver.azurewebsites.net/anouncement/${item.anouncement}`)
  .then(response => response.json())
  .then(dataAnouncement => {

          const existingAnouncementData = {
            brothers: dataAnouncement.brothers,
            childs: dataAnouncement.childs,
            grandchilds: dataAnouncement.grandchilds,
            nieces:dataAnouncement.nieces,
            others:dataAnouncement.others,
            spouse:dataAnouncement.spouse,
            address:dataAnouncement.address,
            wreaths:dataAnouncement.wreaths
          };

          setExistingAnouncementData(existingAnouncementData);

       }
       )
  .catch(error => console.error('Error:', error));


  fetch(`https://entypafotinopoulosserver.azurewebsites.net/relative/${item.relative}`)
  .then(response => response.json())
  .then(dataRelative => {

        

          const existingRelativeData = {
            relationdegree: dataRelative.relationdegree,
            fullname: dataRelative.fullname,
            fatherfullname: dataRelative.fatherfullname,
            motherfullname: dataRelative.motherfullname,
            birthDate: dataRelative.birthDate,
            birthlocation: dataRelative.birthlocation,
            idNumber: dataRelative.idNumber,
            idPublicationDate: dataRelative.idPublicationDate,
            idAuthority: dataRelative.idAuthority,
            afm: dataRelative.afm,
            doy: dataRelative.doy,
            amka: dataRelative.amka,
            phone: dataRelative.phone,
            phone2: dataRelative.phone2,
            email: dataRelative.email,
            iban: dataRelative.iban,
            taxisCodeUser: dataRelative.taxisCodeUser,
            taxisCodePassword: dataRelative.taxisCodePassword
          };

          setExistingRelativeData(existingRelativeData);
       }
       )
      .catch(error => console.error('Error:', error));


      

 }

 const handleClickOpenForView = (item) => { 

  item.idPublicationDate=formatDate(item.idPublicationDate)
    
  setSelectedRowId(item._id); // Assuming `id` is the unique identifier for each row
  setSelectedRow(item);

  setDialogType('view');


}


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

//Create a new funeral
const handleCreate = (formData) => {
  // Handle create logic...
   setIsLoading(true);
 
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
    idPublicationDate: formData.idPublicationDate,
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
    phone2: formData.rel_phone2,
    email: formData.rel_email,
    iban: formData.rel_iban,
    taxisCodeUser: formData.rel_taxisCodeUser,
    taxisCodePassword: formData.rel_taxisCodePassword
  }


       //create funeral
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
        setSelectedRow(null);
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

      //create relative
      fetch('https://entypafotinopoulosserver.azurewebsites.net/relative/', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createdRelativeFormData),
      })
      .then(response => response.json())
      .then(data => {
           console.log('Success:', data);

        //  setSelectedRow(x)
          setMappedData([...mappedData, createdFuneralFormData]);
          setIsLoading(false);

          //notify event
          notifyCreateEvent(formData);
       
      })
      .catch((error) => {
        console.error('Error:', error);
      });


      

}

const handleConfirmDelete = (id) => {
  handleDelete(id);
  handleClose();
};

// Add the handleDelete function
const handleDelete = (id) => {
  // Send a DELETE request to the server
  setIsLoading(true);



  fetch(`https://entypafotinopoulosserver.azurewebsites.net/funeral/${id}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);


    let anouncementId=data.anouncement;
    let relativeId=data.relative;

    fetch(`https://entypafotinopoulosserver.azurewebsites.net/anouncement/${anouncementId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success delete anouncement:', data);
    })

    fetch(`https://entypafotinopoulosserver.azurewebsites.net/relative/${relativeId}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success delete relative:', data);
    })


    setSelectedRow(null);
    setIsLoading(false);
    // Update the mappedData state to remove the deleted item
    setMappedData(mappedData.filter(item => item._id !== id));
  })
  .catch((error) => {
    console.error('Error:', error);
  });


}

// Update an existing funeral
const handleUpdate = (formData) => {
setIsLoading(true);


  // Handle update logic...
  const updatedFuneralFormData = {
    burialDate: formData.burialDate,
    burialLocation: formData.burialLocation,
    afm: formData.afm,
    age: parseInt(formData.age, 10),
    amka: formData.amka,
    anouncementId: formData.anouncementId,
    relativeId: formData.relativeId,
    fatherMotherName: formData.fatherMotherName,
    idAuthority: formData.idAuthority,
    idNumber: formData.idNumber,
    idPublicationDate: formData.idPublicationDate,
    foreas: formData.foreas,
    fullname: formData.fullname,
    id: formData.id,
    placeOfDeath: formData.placeOfDeath,
    profession: formData.profession,
    residence: formData.residence,
    spouseName: formData.spouseName,
  };

  const updatedAnouncementFormData = {
    brothers: formData.an_brothers,
    childs: formData.an_childs,
    grandchilds: formData.an_grandchilds,
    nieces:formData.an_nieces,
    others:formData.an_others,
    spouse:formData.an_spouse,
    address:formData.an_address,
    wreaths:formData.an_wreaths
  };

  const updatedRelativeFormData = {
    relationdegree: formData.rel_relationdegree,
    fullname: formData.rel_fullname,
    fatherfullname: formData.rel_fatherfullname,
    motherfullname: formData.rel_motherfullname,
    birthDate: formData.rel_birthdate !== "" ? formData.rel_birthdate : null,
    birthlocation: formData.rel_birthlocation,
    residence: formData.rel_residence,
    idNumber: formData.rel_idNumber,
    idPublicationDate: formData.rel_idPublicationDate === "" ? null : formData.rel_idPublicationDate,
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

  //compare the existing data with the new data
  let funeralChanges=compareJSONForFuneral(existingFuneralData,updatedFuneralFormData);
  let anouncemenChanges=compareJSONForAnouncement(existingAnouncementData,updatedAnouncementFormData);
  let relativeChanges=compareJSONForRelative(existingRelativeData,updatedRelativeFormData);


  //convert the date string to date object--SOS!!!
  updatedFuneralFormData.idPublicationDate=stringToDateFormat(updatedFuneralFormData.idPublicationDate);
  updatedRelativeFormData.birthDate=stringToDateFormat(updatedRelativeFormData.birthDate);
  updatedRelativeFormData.idPublicationDate=stringToDateFormat(updatedRelativeFormData.idPublicationDate);


   // Send a PUT request to the server
    fetch(`https://entypafotinopoulosserver.azurewebsites.net/funeral/${formData.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFuneralFormData),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      notifyUpdateEvent(funeralChanges,formData.fullname,'Στοιχεία Θανόντος');
    })
    .catch((error) => {
      console.error('Error:', error);
    })


      // Send a PUT request to the server
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
    
  } )
  .catch((error) => {
    console.error('Error:', error);
  })


  // Send a PUT request to the server
  fetch(`https://entypafotinopoulosserver.azurewebsites.net/relative/${formData.relativeId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedRelativeFormData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);

    //fetch the updated data
    fetch('https://entypafotinopoulosserver.azurewebsites.net/funeral/')
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      notifyUpdateEvent(relativeChanges,formData.fullname,'Συγγενείς');
      setIsLoading(false);
      setMappedData(data);
      setSelectedRow(null);
      setSelectedRowId(null);
    
    });


  })
  .catch((error) => {
    console.error('Error:', error);
  });
  


}


// Handle the form submission
const handleSubmit = (formData) => {
   
  if (selectedRow) {
    handleUpdate(formData);
  } else {
    handleCreate(formData);
  }
};

const notifyCreateEvent = (formData) => {

  const createdNotificationFormData = {
    title: 'Νέα Κηδεία',
    message: `Η κηδεία του ${formData.fullname} έχει δημιουργηθεί`,
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


const notifyUpdateEvent = (changes,fullname,category) => {



  const propertyStrings =Object.entries(changes).map(([key, values]) => {
    return `${key}: Νέα τιμή: ${values.newValue}, Παλιά Τιμή: ${values.oldValue}`;
  }).join('; ')


 if(propertyStrings!="")
{

  const updatedNotificationFormData = {
    title: `Διόρθωση Κηδεία ${category} του ${fullname} από τον χρήστη ${auth.username}`,
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



const compareJSONForFuneral=(existing, updated, path = '')=> {
 
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

   convertChanges=mapFuneralValuesToHeaders(FuneralHeaders,changes);

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

const compareJSONForRelative=(existing, updated, path = '')=> {
 
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

   convertChanges=mapRelativeValuesToHeaders(RelativeHeaders,changes);

  return convertChanges;
}

const mapFuneralValuesToHeaders=(headers, obj)=> {
   
  
  const headerMapping = {
    "Ημερομηνία Ταφής": "burialDate",
    "Ταφή": "burialLocation",
    "Ονοματεπώνυμο": "fullname",
    "Ηλικία": "age",
    "Ονομα πατερα & μητέρας": "fatherMotherName",
    "ΑΔΤ": "idNumber",
    "Ημερομηνία έκδοσης ΑΔΤ": "idPublicationDate",
    "Αρχή έκδοσης ΑΔΤ": "idAuthority",
    "ΑΦΜ": "afm",
    "AMKA": "amka",
    "Φορέας": "foreas",
    "Ονομα/νυμο": "spouseName",
    "Επάγγελμα": "profession",
    "Κατοικία": "residence",
    "Τόπος θανάτου": "placeOfDeath",
    "Πληροφορίες": "more",
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

const mapRelativeValuesToHeaders=(headers, obj)=> {
   
  
  const headerMapping = {
    "Βαθμός Συγγένειας": "relationdegree",
    "Ονοματεπώνυμο":  "fullname",
    "Ονομα/Επώνυμο πατέρα": "fatherfullname",
    "Ονομα/Επώνυμο μητέρας":"motherfullname",
    "Ημερομηνία Γέννησης":"birthdate",
    'Τόπος Γέννησης':"birthlocation",
    'ΑΔΤ':"idNumber",
    'Ημερομηνία Έκδοσης ΑΔΤ':"idPublicationDate",
    'Αρχή Έκδοσης ΑΔΤ':"idAuthority",
    'ΔΟΥ':"doy",
    'ΑΜΚΑ':"amka",
    'Τηλέφωνο Επικοινωνίας':"phone",
    'Τηλέφωνο Επικοινωνίας 2':"phone2",
    'Email':"email",
    'IBAN':"iban",
    'Κωδικός Φορολογικού Φορέα':"taxisCodeUser",
    'Συνθηματικό Φορολογικού Φορέα':"taxisCodePassword"
  
  }

  return headers.reduce((acc, header) => {
    const key = headerMapping[header];
    if (key && obj.hasOwnProperty(key)) {
      acc[header] = obj[key];
    }
    return acc;
  }, {});

}


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
 
 return {
    columns: [
      { Header: "Ονοματεπώνυμο", accessor: "Fullname", width: "15%", align: "left" },
      { Header: "Ηλικια", accessor: "Age", align: "left" },
      { Header: "Ονομα πατερα & μητέρας", accessor: "FatherMotherName", align: "center" },
      { Header: "ΑΦΜ", accessor: "Afm", align: "center" },
      { Header: "AMKA", accessor: "Amka", align: "center" },
      { Header: "Φορέας", accessor: "Foreas", align: "center" },
      { Header: "Ονομα/νυμο", accessor: "spouseName", align: "center" },
      { Header: "Επάγγελμα", accessor: "profession", align: "center" },
      { Header: "Κατοικία", accessor: "residence", align: "center" },
      { Header: "Τόπος θανάτου", accessor: "placeOfDeath", align: "center" },
      { Header: "Πληροφορίες", accessor: "more", align: "center" },
      { Header: "", accessor: "edit", align: "center" },
      { Header: "", accessor: "delete", align: "center" }
    ],
    rows: mappedData.filter(item => item.fullname.includes(text)).map((item) => ({
      Fullname: item.fullname,
      Age: item.age,
      FatherMotherName: (
        <MDBox ml={-1}>
          {/* <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" /> */}
          {item.fatherMotherName}
        </MDBox>
      ),
      Afm: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.afm}
        </MDTypography>
      ),
      Amka: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.amka}
        </MDTypography>
      ),
      Foreas: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.foreas}
        </MDTypography>
      ),
      spouseName: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.spouseName}
        </MDTypography>
      ),
      profession: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.profession}
        </MDTypography>
      ),
      residence: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.residence}
        </MDTypography>
      ),
      placeOfDeath: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.placeOfDeath}
        </MDTypography>
      ),
      announcementId: item.anouncementId,
      key:item._id,
      relativeId: item.relativeId,
      more: (
        <>
        <MDBox ml={-1}>
          {/* <Icon sx={{ fontWeight: "bold" }}>{Icon}</Icon> */}
          <MDTypography display="block" variant="button" fontWeight="medium">
            <MDButton 
              component="a"
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
        <DialogFuneral
          selectedRowDeath={selectedRow}
          logo={fotinopoulos}
          className={classes.logo}
          open={selectedRowId === item._id}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          isReadOnly={true}
          createMode={false}
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
        <DialogFuneral
          selectedRowDeath={selectedRow}
          logo={fotinopoulos}
          className={classes.logo}
          open={selectedRowId === item._id}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          isReadOnly={false}
          createMode={false}
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
                Είστε σίγουρος ότι θέλετε να διαγράψετε αυτή την κηδεία;
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

    }))
  };

}  






