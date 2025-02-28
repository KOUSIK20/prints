 import { Link } from "react-router-dom";
 export const Mainpage =()=>{
    return(
<div>
    <div> 
      <h1 className="top">3D Prinitng Shop</h1>
      
    </div>

        <div className="homepage-container">
            
      <div className="image-container1">
        <Link to="/part">
        <div className="polaroid1">
          <img src="/Parts.jpg" alt="First Image" className="polaroid-image1" />
          <p className="image-name1">Built your parts</p>
          
        </div>
        </Link>
        </div>
        <div className="image-container2">
        <Link to="/pricing">
        <div className="polaroid2">
          <img src="/Assemble.jpg" alt="Second Image" className="polaroid-image2" />
          <p className="image-name2">Assemble your parts</p>
        </div>
        </Link>
        </div>
      </div>
      
    </div>
    
    );
}