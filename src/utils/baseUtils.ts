export function queue<T, U>(...fns: Array<(arg: T) => U>) {
  return (input: T): U[] => fns.map((fn) => fn(input))
}
