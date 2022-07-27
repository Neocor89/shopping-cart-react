import { Button, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"
import storeItems from "../data/items.json"
import { formatCurrency } from "../utilities/FormatCurrency"

type CartItemProps = {
  id: number,
  quantity: number
}

export function CartItem({ id, quantity }: CartItemProps) {
  const { removeQuantity } = useShoppingCart()
  const item = storeItems.find(i => i.id === id)
  if (item == null) return null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img 
        src={item.imgUrl} 
        alt={item.name} 
        style={{ 
          width: "125px", 
          height: "80px", 
          objectFit: "cover" 
        }} 
      />
      <div className="me-auto" style={{ fontWeight: "600", color: "#1b263b" }}>
        <div>
          { item.name }{" "} 
          { quantity > 1 && ( 
            <span className="text-muted" 
              style={{ 
                fontSize: ".92rem",
                marginLeft: "10px",
                color: "#1b263b"
              }}>
                x{quantity}
              </span> 
            )}
        </div>
        <div className="text-muted mt-1" style={{ fontSize: ".85rem", color: "#1b263b" }}>
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>  {formatCurrency(item.price * quantity)} </div>
      <Button style={{backgroundColor: "#e0004b", border: "none", marginLeft: "5px", padding: "2px 10px 2px 10px", fontSize: "15px"}} size="sm" onClick={() => removeQuantity(item.id)}>&times;</Button>
    </Stack>
  )

}