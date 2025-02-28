import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PricingComponent() {
  const [productSize, setProductSize] = useState('');
  const [numParts, setNumParts] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fileImages, setFileImages] = useState([]);
  const [widths, setWidths] = useState([]);
  const [heights, setHeights] = useState([]);
  const [depths, setDepths] = useState([]);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [units, setUnits] = useState('cm'); 
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalFilamentUsed, setTotalFilamentUsed] = useState(0); 

  const navigate = useNavigate();

  const timeForSize = {
    small: { hours: 2, minutes: 30 },
    medium: { hours: 4, minutes: 45 },
    large: { hours: 7, minutes: 30 }
  };

  const priceForSize = {
    small: 250,
    medium: 500,
    large: 750
  };

  const maxParts = {
    small: 10,
    medium: 5,
    large: 1
  };

  const filamentCostPerCm3 = 1.5; 

  const handleImageUpload = (e) => {
    const files = e.target.files;
    const images = Array.from(files).map(file => URL.createObjectURL(file));

    const maxImages = productSize === 'small' ? 10 : productSize === 'medium' ? 5 : 1;

    if (images.length + fileImages.length > maxImages) {
      setErrorMessage(`You can upload a maximum of ${maxImages} images for ${productSize} size.`);
      return; 
    }

    setFileImages(prevImages => [...prevImages, ...images]);
    setErrorMessage(''); 
  };

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setProductSize(size);

    if (size) {
      const limit = maxParts[size];
      setNumParts(Math.min(numParts, limit));
      setWidths(new Array(numParts).fill(0));
      setHeights(new Array(numParts).fill(0));
      setDepths(new Array(numParts).fill(0));
      setHours(timeForSize[size].hours);
      setMinutes(timeForSize[size].minutes);
      setTotalPrice(priceForSize[size]);
      setTotalPrice(priceForSize[size] * numParts);
    }
  };

  const handleNumPartsChange = (e) => {
    const parts = parseInt(e.target.value, 10);
    if (parts <= maxParts[productSize]) {
      setNumParts(parts);
      setWidths(new Array(parts).fill(0));
      setHeights(new Array(parts).fill(0));
      setDepths(new Array(parts).fill(0));
    } else {
      setErrorMessage(`Maximum allowed parts for ${productSize} is ${maxParts[productSize]}`);
    }
  };

  const handleInputChange = (index, type, value) => {
    const parsedValue = parseFloat(value); 
    
    const maxLimit = units === 'cm' ? 18 : 180; 
    
    if (parsedValue > maxLimit || parsedValue < 0) {
      setErrorMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} cannot exceed ${maxLimit} ${units}.`);
      return; 
    } else {
      setErrorMessage(''); 
    }

    const newValues = type === 'width' ? [...widths] :
                      type === 'height' ? [...heights] :
                      [...depths];
    newValues[index] = parsedValue;

    type === 'width' ? setWidths(newValues) :
    type === 'height' ? setHeights(newValues) :
    setDepths(newValues);
  };

  const handleUnitChange = (e) => {
    setUnits(e.target.value);
  };

  const calculateFilament = () => {
    let totalFilament = 0;
    for (let i = 0; i < numParts; i++) {
      const width = widths[i] || 0;
      const height = heights[i] || 0;
      const depth = depths[i] || 0;

      let volume = 0;
     
      if (units === 'cm') {
        volume = width * height * depth;
      } else {
        volume = (width / 10) * (height / 10) * (depth / 10);
      }

      totalFilament += volume;
    }
    setTotalFilamentUsed(totalFilament); 
    return totalFilament;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filamentUsed = calculateFilament();
    const filamentCost = filamentUsed * filamentCostPerCm3; 
    const basePrice = priceForSize[productSize] * numParts;
    const totalCost = basePrice + filamentCost;
    setTotalPrice(totalCost);
    console.log({totalPrice});
    sessionStorage.setItem('numParts',numParts);
    
    navigate('/payment', {
      state: {
        source: 'PricingComponent',
        numParts,
        totalPrice: totalCost,
        productSize,
        filamentUsed,
        totalFilamentUsed,
      }
    });
    sessionStorage.setItem('productSize', productSize);
    sessionStorage.setItem('numParts', numParts);
    sessionStorage.setItem('widths', JSON.stringify(widths)); 
    sessionStorage.setItem('heights', JSON.stringify(heights));
    sessionStorage.setItem('depths', JSON.stringify(depths)); 
    sessionStorage.setItem('units', units); 
    sessionStorage.setItem('totalPrice', totalCost); 
    sessionStorage.setItem('filamentUsed', filamentUsed); 
    sessionStorage.setItem('totalFilamentUsed', totalFilamentUsed); 
  };

  return (
    <div className="parts">
      <div className="content-container">
        <div className="image-container">
          {fileImages.length > 0 ? (
            <div className="image-gallery">
              {fileImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Uploaded Preview ${index + 1}`}
                  style={{ width: '300px', margin: '5px' }}
                />
              ))}
            </div>
          ) : (
            <p>No images uploaded yet.</p>
          )}
          
          {errorMessage && <small style={{ color: 'red' }}>{errorMessage}</small>}
        </div>

        <div className="form-container">
          <h1>Assemble Your Parts</h1>
          
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="product-size">Choose Product Size</label>
              <select id="product-size" name="product-size" onChange={handleSizeChange} value={productSize}>
                <option value="">Select Size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>

            <div className="form-group">
              <label>Enter your Parts</label>
              <input
                type="file"
                id="file-upload"
                name="file-upload"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
              />
            </div>

            {productSize && (
              <div className="form-group">
                <label htmlFor="time">Estimated Time to Completion</label>
                <div className='form-group3'>
                  <strong>{hours} hours</strong> and <strong>{minutes} minutes</strong>
                </div>
              </div>
            )}
            
            <div className="form-group">
              <label htmlFor="units">Select Unit</label>
              <select id="units" name="units" onChange={handleUnitChange} value={units}>
                <option value="cm">cm</option>
                <option value="mm">mm</option>
              </select>
            </div>

            <div className="form-group">
              <label>Enter Number of Parts</label>
              <input
                type="number"
                id="numParts"
                name="numParts"
                value={numParts}
                onChange={handleNumPartsChange}
                max={maxParts[productSize]}
              />
              {errorMessage && <small style={{ color: 'red' }}>{errorMessage}</small>}
            </div>

            {numParts > 0 && (
              <div className="dimensions">
                {Array.from({ length: numParts }).map((_, index) => (
                  <div key={index} className="dimension-inputs">
                    <label>Part {index + 1} Dimensions:</label>
                    <input
                      type="number"
                      value={widths[index] || ''}
                      onChange={(e) => handleInputChange(index, 'width', e.target.value)}
                      placeholder="Width"
                    />
                    <input
                      type="number"
                      value={heights[index] || ''}
                      onChange={(e) => handleInputChange(index, 'height', e.target.value)}
                      placeholder="Height"
                    />
                    <input
                      type="number"
                      value={depths[index] || ''}
                      onChange={(e) => handleInputChange(index, 'depth', e.target.value)}
                      placeholder="Depth"
                    />
                    {errorMessage && <small style={{ color: 'red' }}>{errorMessage}</small>}
                  </div>
                ))}
              </div>
            )}

            <button type="submit" className='pay'>Continue</button>
          </form>
          <button onClick={() => navigate(-1)} className="back-btn">Back</button>

        </div>
      </div>
    </div>
  );
}

export default PricingComponent;
