import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import {
    AiFillPlusCircle,
    AiOutlinePlusCircle,
    AiOutlineSearch,
    AiFillHome,
    AiOutlineHome,
    AiFillMessage,
    AiOutlineMessage,
} from "react-icons/ai";
import { Footer, NavItem, PlainLink, Header } from "./StyledComponents";
import { UserContext } from "./Application";
import { UserPhoto } from "./User/UserExports";

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
