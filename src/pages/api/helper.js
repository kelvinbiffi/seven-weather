/**
 * Pattern format error messages
 *
 * @param {Number} code code error
 * @param {String} message message error
 * @param {Response} res HTTP Response Object
 */
export const error = (code, message, res) => {
  res.status(code).send({ code, message });
};
