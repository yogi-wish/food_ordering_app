import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/Actions/Action";

function Cards(props) {
  const {searchResults} = props;
  const dispatch = useDispatch();


  const send = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };

  return (
    <>
      <div className="container mt-3">
        <h2 className="text-align-center">Our Menu</h2>
      </div>
      <div className="row d-flex justify-content-center align-items-center">
        {searchResults.map((card) => {
          return (
            <Card
              className="bs mx-2 mt-5"
              style={{ width: "22rem", border: "none", cursor: "pointer" }}
              key={card.id}
            >
              <Card.Img
                variant="top"
                src={card.imgdata}
                style={{ height: "16rem" }}
              />
              <Card.Body>
                <Card.Title>{card.rname}</Card.Title>
                <Card.Text>Price : ₹{card.price}</Card.Text>
                <Button
                  variant="primary"
                  className="col-lg-12"
                  onClick={() => send(card)}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default Cards;
