import React from "react";
import { styled, connect, Global } from "frontity";
import { CloseIcon, HamburgerIcon } from "./menu-icon";
import { MenuToggle } from "./styles"
import MenuModal from "./menu-modal";

function MobileMenu({ state, actions }) {
  const { isMobileMenuOpen } = state.theme;
  return (
    <>
      <MenuToggle onClick={actions.theme.toggleMobileMenu}>
        {isMobileMenuOpen ? (
          <>
            {/* Add some style to the body when menu is open,
            to prevent body scroll */}
            <Global styles={{ body: { overflowY: "hidden" } }} />
            <CloseIcon color="white" size="34px" />
          </>
        ) : (
          <HamburgerIcon color="white" size="34px" />
        )}
      </MenuToggle>
      { (isMobileMenuOpen) && <MenuModal state={state}/>
      }
    </>
  );

}

export default connect(MobileMenu);
