export const MIN = 0;
export const MAX = 100;

export const ACTIONS = {
  INCREMENT: 'counter/increment',
  DECREMENT: 'counter/decrement',
  SET_STEP: 'counter/setStep',
  RESET: 'counter/reset'
};

export const initialState = {
  count: 0,
  step: 1,
  history: []
};

export const STEP_OPTIONS = [1, 5, 10, 25];