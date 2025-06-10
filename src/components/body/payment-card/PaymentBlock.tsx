import ApplePayBtn from "./ApplePayBtn";
import PaymentForm from "./PaymentForm";

export default function PaymentBlock () {
    return (
        <div className="payment-block">
            <div className="payment-block__text">
                <span className="payment-block__free-days">5 days free</span>
                <span className="payment-block__after-free-days">then 299.99 UAH per 14 days</span>
            </div>
            <ApplePayBtn />
            <div className="payment-block__devider">
                <span className="payment-block__devider-span"></span>
                <span className="payment-block__devider-text">or pay with card</span>
                <span className="payment-block__devider-span"></span>
            </div>
            <PaymentForm />
            <div className="payment-block__details">
                <p className="payment-block__details-text">
                You'll have your <strong>Plan Pro during 1 year</strong>. After this period of time, your plan will be <strong>automatically renewed</strong> with its original price without any discounts applied.
                </p>
            </div>
            
        </div>
    )
}