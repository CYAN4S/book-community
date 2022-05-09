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

  // active branch
  if (router.pathname === "/") {
    activeItem = "home";
  } else if (router.pathname === "/view_more") {
    activeItem = "view_more";
  } else if (router.pathname === "/explore") {
    activeItem = "explore";
  } else if (router.pathname === "/profile") {
    activeItem = "profile";
  } else if (router.pathname === "/post") {
    activeItem = "post";
  }

  // actual movement
  function goLink(e, data) {
    if (data.name === "HOME") {
      router.push("/");
    } else if (data.name === "VIEW MORE") {
      router.push("/view_more");
    } else if (data.name === "EXPLORE") {
      router.push("/explore");
    } else if (data.name === "PROFILE") {
      router.push("/profile");
    } else if (data.name === "POST") {
      router.push("/post");
    }
  }


  return (
    <>
      {isSignedIn ? (
        <>
          <Menu inverted color={"teal"} widths={5} attached='top' tabular>
            <Menu.Item
              name="HOME"
              active={activeItem === "home"}
              onClick={goLink}
            />
            <Menu.Item
              name="EXPLORE"
              active={activeItem === "explore"}
              onClick={goLink}
            />
            <Menu.Item
              name="POST"
              active={activeItem === "post"}
              onClick={goLink}
            />
            <Menu.Item
              name="PROFILE"
              active={activeItem === "profile"}
              onClick={goLink}
            />
            <Menu.Item
              name="VIEW MORE"
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
