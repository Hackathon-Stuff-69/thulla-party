const split = (x: number, n: number) => {
  // If we cannot split the
  // number into exactly 'N' parts
  const retList = [];

  if (x < n) return [];
  // If x % n == 0 then the minimum
  // difference is 0 and all
  // numbers are x / n
  else if (x % n === 0) {
    for (let i = 0; i < n; i++) retList.push(x / n);
  } else {
    // upto n-(x % n) the values
    // will be x / n
    // after that the values
    // will be x / n + 1
    const zp = n - (x % n);
    const pp = Math.floor(x / n);
    for (let i = 0; i < n; i++) {
      if (i >= zp) retList.push(pp + 1);
      else retList.push(pp);
    }
  }

  return retList;
};

export { split };
