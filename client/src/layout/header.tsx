import React from 'react'
import styled from 'styled-components'
import logo2 from '../assets/shortURL.png'
const MainDiv = styled.div`
position: fixed;
box-sizing: border-box;
text-align: center;
width: 100%;
padding: 6px;
padding-left: 20px;
color: black;
font-weight: bold;
padding-right: 20px;
z-index: 10;
background: #dbdbdb59;
`
const LogoDiv = styled.div`
display: flex;
    float: left;
    flex-direction: column;
`

export const Header = () =>{
    return (<MainDiv>
        <LogoDiv >
<img style={{ height: '70px', width:'auto'}} src={logo2} alt="logo" />

        </LogoDiv>
        <div style={{fontSize: '66px'}}>URL SHORTNER</div>
    </MainDiv>)
} 