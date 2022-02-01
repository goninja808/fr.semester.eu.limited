
import { connect, styled } from "frontity";
import Link from "../link";

export const StyledDiv = styled(Link)`
    width: 100%;
    text-align: center;
    color: white;
`;


export const BandContainer = styled.div`
  position: relative;
  max-width: 1000px; 
  height:58px;
  background: 
  url('https://fr-semester.blog/wp-content/uploads/2022/01/straps.png') no-repeat;
  padding: 5px;
  line-height: 1.5rem;

  Link{
    width: 100%;
    text-align: center;
    color: cornsilk;
  }

 
  &.b100{
    background-position-y:0px;
  }
  &.b000{
    background-position-y:-58px;
  }
  &.b010{
    background-position-y:-58px;
  }
  &.b001{
    background-position-y:-406px;
  }
  &.b011{
    background-position-y:-116px;
  }
  &.b002{
    background-position-y:-464px;
  }
  &.b012{
    background-position-y:-174px;
  }
  &.b003{
    background-position-y:-522px;
  }
  &.b013{
    background-position-y:-232px;
  }  
  &.b004
  {
    background-position-y:-580px;
  }
  &.b014{
    background-position-y:-290px;
  }
  .image {
    object-fit: cover;
    }
  .OverlayT1 {
    color: #b7dad9;
    line-height: 0.91rem;
    position: relative;
    display: block;
    text-align: center;
    margin-top:-1px;
    font-size:small;
    margin-left: 69px;
    font-size:small;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .OverlayT2 {
    color: #abbdc8;
    line-height: 0.9rem;
    position: relative;
    display: block;
    text-align: left;
    padding-bottom: 4px;
    padding-top: 2px;
    padding-left: 30px;
    font-size:small;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .TitleT3 {
    line-height: 0.95rem ;
    text-indent: 31px;
    color: #ffffff;
    text-shadow: 1px 1px 5px black;
    font-size:medium;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    
  }
`;