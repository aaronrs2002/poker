localStorage.setItem("completeCards", JSON.stringify(cards));
const handHeirarchy = ["high-card", "pair", "two-pairs", "three-of-a-kind", "straight", "flush", "full-house", "four-of-a-kind", "straight-flush", "royal-flush"];
const cardHeirarchy = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"];
const suitArr = ["diamonds", "hearts", "clubs", "spades"];
let bestHandIndex = 0;
let cardsInvolved = "";

function evaluateHand(hand) {
    let cardIndexes = [];
    const cardsArr = [hand[0], hand[1], hand[2], hand[3], hand[4]];
    let highCard;
    let flush = false;
    let straight = false;
    let hasAce = false;
    let spades = 0;
    let hearts = 0;
    let diamonds = 0;
    let clubs = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    let six = 0;
    let seven = 0;
    let eight = 0;
    let nine = 0;
    let ten = 0;
    let jack = 0;
    let queen = 0;
    let king = 0;
    let ace = 0;

    for (let i = 0; i < cardsArr.length; i++) {
        cardIndexes.push(cardHeirarchy.indexOf(cardsArr[i].value))
        if (cardsArr[i].value === "two") {
            two = two + 1;
        }
        if (cardsArr[i].value === "three") {
            three = three + 1;
        }
        if (cardsArr[i].value === "four") {
            four = four + 1;
        }
        if (cardsArr[i].value === "five") {
            five = five + 1;
        }
        if (cardsArr[i].value === "six") {
            six = six + 1;
        }
        if (cardsArr[i].value === "seven") {
            seven = seven + 1;
        }
        if (cardsArr[i].value === "eight") {
            eight = eight + 1;
        }
        if (cardsArr[i].value === "nine") {
            nine = nine + 1;
        }
        if (cardsArr[i].value === "ten") {
            ten = ten + 1;
        }
        if (cardsArr[i].value === "jack") {
            jack = jack + 1;
        }
        if (cardsArr[i].value === "queen") {
            queen = queen + 1;
        }
        if (cardsArr[i].value === "king") {
            king = king + 1;
        }
        if (cardsArr[i].value === "ace") {
            hasAce = true;
            ace = ace + 1;
        }
        if (cardsArr[i].suit === "spades") {  /*determine same suits*/
            spades = spades + 1;
        }
        if (cardsArr[i].suit === "hearts") {
            hearts = hearts + 1;
        }
        if (cardsArr[i].suit === "diamonds") {
            diamonds = diamonds + 1;
        }
        if (cardsArr[i].suit === "clubs") {
            clubs = clubs + 1;
        }
    }
    if (spades === 5 || hearts === 5 || diamonds === 5 || clubs === 5) {    /*DETERMINE A flush*/
        flush = true;
        if (bestHandIndex < 5) {
            bestHandIndex = 5;
        }
    }
    cardIndexes = cardIndexes.sort(((a, b) => a - b));
    var results = [];
    for (var i = 0; i < cardIndexes.length; i++) {    /*DETERMINE A STRIGHT*/
        if (cardIndexes[i + 1] == cardIndexes[i] + 1 && cardIndexes[i + 2] == cardIndexes[i] + 2 && cardIndexes[i + 3] == cardIndexes[i] + 3 && cardIndexes[i + 4] == cardIndexes[i] + 4) {
            results.push(i);
            while (cardIndexes[i] + 1 == cardIndexes[i + 1])
                i++;
        }
    }
    if (results.length > 0) {
        if (bestHandIndex < 4) {
            bestHandIndex = 4;
        }
        straight = true;
    }
    let valueArr = [two, three, four, five, six, seven, eight, nine, ten, jack, queen, king, ace]; /*Determine matching values*/
    let pairQty = 0;
    let tripleQty = 0;

    for (let i = 0; i < valueArr.length; i++) {
        if (valueArr[i] === 2) {
            if (bestHandIndex < 1) {
                bestHandIndex = 1;
            }
            pairQty = pairQty + 1;
            cardsInvolved = cardsInvolved + " - " + cardHeirarchy[i] + "s";
        }
        if (valueArr[i] == 3) {
            if (bestHandIndex < 3) {
                bestHandIndex = 3;
            }
            tripleQty = tripleQty + 1;
            cardsInvolved = cardsInvolved + " - " + cardHeirarchy[i] + "s";
        }
        if (valueArr[i] == 4) {
            if (bestHandIndex < 7) {
                bestHandIndex = 7;
            }
            cardsInvolved = cardsInvolved + " - " + cardHeirarchy[i] + "s";
        }

        if (valueArr[i] > 0) {
            highCard = cardHeirarchy[i];

        }
    }

    if (pairQty == 2) { /*checking for 2 pair*/
        if (bestHandIndex < 2) {
            bestHandIndex = 2;
        }
    }
    if (pairQty == 1 && tripleQty == 1) {    /*checking for full house*/
        if (bestHandIndex < 6) {
            bestHandIndex = 6;
        }
    }
    if (flush === true && straight === true) {/*checking for straight flush*/
        if (bestHandIndex < 8) {
            bestHandIndex = 8;
        }
    }
    if (flush === true && straight === true && hasAce == true) {  /*checking for royal flush*/
        if (bestHandIndex < 9) {
            bestHandIndex = 9;
        }
    }

    document.getElementById("playerHandDetails").innerHTML = handHeirarchy[Number(bestHandIndex)] + "  " + cardsInvolved + " <small><i>(" + highCard + " is your highest card)</i></small>";
}

function removeCards(numbers) {
    let tempCards = [];
    for (let i = 0; i < cards.length; i++) {
        if (numbers.indexOf(i) === -1) {
            tempCards.push(cards[i]);
        }
    }
    cards = tempCards;
}

function play() {
    cardsInvolved = "";
    bestHandIndex = 0;
    cards = JSON.parse(localStorage.getItem("completeCards"));
    let activeCards = cards;
    let playersCards = [];
    let playerCardsHTML = "";
    function generate() {
        return Math.floor(Math.random() * activeCards.length);
    }
    while (playersCards.length < 5) {
        let genNumber = generate();
        if (playersCards.indexOf(activeCards[genNumber].title) === -1) {
            playerCardsHTML = playerCardsHTML + "<div class='card " + activeCards[genNumber].title + "' ></div>";
            playersCards.push(cards[genNumber].title);
        }
    }

    let titlesArr = [];
    let valuesArr = [];
    let handObj = [];
    for (let i = 0; i < playersCards.length; i++) {
        titlesArr.push(playersCards[i].substring(playersCards[i].indexOf("-") + 1, playersCards[i].length));
        valuesArr.push(playersCards[i].substring(0, playersCards[i].indexOf("-")));
        handObj.push({
            suit: playersCards[i].substring(playersCards[i].indexOf("-") + 1, playersCards[i].length),
            value: playersCards[i].substring(0, playersCards[i].indexOf("-"))
        })
    }
    evaluateHand(handObj);
    document.getElementById("playerCards").innerHTML = playerCardsHTML;
}


/*https://www.telegraph.co.uk/betting/casino-guides/poker/hand-rankings-chart-cheat-sheet/*/

/*royal-flush: five consecutive cards of the same suit in order of value from 10 through to ace*/

/*straight-flush: Any five cards of sequential values in the same suit that’s not a royal flush is a straight flush.*/

/*four-of-a-kind: he same card in all four suits.*/

/*full-house: A hand comprising the same value card in three different suits (three of a kind) and a separate pair of the same rank card in two different suits. 
When more than one player has a full house the winning hand is the one with the higher or highest value three of a kind.*/

/*flush: Five cards of the same suit in any order whatsoever*/

/*straight: Five cards of sequential numerical value composed of more than one suit.*/

/*three-of-a-kind: A poker hand containing three cards of the same rank in three different suits. */

/*two-pairs: Two different sets of two cards of matching rank*/

/*pair: A pair of cards of the same rank in different suits*/

/*high-card: The highest card in the hand */