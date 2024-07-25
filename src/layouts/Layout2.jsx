import React, { useState } from 'react';

const Layout2 = () => {
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h1>Hello Astro! The current count is {count}</h1>
      <p onClick={increment}>This is a simple React component for Astro.</p>
    </div>
  );
};

export default Layout2;
