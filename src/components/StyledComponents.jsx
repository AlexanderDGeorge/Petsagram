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
    border-bottom: 1px solid var(--accent);
    font-size: 14px;
    text-decoration: none;
    text-align: center;
`;

export const Wrapper = styled.div`
    height: 92%;
    width: 100%;
    max-width: 700px;
    padding: 2%;
    display: flex;
    overflow-y: scroll;
    align-self: center;
    grid-area: content;
`;

export const Header = styled.header`
    height: 8%;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.accent};
    background-color: white;
    display: flex;
    justify-content: center;
    font-size: 1.5em;
    div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        max-width: 700px;
        width: 100%;
    }
    footer {
        border: none;
        width: 20%;
    }
`;

export const Footer = styled.footer`
    height: 8%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid ${(props) => props.theme.accent};
    background-color: white;
    svg {
        height: 25px;
        width: auto;
    }
`;

export const HorizontalSpacedDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const HorizontalListItem = styled.div`
    width: 100%;
    padding: 2%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${(props) => props.theme.accent};
`;

export const InputBox = styled.input`
    background-color: ${(props) => props.theme.light};
    padding: 5px 10px;
    border: ${(props) => `1px solid ${props.theme.mid}`};
    font-size: 1.2em;
    border-radius: 6px;
`;

export const NavItem = styled(Link)`
    margin: 2%;
`;

export const PlainLink = styled(Link)`
    text-decoration: none;
    display: flex;
    align-items: center;
    &:hover {
        text-decoration: underline;
    }
`;

export const PlainButton = styled.button`
    min-width: 75px;
    padding: 10px;
    border: 1px solid ${(props) => props.theme.accent};
    border-radius: 6px;
    &:hover {
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
        background-color: ${(props) => props.theme.main};
        box-shadow: 0 0 5px 0;
    }
`;
