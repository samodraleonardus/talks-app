/**
 * skenario test
 *
 * - selectedCategoryAction creators
 *   - should create setSelectedCategoryActionCreator action
 *   - should create clearSelectedCategoryActionCreator action
 */


import { describe, it, expect } from 'vitest';
import {
  ActionType,
  setSelectedCategoryActionCreator,
  clearSelectedCategoryActionCreator,
} from './action';

describe('selectedCategoryAction creators', () => {
  it('should create setSelectedCategoryActionCreator action', () => {
    const category = 'technology';
    const action = setSelectedCategoryActionCreator(category);

    expect(action).toEqual({
      type: ActionType.SET_SELECTED_CATEGORY,
      payload: {
        category: 'technology',
      },
    });
  });

  it('should create clearSelectedCategoryActionCreator action', () => {
    const action = clearSelectedCategoryActionCreator();

    expect(action).toEqual({
      type: ActionType.CLEAR_SELECTED_CATEGORY,
    });
  });
});