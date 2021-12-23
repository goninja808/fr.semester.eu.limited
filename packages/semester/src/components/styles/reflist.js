import { connect, styled } from "frontity";


export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
`



export const CalendarWrap = styled.div`
  display: flex;
`

export const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 8px;
  background-color: #fff;
  color: #444;  
  min-width: 400px;
  margin: 0 auto;
  padding-right: 8px;
  padding-left: 8px;
  list-style: none;
  @media (max-width: 800px) {
    display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
  background-color: #fff;
  color: #444;  
  min-width: 400px;
  margin: 0 auto;
  padding-right: 10px;
  padding-left: 10px;
  list-style: none;
}
`;


export const CategoryGP = styled.article`
max-width:771px;
margin:0 auto;
position: relative;
.divider {
  margin-top: 1rem;
  margin-bottom: 1rem;
  border: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
}

/**Job articles**/
&.count0{
       visibility: hidden;
       display: none;
     }
&.newscategory {
  max-width: 100%;
  margin: 0;
  margin-bottom: 1 rem;
  display: flex;
  flex-direction: column;
  .categorybox {
    padding: 2rem;
    background: var(--grey);
    box-shadow: 0px 2px 16px -9px rgba(0,0,0,0.5);
    border: 1px solid #ececec;
    border-radius:5px;
    transition: all .4s ease;
    display: flex;
    flex-grow: 1;      
    flex-direction: column;
    .articletitle {
      text-decoration:none;
      h4 {
        transition: all .3s ease;
      }        
      &:hover {
        h4 {
          color:var(--brand);
        }          
      }
    }
  }
}
`;


