const MAX_ROUND = 5;
const MIN_CARD = 0;
const MAX_CARD = 100;
let round = 0;

const $ = id => document.getElementById(id);

function getCard() {
	return String(MIN_CARD + Math.floor((MAX_CARD - MIN_CARD + 1) * Math.random()));
}

function getHand(length) {
	let hand;
	do {
		hand = Array.from({ length }, getCard);
	} while (new Set(hand).size < hand.length);
	return hand;
}

function showOverlay(card) {
	const overlay = $("overlay");
	overlay.classList.remove("hidden");
	overlay.textContent = card;
}

function hideOverlay() {
	$("overlay").classList.add("hidden");
}

function createCardHTML(card) {
	const button = document.createElement("button");
	button.textContent = card;
	button.addEventListener("click", () => {
		showOverlay(card);
		button.remove();

		if (!$("cards").children.length)
			$("next").disabled = false;
	});
	return button;
}

function nextRound() {
	round++;
	if (round > MAX_ROUND) {
		showOverlay("");
		document.body.classList.add("victory");
	}
	$("next").disabled = true;
	$("round").textContent = `${round}/${MAX_ROUND}`;
	for (const card of getHand(round + 1))
		$("cards").appendChild(createCardHTML(card));
}

addEventListener("load", () => {
	$("overlay").addEventListener("click", hideOverlay);
	$("next").addEventListener("click", nextRound);
	$("restart").addEventListener("click", () => location.reload());

	nextRound();
});