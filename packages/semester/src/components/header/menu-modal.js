import React from "react";
import { styled, connect } from "frontity";
import Link from "../link"; 
const MenuModal = ({ state }) => {
  const { menu } = state.theme;
  const isThereLinks = menu != null && menu.length > 0;

  return (
    <>
      <MenuOverlay />
      <MenuContent as="nav">
        {isThereLinks &&
          menu.map(([name, link]) => (
            <MenuLink
              key={name}
              link={link}
              aria-current={state.router.link === link ? "page" : undefined}
            >
              {name}
            </MenuLink>
          ))}
      </MenuContent>
    </>
  );
};

const MenuOverlay = styled.div`
  background-color: #d7daf4;
  width: 100%;
  height: 100%;
  overflow: hidden auto;
  position: absolute;
  z-index: 2;
  top: 0;
  left: 0;
`;

const MenuContent = styled.div`
z-index: 3;
width: 100%;
position: absolute; 
background-image: url('https://fr-semester.eu/wp-content/uploads/2021/11/logo_FS.png'); 
background-repeat: no-repeat;
background-position: center;
background-size: contain;
margin-left:-1%;
@media (min-width: 600px) {
  margin-left:-2%;
  }
@media (min-width: 1620px) {
  margin-left:-3%;
  }
@media (min-width: 1720px) {
  margin-left:-5%;
  }
  @media (min-width: 1820px) {
    margin-left:-7%;
    }
  @media (min-width: 1880px) {
  margin-left:-9%;
  }
  @media (min-width: 1920px) {
    margin-left:-11%;
    }
  `;


const MenuLink = styled(Link)`
  width: 100%;
  outline: 0;
  font-size: 32px;
  text-align: center;
  padding: 2.6rem 0;
  color:black;
    display: block;
    position: relative;
    z-index: 999;
    transition: all 0.3s ease 0s;
  &:hover,
  &:focus {
    color:var(--warning);
    background-color:   #fcfcfc;;
  }
  /* styles for active link */
  &[aria-current="page"] { 
    font-weight: bold;
    font-color:var(--warning)
  }
`;

export default connect(MenuModal);
