import React from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import {NavContainer} from "./styles";
import NavItem from "./navItem";

/**
 * Navigation Component
 *
 * It renders the navigation links
 */
const Nav = ({ state }) => (
  <NavContainer>
    {state.theme.menu.map(([name, link]) => {
      // Check if the link matched the current page url
      const isCurrentPage = state.router.link === link;
      return (
        <NavItem key={name} name={name} link={link} isCurrent={isCurrentPage} />
      );
    })}
  </NavContainer>
);

export default connect(Nav);


