import React from "react";
import { connect, styled } from "frontity";
import Link from "../link";
import Nav from "./nav";
import MobileMenu from "./menu";

const Header = ({ state }) => {
  return (
    <>
      <BrandContainer>
      <Link link="/" >
      <Logo />
          </Link>
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
  width: 50%;
  right: -6%;
  @media (min-width: 768px) {
    display: flex;
    width: 30%;
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

const Logo = styled.div` 
  cursor: pointer;  
  display: flex;
  background-position: left center;
  background-repeat: no-repeat;
  background-attachment: initial;
  background-size: 133px;
  width: 130px;
  height: 135px; 
  background-image: url('https://fr-semester.blog/wp-content/uploads/2021/12/LogoM.png');
  @media (min-width: 768px) {
  width: 160px;
  height: 171px;
  background-size: 170px; 
  background-image: url('https://fr-semester.blog/wp-content/uploads/2021/12/LogoM.png');
  }
`;
