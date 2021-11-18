import {categoriesWidgetsHome} from '../config'
const MAXIMUM_POSTS = 5  
const TAGID =  (!!(process.env.TAGID) ? process.env.TAGID : "47");
const getPostsFromCategory = ({ post }, categoryId, _tagId) =>
  Object.keys(post)
    .map(postID => post[postID])
    .filter(({categories}) => categories.includes(parseInt(categoryId)) ).filter(({tags}) => tags.includes(parseInt(_tagId)) )

    export const getPostsGroupedByCategory = source =>  {
      return Object.values(categoriesWidgetsHome)
        .reduce((acc, categoryId) => {
          const posts = getPostsFromCategory(source, categoryId,TAGID).slice(0,MAXIMUM_POSTS)
          const isNotHeader =!(source.category[categoryId].slug === 'header')
          const category = source.category[categoryId]
          return [...acc, {posts, category, isNotHeader}]
        }, [])


}

