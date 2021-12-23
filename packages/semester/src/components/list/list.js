import React,{useEffect} from "react";
import { connect, styled, decode } from "frontity";
import Item from "./list-item";
import Pagination from "./pagination";
import {getResultF} from "../helper/index";

const is2Column=true;
const List = ({ state, actions, libraries }) => {
  // Get the data of the current list.
  const data = state.source.get(state.router.link);
  const resultF = getResultF(data.items, state);
  let title = 'Recent Facts / Events';
  return (
    <FlexContainer> 
          <Container>
          <HeadArticle className="NewsArticle-article col-12 col-md-6 col-lg-4 align-self-strech">
        <div className="NewsArticle-box col-md-12"> 
                    {/* If the list is a blog posts, we render a title. */}
      {data.isPostArchive && (
        <Header>
          {title} dass
        </Header>
      )}
       
      {/* If the list is a taxonomy, we render a title. */}
      {data.isTaxonomy && (
        <Header>
          {" "}
          <b>{decode(state.source[data.taxonomy][data.id].name)}</b> 
        </Header>
      )}

      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
      </div>
       </HeadArticle>
          

      {/* Iterate over the items of the list. */}
      {data.items.map(({ type, id }, index) => {
        const item = state.source[type][id];
        // Render one Item component for each one.
        return <Item state={state} library={libraries} resultF={resultF} item={item} index={index}/>;
      })}
      <Pagination />
    </Container> 
    </FlexContainer> 
  );
};

export default connect(List);
const FlexContainer = styled.div`
  display: flex;
`

const HeadArticle = styled.article`
  max-width:771px;
  margin:0 auto;
  position: relative;
  margin-bottom:3.5rem;
  .article-title {    
    &:hover {
      h1 {
        color:var(--brand);
      }
    }
  }
`;
const Container = styled.section`
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

const Header = styled.h3`
  text-align:left;
  margin-bottom:1rem;
  margin-left:1rem;
`;