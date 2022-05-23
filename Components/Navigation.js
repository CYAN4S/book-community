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
              onClick={goLink}
            />
            <Menu.Item
              name="EXPLORE"
              onClick={goLink}
            />
            <Menu.Item
              name="POST"
              onClick={goLink}
            />
            <Menu.Item
              name="PROFILE"
              onClick={goLink}
            />
            <Menu.Item
              name="VIEW MORE"
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
