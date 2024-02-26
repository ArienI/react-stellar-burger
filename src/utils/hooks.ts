import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { AppDispatch, AppThunk, RootState } from './types';

export const useAppDispatch: () => AppDispatch | AppThunk = dispatchHook;
export const useAppSelector: TypedUseSelectorHook<RootState> = selectorHook;