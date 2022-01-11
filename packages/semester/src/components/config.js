export const headerC= 64;
export const eventsC= 71;

export const culture= 24;
export const awCulture = [culture,
/*art*/	73,
/*geographic*/	74,
/*historic*/	26
];
export const awCultureLitteral = ["Culture:",
  "Arts",
  "Geographical Interests",
  "Historical interests & sites"
  ];
export const lifestyle= 28;
export const awLifestyle = [lifestyle,
/*  language*/	79,
/*  sport	*/80,
/* taste of france*/	78,
/* typical local product*/	77
];
export const awLifestyleLitteral = ["Lifestyle:",
  "Languages",
  "Sport",
  "Tastes of France",
  "Typical Local Products"
  ];
export const initiative= 37;
export const awInitiative = [initiative,
  /*  community	*/86,
  /*  ecology	*/84,
  /*  health	*/87,
  /*  society */	85
  ];

  export const awInitiativeLitteral = ["Initiative",
  "Community life",
  "Ecology",
  "Health",
  "Society"
  ];

export const science= 33;
export const awScience = [science];
export const awScienceLitteral= ["Science"];


export const awSpAny = awCulture.concat(awLifestyle,awInitiative,awScience);
 
export const ListedCategory = {
  "header" : headerC,
  "events": eventsC,
  "culture": culture,
  "lifestyle": lifestyle,
  "science": science,
  "initiative": initiative
}

export const PureCategories = {
  culture,
  lifestyle,
  science,
  initiative
}
  
