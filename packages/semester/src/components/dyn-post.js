import React, { useEffect, useRef, useState } from "react";
import { connect, styled } from "frontity";
import Link from "./link";
import HeaderMedia from "./header-media";
import { getEventInPeriod, getFacts, asIntersect, getStringIntersect } from "./helper"
import { eventCategory, eventsC } from "./config"
import Switch from "@frontity/components/switch";
import { Calendar, DateObject } from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import Settings from "react-multi-date-picker/plugins/settings"
import colors from "react-multi-date-picker/plugins/colors";
import post from "./post";
import { awSpAny } from "./config";
import WrapPostTitle from "./wrapPostTitle";
import { Container, CategoryGP, CalendarWrap } from "./styles/reflist"

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




const PerCatTagPeriodPost = ({ state, actions, libraries, period, tagId }) => {
  // Get current URL related information 
  const data = state.source.get(state.router.link);


  const [props, setProps] = useState({
    other: period,
    value: new Date(),
    format: "DD-MM-20YYYY",
    onChange: (date) => {
      update(state.source, props.other);
    },
  });

  // Get dynamic inicial list (event / fact main pages)

  /*   function CustomButton({ direction, handleClick, disabled }) {
      return (
        <i onClick={props.other =("20220"+parseInt(props.other.substring(5,6))+(direction=='<'?1:-1))}
           style={{
           padding: "0 10px",
           color: disabled ? "gray" : "blue"
          }}
          className={disabled ? "cursor-default" : "cursor-pointer"}
        >
          {direction === "right" ? ">" : "<"}
        </i>
      )
    } */
  const categColor = ["teal", "blue", "yellow", "green", "red", "purple"]

  var resultEventInPeriod = getEventInPeriod(state.source, props.other);
  var eventDatesref = updateresultDateObject(resultEventInPeriod);
  function update(source, other) {
    resultEventInPeriod = getEventInPeriod(source, other);
    console.log(source, other, resultEventInPeriod.length);
  }


  function updateresultDateObject(resultEventInPeriod) {
    var resultDateObject = [];
    for (let i = 0; i < resultEventInPeriod.length; i++) {
      var element = resultEventInPeriod[i]
      //if (asIntersect(element.categories, awSpAny)) continue;
      var inPeriodEvents = element.dateprefix;
      var category = element.category;
      if (inPeriodEvents.length > 0) {
        for (let i2 = 0; i2 < inPeriodEvents.length; i2++) {
          var eventDate = inPeriodEvents[i2];
          var hasCateg = asIntersect(element.posts[i2].categories, awSpAny);
          var aday = new DateObject(eventDate);
          aday.color = categColor[i];
          if (i == 1 && !hasCateg) { resultDateObject.push(aday); }
          if (i != 1 && hasCateg) { resultDateObject.push(aday); }
        }
      }  
    }
  
  return resultDateObject;
}

const eventAlternateLitteral = "'on-site' and Unclassified Events";
/* relative to facts */
const resultFact = getFacts(state.source, tagId);
const onlyFact = resultFact.filter(item => (((item.category.id != "header")) && ((item.category.name != "Events"))))
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
      <Container when={data.isEvents}> {/* EVENTS */}
        <CategoryGP className='GroupCategory col-12 align-self-strech' >

          <div className="GroupCategory col-md-12">
            <CalendarWrap>
              <div className="BlockDatePick">
                &nbsp;
                <button className="DatePick" onClick={() => { actions.router.set("/events/202201/"); location.reload() }}>January</button>
                <button className="DatePick" onClick={() => { actions.router.set("/events/202202/"); location.reload() }}>February</button>
                <button className="DatePick" onClick={() => { actions.router.set("/events/202203/"); location.reload() }}>March</button>
                <button className="DatePick" onClick={() => { actions.router.set("/events/202204/"); location.reload() }}>April</button>
                <button className="DatePick" onClick={() => { actions.router.set("/events/202205/"); location.reload() }}>May</button>
                <button className="DatePick" onClick={() => { actions.router.set("/events/202206/"); location.reload() }}>June</button> 
              </div>

              <Calendar relativePosition='top-center'
                {...props}
                onPropsChange={setProps}
                numberOfMonths={1}
                readOnly
                disableMonthPicker={true}
                disableYearPicker={true}
                displayWeekNumbers={true}
                minDate={`${new DateObject("01/" + String(period).substring(4, 6) + "/2022")}`}
                value={eventDatesref}
                // renderButton={<CustomButton />}
                plugins={[
                  <DatePanel sort="date" markFocused removeButton={false} />,
                ]} />

            </CalendarWrap>
          </div>
        </CategoryGP>
        {resultEventInPeriod.map(({ posts, category, isNotHeader, dateprefix, resultF }, index) => (

          <CategoryGP {...props} key={index} className={`GroupCategory col-12 align-self-strech  count${posts.length}`} >
            {isNotHeader ? <>
              <div className="divider" />
              <div className={`${String(category.name).replace(" ", "") + "_p"}`} >  {(category.id === eventsC) ? eventAlternateLitteral : category.name} </div>  </> : <span />}
            <div className="GroupCategory col-md-12">
              {posts.map((post, index2) => (
                <article key={index2} >
                  <div>
                    <div px={2} hidden={(index == 1) && ((asIntersect(post.categories, awSpAny)))}>
                      <WrapPostTitle state={state} post={post} libraries={libraries} index={index2} resultF={resultF} />
                      <DateWrapper>{post.acf.dateexec.substring(6, 8) + "/" + post.acf.dateexec.substring(4, 6) + "/2022 " + post.acf.timeexec.substring(0, 5)}</DateWrapper>
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
            {isNotHeader ? <>
              <div className="divider" />
              <div className={`${String(category.name).replace(" ", "") + "_p"}`} > {category.name}</div>  </> : <span />}

            <div className="GroupCategory col-md-12">
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
  max-width: 93px;
  border-radius: 14px;
  font-size:11px;
  line-height:12px;
  text-align:center;
  margin-left: 5px;
  background-color: #cfb8b8;
`;

const HeadingCategory = styled.div`
  font-size: 28px;
  padding-left: 15px;
  p: 
  &.header_p{
    background-color: white;
    display: none;
  }  
  &.Events_p{
    background-color: white;
    display: none;
  }  
  
`;
