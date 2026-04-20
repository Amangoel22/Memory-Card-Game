//component returns UI a hook doesn't, hence hook is js not jsx
import { useEffect, useState } from 'react';

export const GameLogic = (cardValues) => {
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]); //to keep track of currently flipped cards
    const [matchedCards, setMatchedCards] = useState([]); //to keep track of matched cards
    const [score, setScore] = useState(0); //to keep track of score
    const [moves, setMoves] = useState(0); //to keep track of moves
    const [isLocked, setIsLocked] = useState(false); //to prevent clicking while cards are being flipped back

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };


    const handleCardClick = (card) => {
        //don't allow click if card is already flipped or matched
        if (card.isFlipped || card.isMatched || isLocked || flippedCards.length === 2) return;

        //now to return
        const newCards = cards.map((c) => { //creating a new array of copied cards, when clicked it matches id of card and sets isFlipped to true
            if (c.id === card.id) {
                return { ...c, isFlipped: true };
            }
            return c;
        });
        setCards(newCards);
        console.log("Card clicked: ", card); //to check if card is being clicked and to see its details in console


        const newFlippedCards = [...flippedCards, card.id]; //to add the clicked card to flippedCards array
        setFlippedCards(newFlippedCards);

        if (newFlippedCards.length === 2) { //if two cards are flipped, check for match
            setIsLocked(true); //lock the game to prevent further clicks until we check for match
            const firstCard = cards[newFlippedCards[0]];

            if (firstCard.value === card.value) {
                setTimeout(() => {
                    //if match, set isMatched to true for both cards
                    setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
                    setScore((prev) => prev + 1); //increment score
                    setCards((prev) =>
                        prev.map((c) => {
                            if (c.id === card.id || c.id === firstCard.id) {
                                return { ...c, isMatched: true };
                            }
                            else { return c; }
                        }));
                    setFlippedCards([]); //reset flippedCards array
                    setIsLocked(false); //unlock the game
                }, 500);
            }
            else {
                //if not a match, flip them back after a short delay
                setTimeout(() => {
                    const flippedBackCards = newCards.map((c) => {
                        if (newFlippedCards.includes(c.id) || c.id === card.id) {
                            return { ...c, isFlipped: false };
                        }
                        else {
                            return c;
                        }
                    });
                    setCards(flippedBackCards);
                    setFlippedCards([]); //reset flippedCards array
                    setIsLocked(false);
                }, 1000);
            }

            setMoves((prev) => prev + 1); //increment moves
        }
    };


    const initializeCards = () => {
        //shuffling
        const shuffled = shuffleArray(cardValues);

        const finalCards = shuffled.map((value, index) => ({
            id: index,
            value: value,
            isFlipped: false,
            isMatched: false,
        }));

        setCards(finalCards);
        setMoves(0);
        setScore(0);
        setFlippedCards([]);
        setMatchedCards([]);
    };

    useEffect(() => {
        initializeCards();  //to render cards when user opens website
    }, []);

    const isGameWon = matchedCards.length === cards.length && cards.length > 0; //check if all cards are matched

    return { cards, score, moves, isGameWon, handleCardClick, initializeCards };
}