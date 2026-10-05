export const initialCart = {
  items: []
};

export function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const exist = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (exist) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  qty: item.qty + 1
                }
              : item
          )
        };
      }

      return {
        ...state,
        items: [
          ...state.items,
          {
            ...action.payload,
            qty: 1
          }
        ]
      };
    }

    case 'DECREASE':
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === action.payload
              ? {
                  ...item,
                  qty: item.qty - 1
                }
              : item
          )
          .filter((item) => item.qty > 0)
      };

    case 'REMOVE':
      return {
        ...state,
        items: state.items.filter(
          (item) => item.id !== action.payload
        )
      };

    case 'CLEAR':
      return initialCart;

    default:
      throw new Error(
        `Action không hợp lệ: ${action.type}`
      );
  }
}