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
      "name": "semester-theme",
      "state": {
        "theme": {
          "menu": [
            [
              "FRENCH Semester",
              "/"
            ],
            [
              "REGION of the MONTH",
              "/tag/nouvelleaquitaineoccitanie/"
            ],
            [
              "EVENTS",
              "/tag/events/"
            ],
            ["FACTS",
            "/category/culture/"
              
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
