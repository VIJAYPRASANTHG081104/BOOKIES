import React, { useEffect, useState } from "react";
import Card from "./card";
import "./card.css";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

export default function Maincard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const appSetting = {
      // the key name must be the same as the key name in Firebase i.e., `databaseURL`
      databaseURL:
        "https://bookies-387406-default-rtdb.asia-southeast1.firebasedatabase.app/",
    };
    const app = initializeApp(appSetting);
    const database = getDatabase(app);
    const shoppingListInDb = ref(database, "/");
    onValue(shoppingListInDb, (snapshot) => {
      if (snapshot.exists()) {
        const snap = Object.entries(snapshot.val());
        const newData = snap.map(([currentItemId, currentItemValue]) => {
          if (typeof currentItemValue === 'object' && currentItemValue !== null) {
            const ans = Object.entries(currentItemValue).map(([key, value]) => {
              const dataValue = {
                id: value.id,
                title: value.title,
                description: value.description,
                download_url: value.download_link,
                view_link: value.view_link,
                rating: value.rating,
                img: "https://easydrawingguides.com/wp-content/uploads/2020/10/how-to-draw-an-open-book-featured-image-1200.png"
              };
              return dataValue;
            });
            return ans;
          } else {
            return []; // or handle the non-dictionary case as per your requirement
          }
        });
    
        setData(newData.flat());
      } else {
        console.log("No data");
      }
    });
    
    
    
    
  }, []);

  const cards = data.map((item) => (
  
    <section key={item.id} className="cardlist">
      <Card
        id={item.id}
        title={item.title}
        img={item.img}
        description={item.description}
        rating={item.rating}
        download_url={item.download_url}
        view_url={item.view_url}
      />
    </section>
  ));

  return <div id="cardsMain">{cards}</div>;
}
