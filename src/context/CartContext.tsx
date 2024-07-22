// import React, { createContext, useContext, useState } from 'react'
// import { FoodItem } from '../components/types'

// interface CartContextType {
//   cartList: FoodItem[]
//   removeAllCartItems: () => void
//   addCartItem: (item: FoodItem) => void
//   removeCartItem: (id: string) => void
//   incrementCartItemQuantity: (id: string) => void
//   decrementCartItemQuantity: (id: string) => void
// }

// const CartContext = createContext<CartContextType | undefined>(undefined)

// export const useCart = () => {
//   const context = useContext(CartContext)
//   if (context === undefined) {
//     throw new Error('useCart must be used within a CartProvider')
//   }
//   return context
// }

// const CartProvider: React.FC = ({ children }) => {
//   const [cartList, setCartList] = useState<FoodItem[]>([])

//   const addCartItem = (item: FoodItem) => {
//     setCartList(prevCartList => [...prevCartList, item])
//   }

//   const removeAllCartItems = () => {
//     setCartList([])
//   }

//   // Implement other actions (removeCartItem, incrementCartItemQuantity, decrementCartItemQuantity) here

//   const value = {
//     cartList,
//     addCartItem,
//     removeAllCartItems,
//     removeCartItem: (id: string) => {}, // Placeholder
//     incrementCartItemQuantity: (id: string) => {}, // Placeholder
//     decrementCartItemQuantity: (id: string) => {}, // Placeholder
//   }

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>
// }

// export default CartProvider
export {}
