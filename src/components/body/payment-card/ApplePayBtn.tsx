import applePayIcon from "../../../assets/images/apple_pay_logo.svg";
export default function ApplePayBtn () {
    return (
        <button className="apple-pay-btn" aria-label="Pay with Apple Pay">
            <img src={applePayIcon} alt="Apple Pay" />
        </button>
    )
}