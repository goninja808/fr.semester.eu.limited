import {categoriesWidgetsHome,events, culture, lifestyle, initiative, science, header } from "../config"
import {MonthRegionTags, idEvents} from  "../config_tag";
import list from "../list/list";
const MAXIMUM_POSTS = 5
console.log(process.env.INDEX_SEMESTER);

const getFactsFromCategoryAndTag = ({ post }, categoryId, tagId) =>
  Object.keys(post)
    .map(postID => post[postID])
    .filter(({categories}) => categories.includes(parseInt(categoryId)) )
    .filter(({tags}) => tags.includes(tagId))
    .filter(({tags}) => !(tags.includes(idEvents)))
    .filter(({categories}) => !(categories.includes(header)))

    export const getFactsForRegion = (source,tagId, ) =>  {
      return Object.values(categoriesWidgetsHome)
        .reduce((acc, categoryId) => {
          const posts = getFactsFromCategoryAndTag(source, categoryId, tagId ).slice(0,MAXIMUM_POSTS)
          const category = source.category[categoryId]
          const isNotHeader =!(source.category[categoryId].slug === 'header')
          return [...acc, {posts, category, isNotHeader}]
        }, [])
    }

    const getPostsFromCategoryAndTag = ({ post }, categoryId, tagId) =>
  Object.keys(post)
    .map(postID => post[postID])
    .filter(({categories}) => categories.includes(parseInt(categoryId)) )
    .filter(({tags}) => tags.includes(tagId))

    export const getPostsGroupedByCategoryAndTag = (source,tagId ) =>  {
      return Object.values(categoriesWidgetsHome)
        .reduce((acc, categoryId) => {
          const posts = getPostsFromCategoryAndTag(source, categoryId, tagId ).slice(0,MAXIMUM_POSTS)
          const isNotHeader =!(source.category[categoryId].slug === 'header')
          const category = source.category[categoryId]
          return [...acc, {posts, category, isNotHeader}]
        }, [])

}

const getEventsFromCategoryAndTag = ({ post }, categoryId, tagId) =>
  Object.keys(post)
    .map(postID => post[postID])
    .filter(({categories}) => categories.includes(parseInt(categoryId)) )
    .filter(({tags}) => tags.includes(tagId))
    .filter(({tags}) => tags.includes(idEvents))
  ;

    export const getEventsForRegion = (source,tagId, ) =>  {
      return Object.values(categoriesWidgetsHome)
        .reduce((acc, categoryId) => {
          const posts = getEventsFromCategoryAndTag(source, categoryId, tagId ).slice(0,MAXIMUM_POSTS)
          const category = source.category[categoryId]
          const isNotHeader =!(source.category[categoryId].slug === 'header')
          return [...acc, {posts, category, isNotHeader}]
        }, [])
    }


const getFactsFromCategory = ({ post }, categoryId) =>
  Object.keys(post)
    .map(postID => post[postID])
    .filter(({categories}) => categories.includes(parseInt(categoryId)) )
    .filter(({tags}) => !(tags.includes(idEvents)))
    .filter(({categories}) => !(categories.includes(header)))
  ;

    export const getFacts = (source ) =>  {
      return Object.values(categoriesWidgetsHome)
        .reduce((acc, categoryId) => {
          const posts = getFactsFromCategory(source, categoryId ).slice(0,MAXIMUM_POSTS)
          const category = source.category[categoryId]
          const isNotHeader =!(source.category[categoryId].slug === 'header')
          return [...acc, {posts, category, isNotHeader}]
        }, [])
    }


const getEventsFromCategoryAndTagPeriod = ({ post }, categoryId, tagId, Period) =>
    Object.keys(post)
      .map(postID => post[postID])
      .filter(({categories}) => categories.includes(parseInt(categoryId)) )
      .filter(({tags}) => tags.includes(tagId))
      .filter(({tags}) => tags.includes(idEvents))
    ;
  
      export const getEventsForRegionPeriod = (source,tagId,Period, ) =>  {
        return Object.values(categoriesWidgetsHome)
          .reduce((acc, categoryId) => {
            const posts = getEventsFromCategoryAndTag(source, categoryId, tagId, ).slice(0,MAXIMUM_POSTS)
            const category = source.category[categoryId]
            const isNotHeader =!(source.category[categoryId].slug === 'header')
            const dateprefix=posts.map(item => 
              (String( item.acf.dateexec.substring(2,4)
                  +"/"+item.acf.dateexec.substring(4,6)
                  +"/"+item.acf.dateexec.substring(6,8)
                  )
                )
             );
            return [...acc, {posts, category, isNotHeader, dateprefix}]
          }, [])
      }


const getEventsFromCategoryPeriod = ({ post }, categoryId, period) =>
  Object.keys(post)
    .map(postID => post[postID])
    .filter(({categories}) => categories.includes(parseInt(categoryId)) )
    .filter(({categories}) => !(categories.includes(idEvents))) 
    .filter(function (post) {
      return ((post.acf.month != '' ) && ((String((post.acf).dateexec)).startsWith(period)));
    })
  ;

    export const getEventInPeriod = (source, period ) =>  {
      return Object.values(categoriesWidgetsHome)
        .reduce((acc, categoryId) => {
          const posts = getEventsFromCategoryPeriod(source, categoryId, period ).slice(0,MAXIMUM_POSTS)
          const category = source.category[categoryId]
          const isNotHeader =!(source.category[categoryId].slug === 'header')
          const dateprefix=posts.map(item => 
           (String( item.acf.dateexec.substring(2,4)
               +"/"+item.acf.dateexec.substring(4,6)
               +"/"+item.acf.dateexec.substring(6,8)
               )
             )
          );
 
          return [...acc, {posts, category, isNotHeader, dateprefix}]
        }, [])
    }
