import Header from "./header/Header";
import PaymentBlock from "./body/payment-card/PaymentBlock";
import OrderInfo from "./body/order-info/Order";
import Footer from "./footer/Footer";
function App() {

  return (
    <div className="app">
      <Header />
      <PaymentBlock />
      <OrderInfo />
      <Footer />
    </div>
  )
}

export default App
