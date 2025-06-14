import { useState, useEffect } from 'react';
import cvcIcon from '../../../../assets/images/cvv.png';

interface CvcInputProps {
    value: string;
    onChange: (value: string) => void;
    onValidationChange: (isValid: boolean, error: string) => void;
    cardType: string;
}

export default function CvcInput({ value, onChange, onValidationChange, cardType }: CvcInputProps) {
    const [error, setError] = useState('');
    const [hasBlurred, setHasBlurred] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    // Simple validation
    const validateCvc = (cvc: string, cardType: string) => {
        if (cvc.length === 0) return '';
        
        if (cardType === 'amex') {
            if (cvc.length !== 4) return 'CVC must be 4 digits for Amex';
        } else {
            if (cvc.length !== 3) return 'CVC must be 3 digits';
        }
        
        return '';
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value.replace(/[^0-9]/g, '');
        
        // Limit length based on card type
        const maxLength = cardType === 'amex' ? 4 : 3;
        if (inputValue.length <= maxLength) {
            onChange(inputValue);
        }
    };

    const handleFocus = () => {
        setHasBlurred(false);
    };

    const handleBlur = () => {
        setHasBlurred(true);
    };

    const handleInfoClick = () => {
        setShowTooltip(true);
        
        // Hide tooltip after 2 seconds
        setTimeout(() => {
            setShowTooltip(false);
        }, 2000);
    };

    // Validation on change
    useEffect(() => {
        const validationError = validateCvc(value, cardType);
        
        // Show error only after user has blurred
        if (hasBlurred) {
            setError(validationError);
        }
        
        onValidationChange(validationError === '', validationError);
    }, [value, cardType, onValidationChange, hasBlurred]);

    return (
        <div className="cvc-input">
            <label className="cvc-input__label">CVC</label>
            <div className="cvc-input__wrapper">
                <input
                    type="password"
                    className={`cvc-input__body ${error ? 'cvc-input__input--error' : ''}`}
                    placeholder={cardType === 'amex' ? '••••' : '•••'}
                    value={value}
                    onChange={handleChange}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    maxLength={cardType === 'amex' ? 4 : 3}
                    autoComplete="cc-csc"
                />
                <button className="cvc-input__info-btn" onClick={handleInfoClick} type="button">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9 18C13.9706 18 18 13.9706 18 9C18 4.02944 13.9706 0 9 0C4.02944 0 0 4.02944 0 9C0 13.9706 4.02944 18 9 18ZM10.7236 13.6377L10.874 13.0225C10.7965 13.0589 10.6712 13.1022 10.498 13.1523C10.3249 13.1979 10.1699 13.2207 10.0332 13.2207C9.74154 13.2207 9.53646 13.1729 9.41797 13.0771C9.29948 12.9814 9.24023 12.8014 9.24023 12.5371C9.24023 12.4323 9.25846 12.2773 9.29492 12.0723C9.33138 11.8672 9.3724 11.6849 9.41797 11.5254L9.97852 9.53613C10.0332 9.35384 10.0697 9.15332 10.0879 8.93457C10.1107 8.71582 10.1221 8.56315 10.1221 8.47656C10.1221 8.05729 9.97396 7.71777 9.67773 7.45801C9.38607 7.19369 8.96908 7.06152 8.42676 7.06152C8.12598 7.06152 7.80697 7.11621 7.46973 7.22559C7.13249 7.3304 6.7793 7.45801 6.41016 7.6084L6.25977 8.22363C6.36914 8.18262 6.49902 8.13932 6.64941 8.09375C6.80436 8.04818 6.95475 8.02539 7.10059 8.02539C7.39681 8.02539 7.59733 8.07552 7.70215 8.17578C7.80697 8.27604 7.85938 8.45378 7.85938 8.70898C7.85938 8.85026 7.84115 9.00749 7.80469 9.18066C7.77279 9.34928 7.73177 9.5293 7.68164 9.7207L7.12109 11.7168C7.07096 11.9264 7.03451 12.1156 7.01172 12.2842C6.98893 12.4482 6.97754 12.61 6.97754 12.7695C6.97754 13.1797 7.12793 13.5192 7.42871 13.7881C7.73405 14.0524 8.16016 14.1846 8.70703 14.1846C9.0625 14.1846 9.37467 14.1367 9.64355 14.041C9.91243 13.9499 10.2725 13.8154 10.7236 13.6377ZM10.6211 5.56445C10.8854 5.31836 11.0176 5.02214 11.0176 4.67578C11.0176 4.32943 10.8854 4.0332 10.6211 3.78711C10.3613 3.54102 10.0469 3.41797 9.67773 3.41797C9.30859 3.41797 8.99186 3.54102 8.72754 3.78711C8.46322 4.0332 8.33105 4.32943 8.33105 4.67578C8.33105 5.02214 8.46322 5.31836 8.72754 5.56445C8.99186 5.80599 9.30859 5.92676 9.67773 5.92676C10.0469 5.92676 10.3613 5.80599 10.6211 5.56445Z" fill="#B0B4BE"/>
                    </svg>
                </button>
                
                {showTooltip && (
                    <div className="cvc-input__tooltip">
                        <img src={cvcIcon} alt="CVC location" className="cvc-input__tooltip-icon" />
                    </div>
                )}
            </div>
            
            {error && hasBlurred && (
                <span className="cvc-input__error">{error}</span>
            )}
        </div>
    );
} 