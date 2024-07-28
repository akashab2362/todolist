export const catchAsyncError = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch(next);
};

// export const catchAsyncError = (fn) => {
//   (req, res, next) => {
//     Promise.resolve(fn(req, res, next)).catch((err) => {
//       next(err);
//     });
//   };
// };
