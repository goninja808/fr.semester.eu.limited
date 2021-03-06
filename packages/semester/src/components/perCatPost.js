import { connect, styled } from "frontity";
import { React, useState, useEffect, useRef } from "react";
  
import { getPostsGroupedByCategoryAndTag, getEventsForRegionPeriod } from "./helper";
import Link from "./link";
import { Calendar, DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import colors from "react-multi-date-picker/plugins/colors";
import post from "./post"; 
import WrapPostTitle from "./wrapPostTitle"
import {FlexContainer, Container ,CategoryGP ,CalendarWrap, PostCount, GroupCategory} from "./styles/reflist"
import CarouselAsync from "./carouselasync.js";
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
const PerCatPost = ({ state, actions, libraries, tagId, period }) => {
  // Get information about the current URL.
  const data = state.source.get(state.router.link);
  const postsPerCategory = getPostsGroupedByCategoryAndTag(state.source, tagId);
  // Get the html2react component.
  const Html2React = libraries.html2react.Component;

  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */
  // Get dynamic inicial list (event / fact main pages)
  const resultEventInPeriod = getEventsForRegionPeriod(state.source, tagId, period);
  var resultDateObjectInPeriod = [];
  var countEventCategory = resultEventInPeriod.length;
  const categColor = ["grey", "grey", "yellow", "pink", "blue", "green"]
  // let sortedResultEventInPeriod = Object.entries(resultEventInPeriod)
  // .sort(([k1, v1], [k2, v2]) => v1.eventDate - v2.eventDate)
  // .map(([player, scores]) => ({player, scores}))


  for (let i = 0; i < countEventCategory; i++) {
    var element = resultEventInPeriod[i]
    var inPeriodEvents = element.dateprefix;
    if (inPeriodEvents.length > 0) {
      inPeriodEvents.forEach(eventDate => {
        var aday = new DateObject(eventDate);
        aday.color = categColor[i];
        resultDateObjectInPeriod.push(aday);
      }
      )
    }
  };
  const eventDatesref = resultDateObjectInPeriod;

  // Load the post, but only if the data is ready.

  return data.isReady ? (
    <FlexContainer>
     

      <Container>
        {postsPerCategory.map(({ posts, category, isNotHeader, resultF }, index) => (
          
          <CategoryGP key={index} className="GroupCategory col-12 align-self-strech">
            {isNotHeader ? <><div class="divider"></div> <div className={`${String(category.name).replace(" ","")+ "_p"}`} > {category.name}</div>   </>
             : <span />}
                       <span><p/></span>
            <div className="GroupCategory col-md-12">
              {posts.map((post, index) => (
                <article key={index}>

                  <div>
                    <div px={2}>
                    <WrapPostTitle state={state} post={post}  libraries={libraries} index={index} resultF={resultF} />
                     
                     
                      {!(isNotHeader) ?
                      <CarouselAsync state={state} initMedia={post.featured_media} preMedia={post.acf.vimeo_intro} postMedia={post.acf.vimeo_conclude}/> : <span />}
                      <Html2React html={post.excerpt.rendered} />
                    </div>

                  </div>
                </article>
              ))}
            </div>
            <p />
            {posts.length == 0 ? <p><span />No Region Related {category.name} this month.</p> : null}
            {isNotHeader && (resultF[1][index]!=0)  ? <Link link={category.link}>
              <p>&gt;&gt; Other <strong>{category.name}</strong> related posts (Facts + Events). </p>
            </Link> : <span />}
          </CategoryGP>
        ))
        }
      </Container>
    </FlexContainer>
  ) : null;
};

export default connect(PerCatPost);


