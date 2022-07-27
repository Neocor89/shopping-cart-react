import { Button, Container, Nav, Navbar as NavBarBs } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useShoppingCart } from "../context/ShoppingCartContext"

export function Navbar() {
  const {openCart, cartQuantity } = useShoppingCart()
  return (
    <NavBarBs sticky="top" className="shadow-sm mb-3" style={{backgroundColor: "#dee2ff"}}>
      <Container>
        <Nav className="me-auto" style={{fontSize: "18px", fontWeight: "600"}}>
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
      {cartQuantity > 0 && (<Button
        onClick={openCart}
        style={{ position: "relative" }}
        variant={"outline-primary"} 
        className="rounded-circle p-2"
      >
        <svg 
        xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" className="iconify iconify--icon-park" width="30" height="30" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48">
          <g fill="none">
            <path fill="#00a8e8" d="M39 32H13L8 12H44L39 32Z"></path>
            <path stroke="#000" strokeLinecap="round" strokeLinejoin="round"  strokeWidth="4" d="M3 6H6.5L8 12M8 12L13 32H39L44 12H8Z"></path>
              <circle cx="13" cy="39" r="3" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></circle>
              <circle cx="39" cy="39" r="3" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"></circle>
              <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M22 22H30"></path>
              <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M26 26V18"></path>
          </g>
        </svg>
        <div 
          className="rounded-circle d-flex justify-content-center align-items-center"  
          style={{ 
            position: "absolute", 
            color: "white",
            backgroundColor: "#ff0054",
            bottom: "0", 
            right: "0", 
            width: "1.5rem",
            height: "1.5rem",
            transform: "translate(25%, 25%)"
          }}>
          {cartQuantity}
        </div>

       </Button> )}
      </Container>
    </NavBarBs>
  )
}