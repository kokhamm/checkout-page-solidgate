import { useState, useEffect, useCallback } from 'react';
import VisaIcon from "../../../../assets/images/visa-symbol.png";
import MastercardIcon from "../../../../assets/images/master-card-symbol.png";
import AmexIcon from "../../../../assets/images/amex-symbol.png";

interface CardNumberInputProps {
    value: string;
    onChange: (value: string) => void;
    onValidationChange: (isValid: boolean, error: string) => void;
    onCardTypeChange: (cardType: string) => void;
}

export default function CardNumberInput({ value, onChange, onValidationChange, onCardTypeChange }: CardNumberInputProps) {
    const [error, setError] = useState('');
    const [hasBlurred, setHasBlurred] = useState(false);

    // Simple card type detection
    const getCardType = (number: string) => {
        const cleanNumber = number.replace(/\s/g, '');
        
        if (cleanNumber.startsWith('4')) return 'visa';
        if (cleanNumber.startsWith('5')) return 'mastercard';
        if (cleanNumber.startsWith('34') || cleanNumber.startsWith('37')) return 'amex';
        
        return 'unknown';
    };

    const isAmex = useCallback((number: string) => {
        return getCardType(number) === 'amex';
    }, []);

    // Luhn algorithm for card number validation
    const luhnCheck = (cardNumber: string) => {
        const digits = cardNumber.replace(/\s/g, '').split('').reverse();
        const sum = digits.reduce((acc, digit, index) => {
            let n = parseInt(digit);
            if (index % 2 === 1) {
                n *= 2;
                if (n > 9) n -= 9;
            }
            return acc + n;
        }, 0);
        return sum % 10 === 0;
    };

    // Card formatting based on type
    const formatCardNumber = (inputValue: string) => {
        // Remove everything except digits
        const numbersOnly = inputValue.replace(/[^0-9]/g, '');
        
        // Determine card type
        const cardType = getCardType(numbersOnly);
        
        if (cardType === 'amex') {
            // Amex format: 4-6-5 (15 digits)
            if (numbersOnly.length <= 4) {
                return numbersOnly;
            } else if (numbersOnly.length <= 10) {
                return numbersOnly.substring(0, 4) + ' ' + numbersOnly.substring(4);
            } else {
                return numbersOnly.substring(0, 4) + ' ' + numbersOnly.substring(4, 10) + ' ' + numbersOnly.substring(10, 15);
            }
        } else {
            // Other cards format: 4-4-4-4 (16 digits)
            const formatted = numbersOnly.replace(/(.{4})/g, '$1 ').trim();
            return formatted;
        }
    };

    // Simple validation with Luhn algorithm
    const validateCardNumber = useCallback((number: string) => {
        const cleanNumber = number.replace(/\s/g, '');
        
        if (cleanNumber.length === 0) return '';
        
        // Check length
        if (isAmex(cleanNumber)) {
            if (cleanNumber.length !== 15) return 'Amex card must contain 15 digits';
        } else {
            if (cleanNumber.length !== 16) return 'Card must contain 16 digits';
        }
        
        // Check validity with Luhn algorithm
        if (!luhnCheck(cleanNumber)) {
            return 'Please enter a valid card number';
        }
        
        return '';
    }, [isAmex]);

    // Icons
    const getVisibleCardIcons = () => {
        const cardType = getCardType(value);
        
        if (cardType === 'visa') {
            return [<img key="visa" src={VisaIcon} alt="Visa" className="card-number-input__card-icon" />];
        }
        if (cardType === 'mastercard') {
            return [<img key="mastercard" src={MastercardIcon} alt="Mastercard" className="card-number-input__card-icon" />];
        }
        if (cardType === 'amex') {
            return [<img key="amex" src={AmexIcon} alt="Amex" className="card-number-input__card-icon" />];
        }
        
        // Default: show Visa and Mastercard
        return [
            <img key="visa" src={VisaIcon} alt="Visa" className="card-number-input__card-icon" />, 
            <img key="mastercard" src={MastercardIcon} alt="Mastercard" className="card-number-input__card-icon" />
        ];
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const numbersOnly = e.target.value.replace(/[^0-9]/g, '');
        const cardType = getCardType(numbersOnly);
        
        // Limit length based on card type
        const maxLength = cardType === 'amex' ? 15 : 16;
        
        if (numbersOnly.length <= maxLength) {
            const formatted = formatCardNumber(e.target.value);
            onChange(formatted);
        }
    };

    const handleFocus = () => {
        setHasBlurred(false);
    };

    const handleBlur = () => {
        setHasBlurred(true);
    };

    // Validation on change
    useEffect(() => {
        const validationError = validateCardNumber(value);
        
        // Show error only after user has blurred
        if (hasBlurred) {
            setError(validationError);
        }
        
        onValidationChange(validationError === '', validationError);
        
        const cardType = getCardType(value);
        onCardTypeChange(cardType);
    }, [value, onValidationChange, onCardTypeChange, hasBlurred, validateCardNumber]);

    return (
        <div className="card-number-input">
            <label className="card-number-input__label">Card Number</label>
            <div className="card-number-input__wrapper">
                <input
                    type="text"
                    className={`card-number-input__body ${error ? 'card-number-input__input--error' : ''}`}
                    placeholder="1234 1234 1234 1234"
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    maxLength={getCardType(value) === 'amex' ? 17 : 19}
                    autoComplete="cc-number"
                />
                <div className="card-number-input__icons">
                    {getVisibleCardIcons()}
                </div>
            </div>
            {error && hasBlurred && (
                <span className="card-number-input__error">{error}</span>
            )}
        </div>
    );
} 