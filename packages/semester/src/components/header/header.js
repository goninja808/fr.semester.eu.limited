import React from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import Nav from "./nav";
import MobileMenu from "./menu";

const Header = ({ state }) => {
  return (
    <>
      <BrandContainer>
      <Logo/>
      <MobileMenu />
      </BrandContainer>
      <Nav />
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Header);

const BrandContainer = styled.div`
  box-sizing: border-box;
  color: var(--brand);
  width: 100%;
  align: left;
  @media (min-width: 768px) {
    display: flex;
    width: auto;
  }
`;

const Title = styled.div`
  margin: 0;
  font-size: 18px;
  span {
    font-weight:200;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color:var(--brand);
  transition: all 0.3s ease;
  &:hover {
    color:var(--black);
  }
`;

const Logo = styled.button` 
  cursor: pointer;  
  border: white;
  box-sizing: border-box;
  
  display: flex;
  border-radius: 5px;
  margin-right: 5px;    
  
  background-position: left center;
  background-repeat: no-repeat;
  background-attachment: initial;
  background-color: white;
  background-size: 90px;
  width: 92px;
  height: 72px;
  background-position-y: 1px;
  background-image: url('https://fr-semester.eu/wp-content/uploads/2021/11/logo_FS-150x150.png');
  @media (min-width: 768px) {
  width: 170px;
  height: 170px;
  background-size: 160px; 
  background-image: url('https://fr-semester.eu/wp-content/uploads/2021/11/logo_FS-300x300.png');
  }
`;
