import React,{ useEffect, useRef, useState } from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import HeaderMedia from "./header-media";
import { getEventInPeriod, getFacts , asIntersect, getStringIntersect} from "./helper"
import { eventCategory, eventsC } from "./config"
import Switch from "@frontity/components/switch"; 
import { Calendar, DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import Settings from "react-multi-date-picker/plugins/settings"
import colors from "react-multi-date-picker/plugins/colors";
import post from "./post";
import {awSpAny} from "./config";
import WrapPostTitle from "./wrapPostTitle";
import { Container, CategoryGP } from "./styles/reflist"

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
const PerCatTagPeriodPost = ({ state, actions, libraries, period, resultF }) => {
  // Get current URL related information 
  const data = state.source.get(state.router.link);
  // Get dynamic inicial list (event / fact main pages)
  const resultEventInPeriod = getEventInPeriod(state.source, period);
  var resultDateObjectInPeriod = [];
  var countEventCategory = resultEventInPeriod.length;
  
  const categColor = ["teal", "blue", "yellow", "green", "red", "purple"]
  
  for (let i = 0; i < countEventCategory; i++) {
    var element = resultEventInPeriod[i]
    var inPeriodEvents = element.dateprefix;
    var category = element.category;
    if (inPeriodEvents.length > 0) {
      inPeriodEvents.forEach(eventDate => {
        var aday = new DateObject(eventDate);
        aday.color = categColor[i];
        resultDateObjectInPeriod.push(aday);
      }
      )
    }
  };
  const eventAlternateLitteral = "'on-site' and Unclassified Events";
  const eventDatesref = resultDateObjectInPeriod;c
  const resultFact = getFacts(state.source);
  const onlyFact = resultFact.filter(item => (((item.category.id != "header")) && ((item.category.name != "Events"))))
  const initialProps = { 
    value: new Date(), 
    format: "DD/MM/YYYY", 
  }
  const [props, setProps] = useState(initialProps)

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
        <Container when={state.router.link == '/category/events/'}> {/* EVENTS */}
        <CategoryGP className='GroupCategory col-12 align-self-strech' >

<div className="GroupCategory-box col-md-12">
  <Calendar relativePosition='top-center'
  {...props}
  onPropsChange={setProps}
    numberOfMonths={1}
    
    disableMonthPicker={true}
    disableYearPicker={true}
    displayWeekNumbers={true}
    minDate={`${new DateObject("01/" + String(period).substring(4, 6) + "/2022")}`}
    value={eventDatesref}
    plugins={[
      <DatePanel sort="date" markFocused  removeButton={false}/>,
    ]} />
</div>
</CategoryGP>
{resultEventInPeriod.map(({ posts, category, isNotHeader, dateprefix, resultF }, index) => (

<CategoryGP key={index} className={`GroupCategory col-12 align-self-strech  count${posts.length}`} >
  {isNotHeader ? <><div class="divider"></div><p>{(category.id === eventsC) ? eventAlternateLitteral : category.name} </p> </>
    : <span />}
  <div className="GroupCategory-box col-md-12">
    {posts.map((post, index2) => (
      <article key={index2} >
        <div>
          <div px={2} hidden={(index==1) && ((asIntersect(post.categories, awSpAny)))}>
            <WrapPostTitle state={state} post={post} libraries={libraries} index={index2} resultF={resultF} />
            <DateWrapper>{post.acf.dateexec.substring(6, 8) + "/" + post.acf.dateexec.substring(4, 6) + "/2022"}</DateWrapper>
            {!(isNotHeader) ? <HeaderMedia id={post.featured_media} /> : null}
            <Html2React html={post.excerpt.rendered} />
          </div>

        </div>
      </article>
    ))}
  </div>
  {isNotHeader ? (<Link link={category.link}>See more {(category.id === eventsC) ? eventAlternateLitteral : category.name}  related posts</Link>) : null}
</CategoryGP>
))
}
        </Container>
       
        <Container when={state.router.link == '/main-facts/'}> {/*--------  MAIN FACTS --------*/}

          {onlyFact.map(({ posts, category, isNotHeader, resultF }, index) => (

            <CategoryGP key={index} className={`GroupCategory col-12 align-self-strech  count${posts.length}`} >
              {isNotHeader ? <><div class="divider"></div> <p>{category.name}</p>  </> : <span />}
              <div className="GroupCategory-box col-md-12">
                {posts.map((post, index) => (
                  <article key={index}>
                    <div>
                      <div px={2}>
                        <WrapPostTitle state={state} post={post} libraries={libraries} index={index} resultF={resultF} />
                        {!(isNotHeader) ? <HeaderMedia id={post.featured_media} /> : null}
                        <Html2React html={post.excerpt.rendered} />
                      </div>

                    </div>
                  </article>
                ))}
              </div>

            </CategoryGP>

          ))
          }
        </Container>
      </Switch>
    </FlexContainer >
  ) : null;
};

export default connect(PerCatTagPeriodPost);
const FlexContainer = styled.div`
  
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

const DateWrapper = styled.p`
  max-width: 63px;
  border-radius: 14px;
  font-size:11px;
  line-height:12px;
  text-align:center;
  margin-left: 5px;
  background-color: #cfb8b8;
`;

// const Container = styled.section`
//   display: grid;
//   grid-template-columns: repeat(2, 1fr);
//   grid-gap: 8px;
//   background-color: #fff;
//   color: #444;  
//   min-width: 400px;
//   margin: 0 auto;
//   padding-right: 8px;
//   padding-left: 8px;
//   list-style: none;
//   @media (max-width: 800px) {
//     display: grid;
//   grid-template-columns: repeat(1, 1fr);
//   grid-gap: 10px;
//   background-color: #fff;
//   color: #444;  
//   min-width: 400px;
//   margin: 0 auto;
//   padding-right: 10px;
//   padding-left: 10px;
//   list-style: none;
// }
// `;

// const HeadGroupCategory = styled.article`
//   max-width:771px;
//   margin:0 auto;
//   position: relative;
//   margin-bottom:3.5rem;
//   .article-title {    
//     &:hover {
//       h1 {
//         color:var(--brand);
//       }
//     }
//   }
// `;


// const CategoryGP = styled.article`
// max-width:771px;
// margin:0 auto;
// position: relative;
// /**Job articles**/
// &.count0{
//   visibility: hidden;
//   display: none;
// }
// &.newscategory {
//   max-width: 100%;
//   margin: 0;
//   margin-bottom: 1 rem;
//   display: flex;
//   flex-direction: column;
//   .categorybox {
//     padding: 2rem;
//     background: var(--grey);
//     box-shadow: 0px 2px 16px -9px rgba(0,0,0,0.5);
//     border: 1px solid #ececec;
//     border-radius:5px;
//     transition: all .4s ease;
//     display: flex;
//     flex-grow: 1;      
//     flex-direction: column;
//     .articletitle {
//       text-decoration:none;
//       h4 {
//         transition: all .3s ease;
//       }        
//       &:hover {
//         h4 {
//           color:var(--brand);
//         }          
//       }
//     }
//   }
// }
// `;

// const Header = styled.h3`
//   text-align:left;
//   margin-bottom:1rem;
//   margin-left:1rem;
// `;

// const HeadingGroupCategory = styled.h2`
//   font-size: 60px;
//   padding: 5px;
//   &.header{
//     background-color: white;
//     display: none;
//   }  
//   &.culture{
//     background-color: #fff2cc;
//   }
//   &.initiative{
//     background-color: #f4cccc;
//   }
//   &.lifestyle{
//     background-color: #cfe2f3;
//   }
//   &.science{
//     background-color: #d9ead3;
//   }
// `
