export function getHash(count) {
  if (!count) {
    count = 10;
  }

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const numbs = '0123456789';
  const all = letters.concat(numbs);

  // starts by letter
  let hash = letters.charAt(Math.floor(Math.random() * letters.length));
  for (let i = 1; i < count; i++) {
    hash += all.charAt(Math.floor(Math.random() * all.length));
  }

  return hash;
}
