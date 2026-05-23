import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaStar } from "react-icons/fa";
import { games, formatPrice } from "../data/games";
import { addGameToCart } from "../utils/cart";

function ProductsPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchText, setSearchText] = useState("");

  const selectedCategory = searchParams.get("category") || "All";

  const categories = useMemo(() => {
    return ["All", ...new Set(games.map((game) => game.category))];
  }, []);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchCategory =
        selectedCategory === "All" ||
        game.category.toLowerCase() === selectedCategory.toLowerCase();

      const matchSearch = game.title
        .toLowerCase()
        .includes(searchText.toLowerCase());

      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchText]);

  const handleaddToCart = (game) => {
    addGameToCart(game);
    alert("Đã thêm vào giỏ hàng!");
  };

  const buyNow = (game) => {
    addGameToCart(game);
    navigate("/checkout");
  };

  return (
    <div className="page-screen">
      <button className="floating-cart" onClick={() => navigate("/cart")}>
        🛒
      </button>

      <div className="page-header">
        <Link to="/cart" className="back-link">
          🛒 Xem giỏ hàng
        </Link>

        <h1>Danh sách game & sản phẩm</h1>
        <p>Tìm game, xem chi tiết, thêm giỏ hàng hoặc mua ngay.</p>
      </div>

      <div className="product-tools page-tools">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Tìm game..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => {
            const value = e.target.value;
            value === "All"
              ? setSearchParams({})
              : setSearchParams({ category: value });
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category === "All" ? "Tất cả danh mục" : category}
            </option>
          ))}
        </select>
      </div>

      <div className="game-grid">
        {filteredGames.map((game) => (
          <div className="game-card" key={game.id}>
            {game.discount > 0 && (
              <span className="discount-badge">-{game.discount}%</span>
            )}

            <Link to={`/products/${game.id}`}>
              <img src={game.image} alt={game.title} />
            </Link>

            <div className="game-info">
              <div className="game-meta">
                <span>{game.category}</span>
                <span>
                  <FaStar /> {game.rating}
                </span>
              </div>

              <h3>{game.title}</h3>
              <p>{game.description}</p>

              <div className="game-bottom">
                <div>
                  {game.oldPrice > 0 && <del>{formatPrice(game.oldPrice)}</del>}
                  <span>{formatPrice(game.price)}</span>
                </div>
              </div>

              <div className="game-actions three-actions">
                <button onClick={() => navigate(`/products/${game.id}`)}>
                  Chi tiết
                </button>

                <button onClick={() => handleaddToCart(game)}>
                  <FaShoppingCart /> Thêm vào giỏ
                </button>

                <button onClick={() => buyNow(game)}>Mua ngay</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;