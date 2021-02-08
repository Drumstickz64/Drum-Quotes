const quoteEl = document.querySelector(".quote");
const getQuoteBtnEl = document.querySelector("#get-quote-btn");

const QUOTES_API = "https://api.quotable.io/random";

let quoteList = [];

async function fetchRandomQuote() {
	try {
		const response = await fetch(QUOTES_API);
		
		if (response.status >= 400) {
			throw Error;
		}
		
		return await response.json();
		
	} catch (err) {
		quoteEl.textContent = "failed to fetch quote :( please try again";
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
		quoteEl.textContent = "quote not loaded yet";
		return;
	}
	
	updateQuoteEl(quoteObj);
}


async function main() {
	quoteList.push(await fetchRandomQuote());
	quoteEl.textContent = "Press a button to get a quote";
	getQuoteBtnEl.addEventListener("click", handleClick);
	
	setInterval(async () => {
		quoteList.push(await fetchRandomQuote());
	}, 1000);
}

main();