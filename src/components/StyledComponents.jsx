import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

export const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const Menu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const MenuItem = styled.button`
    height: 50px;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.accent};
    font-size: 14px;
    text-decoration: none;
    text-align: center;
`;

export const VerticalWrapper = styled.div`
    height: 92%;
    width: 100%;
    max-width: 700px;
    padding: 2%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
    align-self: center;
    background-color: ${(props) => props.theme.light};
`;

export const HorizontalWrapper = styled.div`
    height: 92%;
    width: 100%;
    max-width: 700px;
    padding: 2%;
    display: flex;
    overflow-y: scroll;
    align-self: center;
    background-color: ${(props) => props.theme.light};
`;

export const CenteredWrapper = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.light};
`;

export const AuthWrapper = styled.div`
    min-width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.white};
    padding: 5%;
    border-radius: 6px;
    > * {
        width: 100%;
        font-size: 1.1em;
        margin: 5px 0;
    }
`;

export const HorizontalListItem = styled.div`
    width: 100%;
    padding: 2%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${(props) => props.theme.accent};
    text-align: center;
`;

export const InputBox = styled.input`
    background-color: ${(props) => props.theme.white};
    padding: 5px 10px;
    border: ${(props) => `1px solid ${props.theme.mid}`};
    border-radius: 6px;
    &:hover {
        transition: all 0s linear;
        box-shadow: 0 0 5px 0;
    }
`;

export const PlainLink = styled(Link)`
    text-decoration: none;
    display: flex;
    align-items: center;
    &:hover {
        transition: all 0s linear;
        text-decoration: underline;
    }
`;

export const PlainButton = styled.button`
    min-width: 75px;
    padding: 10px;
    border: 1px solid ${(props) => props.theme.accent};
    border-radius: 6px;
    &:hover {
        transition: all 0s linear;
        box-shadow: 0 0 5px 0;
    }
`;

export const ColorButton = styled.button`
    min-width: 75px;
    padding: 10px;
    border: 1px solid ${(props) => props.theme.accent};
    background-color: ${(props) => props.theme.lightmain};
    color: white;
    border-radius: 6px;
    &:hover {
        transition: all 0s linear;
        background-color: ${(props) => props.theme.darkmain};
        box-shadow: 0 0 5px 0;
    }
`;

export const UserSettingsWrapper = styled.section`
    height: 100%;
    width: 72%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2%;
    position: relative;
`;

export const EditArea = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 50px;
    width: 100%;
    margin-bottom: 2%;

    > div:first-child {
        width: 30%;
        margin-right: 2%;
        text-align: end;
    }

    > *:nth-child(2) {
        height: 100%;
        width: 70%;
        font-size: 1.2em;
        > label {
            cursor: pointer;
            &:hover {
                text-decoration: underline;
            }
        }
    }

    > span {
        height: auto !important;
        padding: 10px;
    }
`;
