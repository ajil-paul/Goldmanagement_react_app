import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { Form, Button } from "react-bootstrap";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      // this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    return (
      <div className="container">
        <div style={{ marginTop: "4rem" }} className="row justify-content-center">
          {user.name.split(" ")[0] === "abc" ? <div className="col-sm-6 s8 offset-s2">

            <h2>Add New User</h2><br></br>
            <Form noValidate onSubmit={this.onSubmit}>
              <Form.Group >
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Enter Name"
                  onChange={this.onChange}
                  value={this.state.name}
                  error={errors.name}
                  id="name"
                  type="text"
                  className={classnames("", {
                    invalid: errors.name
                  })} />
              </Form.Group>
              <span className="red-text">{errors.name}</span>
              <Form.Group >
                <Form.Label>Email</Form.Label>
                <Form.Control
                  placeholder="Enter email"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })} />
              </Form.Group>
              <span className="red-text">{errors.email}</span>

              <Form.Group >
                <Form.Label>Password</Form.Label>
                <Form.Control
                  placeholder="Enter Password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })} />
              </Form.Group>
              <span className="red-text">{errors.password}</span>
              <Form.Group >
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  placeholder="Confirm Password"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })} />
              </Form.Group>
              <span className="red-text">{errors.password2}</span>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Add User
             </Button>
            </Form>
          </div> : <div className="alert alert-warning alert-dismissible fade show">
              <h4 className="alert-heading"><i className="fa fa-warning"></i> Sorry! You are not the Admin</h4>
              <p>Only admin can add users. Since you are not the admin, you cannot add users.
              Please login as the Admin.
              </p>
              <hr></hr>
              <p className="mb-0"></p>
              {/* <button type="button" className="close" data-dismiss="alert">&times;</button> */}
            </div>}
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
