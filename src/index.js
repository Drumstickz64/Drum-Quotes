const quoteEl = document.querySelector(".quote");
const getQuoteBtnEl = document.querySelector("#get-quote-btn");

const QUOTES_API = "https://api.quotable.io/random";
const FAILED_FETCH_MSG = "failed to get quotes, please try again :)";

let quoteList = [];

async function fetchRandomQuote() {
	try {
		const response = await fetch(QUOTES_API);
		
		if (response.status >= 400) {
			throw Error;
		}
		
		const data = await response.json();
		console.log(data);
		return data;
		
	} catch (err) {
		return null;
	}
	
}

function updateQuoteEl(quoteObj) {
	const { content, author } = quoteObj;
	const fullString = `${content} - ${author}`;
	quoteEl.textContent = fullString;
}

async function handleClick() {
	const quoteObj = quoteList.shift();
	
	if (!quoteObj) {
		quoteEl.textContent = FAILED_FETCH_MSG;
		return;
	}
	
	updateQuoteEl(quoteObj);
}


async function main() {
	setInterval(async () => {
		quoteList.push(await fetchRandomQuote());
	}, 1000);
	quoteEl.textContent = "Press a button to get a quote";
	getQuoteBtnEl.addEventListener("click", handleClick);
}

main();