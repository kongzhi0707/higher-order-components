
import React, { useState } from 'react';

import Throttle from './Throttle';
import ThrottleHoc from './ThrottleHoc';

const IndexHoc = ThrottleHoc(Throttle);

export default () => {
  const [num1, setNumber1] = useState(0);
  const [num2, setNumber2] = useState(0);
  const [num3, setNumber3] = useState(0);

  return <div>
    <IndexHoc num1={num1} num2={num2} num3={num3} />
    <button onClick={() => setNumber1(num1 + 1)}>num1++</button>
    <button onClick={() => setNumber2(num2 + 1)}>num2++</button>
    <button onClick={() => setNumber3(num3 + 1)}>num3++</button>
  </div>
}