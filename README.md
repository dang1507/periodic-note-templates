# MK's Periodic Note Templates
A set of periodic note templates for Obsidian.md.

![image](https://user-images.githubusercontent.com/50339059/166981554-4ccf8b94-6f33-4b78-9a4d-3252d54502a0.png)

*Theme: [Viridian](https://github.com/mulfok/obsidian-viridian)*
___


# Modified by Dang
Props to the original creators!

Weather information can be found by following the following article by Ben Newton
https://benenewton.medium.com/adding-the-current-weather-to-my-obsidian-daily-note-793591026a0a

## Additional Notes
This has been modified from the original script. The original weekly note is still present in the js file, and it will function as normal using the files Daily Note Template and Weekly Note Template once you have followed the instructions below. 

My versions can be identified by starting with T.Periodic.

There are now additional methods in the chart class. These classes render the Monthly by Day, Monthly by Week, Quarterly, and Annual charts. The steps are the same as below, with 2 changes. 

1. My paths are different than MK's, so his same instructions apply. 
2. You will need to modify the code in the dataview to reflect the new name of the method. For example

Periodic Monthly 
Change renderWeeklyChart to renderMonthlyChart to get a weekly breakdown. 

Furthermore, I am still working on this to make the scripts neat. Current goals are the following. 
Ensure that week numbers are mapped to week of year.
Ensure that proper month names are displayed for quarter
Ensure that the quarterly data and annual data are correct (going to wait until April for this)
Add a button to 'fix' the graph. I don't want 100s of dynamic js charts in my vault. Once the week is finished, I want to copy/paste the image. 

Code related: I didn't know any javascript before altering this file. So my spaghetti code and aweful everything are implicitly understood, please don't point them out without an example of how to make it better. Anything that makes the code better is greatly appreciated. :D

Lastly, feel free to create issues, however, between work, school, and other obligations it may take me a while. 

## Before You Start...
This collection of templates suit my **current** workflow. I supply them here and try to keep them to-date so that you lovely people are also able to use them. _By all means,_ you are encouraged to change the templates when you download them (you'll have to regardless, it's part of setup 😛) you may use a date format that I don't (these templates use YYYY-MM-DD by the way) or you may want to change what these notes track and whatnot. In short, these could/should be considered as a **base** to **your** perfect periodic note template.

These templates also assume you know how to use the plugins required. If you don't, please refer to the instructions on their repos--I unfortunately don't have the time to write a full-blown tutorial on how to install each and every single plugin.

> By the way, if you're having a problem and would like some help from me, please DM me on _Discord._ Just requesting this so you can get help quicker, since I only open Github like, once a day. 😆

## Required Plugins
- [CustomJS](https://github.com/samlewis0602/obsidian-custom-js)
- [Dynamic Table of Contents](https://github.com/Aidurber/obsidian-plugin-dynamic-toc)
- [Dataview](https://github.com/blacksmithgu/obsidian-dataview) (_ensure JS queries are enabled_)
- [Obsidian Banners](https://github.com/noatpad/obsidian-banners)
- [Obsidian Charts](https://github.com/phibr0/obsidian-charts)
- [Periodic Notes](https://github.com/liamcain/obsidian-periodic-notes)
- [Tasks](https://github.com/schemar/obsidian-tasks)
- [Templater](https://github.com/SilentVoid13/Templater)

## Setup
These notes require a little TLC to get them off of the ground. Other than installing the plugins listed above, we additionally need to configure...

1. The code required for the graph
  1. The actual graph codeblock
1. The banners used throughout the notes

### CustomJS Graph Code
The graph in the Weekly Note uses a CustomJS file built by [Olivier Carizzoni](https://github.com/oliviercarizzoni). In addition to functioning as a normal [Obsidian Charts](https://github.com/phibr0/obsidian-charts) chart, it adds the functionality to have each value you track trimmed down by an average that you provide.

For example, I track **steps** with an average of **10 000 steps.** Being able to show an average is extremely useful in being able to see all the values you track clearly. If this wasn't done, then I'd likely be only able to see the steps I've taken clearly, and much smaller values (like Hours Worked) would be completely buried.

Let's go about setting up this custom file.

1. First, make sure that [CustomJS](https://github.com/samlewis0602/obsidian-custom-js) is installed in Obsidian.

2. Once that's done, go to [Scripts/CustomJS](https://github.com/mulfok/periodic-note-templates/tree/main/Scripts/CustomJS) in this repo and download the `DvCharts.js` file.

3. Once you have, move it into an appropriate location in your vault. I've put mine in `AA Utilities/AA.04 Scripts`.

![image](https://user-images.githubusercontent.com/50339059/166988703-a8c864b5-2cdc-4b9d-a595-a204e583c57c.png)

4. Next, go to the CustomJS plugin settings and set **Folder** to the path where you put the JS file.

![image](https://user-images.githubusercontent.com/50339059/166989285-130c1cd9-9bce-4d84-a047-81dd70d81969.png)

5. Reload Obsidian, and you'll be good to go!

### Graph Codeblock
In the Weekly Note Templates's graph codeblock, you'll need to configure the `daysPath` found at the bottom of the file. For example, mine is set to `'02 Personal/02.01 Periodic Notes/<% tp.date.now("YYYY") %>/Daily/<% tp.date.now("MM MMMM") %>'`, which on compile gets turned into something like `02 Personal/02.01 Periodic Notes/2022/Daily/05 March`.

In short, change this field to match the **path where you have your Daily Notes.**

### Banner Images
You may notice that in the examples in this repo, there are banners that compliment the notes. By default, they are set as `![[<% tp.date.now("YYYY MMMM") %> Weekly Banner.jpg]]` in the template's frontmatter. When generating a new daily note, it will be translated to `![[2022 March Weekly Banner.jpg]]`. I personally like to have different banners for each month of the year, so I have a small backlog of chronologically named banners.

If you have a different file format for your images, no need to fret! Just change the `.jpg` to your desired format: `.png`, `.svg`, etc...
___
## Template Overview
Let's briefly look at each periodic note type, and what their intended functions are.

### Daily Notes
I use **Daily Notes** to fill out short dataview fields when as I feel like it, and to take memos and work logs of my day.

I track habits, the weather, tasks, and various statistics about my day. The fields found within these notes are then pulled into the **Weekly Note** that it is linked to, which is used for the automatic review.

![image](https://user-images.githubusercontent.com/50339059/166984582-5e20e94c-0cef-402c-8225-817fb6283294.png)

#### Learnt Words
You may notice that there's a field for **learnt words.** It's a useful thing to keep track of (especially in language learning) but there is a special format required in order for the field to work.

```
- Learnt Words:: "word one", "meaning", "word two", "meaning"
```

You can have any number of words in the field, but it must **always** be formatted as `"word", "meaning"`. If it is formatted incorrectly, the table on the weekly note will separate each character as it's own field, which doesn't look right.

Additionally, make sure that the quotation marks surrounding your fields are **not curled.** That means use these: `""` and not these: `“”`.

### Weekly Notes
I use **Weekly Notes** to reflect on my week as a whole. It automatically pulls in all the Memos, Work Logs, and Dataview fields from its corresponding Daily Notes.

![image](https://user-images.githubusercontent.com/50339059/166998012-6359d730-1601-497d-af7b-6d5542cc3ef6.png)

This note functions quite well on its own, and requires little interaction to change things.

___

## Attribution
Huge thanks to the following people for...
- ❤️ [Olivier Carizzoni](https://github.com/oliviercarizzoni): Improved graph code and dedicated custom JS
- 🧡 Braden1996#5496 (Discord): Learnt words table concept

## Support me!
Check out my other stuff:
- [Absolve](https://github.com/mulfok/obsidian-absolve)
- [mulfok's garden](https://publish.obsidian.md/mulfok-vault)
- [Viridian](https://github.com/mulfok/obsidian-viridian)

## Contact
- Discord: @mulfok#6931
- Twitter: @mulfok
