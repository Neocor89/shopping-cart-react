import { Button, Card } from "react-bootstrap"
import { formatCurrency } from "../utilities/FormatCurrency"

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgUrl: string
}

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
  const quantity = 0
  return( 
    <Card className="h-100">
      <Card.Img 
        variant="top" 
        src={imgUrl} 
        height="200px" 
        style={{ objectFit: "cover" }} 
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-4" style={{color: "#1b263b"}}>{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <div 
          className="mt-auto">
          { quantity === 0 ?  (
            <Button 
            className="btn w-100 text-white fw-bold" 
            style={{backgroundColor: "#4361ee"}}
            >
              + Add to Cart
            </Button>
          ) : ( 
            <div 
              className="d-flex align-items-center flex-column" 
              style={{gap: ".5rem"}}
            >
              <div 
                className="d-flex align-items-center justify-content-center" 
                style={{gap: ".5rem"}}
              >
                <Button>-</Button>
                <div 
                  className="d-flex flex-column align-items-center"
                >
                  <span 
                    className="fs-5 fw-bold border rounded-circle px-2" 
                    style={{ 
                      width: "30px"
                    }}
                  >
                    {quantity}
                  </span>
                  in cart
                </div>
                <Button>+</Button>
              </div>
              <Button 
                style={{ 
                  backgroundColor: "#c44536", 
                  borderColor: "transparent", 
                  margin: "5px 0", 
                  width: "30%"
                }}
              >
                Remove
              </Button>
            </div>
          )}
          </div>
      </Card.Body>
    </Card>
  )
}

