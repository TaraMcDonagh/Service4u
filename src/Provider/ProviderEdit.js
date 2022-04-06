import React, { Component } from "react";
import { Button, Container, Form, FormGroup, FormLabel, InputGroup } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import AppNavbar from "../Utils/AppNavbar";

class ProviderEdit extends Component {
  emptyItem = {
    name: "",
    addressLineOne: "",
    addressLineTwo: "",
    town: "",
    county: "",
    eircode: "",
  };

  constructor(props) {
    super(props);
    this.state = {
      item: this.emptyItem,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async componentDidMount() {
    if (this.props.match.params.id !== "new") {
      const provider = await (
        await fetch(`/api/providers/${this.props.match.params.id}`)
      ).json();
      this.setState({ item: provider });
    }
  }

  handleChange(service) {
    const target = service.target;
    const value = target.value;
    const name = target.name;
    let item = { ...this.state.item };
    item[name] = value;
    this.setState({ item });
  }

  async handleSubmit(service) {
service.preventDefault();
const {item} = this.state;

await fetch((item.id) ? "/api/providers/"+(item.id) : "/api/providers", {
method: (item.id) ? "PUT" : "POST",
headers: {
"Accept": "application/json",
"Content-Type": "application/json"
},
body: JSON.stringify(item),
});
this.props.history.push("/providers");
}

  render() {
    const { item } = this.state;
    const title = <h2>{item.id ? "Edit provider" : "Add provider"}</h2>;

    return (
      <div>
        <AppNavbar />
        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <FormLabel for="name">Name</FormLabel>
              <InputGroup
                type="text"
                name="name"
                id="name"
                value={item.name || ""}
                onChange={this.handleChange}
                autoComplete="name"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel for="addressLineOne">Address Line One</FormLabel>
              <InputGroup
                type="text"
                name="addressLineOne"
                id="addressLineOne"
                value={item.addressLineOne || ""}
                onChange={this.handleChange}
                autoComplete="address-level1"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel for="addressLineOne">Address Line Two</FormLabel>
              <InputGroup
                type="text"
                name="addressLineTwo"
                id="addressLineTwo"
                value={item.addressLineTwo || ""}
                onChange={this.handleChange}
                autoComplete="address-level1"
              />
            </FormGroup>
            <FormGroup>
              <FormLabel for="town">Town</FormLabel>
              <InputGroup
                type="text"
                name="town"
                id="town"
                value={item.town || ""}
                onChange={this.handleChange}
                autoComplete="address-level1"
              />
            </FormGroup>
            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <FormLabel for="ciunty">County</FormLabel>
                <InputGroup
                  type="text"
                  name="county"
                  id="county"
                  value={item.county || ""}
                  onChange={this.handleChange}
                  autoComplete="address-level1"
                />
              </FormGroup>
              <FormGroup className="col-md-3 mb-3">
                <FormLabel for="country">Eircode</FormLabel>
                <InputGroup
                  type="text"
                  name="eircode"
                  id="eircode"
                  value={item.eircode || ""}
                  onChange={this.handleChange}
                  autoComplete="address-level1"
                />
              </FormGroup>
            </div>
            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/providers">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

export default withRouter(ProviderEdit);