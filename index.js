//@ts-check

import { html, render, useState } from "htm/preact";

/** @typedef {import("preact").VNode} VNode */

/**
 * @param {string} string
 * @returns {string}
 */
const capitalizeFirstLetter = (string) => {
  const firstLetter = string[0];
  if (!firstLetter) return string;
  return `${firstLetter.toUpperCase()}${string.slice(1)}`;
};

/**
 * @typedef {{
 *   id: number;
 *   category: string;
 *   price: string;
 *   stocked: boolean;
 *   name: string;
 * }} Product
 */

/** @type {Product[]} */
const PRODUCTS = [
  { id: 0, category: "Fruits", price: "$1", stocked: true, name: "Apple" },
  {
    id: 1,
    category: "Fruits",
    price: "$1",
    stocked: true,
    name: "Dragonfruit",
  },
  {
    id: 2,
    category: "Fruits",
    price: "$2",
    stocked: false,
    name: "Passionfruit",
  },
  {
    id: 3,
    category: "Vegetables",
    price: "$2",
    stocked: true,
    name: "Spinach",
  },
  {
    id: 4,
    category: "Vegetables",
    price: "$4",
    stocked: false,
    name: "Pumpkin",
  },
  { id: 5, category: "Vegetables", price: "$1", stocked: true, name: "Peas" },
];

/** @type {(keyof Product)[]} */
const displayedProductProps = ["name", "price"];

/**
 * @param {Product} product
 * @param {string} search
 * @returns {boolean}
 */
const isProductSearched = (product, search) => {
  return product.name.toLowerCase().includes(search.toLowerCase());
};

/**
 * @param {Product} product
 * @returns {boolean}
 */
const isProductInStock = (product) => product.stocked;

/**
 * @param {string} search
 * @param {boolean} inStockOnly
 * @returns {(product: Product) => boolean}
 */
const createProductFilter = (search, inStockOnly) => (product) => {
  const matchesSearch = isProductSearched(product, search);
  if (inStockOnly) {
    return isProductInStock(product) && matchesSearch;
  }
  return matchesSearch;
};

/**
 * @param {{ products: Product[] }} props
 * @returns {VNode}
 */
const ProductRows = ({ products = [] }) => {
  return html`${products.map(
    (product) =>
      html`<tr key=${product.id}>
        ${displayedProductProps.map(
          (prop) =>
            html`<td
              key=${prop}
              class=${product.stocked ? "stocked" : "out-of-stock"}
            >
              ${product[prop]}
            </td>`,
        )}
      </tr>`,
  )}`;
};

/**
 * @param {{ products: Product[] }} props
 * @returns {VNode}
 */
const FilterableProductsTable = ({ products = [] }) => {
  const [search, setSearch] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  /**
   * @param {InputEvent & { target: HTMLInputElement }} e
   * @returns {void}
   */
  const handleSearch = (e) => setSearch(e.target.value);
  const toggleInStockOnly = () => setInStockOnly((t) => !t);

  const productFilter = createProductFilter(search, inStockOnly);

  const filteredProducts = products.filter(productFilter);
  const groupedProducts = Object.groupBy(
    filteredProducts,
    (product) => product.category,
  );

  const tableHead = html`
    <thead>
      <tr class="table-head-row">
        ${displayedProductProps.map(
          (productProp) =>
            html`<th scope="col" key=${productProp}>
              ${capitalizeFirstLetter(productProp)}
            </th>`,
        )}
      </tr>
    </thead>
  `;

  const tableBody = html`
    <tbody>
      ${Object.entries(groupedProducts).map(
        ([category, products]) =>
          html`<tr key=${category}>
              <th
                class="props-to-display"
                colspan=${displayedProductProps.length}
              >
                ${category}
              </th>
            </tr>
            <${ProductRows} products=${products} />`,
      )}
    </tbody>
  `;

  return html`
    <div class="filterable-products-table-container">
      <div class="search-area">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Enter search here"
          value=${search}
          oninput=${handleSearch}
        />
        <label>
          <input
            type="checkbox"
            name="inStockOnly"
            id="inStockOnly"
            checked=${inStockOnly}
            onchange=${toggleInStockOnly}
          />
          Only show products in stock
        </label>
      </div>
      <table class="filterable-products-table">
        ${tableHead} ${tableBody}
      </table>
    </div>
  `;
};

const App = () => {
  return html`
    <section class="fullscreen">
      <${FilterableProductsTable} products=${PRODUCTS} />
    </section>
  `;
};

render(html`<${App} />`, document.body);
