import { POST_ORDER } from '../../utils/const';

const order = {};

function orderReducer(state = order, action) {
  switch (action.type) {
    case POST_ORDER:
      return action.order;
    default:
      return state;
  }
};

export { orderReducer };