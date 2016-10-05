module.exports = ({ session }) => async () => new Promise((resolve) => {
  const account = { id: session.user.id };
  resolve(account);
});
