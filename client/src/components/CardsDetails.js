import { borderRadius, fontSize } from "@mui/system";
import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { ADD, DELETE, REMOVE } from "../redux/Actions/Action";
import StripeCheckout from "react-stripe-checkout";

function CardsDetails() {
  const [data, setData] = useState([]);
  const { id } = useParams();
  // console.log(id);
  const history = useNavigate();

  const dispacth = useDispatch();

  const getData = useSelector((state) => state.CartReducer.carts);
  // console.log(getData);

  const compare = () => {
    let compareData = getData.filter((e) => {
      return e.id == id;
    });
    setData(compareData);
  };

  const send = (e) => {
    // console.log(e);
    dispacth(ADD(e));
  };

  const dlt = (id) => {
    dispacth(DELETE(id));
    history("/");
  };

  // decrease one
  const remove = (item) => {
    dispacth(REMOVE(item));
  };

  useEffect(() => {
    compare();
  }, [id]);

  const onToken = (token) => {
    console.log(token);
  };

  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center">Item details page</h2>
        <section className="container mt-5">
          <div className="iteamsdetails">
            {data.map((ele) => {
              return (
                <>
                  <div className="items_img">
                    <img src={ele.imgdata} alt="" />
                  </div>
                  <div className="details">
                    <Table>
                      <tr>
                        <td>
                          <p>
                            <strong>Restaurant</strong>: {ele.rname}
                          </p>
                          <p>
                            <strong>Price</strong>: ₹{ele.price}
                          </p>
                          <p>
                            <strong>Dishes</strong> {ele.address}
                          </p>
                          <p>
                            <strong>Total </strong> ₹{ele.price * ele.qnty}
                          </p>
                          <div
                            className="mt-5 d-flex justify-content-between align-items-center"
                            style={{
                              width: 100,
                              cursor: "pointer",
                              background: "#ddd",
                              color: "#111",
                            }}
                          >
                            <span
                              style={{ fontSize: 24 }}
                              onClick={
                                ele.qnty <= 1
                                  ? () => dlt(ele.id)
                                  : () => remove(ele)
                              }
                            >
                              -
                            </span>
                            <span style={{ fontSize: 22 }}>{ele.qnty}</span>
                            <span
                              style={{ fontSize: 24 }}
                              onClick={() => send(ele)}
                            >
                              +
                            </span>
                          </div>
                        </td>
                        <td>
                          <p>
                            <strong>Rating : </strong>
                            <span
                              style={{
                                backgroundColor: "green",
                                color: "#fff",
                                padding: "2px 5px",
                                borderRadius: "5px",
                              }}
                            >
                              {ele.rating}★
                            </span>
                          </p>
                          <p>
                            <strong>Order review : </strong>
                            <span>{ele.somedata}</span>
                          </p>
                          <p>
                            <strong>Remove : </strong>
                            <span>
                              <FaTrash
                                onClick={() => dlt(ele.id)}
                                style={{
                                  color: "red",
                                  fontSize: "20",
                                  cursor: "pointer",
                                }}
                              />
                            </span>
                          </p>
                          <div>
                            <StripeCheckout
                              amount={ele.price * ele.qnty * 100}
                              token={onToken}
                              currency="INR"
                              stripeKey="pk_test_51M1ktZSDsZ6qIAAAif79w7N7yXc5gMrFZ9V0jegZeNNBBURe7uiSf1RVmTIjzLAKom4l4Jg0KA8liJfUYAYxz6ND00EBqM7d6t"
                            />
                          </div>
                        </td>
                      </tr>
                    </Table>
                  </div>
                </>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}

export default CardsDetails;
