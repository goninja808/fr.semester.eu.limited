const settings = {
  "name": "FRENCH-SEMESTER",
  "state": {
    "frontity": {
      "url": "https://fr-semester.eu",
      "title": "FRENCH SEMESTER",
      "description": "1st January – 30 June 2022"
    }
  },
  "packages": [
      { 
      "name": "semester",
      "state": {
        "theme": {
          "month_tag":process.env.INDEX_SEMESTER,
          "menu": [  
            [
              "Welcome",
              "/"
            ],
            [
              "REGIONS of the month",
              "/regionofthemonth"
            ],
            [
              "EVENTS",
              "/category/events/"
            ],
            [
        
              "FACTS",
              "/main-facts/"
            ]
          ],
          "featured": {
            "showOnList": false,
            "showOnPost": true
          }
        }
    }},
    {
      "name": "@frontity/wp-source",
      "state": {
        "source": {
          "api": "https://fr-semester.blog/wp-json",
          "postTypes": [
            {
              type: "record",
              endpoint: "record",
              archive: "/record_cat"
            }
          ],
          taxonomies: [
            {
              taxonomy: "record_cat",
              endpoint: "record_cat",
              postTypeEndpoint: "record"
            } 
          ]
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
