import { connect, styled } from "frontity";
import Straps from "./strap/images/straps.png"
import Link from "./link";
import { BandContainer, StyledDiv } from "./styles/bandeau"
import {asIntersect, getStringIntersect} from "./helper"
import {ListedRegionTags,ListedRegionTagsLitteral,ListedEventSitesTags,ListedEventSitesTagsLitteral, FranceT} from "./config_tag"


const WrapPostTitle = ({state, post, libraries, index, resultF , startIndex}) => { 
    const indexRef = index + (startIndex?startIndex: 0);
    const Html2React = libraries.html2react.Component;
    var RegionTempLitteral =(asIntersect(post.tags, ListedRegionTags )? 
    getStringIntersect(post.tags,ListedRegionTags,ListedRegionTagsLitteral) :null );
    const SiteExecLitteral = (asIntersect(post.categories, ListedEventSitesTags )? 
    getStringIntersect(post.categories,ListedEventSitesTags,ListedEventSitesTagsLitteral) :null );
    const RegionLitteral = (SiteExecLitteral? RegionTempLitteral  :RegionTempLitteral); 
    //SiteExecLitteral : RegionTempLitteral 
    console.log('Region',RegionLitteral,'SiteExec',SiteExecLitteral );
    return (
        <Link className={''} link={post.link}>
            <BandContainer className={`${resultF[5][indexRef]} `}>
                <div className={`Image`}>
                    <div className="OverlayT1"> {(((resultF[1][indexRef]) == 1)) ? (((resultF[0][indexRef]) == 1) ? <span >Regions of the Month</span> : (RegionLitteral?RegionLitteral:<span> . </span> )) : (SiteExecLitteral?SiteExecLitteral:<span >France</span> )}</div>
                    
                <div className="TitleT3">  {(((resultF[1][indexRef]) == 1)) ? (((resultF[0][indexRef]) == 0) ? <Html2React html={post.title.rendered} /> : <Html2React html={post.title.rendered} />) : <Html2React html={post.title.rendered} /> }</div>
                <div className="OverlayT2">  
                    {((resultF[0][indexRef]) != 0) ? <span></span> : ((resultF[4][indexRef]!=0)? [(resultF[6][indexRef])] :SiteExecLitteral) }
                    </div>
                </div>
            </BandContainer>
        </Link>
    );
};

export default connect(WrapPostTitle);
