import {
  createContext,
  useContext,
  useMemo,
  useReducer
} from 'react';

import {
  cartReducer,
  initialCart,
  CART_ACTIONS,
  getCartTotals
} from '../reducers/cartReducer';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(
    cartReducer,
    initialCart
  );

  const totals = getCartTotals(cart);

  const addToCart = (product) => {
    dispatch({
      type: CART_ACTIONS.ADD,
      payload: product
    });
  };

  const clearCart = () => {
    dispatch({
      type: CART_ACTIONS.CLEAR
    });
  };

  const value = useMemo(
    () => ({
      cart,
      dispatch,
      ...totals,
      addToCart,
      clearCart
    }),
    [cart, totals.totalQuantity, totals.totalPrice]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error(
      'useCart phải được dùng bên trong <CartProvider>'
    );
  }

  return context;
}