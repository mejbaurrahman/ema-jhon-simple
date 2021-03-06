import React, { useEffect, useState } from 'react';
import Product from '../../Product/Product';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] =useState([]);
    const [cart, setCart] =useState([]);
    const [displayProducts, setDisplayProducts] =useState([]);
    
    useEffect(()=>{
        fetch('./products.JSON')
        .then(response => response.json())
        .then(data=>{
            setProducts(data);
            setDisplayProducts(data);
        });

    },[]);

    useEffect(()=> {
        
        // console.log(savedCart);
        if(products.length){
            const savedCart = getStoredCart();
            const storedCart = [];
            for(const key in savedCart){
                // console.log(key);
                const addedProduct =products.find(product=> product.key===key);
                if(addedProduct){
                    const quantity = savedCart[key];
                    // console.log(addedProduct);
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }
                
            }
            setCart(storedCart);

        }
       
    }, [products])
    const handleAddToCart =(product)=>{
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product.key);
    } 

    const handleSearch = event =>{
        const searchText =event.target.value;
        const matchedProduct = products.filter(product=>product.name.toLowerCase().includes(searchText.toLowerCase()));
        // console.log(matchedProduct.length);
        setDisplayProducts(matchedProduct);
    }
    return (
       <div>
           <div className='search-container'>
                <input type="text"
                 name="" id=""
                 onChange={handleSearch} placeholder='Search product' />
           </div>
            <div className='shop-container'>
            <div className='product-container'>
               
                {
                   displayProducts.map(product=><Product key={product.key} product={product} handleAddToCart= {handleAddToCart}></Product>
                    )
                }
            </div>
            <div className='cart-container'>
              <Cart cart={cart}></Cart>

            </div>
            
        </div>
       </div>
    );
};

export default Shop;