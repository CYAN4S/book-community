import Image from "next/image";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import { authService } from "../firebaseConfig";
import { useEffect, useState } from "react";

export default function Profile() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [user, setUser] = useState(null);
  const [newName, setNewName] = useState("");

  onAuthStateChanged(authService, (user) => {
    if (user) {
      setUser(user);
      setIsSignedIn(true);
    } else {
      setIsSignedIn(false);
    }
  });

  useEffect(() => {
    if (isSignedIn) {
      setDisplayName(user.displayName);
    }
  }, [isSignedIn]);

  const updateDisplayName = (newName) => {
    updateProfile(authService.currentUser, {
      displayName: newName,
    })
      .then(() => {
        setDisplayName(newName);
        alert("Name Changed!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div id="profile">
      <h1>{displayName}</h1>
      <form>
        <input
          type="text"
          name="newName"
          id="newName"
          value={newName}
          onChange={(e) => {
            setNewName(e.target.value);
          }}
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            updateDisplayName(newName);
          }}
        >
          Update Display Name
        </button>
      </form>
    </div>
  );
}
