import { connect, styled } from "frontity";
import Straps from "./strap/images/straps.png"
import Link from "./link";
import { BandContainer } from "./styles/bandeau"
import {asIntersect, getStringIntersect} from "./helper"
import {ListedRegionTags,ListedRegionTagsLitteral,ListedEventSitesTags,ListedEventSitesTagsLitteral, FranceT} from "./config_tag"


const WrapPostTitle = ({state, post, libraries, index, resultF }) => { 
    const Html2React = libraries.html2react.Component;
    var RegionTempLitteral =(asIntersect(post.tags, ListedRegionTags )? 
    getStringIntersect(post.tags,ListedRegionTags,ListedRegionTagsLitteral) :null );
    const SiteExecLitteral = (asIntersect(post.categories, ListedEventSitesTags )? 
    getStringIntersect(post.categories,ListedEventSitesTags,ListedEventSitesTagsLitteral) :null );
    const RegionLitteral = SiteExecLitteral? RegionTempLitteral  :RegionTempLitteral; //SiteExecLitteral : RegionTempLitteral 
    console.log('Region',RegionLitteral,'SiteExec',SiteExecLitteral );
    return (
        <Link link={post.link}>
            <BandContainer className={`${resultF[5][index]} `}>
                <div className={`Image`}>
                    <div className="OverlayT1"> {(((resultF[1][index]) == 1)) ? (((resultF[0][index]) == 1) ? <span >Regions of the Month</span> : (RegionLitteral?RegionLitteral:<span> . </span> )) : (SiteExecLitteral?SiteExecLitteral:<span >France</span> )}</div>
                    
                <div className="TitleT3">  {(((resultF[1][index]) == 1)) ? (((resultF[0][index]) == 0) ? <Html2React html={post.title.rendered} /> : <Html2React html={post.title.rendered} />) : <Html2React html={post.title.rendered} /> }</div>
                <div className="OverlayT2">  
                    {((resultF[0][index]) != 0) ? <span></span> : ((resultF[4][index]!=0)? [(resultF[6][index])] :SiteExecLitteral) }
                    </div>
                </div>
            </BandContainer>
        </Link>
    );
};

export default connect(WrapPostTitle);
