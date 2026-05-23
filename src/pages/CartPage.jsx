import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCart, removeGameFromCart } from "../utils/cart";
import { formatPrice } from "../data/games";

function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(getCart());
  }, []);

  const handleRemove = (gameId) => {
    removeGameFromCart(gameId);
    setCart(getCart());
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="page-screen">
      <div className="page-header">
        <button className="back-link" onClick={() => navigate("/products")}>
          ← Tiếp tục mua game
        </button>

        <h1>Giỏ hàng của bạn</h1>
        <p>Kiểm tra game đã chọn trước khi thanh toán.</p>
      </div>

      {cart.length === 0 ? (
        <h2>Giỏ hàng đang trống</h2>
      ) : (
        <div className="cart-list">
          {cart.map((game) => (
            <div className="cart-item" key={game.id}>
              <img src={game.image} alt={game.title} />

              <div>
                <h3>{game.title}</h3>
                <p>Số lượng: {game.quantity}</p>
                <p>{formatPrice(game.price)}</p>
              </div>

              <button onClick={() => handleRemove(game.id)}>Xoá</button>
            </div>
          ))}

          <div className="cart-total">
            <h2>Tổng tiền: {formatPrice(totalPrice)}</h2>

            <button onClick={() => navigate("/checkout")}>
              Thanh toán
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;