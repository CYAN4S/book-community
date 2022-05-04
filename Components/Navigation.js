import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Menu } from "semantic-ui-react";
import { authService } from "../firebaseConfig";

export default function Navigation() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsSignedIn(true);
      } else {
        setIsSignedIn(false);
      }
    });
  }, []);

  const router = useRouter();
  let activeItem = {};

  if (router.pathname === "/") {
    activeItem = "home";
  } else if (router.pathname === "/view_more") {
    activeItem = "view_more";
  } else if (router.pathname === "/explore") {
    activeItem = "explore";
  } else if (router.pathname === "/profile") {
    activeItem = "profile";
  }

  function goLink(e, data) {
    if (data.name === "home") {
      router.push("/");
    } else if (data.name === "view_more") {
      router.push("/view_more");
    } else if (data.name === "explore") {
      router.push("/explore");
    } else if (data.name === "profile") {
      router.push("/profile");
    }
  }


  return (
    <>
      {isSignedIn ? (
        <>
          <Menu inverted color={"teal"} widths={4} attached='top' tabular>
            <Menu.Item
              name="home"
              active={activeItem === "home"}
              onClick={goLink}
            />
            <Menu.Item
              name="explore"
              active={activeItem === "explore"}
              onClick={goLink}
            />
            <Menu.Item
              name="profile"
              active={activeItem === "profile"}
              onClick={goLink}
            />
            <Menu.Item
              name="view_more"
              active={activeItem === "about"}
              onClick={goLink}
            />
          </Menu>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
