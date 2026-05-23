export const getCart = () => {
  return JSON.parse(localStorage.getItem("cart")) || [];
};

export const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addGameToCart = (game) => {
  const cart = getCart();

  const existingGame = cart.find((item) => item.id === game.id);

  if (existingGame) {
    existingGame.quantity += 1;
  } else {
    cart.push({
      ...game,
      quantity: 1,
    });
  }

  saveCart(cart);
};

export const removeGameFromCart = (gameId) => {
  const cart = getCart();
  const newCart = cart.filter((item) => item.id !== gameId);
  saveCart(newCart);
};

export const clearCart = () => {
  localStorage.removeItem("cart");
};