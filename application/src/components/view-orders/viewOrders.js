import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';

import EditForm from './editForm';

class ViewOrders extends Component {
    state = {
        orders: [],
        showForm: false,
        editClickedID: null
    }

    componentDidMount() {
        fetch(`${SERVER_IP}/api/current-orders`)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }

    editOrder(modifiedOrder) {
        console.log(this.state.orders);
        fetch(`${SERVER_IP}/api/edit-order`, {
            method: 'POST',
            body: JSON.stringify({
                id: modifiedOrder._id,
                quantity: modifiedOrder.quantity,
                order_item: modifiedOrder.order_item,
                ordered_by: 'Unknown!'
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                let updatedOrders = this.state.orders;
                const editedOrder = updatedOrders.findIndex((order) => order._id === modifiedOrder._id);
                updatedOrders[editedOrder].id = modifiedOrder._id
                updatedOrders[editedOrder].quantity = modifiedOrder.quantity
                updatedOrders[editedOrder].order_item = modifiedOrder.order_item

                this.setState({ showForm : false, orders: updatedOrders})

            }
        })
        .catch(error => console.error(error));
    }

    deleteOrder(cancelOrder) {
        fetch(`${SERVER_IP}/api/delete-order`, {
            method: 'POST',
            body: JSON.stringify({
                id: cancelOrder._id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                let updatedOrders = this.state.orders;
                const deletedOrder = updatedOrders.findIndex((order) => order._id === cancelOrder._id);
                updatedOrders.splice(deletedOrder, 1);

                this.setState({ orders: updatedOrders });
            }
        })
        .catch(error => console.error(error));
    }

    render() {
        return (
            <Template>
                {this.state.showForm && <EditForm editClickedID={this.state.editClickedID} editOrder={this.editOrder.bind(this)}/>}
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        const createdDate = new Date(order.createdAt);
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                     <button className="btn btn-success" onClick={() => this.setState({ showForm: true, editClickedID: order })}>Edit</button>

                                     <button className="btn btn-danger" onClick={() => this.deleteOrder(order)}>Delete</button>
                                 </div>
                            </div>
                        );
                    })}
                </div>
            </Template>
        );
    }
}

export default ViewOrders;
