import React, { useState } from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { FaGithub, FaLinkedin, FaLaptopCode } from "react-icons/fa";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";

export default function Splash() {
    const [flipped, setFlipped] = useState(true);

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
            config: { mass: 1, tension: 20, friction: 10 },
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
                    <h2>Petsagram</h2>
                    <IconDiv>
                        <FaGithub />
                        <FaLinkedin />
                        <FaLaptopCode />
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
        </SplashSection>
    );
}

const IconDiv = styled.div`
    height: 100%;
    width: 120px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > svg {
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
    box-shadow: 0 -1px 6px 0;
    color: ${(props) => props.theme.accent};
    &:hover {
        box-shadow: 0 2px 6px 0;
        color: ${(props) => props.theme.main};
    }
    > div {
        min-width: 300px;
        width: 50%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
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
        height: 50%;
        min-width: 300px;
        width: 50%;
        border-radius: 20px;
        color: ${(props) => props.theme.accent};
        background-color: ${(props) => props.theme.white};
        box-shadow: 0 0 6px 0;
        &:hover {
            color: ${(props) => props.theme.main};
            box-shadow: 0 0 6px 2px;
        }
    }
`;
