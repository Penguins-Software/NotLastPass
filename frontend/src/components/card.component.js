import React, { Component } from "react";
import { Button, Card } from 'react-bootstrap';


export default class CardItem extends Component {

    render(){
        return(
            <div className="col mb-3"  style={{flex:1}}>
                <Card style={{ width: '14rem' }}>
                <Card.Body>
                    <Card.Title>{this.props.website}</Card.Title>
                    <Card.Text>
                    <div>
                        <label>
                            <strong>
                                Username:
                            </strong>{" "}
                            {this.props.username}
                        </label>
                    </div>
                    <div>
                        <label>
                            <strong>
                                Password:
                            </strong>{" "}
                            {this.props.password}
                        </label>
                    </div>
                    </Card.Text>
                </Card.Body>
                </Card>
            </div>
        );
    }
}