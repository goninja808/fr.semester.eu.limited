import { React, useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player/lazy";
import { connect, styled } from "frontity";
import Link from "./link";
import HeaderMedia from "./header-media";
import { getFactsForRegion, getEventsForRegion, getFacts, getHeaders } from "./helper";
import { headerC } from "./config"
import Switch from "@frontity/components/switch";
import WrapPostTitle from "./wrapPostTitle";
import { ListedRegionTags } from "./config_tag"; 
import {FlexContainer, Container ,CategoryGP ,CalendarWrap, PostCount, GroupCategory} from "./styles/reflist"


/**
 * The Post component that Mars uses to render any kind of "post type", like
 * posts, pages, attachments, etc.
 *
 * It doesn't receive any prop but the Frontity store, which it receives from
 * {@link connect}. The current Frontity state is used to know which post type
 * should be rendered.
 *
 * @param props - The Frontity store (state, actions, and libraries).
 *
 * @example
 * ```js
 * <Switch>
 *   <Post when={data.isPostType} />
 * </Switch>
 * ```
 *
 * @returns The {@link Post} element rendered.
 */
const PerSemiStaticPost = ({ state, actions, libraries, tagId }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  const resultEvent = getEventsForRegion(state.source, tagId);
  const resultFactNoRegion = getFacts(state.source);
  const resultFact = getFactsForRegion(state.source, tagId);
  const headersAll = getHeaders(state.source); 
  // Get the html2react component.
  const Html2React = libraries.html2react.Component;


  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  // Load the post, but only if the data is ready.

  return data.isReady ? (
    <FlexContainer>
      <Switch>
        

        <Container when={state.router.link == '/'}>

       
          {[headersAll[1]].map(({ posts, resultF }, index) => (
            <CategoryGP key={index} className={`GroupCategory col-12 align-self-strech count${posts.length}`} >
                <div className="GroupCategory col-md-12">
                  {posts.map((post, index) => (<article key={index} hidden={(!(post.tags.length==0))} >
                  <p/> <p> <h2>{post.title.rendered}</h2></p>
                    {post.acf.vimeo_intro?
                       <ReactPlayer url={post.acf.vimeo_intro}
                        playing={true} autoPlay={true}
                        loop={true} muted={true} width='100%'  
                        config={{
                          youtube: {
                            playerVars: { showinfo: 1 ,}
                          },
                          vimeo:{
                            playerOptions: {quality: '360p',}
                          },
                          file: {
                            attributes: {controlsList: "nofullscreen",},                          },
                        }}
                        />   :null}
                      <div>
                        <div px={2}>
                         
                          <Html2React html={post.content.rendered} />
                        </div>
                      </div>
                       {post.acf.vimeo_conclude?<ReactPlayer url={post.acf.vimeo_conclude}
                        playing={true} autoPlay={true}   
                        loop={true} muted={true} width='100%'  
                                          
                        config={{
                          file: {
                            attributes: {
                              controlsList: "nofullscreen",
                            },
                          },
                        }}/>    :null}
                         </article>
                  ))
                  }
                </div>
            </CategoryGP>
          ))
          }
           {[headersAll[2]].map(({ posts, resultF }, index) => (
            <CategoryGP key={index} className={`GroupCategory col-12 align-self-strech  count${posts.length}`} >
              <br></br>
                <div className="GroupCategory col-md-12">
                  {posts.map((post, index) => (
                    <article key={index} hidden={(!(post.tags.includes(tagId)))} >
                      <div>
                        <div px={2}>
                          <WrapPostTitle state={state} post={post} libraries={libraries} index={index} resultF={resultF} />
                          {(post.tags.length  == 0) ?<HeaderMedia id={post.featured_media} />:null} 
                          <Html2React html={post.excerpt.rendered} />
                        </div>
                      </div>
                    </article>
                  ))
                  }
                </div>
            </CategoryGP>
          ))
          }

         
        </Container>

      </Switch>
    </FlexContainer>
  ) : null;
};

export default connect(PerSemiStaticPost);
 
const Illust = styled.img`
  max-width: 50px;
  border-radius: 25px;
  margin-right: 25px;
`;

const BigImage = styled.img`
  max-width: 320px;
  border-radius: 25px;
  margin-right: 25px;
`;


 

const HeadGroupCategory = styled.article`
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

 

const Header = styled.h3`
  text-align:left;
  margin-bottom:1rem;
  margin-left:1rem;
`;

const HeadingGroupCategory = styled.h2`
  font-size: 60px;
  padding: 5px;
  &.header{
    background-color: white;
    display: none;
  }  
  &.culture{
    background-color: #fff2cc;
  }
  &.initiative{
    background-color: #f4cccc;
  }
  &.lifestyle{
    background-color: #cfe2f3;
  }
  &.science{
    background-color: #d9ead3;
  }
`
