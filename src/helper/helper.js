export const idrCurrency = value => {
  let idr = '';
  let valueRef = value
    .toString()
    .split('')
    .reverse()
    .join('');
  for (let i = 0; i < valueRef.length; i++)
    if (i % 3 == 0) idr += valueRef.substr(i, 3) + '.';
  return (
    'Rp' +
    idr
      .split('', idr.length - 1)
      .reverse()
      .join('')
  );
};
