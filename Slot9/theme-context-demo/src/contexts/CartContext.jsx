import {
  createContext,
  useContext,
  useReducer
} from 'react';

import {
  cartReducer,
  initialCart
} from './cartReducer';

const CartStateContext = createContext(null);
const CartDispatchContext = createContext(null);

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(
    cartReducer,
    initialCart
  );

  return (
    <CartStateContext.Provider value={state}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartStateContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartStateContext);

  if (context === null) {
    throw new Error(
      'useCart phải nằm trong <CartProvider>'
    );
  }

  return context;
}

export function useCartDispatch() {
  const context = useContext(
    CartDispatchContext
  );

  if (context === null) {
    throw new Error(
      'useCartDispatch phải nằm trong <CartProvider>'
    );
  }

  return context;
}