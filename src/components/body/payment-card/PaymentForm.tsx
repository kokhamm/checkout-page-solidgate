import { useState } from 'react';
import CardNumberInput from './card-number-input/CardNumberInput';
import ExpirationDateInput from './expiration-date-input/ExpirationDateInput';
import CvcInput from './cvc-input/CvcInput';
import TestCardsButton from '../../utils/TestCardsButton';

export default function PaymentForm() {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [cardType, setCardType] = useState('unknown');
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Validation states
    const [cardNumberValid, setCardNumberValid] = useState(false);
    const [expirationValid, setExpirationValid] = useState(false);
    const [cvcValid, setCvcValid] = useState(false);

    // Validation handlers
    const handleCardNumberValidation = (isValid: boolean) => {
        setCardNumberValid(isValid);
    };

    const handleExpirationValidation = (isValid: boolean) => {
        setExpirationValid(isValid);
    };

    const handleCvcValidation = (isValid: boolean) => {
        setCvcValid(isValid);
    };

    const handleCardTypeChange = (newCardType: string) => {
        setCardType(newCardType);
    };

    // Auto-fill only card number from TestCardsButton
    const handleTestCardSelect = (cardNum: string) => {
        setCardNumber(cardNum);
    };

    // Check if form is valid
    const isFormValid = () => {
        return cardNumberValid && 
               expirationValid && 
               cvcValid && 
               cardNumber.trim() !== '' && 
               expirationDate.trim() !== '' && 
               cvc.trim() !== '';
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!isFormValid() || isProcessing) return;

        // Haptic feedback for mobile
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }

        setIsProcessing(true);
        
        // Random delay from 1 to 2 seconds for processing simulation
        const delay = Math.random() * 1000 + 1000;
        
        setTimeout(() => {
            setIsProcessing(false);
            setIsSuccess(true);
            
            // Return to initial state after 4 seconds
            setTimeout(() => {
                setIsSuccess(false);
                // Clear form
                setCardNumber('');
                setExpirationDate('');
                setCvc('');
                setCardType('unknown');
            }, 4000);
        }, delay);
    };

    // Show success message
    if (isSuccess) {
        return (
            <div className="payment-form payment-form--success">
                <div className="payment-form__success">
                    <div className="payment-form__success-icon">👌</div>
                    <h3 className="payment-form__success-title">Payment Successful!</h3>
                    <p className="payment-form__success-text">Your trial has been activated successfully.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <form className="payment-form" onSubmit={handleSubmit}>
                <div className="manual-card">
                    <CardNumberInput
                        value={cardNumber}
                        onChange={setCardNumber}
                        onValidationChange={handleCardNumberValidation}
                        onCardTypeChange={handleCardTypeChange}
                    />
                    
                    <div className="manual-card__row">
                        <ExpirationDateInput
                            value={expirationDate}
                            onChange={setExpirationDate}
                            onValidationChange={handleExpirationValidation}
                        />
                        
                        <CvcInput
                            value={cvc}
                            onChange={setCvc}
                            onValidationChange={handleCvcValidation}
                            cardType={cardType}
                        />
                    </div>
                </div>
                
                <button 
                    type="submit"
                    className={`start-trial-btn ${isProcessing ? 'start-trial-btn--processing' : ''}`}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <>
                            <div className="start-trial-btn__loader"></div>
                            Processing payment
                        </>
                    ) : (
                        'Start Trial'
                    )}
                </button>
            </form>

            <TestCardsButton onCardSelect={handleTestCardSelect} />
        </>
    );
} 