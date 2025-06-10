import { useState } from 'react';
import CardNumberInput from './card-number-input/CardNumberInput';
import ExpirationDateInput from './expiration-date-input/ExpirationDateInput';
import CvcInput from './cvc-input/CvcInput';

export default function ManualCard() {
    const [cardNumber, setCardNumber] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvc, setCvc] = useState('');
    const [cardType, setCardType] = useState('unknown');

    // Validation handlers (can be extended if needed)
    const handleCardNumberValidation = () => {
        // General validation logic can be added here
    };

    const handleExpirationValidation = () => {
        // General validation logic can be added here
    };

    const handleCvcValidation = () => {
        // General validation logic can be added here
    };

    const handleCardTypeChange = (newCardType: string) => {
        setCardType(newCardType);
    };

    return (
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
    );
}