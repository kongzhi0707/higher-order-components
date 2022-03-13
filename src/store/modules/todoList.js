import { handleActions } from '../util';

const initialState = {
  inputValue: '123',
  list: []
};
const reducers = {
  add(state, action) {
    state.list.push(action.data);
  },
  delete(state, action) {
    state.list.splice(action.data, 1);
  },
  changeInput(state, action) {
    state.inputValue = action.data;
  }
};

export default (state = initialState, action) => handleActions({
  state,
  action,
  reducers,
  namespace: 'todo'
});
