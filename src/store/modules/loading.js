
import { handleActions } from '../util';

const initialState = {
  loading: false
};
const reducers = {
  open(state, action) {
    state.loading = true;
  },
  closed(state, action) {
    state.loading = false;
  }
};
export default (state = initialState, action) => handleActions({
  state,
  action,
  reducers,
  namespace: 'loading'
});

