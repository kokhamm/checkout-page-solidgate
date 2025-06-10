export default function OrderInfo() {
    return (
        <div className="order">
            <p className="order__info">Order info &lt;= 100 char.</p>
            <p className="order__description">Description &lt;= 400 char.</p>
            <hr className="order__divider" />
            <span className="order__title">Lamel Professional Smart Skin Compact Powder</span>
            <span className="order__subtitle">Face Powder</span>
            <hr className="order__divider" />
            <span className="order__price">299.99 UAH <span className="order__price-divider">/</span> <span className="order__price-period">month</span></span>
        </div>
    )
}