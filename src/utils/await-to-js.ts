// function to<T, U = Error>(
//   promise: Promise<T>,
//   errorExt?: object,
// ): Promise<[U, undefined] | [null, T]> {
//   return promise
//     .then<[null, T]>((data: T) => [null, data])
//     .catch<[U, undefined]>((err: U) => {
//       if (errorExt) {
//         const parsedError = { ...err, ...errorExt };
//         return [parsedError, undefined];
//       }

//       return [err, undefined];
//     });
// }

// export { to };

export const to = <T, U = Error>(promise: Promise<T>): Promise<[null, T] | [U, undefined]> =>
  promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, undefined]>((error: U) => [error, undefined]);
