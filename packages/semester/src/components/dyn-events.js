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
import { Container, CategoryGP, CalendarWrap, FactCategoryWrap } from "./styles/reflist"
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import FormControl from 'react-bootstrap/FormControl';
import Dropdown from 'react-bootstrap/Dropdown';
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




const PerCatTagPeriodEvents = ({ state, actions, libraries, period, tagId, categ }) => {
  // Get current URL related information 
  const data = state.source.get(state.router.link);


  const [props, setProps] = useState({
    other: period,
    category: (categ == 'all' ? ['culture', 'lifestyle', 'science', 'initiative'] : [categ]),
    value: new Date(),
    format: "DD-MM-20YYYY",
    onChange: (date) => {
      update(state.source, props.other);
    },
  });
  update(state.source, props.other);

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
  // Get the html2react component.
  const Html2React = libraries.html2react.Component;





  /**
   * Once the post has loaded in the DOM, prefetch both the
   * home posts and the list component so if the user visits
   * the home page, everything is ready and it loads instantly.
   */

  // Load the post, but only if the data is ready.

  return (data.isReady ? 
    <FlexContainer>
      <FactCategoryWrap>
        <div className="BlockDatePick">
          &nbsp;
          <DropdownButton variant="outline-primary" id="dropdown-item-button" title="period (coming months)">
            <Dropdown.Item className="DatePick" href="#" onClick={() => { actions.router.set("/events/202201/"); location.reload() }} >January &nbsp;</Dropdown.Item>
            <Dropdown.Item className="DatePick" href="#" onClick={() => { actions.router.set("/events/202202/"); location.reload() }}>February &nbsp;</Dropdown.Item>
            <Dropdown.Item className="DatePick" href="#" onClick={() => { actions.router.set("/events/202203/"); location.reload() }}>March &nbsp;</Dropdown.Item>
          </DropdownButton>
        </div>
      </FactCategoryWrap>
      <Container>
        {resultEventInPeriod.map(({ posts, category, isNotHeader, dateprefix, resultF }, index) => (
          <CategoryGP {...props} key={index} className={`GroupCategory col-12 align-self-strech  count${posts.length}`} >
            {index == 1 ? <CalendarWrap>
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
            </CalendarWrap> : null}
            <div className="divider" />
            {(index >= 1) && (posts.length > 0) ? <>
              <div className={`${String(category.name).replace(" ", "") + "_p"}`} >  {(category.id === eventsC) ? eventAlternateLitteral : category.name} </div>
              <div className="GroupCategory col-md-12">
                {posts.map((post, index2) => (
                  <article key={index2} >
                    <div>
                      <div px={2} hidden={(index == 1) && ((asIntersect(post.categories, awSpAny)))}>
                        <WrapPostTitle state={state} post={post} libraries={libraries} index={index2} resultF={resultF} />
                        <DateWrapper>{post.acf.dateexec.substring(6, 8) + "/" + post.acf.dateexec.substring(4, 6) + "/2022 " +
                          post.acf.timeexec.substring(0, 5)}</DateWrapper>
                        <Html2React html={post.excerpt.rendered} />
                      </div>
                    </div>
                  </article>
                ))}
                {(index >= 2) &&
                <Link link={category.link}> more {(category.id === eventsC) ? eventAlternateLitteral : category.name}  related posts (Facts + Events). </Link>
                }              
                </div>
            </> : <span />}

          </CategoryGP>
        ))
        }
      </Container >
    </FlexContainer >
  : null );
};

export default connect(PerCatTagPeriodEvents);


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
