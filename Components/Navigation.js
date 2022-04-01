import { useRouter } from "next/router";
import { Menu } from "semantic-ui-react";

export default function Navigation() {
  const router = useRouter(); // useRouter는 nextjs에서 사용하는거
  let activeItem = {};

  if (router.pathname === "/") {
    activeItem = "home";
  } else if (router.pathname === "/about") {
    activeItem = "about";
  } else if (router.pathname === "/books/books") {
    activeItem = "books";
  }

  function goLink(e, data) {
    if (data.name === "home") {
      router.push("/");
    } else if (data.name === "about") {
      router.push("/about");
    } else if (data.name === "books") {
      router.push("/books/books");
    }
  }
  return (
    <Menu inverted color={"black"} widths={3}>
      <Menu.Item name="home" active={activeItem === "home"} onClick={goLink} />
      <Menu.Item
        name="about"
        active={activeItem === "about"}
        onClick={goLink}
      />
      <Menu.Item
        name="books"
        active={activeItem === "books"}
        onClick={goLink}
      />
    </Menu>
  );
}
