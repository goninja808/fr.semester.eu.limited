import React from "react";
import { connect, styled } from "frontity";
import Link from "../link";

 
// simplest form (only email)


const Footer = ({ state }) => {
  // const options = state.source.get("acf-options-page");
  return (
    <>
      <Container>
        <div className="row">
          <div className="col-12 col-lg-6 footer-widget widget-one">
            <h6 className="widget-title">About this Web Site</h6>
            <p> From 1 January 2022 France takes over the Presidency of the Council of the European Union for six months. French colleagues at the Joint Research Centre (JRC) in Ispra / Geel / Brussel want to celebrate the presidency of the Cultural Semester.</p> 
          </div>
          <div className="col-12 col-md-4 col-lg-2 footer-widget widget-two">
            <h6 className="widget-title">Semester organisation</h6>
            <ul className="widget-list">
              <li><Link className="widget-list-link" link="/about/">About us</Link></li> 
              <li><Link className="widget-list-link" link="/contact/">Contact</Link></li>
            </ul>
          </div>
          <div className="col-12 col-md-4 col-lg-2 footer-widget widget-three">
            <h6 className="widget-title">Redactional Team</h6>
            <ul className="widget-list">
              <li><Link className="widget-list-link" link="/about/">About us</Link></li> 
            </ul>
          </div>
          <div className="col-12 col-md-4 col-lg-2 footer-widget widget-four">
            <h6 className="widget-title">Connect</h6>
            <ul className="widget-list">
            <li><Link className="widget-list-link" target="_blank" rel="nofollow noopener" link="https://webgate.ec.europa.eu/connected/news">Connected</Link></li>
            <li><Link className="widget-list-link" target="_blank" rel="nofollow noopener" link="https://www.facebook.com/CulturalSemesterIspra/">Facebook</Link></li>
            </ul>
          </div>
        </div>
        
      </Container>
    </>
  );
};

// Connect the Header component to get access to the `state` in it's `props`
export default connect(Footer);

const Container = styled.footer`   
  display: flex;
  width:100%;
  max-width:1200px;
  justify-content:center;
  margin: 0 auto;
  padding-top:4rem;
  padding-bottom:4rem;
  padding-right: 15px;
  padding-left: 15px;
  color:var(--white);
  .footer-widget {
    margin-bottom:1rem;
    .widget-title {
      color:var(--white);
      margin-bottom:1.2rem;
    }
    p {
      font-size:1rem;
    }
    .widget-list {
      list-style:none;
      padding-left:0;
      li {
        margin-bottom:0.5rem;
        .widget-list-link {
          text-decoration:none;
          transition: all 0.3s ease;
          color:var(--white);
          &:hover {
            color:var(--black);
          }
        }
      }
    }
  }
  .widget-one {
    p {
      @media (min-width: 992px) {
        padding-right:8rem;
      }
    }
  }
}
`;
