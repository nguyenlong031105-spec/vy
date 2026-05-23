import { FaGamepad, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar({ cartCount, onLogout }) {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <button className="logo logo-button" onClick={() => navigate("/home")}>
        <FaGamepad />
        <h2>GAME SHOP</h2>
      </button>

      <nav>
        <button onClick={() => navigate("/home")}>Trang chủ</button>
        <button onClick={() => navigate("/products")}>Sản phẩm</button>
        <button onClick={() => navigate("/flash-sale")}>Flash Sale</button>
        <button onClick={() => navigate("/contact")}>Liên hệ</button>
      </nav>

      <div className="nav-right">
        <button className="login-btn" onClick={onLogout}>
          <FaSignOutAlt />
          Đăng xuất
        </button>

        <button className="cart-btn" onClick={() => navigate("/cart")}>
          <FaShoppingCart />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
