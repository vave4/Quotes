const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById("loader");

let apiQuotes = [];
//Show loading
function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
 // Hide loading
 function removeLoadingSpinner() {
     quoteContainer.hidden = false;
     loader.hidden = true;
 }

//Show New Quote 
function newQuote() {
    showLoadingSpinner(); //loader is running
//Pick a random quote from api quote array
const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)];
authorText.textContent = quote.author;
quoteText.textContent = quote.text
// If author of quote id not there 
if(!quote.author) {
  authorText.textContent = "Unknown"
}else {
    authorText.textContent = quote.author
}
// legth of quotes 
if(quote.text.length > 90) 
{
quoteText.classList.add("long-quote")
} else {
    quoteText.classList.remove("long-quote")
}
//Set Quote Hide loader
quoteText.textContent = quote.text;
removeLoadingSpinner();
}

// Get Quotes from API
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl = "https://type.fit/api/quotes";
    try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
    } catch(error) {
          // Catch Error  Here 
    }
}

//Tweet a Quote 
function tweetQuote() {
 const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`; // this is for directly fetch our to tweet box for tweeting.
 window.open(twitterUrl, '_blank');// this will open twitter in blank screen or in new window
}

//Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click",tweetQuote);

// On Load
getQuotes(); 