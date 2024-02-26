import { store } from "../services/store";
import { ACTION_TYPE_LOGIN, ACTION_TYPE_LOGOUT, ACTION_TYPE_SET_IS_CHECKING_TOKENS, ACTION_TYPE_SET_PASSWORD_RESET, ACTION_TYPE_SET_PASSWORD_RESET_CODE_SENT, ACTION_TYPE_SET_USER_DATA, ACTION_TYPE_SET_USER_LOGGED_IN, ACTION_TYPE_SET_WS_IS_CONNECTED, ACTION_TYPE_OPEN_WS, ADD_INGREDIENT, DECREMENT_AMOUNT, DELETE_INGREDIENT, INCREMENT_AMOUNT, MOVE_INGREDIENT, POST_ORDER, SET_INGREDIENTS, ACTION_TYPE_CLOSE_WS, ACTION_TYPE_SET_WS_MESSAGE, ACTION_TYPE_SEND_WS_MESSAGE, CLEAR_ORDER } from "./const";
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

export type TSetOrderAction = {
  readonly type: typeof POST_ORDER;
  readonly order: TOrder;
};

export type TClearOrderAction = {
  readonly type: typeof CLEAR_ORDER;
};

export type TOrderActions =
  | TSetOrderAction
  | TClearOrderAction;

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

export type TWebsocketOrder = {
  _id: string;
  ingredients: Array<string>;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
}

export type TWebsocketMessage = {
  success: boolean;
  orders: Array<TWebsocketOrder>;
  total: number;
  totalToday: number;
}

export type TWebsocketState = {
  isConnected: boolean;
  message: TWebsocketMessage;
};

export type TOpenWSAction = {
  type: typeof ACTION_TYPE_OPEN_WS;
  payload: string;
}

export type TCloseWSAction = {
  type: typeof ACTION_TYPE_CLOSE_WS;
}

export type TSetWSIsConnected = {
  type: typeof ACTION_TYPE_SET_WS_IS_CONNECTED;
  payload: boolean;
}

export type TSetWSMessage = {
  type: typeof ACTION_TYPE_SET_WS_MESSAGE;
  payload: TWebsocketMessage;
}

export type TSendWSMessage = {
  type: typeof ACTION_TYPE_SEND_WS_MESSAGE;
  payload: any;
}

export type TWebsocketActions =
  | TOpenWSAction
  | TCloseWSAction
  | TSetWSIsConnected
  | TSetWSMessage
  | TSendWSMessage;

export type RootState = ReturnType<typeof store.getState>;

export type TAllActions =
  | TIngredientsActions
  | TBurgerActions
  | TOrderActions
  | TAuthenticationActions
  | TWebsocketActions;

export type AppDispatch = ThunkDispatch<RootState, unknown, TAllActions>;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<
    TReturn,
    Action,
    RootState,
    TAllActions
  >
>;
