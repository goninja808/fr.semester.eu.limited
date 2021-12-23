import React from "react";
import { connect } from "frontity";
import MenuItemDepl from "./menuItemDepl";
import { MenuOverlay, MenuContent } from './styles'

const MenuModal = ({ state }) => {
  const { menu } = state.theme;
  const isThereLinks = menu != null && menu.length > 0;
  //console.log('test'+isThereLinks)
  return (
    <>
      <MenuOverlay />
      <MenuContent as="nav">
        {isThereLinks && menu.map(([name, link]) => (
           <MenuItemDepl name={name} link={link}/>
        ))}
        {/*TODO : add logic bootstrap submenu if contain '>' {(name.contains('>')) ? MenuLink : SubMenuLink}; */} 
      </MenuContent>

    </>
  );
};


export default connect(MenuModal);
