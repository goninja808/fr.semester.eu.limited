import {categoriesWidgetsHome } from "../config"

const MAXIMUM_POSTS = 5  
console.log(process.env.INDEX_SEMESTER);

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


