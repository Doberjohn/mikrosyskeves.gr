import React, {ChangeEvent, useEffect, useState} from "react";
import {Div} from "../../atoms";
import {IProduct} from "../../../shared/interfaces";
import {MinusCircleIcon, PlusCircleIcon} from "../../../shared/svgs";


interface HomeTemplateProps {
   products: IProduct[];
}

export const HomeTemplate = ({products}: HomeTemplateProps) => {
   const [filteredProducts, setFilteredProducts] = useState(products);
   const [searchTerm, setSearchTerm] = useState('');

   useEffect(() => {
      if (searchTerm) {
         const newProducts = products.filter((product) => {
            return product.title.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1;
         });

         if (newProducts) {
            setFilteredProducts(newProducts);
         } else {
            setFilteredProducts([]);
         }
      } else {
         setFilteredProducts([...products])
      }
   }, [searchTerm])

   const reduceQuantity = (product: IProduct) => {
      product.quantity = product.quantity - 1;
      setFilteredProducts([...filteredProducts])
   }

   const increaseQuantity = (product: IProduct) => {
      product.quantity = product.quantity + 1;
      setFilteredProducts([...filteredProducts])
   }

   const onSearchBarChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value)
   }

   return (
      <Div className="container" style={{maxWidth: '1000px'}}>
         <Div className="row py-5">
            <div className="input-group px-0 pb-3">
               <input value={searchTerm} onChange={onSearchBarChange} type="text" className="form-control" placeholder="Αναζήτηση προϊόντος"/>
            </div>
            <table className="table table-dark table-hover">
               <tbody>
               {filteredProducts.map((product) => {
                  return (
                     <tr key={product.title}>
                        <th scope="row">{product.title}</th>
                        <th scope="row">
                           <Div className="d-flex align-items-center justify-content-center">
                              <MinusCircleIcon onClick={() => reduceQuantity(product)}/>
                              <Div className="ms-2 me-2">
                                 {product.quantity}
                              </Div>
                              <PlusCircleIcon onClick={() => increaseQuantity(product)}/>
                           </Div>
                        </th>
                     </tr>
                  )
               })}
               </tbody>
            </table>
         </Div>
      </Div>
   )
}