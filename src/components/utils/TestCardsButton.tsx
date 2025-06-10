import { useState } from 'react';

interface TestCardsButtonProps {
    onCardSelect: (cardNumber: string) => void;
}

export default function TestCardsButton({ onCardSelect }: TestCardsButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    const testCard = {
        name: 'Test Card',
        number: '4242 4242 4242 4242',
        displayNumber: '••••• 4242',
        icon: '💳'
    };

    const handleCardSelect = () => {
        onCardSelect(testCard.number);
        setIsOpen(false);
    };

    return (
        <>
            <div className="test-cards-button">
                <button 
                    className="test-cards-button__trigger"
                    onClick={() => setIsOpen(!isOpen)}
                    type="button"
                >
                    <span className="test-cards-button__icon">💳</span>
                    <span className="test-cards-button__text">Test card</span>
                    <span className="test-cards-button__arrow">^</span>
                </button>
                
                {isOpen && (
                    <div className="test-cards-button__menu">
                        <div className="test-cards-button__title">Test card</div>
                        
                        <div className="test-cards-button__cards">
                            <button
                                className="test-cards-button__card"
                                onClick={handleCardSelect}
                                type="button"
                            >
                                <div className="test-cards-button__card-icon">{testCard.icon}</div>
                                <div className="test-cards-button__card-content">
                                    <div className="test-cards-button__card-name">{testCard.name}</div>
                                    <div className="test-cards-button__card-number">{testCard.displayNumber}</div>
                                </div>
                            </button>
                        </div>
                        
                        <div className="test-cards-button__description">
                            Click to fill card number. Use any future expiration date and three-number CVC
                        </div>
                    </div>
                )}
            </div>
            
            {isOpen && (
                <div 
                    className="test-cards-button__overlay"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </>
    );
} 