
import axios from 'axios';
import StripeCheckout from "react-stripe-checkout"
import './index.css';
function App() {
  const handleToekn = (totalAmount:any,token:any) => {
    try {

      axios.post('http://localhost:5000/pay',{
        token:token.id,
        amount:totalAmount
      })
      
    } catch (error) {
      console.log(error);
      
    }
  
  };

  const tokenHandle=(token:any)=>{
    handleToekn(100,token)

  }

  return (
    <div className="App">
      <StripeCheckout
        token={tokenHandle}
        stripeKey="pk_test_51NAn3DSGSe2hPQwLmEdssGlYoUWRd9jebhnsujqStBQD0KdzXbIobLFYzKz7S7TFNXiQTkb1ppHuoSzUzRCclE2X00QmcO37wW"
      />
    </div>
  );
}

export default App;
