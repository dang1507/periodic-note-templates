---
tags:
- "#calendar/weekly/2023"
banner: "![[2023 January Weekly Banner.jpg]]"
banner_icon: 🗓️
obsidian-ui-mode: render
---

# <% tp.date.now("YYYY [Week] WW") %>’s Note
[[<% tp.date.now("YYYY [Week] WW", -7, tp.file.title,"YYYY [Week] WW") %>|↶ Previous Week]] | [[<% tp.date.now("YYYY [Week] WW", 7, tp.file.title, "YYYY [Week] WW") %>|Following Week ↷]]

> [!METADATA]-
> - Created:: <% tp.date.now("YYYY-MM-DD @ HH:mm") %>
> - Updated:: <% tp.date.now("YYYY-MM-DD @ HH:mm") %>
> - ID:: <% tp.date.now('YYYYMMDDHHmm') %>
> - Week:: [[<% tp.date.now("YYYY [Week] WW") %>]]
> - Month:: [[<% tp.date.now("YYYY [Month] MM") %>]]
> - Quarter:: [[<% tp.date.now("YYYY [Quarter] 0Q") %>]]
> - Year:: [[<% tp.date.now("YYYY") %>]]
> - 
**Table of Contents:**

```toc

style: number

```

___
## Overview
### Week Statistics

```dataviewjs

const daysPath = dv.current().file.folder;

const attributes = {

'Stress': {

label: 'Stress',

average: 100,

},

'Spending': {

label: 'Money Spent',

backgroundColor: 'rgba(85, 174, 229, 0.2)',

borderColor: 'rgba(85, 174, 229, 1)',

average: 100,

},

'Anxiety': {

label: 'Anxiety',

backgroundColor: 'rgba(255, 211, 101, 0.2)',

borderColor: 'rgba(255, 211, 101, 1)',

average: 100,

},

'Fatigue': {

label: 'Fatigue',

backgroundColor: 'rgba(141, 82, 188, 0.2)',

borderColor: 'rgba(141, 82, 188, 1)',

average: 100,

},

'Hours-Worked': {

label : 'Hours Worked',

backgroundColor: 'rgba(143, 208, 50, 0.2)',

borderColor: 'rgba(143, 208, 50, 1)',

average: 100

},

'steps': {

label : 'Steps',

backgroundColor: 'rgba(75, 82, 91, 0.2)',

borderColor: 'rgba(46, 2, 238, 1)',

average: 20000

},

};

const date = "<% tp.date.now('YYYY-MM-DD') %>";

customJS.DvCharts.renderWeeklyChart({

dv,

context: this,

daysPath: '00 - Notes/01. DailyNote',

attributes,

type: 'average',

date

})

```

```dataview

TABLE WITHOUT ID

link(file.name) as "Day",

Feeling AS "💭",

Spending AS "💸",

Stress AS "😵",

Anxiety AS "😰",

Fatigue AS "😫",

Steps AS "👣",

Hours-Worked AS "🏢"

FROM "00 - Notes/01. DailyNote"

WHERE week = [[<% tp.date.now("YYYY [Week] WW") %>]]

SORT file.name desc

```
## Memos

- [[2023-01-15|Monday]]

![[2023-01-15#^memo-link]]

- [[2023-01-16|Tuesday]]

![[2023-01-16#^memo-link]]

- [[2023-01-17|Wednesday]]

![[2023-01-17#^memo-link]]

- [[2023-01-18|Thursday]]

![[2023-01-18#^memo-link]]

- [[2023-01-19|Friday]]

![[2023-01-19#^memo-link]]

- [[2023-01-20|Saturday]]

![[2023-01-20#^memo-link]]

- [[2023-01-21|Sunday]]

![[2023-01-21#^memo-link]]


### Habits

```dataview

TABLE WITHOUT ID
	link(file.name) as "Date",
	Anki AS "🈷️",
	Meditation AS "🧘‍♂️",
	Reading AS "🔖",
	Audiobook AS "🎧",
	Weights AS "🏋️‍♂️",
	Running AS "🏃‍♂️"
	FROM "00 - Notes/01. DailyNote" 
	WHERE week = [[<% tp.date.now("YYYY [Week] WW") %>]]
	SORT file.name desc
	LIMIT 7
```

### Learnt Words

```dataviewjs

dv.table(
	["Vocabulary", "Meaning", "Day"],
	dv.pages('"00 - Notes/01. DailyNote"')
	.filter(b => b["Vocabulary"] &&  dv.date(b.file.name).toFormat("yyyy-WW") =="<% tp.date.now("yyyy-WW") %>")
	.sort(p => dv.date(p.file.name), 'asc')
	.flatMap(p =>
		Array.from(
			{length: Math.floor(p["Vocabulary"].length / 2)},
			(_, i) => [
				`${'**'}${p["Vocabulary"][i * 2]}${'**'}`,
				p["Vocabulary"][(i * 2) +1], moment(p.file.name).format("dddd")
				]
		)
	)
)
```


### Weather

```dataview

TABLE WITHOUT ID

file.link AS Day,

Location AS "🗺️",

Currently AS "☁️",

Description AS "💬",

Temperature AS "🌡️",

Feels-Like AS "💭",

Precipitation AS "🌧️", 

Wind AS "🍃",

Humidity AS "♨️",

Lunar-Phase AS "🌕",

Lunar-Day AS "🌚",

Pressure AS "🌡️",

Observed AS "🕓"

FROM "00 - Notes/01. DailyNote"

WHERE week = [[<% tp.date.now("YYYY [Week] WW") %>]]

SORT file.name desc
```
