/*eslint-disable*/
import React from "react";
import { Container, Row } from "reactstrap";
// used for making the prop types of this component
// import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}
      >
        <Container fluid={this.props.fluid ? true : false}>
          <Row>
            <nav className="footer-nav">
              <ul>
                <li>
                  <a href="/blog" target="_blank">
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/license"
                    target="_blank"
                  >
                    Licenses
                  </a>
                </li>
              </ul>
            </nav>
            <div className="credits ml-auto">
              <div className="copyright">
                &copy; {1900 + new Date().getYear()}, RJB
              </div>
            </div>
          </Row>
        </Container>
      </footer>
    );
  }
}

// Footer.propTypes = {
//   default: PropTypes.bool,
//   fluid: PropTypes.bool
// };

export default Footer;