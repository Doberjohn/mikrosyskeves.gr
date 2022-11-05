import React from "react";
import {IProduct} from "../../shared/interfaces";
import {HomeTemplate} from "../../components/templates";


const Home = () => {
   const products: IProduct[] = [
      {
         title: 'ZR901801 - Rowenta Silence τριγωνικό πέλμα Παρκέ',
         quantity: 1,
         veryLowStockThreshold: 1,
         lowStockThreshold: 2,
      },
      {
         title: '333148 - Αναδευτήρες μίξερ PYREX SB530 Original',
         quantity: 5,
         veryLowStockThreshold: 2,
         lowStockThreshold: 5,
      },
      {
         title: '223534 - Αναδευτήρες μίξερ IZZY 3 σε 1 IZ-1001 Original',
         quantity: 10,
         veryLowStockThreshold: 2,
         lowStockThreshold: 4,
      },
      {
         title: '17000301 - Φίλτρο Σφουγγάρι σκούπας Siemens original ',
         quantity: 6,
         veryLowStockThreshold: 1,
         lowStockThreshold: 3,
      },
      {
         title: 'AT4066009020 - Κανάτα καφετιέρας Ariete Vintage 1342 Original',
         quantity: 50,
         veryLowStockThreshold: 10,
         lowStockThreshold: 30,
      }
   ]

   return <HomeTemplate products={products}/>
}

export default Home;
