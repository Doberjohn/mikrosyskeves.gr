import React, {ChangeEvent, useEffect, useState} from "react";
import {Div} from "../../atoms";
import {IProduct} from "../../../shared/interfaces";
import {ProductTable} from "../../organisms";

interface HomeTemplateProps {
   products: IProduct[];
}

export const HomeTemplate = ({products: backendProducts}: HomeTemplateProps) => {
   const [searchTerm, setSearchTerm] = useState('');
   const [allProducts, setAllProducts] = useState((backendProducts));

   const [veryLowStockProducts, setVeryLowStockProducts] = useState(allProducts.filter((product) => {
      return product.quantity <= product.veryLowStockThreshold;
   }));

   const [lowStockProducts, setLowStockProducts] = useState(allProducts.filter((product) => {
      return product.quantity <= product.lowStockThreshold && product.quantity > product.veryLowStockThreshold;
   }));

   const [products, setProducts] = useState(allProducts.filter((product) => {
      return product.quantity > product.lowStockThreshold;
   }));

   useEffect(() => {
      const newVeryLowStockProducts = allProducts.filter((product) => {
         return product.quantity <= product.veryLowStockThreshold;
      });

      const newLowStockProducts = allProducts.filter((product) => {
         return product.quantity <= product.lowStockThreshold && product.quantity > product.veryLowStockThreshold;
      });

      const newProducts = allProducts.filter((product) => {
         return product.quantity > product.lowStockThreshold;
      });

      setVeryLowStockProducts(newVeryLowStockProducts);
      setLowStockProducts(newLowStockProducts);
      setProducts(newProducts);
   }, [allProducts]);

   useEffect(() => {
      if (searchTerm) {
         const newProducts = allProducts.filter((product) => {
            return product.quantity > product.lowStockThreshold && product.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
         });

         if (newProducts) {
            setProducts(newProducts);
         } else {
            setProducts([]);
         }
      } else {
         const newProducts = allProducts.filter((product) => {
            return product.quantity > product.lowStockThreshold;
         });
         setProducts([...newProducts]);
      }
   }, [searchTerm]);

   const reduceQuantity = (product: IProduct) => {
      product.quantity = product.quantity - 1;
      setAllProducts([...allProducts]);
   }

   const increaseQuantity = (product: IProduct) => {
      product.quantity = product.quantity + 1;
      setAllProducts([...allProducts]);
   }

   const onSearchBarChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
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