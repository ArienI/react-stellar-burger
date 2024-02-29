import { burgerReducer, burger } from "./burgerReducer";
import { ADD_INGREDIENT, DELETE_INGREDIENT, MOVE_INGREDIENT } from '../../utils/const';
import { bun, main, main2, mockBurger, sauce, sauce2 } from "src/utils/test-mocks";

describe('Тесты burgerReducer', () => {
  const initialState = burger;

  it('должен возвращать изначальное состояние', () => {
    const action = {};
    const expectedState = initialState;

    expect(burgerReducer(initialState, action)).toEqual(expectedState);
  });

  it('должен добавлять ингредиент булочку в начало списка', () => {
    const action = { type: ADD_INGREDIENT, ingredient: bun };
    const expectedState = [bun, sauce, main, main2];

    expect(burgerReducer(mockBurger, action)).toEqual(expectedState);
  });

  it('должен добавлять ингредиент не-булочку в конец списка', () => {
    const action = { type: ADD_INGREDIENT, ingredient: sauce2 };
    const expectedState = [sauce, main, main2, sauce2];

    expect(burgerReducer(mockBurger, action)).toEqual(expectedState);
  });

  it('должен удалять ингредиент по индексу', () => {
    const action = { type: DELETE_INGREDIENT, index: 1 };
    const expectedState = [sauce, main2];

    expect(burgerReducer(mockBurger, action)).toEqual(expectedState);
  });

  it('должен перемещать ингредиент из одной позиции в другую', () => {
    const action = { type: MOVE_INGREDIENT, startPosition: 0, endPosition: 2 };
    const expectedState = [main, main2, sauce];

    expect(burgerReducer(mockBurger, action)).toEqual(expectedState);
  });
});
