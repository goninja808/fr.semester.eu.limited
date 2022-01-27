import { styled } from "frontity";
import Link from '../link'

export const MenuToggle = styled.button`
  position: absolute;
  right: 24px;
  top: 40px;
  background: transparent;
  border: 0;
  color: var(--white);
  z-index: 5;
  height: 40px;
  width: 40px;
  display: none;
  outline:0;
  transition: all 0.3s ease;
  &:focus {
    outline:0;
  }
  .opensvg, .closesvg {
    transition: all 0.3s ease;
  }
  &:hover {
    .opensvg {
      color:var(--brand);
    }
    .closesvg {
      color:var(--white);
    }
  }
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

export const MenuOverlay = styled.div`
background-image: url('https://fr-semester.blog/wp-content/uploads/2022/01/menu.jpg');
  width: 100%;
  height: 100%;
  top: 41px;
  overflow: hidden auto;
  position: absolute;
  z-index: 3;
  left: 0;
`;

export const MenuContent = styled.div`
z-index: 3;
width: 100%;
position: absolute; 
  `;


export const MenuLink = styled(Link)`
  width: 100%;
  outline: 0;
  font-size: 22px;
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



export const NavContainer = styled.nav`
  list-style: none;
  display: flex;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0 24px;
  margin: 0;
  overflow-x: auto;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavItemSt = styled.div`
  padding: 0;
  margin: 0 10px;
  color: var(--brand);
  font-size: 0.9em;
  box-sizing: border-box;
  flex-shrink: 0;

  & > a {
    display: inline-block;
    line-height: 2em;
    color:var(--white);
    transition: all 0.3s ease;
    /* Use for semantic approach to style the current link */
    &[aria-current="page"] {
      color:var(--brand);
    }
    &:hover {
      color:var(--brand);
    }
  }

  &:first-of-type {
    margin-left: 0;
  }

  &:last-of-type {
    margin-right: 0;

    &:after {
      content: "";
      display: inline-block;
      width: 24px;
    }
  }
`;

