import { Container, Header, Icon } from "semantic-ui-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import bookstamp from "../public/bkstmp.svg";
import { useRouter } from "next/router";

// header component
export default function HomepageHead() {
  const [clicked, setClicked] = useState(false);
  const router = useRouter();

  // When click event occurs, go to WE page
  const onClick = () => {
    setClicked(true);
    router.push("/we");
  };

  const onClick_goDiscord = () => {
    setClicked(true);
    router.push("https://discord.gg/bQ3cjMRdPh");
  };

  const buttonVariants = {
    // animation function definition : btn in main
    hover: (clicked) => ({
      // 클릭된 버튼은 scale이 커지지 않음
      scale: clicked ? 1 : 1.2,
      color: "white",
      backgroundColor: "black",
    }),
    pressed: {
      scale: 0.8,
    },
    rest: {
      scale: 1,
    },
  };

  const blockVariants = {
    // animation function definition : text block in main
    initial: {
      x: 0,
      y: "-30%",
    },
    target: {
      x: 0,
      y: "30%",
    },
  };

  const blockVariants2 = {
    initial: {
      x: 0,
      y: 0,
    },
    target: {
      x: 0,
      y: "60%",
    },
  };

  return (
    <>
      <Container textAlign="center">
        <Header
          as="h1"
          content="We Are Bookstamp"
          inverted
          style={{
            fontSize: "4em",
            fontWeight: "normal",
            marginBottom: 0,
            marginTop: "2.5em",
            fontFamily: "DoHyeon-Regular",
          }}
        />
        <Header
          as="h2"
          content="find wider communication"
          inverted
          style={{
            fontSize: "1.5em",
            fontWeight: "normal",
            marginTop: "1em",
            marginBottom: "1.5em",
            fontFamily: "DoHyeon-Regular",
            color: "grey",
          }}
        ></Header>

        <Image
          src={bookstamp}
          style={{ marginBottom: "1em" }}
          width={350}
          height={350}
        />

        <div className="motionBox">
          <div className="moveBookstamp">
            <motion.p
              className="motionPBox"
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
              <p>
                <Icon name="arrow alternate circle down" /> 북스탬프로 이동
              </p>
            </motion.p>
            <motion.button
            initial="rest"
            whileHover="hover" // hover상태 일 때 hover animation발생
            whileTap="pressed"
            variants={buttonVariants}
            custom={clicked} // custom을 통해 값을 전달 할 수 있다.
            onClick={onClick}
            style={{
              backgroundColor:"black",
              border: "2px solid grey",
              color:"white",
              height:"2.2rem",
              borderRadius:"1rem",
              lineHeight:"0.8rem",
              cursor: "pointer",

            }}
          >
            <span>Go Bookstamp</span>
            <Icon name="right arrow" style={{marginLeft:"0.5rem"}}/>
          </motion.button>
          </div>
          <div className="moveDiscord">
            <motion.p
              className="motionPBox"
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
              <p>
                <Icon name="arrow alternate circle down" /> 디스코드로 이동
              </p>
            </motion.p>
            <motion.button
            initial="rest"
            whileHover="hover"
            whileTap="pressed"
            variants={buttonVariants}
            custom={clicked}
            onClick={onClick_goDiscord}
            style={{
              backgroundColor:"black",
              border: "2px solid grey",
              color:"white",
              height:"2.2rem",
              borderRadius:"1rem",
              lineHeight:"0.8rem",
              cursor: "pointer",
            }}
          >
            <span> Go Discord</span>
            <Icon name="discord" style={{marginLeft:"0.5rem"}}/>
          </motion.button>
          </div>
        </div>
      </Container>
      <style jsx>{`

      p{
        font-size: 1rem;
        font-family: "GamjaFlower-Regular";
      }

      span{
        font-size: 1rem;
      }

    .motionBox{
      display: flex;
      justify-content: center;
      position: relative;
      width: 100%;
      height: 200px;
    }
    
    .moveBookstamp{
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 40%;
      top: 30%;
      left: 50%;
      transform: translate(-50%,-50%);
    }
    
    .moveDiscord{
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 40%;
      
      top: 80%;
      left: 50%;
      transform: translate(-50%, -50%);
    }


    span{
      font-size: 1rem;
      padding: 1rem 0;
    }
    
    @media screen and (max-width: 768px){
      .moveBookstamp{
        width: 50%;
      }

      .moveDiscord{
        width: 50%;
      }

      span{

        font-size: 0.8rem;
      }
    }

    .motionPBox{
      height: 100px;
      width: 150px";
      borderRadius: 50%;
    }

    .iconBtn{
      margin : 1rem;
    }

    `}</style>
    </>
  );
}
