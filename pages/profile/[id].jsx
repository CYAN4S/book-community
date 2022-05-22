import {
  authService as auth,
  dbService as db,
  storageService,
} from "../../firebaseConfig";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { addDoc, collection, doc, setDoc, } from "firebase/firestore";
import { updateProfile } from "firebase/auth";

import {
  Divider,
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Image,
  Input,
  Label,
  List,
  Segment,
  TextArea,
} from "semantic-ui-react";

import { v4 } from "uuid";
import Link from "next/link";

import { useRecoilState } from "recoil";
import { currentUserState } from "../../utils/hooks";

import { onUserDocSnapshot, getUserDoc } from "../../utils/functions";

export default function Profile() {
  const [currentUser] = useRecoilState(currentUserState);

  // Route
  const router = useRouter();
  const queryId = router.query.id;

  // Query User
  const [displayName, setDisplayName] = useState(null);
  const [statusMsg, setStatusMsg] = useState("");
  const [wasSubingCheck, setWasSubingCheck] = useState(false);
  const [subscribers, setSubscribers] = useState([]);

  // Form Input
  const [newName, setNewName] = useState("");
  const [newStatusMsg, setNewStatusMsg] = useState("");

  const isMe = () => currentUser?.uid == queryId;
  const [myBooks, setMyBooks] = useState([]);

  // ProfilePhoto Code
  const [imgFileString, setImgFileString] = useState("");
  const [currentUserPhotoUri, setCurrentUserPhotoUri] = useState("");
  const [doUploadPhoto, setDoUploadPhoto] = useState(false);

  const onLogOutClick = () => {
    auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    const unsub = onUserDocSnapshot(queryId, onUser);
    return () => unsub?.();
  }, [queryId]);

  const onUser = async (data) => {
    setDisplayName(data?.displayName);
    setStatusMsg(data?.statusMsg);
    setCurrentUserPhotoUri(data?.userPhoto);

    if (data?.users) {
      const x = await Promise.all(
        data.users.map(async (uid) => await getUserDoc(uid))
      );
      setSubscribers(x);
    } else {
      setSubscribers([]);
    }

    if (currentUser) {
      setWasSubingCheck(currentUser.users?.includes(queryId));
    }

    if (data?.myBooks) {
      const listMyBook = await Promise.all(
        data.myBooks.map(async (x) => await x.substr(24))
      );
      setMyBooks(listMyBook);
    } else {
      setMyBooks([]);
    }
  };

  const updateDisplayName = (newName) => {
    updateUserDoc({ displayName: newName })
      .then(() => {
        alert("Name Changed!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const updateStatusMsg = async (newMsg) => {
    updateUserDoc({ statusMsg: newMsg })
      .then(() => {
        alert("Status Message Changed!");
      })
      .catch((error) => {
        alert(error);
      });
  };

  const updateUserDoc = (newData) => {
    return setDoc(doc(db, "profile", currentUser.uid), newData, {
      merge: true,
    });
  };

  const onSubmit = (callback) => (e) => {
    e.preventDefault();
    callback();
  };

  const onSubscribeClick = async (e) => {
    e.preventDefault();

    const doc = await getUserDoc(currentUser?.uid);
    const isSubing = !!doc.users?.includes(queryId);

    if (isSubing) {
      updateUserDoc({ users: doc.users.filter((id) => id != queryId) });
      setWasSubingCheck(false);
    } else {
      updateUserDoc({ users: doc.users ? [...doc.users, queryId] : [queryId] });
      setWasSubingCheck(true);
    }
  };

  // profilePhoto code start
  const onNewPhotoSubmit = async (e, data) => {
    e.preventDefault();

    let userPhoto = "";
    if (imgFileString == "") {
      alert("업로드할 사진을 선택하세요!");
      return;
    } else {
      const fileRef = ref(storageService, `${data.uid}/${v4()}`);
      const response = await uploadString(fileRef, imgFileString, "data_url");
      userPhoto = await getDownloadURL(response.ref);
    }
    const userPhotoObj = {
      userPhoto,
    };
    updateUserDoc(userPhotoObj)
      .then(() => console.log("프로필사진 전송완료"))
      .catch((error) => alert(error));
    setImgFileString("");
    router.push("/profile");
  };

  const onFileChange = (event) => {
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

  const onClearPhotoClick = () => setImgFileString("");
  const onUploadPhotoClick = () => setDoUploadPhoto((prev) => !prev);
  // profilePhoto code end
  return (
    <div id="profile">
      <Header style={{ marginTop: 30 }}>
        <Label color={"teal"} size="massive" style={{ marginLeft: 10 }}>
          <span style={{ letterSpacing: 1.2, fontFamily: "GothicA1-Bold" }}>
            {displayName
              ? `${displayName}님의 프로필`
              : isMe()
              ? "닉네임을 설정해주세요."
              : "닉네임을 아직 설정하지 않은 사용자입니다."}
          </span>
        </Label>

        {!isMe() && (
          <span style={{ marginLeft: 20 }}>
            {wasSubingCheck ? (
              <>
                <Button.Group size="large">
                  <Button onClick={onSubscribeClick} negative>
                    구독 취소
                  </Button>
                  <Button.Or />
                  <Button disabled>구독하기</Button>
                </Button.Group>
              </>
            ) : (
              <>
                <Button.Group size="large">
                  <Button disabled>구독 취소</Button>
                  <Button.Or />
                  <Button onClick={onSubscribeClick} positive>
                    구독하기
                  </Button>
                </Button.Group>
              </>
            )}
          </span>
        )}
      </Header>

      <Grid columns={isMe() ? 2 : 1} style={{ marginLeft: 10 }}>
        <Grid.Column>
          <Segment raised>
            <Label as="a" color="red" ribbon>
              상태메시지
            </Label>
            <span>
              {statusMsg ? <>{statusMsg}</> : <>상태메시지를 입력해보세요</>}
            </span>
            <Divider></Divider>
            <Label as="a" color="orange" ribbon style={{height:25}}>
              프로필사진
            </Label>
            {/* userPhotoUpload */}
            {isMe() ? (
              <>
                {!doUploadPhoto ? (
                  <>
                    <Button
                      color='purple'
                      inverted
                      size="mini"
                      //floated ="right"
                      onClick={onUploadPhotoClick}
                      style={{marginLeft : -8, height : 25}}
                    >
                      <Icon
                        name="exchange"
                        style={{ marginLeft: -10, marginRight: -10} }
                      />
                    </Button>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
            {currentUserPhotoUri ? (
              <>
                <Image
                  src={currentUserPhotoUri}
                  width="40%"
                  height="40%"
                  style={{ marginTop: 10, marginBottom: 10 }}
                ></Image>
              </>
            ) : (
              <>
                {isMe() ? (
                  <> 나만의 프로필 사진을 꾸며봐요 </>
                ) : (
                  <> 사진을 등록하지 않은 사용자입니다. </>
                )}
              </>
            )}

            

            {isMe() ? (
              <>
                {doUploadPhoto ? (
                  <>
                    <Form onSubmit={onNewPhotoSubmit}>
                      <div>
                        <Label
                          basic
                          color="orange"
                          pointing="right"
                          htmlFor="attach-file"
                          style={{ marginTop: 10 }}
                        >
                          <p>Add photos</p>
                        </Label>

                        <Input
                          type="file"
                          accept="image/*"
                          onChange={onFileChange}
                          id="attach-file"
                          icon="file image"
                          style={{ marginLeft: 10, marginBottom: 5 }}
                        />
                      </div>

                      {imgFileString && (
                        <div>
                          <Divider></Divider>
                          <Image
                            fluid
                            label={{
                              color: "red",
                              onClick: onClearPhotoClick,
                              icon: "remove circle",
                              size: "medium",
                              ribbon: true,
                            }}
                            src={imgFileString}
                            style={{
                              backgroundImage: imgFileString,
                              width: "40%",
                              height: "40%",
                              marginTop: 10,
                              marginLeft: 20,
                              marginBottom: 20,
                            }}
                          />
                        </div>
                      )}
                      <Button color="violet" inverted style={{ marginTop: 10 }}>
                        <Icon
                          name="upload"
                          style={{ marginLeft: -11, marginRight: -10 }}
                        />
                      </Button>
                      <Button
                        color="red"
                        onClick={onUploadPhotoClick}
                        style={{ marginTop: 10 }}
                        inverted
                      >
                        <Icon
                          name="undo"
                          style={{ marginLeft: -11, marginRight: -10 }}
                        />
                      </Button>
                    </Form>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <> </>
            )}
            <Divider></Divider>
            <Label as="a" color="yellow" ribbon>
              {isMe() ? (
                <> 내가 구독한 사용자 </>
              ) : (
                <> 해당 사용자가 구독한 사용자 </>
              )}
            </Label>

            {subscribers.length == 0 ? (
              <div>
                <Icon name="thumbs up" style={{ marginTop: 15 }} />
                <span>구독자가 없습니다.</span>
              </div>
            ) : (
              <List>
                {subscribers.map((user) => (
                  <List.Item key={v4()} style={{ marginBottom: 5 }}>
                    {/* <Image avatar src="/images/avatar/small/rachel.png" /> */}
                    <List.Content>
                      {user.uid === currentUser.uid ? (
                        <>
                          <List.Header>
                            <strong style={{ fontSize: 15 }}>
                              {" "}
                              ✅ {user.displayName ? user.displayName:"게스트"}{" "}
                            </strong>
                          </List.Header>
                        </>
                      ) : (
                        <>
                          <Link href={`/profile/${user.uid}`}>
                            <List.Header as="a">
                              <strong style={{ fontSize: 15 }}>
                                {" "}
                                ✅ {user.displayName ? user.displayName:"게스트"}{" "}
                              </strong>
                            </List.Header>
                          </Link>
                        </>
                      )}

                      <List.Description>
                        <p style={{ fontSize: 12, marginLeft: 30 }}>
                          {" "}
                          {user.statusMsg
                            ? `상태메시지 : ${user.statusMsg}`
                            : "상태메시지가 없습니다."}{" "}
                        </p>
                      </List.Description>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            )}
            <Divider></Divider>
            <Label style={{ marginTop: 5 }} as="a" color="green" ribbon>
              {isMe() ? (
                <> 내가 등록한 책 목록 </>
              ) : (
                <> 해당 사용자가 등록한 책 목록 </>
              )}
            </Label>

            {myBooks.length == 0 ? (
              <div>
                <Icon name="thumbs up" style={{ marginTop: 15 }} />
                <span>등록한 책이 없습니다.</span>
              </div>
            ) : (
              <List className="ui bulleted list">
                {myBooks.map((myBooks) => (
                  <List.Item key={v4()}>
                    <List.Content>
                      <Link href={`/explore/detail/${myBooks}`}>
                        <List.Header as="a">{myBooks}</List.Header>
                      </Link>
                    </List.Content>
                  </List.Item>
                ))}
              </List>
            )}
          </Segment>
        </Grid.Column>
        <Grid.Column>
          {isMe() && (
            <Segment raised style={{ marginRight: 30 }}>
              <Form onSubmit={onSubmit(() => updateDisplayName(newName))}>
                <Form.Field>
                  <Label as="a" color="blue" ribbon="right">
                    닉네임 바꾸기
                  </Label>
                  <Input
                    type="text"
                    placeholder="새로운 닉네임"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={{ marginTop: 10 }}
                    required
                  />
                </Form.Field>

                <Button type="submit" inverted size="mini" color="purple">
                  <Icon
                    name="exchange"
                    style={{ marginLeft: -10, marginRight: -10 }}
                  />
                </Button>
              </Form>

              <Form onSubmit={onSubmit(() => updateStatusMsg(newStatusMsg))}>
                <Form.Field>
                  <Label
                    as="a"
                    style={{ backgroundColor: "#100955", color: "white" }}
                    ribbon="right"
                  >
                    상태메시지 바꾸기
                  </Label>
                  <input
                    type="text"
                    placeholder="새로운 상태 메시지"
                    value={newStatusMsg}
                    onChange={(e) => setNewStatusMsg(e.target.value)}
                    style={{ marginTop: 10 }}
                    required
                  />
                </Form.Field>

                <Button type="submit" inverted size="mini" color="purple">
                  <Icon
                    name="exchange"
                    style={{ marginLeft: -10, marginRight: -10 }}
                  />
                </Button>
              </Form>

              <Label
                as="a"
                color="violet"
                ribbon="right"
                onClick={onLogOutClick}
              >
                <Icon name="sign out alternate"></Icon>로그아웃하기
              </Label>
            </Segment>
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
}
