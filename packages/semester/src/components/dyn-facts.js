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
import DropdownButton from 'react-bootstrap/DropdownButton'; 
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

const PerCatTagFacts = ({ state, actions, libraries, period, tagId , categ}) => {
  // Get current URL related information 
  const data = state.source.get(state.router.link);

  const [props, setProps] = useState({
    category: (categ=='all'?['culture','lifestyle','science','initiative']:[categ])
  }); 
   
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
         <FactCategoryWrap> 
                  <div className="BlockFactPick">
                    &nbsp;
    <DropdownButton variant="outline-primary"   id="dropdown-item-button" title="Filter">
      <Dropdown.Item className="FactPick" href="#" onClick={() => {actions.router.set("/facts/all/"); location.reload()}} >Any &nbsp;</Dropdown.Item>
      <Dropdown.Item className="FactPick Culture_b"  href="#" onClick={() => { actions.router.set("/facts/culture/"); location.reload()  }} disabled={data.id!="all" && asIntersect(['culture'], props.category )}  href="#">Culture &nbsp;</Dropdown.Item>
      <Dropdown.Item className="FactPick LifeStyle_b" disabled={data.id!="all" && asIntersect(['lifestyle'], props.category )} onClick={() => { actions.router.set("/facts/lifestyle/"); location.reload() }}>Life Style  &nbsp;</Dropdown.Item>
      <Dropdown.Item className="FactPick Science_b" disabled={data.id!="all" && asIntersect(['science'], props.category )}  onClick={() => { actions.router.set("/facts/science/"); location.reload() }}>Science &nbsp;</Dropdown.Item>
      <Dropdown.Item className="FactPick Initiative_b" disabled={data.id!="all" && asIntersect(['initiative'], props.category )} onClick={() => { actions.router.set("/facts/initiative/"); location.reload() }}>Initiative &nbsp;</Dropdown.Item>
    </DropdownButton>
                    </div>
                </FactCategoryWrap>
        <Container > {/*--------  MAIN FACTS --------*/}
          {onlyFact.map(({ posts, category, isNotHeader, resultF }, index) => (

            <CategoryGP {...props} key={index} className={`GroupCategory col-12 align-self-strech  count${posts.length} ${asIntersect([category.slug], props.category )?' Display':' noDisplay'}`} >

              {isNotHeader && (asIntersect([category.slug], props.category )) ? <>
                
                <div className={`${String(category.name).replace(" ", "") + "_p"}`} > {category.name}</div>

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
                </div></>
                : <span /> }

              </CategoryGP>
        ))
        }
            </Container> 
    </FlexContainer >
  ) : null;
};
export default connect(PerCatTagFacts);

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
