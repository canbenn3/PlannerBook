stringHash = (string) => {
  if (typeof string !== "string") {
    return undefined;
  }
  let hash = 100;
  let offset = 0;
  for (const character of string) {
    hash += character.charCodeAt(0) * offset;
    offset += 2;
  }
  while (hash < 99999999) {
    hash += hash;
  }
  return hash;
};
