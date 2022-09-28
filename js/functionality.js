localStorage.setItem("completeCards", JSON.stringify(cards));
const handHeirarchy = ["high-card", "pair", "two-pairs", "three-of-a-kind", "straight", "flush", "full-house", "four-of-a-kind", "straight-flush", "royal-flush"];
const cardHeirarchy = ["two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "jack", "queen", "king", "ace"];
const suitArr = ["diamonds", "hearts", "clubs", "spades"];
let usedCardsArr = [];
let player0Obj;
let player1Obj;
let activeRound = 1;
let cardReplacements = [];


//let player0Replace = [];
//let player1Replace = [];
let replaceObj = [player0Obj, player1Obj];


let bestHandIndex = 0;
let resultList = [];
let playerStatus = [0, 0];
let compareCards = [0, 0];
function evaluateHand(hand, iteration) {

    console.log("(typeof hand): " + (typeof hand));
    console.log("JSON.stringify(hand): " + JSON.stringify(hand));

    let cardsInvolved = "";
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
            compareCards[iteration] = i;
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
        if (valueArr[i] > 0) {/*determine highest card*/
            highCard = cardHeirarchy[i];
            compareCards[iteration] = i;
        }
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
            cardsInvolved = cardsInvolved + " - " + cardHeirarchy[valueArr.indexOf(3)] + "s";
        }
        if (valueArr[i] == 4) {
            if (bestHandIndex < 7) {
                bestHandIndex = 7;
            }
            cardsInvolved = cardsInvolved + " - " + cardHeirarchy[valueArr.indexOf(4)] + "s";
        }
    }

    if (valueArr.indexOf(2) !== -1) {
        compareCards[iteration] = valueArr.indexOf(2);
    }
    if (valueArr.indexOf(3) !== -1) {
        compareCards[iteration] = valueArr.indexOf(3);
    }
    if (valueArr.indexOf(4) !== -1) {
        compareCards[iteration] = valueArr.indexOf(4);
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
    resultList.push(bestHandIndex);
    const playersDetails = ["playerHandDetails", "playerTwoHandDetails"];
    document.getElementById(playersDetails[iteration]).classList.remove("hide");

    if (iteration === 0) {
        let replaceOptionHTML = "";
        for (let i = 0; i < valueArr.length; i++) {
            if (valueArr[i] !== 0) {
                replaceOptionHTML = replaceOptionHTML + "<button type='button' onClick='javascript:replace(" + i + ")' class='btn btn-secondary'>" + cardHeirarchy[i] + " (" + valueArr[i] + ")</button>";
            }
        }
        document.getElementById(playersDetails[iteration]).innerHTML = handHeirarchy[Number(bestHandIndex)] + "  " + cardsInvolved + " <small><i>(" + highCard + " is your highest card)</i></small><br/>Replace: " + replaceOptionHTML;
    } else {
        document.getElementById(playersDetails[iteration]).innerHTML = handHeirarchy[Number(bestHandIndex)] + "  " + cardsInvolved + " <small><i>(" + highCard + " is player " + (Number(iteration) + 1) + "'s highest card)</i></small>";
    }


    if (iteration === 0) {
        playerStatus[iteration] = Number(bestHandIndex);
    }
    if (iteration === 1) {
        let topHand = resultList.indexOf(Math.max(...resultList));
        if (Number(bestHandIndex) === playerStatus[0]) {
            console.log("compareCards: " + compareCards);
            if (compareCards[0] > compareCards[1]) {
                document.querySelector("[data-player='" + 0 + "']").classList.remove("alert-info");
                document.querySelector("[data-player='" + 0 + "']").classList.add("alert-success");
            } else {
                document.querySelector("[data-player='" + 1 + "']").classList.remove("alert-info");
                document.querySelector("[data-player='" + 1 + "']").classList.add("alert-success");
            }
        } else {
            document.querySelector("[data-player='" + topHand + "']").classList.remove("alert-info");
            document.querySelector("[data-player='" + topHand + "']").classList.add("alert-success");
        }
    }
}
function generate(activeCards) {
    return Math.floor(Math.random() * activeCards.length);
}
function play() {
    [].forEach.call(document.querySelectorAll("[data-player]"), function (e) {
        e.classList.remove("alert-success");
        e.classList.add("alert-info");
    });
    playerStatus = [0, 0];
    compareCards = [0, 0];
    resultList = [];
    cards = JSON.parse(localStorage.getItem("completeCards"));
    let activeCards = cards;
    usedCardsArr = [];
    function generatePlayer(iteration) {
        cardsInvolved = "";
        bestHandIndex = 0;
        let playersCards = [];
        let playerCardsHTML = "";

        while (playersCards.length < 5) {
            let genNumber = generate(activeCards);
            if (usedCardsArr.indexOf(activeCards[genNumber].title) === -1) {
                playerCardsHTML = playerCardsHTML + "<div class='card " + activeCards[genNumber].title + "' ></div>";
                playersCards.push(cards[genNumber].title);
                usedCardsArr.push(cards[genNumber].title);
            }
        }
        let handObj = [];
        for (let i = 0; i < playersCards.length; i++) {
            handObj.push({
                suit: playersCards[i].substring(playersCards[i].indexOf("-") + 1, playersCards[i].length),
                value: playersCards[i].substring(0, playersCards[i].indexOf("-"))
            });
        }
        if (iteration === 0) {
            document.getElementById("playerCards").innerHTML = playerCardsHTML;
            player0Obj = handObj;
        }
        if (iteration === 1) {
            document.getElementById("playerTwoCards").innerHTML = playerCardsHTML;
            player1Obj = handObj;
        }
        evaluateHand(handObj, iteration);
    }
    generatePlayer(0);
    generatePlayer(1);
}



function replace(whichCard) {

    document.querySelector("button[title='play']").classList.add("hide");
    document.querySelector("button[title='round-two']").classList.remove("hide");
    activeRound = 2;
    cardReplacements.push(Number(whichCard));
    let tempHand = player0Obj;
    let availableCards = [];
    let playerCardsHTML = "";


    const allCards = JSON.parse(localStorage.getItem("completeCards"));
    for (let i = 0; i < allCards.length; i++) {
        if (usedCardsArr.indexOf(allCards[i].title) === -1) {
            availableCards.push(allCards[i].title);
        }
    }

    for (let i = 0; i < tempHand.length; i++) {
        if (i === Number(whichCard)) {
            const newNum = generate(availableCards);
            tempHand[i] = {
                suit: availableCards[newNum].substring(availableCards[newNum].indexOf("-") + 1, availableCards[newNum].length),
                value: availableCards[newNum].substring(0, availableCards[newNum].indexOf("-"))
            }
        }
        playerCardsHTML = playerCardsHTML + "<div class='card " + tempHand[i].value + "-" + tempHand[i].suit + "' ></div>";
    }
    console.log("JSON.stringify(tempHand): " + JSON.stringify(tempHand));

    console.log("playerCardsHTML: " + playerCardsHTML);



    player0Obj = tempHand;

    // evaluateHand(tempHand, 0);
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