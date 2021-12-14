import {useEffect, useRef } from "react";
import { connect, styled } from "frontity";
import Link from "./link"; 
import HeaderMedia from "./header-media";
import { getEventInPeriod, getFacts } from "./helper";    
import {eventCategory} from "./config"
import Switch from "@frontity/components/switch"; 
import React,{useState} from "react"
import { Calendar, DateObject} from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import colors from "react-multi-date-picker/plugins/colors";
import post from "./post";

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
const PerCatTagPeriodPost = ({ state, actions, libraries, period }) => {
  // Get current URL related information 
  const data = state.source.get(state.router.link);
  // Get dynamic inicial list (event / fact main pages)
  const resultEventInPeriod = getEventInPeriod(state.source, period);
  var resultDateObjectInPeriod = [];
  var countEventCategory = resultEventInPeriod.length;
  const categColor=["grey","grey","yellow","pink","blue","green"]
  for (let i = 0; i < countEventCategory; i++) {
    var element = resultEventInPeriod[i]
    var inPeriodEvents = element.dateprefix;
    var category = element.category;
    if (inPeriodEvents.length>0){
      inPeriodEvents.forEach(eventDate=>
        {
          var aday = new DateObject(eventDate);
          aday.color = categColor[i];
          resultDateObjectInPeriod.push(aday);
        }
        )
    }
  };
  const eventDatesref = resultDateObjectInPeriod;

  const resultFact = getFacts(state.source);
  const onlyFact = resultFact.filter(item => (((item.category.name != "header")) && ((item.category.name != "Events"))))
  
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
         <Container when={state.router.link=='/category/events/'}>
            <CategoryGP className='GroupCategory col-12 align-self-strech' >
                <div className="GroupCategory-box col-md-12">
                <Calendar  />
                </div>
            </CategoryGP>

            { resultEventInPeriod.map(({ posts, category, isNotHeader }, index) => (
            <CategoryGP key={index} className={`GroupCategory col-12 align-self-strech  count${posts.length}`} >
              <HeadingGroupCategory  className={`${category.slug} `}>  <Illust src={`/static/images/${category.slug}_picto.png`} title={category.link}/> {category.name}</HeadingGroupCategory>
                <div className="GroupCategory-box col-md-12">
                 {posts.map((post, index) => (
                  <article key={index}>
                    <div>
                        <div px={2}>
                         {  <Link link={post.link}>
                            <h2>
                           <Html2React html={post.title.rendered} /> 
                            </h2>
                          </Link> }
                          { !(isNotHeader) ? <HeaderMedia id={post.featured_media} /> : null}
                          <Html2React html={post.excerpt.rendered} />
                        </div>
                      
                    </div>
                  </article>
                  ))}
                  </div>
                  {isNotHeader?(<Link link={category.link}>See more <strong>{category.name}</strong> related posts</Link>):null}
            </CategoryGP>
          ))
         }
           </Container>
           <Container when={state.router.link=='/main-events/'}>
            <CategoryGP className='GroupCategory col-12 align-self-strech' >
                <div className="GroupCategory-box col-md-12">
                <Calendar relativePosition='top-center'
                 numberOfMonths={1} 
                 disableMonthPicker="true"
                 disableYearPicker="true"
                 displayWeekNumbers="true"
                 minDate={`${new  DateObject("01/"+String(period).substring(4,6)+"/2022")}`}
                 value={eventDatesref}           
                  plugins={[
                  <DatePanel sort="color" markFocused/>,
                  ]} />
                </div>
            </CategoryGP>
            { resultEventInPeriod.map(({ posts, category, isNotHeader, dateprefix }, index) => (
            <CategoryGP key={index} className={`GroupCategory col-12 align-self-strech  count${posts.length}`} >
              {/*(category != "Events") && <HeadingGroupCategory  className={`${category.slug} `}>  <Illust src={`/static/images/${category.slug}_picto.png`} title={category.link}/> {category.name}</HeadingGroupCategory>*/}
                <div className="GroupCategory-box col-md-12">
                 {posts.map((post, index) => (
                  <article key={index}>
                    <div>
                        <div px={2}>
                         {  <Link link={post.link}>
                            <h2>
                           <Html2React html={post.title.rendered} /> 
                            </h2>
                          </Link> }
                          <p>{post.acf.dateexec.substring(6,8)+"/"+post.acf.dateexec.substring(4,6)+"/2022"}</p>
                          { !(isNotHeader) ? <HeaderMedia id={post.featured_media} /> : null}
                          <Html2React html={post.excerpt.rendered} />
                        </div>
                      
                    </div>
                  </article>
                  ))}
                  </div>
                  {isNotHeader?(<Link link={category.link}>See more <strong>{category.name}</strong> related posts</Link>):null}
            </CategoryGP>
          ))
         }
           </Container>
           <Container when={state.router.link=='/main-facts/'}>
            { onlyFact.map(({ posts, category, isNotHeader }, index) => (
            <CategoryGP key={index} className={`GroupCategory col-12 align-self-strech  count${posts.length}`} >
              <HeadingGroupCategory  className={`${category.slug} `}>  <Illust src={`/static/images/${category.slug}_picto.png`} title={category.link}/> {category.name}</HeadingGroupCategory>
                <div className="GroupCategory-box col-md-12">
                 {posts.map((post, index) => (
                  <article key={index}>
                    <div>
                        <div px={2}>
                         {  <Link link={post.link}>
                            <h2>
                           <Html2React html={post.title.rendered} /> 
                            </h2>
                          </Link> }
                          { !(isNotHeader) ? <HeaderMedia id={post.featured_media} /> : null}
                          <Html2React html={post.excerpt.rendered} />
                        </div>
                      
                    </div>
                  </article>
                  ))}
                  </div>
                  {isNotHeader?<Link link={category.link}>
                  <p>&gt;&gt; See more <strong>{category.name}</strong> related posts </p>
                </Link>:null}
            </CategoryGP>
          ))
         }
         </Container>
         </Switch>
    </FlexContainer>
  ) : null;
};

export default connect(PerCatTagPeriodPost);
const FlexContainer = styled.div`
  display: flex;
`
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
 

const CategoryGP = styled.article`
max-width:771px;
margin:0 auto;
position: relative;
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
