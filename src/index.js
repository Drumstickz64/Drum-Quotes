const quoteEl = document.querySelector(".quote");
const getQuoteBtnEl = document.querySelector("#get-quote-btn");

const QUOTES_API = "https://api.quotable.io/random";
const FAILED_FETCH_MSG = "failed to get quote, sorry :/";

async function fetchRandomQuote() {
	try {
		const response = await fetch(QUOTES_API);
		
		if (response.status >= 400) {
			throw Error;
		}
		
		return await response.json();
		
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
	const quoteObj = await fetchRandomQuote();
	
	if (quoteObj === null) {
		quoteEl.textContent = FAILED_FETCH_MSG;
		return;
	}
	
	updateQuoteEl(quoteObj);
}

getQuoteBtnEl.addEventListener("click", handleClick);