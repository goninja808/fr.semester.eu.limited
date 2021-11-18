import {categoriesWidgetsHome} from '../config'
require('dotenv').config();
const MAXIMUM_POSTS = 5  
const NODE_TAGID = process.env.NODE_TAGID;
console.log(`Your port is ${port}`);
const getPostsFromCategory = ({ post }, categoryId, _tagId) =>
  Object.keys(post)
    .map(postID => post[postID])
    .filter(({categories}) => categories.includes(parseInt(categoryId)) ).filter(({tags}) => tags.includes(parseInt(_tagId)) )

    export const getPostsGroupedByCategory = source =>  {
      return Object.values(categoriesWidgetsHome)
        .reduce((acc, categoryId) => {
          const posts = getPostsFromCategory(source, categoryId,TAG_ID).slice(0,MAXIMUM_POSTS)
          const category = source.category[categoryId]
          return [...acc, {posts, category}]
        }, [])


}

