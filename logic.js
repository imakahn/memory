const sequence = () => {
  const seq = [];
  let pos = 0;

  const getNext = () => {
    // hardcoded for now - set in config
    seq.push(Math.floor(Math.random() * 4)); // exclusive of max
    pos = 0;
  };

  // const get = () => {
  //   return seq;
  // };

  function* get() {
    const values = [...seq];
    while (values.length > 0) {
      yield values.shift();
    }
    return -1;
  }

  const check = (val) => {
    if (seq[pos] === val) {
      pos++;
      return {
        matches: true,
        remain: seq.length - pos,
        input: val,
      };
    }
    return {
      matches: false,
      reason: `input ${val} does not match ${seq[pos]}`,
    };
  };

  getNext();
  getNext();

  return {get, getNext, check};
};

// const b = sequence();
// console.log(b.get());
// b.next();
// console.log(b.get());
// console.log(b.match(1));
// console.log(b.match(b.get()[0]));

// TODO - jest
// TODO review init point
export default sequence();
