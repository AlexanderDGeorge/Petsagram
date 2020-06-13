import React, { useContext } from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";
import {
    AiFillPlusCircle,
    AiOutlinePlusCircle,
    AiOutlineSearch,
    AiFillHome,
    AiOutlineHome,
    AiFillMessage,
    AiOutlineMessage,
} from "react-icons/ai";
import { PlainLink } from "./StyledComponents";
import { UserContext } from "./Application";
import { UserPhoto } from "./User/UserExports";

const Header = styled.header`
    height: 8%;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.accent};
    background-color: ${(props) => props.theme.white};
    display: flex;
    justify-content: center;
    font-size: 1.5em;
    div {
        max-width: 700px;
        width: 100%;
        padding: 2%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    footer {
        border: none;
        width: 30%;
    }
`;

const Footer = styled.footer`
    height: 8%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid ${(props) => props.theme.accent};
    background-color: ${(props) => props.theme.white};
    svg {
        height: 25px;
        width: auto;
    }
`;

export const NavItem = styled(Link)`
    height: 25px;
    margin: 2%;
    background-color: transparent;
`;

export default function Nav() {
    if (window.innerWidth <= 600) {
        return <NavItems />;
    } else {
        return (
            <Header>
                <div>
                    <PlainLink to="/">Pet Feed</PlainLink>
                    <NavItems />
                </div>
            </Header>
        );
    }
}

function NavItems() {
    const { currentUser } = useContext(UserContext);
    const pathname = useLocation().pathname;
    return (
        <Footer>
            <NavItem to="/">
                {pathname === "/" ? <AiFillHome /> : <AiOutlineHome />}
            </NavItem>
            <NavItem to="/search">
                <AiOutlineSearch
                    style={pathname === "/search" ? { strokeWidth: 50 } : {}}
                />
            </NavItem>
            <NavItem to="/post/add">
                {pathname === "/post/add" ? (
                    <AiFillPlusCircle />
                ) : (
                    <AiOutlinePlusCircle />
                )}
            </NavItem>
            <NavItem to="/messages">
                {pathname === "/messages" ? (
                    <AiFillMessage />
                ) : (
                    <AiOutlineMessage />
                )}
            </NavItem>
            <NavItem to={`/user/${currentUser.username}`}>
                <UserPhoto photo={currentUser.photoURL} />
            </NavItem>
        </Footer>
    );
}
