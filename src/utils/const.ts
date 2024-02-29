export const API_URL = 'https://norma.nomoreparties.space/api';
export const WS_ORDERS = 'wss://norma.nomoreparties.space/orders';
export const ACCESS_TOKEN_EXPIRATION_TIME_IN_MIN = 15;
// ingredients actions
export const SET_INGREDIENTS = 'SET_INGREDIENTS';
export const INCREMENT_AMOUNT = 'INCREMENT_AMOUNT';
export const DECREMENT_AMOUNT = 'DECREMENT_AMOUNT';
// burger actions
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const MOVE_INGREDIENT = 'MOVE_INGREDIENT';
// order actions
export const POST_ORDER = 'POST_ORDER';
export const CLEAR_ORDER = 'CLEAR_ORDER';
// authentication actions
export const ACTION_TYPE_LOGIN = 'ACTION_TYPE_LOGIN';
export const ACTION_TYPE_LOGOUT = 'ACTION_TYPE_LOGOUT';
export const ACTION_TYPE_SET_USER_DATA = 'ACTION_TYPE_SET_USER_DATA';
export const ACTION_TYPE_SET_USER_LOGGED_IN = 'ACTION_TYPE_SET_USER_LOGGED_IN';
export const ACTION_TYPE_SET_PASSWORD_RESET_CODE_SENT = 'ACTION_TYPE_SET_PASSWORD_RESET_CODE_SENT'
export const ACTION_TYPE_SET_PASSWORD_RESET = 'ACTION_TYPE_SET_PASSWORD_RESET'
export const ACTION_TYPE_SET_IS_CHECKING_TOKENS = 'ACTION_TYPE_SET_IS_CHECKING_TOKENS'
// websockets actions
export const ACTION_TYPE_OPEN_WS = 'ACTION_TYPE_OPEN_WS';
export const ACTION_TYPE_CLOSE_WS = 'ACTION_TYPE_CLOSE_WS';
export const ACTION_TYPE_SET_WS_IS_CONNECTED = 'ACTION_TYPE_SET_WS_IS_CONNECTED';
export const ACTION_TYPE_SET_WS_MESSAGE = 'ACTION_TYPE_SET_WS_MESSAGE';
export const ACTION_TYPE_SET_WS_ERROR = 'ACTION_TYPE_SET_WS_ERROR';
