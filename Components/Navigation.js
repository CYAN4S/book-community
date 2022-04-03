import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { authService } from "../firebaseConfig";

export default function Navigation() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(()=>{
    authService.onAuthStateChanged((user) =>{
      if(user){
        setIsSignedIn(true);
      }else{
        setIsSignedIn(false);
      }
    });
  }, [])

  const router = useRouter(); 
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
    <>
    {
      isSignedIn ? 
      <>
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
      </> : 
      <>

      </>
    }
    </>
  );
}
