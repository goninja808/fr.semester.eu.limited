import {categoriesWidgetsHome} from '../config'
const MAXIMUM_POSTS = 5 
const TAG_ID = (!!!(process.env.TAGID)?process.env.TAGID:"46")

const getEventsFromCategory = ({ post }, categoryId, _tagId) =>
  Object.keys(post)
    .map(postID => post[postID])
    .filter(({categories}) => categories.includes(parseInt(categoryId)) ).filter(({tags}) => tags.includes(parseInt(_tagId)) &&  tags.includes(parseInt(TAG_ID_event)) )

    export const eventGroupedByCategory = source =>  {
      return Object.values(categoriesWidgetsHome)
        .reduce((acc, categoryId) => {
          const posts = getEventsFromCategory(source, categoryId,TAG_ID).slice(0,MAXIMUM_POSTS)
          const category = source.category[categoryId]
          return [...acc, {posts, category}]
        }, [])


}

