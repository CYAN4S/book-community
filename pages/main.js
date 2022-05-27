import {
  Button,
  Container,
  Divider,
  Header,
  Icon,
  Menu,
  Segment,
} from "semantic-ui-react";
import { useRouter } from "next/router";
import withTransition from "../public/HOC/withTransition";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { useState } from "react";

function Main() {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);
  // When click event occurs, go to WE page
  const onClick = () => {
    setClicked(true);
    router.push("/we");
  };

  const onClick_goDiscord = () => {
    setClicked(true);
    router.push("https://discord.gg/nvwy2PpW");
  };

  const buttonVariants = {
    // function으로 정의하는 모습
    hover: (clicked) => ({
      // 클릭된 버튼은 scale이 커지지 않는다.
      scale: clicked ? 1 : 1.5,
      color: "white",
      backgroundColor: "black",
    }),
    pressed: {
      scale: 0.7,
    },
    rest: {
      scale: 1,
    },
  };

  const rotate = useMotionValue(0);
  const blockVariants = {
    initial: {
      x : "-2em",
      y: 50,
    },
    target: {
      x : "-2em",
      y: 80,
    },
  };
  const blockVariants2 = {
    initial: {
      x : "2em",
      y: 80,
    },
    target: {
      x : "2em",
      y: 50,
    },
  };
  // header component
  const HomepageHead = () => (
    <Container textAlign="center">
      <Header
        as="h1"
        content="We Are Bookstamp"
        inverted
        style={{
          fontSize: "4em",
          fontWeight: "normal",
          marginBottom: 0,
          marginTop: "3em",
        }}
      />
      <Header
        as="h2"
        content="find wider communication"
        inverted
        style={{
          fontSize: "1.7em",
          fontWeight: "normal",
          marginTop: "1em",
          marginBottom: "5.5em",
        }}
      ></Header>

      <Header
        as="h2"
        content="메인이미지 넣는곳"
        inverted
        style={{
          fontSize: "1.7em",
          fontWeight: "normal",
          marginTop: "1em",
          marginBottom: "2.5em",
        }}
      />

      <div style={{ display: "flex", justifyContent: "center" }}>
        <motion.p
          style={{
            background: "linear-gradient(90deg, 0%,#aacaef 75%)",
            height: "100px",
            width: "150px",
            borderRadius: "50%",
          }}
          variants={blockVariants}
          initial="initial"
          animate="target"
          transition={{
            ease: "easeInOut",
            duration: 1, // 애니메이션이 총 걸리는 시간
            delay: 1, // 처음 애니메이션 delay
            repeat: Infinity, // 3번 반복
            // repeat: Infinity,
            repeatType: "reverse", //   "loop" | "reverse" | "mirror";
            repeatDelay: 1, // 반복 될 때 delay
          }}
        >
          <p style={{ fontSize: 18, fontFamily: "GamjaFlower-Regular" }}>
            <Icon name="arrow alternate circle down" /> 북스탬프로 이동
          </p>
        </motion.p>
        <motion.p
          style={{
            background: "linear-gradient(90deg, 0%,#aacaef 75%)",
            height: "100px",
            width: "150px",
            borderRadius: "50%",
          }}
          variants={blockVariants2}
          initial="initial"
          animate="target"
          transition={{
            ease: "easeInOut",
            duration: 1, // 애니메이션이 총 걸리는 시간
            delay: 1, // 처음 애니메이션 delay
            repeat: Infinity, // 3번 반복
            // repeat: Infinity,
            repeatType: "reverse", //   "loop" | "reverse" | "mirror";
            repeatDelay: 1, // 반복 될 때 delay
          }}
        >
          <p style={{ fontSize: 18, fontFamily: "GamjaFlower-Regular" }}>
            <Icon name="arrow alternate circle down" /> 디스코드로 이동
          </p>
        </motion.p>
      </div>

      <div>
        <motion.button
          initial="rest"
          whileHover="hover" // hover상태 일 때 hover animation발생
          whileTap="pressed"
          variants={buttonVariants}
          custom={clicked} // custom을 통해 값을 전달 할 수 있다.
          onClick={onClick}
          style={{
            backgroundColor: "white",
            cursor: "pointer",
            paddingLeft: 10,
            paddingTop: 5,
            marginBottom: 5,
            fontSize: 25,
            fontFamily: "FredokaOne-Regular",
          }}
        >
          Go Bookstamp
          <Icon name="right arrow" style={{ marginLeft: 10 }} />
        </motion.button>

        <motion.button
          initial="rest"
          whileHover="hover"
          whileTap="pressed"
          variants={buttonVariants}
          custom={clicked}
          onClick={onClick_goDiscord}
          style={{
            backgroundColor: "white",
            cursor: "pointer",
            paddingLeft: 10,
            paddingTop: 5,
            marginBottom: 5,
            fontSize: 25,
            fontFamily: "FredokaOne-Regular",
          }}
        >
          Go Discord
          <Icon name="discord" style={{ marginLeft: 10 }} />
        </motion.button>
      </div>
    </Container>
  );

  return (
    <>
      <Segment
        inverted
        textAlign="center"
        style={{
          minHeight: "100vh",
          padding: "1em 0em",
          marginTop: -35,
          marginLeft: -10,
          marginRight: -10,
        }}
      >
        <HomepageHead />
      </Segment>
    </>
  );
}

export default withTransition(Main);