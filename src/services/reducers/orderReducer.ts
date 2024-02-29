import { CLEAR_ORDER, POST_ORDER } from '../../utils/const';
import { TOrder, TOrderActions } from '../../utils/types';

// Example:
// order = {
//   "success": true,
//   "name": "Space флюоресцентный spicy традиционный-галактический бургер",
//   "order": {
//       "number": 8133
//   }
// }

const order: TOrder = null

function orderReducer(state: TOrder = order, action: TOrderActions): TOrder {
  switch (action.type) {
    case POST_ORDER:
      return action.order;
    case CLEAR_ORDER:
      return null;
    default:
      return state;
  }
};

export { order, orderReducer };
