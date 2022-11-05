import React, {ChangeEvent, useEffect, useState} from "react";
import {Div} from "../../atoms";
import {MinusCircleIcon, PlusCircleIcon} from "../../molecules";
import {IProduct} from "../../../shared/interfaces";
import {ProductTable} from "../../organisms";

interface HomeTemplateProps {
   products: IProduct[];
}

export const HomeTemplate = ({products: backendProducts}: HomeTemplateProps) => {
   const veryLowStockThreshold = 10;
   const lowStockThreshold = 20;
   const [products, setProducts] = useState(backendProducts);
   const [searchTerm, setSearchTerm] = useState('');

   const [veryLowStockProducts, setVeryLowStockProducts] = useState(products.filter((product) => {
      return product.quantity <= veryLowStockThreshold;
   }));

   const [lowStockProducts, setLowStockProducts] = useState(products.filter((product) => {
      return product.quantity < lowStockThreshold && product.quantity > veryLowStockThreshold;
   }));

   useEffect(() => {
      const newVeryLowStockProducts = products.filter((product) => {
         return product.quantity <= veryLowStockThreshold;
      });

      const newLowStockProducts = products.filter((product) => {
         return product.quantity < lowStockThreshold && product.quantity > veryLowStockThreshold;
      });

      setVeryLowStockProducts(newVeryLowStockProducts);
      setLowStockProducts(newLowStockProducts);
   }, [products]);

   useEffect(() => {
      if (searchTerm) {
         const newProducts = products.filter((product) => {
            return product.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
         });

         if (newProducts) {
            setProducts(newProducts);
         } else {
            setProducts([]);
         }
      } else {
         setProducts([...products])
      }
   }, [searchTerm]);

   const reduceQuantity = (product: IProduct) => {
      product.quantity = product.quantity - 1;
      setProducts([...products])
   }

   const increaseQuantity = (product: IProduct) => {
      product.quantity = product.quantity + 1;
      setProducts([...products])
   }

   const onSearchBarChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
   }

   return (
      <Div className="container" style={{maxWidth: '1000px'}}>
         <Div className="row py-5">
            {veryLowStockProducts.length > 0 && <button type="button" className="btn btn-danger">Προϊόντα σε πολύ χαμηλό stock</button>}
            <ProductTable products={veryLowStockProducts} reduceQuantity={reduceQuantity} increaseQuantity={increaseQuantity}/>
            {lowStockProducts.length > 0 && <button type="button" className="btn btn-warning mt-3">Προϊόντα σε χαμηλό stock</button>}
            <ProductTable products={lowStockProducts} reduceQuantity={reduceQuantity} increaseQuantity={increaseQuantity}/>
            <Div className="input-group px-0 pb-3 mt-5">
               <input value={searchTerm} onChange={onSearchBarChange} type="text" className="form-control"
                      placeholder="Αναζήτηση προϊόντος"/>
            </Div>
            <ProductTable products={products} reduceQuantity={reduceQuantity} increaseQuantity={increaseQuantity}/>
         </Div>
      </Div>
   )
}