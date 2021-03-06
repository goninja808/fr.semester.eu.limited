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
              "/events/20220"+(parseInt(process.env.INDEX_SEMESTER)+1)
            ],
            [
        
              "FACTS",
              "/facts/all"
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
          "params": {
            "per_page": 99, 
          },
        }
      }
    },
    "@frontity/tiny-router",
    "@frontity/html2react"
  ]
};

export default settings;


