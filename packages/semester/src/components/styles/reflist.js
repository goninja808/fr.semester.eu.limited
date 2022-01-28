import { connect, styled } from "frontity";


export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`

export const PostCount = styled.div`
justify-content: left;
`

export const GroupCategory = styled.div`
background-color: #fff;
`

export const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0.3em;
  background-color: #fff;
  color: #444;  
  min-width: 400px;
  margin: 0 auto; 
  list-style: none;
  @media (max-width: 350px) {
    min-width: 280px;
    grid-gap: 0em; 
    grid-template-columns: repeat(1, 1fr); 
    
    padding-left:21px;
  }  
  @media (max-width: 410px) {
    min-width: 280px;
    grid-gap: 0em; 
    grid-template-columns: repeat(1, 1fr); 
    padding: 0 -10px;
  }  
  @media (max-width: 800px) {
    min-width: 360px;
    grid-gap: 0.2em;
    grid-template-columns: repeat(1, 1fr); 
}
`;


export const CategoryGP = styled.article`
max-width:771px;
margin:0 auto;
position: relative;
.divider {
  margin-top: 0.4rem;
  margin-bottom: 0.4rem;
  border: 0;
  border-top: 1px solid #a7a7a7;
}
&.count0{
       visibility: hidden;
       display: none;
}

&.noDisplay{
  visibility: hidden;
  display: none;
}
.carousel,
.carousel-inner { 
  height : 230px;
  width : 320px;
}

.carousel img {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 250px;
  max-width: 360px;
}
.Culture_p{
  color: #ffcc02;
  text-align: center;
}
.Initiative_p{
  color: #813d9c;
  text-align: center;
}
.LifeStyle_p{
  color: #669901;
  text-align: center;
}
.Science_p{
  color: #cc0000;
  text-align: center;
}   
.Events_p{
  color: #3366cc;
  text-align: center;
}
.Groupcategory {
  max-width: 100%; 
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  display: flex;
  flex-direction: column;
  background-color: #fff2cc;
  
}
`;

export const CalendarWrap = styled.div`
.BlockDatePick{
  text-align: left;
}
.DatePick{
  background-color: #ffe69d;
  border: 0 ;
  font-size: small;
  box-shadow: inset -6px -2px 0px 0px #dedaca;
}


.rmdp-right{
  visibility: hidden;
} 
.rmdp-shadow{
  box-shadow: 0 0 5px #ffffff;
}
.rmdp-left{
  visibility: hidden; 
}
@media (max-width: 350px) {
  .rmdp-panel{
    visibility: hidden; 
    min-width: 60px;
  }  
  .DatePick{ 
    border: 0 ;
    font-size: x-small;
    box-shadow: inset -2px -2px 0px 0px #dedaca;\
    padding-left:2px;
  }
}  

`;

export const FactCategoryWrap = styled.div`
.BlockFactPick{
  text-align: left;
  margin-left: 15px;
}
.dropdown-toggle{
  border: 0 ;
  font-size: small;
}
.FactPick{
  border: 0 ;
  font-size: x-small;
  box-shadow: inset -6px -2px 0px 0px #dedaca;
}
.Culture_b{
  background-color: #ffcc02;
  text-align: center;
}
.Initiative_b{
  background-color: #813d9c;
  text-align: center;
}
.LifeStyle_b{
  background-color: #669901;
  text-align: center;
}
.Science_b{
  background-color: #cc0000;
  text-align: center;
}   
 


.rmdp-right{
  visibility: hidden;
} 
.rmdp-shadow{
  box-shadow: 0 0 5px #ffffff;
}
.rmdp-left{
  visibility: hidden; 
}
@media (max-width: 350px) {
  .rmdp-panel{
    visibility: hidden; 
    min-width: 60px;
  }  
  .BlockDatePick{ 
    border: 0 ;
  font-size: x-small;
  box-shadow: inset -2px -2px 0px 0px #dedaca;
  }
  padding-left:5px;
}  

`;
