# Payment Form App

Hi! This is my payment form app that I built for a test task.

## What does it do?

This app has a payment form where users can enter their credit card details. It looks pretty nice and has validation. The card number formats automatically and it shows the card type (Visa, Mastercard, etc).

## Technologies I used

- React - for the UI components
- TypeScript - because it's better than JavaScript
- SCSS - for styling (I like it more than CSS)
- Vite - for building and running the app

## How to run it

First you need to install Node.js on your computer. Then:

1. Clone this repo
2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost... in your browser

## Other commands

- `npm run build` - builds the app for production
- `npm run lint` - checks for code errors
- `npm run preview` - previews the built app

## About the code

I tried to follow best practices and keep components small. The main payment form is in `src/components/body/payment-card/PaymentForm.tsx`. 

### Features:
- Card number formatting (4-4-4-4)
- Expiration date validation (MM/YY)
- CVC input with masking
- Card type detection (Visa, Mastercard, Amex)
- Form validation
- Test card button for testing

### File structure:
```
checkout-page-solidgate/
├── public/                     # Static assets
├── src/
│   ├── assets/
│   │   └── images/             # Card icons and payment system logos
│   │
│   ├── components/
│   │   ├── App.tsx             # Main app component
│   │   ├── header/
│   │   │   └── Header.tsx      # Header with language switcher
│   │   ├── body/
│   │   │   ├── order-info/
│   │   │   │   └── Order.tsx   # Product info and pricing
│   │   │   └── payment-card/
│   │   │       ├── PaymentBlock.tsx         # Main payment section
│   │   │       ├── ApplePayBtn.tsx          # Apple Pay button
│   │   │       ├── PaymentForm.tsx          # Form with validation logic
│   │   │       ├── ManualCard.tsx           # Manual card input wrapper
│   │   │       ├── StartTrialBtn.tsx        # Submit button
│   │   │       ├── card-number-input/
│   │   │       │   └── CardNumberInput.tsx  # Card number with icons
│   │   │       ├── expiration-date-input/
│   │   │       │   └── ExpirationDateInput.tsx # MM/YY validation
│   │   │       └── cvc-input/
│   │   │           └── CvcInput.tsx         # CVC with tooltip
│   │   ├── footer/
│   │   │   └── Footer.tsx      # Footer with Solidgate logo
│   │   └── utils/
│   │       └── TestCardsButton.tsx # Development test cards
│   │
│   ├── styles/                 # SCSS organized by BEM methodology
│   │   ├── variables/
│   │   │   └── _colors.scss    # Color variables
│   │   ├── base/
│   │   │   ├── _reset.scss     # CSS reset
│   │   │   └── _basic.scss     # Base styles
│   │   └── components/
│   │       ├── _app.scss       # App container styles
│   │       ├── header/
│   │       ├── body/
│   │       │   ├── order-info/
│   │       │   └── payment-card/  # All payment component styles
│   │       ├── footer/
│   │       └── utils/
│   │
│   ├── main.tsx                # App entry point
│   ├── main.scss               # Main SCSS imports
│   └── vite-env.d.ts           # Vite type definitions
│
├── package.json                # Dependencies and scripts
├── vite.config.ts              # Vite configuration
├── tsconfig.json               # TypeScript configuration
├── eslint.config.js            # ESLint rules
└── README.md                   # This file
```

## Test card

There's a blue button in the bottom right corner that fills in a test card number (4242 4242 4242 4242). You still need to enter date and CVC manually.

## Notes

The styling uses BEM methodology. It makes CSS more organized.

## Issues

If something doesn't work, try:
1. Make sure Node.js is installed
2. Delete node_modules and run `npm install` again
3. Check if all dependencies are installed correctly

That's it! Hope you like my app and don`t press "EN" at the top right corner !! :)
