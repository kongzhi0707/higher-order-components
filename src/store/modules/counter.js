
import { handleActions } from '../util';

const initialState = {
  count: 0
};
const reducers = {
  add(state, action) {
    state.count++;
    console.log(state.count);
  },
  minus(state, action) {
    state.count--;
  }
};
export default (state = initialState, action) => handleActions({
  state,
  action,
  reducers,
  namespace: 'counter'
});

