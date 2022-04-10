import React, { useState, useEffect } from "react";
import AppNavbar from "../Utils/AppNavbar";
import {
  Button,
  Card,
  CardGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
const ProviderInfo = (value) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
const refresh = () => {
  // re-renders the component
  this.setState({});
};

  useEffect(() => {
    fetch("http://localhost:4567/providers/sector/" + value)
      .then((res) => res.json())
      .then(
        ( data ) => {
          
          setIsLoaded(true);
          setUsers(data);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);
  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <CardGroup>
          {users.map((user) => (
            // <li key={ user.providerId }>{ user.name }</li>
            <>
              <Row xs={1} md={0}>
                <Card>
                  <Card.Img variant="top" />
                  <Card.Body>
                    <Card.Title>{user.name}</Card.Title>
                    <Card.Img variant="top" src={user.image}></Card.Img>
                    <Card.Text>
                      <ul>
                        {" "}
                        <li>{user.addressLineOne}</li>
                        <li>{user.addressLineTwo}</li>
                        <li>{user.town}</li>
                        <li>{user.county}</li>
                        <li>{user.eircode}</li>
                        <li>{user.providerId}</li>
                      </ul>
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button size="sm" color="danger">
                      <Link tag={Link} to={"/provider/" + user.providerId}>
                        Find out More
                      </Link>
                    </Button>
                  </Card.Footer>
                </Card>
              </Row>
            </>
          ))}
        </CardGroup>
      </>
    );
  }
};
export default ProviderInfo;