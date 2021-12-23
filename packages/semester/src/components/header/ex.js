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
  top: 41px;
  overflow: hidden auto;
  position: absolute;
  z-index: 3;
  left: 0;
`;

const MenuContent = styled.div`
z-index: 3;
width: 100%;
position: absolute; 
background-color: #d7daf4;
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
