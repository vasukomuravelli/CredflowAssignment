import React from "react";

export const wishlistApi = React.createContext();

export const WishlistApiProvider = ({ children }) => {
  const [wishlist, setWishlist] = React.useState([]);
  const handleWishlist = (value) => {
    setWishlist([...wishlist, value]);
  };
  const deleteWishlist = (name) => {
    let a = wishlist.filter((e) => {
      console.log(name);
      return e.wine !== name;
    });
    setWishlist(a);
  };
  return (
    <wishlistApi.Provider value={{ handleWishlist, wishlist, deleteWishlist }}>
      {children}
    </wishlistApi.Provider>
  );
};
