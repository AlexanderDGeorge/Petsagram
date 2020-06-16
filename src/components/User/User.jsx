import React, { useContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../Application";
import { IoIosCog } from "react-icons/io";
import Modal from "../Modal";
import { getUserDoc, getExactUser, createMessageGroup } from "../../firebase";
import UserPosts from "./UserPosts";
import { UserListItem, UserFollowButton, UserPhoto } from "./UserExports";
import { PlainButton, rotate, VerticalWrapper } from "../StyledComponents";
import { UserMenu } from "./Settings/UserSettings";

const UserHeader = styled.div`
    display: grid;
    width: 100%;
    padding: 2%;
    background-color: ${(props) => props.theme.light};
    @media screen and (max-width: 600px) {
        grid-template-columns: 100px 10% auto;
        grid-template-rows: 50px 50px 10px 50px 50px;
        grid-template-areas:
            "UserPhoto . UserName"
            "UserPhoto . UserButtons"
            ". . ."
            "UserBio UserBio UserBio"
            "UserStats UserStats UserStats";
    }

    @media screen and (min-width: 601px) {
        grid-template-columns: 200px 10% auto;
        grid-template-rows: 50px 50px 50px 50px;
        grid-template-areas:
            "UserPhoto . UserName"
            "UserPhoto . UserButtons"
            "UserPhoto . UserBio"
            "UserPhoto . UserStats";
    }
`;

const UserName = styled.div`
    display: flex;
    align-items: center;
    grid-area: UserName;
    > p {
        font-size: 1.5em;
    }
    > svg {
        height: 1.5em;
        width: auto;
        margin-left: 20px;
        cursor: pointer;
        &:hover {
            animation: ${rotate} 2s linear infinite;
        }
    }
`;

const UserButtons = styled.div`
    display: flex;
    align-items: center;
    grid-area: UserButtons;
    > button {
        margin-right: 20px;
    }
`;

const UserBio = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    grid-area: UserBio;
`;

const UserStats = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-area: UserStats;
    > div {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
`;

export function User() {
    const { currentUser } = useContext(UserContext);
    const [user, setUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState(null);
    const location = useLocation();

    useEffect(() => {
        (async function fetchUser() {
            const userDoc = await getExactUser(location.pathname.slice(6));
            setUser(userDoc[0]);
            document.title = userDoc[0].fullname;
        })();
    }, [location]);

    function handleMessage() {}

    if (user) {
        return (
            <VerticalWrapper>
                <UserHeader>
                    <UserPhoto photo={user.photoURL} size={"100%"} />
                    <UserName>
                        <p>{user.username}</p>
                        {currentUser.uid === user.uid ? (
                            <IoIosCog
                                onClick={() => {
                                    setContent(<UserMenu />);
                                    setOpen(true);
                                }}
                            />
                        ) : null}
                    </UserName>
                    {currentUser.uid !== user.uid ? (
                        <UserButtons>
                            <PlainButton onClick={handleMessage}>
                                Message
                            </PlainButton>
                            <UserFollowButton user={user} />
                        </UserButtons>
                    ) : null}
                    <UserBio>
                        <p>{user.fullname}</p>
                        <p>{user.bio}</p>
                    </UserBio>
                    <UserStats>
                        <div>
                            <p>{user.posts.length}</p>
                            <p>posts</p>
                        </div>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setContent(<UserFollowers user={user} />);
                                setOpen(true);
                            }}
                        >
                            <p>{user.followers.length}</p>
                            <p>followers</p>
                        </div>
                        <div
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                                setContent(<UserFollowing user={user} />);
                                setOpen(true);
                            }}
                        >
                            <p>{user.following.length}</p>
                            <p>following</p>
                        </div>
                    </UserStats>
                </UserHeader>
                <UserPosts user={user} />
                {open ? <Modal setOpen={setOpen} content={content} /> : null}
            </VerticalWrapper>
        );
    } else return null;
}

function UserFollowing({ user }) {
    const [following, setFollowing] = useState([]);

    useEffect(() => {
        user.following.forEach((followee) => {
            getUserDoc(followee).then((res) => {
                setFollowing((following) => [...following, res]);
            });
        });
    }, [user]);

    return (
        <div id="UserFollowing">
            {following.map((followee, i) => {
                return <UserListItem user={followee} key={i} />;
            })}
        </div>
    );
}

function UserFollowers({ user }) {
    const [followers, setFollowers] = useState([]);

    useEffect(() => {
        user.followers.forEach((follower) => {
            getUserDoc(follower).then((res) => {
                setFollowers((followers) => [...followers, res]);
            });
        });
    }, [user]);

    return (
        <div id="UserFollowing">
            {followers.map((follower, i) => {
                return <UserListItem user={follower} key={i} />;
            })}
        </div>
    );
}
