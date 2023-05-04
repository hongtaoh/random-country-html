let countries = [];

fetch("https://restcountries.com/v3.1/all")
	.then(res => res.json())
	.then(data => {
		countries = data;
		const countryHTML = buildCountriesHtml(countries);
		console.log(countries[0])
		document.getElementById('countries').innerHTML = countryHTML;
	});
	
function buildCountriesHtml(countries) {
	return countries.map(cntry => buildCountryHtml(cntry)).join('\n')
}

function buildCountryHtml(cntry) {
	let html = `<div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">`;
	html += `<img src=${cntry.flags.png} alt=${cntry.name.official} width="200">`
	html += `<p>${cntry.name.official}</p>`
	html += `<p>Capital city: ${(cntry["capital"] ?? "")}</p>`
	html += `</div>`
	return html;
}

function solveIndependent(cntry, searchIndependent) {
	// some country's independent is undefined. Need this block to pass this error
	let independentString = cntry.independent ?? " "
	console.log(independentString)
	return independentString.toString().includes(searchIndependent)
}

document.getElementById("search-btn").addEventListener("click", () => {
	let searchName = (document.getElementById("search-name").value ?? "").toLowerCase().trim();
	let searchContinent = document.getElementById("search-continent").value;
	let searchIndependent = document.getElementById("search-independent").value;
	let searchCarside = document.getElementById("search-carside").value;

	const matchingCountries = countries.filter(cntry => (
		cntry.name.official.toLowerCase().includes(searchName) &&
		cntry.continents[0].includes(searchContinent) && 
		solveIndependent(cntry, searchIndependent)  &&
		cntry.car.side.includes(searchCarside)
	))

	console.log(matchingCountries)

	document.getElementById('countries').innerHTML = buildCountriesHtml(
		matchingCountries)
})

document.getElementById("reset-search-btn").addEventListener("click", () => {
	document.getElementById("search-name").value = "";
	document.getElementById("search-continent").value = "";
	document.getElementById("search-independent").value = "";
	document.getElementById("search-carside").value = "";

	document.getElementById('countries').innerHTML = buildCountriesHtml(
		countries)
})

