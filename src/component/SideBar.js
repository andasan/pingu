import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@material-ui/core";
import { RateReviewOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectUser } from "../features/userSlice";
import SideBarChat from "./SideBarChat";
import { auth, db } from "../firebase/firebase";

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  const addChat = () => {
    const chatName = prompt("please enter a chat name");
    if (chatName) {
      db.collection("chats").add({
        chatName: chatName,
      });
    }
  };

  return (
    <SidebarContainer>
      <SidebarHeader>
        <SidebarAvatar src={user.photo} onClick={() => auth.signOut()} />
        <SidebarTitle>
          {/* <Search /> */}
          {user.displayName}
        </SidebarTitle>
        <IconButton
          varient="outlined"
          onClick={addChat}
          className="sidebar__inputButton"
        >
          <RateReviewOutlined />
        </IconButton>
      </SidebarHeader>
      <SidebarChats>
        {chats.map(({ id, data: { chatName } }) => (
          <SideBarChat key={id} id={id} chatName={chatName} />
        ))}
      </SidebarChats>
    </SidebarContainer>
  );
};

export default Sidebar;

const SidebarContainer = styled.div`
  flex: 0.35;
  height: 100vh;
  flex-direction: column;
  background-color: #f5f5f5;
  border-right: 1px solid lightgray;
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  height: 50px;
`;

const SidebarAvatar = styled(Avatar)`
  cursor: pointer;
  margin: 10px;
`;

const SidebarTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  background-color: #e1e1e1;
  color: gray;
  border-radius: 5px;
`;

const SidebarChats = styled.div`
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkits-scrollbar {
    display: none;
  }
`;
