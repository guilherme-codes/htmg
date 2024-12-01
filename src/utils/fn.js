export const pipe = (...fns) => (initialValue) => 
  fns.reduce((value, fn) => fn(value), initialValue)
