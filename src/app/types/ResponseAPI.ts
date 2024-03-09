export type ResponseAPI<T> = {
  status: 'success' | 'error',
  path: string,
  statusCode: number,
  message: string,
  result: T,
}