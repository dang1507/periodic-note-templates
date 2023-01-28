/**
 * Class for rendering charts in Obsidian.
 * To be used with DataviewJS, Obsidian Charts and CustomJS plugins
 * @author Olivier C <olo06@hotmail.fr>
 */
 class DvCharts {

    /**
     * Render a chart on a daily basis with a custom attribute extracted from dailies pages
     * @param {object} args - object to pass containing properties used
     * @param {object} args.dv - dataview object to perform queries
     * @param {object} args.context - context to be set to **this**, used to render chart in place
     * @param {string} args.daysPath - path to Daily notes
     * @param {string} args.dayFormat - format of daily pages in Moment format
     * @param {string} args.attr - attribute to query and render the value
     * @param {string} args.label - label to display in chart for corresponding attr
     * @param {number} args.limit - numbers of last pages containing values to display
     */
    renderSingleAttrChart(args) {

        const {
            dv,
            context,
            daysPath = '"01-Notes/Journal"',
            dayFormat = 'YYYY-MM-DD',
            attr,
            label,
            limit = 30
        } = args;

        let days = dv.pages(daysPath)
            .where(p => p[attr] && moment(p.file.name, dayFormat).isValid())
            .sort(p => p.file.name)
            .filter((p, i, arr) => i >= arr.length - limit);

        let dates = [], attrData = [];
        days.forEach(p => {
            dates.push(p.file.name);
            attrData.push(p[attr]);
        });

        const chartData = {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label,
                    data: attrData,
                    backgroundColor: 'rgba(85, 174, 229, 0.2)',
                    borderColor: 'rgba(85, 174, 229, 1)',
                    borderWidth: 1,
                    fill: true,
                    tension: 0.2
                }],
            }
        }

        window.renderChart(chartData, context.container);
    }

    /**
     * Render a chart on a weekly basis from the specified date
     * @param {object} args - object to pass containing properties used
     * @param {object} args.dv - dataview object to perform queries
     * @param {object} args.context - context to be set to **this**, used to render chart in place
     * @param {string} args.daysPath - path to Daily notes
     * @param {string} args.dayFormat - format of daily pages in Luxon format
     * @param {string} args.attributes - object with keys as attributes to query and values as metadatas
     * @param {object} args.template - default template for completing datasets metadatas
     * @param {string} args.type - set it to **'average'** to display average data in chart
     * @param {string} args.date - date in YYYY-MM-DD format from which weekly days will be retrieved
	 * 	getMonday(d) {
	 *	d = new Date(d);
	 *	var day = d.getDay(),
	 *	diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
	 *	return new Date(d.setDate(diff));
}
     */

	
    renderWeeklyChart(args) 
	{

        const 
		{
            dv,
            context,
            daysPath = '""',
            dayFormat = 'yyyy-MM-dd',
            template = 
			{
                label: "Default",
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: true,
                tension: 0.2
            },
            attributes,
            type,
            date
        } = args;


        const datasets = (() => 
		{
		const startOfWeek =dv.date(date).startOf('week');
		
		const getWeeklyDay = dayNum => dv.pages(`"${daysPath}"`).find(
			p => p.file.name == startOfWeek.plus({ days: dayNum }).toFormat(dayFormat));
			
		const weeklydays = Array.from({ length: 7 }, (c, i) => getWeeklyDay(i) || 0);	
		
		const getData = (attr, props) => weeklydays.map(p =>
                (type == 'average') ? (p[attr] / props.average * 100) || 0 : p[attr]);
				
		let datasets = {};

		for (let [attr, props] of Object.entries(attributes)) 
		{
			datasets[attr] = Object.assign({}, template, props, {data: getData(attr, props)});
		}
            return Object.values(datasets);
        })();
    
        const chartData = 
		{
            type: 'line',
            data: {
                labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                datasets,
            }
        }
    
        window.renderChart(chartData, context.container);
    }
 

    /**
     * Render a chart on a weekly basis from the specified date
     * @param {object} args - object to pass containing properties used
     * @param {object} args.dv - dataview object to perform queries
     * @param {object} args.context - context to be set to **this**, used to render chart in place
     * @param {string} args.daysPath - path to Daily notes
     * @param {string} args.dayFormat - format of daily pages in Luxon format
     * @param {string} args.attributes - object with keys as attributes to query and values as metadatas
     * @param {object} args.template - default template for completing datasets metadatas
     * @param {string} args.type - set it to **'average'** to display average data in chart
     * @param {string} args.date - date in YYYY-MM-DD format from which weekly days will be retrieved
	 * 	weekOfMonth = Math.ceil(new Date().getDate() / 7)
     */	
	renderMonthlyChart(args) 
	{

        const 
		{
            dv,
            context,
            daysPath = '""',
            dayFormat = 'yyyy-MM-dd',
            template = 
			{
                label: "Default",
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
                fill: true,
                tension: 0.2
            },
            attributes,
            type,
            date
        } = args;
    
        const datasets = (() => 
		{

			const startOfMonth = dv.date(date).startOf('month');

            const getMonthlydays = dayNum => dv.pages(`"${daysPath}"`).find(
                p => p.file.name == startOfMonth.plus({ days: dayNum }).toFormat(dayFormat));
				
				
            const monthlyDays = Array.from({ length: parseInt(dv.date("eom").toFormat("yyyy-MM-dd").slice(-2)) }, (c, i) => getMonthlydays(i) || 0);
						

            const getData = (attr, props) => monthlyDays.map(p =>
                (type == 'average') ? (p[attr] / props.average * 100) || 0 : p[attr]);
				
				
            let datasets = {};
    
            for (let [attr, props] of Object.entries(attributes)) 
			{
                datasets[attr] = Object.assign({}, template, props, {data: getData(attr, props)});
            }
    
            return Object.values(datasets);
        })();
    
        const chartData = 
		{
            type: 'line',
            data: 
			{
                labels: Array(parseInt(dv.date("eom").toFormat("yyyy-MM-dd").slice(-2))).fill().map((v,i)=>i),
                datasets,
            }
        }
    
        window.renderChart(chartData, context.container);
    }
	
	
	renderMonthlyChartByWeek(args)
	{
		const 
		{
			dv,
			context,
			daysPath = '""',
			dayFormat = 'yyyy-MM-dd',
			template = 
			{
				label: "Default",
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
				fill: true,
				tension: 0.2
			},
			attributes,
			type,
			date
		} = args;
	
		const datasets = (() => 
		{
			const startOfMonth = dv.date(date).startOf('month');
			const endOfMonth = dv.date(date).endOf('month');
			let weeklyData = {};

			const getMonthlydays = dayNum => dv.pages(`"${daysPath}"`).find(
				p => p.file.name == startOfMonth.plus({ days: dayNum }).toFormat(dayFormat));
			const monthlyDays = Array.from({ length: parseInt(endOfMonth.toFormat("yyyy-MM-dd").slice(-2)) }, (c, i) => getMonthlydays(i) || 0);


			const getData = (attr, props) => 
			{
				monthlyDays.forEach(p => 
				{
					let day = dv.date(date);
					let weekNum = p.week;
					if (!weeklyData[attr]) 
					{
						weeklyData[attr] = {};
					}
					if (!weeklyData[attr][weekNum]) 
					{
						weeklyData[attr][weekNum] = 0;
					}
					weeklyData[attr][weekNum] += (type == 'average') ? (p[attr] / props.average * 100)/7 || 0 : p[attr];

				});
			}
			
			let datasets = {};
			
					// Works with no series labels
			for (let [attr, props] of Object.entries(attributes)) 
			{
				datasets[attr] = Object.assign({}, template, props, {data: getData(attr, props)})
		
				for (let [weekNum, weekData] of Object.entries(weeklyData)) 
				{
					datasets[attr] = Object.assign({}, template, props, {data: Object.values(weekData)});
				}
			}

	  return Object.values(datasets);
		  })();

	function pad(num, size) {
		num = num.toString();
		while (num.length < size) num = "0" + num;
		return num;
	}
		
	const chartData = 
	{
		type: 'line',
		data: 
		{
			labels: Object.keys(datasets).map(i => "Week " + pad(i,2)),
			datasets
		}
	}

	window.renderChart(chartData, context.container);

	}
	
	renderQuarterlyChart(args)
	{
		const 
		{
			dv,
			context,
			daysPath = '""',
			dayFormat = 'yyyy-MM-dd',
			template = 
			{
				label: "Default",
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
				fill: true,
				tension: 0.2
			},
			attributes,
			type,
			date
		} = args;
	
		const datasets = (() => 
		{
			const startOfQuarter = dv.date(date).startOf('quarter');
			const endOfQuarter = dv.date(date).endOf('quarter');
			let quarterlyData = {};

			const getQuarterlydays = dayNum => dv.pages(`"${daysPath}"`).find(
				p => p.file.name == startOfQuarter.plus({ days: dayNum }).toFormat(dayFormat));
			const quarterlyDays = Array.from({ length: parseInt((endOfQuarter - startOfQuarter) / (24*3600*1000))}, (c, i) => getQuarterlydays(i) || 0);


			const getData = (attr, props) => 
			{
				quarterlyDays.forEach(p => 
				{
					let day = dv.date(date);
					let monthNum = p.month;
					if (!quarterlyData[attr]) 
					{
						quarterlyData[attr] = {};
					}
					if (!quarterlyData[attr][monthNum]) 
					{
						quarterlyData[attr][monthNum] = 0;
					}
					quarterlyData[attr][monthNum] += (type == 'average') ? (p[attr] / props.average * 100)/30 || 0 : p[attr];

				});
			}
			
			let datasets = {};
			
					// Works with no series labels
			for (let [attr, props] of Object.entries(attributes)) 
			{
				datasets[attr] = Object.assign({}, template, props, {data: getData(attr, props)})
		
				for (let [quarterNum, quarterData] of Object.entries(quarterlyData)) 
				{
					datasets[attr] = Object.assign({}, template, props, {data: Object.values(quarterData)});
				}
			}

	  return Object.values(datasets);
		  })();

	function pad(num, size) {
		num = num.toString();
		while (num.length < size) num = "0" + num;
		return num;
	}
		
	const chartData = 
	{
		type: 'line',
		data: 
		{
			labels: Object.keys(datasets).map(i => "Month " + pad(i,2)),
			datasets
		}
	}

	window.renderChart(chartData, context.container);

	}
	
	
	renderAnnualChart(args)
	{
		const 
		{
			dv,
			context,
			daysPath = '""',
			dayFormat = 'yyyy-MM-dd',
			template = 
			{
				label: "Default",
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1,
				fill: true,
				tension: 0.2
			},
			attributes,
			type,
			date
		} = args;
	
		const datasets = (() => 
		{
			const startOfYear = dv.date(date).startOf('year');
			const endOfYear = dv.date(date).endOf('year');
			const startOfQuarter = dv.date(date).startOf('quarter');
			const endOfQuarter = dv.date(date).endOf('quarter');
			
			let annualData = {};
			const yearLength = parseInt((endOfYear - startOfYear) / (24*3600*1000))
			const quarterLength = parseInt((endOfQuarter - startOfQuarter) / (24*3600*1000))

			const getQuarterlydays = dayNum => dv.pages(`"${daysPath}"`).find(
				p => p.file.name == startOfQuarter.plus({ days: dayNum }).toFormat(dayFormat));
			const quarterlyDays = Array.from({ length: yearLength}, (c, i) => getQuarterlydays(i) || 0);


			const getData = (attr, props) => 
			{
				quarterlyDays.forEach(p => 
				{
					let day = dv.date(date);
					let quarterNum = p.quarter;
					if (!annualData[attr]) 
					{
						annualData[attr] = {};
					}
					if (!annualData[attr][quarterNum]) 
					{
						annualData[attr][quarterNum] = 0;
					}
					annualData[attr][quarterNum] += (type == 'average') ? (p[attr] / props.average * 100)/quarterLength || 0 : p[attr];

				});
			}
			
			let datasets = {};
			
					// Works with no series labels
			for (let [attr, props] of Object.entries(attributes)) 
			{
				datasets[attr] = Object.assign({}, template, props, {data: getData(attr, props)})
		
				for (let [quarterNum, quarterData] of Object.entries(annualData)) 
				{
					datasets[attr] = Object.assign({}, template, props, {data: Object.values(quarterData)});
				}
			}

	  return Object.values(datasets);
		  })();

	function pad(num, size) {
		num = num.toString();
		while (num.length < size) num = "0" + num;
		return num;
	}
		
	const chartData = 
	{
		type: 'line',
		data: 
		{
			labels: Object.keys(datasets).map(i => "Quarter " + pad(i,2)),
			datasets
		}
	}

	window.renderChart(chartData, context.container);

	}
	
	
}

