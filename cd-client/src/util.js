const genRandomHex = (size) => {
  return [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
};

export { genRandomHex };
