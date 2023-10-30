import React, { useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FaShoppingCart, FaTrash } from "react-icons/fa";
import Menu from "@mui/material/Menu";
import { NavLink } from "react-router-dom";
import { AiFillCloseSquare } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "@mui/material";
import { DELETE } from "../redux/Actions/Action";

const Header = (props) => {
  const { searchQuery, handleSearch } = props;
  const carts = useSelector((state) => state.CartReducer.carts);
  // console.log(getData);
  const dispacth = useDispatch();

  const [price, setPrice] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const dlt = (id) => {
    dispacth(DELETE(id));
  };

  const total = () => {
    let price = 0;
    carts.map((ele, k) => {
      price = ele.price * ele.qnty + price;
    });
    setPrice(price);
  };

  useEffect(() => {
    total();
  }, [total]);



  return (
    <>
      <div className="header">
        <Navbar
          className="bs-nav"
          bg="primary"
          variant="dark"
          style={{ height: 60 }}
        >
          <Container>
            <NavLink
              to="/"
              className="text-decoration-none text-light font-weight-bold mx-4 h3"
            >
              OMELETTO
            </NavLink>
            <Nav className="me-auto">
              <NavLink to="/" className="text-decoration-none text-light mx-2">
                Home
              </NavLink>
              <NavLink
                to="/location"
                className="text-decoration-none text-light mx-2"
              >
                Outlets
              </NavLink>
              <NavLink to="/order" className="text-decoration-none text-light">
                Order
              </NavLink>
            </Nav>
            <div className="mx-2">
              <input type="text" placeholder="search food" value={searchQuery} onChange={handleSearch} />
            </div>
            <Badge
              badgeContent={carts.length}
              color="primary"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <FaShoppingCart
                style={{ fontSize: 25, cursor: "pointer", color: "white" }}
              />
            </Badge>
          </Container>

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {carts.length ? (
              <div
                className="card_details"
                style={{ width: "24rem", padding: 10 }}
              >
                <Table>
                  <thead>
                    <tr>
                      <th>Photo</th>
                      <th>Restaurant Name</th>
                    </tr>
                  </thead>
                  <hr />
                  <tbody>
                    {carts.map((e) => {
                      return (
                        <>
                          <tr>
                            <td>
                              <NavLink
                                to={`/cart/${e.id}`}
                                onClick={handleClose}
                              >
                                <img
                                  src={e.imgdata}
                                  style={{ width: "8rem", height: "7rem" }}
                                  alt=""
                                />
                              </NavLink>
                            </td>
                            <td>
                              <p>{e.rname}</p>
                              <p>Price: ₹{e.price}</p>
                              <p>Quantity: {e.qnty}</p>
                              <p
                                style={{
                                  color: "red",
                                  fontSize: 20,
                                  cursor: "pointer",
                                }}
                                onClick={() => dlt(e.id)}
                              >
                                <FaTrash className="smalltrash" />
                              </p>
                            </td>
                            <td
                              className="mt-5"
                              style={{
                                color: "red",
                                fontSize: 20,
                                cursor: "pointer",
                              }}
                              onClick={() => dlt(e.id)}
                            >
                              <FaTrash className="largetrash" />
                            </td>
                          </tr>
                        </>
                      );
                    })}
                    <hr />
                    <p className="text-center">Total:₹{price}</p>
                  </tbody>
                </Table>
              </div>
            ) : (
              <div
                className="card_details d-flex justify-content-center align-items-center"
                style={{ width: "24rem", padding: 10, position: "relative" }}
              >
                <AiFillCloseSquare
                  onClick={handleClose}
                  style={{
                    postion: "absolute",
                    top: 2,
                    right: 20,
                    fontSize: 30,
                    cursor: "pointer",
                  }}
                />
                <p style={{ fontSize: 22 }}>Your cart is empty</p>
                <img
                  src="./cart.gif"
                  alt=""
                  className="emptycart_img"
                  style={{ width: "5rem", padding: 10 }}
                />
              </div>
            )}
          </Menu>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
