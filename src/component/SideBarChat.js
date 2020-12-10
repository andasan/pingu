import React, { useEffect, useState } from "react";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import * as timeago from "timeago.js";
import styled from "styled-components";

import { setChat } from "../features/chatSlice";
import { db } from "../firebase/firebase";

const SidebarChat = ({ id, chatName }) => {
  const dispatch = useDispatch();
  const [chatInfo, setChatInfo] = useState([]);

  useEffect(() => {
    db.collection("chats")
      .doc(id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setChatInfo(snapshot.docs.map((doc) => doc.data()))
      );
  }, [id]);

  return (
    <SidebarChatContainer
      onClick={() =>
        dispatch(
          setChat({
            chatId: id,
            chatName: chatName,
          })
        )
      }
    >
      <Avatar src={chatInfo[0]?.photo} />
      <SidebarChatInfoContainer>
        <h3>{chatName}</h3>
        <p>{chatInfo[0]?.message}</p>
        <TimeStamp>
          {timeago.format(new Date(chatInfo[0]?.timestamp?.toDate()))}
        </TimeStamp>
      </SidebarChatInfoContainer>
    </SidebarChatContainer>
  );
};

export default SidebarChat;

const SidebarChatContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid lightgray;
  cursor: pointer;

  :hover {
    background-color: #3e93fd;
    color: white;
  }
`;

const SidebarChatInfoContainer = styled.div`
  margin-left: 15px;
  position: relative;
  width: 100%;
`;

const TimeStamp = styled.small`
  position: absolute;
  top: 5px;
  right: 0;
`;
