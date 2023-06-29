import { useState } from "react";
import Product from "../components/Product";
import Button from "../components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";

export default function Home() {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "MacBook Air 15”",
      image: "/macbook_air_15.jpg",
      kategori: "Laptop",
      price: 26999999,
    },
    {
      id: 2,
      name: "iPhone 14 Pro",
      image: "/iphone_14_pro.jpg",
      kategori: "Smartphone",
      price: 19999999,
    },
    {
      id: 3,
      name: "iPhone 14",
      image: "/iphone_14.jpg",
      kategori: "Smartphone",
      price: 15999999,
    },
    {
      id: 4,
      name: "Apple Vision Pro",
      image: "/apple_vision_pro.jpg",
      kategori: "Smartphone",
      price: 66999999,
    },
    {
      id: 5,
      name: "Apple Watch Series 8",
      image: "apple_watch_series_8.jpg",
      kategori: "Smartphone",
      price: 7999999,
    },
    {
      id: 6,
      name: "iPad Pro",
      image: "/ipad_pro.jpg",
      kategori: "Smartphone",
      price: 15999999,
    },
    {
      id: 7,
      name: "MacBook Air 15”",
      image: "/macbook_air_15.jpg",
      kategori: "Laptop",
      price: 26999999,
    },
    {
      id: 8,
      name: "iPhone 14 Pro",
      image: "/iphone_14_pro.jpg",
      kategori: "Smartphone",
      price: 19999999,
    },
    {
      id: 9,
      name: "iPhone 14",
      image: "/iphone_14.jpg",
      kategori: "Smartphone",
      price: 15999999,
    },
    {
      id: 10,
      name: "Apple Vision Pro",
      image: "/apple_vision_pro.jpg",
      kategori: "Smartphone",
      price: 66999999,
    },
    {
      id: 11,
      name: "Apple Watch Series 8",
      image: "apple_watch_series_8.jpg",
      kategori: "Smartphone",
      price: 7999999,
    },
    {
      id: 12,
      name: "iPad Pro",
      image: "/ipad_pro.jpg",
      kategori: "Smartphone",
      price: 15999999,
    },
  ]);
  const [keyword, setKeyword] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [editedProduct, setEditedProduct] = useState();
  const [cart, setCart] = useState([]);
  const [dialogCart, setDialogCart] = useState(false);
  const [kategori, setKategori] = useState("id");
  const [newProduct, setNewProduct] = useState({});
  const [dialogNewProduct, setDialogNewProduct] = useState(false);
  const [indexProduct, setIndexProduct] = useState(products.length);

  const filteredSortedProducts = products
    .toSorted((a, b) => {
      if (sortOrder === "asc") {
        return a[sortBy] < b[sortBy] ? -1 : 1;
      } else {
        return a[sortBy] > b[sortBy] ? -1 : 1;
      }
    })
    .filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) &&
        product.price >= minPrice &&
        product.price <= maxPrice &&
        product.kategori
    );

  return (
    <div className="products">
      <header>
        <Button onClick={() => setDialogNewProduct(!dialogNewProduct)}>
          <AiOutlinePlus />
          Buat
        </Button>
        <label>
          Cari:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <section>
          Harga:
          <label>
            Minimal:
            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </label>
          <label>
            Maksimal:
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value || Infinity)}
            />
          </label>
          <label>
            Kategori:
            <select
              value={kategori}
              onChange={(e) => setKategori(e.target.value)}
            >
              <option value="id">Semua</option>
              <option value="laptop">Laptop</option>
              <option value="smartphone">Smartphone</option>
            </select>
          </label>
        </section>
        <section>
          <label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="id">Normal</option>
              <option value="name">Nama</option>
              <option value="price">Harga</option>
            </select>
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Naik</option>
            <option value="desc">Turun</option>
          </select>
        </section>
        <Button
          onClick={() => {
            setDialogCart(!dialogCart);
          }}
        >
          <BsCart4 size={20} />
          {cart.length}
        </Button>
      </header>
      <main>
        {filteredSortedProducts.length > 0
          ? filteredSortedProducts
              .filter((_product, i) => i >= 4 * page - 4 && i < 4 * page)
              .map((product) => (
                <Product
                  key={product.id}
                  {...product}
                  setEditedProduct={setEditedProduct}
                  cart={cart}
                  setCart={setCart}
                  products={products}
                  setProducts={setProducts}
                />
              ))
          : "Tidak ada produk ditemukan."}
      </main>
      <footer>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Sebelumnya
        </Button>
        {filteredSortedProducts
          .filter((_product, i) => i % 4 === 0)
          .map((_product, i) => (
            <button
              key={i}
              className="page-number"
              onClick={() => setPage(i + 1)}
              disabled={i + 1 === page}
            >
              {i + 1}
            </button>
          ))}
        <Button
          onClick={() => setPage(page + 1)}
          disabled={page === Math.ceil(filteredSortedProducts.length / 4)}
        >
          Berikutnya
        </Button>
      </footer>
      {editedProduct && (
        <form
          className="dialog"
          onSubmit={(e) => {
            e.preventDefault();
            setProducts(
              products.map((product) =>
                product.id === editedProduct.id ? editedProduct : product
              )
            );
            setEditedProduct(undefined);
          }}
        >
          <h1>Edit Produk</h1>
          <label>
            Nama
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
              autoFocus
            />
          </label>
          <label>
            Harga
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({
                  ...editedProduct,
                  price: parseInt(e.target.value),
                })
              }
            />
          </label>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button
              type="reset"
              variant="tonal"
              onClick={() => setEditedProduct(undefined)}
            >
              Batal
            </Button>
            <Button>Simpan</Button>
          </div>
        </form>
      )}
      {dialogCart && (
        <div className="dialog">
          <h2>Keranjang</h2>
          <table>
            <thead>
              <tr>
                <td>ID</td>
                <td>Nama</td>
                <td>Jumlah</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0
                ? cart.map((c) => (
                    <tr key={c.id}>
                      <th>{c.id}</th>
                      <th>{c.name}</th>
                      <th>{c.count}</th>
                      <th style={{ display: "flex", gap: "8px" }}>
                        <Button
                          onClick={() => {
                            if (c.count > 1) {
                              setCart(
                                cart.map((p) =>
                                  p.id == c.id
                                    ? { ...p, count: p.count - 1 }
                                    : p
                                )
                              );
                            } else {
                              setCart(cart.filter((cart) => cart.id !== c.id));
                            }
                          }}
                        >
                          Kurangi
                        </Button>
                        <Button
                          onClick={() =>
                            setCart(
                              cart.map((cart) =>
                                cart.id === c.id
                                  ? { ...cart, count: cart.count + 1 }
                                  : cart
                              )
                            )
                          }
                        >
                          Tambah
                        </Button>
                      </th>
                    </tr>
                  ))
                : "Keranjang Kosong"}
            </tbody>
            <span>
              Total Bayar : Rp.
              {cart.reduce((a, b) => a + b.price, 0).toLocaleString()}
            </span>
          </table>
          <Button onClick={() => setDialogCart(!dialogCart)}>Close</Button>
        </div>
      )}
      {dialogNewProduct && (
        <div className="dialog">
          <h2>Create Product</h2>
          <form className="form">
            <label>
              ID :
              <input
                onChange={(e) =>
                  setNewProduct({ ...newProduct, id: e.target.value })
                }
                type="number"
              />
            </label>
            <label>
              Name :
              <input
                type="text"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </label>
            <label>
              Harga :
              <input
                type="number"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </label>
            <label>
              Gambar :
              <input
                type="text"
                onChange={(e) =>
                  setNewProduct({ ...newProduct, image: e.target.value })
                }
              />
            </label>
            <label>
              Kategori :
              <select
                value={kategori}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, kategori: e.target.value })
                }
              >
                <option value="laptop">Laptop</option>
                <option value="smartphone">Smartphone</option>
              </select>
            </label>
            <div>
              <button onClick={() => setDialogNewProduct(!dialogNewProduct)}>
                Batal
              </button>
              <button onClick={() => setProducts([...products, newProduct])}>
                Simpan
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
