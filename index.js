const MAX_ROUND = 10;
const MIN_CARD = 0;
const MAX_CARD = 100;
const MIN_COLOR = [238, 238, 255];
const MAX_COLOR = [238, 255, 239];
let round = 0;
let won = false;

const $ = id => document.getElementById(id);

function getCard() {
	const t = Math.random();
	const value = MIN_CARD + Math.floor((MAX_CARD - MIN_CARD + 1) * t);
	const color = `rgb(${MIN_COLOR.map((v, i) => {
		return v * (1 - t) + MAX_COLOR[i] * t;
	})}`;
	return { value, color };
}

function getHand(length) {
	let hand;
	do {
		hand = Array.from({ length }, getCard);
	} while (new Set(hand).size < hand.length);
	return hand.sort((a, b) => a.value - b.value);
}

function showOverlay(card) {
	const overlay = $("overlay");
	overlay.classList.remove("hidden");
	overlay.textContent = card.value;
	overlay.style.background = card.color;
}

function hideOverlay() {
	$("overlay").classList.add("hidden");
}

function createCardHTML(card) {
	const button = document.createElement("button");
	button.textContent = card.value;
	button.style.background = card.color;
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
		showOverlay({
			value: "WE WON!",
			color: "lime"
		});
		won = true;
		document.body.classList.add("victory");
	}
	$("next").disabled = true;
	$("round").textContent = `${round}/${MAX_ROUND}`;
	for (const card of getHand(round + 1))
		$("cards").appendChild(createCardHTML(card));
}

function restart() {
	if (won || confirm("Restart?"))
		location.reload();
}

addEventListener("load", () => {
	$("overlay").addEventListener("click", () => {
		if (won) {
			restart();
		} else {
			hideOverlay();
		}
	});
	$("next").addEventListener("click", nextRound);
	$("restart").addEventListener("click", restart);

	nextRound();
});