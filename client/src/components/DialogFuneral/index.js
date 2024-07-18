
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import DateFnsUtils from "@date-io/date-fns";
import { el, se } from "date-fns/locale";

// import { InputAdornment } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FormControl,FormLabel } from '@mui/material';
import Box from '@mui/material/Box';
import Skeleton from 'react-loading-skeleton';
import { format } from 'date-fns';





function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const DialogFuneral=forwardRef(({selectedRowDeath,logo,className,open,createMode,handleClose,handleSubmit,isReadOnly},ref) => {

  const [selectedRowAnouncement, setSelectedRowAnouncement] = useState(null);
  const [selectedRowRelative, setselectedRowRelative] = useState(null);
  const result = createMode === true ? false : true;
  const [isAnouncementLoading, setIsAnouncementLoading] = useState(result);
  const [isRelativeLoading, setIsRelativeLoading] = useState(result);
  const [afm, setAfm] = useState(selectedRowDeath ? selectedRowDeath.afm : "");
  const [afmError, setAfmError] = useState("");
  const [amka, setAmka] = useState(selectedRowDeath ? selectedRowDeath.amka : "");
  const [amkaError, setAmkaError] = useState("");
  const [ADTDate, setADTDate] = useState(selectedRowDeath ? selectedRowDeath.idPublicationDate : "");
  const [ADTDateError, setADTDateError] = useState("");
  const [selectedDate, setSelectedDate] = useState(selectedRowDeath ? selectedRowDeath.burialDate : new Date());


  const [burialLocation, setBurialLocation] = useState(selectedRowDeath ? selectedRowDeath.burialLocation : "");
  const [church, setChurch] = useState(selectedRowDeath ? selectedRowDeath.church : "");

  const [receiptNumber, setRequestNumber] = useState(selectedRowDeath ? selectedRowDeath.receiptNumber : "");
  const [hasDocument, setHasDocument] = useState(selectedRowDeath ? selectedRowDeath.hasDocument : false);
  const [hasRequest,setHasRequest ] = useState(selectedRowDeath ? selectedRowDeath.hasRequest : false);



  const [fullname, setFullname] = useState(selectedRowDeath ? selectedRowDeath.fullname : "");
  const [fatherMotherName, setFatherMotherName] = useState(selectedRowDeath ? selectedRowDeath.fatherMotherName : "");
  const [foreas, setForeas] = useState(selectedRowDeath ? selectedRowDeath.foreas : "");
  const [spouseName, setSpouseName] = useState(selectedRowDeath ? selectedRowDeath.spouseName : "");
  const [profession, setProfession] = useState(selectedRowDeath ? selectedRowDeath.profession : "");
  const [residence,setResidence] = useState(selectedRowDeath ? selectedRowDeath.residence : "");
  const [placeOfDeath, setPlaceOfDeath] = useState(selectedRowDeath ? selectedRowDeath.placeOfDeath : "");
  const [otherInfo, setOtherInfo] = useState(selectedRowDeath ? selectedRowDeath.otherInfo : "");


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


  //Plhjesteros syggenis

  const [rel_relationdegree, setRelRelationdegree] = useState(selectedRowRelative ? selectedRowRelative.relationdegree : "");
  const [rel_fullname, setRelFullname] = useState(selectedRowRelative ? selectedRowRelative.fullname : "");
  const [rel_fatherfullname, setRelFatherFullname] = useState(selectedRowRelative ? selectedRowRelative.fatherfullname : "");
  const [rel_motherfullname, setRelMotherFullname] = useState(selectedRowRelative ? selectedRowRelative.motherfullname : "");
  const [rel_birthlocation, setRelBirthLocation] = useState(selectedRowRelative ? selectedRowRelative.birthlocation : "");
  const [rel_doy, setRelDoy] = useState(selectedRowRelative ? selectedRowRelative.doy : "");
  const [rel_idAuthority, setRelIdAuthority] = useState(selectedRowRelative ? selectedRowRelative.idAuthority : "");
  const [rel_birthdate, setRelBirthDate] = useState(selectedRowRelative ? selectedRowRelative.birthDate : "");
  const [rel_birthDateError,setRelBirthDateError] = useState("");
  const [rel_idPublicationDate, setRelIdPublicationDate] = useState(selectedRowRelative ? selectedRowRelative.idPublicationDate : "");
  const [rel_idPublicationDateError,setRelIdPublicationDateError] = useState("");
  const [rel_amka, setRelAmka] = useState(selectedRowRelative ? selectedRowRelative.amka : "");
  const [rel_amkaError, setRelAmkaError] = useState("");
  const [rel_afm, setRelAfm] = useState(selectedRowRelative ? selectedRowRelative.afm : "");
  const [rel_afmError, setRelAfmError] = useState("");
  const [rel_phone, setRelPhone] = useState(selectedRowRelative ? selectedRowRelative.phone : "");
  const [rel_residence, setRelResidence] = useState(selectedRowRelative ? selectedRowRelative.residence : "");
  const [rel_phone2, setRelPhone2] = useState(selectedRowRelative ? selectedRowRelative.phone2 : "");
  const [rel_email, setRelEmail] = useState(selectedRowRelative ? selectedRowRelative.email : "");
  const [rel_iban, setRelIban] = useState(selectedRowRelative ? selectedRowRelative.iban : "");
  const [rel_taxisCodeUser, setRelTaxisCodeUser] = useState(selectedRowRelative ? selectedRowRelative.taxisCodeUser : "");
  const [rel_taxisCodePassword, setRelTaxisCodePassword] = useState(selectedRowRelative ? selectedRowRelative.taxisCodePassword : "");



  // ///english to greek map
  // const englishToGreekMap = {
  //   'A': 'Α', 'B': 'Β', 'C': 'Σ', 'D': 'Δ', 'E': 'Ε', 'F': 'Φ', 'G': 'Γ', 'H': 'Η', 'I': 'Ι', 'J': 'Ξ', 'K': 'Κ', 'L': 'Λ', 'M': 'Μ',
  //   'N': 'Ν', 'O': 'Ο', 'P': 'Π', 'Q': 'Θ', 'R': 'Ρ', 'S': 'Σ', 'T': 'Τ', 'U': 'Υ', 'V': 'Β', 'W': 'Ω', 'X': 'Χ', 'Y': 'Υ', 'Z': 'Ζ',
  //   'a': 'Α', 'b': 'Β', 'c': 'Σ', 'd': 'Δ', 'e': 'Ε', 'f': 'Φ', 'g': 'Γ', 'h': 'Η', 'i': 'Ι', 'j': 'Ξ', 'k': 'Κ', 'l': 'Λ', 'm': 'Μ',
  //   'n': 'Ν', 'o': 'Ο', 'p': 'Π', 'q': 'Θ', 'r': 'Ρ', 's': 'Σ', 't': 'Τ', 'u': 'Υ', 'v': 'Β', 'w': 'Ω', 'x': 'Χ', 'y': 'Υ', 'z': 'Ζ',
  // };



  const handleTextChange = (event) => {
    const { name, value } = event.target; 

    const convertedValue = value.toUpperCase();

    switch (name) {
      case 'burialLocation':
        setBurialLocation(convertedValue);
        break;
      case 'church':
          setChurch(convertedValue);
          break;
      case 'fullname':
        setFullname(convertedValue);
        break;
       case 'fatherMotherName':
          setFatherMotherName(convertedValue);
          break;
      case 'foreas':
        setForeas(convertedValue);
        break;
      case 'spouseName':
        setSpouseName(convertedValue);
        break;
      case 'profession':
         setProfession(convertedValue);
         break;
      case 'residence':
          setResidence(convertedValue); 
        break;
      case 'placeOfDeath':
        setPlaceOfDeath(convertedValue);
        break;
      case 'otherInfo':
        setOtherInfo(convertedValue);
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
      case 'an_additionalInfo':
              setAnAddress(convertedValue);
              break;      
      case 'rel_relationdegree':
            setRelRelationdegree(convertedValue);
            break;         
      case 'rel_fullname':
            setRelFullname(convertedValue);
            break;      
      case 'rel_fatherfullname':
            setRelFatherFullname(convertedValue);
            break;
      case 'rel_motherfullname':
            setRelMotherFullname(convertedValue);
            break;
      case 'rel_birthlocation':
            setRelBirthLocation(convertedValue);
            break;
      case 'rel_doy':
            setRelDoy(convertedValue);
            break;
      case 'rel_residence': 
            setRelResidence(convertedValue);
            break;
      case 'rel_idAuthority':
            setRelIdAuthority(convertedValue);
            break;
      // Add more cases as needed for other inputs
      default:
        console.warn(`Unknown field: ${name}`);
    }


   
  };


  //end


  // Create a ref for the Dialog component
  const dialogRef = useRef(null);


// Example additional style
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

              //all fields
              setWreathsTextFieldValue(dataAnouncement.wreaths);
              setAnSpouse(dataAnouncement.spouse);
              setAnChilds(dataAnouncement.childs);
              setAnGrandchilds(dataAnouncement.grandchilds);
              setAnBrothers(dataAnouncement.brothers);
              setAnNieces(dataAnouncement.nieces);
              setAnOthers(dataAnouncement.others);
              setAnAddress(dataAnouncement.address);
              setAnAdditionalInfo(dataAnouncement.additionalinfo);



              setIsAnouncementLoading(false);

            })
          .catch(error => console.error('Error:', error));


          fetch(`https://entypafotinopoulosserver.azurewebsites.net/relative/${relativeId}`)
          .then(response => response.json())
          .then(dataRelative => {


            dataRelative.idPublicationDate=formatDate(dataRelative.idPublicationDate);
            dataRelative.birthDate=formatDate(dataRelative.birthDate);
        
              setselectedRowRelative(dataRelative);
              
              setRelRelationdegree(dataRelative.relationdegree);
              setRelFullname(dataRelative.fullname);
              setRelFatherFullname(dataRelative.fatherfullname);
              setRelMotherFullname(dataRelative.motherfullname);
              setRelBirthLocation(dataRelative.birthlocation);
              setRelDoy(dataRelative.doy);
              setRelResidence(dataRelative.residence);
              setRelIdAuthority(dataRelative.idAuthority);
              setRelIdPublicationDate(dataRelative.idPublicationDate);
              setRelAmka(dataRelative.amka);
              setRelAfm(dataRelative.afm);
              setRelBirthDate(dataRelative.birthDate);
              setRelPhone(dataRelative.phone);
              setRelPhone2(dataRelative.phone2);
              setRelEmail(dataRelative.email);
              setRelIban(dataRelative.iban);
              setRelTaxisCodeUser(dataRelative.taxisCodeUser);
              setRelTaxisCodePassword(dataRelative.taxisCodePassword);

              

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
  

    //afm validation
    const validateAfm = (value) => {
       

      if(value=="")
        {
        setAfmError("");
       return;
        }


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

    const validateRelAfm = (value) => {
       

      if(value=="")
        {
       setRelAfmError("");
       return;
        }


      if (value.length !== 9) {
        setRelAfmError("ΑΦΜ πρέπει να αποτελείται από 9 ψηφία.");
      } 
      else if(typeof afm !== 'string') {
        setRelAfmError("ΑΦΜ πρέπει να αποτελείται από ψηφία και όχι χαρακτήρες.");
      }
      else if(typeof afm !== 'string') {
        setRelAfmError("ΑΦΜ πρέπει να αποτελείται από ψηφία και όχι χαρακτήρες.");
      }
      else if(!isValidAfm)
        {
        setRelAfmError("Το ΑΦΜ δεν είναι έγκυρο.");
        }
      else {
        setRelAfmError("");
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
      const { name,value } = event.target;
      switch (name) {
        case 'afm':
          setAfm(value);
          validateAfm(value);
          break;
        case 'rel_afm':
          setRelAfm(value)
          validateRelAfm(value);
          break
        default:
          console.warn(`Unknown field: ${name}`);
      }
    
    }

    //amka validation

 const validateAmka = (amka) => {

      
      if(amka=="")
        {
        setRelAmkaError("");
      return;
        }

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

  const validateRelAmka = (amka) => {

      if(amka=="")
        {
        setRelAmkaError("");
       return;
        }
  
      // Ensure the AMKA is exactly 11 digits long
      if (amka.length !== 11) {
        setRelAmkaError("To AMKA πρέπει να αποτελείται από 11 ψηφία.");
      }
      // Ensure all characters are digits
      else if (!/^\d+$/.test(amka)) {
        setRelAmkaError("To AMKA πρέπει να αποτελείται από ψηφία.");
      }
      else
      {
      // Extract birthdate from the first 6 digits
      const day = parseInt(amka.substring(0, 2), 10);
      const month = parseInt(amka.substring(2, 4), 10);
      const year = parseInt(amka.substring(4, 6), 10);
      
      // Validate the birthdate
      if (!isValidDate(day, month, year)) {
        setRelAmkaError("To AMKA δεν περιέχει έγκυρη ημερομηνία γέννησης.");
      }
      else {
        setRelAmkaError("");
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
      const { name,value } = event.target;
      switch (name) {
          case 'amka':
              setAmka(value);
              validateAmka(value);
                break;
          case 'rel_amka':
                setRelAmka(value);
                validateRelAmka(value);
                break;  
          default:
           console.warn(`Unknown field: ${name}`);
      }
    }


  const handleADTDateChange=(event)=>
    {
      const { value } = event.target;
      setADTDate(value);
      validateADTDate(value);
    }
   

  const validateADTDate = (dateStr) => {

    if(dateStr=="")
      {
      setADTDateError("");
      return;
      }

    
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
    const newText = "ΣΤΕΦΑΝΙ ΣΤΑΥΡΟΣ:"; // Example text to add
    setWreathsTextFieldValue(prevValue => prevValue + newText); // Concatenate the new text to the existing value
  };

   const  handleFavoriteClick = () => {
    // Your favorite icon click handler logic
    const newText = "ΣΤΕΦΑΝΙ ΚΑΡΔΙΑ:"; // Example text to add
    setWreathsTextFieldValue(prevValue => prevValue + newText); // Concatenate the new text to the existing value
  }

  //Relative Validations
  const handleRelBirthDateChange=(event)=>
    {
      const {value} = event.target;
      setRelBirthDate(value);
      validateRelBirthDate(value);
    }

  const validateRelBirthDate = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
  
    if (!datePattern.test(dateStr)) {
      setRelBirthDateError("Η ημερομηνία πρέπει νά έχει τήν μορφή DD/MM/YYYY");
    }
   else
   {
    const [day, month, year] = dateStr.split('/').map(Number);
  
    const dateObject = new Date(year, month - 1, day);
  
    if (dateObject.getFullYear() !== year || dateObject.getMonth() + 1 !== month || dateObject.getDate() !== day) {
      setRelBirthDateError("Η ημερομηνία δέν είναι έγκυρη.");
    }
    else
    setRelBirthDateError("");
  }
  };


  const handleRelIdPublicationDateChange=(event)=>
    {
      const {value} = event.target;
      setRelIdPublicationDate(value);
      validateRelIdPublicationDate(value);
    }

  const validateRelIdPublicationDate = (dateStr) => {
    const datePattern = /^\d{2}\/\d{2}\/\d{4}$/;

    if(dateStr=="")
      {
      setRelIdPublicationDateError("");
      return ;
      }
  
    if (!datePattern.test(dateStr)) {
      setRelIdPublicationDateError("Η ημερομηνία πρέπει νά έχει τήν μορφή DD/MM/YYYY");
    }
   else
   {
    const [day, month, year] = dateStr.split('/').map(Number);
  
    const dateObject = new Date(year, month - 1, day);
  
    if (dateObject.getFullYear() !== year || dateObject.getMonth() + 1 !== month || dateObject.getDate() !== day) {
      setRelIdPublicationDateError("Η ημερομηνία δέν είναι έγκυρη.");
    }
    else
    setRelIdPublicationDateError("");
  }
  };


  const handleDocumentChange = (event) => {
    setHasDocument(event.target.checked);
  };

  const handleRequestChange = (event) => {
    setHasRequest(event.target.checked);
  };

  const handleReceiptNumberChange = (event) => {
    const { value } = event.target;
    
   // Check if the value is not a number
  if (!/^\d*$/.test(value)) {
    // If the value contains characters other than digits, set it to an empty string
    setRequestNumber('');
     } else {
    // If the value is a number, set it to the entered value
    setRequestNumber(value);
      }

  
  }


  return (


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

          const processedFormJson = {
            ...formJson,
            hasDocument: formJson.hasDocument === 'on' ? true : false,
            hasRequest: formJson.hasRequest === 'on' ? true : false,
          };


          handleSubmit(processedFormJson);
        },
      }}
    >
     
     
    
      <DialogTitle id="draggable-dialog-title" align="center" style={{ marginTop: '30px' }}> ΕΝΤΥΠΟ ΘΑΝΟΝΤΟΣ Η ΘΑΝΟΥΣΗΣ</DialogTitle>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',gap:'40px',border:'2px solid black', marginTop:'30px' }}>
      <DialogTitle id="draggable-dialog-title"> <img src={logo} className={className} alt="Logo"/>  ΣΤΟΙΧΕΙΑ ΘΑΝΟΝΤΟΣ Η ΘΑΝΟΥΣΗΣ</DialogTitle>
     
      <Grid container spacing={3}>
          <Grid item xs={3} >


          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={el}>
                  <DateTimePicker
                    autoFocus
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
              margin="dense"
              id="church"
              name="church"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="Ενορία"
              type="text"
              value={church}
              fullWidth
              variant="standard"
              onChange={handleTextChange}
            />
          </Grid>
           


          <Grid item xs={8}>
            <TextField
              autoFocus
              margin="dense"
              id="burialLocation"
              name="burialLocation"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="Ταφή"
              type="text"
              value={burialLocation}
              fullWidth
              variant="standard"
              onChange={handleTextChange}
            />
          </Grid>


  

          <Grid item xs={6}>
                <TextField
                  autoFocus
                  margin="dense"
                  id="receiptNumber"
                  name="receiptNumber"
                  InputProps={{
                    readOnly: isReadOnly,
                  }}
                  label="Αριθμός Απόδειξης"
                  type="text"
                  value={receiptNumber}
                  fullWidth
                  variant="standard"
                  onChange={handleReceiptNumberChange}
                />
          </Grid>


            
          <Grid item xs={3} >
          
                  <FormControlLabel
                    control={
                      <Checkbox
                        InputProps={{
                        readOnly: isReadOnly,
                      }}
                         id="hasDocument"
                         name="hasDocument"
                        checked={hasDocument}
                        onChange={handleDocumentChange}
                      />
                      }
                    label="Παραστατικό"
                  />
           </Grid>

          <Grid item xs={3} >
          
                  <FormControlLabel
                    control={
                      <Checkbox
                        InputProps={{
                        readOnly: isReadOnly,
                        }}
                        id="hasRequest"
                        name="hasRequest"
                        checked={hasRequest}
                        onChange={handleRequestChange}
                      />
                      }
                    label="Aίτηση"
                  />
          </Grid>

     



      </Grid>

      </div>


      <div style={{ marginTop:'45px' }}> 
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
            <TextField
              autoFocus
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
              margin="dense"
              id="fatherMotherName"
              name="fatherMotherName"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="Ονομα πατερα & μητέρας"
              type="text"
              value={fatherMotherName}
              fullWidth
              variant="standard"
              onChange={handleTextChange}
            />
        </Grid>
         
  
        <Grid item xs={6}>
            <TextField
              autoFocus
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
              onChange={handleADTDateChange}
              error={!!ADTDateError}
              helperText={ADTDateError}
              margin="dense"
              format="dd/MM/yyyy HH:mm"
              id="idPublicationDate"
              name="idPublicationDate"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="Ημερομηνία έκδοσης AΔΤ"
              type="text"
              placeholder="DD/MM/YYYY"
              value={ADTDate}
              fullWidth
              variant="standard"
            />
        </Grid>

                     
        <Grid item xs={4}>
            <TextField
              autoFocus
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
              margin="dense"
              id="foreas"
              name="foreas"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="Φορέας Συντ/σης ή Ασφαλισης"
              type="text"
              value={foreas}
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
              margin="dense"
              id="spouseName"
              name="spouseName"
              InputProps={{
                readOnly: isReadOnly,
              }}
              label="Ονομ/νυμο συζύγου"
              type="text"
              value={spouseName}
              fullWidth
              variant="standard"
              onChange={handleTextChange}
            />
            </Grid>
            <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              id="profession"
              name="profession"
              InputProps={{
                  readOnly: isReadOnly,
              }}
              label="Επάγγελμα"
              type="text"
              value={profession}
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
              margin="dense"
              id="residence"
              name="residence"
              InputProps={{
                  readOnly: isReadOnly,
              }}
              label="Τόπος Κατοικίας"
              type="text"
              value={residence}
              fullWidth
              variant="standard"
              onChange={handleTextChange}
            />
            </Grid>

            <Grid item xs={6}>
            <TextField
              autoFocus
              margin="dense"
              id="placeOfDeath"
              name="placeOfDeath"
              InputProps={{
                  readOnly: isReadOnly,
              }}
              label="Τόπος Θανάτου"
              type="text"
              value={placeOfDeath}
              fullWidth
              variant="standard"
              onChange={handleTextChange}
            />
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
                    id="otherInfo"
                    name="otherInfo"
                    InputProps={{
                        readOnly: isReadOnly,
                    }}
                    label="Λοιπές Πληροφορίες"
                    type="text"
                    value={otherInfo}
                    fullWidth
                    variant="standard"
                    onChange={handleTextChange}
                  />
              )}

                    
                    
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
           
            <div style={{border:'2px solid black', marginTop:'30px' }}>
            <DialogTitle><img src={logo} className={className} alt="Logo" /> ΣΤΟΙΧΕΙΑ ΠΛΗΣΙΕΣΤΕΡΟΥ ΣΥΓΓΕΝΗ </DialogTitle>
            </div>

         <div style={{marginTop:'30px'}}>
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
                      value={rel_relationdegree}
                      fullWidth
                      variant="standard"
                      onChange={handleTextChange}
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
                    value={rel_fullname}
                    fullWidth
                    variant="standard"
                    onChange={handleTextChange}
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
                  value={rel_fatherfullname}
                  fullWidth
                  variant="standard"
                  onChange={handleTextChange}
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
                    value={rel_motherfullname}
                    fullWidth
                    variant="standard"
                    onChange={handleTextChange}
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
                        placeholder="DD/MM/YYYY"
                        type="text"
                        value={rel_birthdate}
                        fullWidth
                        format="dd/MM/yyyy HH:mm"
                        variant="standard"
                        onChange={handleRelBirthDateChange}
                        error={!!rel_birthDateError}
                        helperText={rel_birthDateError}
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
                          value={rel_birthlocation}
                          fullWidth
                          variant="standard"
                          onChange={handleTextChange}
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
                        format="dd/MM/yyyy HH:mm"
                        placeholder='DD/MM/YYYY'
                        value={rel_idPublicationDate}
                        fullWidth
                        variant="standard"
                        onChange={handleRelIdPublicationDateChange}
                        error={!!rel_idPublicationDateError}
                        helperText={rel_idPublicationDateError}
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
                            value={rel_idAuthority}
                            fullWidth
                            variant="standard"
                            onChange={handleTextChange}
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
                            value={rel_afm}
                            fullWidth
                            variant="standard"
                            onChange={handleAfmChange}
                            error={!!rel_afmError}
                            helperText={rel_afmError}
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
                                value={rel_doy}
                                fullWidth
                                variant="standard"
                                onChange={handleTextChange}
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
                        value={rel_amka}
                        fullWidth
                        variant="standard"
                        onChange={handleAmkaChange}
                        error={!!rel_amkaError}
                        helperText={rel_amkaError}
                      />
                      )}
                    



                  </Grid>



                  <Grid item xs={6}>

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
                          defaultValue={rel_phone}
                          fullWidth
                          variant="standard"
                          onChange={handleTextChange}
                        />
                        )}

                </Grid>


              </Grid>

              <Grid container spacing={6}>


                  <Grid item xs={6}>

                    {selectedRowRelative &&  (<TextField
                          autoFocus
                          margin="dense"
                          id="rel_residence"
                          name="rel_residence"
                          InputProps={{
                            readOnly: isReadOnly,
                          }}
                          label="Τόπος Κατοικίας" 
                          type="text"
                          defaultValue={rel_residence}
                          fullWidth
                          variant="standard"
                          onChange={handleTextChange}
                        />
                        )}

                  </Grid>

                  <Grid item xs={6}>

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
                    defaultValue={rel_phone2}
                    fullWidth
                    variant="standard"
                    onChange={handleTextChange}
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
                          defaultValue={rel_email}
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
                              defaultValue={rel_iban}
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
                      defaultValue={rel_taxisCodeUser}
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
                          defaultValue={rel_taxisCodePassword}
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

      </div>


      <DialogActions>
                  <Button 
                    onClick={handleClose}
                    sx={{ 
                      variant: 'outlined',
                    }}
                  >
                    Ακύρωση
                  </Button>
                {!isReadOnly && <Button type="submit" disabled={!!afmError || !!amkaError || !!ADTDateError || rel_birthDateError || rel_idPublicationDateError}>Αποθήκευση</Button>}
      </DialogActions>
  
    
    </Dialog>


    
  );
});

DialogFuneral.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  logo: PropTypes.element,
  className: PropTypes.string,
  selectedRowDeath: PropTypes.object,
  isReadOnly: PropTypes.bool,
  createMode: PropTypes.bool,
};

export default DialogFuneral;