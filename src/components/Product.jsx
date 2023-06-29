import Button from "./Button";
import { BiSolidEditAlt } from "react-icons/bi";
import { BsFillTrashFill, BsCartPlus } from "react-icons/bs";

export default function Product({
  id,
  name,
  image,
  price,
  setEditedProduct,
  cart,
  setCart,
  products,
  kategori,
  setProducts,
}) {
  return (
    <div className="product">
      <img src={image} alt={name} />
      <section>
        <h2>{name}</h2>
        <p>
          {price.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
          })}
          ({kategori})
        </p>
        <div className="cont-btn">
          <Button
            onClick={() => {
              if (cart.find((cart) => cart.id == id)) {
                setCart(
                  cart.map((p) =>
                    p.id === id
                      ? {
                          ...p,
                          count: p.count + 1,
                        }
                      : p
                  )
                );
              } else {
                products.map(
                  (product) =>
                    product.id === id &&
                    setCart([...cart, { ...product, count: 1 }])
                );
              }
            }}
          >
            <BsCartPlus />
          </Button>
          <div>
            <Button
              variant="tonal"
              onClick={() =>
                setEditedProduct({
                  id,
                  name,
                  image,
                  price,
                  kategori,
                })
              }
            >
              <BiSolidEditAlt />
            </Button>
            <Button
              onClick={() => {
                alert(`Apakah Anda yakin ingin menghapus produk ini(${name})`);
                setProducts(products.map((prod) => prod.id == id));
              }}
            >
              <BsFillTrashFill />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
