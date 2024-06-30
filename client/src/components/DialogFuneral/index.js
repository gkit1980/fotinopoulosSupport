
import React,{ useState, useEffect, forwardRef, useRef} from 'react';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';     
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import LoadingSpinner  from  '../../shared/UIElements/LoadingSpinner';
import Draggable from 'react-draggable';  
import Paper from '@mui/material/Paper';

import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { el, se } from "date-fns/locale";

// import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FormControl,FormLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from 'react-loading-skeleton';
import { set } from 'date-fns';



function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const DialogFuneral=forwardRef(( {selectedRowDeath,logo,className,open,handleClose,handleSubmit,isReadOnly }) => {

  const [selectedRowAnouncement, setSelectedRowAnouncement] = useState(null);
  const [selectedRowRelative, setselectedRowRelative] = useState(null);
  const  [isDialogLoading, setisDialogLoading] = useState(false);
  const [isAnouncementLoading, setIsAnouncementLoading] = useState(true);
  const [isRelativeLoading, setIsRelativeLoading] = useState(true);

  const [afm, setAfm] = useState(selectedRowDeath ? selectedRowDeath.afm : "");
  const [afmError, setAfmError] = useState("");

  const [amka, setAmka] = useState(selectedRowDeath ? selectedRowDeath.amka : "");
  const [amkaError, setAmkaError] = useState("");

  const [ADTDate, setADTDate] = useState(selectedRowDeath ? selectedRowDeath.idPublicationDate : "");
  const [ADTDateError, setADTDateError] = useState("");

  const [selectedDate, setSelectedDate] = useState(selectedRowDeath ? selectedRowDeath.burialDate : new Date());

  const [textFieldValue, setTextFieldValue] = useState(selectedRowAnouncement ? selectedRowAnouncement.wreaths : "");


  const dialogRef = useRef(null);

const labelStyle = {
  flexGrow: 1,
  fontSize: '16px' // Example additional style
};



useEffect(() => {
  if (selectedRowAnouncement !== undefined && selectedRowAnouncement !== null &&
      selectedRowRelative !== undefined && selectedRowRelative !== null &&
      selectedRowDeath !== undefined && selectedRowDeath !== null) {
    
  // Assuming the scrollable content is within the DialogContent component
  const scrollableContent = dialogRef.current?.querySelector('.MuiDialogContent-root');
  if (scrollableContent) {
    scrollableContent.scrollTop = 0;
  }
  }
}, [selectedRowAnouncement, selectedRowRelative, selectedRowDeath]);


    useEffect(() => {

      if(selectedRowDeath!=undefined)
        {
          fetch(`https://entypafotinopoulosserver.azurewebsites.net/funeral/id/${selectedRowDeath._id}`)
          .then(response => response.json())
          .then(data => {
            
            let anouncementId=data.anouncement;
            let relativeId=data.relative;

          fetch(`https://entypafotinopoulosserver.azurewebsites.net/anouncement/${anouncementId}`)
            .then(response => response.json())
            .then(dataAnouncement => {
        
              setSelectedRowAnouncement(dataAnouncement);
              setTextFieldValue(dataAnouncement.wreaths);
              setIsAnouncementLoading(false);

            })
          .catch(error => console.error('Error:', error));


          fetch(`https://entypafotinopoulosserver.azurewebsites.net/relative/${relativeId}`)
          .then(response => response.json())
          .then(dataRelative => {
        
              setselectedRowRelative(dataRelative);
              setIsRelativeLoading(false);
          

            })
        .catch(error => console.error('Error:', error));
        })
      .catch(error => console.error('Error:', error));
        
    
    }
    else
    {
      setSelectedRowAnouncement({});
      setselectedRowRelative({});
    }

    }, [selectedRowDeath]);


    // useEffect(() => {
    //   if (open && dialogRef.current) {
    //     dialogRef.current.scrollTop = 0;
    //   }
    // }, [open]);
  
   

    //afm validation
    const validateAfm = (value) => {
      if (value.length !== 9) {
        setAfmError("ΑΦΜ πρέπει να αποτελείται από 9 ψηφία.");
      } 
      else if(typeof afm !== 'string') {
        setAfmError("ΑΦΜ πρέπει να αποτελείται από ψηφία και όχι χαρακτήρες.");
      }
      else if(typeof afm !== 'string') {
        setAfmError("ΑΦΜ πρέπει να αποτελείται από ψηφία και όχι χαρακτήρες.");
      }
      else if(!isValidAfm)
        {
        setAfmError("Το ΑΦΜ δεν είναι έγκυρο.");
        }
      else {
        setAfmError("");
      }
    };

    const isValidAfm = (afm) => {
    
      // Extract digits
      const digits = afm.split('').map(Number);
    
      // Compute the checksum using the algorithm
      let checksum = 0;
      for (let i = 0; i < 8; i++) {
        checksum += digits[i] * Math.pow(2, 8 - i);
      }
    
      // Calculate the control digit
      const controlDigit = checksum % 11 % 10;
    
      // Compare the control digit with the last digit of the AFM
      return controlDigit === digits[8];
    }

  
    const handleAfmChange = (event) => {
      const { value } = event.target;
      setAfm(value);
      validateAfm(value);
    }



    //amka validation

    const validateAmka = (amka) => {

      // Ensure the AMKA is exactly 11 digits long
      if (amka.length !== 11) {
        setAmkaError("To AMKA πρέπει να αποτελείται από 11 ψηφία.");
      }
      // Ensure all characters are digits
      else if (!/^\d+$/.test(amka)) {
        setAmkaError("To AMKA πρέπει να αποτελείται από ψηφία.");
      }
      else
      {
      // Extract birthdate from the first 6 digits
      const day = parseInt(amka.substring(0, 2), 10);
      const month = parseInt(amka.substring(2, 4), 10);
      const year = parseInt(amka.substring(4, 6), 10);
      
      // Validate the birthdate
      if (!isValidDate(day, month, year)) {
        setAmkaError("To AMKA δεν περιέχει έγκυρη ημερομηνία γέννησης.");
      }
      else {
        setAmkaError("");
      }
    }
    
     
    };

    const isValidDate = (day, month, year) => {
      // Adjust year for two-digit format (assuming AMKA covers people born from 1900 to 2099)
      const fullYear = year + (year >= 0 && year <= 99 ? (year <= 23 ? 2000 : 1900) : 0);
      
      const date = new Date(fullYear, month - 1, day);
      
      return (
        date.getFullYear() === fullYear &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    };

    const handleAmkaChange = (event) => {
      const { value } = event.target;
      setAmka(value);
      validateAmka(value);
    }



const handleADTDateChange=(event)=>
  {
    const { value } = event.target;
    setADTDate(value);
    validateADTDate(value);
  }
  

  const validateADTDate = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  
    if (!datePattern.test(dateStr)) {
      setADTDateError("Η ημερομηνία πρέπει νά έχει τήν μορφή DD/MM/YYYY");
    }
   else
   {
    const [day, month, year] = dateStr.split('/').map(Number);
  
    const dateObject = new Date(year, month - 1, day);
  
    if (dateObject.getFullYear() !== year || dateObject.getMonth() + 1 !== month || dateObject.getDate() !== day) {
      setADTDateError("Η ημερομηνία δέν είναι έγκυρη.");
    }
    else
    setADTDateError("");
  }
  };


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCrossButtonClick = () => {
    // Your button click handler logic
    const newText = "Στεφάνι Σταυρός:"; // Example text to add
    setTextFieldValue(prevValue => prevValue + newText); // Concatenate the new text to the existing value
  };

   const  handleFavoriteClick = () => {
    // Your favorite icon click handler logic
    const newText = "Στεφάνι Καρδιά:"; // Example text to add
    setTextFieldValue(prevValue => prevValue + newText); // Concatenate the new text to the existing value
  }




  return (

    isDialogLoading ? <LoadingSpinner asOverlay /> : (
    
    
    <Dialog
      ref={dialogRef}
      open={open}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      maxWidth="lg"
      onClose={handleClose}
      BackdropProps={{
        style: { backgroundColor: 'transparent'  }
      }}
      PaperProps={{
        style:{ width: '100vw',height: '80%' },
        component: 'form',
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          handleSubmit(formJson);
        },
      }}
    >
     
     
    
      <DialogTitle id="draggable-dialog-title" align="center"> ΕΝΤΥΠΟ ΘΑΝΟΝΤΟΣ Η ΘΑΝΟΥΣΗΣ</DialogTitle>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',gap:'40px' }}>
      <DialogTitle id="draggable-dialog-title"> <img src={logo} className={className} alt="Logo"/>  ΣΤΟΙΧΕΙΑ ΘΑΝΟΝΤΟΣ Η ΘΑΝΟΥΣΗΣ</DialogTitle>
     
      <Grid container spacing={8}>
          <Grid item xs={5} >


          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={el}>
                  <DateTimePicker
                    autoFocus
                    required
                    margin="dense"
                    id="burialDate"
                    name="burialDate"
                    label="Ημερομηνία Ταφής"
                    InputProps={{
                      readOnly: isReadOnly,
                    }}
                    format="dd/MM/yyyy HH:mm"
                    value= {selectedDate}
                    onChange={handleDateChange}
                    fullWidth
                    variant="standard"
                   />
          </MuiPickersUtilsProvider>
        
          </Grid>
          <Grid item xs={5}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="burialLocation"
              name="burialLocation"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="Ταφή"
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.burialLocation : ""}
              fullWidth
              variant="standard"
            />
          </Grid>
      </Grid>
      </div>



      <DialogContent>


      <Grid container spacing={6}>
          <Grid item xs={6}>
            <TextField 
              autoFocus
              required
              margin="dense"
              id="fullname"
              name="fullname"
              label="Ονοματεπώνυμο"
              InputProps={{
                readOnly: isReadOnly,
              }}
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.fullname : ""}
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="age"
              name="age"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="Ηλικία"
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.age : ""}
              fullWidth
              variant="standard"
            />
          </Grid>
      </Grid>


       <Grid container spacing={6}>
       <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="fatherMotherName"
              name="fatherMotherName"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="Ονομα πατερα & μητέρας"
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.fatherMotherName : ""}
              fullWidth
              variant="standard"
            />
        </Grid>
         
  
        <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="afm"
              name="afm"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="ΑΦΜ"
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.afm : ""}
              onChange={handleAfmChange}
              error={!!afmError}
              helperText={afmError}
              fullWidth
              variant="standard"
            />
        </Grid>
       </Grid>


       <Grid container spacing={6}>

       <Grid item xs={4}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="idNumber"
              name="idNumber"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="AΔΤ"
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.idNumber : ""}
              fullWidth
              variant="standard"
            />
        </Grid>

             
        <Grid item xs={4}>
            <TextField
              autoFocus
              required
              onChange={handleADTDateChange}
              error={!!ADTDateError}
              helperText={ADTDateError}
              margin="dense"
              format="dd/MM/yyyy"
              id="idPublicationDate"
              name="idPublicationDate"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="Ημερομηνία έκδοσης AΔΤ"
              type="text"
              placeholder="DD/MM/YYYY"
              defaultValue={selectedRowDeath ? selectedRowDeath.idPublicationDate : ""}
              fullWidth
              variant="standard"
            />
        </Grid>

                     
        <Grid item xs={4}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="idAuthority"
              name="idAuthority"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="Aρχή έκδοσης AΔΤ"
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.idAuthority : ""}
              fullWidth
              variant="standard"
            />
        </Grid>
          
        </Grid>
     
        <Grid container spacing={6}>
            <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="amka"
              name="amka"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="AMKA"
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.amka : ""}
              fullWidth
              variant="standard"
              onChange={handleAmkaChange}
              error={!!amkaError}
              helperText={amkaError}
            />
            </Grid>

            <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="foreas"
              name="foreas"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="Φορέας Συντ/σης ή Ασφαλισης"
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.foreas : ""}
              fullWidth
              variant="standard"
            />
            </Grid>
        </Grid>


        <Grid container spacing={6}>
           <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="spouseName"
              name="spouseName"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="Ονομ/νυμο συζύγου"
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.spouseName : ""}
              fullWidth
              variant="standard"
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="profession"
              name="profession"
              InputProps={{
                  readOnly: isReadOnly,
              }}
              label="Επάγγελμα"
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.profession : ""}
              fullWidth
              variant="standard"
            />
        </Grid>
      </Grid>


      <Grid container spacing={6}>
            <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="residence"
              name="residence"
              InputProps={{
                  readOnly: isReadOnly,
              }}
              label="Τόπος Κατοικίας"
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.residence : ""}
              fullWidth
              variant="standard"
            />
            </Grid>

            <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="placeOfDeath"
              name="placeOfDeath"
              InputProps={{
                  readOnly: isReadOnly,
              }}
              label="Τόπος Θανάτου"
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.placeOfDeath : ""}
              fullWidth
              variant="standard"
            />
            </Grid>
      </Grid>


      <TextField
        autoFocus
        margin="dense"
        id="id"
        name="id"
        InputProps={{
            readOnly: isReadOnly,
        }}
        label="ID"
        type="text"
        defaultValue={selectedRowDeath ? selectedRowDeath._id : ""}
        fullWidth
        variant="standard"
        style={{ display: 'none' }}
      />

         <TextField
        autoFocus
        margin="dense"
        id="anouncementId"
        name="anouncementId"
        InputProps={{
            readOnly: isReadOnly,
        }}
        label="anouncementID"
        type="text"
        defaultValue={selectedRowDeath ? selectedRowDeath.anouncement : ""}
        fullWidth
        variant="standard"
        style={{ display: 'none' }}
      />

      <TextField
        autoFocus
        margin="dense"
        id="relativeId"
        name="relativeId"
        InputProps={{
            readOnly: isReadOnly,
        }}
        label="relativeId"
        type="text"
        defaultValue={selectedRowDeath ? selectedRowDeath.relative : ""}
        fullWidth
        variant="standard"
        style={{ display: 'none' }}
      /> 
 

  
                     
                    

            <DialogTitle><img src={logo} className={className} alt="Logo" /> ΑΓΓΕΛΤΗΡΙΑ </DialogTitle>

            <div>
               
            {isAnouncementLoading ?  (
              <>
              <Skeleton variant="rectangular" width={1200} height={18} />
              <Skeleton variant="text" width={1200} height={20} />
              <Skeleton variant="text" width={1200} height={20} />
              <Skeleton variant="text" width={1200} height={20} />
              </>
              ) : (
                  <>
                        <Grid container spacing={0}>

                                <Grid item xs={6}>
                                    
                                {selectedRowAnouncement &&  (<TextField
                                      autoFocus
                                      margin="dense"
                                      id="anouncementId"
                                      name="anouncementId"
                                      InputProps={{
                                          readOnly: isReadOnly,
                                      }}
                                      label="anouncementId"
                                      type="text"
                                      defaultValue={selectedRowAnouncement ? selectedRowAnouncement._id : ""}
                                      fullWidth
                                      variant="standard"
                                      style={{ display: 'none' }}
                                    />
                                    )}


                                </Grid>

                        
                        </Grid>
                          

                        <Grid container spacing={6}>

                              <Grid item xs={6}>
                                
                              {selectedRowAnouncement &&  (<TextField
                                    autoFocus
                                    margin="dense"
                                    id="an_spouse"
                                    name="an_spouse"
                                    InputProps={{
                                      readOnly: isReadOnly,
                                    }}
                                    label="Σύζυγος"
                                    type="text"
                                    defaultValue={selectedRowAnouncement ? selectedRowAnouncement.spouse : ""}
                                    fullWidth
                                    variant="standard"
                                />
                                )}


                              </Grid>

                                <Grid item xs={6}>
                                

                                {selectedRowAnouncement &&  (<TextField
                                      autoFocus
                                      margin="dense"
                                      id="an_childs"
                                      name="an_childs"
                                      InputProps={{
                                          readOnly: isReadOnly,
                                      }}
                                      label="Τέκνα"
                                      type="text"
                                      defaultValue={selectedRowAnouncement ? selectedRowAnouncement.childs : ""}
                                      fullWidth
                                      variant="standard"
                                    />
                                )}

                        
                        
                                </Grid>
                        </Grid>
                        

                        <Grid container spacing={6}>

                              <Grid item xs={6}>

                              {selectedRowAnouncement &&  (<TextField
                                      autoFocus
                                      margin="dense"
                                      id="an_grandchilds"
                                      name="an_grandchilds"
                                      InputProps={{
                                          readOnly: isReadOnly,
                                      }}
                                      label="Εγγόνια"
                                      type="text"
                                      defaultValue={selectedRowAnouncement ? selectedRowAnouncement.grandchilds : ""}
                                      fullWidth
                                      variant="standard"
                                    />
                                    )}
                                
                          


                              </Grid>

                              <Grid item xs={6}>

                                    {selectedRowAnouncement &&  (<TextField
                                            autoFocus
                                            margin="dense"
                                            id="an_brothers"
                                            name="an_brothers"
                                            InputProps={{
                                                readOnly: isReadOnly,
                                            }}
                                            label="Αδέλφια"
                                            type="text"
                                            defaultValue={selectedRowAnouncement ? selectedRowAnouncement.brothers : ""}
                                            fullWidth
                                            variant="standard"
                                          />
                                          )}

                              </Grid>

                  
                        </Grid>

                        <Grid container spacing={6}>

                          <Grid item xs={6}>
                              
                          {selectedRowAnouncement &&  (<TextField
                                          autoFocus
                                          margin="dense"
                                          id="an_nieces"
                                          name="an_nieces"
                                          InputProps={{
                                            readOnly: isReadOnly,
                                          }}
                                          label="Ανίψια"
                                          type="text"
                                          defaultValue={selectedRowAnouncement ? selectedRowAnouncement.nieces : ""}
                                          fullWidth
                                          variant="standard"
                                      />
                                    )}
                          
                          </Grid>

                              <Grid item xs={6}>
                              
                              {selectedRowAnouncement &&  (<TextField
                                      autoFocus
                                      margin="dense"
                                      id="an_others"
                                      name="an_others"
                                      InputProps={{
                                          readOnly: isReadOnly,
                                      }}
                                      label="Λοιποί συγγενείς"
                                      type="text"
                                      defaultValue={selectedRowAnouncement ? selectedRowAnouncement.others : ""}
                                      fullWidth
                                      variant="standard"
                                    />
                                    )}


                                </Grid>
                        </Grid>

                        <Grid container spacing={0}>

                        <Grid item xs={12}>
                              
                        {selectedRowAnouncement &&  (<TextField
                                    autoFocus
                                    margin="dense"
                                    id="an_address"
                                    name="an_address"
                                    InputProps={{
                                      readOnly: isReadOnly,
                                    }}
                                    label="Διεύθυνση"
                                    type="text"
                                    defaultValue={selectedRowAnouncement ? selectedRowAnouncement.address : ""}
                                    fullWidth
                                    variant="standard"
                                />
                        )}


                        </Grid>

                        </Grid>

                        <Grid container spacing={0}>
                          <Grid item xs={12}>
                              <FormControl fullWidth>
                                <Box display="flex" alignItems="center" marginBottom={1}>
                                    <FormLabel component="legend" style={labelStyle}>
                                      Στεφάνια
                                    </FormLabel>
                                    <IconButton
                                      aria-label="add"
                                      onClick={handleCrossButtonClick}
                                      edge="end"
                                    >
                                      <AddIcon />
                                    </IconButton>
                            <IconButton
                            aria-label="favorite"
                            onClick={handleFavoriteClick} // Define this handler for the heart icon
                            edge="end"
                            >
                            <FavoriteIcon />
                            </IconButton>
                          </Box>
                          <TextField
                            rows={4}
                            maxRows={10}
                            multiline
                            autoFocus
                            margin="dense"
                            id="an_wreaths"
                            name="an_wreaths"
                            InputProps={{
                              readOnly: isReadOnly,
                            }}
                            type="text"
                            value={textFieldValue}
                            onChange={(e) => setTextFieldValue(e.target.value)}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                    </>
            )
            }

            </div>

            <DialogTitle><img src={logo} className={className} alt="Logo" /> ΣΤΟΙΧΕΙΑ ΠΛΗΣΙΕΣΤΕΡΟΥ ΣΥΓΓΕΝΗ </DialogTitle>

         <div>
            {isRelativeLoading ?  (
                   <>
                   <Skeleton variant="rectangular" width={1200} height={18} />
                   <Skeleton variant="text" width={1200} height={20} />
                   <Skeleton variant="text" width={1200} height={20} />
                   <Skeleton variant="text" width={1200} height={20} />
                   </>
            ) : (
              <>
            <Grid item xs={12}>
                  
                  {selectedRowRelative &&  (<TextField
                      autoFocus
                      margin="dense"
                      id="rel_relationdegree"
                      name="rel_relationdegree"
                      InputProps={{
                        readOnly: isReadOnly,
                      }}
                      label="Βαθμός συγγένειας"
                      type="text"
                      defaultValue={selectedRowRelative ? selectedRowRelative.relationdegree : ""}
                      fullWidth
                      variant="standard"
                    />
                    )}
        
        
            </Grid>

              
            <Grid container spacing={6}>

                <Grid item xs={6}>
                  
                {selectedRowRelative &&  (<TextField
                    autoFocus
                    margin="dense"
                    id="rel_fullname"
                    name="rel_fullname"
                    InputProps={{
                      readOnly: isReadOnly,
                    }}
                    label="Ονοματεπώνυμο"
                    type="text"
                    defaultValue={selectedRowRelative ? selectedRowRelative.fullname : ""}
                    fullWidth
                    variant="standard"
                  />
                  )}


              </Grid>

              <Grid item xs={6}>
              

              {selectedRowRelative &&  (<TextField
                  autoFocus
                  margin="dense"
                  id="rel_fatherfullname"
                  name="rel_fatherfullname"
                  InputProps={{
                    readOnly: isReadOnly,
                  }}
                  label="Ονομα/Επώνυμο πατέρα"
                  type="text"
                  defaultValue={selectedRowRelative ? selectedRowRelative.fatherfullname : ""}
                  fullWidth
                  variant="standard"
                />
              )}



              </Grid>
            </Grid>


            <Grid container spacing={6}>

              <Grid item xs={6}>

              {selectedRowRelative &&  (<TextField
                    autoFocus
                    margin="dense"
                    id="rel_motherfullname"
                    name="rel_motherfullname"
                    InputProps={{
                      readOnly: isReadOnly,
                    }}
                    label="Ονομα/Επώνυμο μητέρας"
                    type="text"
                    defaultValue={selectedRowRelative ? selectedRowRelative.motherfullname : ""}
                    fullWidth
                    variant="standard"
                  />
                  )}
                



              </Grid>

              <Grid item xs={6}>

                  {selectedRowRelative &&  (<TextField
                        autoFocus
                        margin="dense"
                        id="rel_birthdate"
                        name="rel_birthdate"
                        InputProps={{
                          readOnly: isReadOnly,
                        }}
                        label="Ημερομηνία γέννησης"
                        type="text"
                        defaultValue={selectedRowRelative ? selectedRowRelative.birthdate : ""}
                        fullWidth
                        variant="standard"
                      />
                      )}

              </Grid>


            </Grid>


              <Grid container spacing={6}>

                    <Grid item xs={6}>

                    {selectedRowRelative &&  (<TextField
                          autoFocus
                          margin="dense"
                          id="rel_birthlocation"
                          name="rel_birthlocation"
                          InputProps={{
                            readOnly: isReadOnly,
                          }}
                          label="Τόπος γέννησης"
                          type="text"
                          defaultValue={selectedRowRelative ? selectedRowRelative.birthlocation : ""}
                          fullWidth
                          variant="standard"
                        />
                        )}
                      



                    </Grid>

                    <Grid item xs={6}>

                        {selectedRowRelative &&  (<TextField
                              autoFocus
                              margin="dense"
                              id="rel_idNumber"
                              name="rel_idNumber"
                              InputProps={{
                                readOnly: isReadOnly,
                              }}
                              label="AΔΤ"
                              type="text"
                              defaultValue={selectedRowRelative ? selectedRowRelative.idNumber : ""}
                              fullWidth
                              variant="standard"
                            />
                            )}

                    </Grid>


              </Grid>

              <Grid container spacing={6}>

                  <Grid item xs={6}>

                  {selectedRowRelative &&  (<TextField
                        autoFocus
                        margin="dense"
                        id="rel_idPublicationDate"
                        name="rel_idPublicationDate"
                        InputProps={{
                          readOnly: isReadOnly,
                        }}
                        label="Ημερομηνία έκδοσης AΔΤ"
                        type="text"
                        defaultValue={selectedRowRelative ? selectedRowRelative.idPublicationDate : ""}
                        fullWidth
                        variant="standard"
                      />
                      )}
                    



                  </Grid>

                  <Grid item xs={6}>

                      {selectedRowRelative &&  (<TextField
                            autoFocus
                            margin="dense"
                            id="rel_idAuthority"
                            name="rel_idAuthority"
                            InputProps={{
                              readOnly: isReadOnly,
                            }}
                            label="Aρχή έκδοσης AΔΤ"
                            type="text"
                            defaultValue={selectedRowRelative ? selectedRowRelative.idAuthority : ""}
                            fullWidth
                            variant="standard"
                          />
                          )}

                  </Grid>


              </Grid>

              <Grid container spacing={6}>

                      <Grid item xs={6}>

                      {selectedRowRelative &&  (<TextField
                            autoFocus
                            margin="dense"
                            id="rel_afm"
                            name="rel_afm"
                            InputProps={{
                              readOnly: isReadOnly,
                            }}
                            label="ΑΦΜ"
                            type="text"
                            defaultValue={selectedRowRelative ? selectedRowRelative.afm : ""}
                            fullWidth
                            variant="standard"
                          />
                          )}
                        



                      </Grid>

                      <Grid item xs={6}>

                          {selectedRowRelative &&  (<TextField
                                autoFocus
                                margin="dense"
                                id="rel_doy"
                                name="rel_doy"
                                InputProps={{
                                  readOnly: isReadOnly,
                                }}
                                label="ΔΟΥ" 
                                type="text"
                                defaultValue={selectedRowRelative ? selectedRowRelative.doy : ""}
                                fullWidth
                                variant="standard"
                              />
                              )}

                      </Grid>
        

              </Grid>

              <Grid container spacing={6}>

                  <Grid item xs={6}>

                  {selectedRowRelative &&  (<TextField
                        autoFocus
                        margin="dense"
                        id="rel_amka"
                        name="rel_amka"
                        InputProps={{
                          readOnly: isReadOnly,
                        }}
                        label="AMKA"
                        type="text"
                        defaultValue={selectedRowRelative ? selectedRowRelative.amka : ""}
                        fullWidth
                        variant="standard"
                      />
                      )}
                    



                  </Grid>

                  <Grid item xs={3}>

                      {selectedRowRelative &&  (<TextField
                            autoFocus
                            margin="dense"
                            id="rel_phone"
                            name="rel_phone"
                            InputProps={{
                              readOnly: isReadOnly,
                            }}
                            label="Τηλέφωνο Επικοινωνίας" 
                            type="text"
                            defaultValue={selectedRowRelative ? selectedRowRelative.phone : ""}
                            fullWidth
                            variant="standard"
                          />
                          )}

                  </Grid>

                    <Grid item xs={3}>

                      {selectedRowRelative &&  (<TextField
                            autoFocus
                            margin="dense"
                            id="rel_phone2"
                            name="rel_phone2"
                            InputProps={{
                              readOnly: isReadOnly,
                            }}
                            label="Τηλέφωνο Επικοινωνίας 2" 
                            type="text"
                            defaultValue={selectedRowRelative ? selectedRowRelative.phone2 : ""}
                            fullWidth
                            variant="standard"
                          />
                          )}

                    </Grid>


              </Grid>

              <Grid container spacing={6}>

                    <Grid item xs={6}>

                    {selectedRowRelative &&  (<TextField
                          autoFocus
                          margin="dense"
                          id="rel_email"
                          name="rel_email"
                          InputProps={{
                            readOnly: isReadOnly,
                          }}
                          label="Email"
                          type="text"
                          defaultValue={selectedRowRelative ? selectedRowRelative.email : ""}
                          fullWidth
                          variant="standard"
                        />
                        )}
                      



                    </Grid>

                    <Grid item xs={6}>

                        {selectedRowRelative &&  (<TextField
                              autoFocus
                              margin="dense"
                              id="rel_iban"
                              name="rel_iban"
                              InputProps={{
                                readOnly: isReadOnly,
                              }}
                              label="IBAN" 
                              type="text"
                              defaultValue={selectedRowRelative ? selectedRowRelative.iban : ""}
                              fullWidth
                              variant="standard"
                            />
                            )}

                    </Grid>


              </Grid>

              <Grid container spacing={6}>

                <Grid item xs={6}>

                {selectedRowRelative &&  (<TextField
                      autoFocus
                      margin="dense"
                      id="rel_taxisCodeUser"
                      name="rel_taxisCodeUser"
                      InputProps={{
                        readOnly: isReadOnly,
                      }}
                      label="Κωδικός Φορολογικού Φορέα"
                      type="text"
                      defaultValue={selectedRowRelative ? selectedRowRelative.taxisCodeUser : ""}
                      fullWidth
                      variant="standard"
                    />
                    )}
                  



                </Grid>

                <Grid item xs={6}>

                    {selectedRowRelative &&  (<TextField
                          autoFocus
                          margin="dense"
                          id="rel_taxisCodePassword"
                          name="rel_taxisCodePassword"
                          InputProps={{
                            readOnly: isReadOnly,
                          }}
                          label="Συνθηματικό Φορολογικού Φορέα"
                          type="text"
                          defaultValue={selectedRowRelative ? selectedRowRelative.taxisCodePassword: ""}
                          fullWidth
                          variant="standard"
                        />
                        )}
  



                 </Grid>

        


              </Grid>
              </>
            )
          }


          </div>   



      </DialogContent>


      <DialogActions>
                  <Button 
                    onClick={handleClose}
                    sx={{ 
                      variant: 'outlined',
                    }}
                  >
                    Ακύρωση
                  </Button>
                {!isReadOnly && <Button type="submit" disabled={!!afmError || !!amkaError}>Αποθήκευση</Button>}
      </DialogActions>
  
    
    </Dialog>


    )
  );
});

DialogFuneral.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  logo: PropTypes.element,
  className: PropTypes.string,
  selectedRowDeath: PropTypes.object,
  isReadOnly: PropTypes.bool
};

export default DialogFuneral;