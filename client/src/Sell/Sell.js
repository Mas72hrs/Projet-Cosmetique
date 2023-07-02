import React, { useState, useEffect } from "react";
import Header from "../Header/Header.js";
import "./Sell.css";
import { ProductsData } from "../Products/ProductsData.js";
import ProductWithoutCode from "./ProductWithoutCode.js";
import ProductToSellCard from "./ProductToSellCard.js";
import search from "../Icons/search-icon.png";
import done from "../Icons/done.png";
import axios from "axios";

export default function Sell() {
  const [productsWithoutCode, setProductsWithoutCode] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [nomClient, setNomClient] = useState("");
  const userData = JSON.parse(localStorage.getItem("accessToken"));

  useEffect(() => {
    axios.get("http://localhost:3001/produit/null-codebar").then((response) => {
      setProductsWithoutCode(response.data);
    });
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    await axios.get("http://localhost:3001/cart").then((response) => {
      setCartItems(response.data);
    });
  };

  const deleteCartItems = (productId) => {
    axios
      .delete(`http://localhost:3001/cart/byId/${productId}`)
      .then(() => {
        // After deleting the product, fetch the updated list of products
        fetchProducts();
      })
      .catch((error) => {
        console.log("Error deleting product from the cart :", error);
      });
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const filteredProductsList = productsWithoutCode.filter(
    (produit) =>
      searchInput === "" ||
      (produit.nomProduit &&
        produit.nomProduit.toLowerCase().includes(searchInput.toLowerCase()))
  );

  const ProductsList = filteredProductsList.map((produit) => {
    return (
      <ProductWithoutCode
        key={produit.id}
        idProduit={produit.id}
        nom={produit.nomProduit}
        quantite={produit.quantite}
        prixVendue={produit.prix_V}
        onFetch={fetchProducts}
      />
    );
  });

  const ProductsToSellList = cartItems.map((produit) => {
    return (
      <ProductToSellCard
        key={produit.id}
        idItem={produit.id}
        nom={produit.nomProduit}
        Quantity={produit.Quantity}
        total={produit.totalPrice}
        prixVendue={produit.itemPrice}
        ondelete={deleteCartItems}
        onFetch={fetchProducts}
      />
    );
  });

  const totalPrice = cartItems.reduce((accumulator, product) => {
    return accumulator + product.totalPrice;
  }, 0);

  const itemQuantities = {};

  // Calculate item quantities
  cartItems.forEach((item) => {
    const { nomProduit, Quantity } = item;
    if (itemQuantities[nomProduit]) {
      itemQuantities[nomProduit] += Quantity;
    } else {
      itemQuantities[nomProduit] = Quantity;
    }
  });

  const addNewVente = async () => {
    try {
      const response = await axios.post("http://localhost:3001/vente", {
        items: itemQuantities,
        price: totalPrice,
        UserId: userData.id,
      });
      console.log(response.data);
      fetchProducts();
    } catch (error) {
      console.error("Error adding new Vente", error);
      // Handle the error
    }
  };

  const addCredit = async () => {
    try {
      const response = await axios.post("http://localhost:3001/credit", {
        client: nomClient,
        prixTotalCredit: totalPrice,
        UserId: userData.id,
      });
      console.log(response.data);
      fetchProducts();
    } catch (error) {
      console.error("Error adding credit", error);
      // Handle the error
    }
  };

  const handleInputChange = (e) => {
    setNomClient(e.target.value);
  };

  return (
    <div className="big-sell-container">
      <div className="sell-container">
        <Header titre="Vendre" />

        <div className="vendreList ">
          <div className="add-code">
            <input placeholder="Entrer Code Barre ..." type="number" />
            <button>
              <img src={done} alt="done" />
            </button>
          </div>
          {ProductsToSellList}
          {/*<h1>Pas de Produit a Vendre</h1>*/}
        </div>
        <div className="container-btn">
          <button className="vendre-btn" onClick={addNewVente}>
            Vendre
          </button>

          <button
            className="credit-btn"
            onClick={addCredit}
            disabled={nomClient === "" || nomClient.length <= 2}
          >
            Credit
          </button>

          <input
            type="text"
            className="input-nomClient"
            placeholder="enter le nom de client qui fait le credit"
            onChange={handleInputChange}
          />
        </div>

        <h2>{totalPrice}</h2>
      </div>

      <div className="products-without-barcode-list">
        <h1 style={{ textAlign: "center", margin: "20px 0", color: "white" }}>
          Produits Sans Code Barre
        </h1>

        <div className="product--Search--container">
          <img src={search} alt="search-icon" />
          <input
            placeholder="Rechercher Produit"
            className="outfit"
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>

        {ProductsList}
      </div>
    </div>
  );
}
