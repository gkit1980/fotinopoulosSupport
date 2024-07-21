import React, { useState, useEffect, forwardRef, useRef  } from 'react';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';     
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MuiPickersUtilsProvider, DateTimePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { el } from "date-fns/locale";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';




const DialogMemorial=forwardRef(({selectedRowDeath,logo,className,open,handleClose,handleSubmit,isReadOnly,create},ref) => {


  const [selectedRowAnouncement, setSelectedRowAnouncement] = useState(null);
  const [selectedDate, setSelectedDate] = useState(selectedRowDeath ? selectedRowDeath.date: null);

  // Create a ref for the Dialog component
  const dialogRef = useRef(null);

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
                 })
                .catch(error => console.error('Error:', error));
       })
      }
    

  }, []);
  


  const handleDateChange = (date) => {
    setSelectedDate(date);
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
      <DialogTitle> <img src={logo} className={className} alt="Logo" /> ΕΝΤΥΠΟ ΜΝΗΜΟΣΥΝΟΥ</DialogTitle>

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
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={el}>
                  <DateTimePicker
                    autoFocus
                    required
                    margin="dense"
                    id="date"
                    name="date"
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
  
            {/* <TextField
              autoFocus
              required
              margin="dense"
              id="date"
              name="date"
              label="Ημερομηνία"
              type="date" // Modified to use datepicker
              defaultValue={selectedRowDeath ? selectedRowDeath.date : ""}
              fullWidth
              variant="standard"
            /> */}
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
              defaultValue={selectedRowDeath ? selectedRowDeath.fortydOrYear : ""}
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
              defaultValue={selectedRowDeath ? selectedRowDeath.church : ""}
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
              id="address"
              name="address"
              label="Διεύθυνση"
              InputProps={{
                readOnly: isReadOnly,
              }}
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.address : ""}
              fullWidth
              variant="standard"
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
              defaultValue={selectedRowDeath ? selectedRowDeath.phones : ""}
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
              id="disc"
              name="disc"
              label="Δίσκος"
              InputProps={{
                readOnly: isReadOnly,
              }}
              type="text"
              defaultValue={selectedRowDeath ? selectedRowDeath.disc : ""}
              fullWidth
              variant="standard"
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
              defaultValue={selectedRowDeath ? selectedRowDeath.cake : ""}
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
          id="sakTsantKout"
          name="sakTsantKout"
          label="Σακ-Τσάντ-Κουτ"
          InputProps={{
            readOnly: isReadOnly,
          }}
          type="text"
          defaultValue={selectedRowDeath ? selectedRowDeath.sakTsantKout : ""}
          fullWidth
          variant="standard"
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
          defaultValue={selectedRowDeath ? selectedRowDeath.stolismos : ""}
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
          id="schedules"
          name="schedules"
          label="Πρόγραμμα"
          type="text"
          defaultValue={selectedRowDeath ? selectedRowDeath.schedules : ""}
          fullWidth
          variant="standard"
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
          defaultValue={selectedRowDeath ? selectedRowDeath.price : ""}
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
          defaultValue={selectedRowDeath ? selectedRowDeath.comment : ""}
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
          label="ID"
          type="text"
          defaultValue={selectedRowDeath ? selectedRowDeath._id : ""}
          fullWidth
          variant="standard"
          style={{ display: 'none' }}
        />

          <DialogTitle><img src={logo} className={className} alt="Logo" /> ΑΓΓΕΛΤΗΡΙΑ </DialogTitle>

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

          </Grid>

                  
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