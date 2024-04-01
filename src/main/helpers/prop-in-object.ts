export function propInObject<T = string, K extends PropertyKey = string>(
  obj: unknown,
  prop: K
): obj is Record<K, T> {
  return !!obj && typeof obj === 'object' && prop in obj;
}
