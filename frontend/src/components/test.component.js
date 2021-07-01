import React, {Component} from 'react';
import CardItem from './card.component';
import {CardDeck} from 'react-bootstrap';

export default class Test extends Component{

    render(){
        const cards = [{website: 'webside.com', username:'admin', password:'lame'},
                    {website: 'webside2.com', username:'admin2', password:'password'},
                    {website: 'webside3.com', username:'admin3', password:'password3'},
                    {website: 'webside4.com', username:'admin4', password:'password4'},
                    {website: 'webside5.com', username:'admin5', password:'password5'},
                    {website: 'webside6.com', username:'admin6', password:'password6'},
                    {website: 'webside7.com', username:'admin7', password:'password7'},
                    {website: 'webside8.com', username:'admin8', password:'password8'}];

        let cardList = Object.values(cards).map( card => (
            <div className="col-md-3">
                  <CardItem
                    website={card.website}
                    username={card.username}
                    password={card.password} 
                  />
            </div>
            ) 
          );
        return(
            <CardDeck>
                {cardList}
            </CardDeck>
        );
    }
}