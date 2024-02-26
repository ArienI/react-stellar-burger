import { store } from "../services/store";
import { ACTION_TYPE_LOGIN, ACTION_TYPE_LOGOUT, ACTION_TYPE_SET_IS_CHECKING_TOKENS, ACTION_TYPE_SET_PASSWORD_RESET, ACTION_TYPE_SET_PASSWORD_RESET_CODE_SENT, ACTION_TYPE_SET_USER_DATA, ACTION_TYPE_SET_USER_LOGGED_IN, ADD_INGREDIENT, DECREMENT_AMOUNT, DELETE_INGREDIENT, INCREMENT_AMOUNT, MOVE_INGREDIENT, POST_ORDER, SET_INGREDIENTS } from "./const";
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

export type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  amount: number;
  newID?: string;
  index: number;
};

export type TIngredientsList = [] | Array<TIngredient>;

export type TBurger = [] | Array<TIngredient>;

export type TBurgerIngredientsID = Array<String>;

export type TOrder = null | {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
}

export type TOrderActions = {
  readonly type: typeof POST_ORDER;
  readonly order: TOrder;
}

export type TAddIngredientAction = {
  readonly type: typeof ADD_INGREDIENT;
  readonly ingredient: TIngredient;
};

export type TDeleteIngredientAction = {
  readonly type: typeof DELETE_INGREDIENT;
  index: number;
};

export type TMoveIngredientAction = {
  readonly type: typeof MOVE_INGREDIENT;
  startPosition: number;
  endPosition: number;
};

export type TBurgerActions =
  | TAddIngredientAction
  | TDeleteIngredientAction
  | TMoveIngredientAction;

export type TSetIngredientsAction = {
  readonly type: typeof SET_INGREDIENTS;
  readonly ingredientsList: TIngredient[];
};

export type TIncrementAmountAction = {
  readonly type: typeof INCREMENT_AMOUNT;
  readonly id: string;
};

export type TDecrementAmountAction = {
  readonly type: typeof DECREMENT_AMOUNT;
  readonly id: string;
};

export type TIngredientsActions =
  | TSetIngredientsAction
  | TIncrementAmountAction
  | TDecrementAmountAction;

export type TUser = {
  email: string | null;
  name: string | null;
};

export type TUserData = {
  user: TUser
};


export type TAuthenticationState = {
  user: {
    email: string | null;
    name: string | null;
  };
  isLoggedIn: boolean;
  passwordResetCodeSent: boolean;
  passwordReset: boolean;
  isCheckingTokens: boolean;
};

export type TLoginUserAction = {
  readonly type: typeof ACTION_TYPE_LOGIN;
  readonly payload: { user: TUser };
};

export type TLogoutUserAction = {
  readonly type: typeof ACTION_TYPE_LOGOUT;
};

export type TSetUserDataAction = {
  readonly type: typeof ACTION_TYPE_SET_USER_DATA;
  readonly payload: { user: TUser };
};

export type TSetUserLoggedInAction = {
  readonly type: typeof ACTION_TYPE_SET_USER_LOGGED_IN;
};

export type TSetPasswordResetCodeSentAction = {
  readonly type: typeof ACTION_TYPE_SET_PASSWORD_RESET_CODE_SENT;
  readonly payload: boolean;
};

export type TSetPasswordResetAction = {
  readonly type: typeof ACTION_TYPE_SET_PASSWORD_RESET;
  readonly payload: boolean;
};

export type TSetIsCheckingTokens = {
  readonly type: typeof ACTION_TYPE_SET_IS_CHECKING_TOKENS;
  readonly payload: boolean;
};

export type TAuthenticationActions =
  | TLoginUserAction
  | TLogoutUserAction
  | TSetUserDataAction
  | TSetUserLoggedInAction
  | TSetPasswordResetCodeSentAction
  | TSetPasswordResetAction
  | TSetIsCheckingTokens;

export type TRegisterNewUserData = TUser & {
  password: string;
};

export type TRequestPasswordResetData = {
  email: string;
};

export type TResetPasswordData = {
  password: string;
  token: string;
};

export type TLoginData = {
  email: string;
  password: string;
};

export type RootState = ReturnType<typeof store.getState>;

export type TAllActions = TIngredientsActions | TBurgerActions | TOrderActions | TAuthenticationActions;

export type AppDispatch = ThunkDispatch<RootState, unknown, TAllActions>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<
    TReturn,
    Action,
    RootState,
    TAllActions
  >
>;
