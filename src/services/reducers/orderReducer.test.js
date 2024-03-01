import { order, orderReducer } from './orderReducer';
import { CLEAR_ORDER, POST_ORDER } from '../../utils/const';
import { mockOrder } from '../../utils/test-mocks';

describe('Тестирование orderReducer', () => {
  const initialState = order;

  it('должен возвращать изначальное состояние', () => {
    expect(orderReducer(initialState, {})).toEqual(initialState);
  });

  it('должен обрабатывать POST_ORDER', () => {
    const action = { type: POST_ORDER, order: mockOrder };
    const expectedState = mockOrder;
    expect(orderReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать CLEAR_ORDER', () => {
    const action = { type: CLEAR_ORDER };
    const expectedState = null;
    expect(orderReducer(mockOrder, action)).toEqual(expectedState);
  });
});
