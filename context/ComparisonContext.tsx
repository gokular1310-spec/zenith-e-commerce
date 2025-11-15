import React, { createContext, useReducer, useEffect, PropsWithChildren } from 'react';
import { Product } from '../types';

const MAX_COMPARE_ITEMS = 4;

type ComparisonState = {
  items: Product[];
};

type ComparisonAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number } // by product id
  | { type: 'CLEAR_COMPARISON' };

const initialState: ComparisonState = {
  items: [],
};

const comparisonReducer = (state: ComparisonState, action: ComparisonAction): ComparisonState => {
  switch (action.type) {
    case 'ADD_ITEM':
      const isExisting = state.items.some(item => item.id === action.payload.id);
      if (isExisting || state.items.length >= MAX_COMPARE_ITEMS) {
        return state; // Do nothing if item exists or limit is reached
      }
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'CLEAR_COMPARISON':
      return { ...state, items: [] };
    default:
      return state;
  }
};

interface ComparisonContextType extends ComparisonState {
  addItem: (product: Product) => void;
  removeItem: (id: number) => void;
  clearComparison: () => void;
  isFull: boolean;
}

export const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const getInitialState = (): ComparisonState => {
  try {
    const savedComparison = localStorage.getItem('comparison');
    return savedComparison ? JSON.parse(savedComparison) : initialState;
  } catch (error) {
    console.error("Could not parse comparison from localStorage", error);
    return initialState;
  }
};

export const ComparisonProvider = ({ children }: PropsWithChildren) => {
  const [state, dispatch] = useReducer(comparisonReducer, getInitialState());

  useEffect(() => {
    localStorage.setItem('comparison', JSON.stringify(state));
  }, [state]);

  const addItem = (product: Product) => dispatch({ type: 'ADD_ITEM', payload: product });
  const removeItem = (id: number) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const clearComparison = () => dispatch({ type: 'CLEAR_COMPARISON' });

  const isFull = state.items.length >= MAX_COMPARE_ITEMS;

  return (
    <ComparisonContext.Provider value={{ ...state, addItem, removeItem, clearComparison, isFull }}>
      {children}
    </ComparisonContext.Provider>
  );
};