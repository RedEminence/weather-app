import './style/app.css';




async function getData(query) {
	const temperature = document.querySelector('#temperature');
	try {
		const response = await fetch(`https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?APPID=81b50faeebfba8a5e8a97c0a8f23b409&q=${query}`, {mode: 'cors'});
		const data = await response.json();
		const avgTemp = `${Math.round(data.main.temp - 273.15)}`;
		const minTemp = `${Math.round(data.main.temp_min - 273.15)}`;
		const maxTemp = `${Math.round(data.main.temp_max - 273.15)}`;
		const weather = data.weather[0].main.toLowerCase();
		renderData(query, avgTemp, minTemp, maxTemp, weather);
		paintBody(weather);
	} catch(error) {
		document.querySelector('body').style.background = "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
		document.getElementById('card-wrapper').innerHTML = `<div class="not-found">City not found!</div>`;
	}
}


function renderData(query, avgTemp, minTemp, maxTemp, weather) {
	const card_wrapper = document.getElementById('card-wrapper');
	const markup = 
	`<div id="weather-card" style="background-image: url(./images/${weather}_bg.png); background-size: cover">
		<div class="left">
				<h1>${query}</h1>
				<span class="time">${getCurrentTime()}</span>
				<span class="weather">${weather}</span>
				<img class="weather-icon" src="./images/${weather}.png">
		</div>
		<div class="right">
				<span class="average">${avgTemp}&#176</span>
				<span class="min-max">${minTemp}&#176 / ${maxTemp}&#176</span>
		</div>
	</div>`;
	if (query !== undefined) {
		card_wrapper.innerHTML = markup;
	} else {
		card_wrapper.innerHTML = 'City not found!';
	}
}


function currentMonth(num) {
	let month;
	switch(num) {
		case 1:
			month = 'January';
			break;
		case 2:
			month = 'February';
			break;
		case 3:
			month = 'March';
			break;
		case 4:
			month = 'April';
			break;
		case 5:
			month = 'May';
			break;
		case 6: 
			month = 'June';
			break;
		case 7:
			month = 'July';
			break;
		case 8:
			month = 'August';
			break;
		case 9:
			month = 'September';
			break;
		case 10:
			month = 'October';
			break;
		case 11:
			month = 'November';
			break;
		case 12:
			month = 'December';
			break;
	}
	return month;
}

function getCurrentTime() {
	const today = new Date();
	const month = today.getMonth() + 1;
	const date = `${currentMonth(month)} ${today.getDate()}, ${today.getFullYear()}`;
	return date;
}

function getWeather() {
	const cityField = document.querySelector('#city');
	const query = cityField.value;
	const queryCapitalized = query.charAt(0).toUpperCase() + query.slice(1);
	getData(queryCapitalized);
}

function paintBody(weather) {
	const body = document.querySelector('body');
	body.style.background = `url('./images/${weather}_body.png')`;
}

document.querySelector('.get-weather-form').addEventListener('submit', function(event) {
	event.preventDefault();
	getWeather();
	paintBody();
	this.reset();
});

