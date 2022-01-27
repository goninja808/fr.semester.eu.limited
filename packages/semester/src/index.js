import Theme from "./components";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import link from "@frontity/html2react/processors/link";
import { ListedCategory, tagsWidgetsHome } from "./components/config";


const semestertheme = {
  name: "fr.semester.eu",
  version: "1.0.0",
  roots: {
    /**
     * In Frontity, any package can add React components to the site.
     * We use roots for that, scoped to the `theme` namespace.
     */
    theme: Theme,
  },
  state: {
    /**
     * State is where the packages store their default settings and other
     * relevant state. It is scoped to the `theme` namespace.
     */
    theme: {
      autoPrefetch: "in-view",
      menu: [],
      isMobileMenuOpen: false,
      featured: {
        showOnList: false,
        showOnPost: false,
      },
    }//,
    // source: {
    //   data: {
    //     "/main-events/":{
    //       isMainEvents: true,
    //       isReady: true
    //     }
    //   }
    // }
  },

  /**
   * Actions are functions that modify the state or deal with other parts of
   * Frontity like libraries.
   */
  actions: {
    theme: {
      toggleMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = !state.theme.isMobileMenuOpen;
      },
      closeMobileMenu: ({ state }) => {
        state.theme.isMobileMenuOpen = false;
      },
      beforeSSR: async ({ state, actions }) => {
        await Promise.all(
          Object.keys(ListedCategory)
            .map(category => actions.source.fetch(`/category/${category}/`)),
          )
      },
    },
  },
  libraries: {
    source: {
      handlers:[
        {
          pattern: "/events/:id",
           func: ({state, link, params}) => {
             state.source.data[link] = {
               isEvents: true,
               id: params.id
             }
           }
         },
         {
          pattern: "/facts/:id",
           func: ({state, link, params}) => {
             state.source.data[link] = {
               isFacts: true,
               id: params.id
             }
           }
         }
      ]
    },
    html2react: {
      processors: [image, iframe, link],
    },
  },
};

export default semestertheme;
