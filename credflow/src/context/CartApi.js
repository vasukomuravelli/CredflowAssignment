import React from "react";

export const cartApi = React.createContext();

export const CartApiProvider = ({ children }) => {
  const [cart, setCart] = React.useState([]);
  const handleCart = (value) => {
    setCart([...cart, value]);
  };
  const deleteCart = (name) => {
    let a = cart.filter((e) => {
      console.log(name);
      return e.wine !== name;
    });
    setCart(a);
  };
  return (
    <cartApi.Provider value={{ handleCart, cart, deleteCart }}>
      {children}
    </cartApi.Provider>
  );
};
