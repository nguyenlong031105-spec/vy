import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../data/games";
import { clearCart, getCart } from "../utils/cart";

function CheckoutPage() {
  const navigate = useNavigate();
  const buyNowGame = JSON.parse(sessionStorage.getItem("buyNowGame") || "null");
  const [items] = useState(buyNowGame ? [buyNowGame] : getCart());

  const totalPrice = useMemo(() => {
    return items.reduce((sum, game) => sum + game.price, 0);
  }, [items]);

  const submitOrder = (e) => {
    e.preventDefault();

    if (items.length === 0) {
      alert("Chưa có sản phẩm để thanh toán!");
      navigate("/products");
      return;
    }

    if (!buyNowGame) {
      clearCart();
    }

    sessionStorage.removeItem("buyNowGame");
    alert("Đặt hàng thành công! Cảm ơn bạn đã mua game.");
    navigate("/home");
  };

  return (
    <div className="page-screen">
      <div className="page-header">
        <Link to="/cart" className="back-link">← Quay lại giỏ hàng</Link>
        <h1>Thanh toán</h1>
        <p>Nhập thông tin để hoàn tất đơn hàng.</p>
      </div>

      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={submitOrder}>
          <label>Họ và tên</label>
          <input type="text" placeholder="Nhập họ tên" required />

          <label>Email</label>
          <input type="email" placeholder="Nhập email" required />

          <label>Số điện thoại</label>
          <input type="tel" placeholder="Nhập số điện thoại" required />

          <label>Phương thức thanh toán</label>
          <select required>
            <option>Ví điện tử</option>
            <option>Chuyển khoản ngân hàng</option>
            <option>Thẻ game / mã nạp</option>
          </select>

          <button type="submit">Xác nhận thanh toán</button>
        </form>

        <div className="order-summary">
          <h3>Đơn hàng</h3>
          {items.length === 0 ? (
            <p>Chưa có sản phẩm.</p>
          ) : (
            items.map((game) => (
              <div className="checkout-item" key={game.id}>
                <span>{game.title}</span>
                <strong>{formatPrice(game.price)}</strong>
              </div>
            ))
          )}
          <div className="checkout-total">
            <span>Tổng cộng</span>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
