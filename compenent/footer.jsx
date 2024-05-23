import {Link} from "react-router-dom"
import './footer.scss';
function FOOTER(){
    return ( 

         
              <div className="container">
                <p className="footer-text">
                  This website uses cookies to improve your experience. We'll assume you're ok with this, but you can opt-out if you wish
                </p>
                <div className="buttons">
                  <button className="accept-button">Accept</button>
                  <button className="reject-button">Reject</button>
                </div>
                <p className="footer-credit">
                  Made with <span role="img" aria-label="heart">❤️</span> by IMED EDDINE AMARA Realisé avec React Js
                </p>
              </div>
         
          
        

        )
    
    
    }
export default FOOTER;