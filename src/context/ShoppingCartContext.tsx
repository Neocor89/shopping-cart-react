import { createContext, ReactNode, useContext, useState } from "react"
import { ShoppingCart } from "../components/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"


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
  openCart: () => void
  closeCart: () => void
  getItemQuantity: (id: number) => number
  incrementQuantity: (id: number) => void
  decrementQuantity: (id: number) => void
  removeQuantity: (id: number) => void
  cartQuantity: number
  cartItems: CartItem[]
}

/*
:: ShoppinCarContext contient les valeurs du type ShoppinCartContext
*/
const ShoppingCartContext = createContext({} as ShoppingCartContext)


export function useShoppingCart() {
  return useContext(ShoppingCartContext)
}


/*
:: Function container de la logique du panier
*/
export function ShoppingCartProvider( { children }: ShoppingCartProviderProps) {

  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart", 
    []
  )
  /*
  ! le Getter du useState n'est jamais modifié, 
  : mais on peut passer une méthode au Getter,
  :: afin de modifier son comportement
  ::: toutes les modifications passent par le Setter
  
  */
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity, 0
  )

  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

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
        removeQuantity,
        openCart,
        closeCart,
        cartItems,
        cartQuantity
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
  )
}
