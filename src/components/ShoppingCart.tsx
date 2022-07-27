import { Offcanvas } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"

// TODO : mise en place de la quantity panier

type ShoppingCartProps = {
  isOpen: boolean
}
export function ShoppingCart({isOpen}: ShoppingCartProps) {
  const { closeCart} = useShoppingCart()
  //: C'est isOpen qui détermine l'ouverture et la fermeture
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Cart</Offcanvas.Title>
      </Offcanvas.Header>
    </Offcanvas>
  )
}