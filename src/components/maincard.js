import React from "react";
import Card from "./card"
import data from "./data";
import "./card.css"
export default function Maincard() {
    const cards = data.map(item => {
        return (
            <Card
                id={item.id}
                title={item.title}
                img={item.img}
                imgid={item.imgid}
                paraid={item.paraid}
                description={item.decription}
                rating={item.rating}
            />
        )
    })
    return (
        <div>
            <section className="cardlist">
                {cards}
            </section>
        </div>
    )

}