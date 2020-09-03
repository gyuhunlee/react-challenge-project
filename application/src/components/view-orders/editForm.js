import React, { Component } from 'react';
import { Form } from 'react-bootstrap';

class EditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.editClickedID._id,
      order_item: this.props.editClickedID.order_item,
      quantity: 1
    }
  }

  menuChosen(event) {
    this.setState({ order_item: event.target.value })
  }

  quantityChosen(event) {
    this.setState({ quantity: event.target.value })
  }

  submitOrder(event) {
    event.preventDefault();
    this.props.editOrder(this.state);
  }

  render() {
    return (
      <Form>
        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label>Menu</Form.Label>
          <Form.Control as="select" onChange={(event) => this.menuChosen(event)}>
            <option value="Soup of the Day">Soup of the Day</option>
            <option value="Linguini With White Wine Sauce">Linguini With White Wine Sauce</option>
            <option value="Eggplant and Mushroom Panini">Eggplant and Mushroom Panini</option>
            <option value="Chili Con Carne">Chili Con Carne</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="exampleForm.ControlSelect2">
          <Form.Label>Quantity</Form.Label>
          <Form.Control as="select" onChange={(event) => this.quantityChosen(event)}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </Form.Control>
        </Form.Group>
        <button onClick={(event) => this.submitOrder(event)}>Submit</button>
      </Form>
    )
  }
}

export default EditForm;