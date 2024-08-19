import React, { useState, useEffect, forwardRef, useRef  } from 'react';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';     
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormControl,FormLabel } from '@mui/material';
import Box from '@mui/material/Box';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { el } from "date-fns/locale";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import IconButton from '@mui/material/IconButton';
import { InputAdornment } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InputMask from 'react-input-mask';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import Skeleton from 'react-loading-skeleton';




const DialogMemorial=forwardRef(({selectedRowDeath,logo,className,open,handleClose,handleSubmit,isReadOnly,create},ref) => {


  const [selectedRowAnouncement, setSelectedRowAnouncement] = useState(null);
  const [isAnouncementLoading, setIsAnouncementLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(selectedRowDeath ? selectedRowDeath.date: null);
  const [birthDate, setBirthDate] = useState(selectedRowDeath ? selectedRowDeath.birthDate : "");
  const [birthDateError, setBirthDateError] = useState("");

  
  const [fullname, setFullname] = useState(selectedRowDeath ? selectedRowDeath.fullname : "");
  const [fortydOrYear, setFortydOrYear] = useState(selectedRowDeath ? selectedRowDeath.fortydOrYear : "");
  const [church, setChurch] = useState(selectedRowDeath ? selectedRowDeath.church : "");
  const [address, setAddress] = useState(selectedRowDeath ? selectedRowDeath.address : "");
  const [phones, setPhones] = useState(selectedRowDeath ? selectedRowDeath.phones : "");  
  const [disc, setDisc] = useState(selectedRowDeath ? selectedRowDeath.disc : "");
  const [cake, setCake] = useState(selectedRowDeath ? selectedRowDeath.cake : "");
  const [sakTsantKout, setSakTsantKout] = useState(selectedRowDeath ? selectedRowDeath.sakTsantKout : "");
  const [stolismos, setStolismos] = useState(selectedRowDeath ? selectedRowDeath.stolismos : "");
  const [schedules, setSchedules] = useState(selectedRowDeath ? selectedRowDeath.schedules : "");
  const [price, setPrice] = useState(selectedRowDeath ? selectedRowDeath.price : "");
  const [comment, setComment] = useState(selectedRowDeath ? selectedRowDeath.comment : "");


  //aggeltiria
  const [wreathsTextFieldValue, setWreathsTextFieldValue] = useState(selectedRowAnouncement ? selectedRowAnouncement.wreaths : "");
  const [an_spouse, setAnSpouse] = useState(selectedRowAnouncement ? selectedRowAnouncement.spouse : "");
  const [an_childs, setAnChilds] = useState(selectedRowAnouncement ? selectedRowAnouncement.childs : "");
  const [an_grandchilds, setAnGrandchilds] = useState(selectedRowAnouncement ? selectedRowAnouncement.grandchilds : "");
  const [an_brothers, setAnBrothers] = useState(selectedRowAnouncement ? selectedRowAnouncement.brothers : "");
  const [an_nieces, setAnNieces] = useState(selectedRowAnouncement ? selectedRowAnouncement.nieces : "");
  const [an_others, setAnOthers] = useState(selectedRowAnouncement ? selectedRowAnouncement.others : "");
  const [an_address, setAnAddress] = useState(selectedRowAnouncement ? selectedRowAnouncement.address : "");
  const [an_additionalinfo, setAnAdditionalInfo] = useState(selectedRowAnouncement ? selectedRowAnouncement.additionalinfo : "");


  
  dayjs.extend(customParseFormat);


  // Create a ref for the Dialog component
  const dialogRef = useRef(null);

  // Example additional style
const labelStyle = {
  flexGrow: 1,
  fontSize: '16px' // Example additional style
};


  useEffect(() => {

    if(selectedRowDeath!=undefined)
      {
      
        fetch(`https://entypafotinopoulosserver.azurewebsites.net/funeral/fullname/${selectedRowDeath.fullname}`)
        .then(response => response.json())
        .then(dataFuneral => {
      
                const existingFuneralAnouncementId = dataFuneral.anouncement;

                fetch(`https://entypafotinopoulosserver.azurewebsites.net/anouncement/${existingFuneralAnouncementId}`)
                .then(response => response.json())
                .then(existingAnouncementData => {
                  console.log('Success:', existingAnouncementData);
                  setSelectedRowAnouncement(existingAnouncementData);
                    
                  //all fields
                    setWreathsTextFieldValue(existingAnouncementData.wreaths);
                    setAnSpouse(existingAnouncementData.spouse);
                    setAnChilds(existingAnouncementData.childs);
                    setAnGrandchilds(existingAnouncementData.grandchilds);
                    setAnBrothers(existingAnouncementData.brothers);
                    setAnNieces(existingAnouncementData.nieces);
                    setAnOthers(existingAnouncementData.others);
                    setAnAddress(existingAnouncementData.address);
                    setAnAdditionalInfo(existingAnouncementData.additionalinfo);



                 })
                .catch(error => console.error('Error:', error));
       })
      }
    

  }, []);
  


  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  

  const isValidBirthDate = (dateString) => {
    // Strict parsing to ensure the format is exactly 'DD/MM/YYYY'
    const birthDate = dayjs(dateString, "DD/MM/YYYY", true);
  
    // Check if the date is valid and correctly formatted
    if (!birthDate.isValid()) {
  
      return false;
    }
  
    const today = dayjs();
    const minDate = today.subtract(150, 'years');
  
    // Check if the date is not in the future and not older than 150 years
    if (birthDate.isAfter(today) || birthDate.isBefore(minDate)) {
      return false;
    }
    
    return true;
  };

  const handleBirthDateChange = (event) => {
    const value = event.target.value;
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;


    if (regex.test(value) && isValidBirthDate(value)){
      setBirthDate(value);
      setBirthDateError("");
    } 
    else
    {
      setBirthDate(value);
      setBirthDateError("Η ημερομηνία πρέπει νά έχει τήν μορφή DD/MM/YYYY");
    }
 
  };




  const handleTextChange = (event) => {
    const { name, value } = event.target; 

    const convertedValue = value.toUpperCase();

    switch (name) {
      case 'fullname':
        setFullname(convertedValue);
        break;
      case 'church':
        setChurch(convertedValue);
        break;    
      case 'address':
          setAddress(convertedValue);
          break;
      case 'disc':
        setDisc(convertedValue);
        break;
      case 'cake':
        setCake(convertedValue);
        break;
      case 'sakTsantKout':
        setSakTsantKout(convertedValue);
        break;
      case 'phones':
        setPhones(convertedValue);
        break;
      case 'stolismos':
        setStolismos(convertedValue);
        break;
      case 'schedules':
        setSchedules(convertedValue);
        break;
      case  'comment':
        setComment(convertedValue);
        break;
      case 'an_spouse':
        setAnSpouse(convertedValue);
           break;
      case 'an_childs':
        setAnChilds(convertedValue);
           break;
      case 'an_grandchilds':
          setAnGrandchilds(convertedValue);
           break;
      case 'an_brothers':
           setAnBrothers(convertedValue);
            break;
      case 'an_nieces':
            setAnNieces(convertedValue);
            break;
      case 'an_others':
            setAnOthers(convertedValue);
            break;
      case 'an_address':
            setAnAddress(convertedValue);
            break;
      case 'an_additionalinfo':
              setAnAdditionalInfo(convertedValue);
              break;        
   
      // Add more cases as needed for other inputs
      default:
        console.warn(`Unknown field: ${name}`);
    }


   
  };

  const handleCreatePdf = () => {

    if (dialogRef && dialogRef.current) {
      dialogRef.current.maximized = true; // Assuming the dialog supports a 'maximized' property
  }
  
    // Assuming the DialogFuneral component has a unique id 'dialog-funeral'
    const input = dialogRef.current;

    // Create a style element for html2canvas container size
        const style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
          .html2canvas-container {
            width: 2200px !important;
            height: 2200px !important;
          }
        `;


        // style.innerHTML = '* { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; }';
        document.head.appendChild(style);

        //end

      input.style.overflow = 'visible';




    html2canvas(input).then((canvas) => {

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 size in mm (210mm x 297mm)
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
      
      pdf.save('dialog-funeral.pdf');
    }).finally(() => {
      // Restore original overflow style
      input.style.overflow = 'auto';
      document.head.removeChild(style);
    });
  }


  const handleCrossButtonClick = () => {
    // Your button click handler logic
    const newText = "ΣΤΕΦΑΝΙ ΣΤΑΥΡΟΣ:"; // Example text to add
    setWreathsTextFieldValue(prevValue => prevValue + newText); // Concatenate the new text to the existing value
  };

   const  handleFavoriteClick = () => {
    // Your favorite icon click handler logic
    const newText = "ΣΤΕΦΑΝΙ ΚΑΡΔΙΑ:"; // Example text to add
    setWreathsTextFieldValue(prevValue => prevValue + newText); // Concatenate the new text to the existing value
  }


  return (
    <Dialog
      ref={dialogRef}
      open={open}
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
      {/* Dialog content goes here */}
      {/* <DialogTitle> <img src={logo} className={className} alt="Logo" /> ΕΝΤΥΠΟ ΜΝΗΜΟΣΥΝΟΥ</DialogTitle> */}
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',gap:'40px',border:'2px solid black', marginTop:'30px' }}>
      <DialogTitle id="draggable-dialog-title"> <img src={logo} className={className} alt="Logo"/> ΕΝΤΥΠΟ ΜΝΗΜΟΣΥΝΟΥ</DialogTitle>
     
      <Grid container spacing={3}>
          <Grid item xs={3} >


          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={el}>
                  <DateTimePicker
                    autoFocus
                    margin="dense"
                    id="selectedDate"
                    name="selectedDate"
                    label="Ημερομηνία"
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
              value={fullname}
              fullWidth
              variant="standard"
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={6}>


          <InputMask
                mask="99/99/9999"
                value={birthDate}
                onChange={handleBirthDateChange}
              >
                {() => (
                  <TextField
                    margin="dense"
                    id="birthDate"
                    name="birthDate"
                    label="Ημερομηνία γέννησης"
                    type="text"
                    error={!!birthDateError}
                    helperText={birthDateError}
                    placeholder="dd/mm/yyyy"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton>
                            <span role="img" aria-label="calendar-icon">📅</span>
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    variant="standard"
                    value={birthDate}
                  />
                )}
            </InputMask>


        

          </Grid>
      </Grid>

       <Grid container spacing={6}>
       <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="fortydOrYear"
              name="fortydOrYear"
              label="40/Ημερο-Ετήσιο"
              InputProps={{
                readOnly: isReadOnly,
              }}
              type="text"
              defaultValue={fortydOrYear}
              fullWidth
              variant="standard"
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="church"
              name="church"
              label="Εκκλησία"
              InputProps={{
                readOnly: isReadOnly,
              }}
              type="text"
              value={church}
              fullWidth
              variant="standard"
              onChange={handleTextChange}
            />
        </Grid>
       </Grid>
     
        <Grid container spacing={6}>
            <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="address"
              name="address"
              label="Διεύθυνση"
              InputProps={{
                readOnly: isReadOnly,
              }}
              type="text"
              value={address}
              fullWidth
              variant="standard"
              onChange={handleTextChange}
            />
            </Grid>

            <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="phones"
              name="phones"
              label="Τηλέφωνα"
              InputProps={{
                readOnly: isReadOnly,
              }}
              type="text"
              value={phones}
              fullWidth
              variant="standard"
              onChange={handleTextChange}
            />
            </Grid>
        </Grid>


        <Grid container spacing={6}>
           <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="disc"
              name="disc"
              label="Δίσκος"
              InputProps={{
                readOnly: isReadOnly,
              }}
              type="text"
              value={disc}
              fullWidth
              variant="standard"
              onChange={handleTextChange}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="cake"
              name="cake"
              label="Κέικ"
              type="text"
              value={cake}
              fullWidth
              variant="standard"
              onChange={handleTextChange}
            />
          </Grid>
        </Grid>


    <Grid container spacing={6}>
        <Grid item xs={6}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="sakTsantKout"
          name="sakTsantKout"
          label="Σακ-Τσάντ-Κουτ"
          InputProps={{
            readOnly: isReadOnly,
          }}
          type="text"
          value={sakTsantKout}
          fullWidth
          variant="standard"
          onChange={handleTextChange}
        />
        </Grid>

        <Grid item xs={6}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="stolismos"
          name="stolismos"
          label="Στολισμός"
          InputProps={{
            readOnly: isReadOnly,
          }}
          type="text"
          value={stolismos}
          fullWidth
          variant="standard"
          onChange={handleTextChange}
        />
        </Grid>
    </Grid>

    <Grid container spacing={6}>
        <Grid item xs={6}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="schedules"
          name="schedules"
          label="Πρόγραμμα"
          type="text"
          value={schedules}
          fullWidth
          variant="standard"
          onChange={handleTextChange}
        />
        </Grid>

        <Grid item xs={6}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="price"
          name="price"
          label="Τιμή"
          InputProps={{
            readOnly: isReadOnly,
          }}
          type="text"
          defaultValue={price}
          fullWidth
          variant="standard"
        />
        </Grid>
    </Grid>

    <Grid container spacing={12}>
        <Grid item xs={12}>
        <TextField
          autoFocus
          required
          margin="dense"
          id="comment"
          name="comment"
          label="Σχόλια"
          InputProps={{
            readOnly: isReadOnly,
          }}
          type="text"
          value={comment}
          fullWidth
          variant="standard"
          onChange={handleTextChange}
        />
        </Grid>

     
    </Grid>

    <TextField
          autoFocus
          margin="dense"
          id="id"
          name="id"
          label="ID"
          type="text"
          defaultValue={selectedRowDeath ? selectedRowDeath._id : ""}
          fullWidth
          variant="standard"
          style={{ display: 'none' }}
        />

          {/* <DialogTitle><img src={logo} className={className} alt="Logo" /> ΑΓΓΕΛΤΗΡΙΑ </DialogTitle>

          <Grid container spacing={0}>

                <Grid item xs={6}>
                  
               <TextField
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
                  


                </Grid>


          </Grid>
            

          <Grid container spacing={6}>

              <Grid item xs={6}>
                
              <TextField
                  autoFocus
                  margin="dense"
                  id="an_spouse"
                  name="an_spouse"
                  InputProps={{
                    readOnly: isReadOnly,
                  }}
                  label="Σύζυγος"
                  type="text"
                  value={selectedRowAnouncement ? selectedRowAnouncement.spouse : ""}
                  fullWidth
                  variant="standard"
                />
                


              </Grid>

                <Grid item xs={6}>
                

                <TextField
                    autoFocus
                    margin="dense"
                    id="an_childs"
                    name="an_childs"
                    InputProps={{
                      readOnly: isReadOnly,
                    }}
                    label="Τέκνα"
                    type="text"
                    value={selectedRowAnouncement ? selectedRowAnouncement.childs : ""}
                    fullWidth
                    variant="standard"
                  />
                



                </Grid>
          </Grid>


          <Grid container spacing={6}>

              <Grid item xs={6}>

              <TextField
                    autoFocus
                    margin="dense"
                    id="an_grandchilds"
                    name="an_grandchilds"
                    InputProps={{
                      readOnly: isReadOnly,
                    }}
                    label="Εγγόνια"
                    type="text"
                    value={selectedRowAnouncement ? selectedRowAnouncement.grandchilds : ""}
                    fullWidth
                    variant="standard"
                  />
                  
                
            


              </Grid>

              <Grid item xs={6}>

                  <TextField
                        autoFocus
                        margin="dense"
                        id="an_brothers"
                        name="an_brothers"
                        InputProps={{
                          readOnly: isReadOnly,
                        }}
                        label="Αδέλφια"
                        type="text"
                        value={selectedRowAnouncement ? selectedRowAnouncement.brothers : ""}
                        fullWidth
                        variant="standard"
                      />
                      

              </Grid>


          </Grid>

          <Grid container spacing={6}>

            <Grid item xs={6}>
              
           <TextField
                      autoFocus
                      margin="dense"
                      id="an_nieces"
                      name="an_nieces"
                      InputProps={{
                        readOnly: isReadOnly,
                      }}
                      label="Ανίψια"
                      type="text"
                      value={selectedRowAnouncement ? selectedRowAnouncement.nieces : ""}
                      fullWidth
                      variant="standard"
                    />
                  
            
            </Grid>

              <Grid item xs={6}>
              
            <TextField
                    autoFocus
                    margin="dense"
                    id="an_others"
                    name="an_others"
                    InputProps={{
                      readOnly: isReadOnly,
                    }}
                    label="Λοιποί συγγενείς"
                    type="text"
                    value={selectedRowAnouncement ? selectedRowAnouncement.others : ""}
                    fullWidth
                    variant="standard"
                  />
                  


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
              
          {selectedRowAnouncement &&  (<TextField
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
                  label="Στεφάνια"
                  type="text"
                  value={selectedRowAnouncement ? selectedRowAnouncement.wreaths : ""}
                  fullWidth
                  variant="standard"
                />
          )}


          </Grid>

          </Grid> */}

            <div style={{border:'2px solid black', marginTop:'30px' }}>
            <DialogTitle><img src={logo} className={className} alt="Logo" /> ΑΓΓΕΛΤΗΡΙΑ </DialogTitle>
            </div>

            <div style={{ marginTop:'30px' }}>
               
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
                                    value={an_spouse}
                                    fullWidth
                                    variant="standard"
                                    onChange={handleTextChange}
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
                                            value={an_brothers}
                                            fullWidth
                                            variant="standard"
                                            onChange={handleTextChange}
                                          />
                                          )}

                              </Grid>


                           
                        </Grid>
                        

                        <Grid container spacing={6}>

                          <Grid item xs={6}>
                                  

                                  {selectedRowAnouncement &&  (<TextField
                                        rows={4}
                                        maxRows={10}
                                        multiline
                                        autoFocus
                                        margin="dense"
                                        id="an_childs"
                                        name="an_childs"
                                        InputProps={{
                                            readOnly: isReadOnly,
                                        }}
                                        label="Τέκνα"
                                        type="text"
                                        value={an_childs}
                                        fullWidth
                                        variant="standard"
                                        onChange={handleTextChange}
                                      />
                                  )}

                          
                          
                          </Grid>

                          <Grid item xs={6}>

                                {selectedRowAnouncement &&  (<TextField
                                        rows={4}
                                        maxRows={10}
                                        multiline
                                        autoFocus
                                        margin="dense"
                                        id="an_grandchilds"
                                        name="an_grandchilds"
                                        InputProps={{
                                            readOnly: isReadOnly,
                                        }}
                                        label="Εγγόνια"
                                        type="text"
                                        value={an_grandchilds}
                                        fullWidth
                                        variant="standard"
                                        onChange={handleTextChange}
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
                                          value={an_nieces}
                                          fullWidth
                                          variant="standard"
                                          onChange={handleTextChange}
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
                                      value={an_others}
                                      fullWidth
                                      variant="standard"
                                      onChange={handleTextChange}
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
                                    value={an_address}
                                    fullWidth
                                    variant="standard"
                                    onChange={handleTextChange}
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
                            value={wreathsTextFieldValue}
                            onChange={(e) => setWreathsTextFieldValue(e.target.value)}
                          />
                        </FormControl>
                      </Grid>
                       </Grid>



                       <Grid container spacing={0}>

                       <Grid item xs={12}>
                                

                                {selectedRowAnouncement &&  (<TextField
                                      rows={4}
                                      maxRows={10}
                                      multiline
                                      autoFocus
                                      margin="dense"
                                      id="an_additionalinfo"
                                      name="an_additionalinfo"
                                      InputProps={{
                                          readOnly: isReadOnly,
                                      }}
                                      label="Επιπλέον Πληροφορίες"
                                      type="text"
                                      value={an_additionalinfo}
                                      fullWidth
                                      variant="standard"
                                      onChange={handleTextChange}
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
                    onClick={handleCreatePdf}
                    sx={{ 
                      variant: 'outlined',
                    }}
                  >
                    Δημιουργία PDF
                  </Button>
            <Button 
              onClick={handleClose}
              sx={{ 
                variant: 'outlined',
              }}
            >
              Ακύρωση
            </Button>
            <Button type="submit">Αποθήκευση</Button>
      </DialogActions>
    </Dialog>
  );
});

DialogMemorial.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    logo: PropTypes.element,
    className: PropTypes.string,
    selectedRowDeath: PropTypes.object,
    isReadOnly: PropTypes.bool,
    dialogRef: PropTypes.object,
    create: PropTypes.bool,
  };

  export default DialogMemorial;