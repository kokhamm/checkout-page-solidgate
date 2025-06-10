import { useState, useEffect } from 'react';

interface ExpirationDateInputProps {
    value: string;
    onChange: (value: string) => void;
    onValidationChange: (isValid: boolean, error: string) => void;
}

export default function ExpirationDateInput({ value, onChange, onValidationChange }: ExpirationDateInputProps) {
    const [error, setError] = useState('');
    const [hasBlurred, setHasBlurred] = useState(false);

    // Smart MM/YY formatting with month auto-completion
    const formatExpirationDate = (inputValue: string) => {
        // Numbers only
        const numbersOnly = inputValue.replace(/[^0-9]/g, '');
        
        if (numbersOnly.length === 0) return '';
        
        // Smart input for first month digit
        if (numbersOnly.length === 1) {
            const firstDigit = parseInt(numbersOnly);
            // If digit is 2-9, add 0 before it
            if (firstDigit >= 2) {
                return '0' + firstDigit + '/';
            }
            return numbersOnly;
        }
        
        // Smart input for second month digit
        if (numbersOnly.length === 2) {
            const firstDigit = parseInt(numbersOnly[0] || '0');
            const secondDigit = parseInt(numbersOnly[1] || '0');
            
            // If first digit is 1, second can only be 0, 1, 2
            if (firstDigit === 1 && secondDigit > 2) {
                return numbersOnly[0]; // Return to first digit
            }
            
            return numbersOnly + '/';
        }
        
        // Add / after two digits and continue with year
        if (numbersOnly.length >= 2) {
            const month = numbersOnly.substring(0, 2);
            const year = numbersOnly.substring(2, 4);
            return month + '/' + year;
        }
        
        return numbersOnly;
    };

    // Enhanced validation
    const validateExpirationDate = (date: string) => {
        if (date.length === 0) return '';
        
        if (date.length < 5) return 'Please enter a valid date MM/YY';
        
        const month = date.substring(0, 2);
        const year = date.substring(3, 5);
        
        // Check month
        const monthNumber = parseInt(month);
        if (monthNumber < 1 || monthNumber > 12) {
            return 'Please enter a valid date MM/YY';
        }
        
        // Check year (24-75 for 2024-2075)
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100; // Last 2 digits of current year
        const currentMonth = currentDate.getMonth() + 1;
        const cardYear = parseInt(year);
        
        // If year is less than current, assume next century
        const fullCardYear = cardYear < currentYear ? 2100 + cardYear : 2000 + cardYear;
        const fullCurrentYear = currentDate.getFullYear();
        
        if (fullCardYear < fullCurrentYear || fullCardYear > 2075) {
            return 'Please enter a valid date MM/YY';
        }
        
        // Check that date is not in the past
        if (fullCardYear === fullCurrentYear && monthNumber < currentMonth) {
            return 'Please enter a valid date MM/YY';
        }
        
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        
        // Special logic for deletion
        if (inputValue.length < value.length) {
            // If deleting "/" symbol, delete entire year part
            if (value.includes('/') && !inputValue.includes('/')) {
                const monthPart = inputValue.replace(/[^0-9]/g, '');
                onChange(monthPart);
                return;
            }
            // Otherwise just update value
            onChange(inputValue);
            return;
        }
        
        // Normal formatting when adding symbols
        const formatted = formatExpirationDate(inputValue);
        if (formatted && formatted.length <= 5) {
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
        const validationError = validateExpirationDate(value);
        
        // Show error only after user has blurred
        if (hasBlurred) {
            setError(validationError);
        }
        
        onValidationChange(validationError === '', validationError);
    }, [value, onValidationChange, hasBlurred]);

    return (
        <div className="expiration-date-input">
            <label className="expiration-date-input__label">Expiration Date</label>
            <input
                type="text"
                className={`expiration-date-input__body ${error ? 'expiration-date-input__input--error' : ''}`}
                placeholder="MM/YY"
                value={value}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                maxLength={5}
                autoComplete="cc-exp"
            />
            {error && hasBlurred && (
                <span className="expiration-date-input__error">{error}</span>
            )}
        </div>
    );
} 