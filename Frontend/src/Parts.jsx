import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Parts() {
  const [productSize, setProductSize] = useState('');
  const [dimensionsType, setDimensionsType] = useState('3D');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [depth, setDepth] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [file, setFile] = useState(null);
  const [unit, setUnit] = useState('cm');
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const timeForSize = {
    small: { hours: 1, minutes: 30 },
    medium: { hours: 3, minutes: 45 },
    large: { hours: 5, minutes: 0 }
  };

  const priceForSize = {
    small: 250,
    medium: 500,
    large: 750
  };

  const filamentPerCm3 = 1.5;

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setProductSize(size);
    if (size) {
      setHours(timeForSize[size].hours);
      setMinutes(timeForSize[size].minutes);
      setTotalPrice(priceForSize[size]);
    }
  };

  const handleDimensionsChange = (e) => {
    const dimensionType = e.target.value;
    setDimensionsType(dimensionType);
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  const handleUnitChange = (e) => {
    setUnit(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate dimensions
    if (unit === 'cm' && (width > 18 || height > 18 || depth > 18)) {
      setErrorMessage('Dimensions in cm cannot exceed 18cm.');
      return;
    } else if (unit === 'mm' && (width > 180 || height > 180 || depth > 180)) {
      setErrorMessage('Dimensions in mm cannot exceed 180mm.');
      return;
    } else {
      setErrorMessage('');
    }

    let volume = width * height * depth;

    if (unit === 'mm') {
      volume = volume / 1000;
    }

    const filamentCost = volume * filamentPerCm3;

    const totalCost = priceForSize[productSize] + filamentCost;
    setTotalPrice(totalCost);

    sessionStorage.setItem('productSize', productSize);
    sessionStorage.setItem('dimensionsType', dimensionsType);
    sessionStorage.setItem('width', width);
    sessionStorage.setItem('height', height);
    sessionStorage.setItem('depth', depth);
    sessionStorage.setItem('hours', hours);
    sessionStorage.setItem('minutes', minutes);
    sessionStorage.setItem('totalPrice', totalCost);
    sessionStorage.setItem('unit',unit);
    console.log({ totalPrice });

    navigate('/payment', {
      state: {
        source: 'Parts',
        totalPrice: totalCost, productSize, dimensionsType, width, height, depth, hours, minutes,unit,
      },
    });
  };

  
  return (
    <div className="parts">
      <div className="content-container">

        <div className="image-container">
          <div className="image-preview">
            {file && (
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded Preview"
                style={{ width: '400px', height: '400px', margin: '5px' }}
              />
            )}
          </div>
        </div>

        <div className="form-container">
          <h1>Build Your Parts</h1>

          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="form-group">
              <label htmlFor="file-upload">Upload Your Design Image</label>
              <input
                type="file"
                id="file-upload"
                name="file-upload"
                accept="image/*, .stl, .obj, .3mf"
                onChange={handleFileChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="product-size">Choose Product Size</label>
              <select id="product-size" name="product-size" onChange={handleSizeChange} value={productSize}>
                <option value="">Select Size</option>
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
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
              <label htmlFor="dimensions-type">Dimension Type</label>
              <select id="dimensions-type" name="dimensions-type" onChange={handleDimensionsChange} value={dimensionsType}>
                <option value="3D">3D</option>
              </select>
            </div>

            {dimensionsType === '3D' && (
              <div className="dimension-inputs">
                <label htmlFor="unit">Unit</label>
                <select id="unit" name="unit" onChange={handleUnitChange} value={unit}>
                  <option value="cm">cm</option>
                  <option value="mm">mm</option>
                </select>

                <label htmlFor="width">Width ({unit})</label>
                <input
                  type="number"
                  id="width"
                  name="width"
                  min="0"
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  required
                />

                <label htmlFor="height">Height ({unit})</label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  min="0"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  required
                />

                <label htmlFor="depth">Depth ({unit})</label>
                <input
                  type="number"
                  id="depth"
                  name="depth"
                  min="0"
                  value={depth}
                  onChange={(e) => setDepth(e.target.value)}
                  required
                />
              </div>
            )}

            {errorMessage && (
              <div className="error-message" style={{ color: 'red' }}>
                {errorMessage}
              </div>
            )}

            <button type="submit" className="pay">Continue</button>
            
            
          </form>
          <button onClick={() => navigate(-1)} className="back-btn">Back</button>
        </div>
      </div>
    </div>
  );
}

export default Parts;
