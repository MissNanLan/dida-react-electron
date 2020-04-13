import styled from 'styled-components';


export const NavWrapper = styled.div `
    position: fixed;
    right: 0;
    left: 0;
    z-index: 99;
    display: flex;
    justify-content: space-between;
    height: 68px;
    line-height: 68px;
    background-color: #fff;
    padding: 0 40px;
    box-shadow: 0 2px 8px #f0f1f2;
    .logo{
       width: 64px;
       height: 50px;
    }
   .title{
        font-size: 2rem;
        color: #262626;
    }
    .menu{
        display: inline-table;
    }
`;