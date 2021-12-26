import { connect, styled } from "frontity";
import Straps from "./strap/images/straps.png"
import Link from "./link";
import { BandContainer } from "./styles/bandeau"
import {asIntersect, getStringIntersect} from "./helper"
import {ListedRegionTags,ListedRegionTagsLitteral,ListedEventSitesTags,ListedEventSitesTagsLitteral} from "./config_tag"


const WrapPostTitle = ({state, post,libraries, index, resultF }) => { 
    const Html2React = libraries.html2react.Component;
    const RegionLitteral =(asIntersect(post.tags, ListedRegionTags )? 
    getStringIntersect(post.tags,ListedRegionTags,ListedRegionTagsLitteral) :null );
    const SiteExecLitteral = (asIntersect(post.tags, ListedEventSitesTags )? 
    getStringIntersect(post.tags,ListedEventSitesTags,ListedEventSitesTagsLitteral) :null );
    console.log('RegionLitteral',RegionLitteral,'SiteExecLitteral',SiteExecLitteral );
       // if (!media) return null;

    // const srcset =
    //     Object.values(media.media_details.sizes)
    //         // Get the url and width of each size.
    //         .map((item) => [item.source_url, item.width])
    //         // Recude them to a string with the format required by `srcset`.
    //         .reduce(
    //             (final, current, index, array) =>
    //                 final.concat(
    //                     `${current.join(" ")}w${index !== array.length - 1 ? ", " : ""}`
    //                 ),
    //             ""
    //         ) || null;
    
    // const aVar= {decode(state.source[data.taxonomy][data.id].name)};
    return (
        <Link link={post.link}>
            <BandContainer className={`${resultF[5][index]} `}>
                <div className={`Image`}>
                    <div className="OverlayT1"> {(((resultF[1][index]) == 1)) ? (((resultF[0][index]) == 1) ? <span >Regions of the Month</span> : (RegionLitteral?RegionLitteral:null)) : (SiteExecLitteral?SiteExecLitteral:null)}</div>
                    
                <div className="TitleT3">  {(((resultF[1][index]) == 1)) ? (((resultF[0][index]) == 0) ? <Html2React html={post.title.rendered} /> : <Html2React html={post.title.rendered} />) : <Html2React html={post.title.rendered} /> }</div>
                <div className="OverlayT2">  
                    {((resultF[0][index]) != 0) ? <span></span> : ((resultF[4][index]!=0)? [(resultF[6][index])] :"Ispra Site") }
                    </div>
                </div>
            </BandContainer>
        </Link>
    );
};

export default connect(WrapPostTitle);
