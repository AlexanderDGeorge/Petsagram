import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import {
    FaGithub,
    FaLinkedin,
    FaLaptopCode,
    FaSun,
    FaMoon,
} from "react-icons/fa";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import { Petsagram } from "./StyledComponents";
import { DarkContext } from "./Application";

export default function Splash() {
    const [flipped, setFlipped] = useState(true);
    const { darkMode, setMode } = useContext(DarkContext);

    function Card({ children }) {
        const calc = (x, y) => [
            -(y - window.innerHeight / 2) / 100,
            (x - window.innerWidth / 2) / 100,
            1.1,
        ];
        const trans = (x, y, s) =>
            flipped
                ? `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`
                : `perspective(600px) rotateX(${x}deg) rotateY(${
                      180 + y
                  }deg) scale(${s})`;

        const [props, set] = useSpring(() => ({
            xys: [0, 0, 1],
            config: { mass: 1, tension: 5, friction: 10 },
        }));

        return (
            <animated.div
                onMouseMove={({ clientX: x, clientY: y }) =>
                    set({ xys: calc(x, y) })
                }
                onMouseLeave={() => set({ xys: [0, 0, 1] })}
                style={{ transform: props.xys.interpolate(trans) }}
            >
                {children}
            </animated.div>
        );
    }

    return (
        <SplashSection>
            <SplashHeader>
                <div>
                    <Petsagram />
                    <IconDiv>
                        <a href="https://github.com/AlexanderDGeorge/Petsagram">
                            <FaGithub />
                        </a>
                        <a href="https://www.linkedin.com/in/alexander-george-410466151/">
                            <FaLinkedin />
                        </a>
                        <a href="https://www.alexandergeorge.dev">
                            <FaLaptopCode />
                        </a>
                    </IconDiv>
                </div>
            </SplashHeader>
            <Card>
                {flipped ? (
                    <SignIn setFlipped={setFlipped} />
                ) : (
                    <SignUp setFlipped={setFlipped} />
                )}
            </Card>
            <SplashFooter>
                <div
                    onClick={() => setMode(!darkMode)}
                    style={{
                        cursor: "pointer",
                    }}
                >
                    {darkMode ? <FaSun /> : <FaMoon />}
                </div>
            </SplashFooter>
        </SplashSection>
    );
}

const IconDiv = styled.div`
    height: 100%;
    width: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    svg {
        height: 30px;
        width: auto;
        fill: ${(props) => props.theme.dark};
        &:hover {
            fill: ${(props) => props.theme.black};
        }
    }
`;

const SplashHeader = styled.header`
    position: absolute;
    top: 0;
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: center;
    box-shadow: 0 1px 6px 0;
    color: ${(props) => props.theme.main};
    transition: box-shadow 1s linear;
    &:hover {
        box-shadow: 0 3px 6px 0;
        transition: box-shadow 1s linear;
    }
    > div {
        min-width: 300px;
        max-width: 700px;
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`;

const SplashFooter = styled.footer`
    position: absolute;
    bottom: 0;
    height: 10%;
    width: 100%;
    display: flex;
    justify-content: center;
    > div {
        min-width: 300px;
        max-width: 700px;
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    svg {
        height: 30px;
        width: auto;
        fill: ${(props) => props.theme.dark};
    }
`;

const SplashSection = styled.section`
    position: relative;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Arial, Helvetica, sans-serif;
    background-color: ${(props) => props.theme.white};
    > div {
        height: 70%;
        min-width: 300px;
        max-width: 700px;
        width: 80%;
        border-radius: 6px;
        color: ${(props) => props.theme.accent};
        background-color: ${(props) => props.theme.white};
        box-shadow: 0 0 6px 0;
        &:hover {
            color: ${(props) => props.theme.main};
            box-shadow: 0 0 6px 2px;
        }
    }
`;
