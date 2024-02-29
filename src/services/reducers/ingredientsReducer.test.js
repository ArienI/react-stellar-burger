import { ingredientsReducer, ingredients } from './ingredientsReducer';
import { SET_INGREDIENTS, INCREMENT_AMOUNT, DECREMENT_AMOUNT } from '../../utils/const';
import { bun, main, mockBurger } from 'src/utils/test-mocks';

describe('Тесты ingredientsReducer', () => {
  const initialState = ingredients;

  it('должен возвращать изначальное состояние', () => {
    const action = {};
    const expectedState = initialState;

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен обрабатывать SET_INGREDIENTS', () => {
    const action = { type: SET_INGREDIENTS, ingredientsList: mockBurger };
    const expectedState = mockBurger;

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен увеличивать количество для ингредиента не-булочки на 1', () => {
    const initialState = [main];
    const action = { type: INCREMENT_AMOUNT, id: main._id };
    const expectedState = [{ ...main, amount: 1 }];

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен уменьшать количество для ингредиента не-булочки на 1', () => {
    const initialState = [{ ...main, amount: 1 }];
    const action = { type: DECREMENT_AMOUNT, id: main._id };
    const expectedState = [{ ...main, amount: 0 }];

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен увеличивать количество для ингредиента булочки на 2', () => {
    const initialState = [bun];
    const action = { type: INCREMENT_AMOUNT, id: bun._id };
    const expectedState = [{ ...bun, amount: 2 }];

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен уменьшать количество для ингредиента булочки на 2', () => {
    const initialState = [{ ...bun, amount: 2 }];
    const action = { type: DECREMENT_AMOUNT, id: bun._id };
    const expectedState = [{ ...bun, amount: 0 }];

    expect(ingredientsReducer(initialState, action)).toEqual(expectedState);
  });
});
