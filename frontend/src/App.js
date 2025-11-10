import React, { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts)
      .catch(console.error);
  }, []);

  const add = (p) => setCart((c) => [...c, p]);

  return (
    <div style={{ fontFamily: "Arial", padding: 20 }}>
      <h1>🛒 Flipkart Mini</h1>
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ flex: 3 }}>
          <h2>Products</h2>
          {products.map((p) => (
            <div
              key={p.id}
              style={{ border: "1px solid #ddd", padding: 10, marginBottom: 10 }}
            >
              <h3>{p.name}</h3>
              <p>₹{p.price}</p>
              <button onClick={() => add(p)}>Add to Cart</button>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <h2>Cart ({cart.length})</h2>
          {cart.map((c, i) => (
            <div key={i}>{c.name} — ₹{c.price}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
