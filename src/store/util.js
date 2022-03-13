import produce from 'immer';

const getKey = (str, flag) => {
  const index = str.indexOf(flag);
  return str.substring(index + 1, str.length + 1);
};

export const handleActions = ({ state, action, reducers, namespace = '' }) => {
  const obj = Object.keys(reducers)
    .map(key => namespace + '/' + key)
    .includes(action.type)
    ? produce(state, draft => reducers[getKey(action.type, '/')](draft, action))
    : state;
  return obj;
};

