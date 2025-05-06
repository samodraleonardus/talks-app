/**
 * test scenario for selectedCategoryReducer
 *
 * - selectedCategoryReducer function
 *   - should return the initial state when given unknown action
 *   - should return the category when given by SET_SELECTED_CATEGORY action
 *   - should return null when given by CLEAR_SELECTED_CATEGORY action
 */


import { describe, it, expect } from 'vitest';
import selectedCategoryReducer from './reducer';
import { ActionType } from './action';

describe('selectedCategoryReducer function', () => {
  it('should return the initial state when given unknown action', () => {
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    const nextState = selectedCategoryReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it('should return the category when given by SET_SELECTED_CATEGORY action', () => {
    const action = {
      type: ActionType.SET_SELECTED_CATEGORY,
      payload: {
        category: 'technology',
      },
    };

    const nextState = selectedCategoryReducer(null, action);

    expect(nextState).toBe('technology');
  });

  it('should return null when given by CLEAR_SELECTED_CATEGORY action', () => {
    const initialState = 'lifestyle';

    const action = {
      type: ActionType.CLEAR_SELECTED_CATEGORY,
    };

    const nextState = selectedCategoryReducer(initialState, action);

    expect(nextState).toBeNull();
  });
});