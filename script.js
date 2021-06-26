//global vars
const quoteContainer = document.querySelector('quote-container');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');


// getting Quote from API 

async function getQuote(){
const url = 'http://api.quotable.io/random'

try {
    //fetching data using fetch method
    const res= await fetch(url);
    const data = await res.json();
    console.log(data);
    UpdateUi(data)
}
catch (err) {
    getQuote();
    console.log(err.message)
}

}

function UpdateUi(data) {
        // if the author is unknown 
        if (data.author === '') authorText.innerText = 'Unknown author'
        else authorText.innerText = data.author
        //reduce font size in case of long quotes
        if (data.content.length  > 120) {
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.content;
}

//tweet a generated quote 
function tweetQuote(){
    const quote =quoteText.innerText;
    const author = authorText.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(tweetUrl,'_blank');
}


//adding event listener to tweeter button 
twitterBtn.addEventListener('click' , tweetQuote);


// adding addEventListener to new quote button 
newQuoteBtn.addEventListener('click',getQuote);

// calling getQuote on load
getQuote();
