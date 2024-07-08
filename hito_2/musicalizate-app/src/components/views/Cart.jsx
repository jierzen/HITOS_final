import React, { useContext } from 'react';
import { Button, Form, Image } from 'react-bootstrap';
import { MarketplaceContext } from '../utils/MarketplaceProvider';
import MyNavbar from '../utils/MyNavbar';
import MyFooter from '../utils/MyFooter';

export const Cart = ({ showCart = true }) => {
  const { userSession, updateCart, removeFromCart } = useContext(MarketplaceContext);
  const { cart } = userSession;

  const handleQuantityChange = (event, eventId) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 1 && newQuantity <= 4) {
      updateCart(eventId, newQuantity);
    }
  };

  const total = cart.reduce((acc, item) => {
    const itemTotal = item.ticket_price * item.quantity;
    return acc + itemTotal;
  }, 0);

  return (
    <>
      {showCart && <MyNavbar />}
      <div className="container mt-5">
        <h1>Carrito de Compras</h1>
        {cart.length === 0 ? (
          <p>No tienes eventos en el carrito.</p>
        ) : (
          cart.map((item, index) => (
            <div key={index} className="d-flex align-items-center mb-3">
              <Image src={item.img_url} rounded width={50} height={50} className="me-3" />
              <div className="flex-grow-1">
                <h5>{item.title}</h5>
              </div>
              <Form.Control
                type="number"
                min="1"
                max="4"
                value={item.quantity}
                onChange={(e) => handleQuantityChange(e, item.event_id)}
                className="me-2"
                style={{ width: '60px' }}
              />
              <span className="me-2">CLP</span>
              <span>{item.ticket_price * item.quantity} CLP</span>
              <Button variant="danger" className="ms-3" onClick={() => removeFromCart(item.event_id)}>Eliminar</Button>
            </div>
          ))
        )}
        <h3>Total: {total} CLP</h3>
      </div>
      <MyFooter />
    </>
  );
};

export default Cart;
