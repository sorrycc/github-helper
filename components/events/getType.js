import Types from './Types';

export default function(type, event) {
  let result = Types[type] || type;
  if (typeof result === 'function') {
    result = result(event);
  }
  return result;
};
