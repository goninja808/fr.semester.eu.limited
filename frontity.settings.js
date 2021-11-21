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
              "DEMO 0"+(parseInt(process.env.INDEX_SEMESTER) + 1)+"/2022",
              "/"
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
          "url": "https://fr-semester.eu/"
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;
