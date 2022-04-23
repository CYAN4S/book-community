import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import React, { useState, useEffect } from "react";
import { Button, Form, TextArea } from "semantic-ui-react";
import { authService, dbService, storageService } from "../firebaseConfig";
import { v4 } from "uuid";
import { async } from "@firebase/util";

export default function Chats({ chat, isOwner,ref}) {
  const [newChat, setNewChat] = useState(chat.text);
  const [likeNum, setLikeNum] = useState(chat.likeNum);
  const [getSubscriberNum, setgetSubscriberNum] = useState(chat.getSubscriberNum);
  const [username, setUserName] = useState(
    chat.nickName ? chat.nickName : "guest"
  );
  const [newfollowing, setNewFollowing] = useState(false);
  const [editing, setEditing] = useState(false);
  const [userObj, setUserObj] = useState(null);
  const [imgFileString, setImgFileString] = useState("");
  const [imgEdit, setImgEdit] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          likeNum : likeNum,
          getSubscriberNum : getSubscriberNum,
          doLike : false,
          doSubscribe : false,
          updateProfile: (args) => updateProfile(args),
        });
      }
    });
  }, []);
  

  const onDeleteClick = async () => {
    const ok = window.confirm("채팅을 삭제하시겠습니까?");
    if (ok) {
      await deleteDoc(doc(dbService, "chat", `${chat.id}`))
        .then(() => {
          alert("채팅이 삭제되었습니다!");
        })
        .catch((error) => {
          alert(error);
        });

      if (chat.fileUrl !== "") {
        await deleteObject(ref(storageService, chat.fileUrl));
      }
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (imgEdit) {
      const fileRef = ref(storageService, `${userObj.uid}/${v4()}`);
      const response = await uploadString(fileRef, imgFileString, "data_url");
      const temp_fileUrl = await getDownloadURL(response.ref);

      updateDoc(doc(dbService, "chat", `${chat.id}`), {
        text: newChat,
        fileUrl: temp_fileUrl,
      })
        .then(() => {
          alert("수정되었습니다!");
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      updateDoc(doc(dbService, "chat", `${chat.id}`), {
        text: newChat,
      })
        .then(() => {
          alert("수정되었습니다!");
        })
        .catch((error) => {
          alert(error);
        });
    }
    setImgEdit(false);
    setEditing(false);
    setImgFileString("");
  };

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewChat(value);
  };

  const toggleEditing = () => setEditing((prev) => !prev);
  const toggleLike = () => {

    const filter = chat.users.filter((item)=>{ // 
      console.log("테스트-item === userObj.uid 문장 ^좋아요 취소 시 발동",item === userObj.uid);
      console.log("반환된 아이템:",item);
      return item === userObj.uid
    })
    // 좋아요 취소 시 아래의 값이 반환된다. 
    console.log("chat.users 값", chat.users);
    console.log("filter 값", filter);

    // 오늘 할 것 : userObj.doLike가 초기화되지않는 뭔가가 되면
    if(!filter.length && (userObj.uid!==chat.createrId)){
      console.log("테스트-toggleLike: if문^좋아요 +1 할 경우 발동");
      setLikeNum((prev)=>prev+1);
      updateDoc(doc(dbService, "chat", `${chat.id}`), {
        likeNum: chat.likeNum+1,
        users : chat.users.concat(userObj.uid),
      })
        .then(() => {
          console.log("concat(문자열 합치기)/chat.users.concat(userObj.uid)결과 :", chat.users.concat(userObj.uid));
          userObj.doLike = true;
         })
        .catch((error) => {
          alert(error);
        });
    }else{
      console.log("테스트-toggleLike: else문^좋아요 -1 할 경우 발동");
      setLikeNum((prev)=>prev-1);
      updateDoc(doc(dbService, "chat", `${chat.id}`), {
        likeNum: chat.likeNum-1,
        users : chat.users.filter((item)=>item !== userObj.uid)
      })
        .then(() => {
          userObj.doLike = false;
          
         })
        .catch((error) => {
          alert(error);
        });
    }
  }
  const onFollowing = () => {
    const getSubscriberfilter = ref.users.filter((item)=>{ // 
      console.log("테스트-item === userObj.uid 문장 ^ 구독 취소 시 발동",item === userObj.uid);
      console.log("반환된 아이템:",item);
      return item === userObj.uid
    })
    setNewFollowing((prev) => !prev);
  
    if(!getSubscriberfilter.length && (userObj.uid!==chat.createrId)){
      updateDoc(doc(dbService, "profile", `${ref.id}`), {
        getSubscriberNum: ref.getSubscriberNum+1,
        users : ref.users.concat(userObj.uid),
        })
      .then(() => {
        userObj.doSubscribe = true;
        alert("구독되었습니다!");
      })
      .catch((error) => alert(error));
    }
    else{
      updateDoc(doc(dbService, "profile", `${ref.id}`), {
        getSubscriberNum: ref.getSubscriberNum-1,
        users : ref.users.filter((item)=>item !== userObj.uid)
        })
      .then(() => {
        userObj.doSubscribe = false;
        alert("구독이 취소되었습니다!");
      })
      .catch((error) => alert(error));
    }
  };
  /* 테스트용
  const updateUserDoc = async (doc) => {
    let ref = null;
    const q = query(profileRef, where("uid", "==", user.uid));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => (ref = doc.ref));

    return ref
      ? updateDoc(ref, doc)
      : addDoc(profileRef, {
          uid: user.uid,
          ...doc,
        });
  };
  */

  const temp_imgDeleteing = () => {
    if (imgFileString !== "") {
      setImgFileString("");
      setImgEdit(false);
    }
  };

  const imgDeleteing = async () => {
    const ok = window.confirm(
      "등록된 이미지를 삭제하시겠습니까? (삭제과정은 되돌릴 수 없습니다.)"
    );
    if (ok) {
      if (chat.fileUrl === "") {
        alert("채팅에 올려놓은 이미지가 없습니다.");
      } else {
        await deleteObject(ref(storageService, chat.fileUrl)).then(() => {
          updateDoc(doc(dbService, "chat", `${chat.id}`), {
            text: newChat,
            fileUrl: "",
          })
            .then(alert("삭제되었습니다!"))
            .catch((error) => {
              alert(error);
            });
        });
      }
    }
  };

  const onFileChange = async (event) => {
    setImgEdit(true);
    const {
      target: { files },
    } = event;
    const file = files[0];

    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const result = finishedEvent.currentTarget.result;
      setImgFileString(result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return editing ? (
    <>
      <div>
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <TextArea
              value={newChat}
              type="text"
              placeholder="수정하기"
              onChange={onChange}
              autoFocus
              required
            />
            {!chat.fileUrl ? (
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                id="attach-file"
              />
            ) : (
              <></>
            )}
          </Form.Field>
          {imgFileString && (
            <>
              <div className="temp">
                <img
                  src={imgFileString}
                  style={{
                    backgroundImage: imgFileString,
                    width: "30%",
                    height: "30%",
                  }}
                />
                <span className="downTempImg" onClick={temp_imgDeleteing}>
                  Del TempImg
                </span>
              </div>
            </>
          )}
          {chat.fileUrl ? (
            <div className="downImg" onClick={imgDeleteing}>
              Del Img
            </div>
          ) : (
            <></>
          )}
          <Button type="submit" value="update">
            {" "}
            수정 완료{" "}
          </Button>
        </Form>
      </div>
      <Button onClick={toggleEditing}>cancel</Button>
      <style jsx>{`
        div {
          margin-bottom: 10px;
        }

        .temp {
          display: flex;
        }

        .downImg {
          width: 80px;
          color: black;
          font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
          cursor: pointer;
          text-align: center;
          border-top: 2px solid black;
          border-left: none;
          border-right: none;
          border-bottom: 2px solid black;
          transition: 400ms;
        }

        .downTempImg {
          width: 100px;
          height: 24px;
          color: black;
          font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
            "Lucida Sans", Arial, sans-serif;
          cursor: pointer;
          text-align: center;
          border-top: 2px solid black;
          border-left: none;
          border-right: none;
          border-bottom: 2px solid black;
          transition: 400ms;
          margin-left: 10px;
        }

        .downImg:hover {
          color: white;
          background-color: black;
        }

        .downTempImg:hover {
          color: white;
          background-color: black;
        }

        input {
          margin: 5px auto;
        }
      `}</style>
    </>
  ) : (
    <>
      <div>
        <div style={{ marginBottom: 10 }}>
          {username} : <strong> {chat.text}</strong> <p>[등록시간] {new Date(chat.createdAt).toLocaleString()}</p>
          {chat.fileUrl && (
            <img src={chat.fileUrl} style={{ width: "100%", height: "100%" }} />
          )}
        </div>

        {isOwner ? (
          <div className="btn_Span">
            <Button onClick={onDeleteClick}>삭제</Button>
            <Button onClick={toggleEditing}>편집</Button>
            <span style={{marginLeft: 10}}> 좋아요 수 : {chat.likeNum ? "💗" : "🤍"} : {chat.likeNum}</span> 
          </div>
        ) : (
          <>
            <span className ="btn_Like" onClick={toggleLike}>좋아요 수 : {chat.likeNum ? "💗" : "🤍"} {chat.likeNum}</span>
            <Button onClick={onFollowing}>
                {newfollowing ? "구독 중" : "구독"}
              </Button>
          </>
        )}
      </div>
      <style jsx>{`
        .btn_Span {
          margin-left: 10px;
          width : 100%;
        }

        strong {
          font-size: 15px;
        }

        .btn_Like{
          cursor:pointer;
        }
      `}</style>
    </>
  );
}
