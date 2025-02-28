import { useEffect, useState } from 'react';
import axios from 'axios';

function AssemblePrint() {
  const [productSize, setProductSize] = useState('');
  const [numParts, setNumParts] = useState('');
  const [widths, setWidths] = useState([]);
  const [heights, setHeights] = useState([]);
  const [depths, setDepths] = useState([]);
  const [units, setUnits] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [filamentUsed, setFilamentUsed] = useState(0);
  const [name, setName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email,setEmail] = useState('');

  useEffect(() => {
    const storedProductSize = sessionStorage.getItem('productSize');
    const storedNumParts = sessionStorage.getItem('numParts');
    const storedWidths = JSON.parse(sessionStorage.getItem('widths'));
    const storedHeights = JSON.parse(sessionStorage.getItem('heights'));
    const storedDepths = JSON.parse(sessionStorage.getItem('depths'));
    const storedUnits = sessionStorage.getItem('units');
    const storedTotalPrice = sessionStorage.getItem('totalPrice');
    const storedFilamentUsed = sessionStorage.getItem('filamentUsed');
    const storedName = sessionStorage.getItem('name');
    const storedMobileNumber = sessionStorage.getItem('mobileNumber');
    const storedEmail = sessionStorage.getItem('email'); 

    if (storedProductSize) setProductSize(storedProductSize);
    if (storedNumParts) setNumParts(storedNumParts);
    if (storedWidths) setWidths(storedWidths);
    if (storedHeights) setHeights(storedHeights);
    if (storedDepths) setDepths(storedDepths);
    if (storedUnits) setUnits(storedUnits);
    if (storedTotalPrice) setTotalPrice(storedTotalPrice);
    if (storedFilamentUsed) setFilamentUsed(storedFilamentUsed);
    if(storedName) setName(storedName);
    if(storedMobileNumber) setMobileNumber(storedMobileNumber);
    if(storedEmail) setEmail(storedEmail);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleSubmit = async () => {
    // Prepare data for submission
    const data = {
      name,
      mobileNumber,
      productSize,
      numParts,
      widths,
      heights,
      depths,
      units,
      totalPrice,
      filamentUsed,
      email,
      pageType:'assemble',
    };

    console.log('Data being submitted:', data);

    try {
      const response = await axios.post('http://localhost:3000/submit', data, {
          headers: {
              'Content-Type': 'application/json',
          },
      });
      console.log('Data submitted successfully:', response.data);
      alert('Data submitted successfully');
  } catch (error) {
      console.error('Error submitting data:', error);
      alert(`Error: ${error.response ? error.response.data : error.message}`);
  }
};
  return (
    <div className='print-page'>
      <h1>Assemble Payment Details</h1>
      <div id='payment-details'>
        <p><strong>Name:</strong>{name}</p>
        <p><strong>Mobile Number:</strong>{mobileNumber}</p>
        <p><strong>Product Size:</strong> {productSize}</p>
        <p><strong>Number of Parts:</strong> {numParts}</p>
        <p><strong>Total Price:</strong> Rs.{totalPrice}</p>
        <p><strong>Filament Used in Grams:</strong> {filamentUsed}</p>
        <div>
          <h3>Part Dimensions:</h3>
          {widths && widths.length > 0 && widths.map((width, index) => (
            <div key={index}>
              <p><strong>Part {index + 1} - Width:</strong> {width}{units},<strong>Height:</strong>  {heights[index]}{units}, <strong>Depth:</strong> {depths[index]}{units}</p>
            </div>
          ))}
        </div>
        <div>
        <button onClick={handleSubmit}>Submit Data</button>
          <button onClick={handlePrint}>Print</button>
         
        </div>
      </div>
    </div>
  );
}

export default AssemblePrint;
