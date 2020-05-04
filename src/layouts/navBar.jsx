import React, { Component } from "react";
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input
} from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut } from '../store/actions/authActions';
import routes from "./routes";

class NavBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      dropdownOpen: false,
      color: "dark"
    };

    this.toggle = this.toggle.bind(this);
    this.dropdownToggle = this.dropdownToggle.bind(this);
    this.sidebarToggle = React.createRef();
  }

  doSearch = (e) => {
    e.preventDefault();
  }

  toggle() {
    if (this.state.isOpen) {
      this.setState({
        color: "transparent"
      });
    } else {
      this.setState({
        color: "dark"
      });
    }

    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  dropdownToggle(e) {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  getBrand() {
    let brandName = "Default Brand";
    routes.map((prop, key) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = prop.name;
      }
      return null;
    });
    return brandName;
  }

  openSidebar() {
    document.documentElement.classList.toggle("nav-open");
    this.sidebarToggle.current.classList.toggle("toggled");
  }

  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  updateColor() {
    if (window.innerWidth < 993 && this.state.isOpen) {
      this.setState({
        color: "dark"
      });
    } else {
      this.setState({
        color: "transparent"
      });
    }
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateColor.bind(this));
  }

  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 && e.history.location &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      this.sidebarToggle.current.classList.toggle("toggled");
    }
  }

  render() {
    return (
      <Navbar
        color={"dark"}
        expand="lg"
        className={"navbar-absolute fixed-top"}
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div className="navbar-toggle">
              <button
                type="button"
                ref={this.sidebarToggle}
                className="navbar-toggler"
                onClick={() => this.openSidebar()}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand>{this.getBrand()}</NavbarBrand>
          </div>
          <NavbarToggler onClick={this.toggle}>
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </NavbarToggler>
          <div className="justify-content-end">
            <form onSubmit={this.doSearch}>
              <InputGroup className="no-border">
                <Input placeholder="Search..." />
                <InputGroupAddon addonType="append" onClick={this.doSearch}>
                  <InputGroupText>
                    <FontAwesomeIcon icon="search" />
                  </InputGroupText>
                </InputGroupAddon>
              </InputGroup>
            </form>
            <Nav navbar>
              <NavItem>
                <Link to="/" className="nav-link btn-rotate" >
                  <FontAwesomeIcon icon="cog" />
                </Link>
              </NavItem>
              <Dropdown
                nav
                isOpen={this.state.dropdownOpen}
                toggle={e => this.dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag="a" onClick={this.props.signOut}>Sign out</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </Nav>
          </div>
        </Container>
      </Navbar>
    );
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut())
  }
};

export default connect(null, mapDispatchToProps)(NavBar);
