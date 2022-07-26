import { createContext, ReactNode, useContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode
}

/*
:: React + Typescript = Props passés avec "type"
*/
type CartItem = {
  id: number
  quantity: number
}

/*
:: logique métier des événements liés aux Produits
:: Besoin du StoreItem component
*/
type ShoppingCartContext = {
  getItemQuantity: (id: number) => number
  incrementQuantity: (id: number) => void
  decrementQuantity: (id: number) => void
  removeQuantity: (id: number) => void
}

/*
:: ShoppinCarContext contient les valeurs du type ShoppinCartContext
*/
const ShoppingCartContext = createContext({} as ShoppingCartContext)


export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}


export function ShoppingCartProvider( { children }: ShoppingCartProviderProps) {

  const [cartItems, setCartItems] = useState<CartItem[]>([])


  function getItemQuantity(id: number) {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }


  function incrementQuantity(id: number) {
    setCartItems(currentItems => {
      if (currentItems.find(item => item.id === id) == null) {
        return [...currentItems, { id, quantity: 1 }]
      } else {
        return currentItems.map(item => {
          if(item.id === id) {
            return { ...item, quantity: item.quantity +1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decrementQuantity(id: number) {
    setCartItems(currentItems => {
      if (currentItems.find(item => item.id === id)?.quantity === 1) {
        return currentItems.filter(item => item.id !== id);
      } else {
        return currentItems.map(item => {
          if(item.id === id) {
            return { ...item, quantity: item.quantity -1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeQuantity(id: number) {
    setCartItems(currentItems => {
      return currentItems.filter(item => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider 
      value={{ 
        getItemQuantity, 
        incrementQuantity, 
        decrementQuantity, 
        removeQuantity 
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  )
}
