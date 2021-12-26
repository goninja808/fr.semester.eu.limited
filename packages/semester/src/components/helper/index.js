import {ListedCategory, culture, lifestyle, initiative, science,
  headerC, eventsC , awLifestyle, awCulture, awInitiative, awScience, awCultureLitteral, awLifestyleLitteral,awScienceLitteral,awInitiativeLitteral} from "../config"
import { MonthRegionTags, eventsT, ListedEventSitesTags, ListedRegionTags, ListedEventSitesTagsLitteral} from "../config_tag";
import list from "../list/list";
import Link from "@frontity/components/link";
const MAXIMUM_POSTS = 5
//console.log(process.env.INDEX_SEMESTER);

const getFactsFromCategoryAndTag = ({ post }, categoryId, tagId) =>
  Object.keys(post)
    .map(postID => post[postID])
    .filter(({ categories }) => categories.includes(parseInt(categoryId)))
    .filter(({ tags }) => tags.includes(tagId))
    .filter(({ tags }) => !(tags.includes(eventsT)))
    .filter(({ categories }) => !(categories.includes(headerC)))

export const getFactsForRegion = (source, tagId,) => {
  return Object.values(ListedCategory)
    .reduce((acc, categoryId) => {
      const posts = getFactsFromCategoryAndTag(source, categoryId, tagId).slice(0, MAXIMUM_POSTS)
      const category = source.category[categoryId]
      const isNotHeader = !(source.category[categoryId].slug === 'header')
      const resultF = getResultF(posts);
      
      return [...acc, { posts, category, isNotHeader , resultF}]
    }, [])
}

const getPostsFromCategoryAndTag = ({ post }, categoryId, tagId) =>
  Object.keys(post)
    .map(postID => post[postID])
    .filter(({ categories }) => categories.includes(parseInt(categoryId)))
    .filter(({ tags }) => tags.includes(tagId))

export const getPostsGroupedByCategoryAndTag = (source, tagId) => {
  return Object.values(ListedCategory)
    .reduce((acc, categoryId) => {
      const posts = getPostsFromCategoryAndTag(source, categoryId, tagId).slice(0, MAXIMUM_POSTS)
      const category = source.category[categoryId]
      const isNotHeader = !(source.category[categoryId].slug === 'header')
      const resultF = getResultF(posts);
 
      return [...acc, { posts, category, isNotHeader , resultF}]
    }, [])

}

const getEventsFromCategoryAndTag = ({ post }, categoryId, tagId) =>
  Object.keys(post)
    .map(postID => post[postID])
    .filter(({ categories }) => categories.includes(parseInt(categoryId)))
    .filter(({ tags }) => tags.includes(tagId))
    .filter(({ tags }) => tags.includes(eventsT))
  ;

export const getEventsForRegion = (source, tagId,) => {
  return Object.values(ListedCategory)
    .reduce((acc, categoryId) => {
      const posts = getEventsFromCategoryAndTag(source, categoryId, tagId).slice(0, MAXIMUM_POSTS)
      const category = source.category[categoryId]
      const isNotHeader = !(source.category[categoryId].slug === 'header')
      const resultF = getResultF(posts);

      return [...acc, { posts, category, isNotHeader , resultF}]
    }, [])
}


const getFactsFromCategory = ({ post }, categoryId) =>
  Object.keys(post)
    .map(postID => post[postID])
    .filter(({ categories }) => categories.includes(parseInt(categoryId)))
    .filter(({ tags }) => !(tags.includes(eventsT)))
    .filter(({ categories }) => !(categories.includes(headerC)))
  ;

export const getFacts = (source) => {
  return Object.values(ListedCategory)
    .reduce((acc, categoryId) => {
      const posts = getFactsFromCategory(source, categoryId).slice(0, MAXIMUM_POSTS)
      const category = source.category[categoryId]
      const isNotHeader = !(source.category[categoryId].slug === 'header')
      const resultF = getResultF(posts);

      return [...acc, { posts, category, isNotHeader , resultF}]
    }, [])
}


const getEventsFromCategoryAndTagPeriod = ({ post }, categoryId, tagId, Period) =>
  Object.keys(post)
    .map(postID => post[postID])
    .filter(({ categories }) => categories.includes(parseInt(categoryId)))
    .filter(({ tags }) => tags.includes(tagId))
    .filter(({ tags }) => tags.includes(eventsT))
  ;

export const getEventsForRegionPeriod = (source, tagId, Period,) => {
  return Object.values(ListedCategory)
    .reduce((acc, categoryId) => {
      const posts = getEventsFromCategoryAndTag(source, categoryId, tagId,).slice(0, MAXIMUM_POSTS)
      const category = source.category[categoryId]
      const isNotHeader = !(source.category[categoryId].slug === 'header')
      const resultF = getResultF(posts);

      const dateprefix = posts.map(item =>
      (String(item.acf.dateexec.substring(2, 4)
        + "/" + item.acf.dateexec.substring(4, 6)
        + "/" + item.acf.dateexec.substring(6, 8)
      )
      )
      );
      return [...acc, { posts, category, isNotHeader, dateprefix, resultF}]
    }, [])
}


const getEventsFromCategoryPeriod = ({ post }, categoryId, period) =>
  Object.keys(post)
    .map(postID => post[postID])
    .filter(({ categories }) => categories.includes(parseInt(categoryId)))
    .filter(({ categories }) => !(categories.includes(eventsT)))
    .filter(function (post) {
      return ((post.acf.month != '') && ((String((post.acf).dateexec)).startsWith(period)));
    })
  ;

// if any a1 value in a2 then return a3 concatened same position string 
export function getStringIntersect(a1,ref,refstr){
  var returnRefStr = []; 
  if (a1.length == 0) return [];
  var returnRef=  ( (ref.filter(function(n) { 
    returnRefStr.push(a1.indexOf(n) !== -1 ? refstr[ref.indexOf(n)] : null);   
    } 
  )));
  return (returnRefStr.filter(
    function(el){ 
      return el != null;
    }).join(':').replace('::',': '));
  }

function Intersect(a1,a2){ 
    if (a1.length == 0) return [];
    if (a2.length == 0) return []; 
    return  ( (a1.filter(function(n) { 
   
      return (a2.indexOf(n) !== -1);    }
 )));}

export function asIntersect(a1,a2){
  return  (Intersect(a1,a2).length > 0); 
}

  export const getResultF = ( posts, state=null) => { 

//TODO on condition not a complete post 
  var posts = (state? posts.map(({ type, id }, index) => state.source[type][id]):posts);
  //const aVar= {decode(state.source[data.taxonomy][data.id].name)};
  var headerArrayF = posts.map(v1 => (v1.categories.includes(headerC))?1:0);
  var regionArrayF = posts.map(v2 => (( asIntersect(ListedRegionTags, v2.tags) )?1:0) );
  var eventCArrayF = posts.map(v3 => (v3.categories.includes(eventsC))?1:0);
  var eventTarrayF = posts.map(v4 => (asIntersect(v4.categories, ListedEventSitesTags ))?1:0 );
  var spCV = posts.map(v5=> (asIntersect(awCulture,v5.categories))? 1 : 
  ((asIntersect(awLifestyle,v5.categories))? 2 : 
  ((asIntersect(awScience,v5.categories))? 3: 
  ((asIntersect(awInitiative,v5.categories))? 4 :
   0))) );
  var strapCV = posts.map(v6=> (  
    "b"
    .concat((v6.categories.includes(headerC))?"1":"0")
    .concat((asIntersect(v6.categories, ListedEventSitesTags ))?"1":"0")
    .concat((asIntersect(awCulture,v6.categories))? "1" : 
    ((asIntersect(awLifestyle,v6.categories))? "2" : 
    ((asIntersect(awScience,v6.categories))? "3": 
    ( (asIntersect(awInitiative,v6.categories))? "4" : "0"))))
    ));
  var straplittCV=posts.map(v7=> (asIntersect(awCulture,v7.categories))? getStringIntersect(v7.categories,awCulture,awCultureLitteral) : 
  (asIntersect(awLifestyle,v7.categories))? getStringIntersect(v7.categories,awLifestyle,awLifestyleLitteral) : 
  (asIntersect(awInitiative,v7.categories))? getStringIntersect(v7.categories,awInitiative,awInitiativeLitteral) : 
  (asIntersect(awScience,v7.categories))? getStringIntersect(v7.categories,awScience,awScienceLitteral) : 
  (asIntersect(v7.categories, ListedEventSitesTags ))? getStringIntersect(v7.categories,ListedEventSitesTags,ListedEventSitesTagsLitteral) :"");


  // var CategoryIndOf=(!strapCV.some(elem => !spCV.includes(0))) ? 
  // posts.map(v8 ,index => (strapListCV[index].indexOf(v8.categories))):
  // [];


  const resultF = [headerArrayF,regionArrayF,eventCArrayF ,eventTarrayF, spCV, strapCV, straplittCV];
  return resultF;
  }


export const getEventInPeriod = (source, period) => {
  return Object.values(ListedCategory)
    .reduce((acc, categoryId) => {
      const posts = getEventsFromCategoryPeriod(source, categoryId, period).slice(0, MAXIMUM_POSTS)
      const category = source.category[categoryId]
      const isNotHeader =!(source.category[categoryId].slug === 'header')
      // test all aspect in one return
      const resultF = getResultF(posts);

      const dateprefix = posts.map(item =>
      (String(item.acf.dateexec.substring(2, 4)
        + "/" + item.acf.dateexec.substring(4, 6)
        + "/" + item.acf.dateexec.substring(6, 8)
      )
      )
      );
      
      return [...acc, {posts, category, isNotHeader, dateprefix, resultF}]
     }, [])
}



export const getEventHeaderDetails = (post, tagid) => {
  return
  <Link link={linkUrl} onClick={(e) => console.log(e)}>
    <div class="card bg-dark text-white">
      <img src='...' class="card-img" alt="...">{/*back ground typed by tag_category isNotHeader + category with class 0.1.2.3.4*/}
        
        <div class="card-img-overlay">
        {(tagid!=null)?<div class="card-header"> {/*card-header defined by tag_category isNotRegion*/}
          Regions of the month 
        </div>:null}

        <div >{/*sub text defined by tagContainsEvents*/}</div>
        <nav style="--bs-breadcrumb-divider: ':';" aria-label="breadcrumb">
  <ol class="breadcrumb">
    <li class="breadcrumb-item"><a href="#">EVENTS</a></li>
    <li class="breadcrumb-item active" aria-current="page">SUB.CATEGORY</li>
  </ol>
</nav>
          <h5 class="card-title">{category.name}</h5>
          <Title dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
        </div>
    </img></div>
  </Link>
}


