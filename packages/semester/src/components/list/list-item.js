import { connect, styled } from "frontity";
import Link from "../link";
import FeaturedMedia from "../featured-media";
import Image from "@frontity/components/image";
import WrapPostTitle from "../wrapPostTitle";
/**
 * Item Component
 *
 * It renders the preview of a blog post. Each blog post contains
 * - Title: clickable title of the post
 * - Author: name of author and published date
 * - FeaturedMedia: the featured image/video of the post
 */
const Item = ({ state, libraries, resultF, item , index}) => {
  const data = state.source.get(state.router.link);
  const author = state.source.author[item.author];
  const date = new Date(item.date); 

  
  return (
    
    <Article className="GroupCategory col-12 align-self-strech">
      {/* console.log(resultF)  <div className="articlebox col-md-12"> */}
       
        <WrapPostTitle state={state} post={item}  libraries={libraries} index={index} resultF={resultF} /> 
      {state.theme.featured.showOnList && (
        <FeaturedMedia id={item.featured_media} />
      )}
      {item.excerpt && (
        <Excerpt dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }} />
      )}
      {/* </div> */}
    </Article>
  );
};

// Connect the Item to gain access to `state` as a prop
export default connect(Item);
const Article = styled.article`
max-width:771px;
margin:0 auto;
position: relative;
/**Job articles**/
&.newsarticle {
  max-width: 100%;
  margin: 0;
  margin-bottom: 1 rem;
  display: flex;
  flex-direction: column;
  .articlebox {
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
  /**Job articles**/
  
const Title = styled.h1`
  font-size: 1.7rem;
  margin-bottom:1.5rem;
  color: var(--black);
  box-sizing: border-box;
  transition: all .3s ease;
`;

const Illust = styled.img`
  box-sizing: before;
  display: flex;
  border-radius: 5px;
  margin-right: 25px; 
  height: 60px;
  width: auto;
  `;

const Excerpt = styled.div`
  line-height: 1.6em;
  color: rgba(12, 17, 43, 0.8);
`;
