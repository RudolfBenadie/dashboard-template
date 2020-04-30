import React, { Component } from 'react';
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col
} from "reactstrap";

class Authenticate extends Component {

  onClick = (e) => {
    e.preventDefault();
    console.log(e.target);
    alert(e.target.id);
  }

  render() {
    return (
      <div className="authenticate wrapper" >
        <Row>
          <Col lg="3" md="6" sm="6" className="centre">
            <Card>
              <CardBody>
                <CardTitle tag="p">Login/Register</CardTitle>
                {/* <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-key-25 text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div>
                      <p className="card-category">Log in</p>
                    </div>
                  </Col>
                </Row> */}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}

export default Authenticate;
