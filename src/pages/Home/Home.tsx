import React from "react";
import {IProduct} from "../../shared/interfaces";
import {HomeTemplate} from "../../components/templates";


const Home = () => {
   const products: IProduct[] = [
      {
         title: 'Rowenta Silence τριγωνικό πέλμα Παρκέ ZR901801',
         quantity: 4,
      },
      {
         title: 'Αναδευτήρες μίξερ PYREX SB530 Original 333148',
         quantity: 12,
      },
      {
         title: 'Αναδευτήρες μίξερ IZZY 3 σε 1 IZ-1001 Original 223534',
         quantity: 13,
      },
      {
         title: 'Φίλτρο Σφουγγάρι σκούπας Siemens original 17000301',
         quantity: 24,
      },
      {
         title: 'Κανάτα καφετιέρας Ariete Vintage 1342 Original AT4066009020',
         quantity: 5,
      }
   ]

   return <HomeTemplate products={products}/>
}

export default Home;
