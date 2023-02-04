---

tags:

- "#calendar/monthly/2023"

banner: "![[2023 January Weekly Banner.jpg]]"

banner_icon: 

---

# <% tp.date.now("YYYY [Month] MM") %>’s Note
[[<% tp.date.now("YYYY [Month] MM", -1) %>|↶ Previous Month]] | [[<% tp.date.now("YYYY [Month] MM", 1) %>|Following Month ↷]]

> [!METADATA]-
> - Created:: <% tp.date.now("YYYY-MM-DD @ HH:mm") %>
> - Updated:: <% tp.date.now("YYYY-MM-DD @ HH:mm") %>
> - ID:: <% tp.date.now('YYYYMMDDHHmm') %>
> - Month:: [[<% tp.date.now("YYYY [Month] MM") %>]]

**Table of Contents:**

```toc

style: number

```

___

## Overview

### Month Statistics

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

customJS.DvCharts.renderMonthlyChart({

dv,

context: this,

daysPath: '00 - Notes/01. DailyNote',

attributes,

type: 'average',

date

})

```


```dataview
TABLE
round(sum(default(rows.Spending,0))/length(rows.Spending),2) AS "Spending"
	,round(sum(default(rows.Stress,0))/length(rows.Stress),2) AS "Stress"
	,round(sum(default(rows.Anxiety,0))/length(rows.Anxiety),2) AS "Anxiety"
	,round(sum(default(rows.Fatigue,0))/length(rows.Fatigue),2) AS "Fatigue"
	,round(sum(default(rows.Steps,0))/length(rows.Steps),2) AS "Steps"
FROM "00 - Notes/01. DailyNote"
where Year = [[<% tp.date.now("YYYY") %>]]
group by Quarter
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

where Year = [[<% tp.date.now("YYYY") %>]]

SORT file.name ASC

```

### Habits

```dataview

TABLE WITHOUT ID
	link(file.name) as "Date",
	Anki AS "🈷️",
	Meditation AS "🧘‍♂️",
	Reading AS "🔖",
	Weights AS "🏋️‍♂️",
	Running AS "🏃‍♂️"
	FROM "00 - Notes/01. DailyNote" 
where Year = [[<% tp.date.now("YYYY") %>]]
	SORT link(file.name)

```

### Learnt Words

```dataviewjs
let let cf = dv.date(dv.current().file.cday).toFormat("yyyy-MM");
dv.table(
	["Vocabulary", "Meaning", "Day"],
	dv.pages('"00 - Notes/01. DailyNote"')
	.filter(b => b["Vocabulary"] &&  dv.date(b.file.cday).toFormat("yyyy-MM") =="<% tp.date.now("yyyy-MM") %>")
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

```dataviewjs
let cf = dv.date(dv.current().file.cday).toFormat("yyyy-MM");
dv.table(
	["Vocabulary", "Meaning", "Day"],
	dv.pages('"00 - Notes/01. DailyNote"')
	.filter(b => b["Vocabulary"] &&  dv.date(b.file.cday).toFormat("yyyy-MM") ==cf)
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


### Books Read

### Audiobooks
```dataviewjs
dv.table(["Cover","Name", "Author", "Genre", "Series","Rating","Progress","Date"], dv.pages('"30 - Reading"')
	.filter(b => b["date"] && b["series"] && b["date"].toFormat("yyyy-MM") == "<% tp.date.now("yyyy-MM") %>")
	.sort(p => p.date, 'desc')
    .map(b => [("![](" + b.cover + ")"), b.file.link, b.author, b.genre, b.series, (Number(b.audiblerating).toFixed(2) + "🌟"), b.status, b["date"]])
    )
```

