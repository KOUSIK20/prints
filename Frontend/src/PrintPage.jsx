import  { useEffect, useState } from 'react';
import axios from 'axios'; 

function PrintPage() {
  const [productSize, setProductSize] = useState('');
  const [dimensionsType, setDimensionsType] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [depth, setDepth] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
   const[unit,setUnit]= useState('');
   const [email,setEmail] = useState('');
  useEffect(() => {
    setEmail(sessionStorage.getItem('email'));
    setName(sessionStorage.getItem('name'));
    setMobileNumber(sessionStorage.getItem('mobileNumber'));
    setProductSize(sessionStorage.getItem('productSize'));
    setDimensionsType(sessionStorage.getItem('dimensionsType'));
    setWidth(sessionStorage.getItem('width'));
    setHeight(sessionStorage.getItem('height'));
    setDepth(sessionStorage.getItem('depth'));
    setHours(sessionStorage.getItem('hours'));
    setMinutes(sessionStorage.getItem('minutes'));
    setTotalPrice(sessionStorage.getItem('totalPrice'));
    setUnit(sessionStorage.getItem('unit'));
  }, []);

  const handleSubmit = async () => {
    try {
      
      const data = {
        name,
        mobileNumber,
        productSize,
        unit,
        width,
        height,
        depth,
        hours,
        minutes,
        totalPrice,
        email,
        pageType:'print',
      };
  
      
      const response = await axios.post('http://localhost:3000/submit', data);
  
     
      console.log('Data submitted successfully:', response.data);
      alert('Data submitted successfully');
    } catch (error) {
    
      console.error('Error submitting data:', error);
      alert('Error submitting data');
    }
  };
  

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="print-page">
      <h1>Parts Payment Details</h1>
      <div id="payment-details">
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Mobile Number:</strong> {mobileNumber}</p>
        <p><strong>Product Size:</strong> {productSize}</p>
        <p><strong>Output Time:</strong> {hours} hours and {minutes} minutes</p>
        <p><strong>Dimension Type:</strong> {dimensionsType}</p>
        <p><strong>Dimensions (Width, Height, Depth):</strong> {width} {unit} x {height} {unit} x {depth} {unit}</p>
        <p><strong>Total Amount Paid: </strong>Rs. {totalPrice}</p>
      </div>

      <div>
        <button onClick={handleSubmit}>Submit Data</button>
        <button onClick={handlePrint}>Print</button>
      </div>
    </div>
  );
}

export default PrintPage;
