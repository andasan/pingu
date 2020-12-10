import React from 'react'
import styled from 'styled-components';

import SideBar from './SideBar';
import Chat from './Chat';

const Main = () => {
    return (
        <MainContainer>
            <SideBar />
            <Chat />
        </MainContainer>
    )
}

export default Main;

const MainContainer = styled.div`
    display: flex;
`;
