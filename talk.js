var $ = Bliss, $$ = Bliss.$;


$$(".takeaway.slide").forEach((slide, i) => slide.style.setProperty("--takeaway", i+1));

$$(".slide > h1:only-child").forEach(h1 => h1.classList.add("balance-lines"));

// Make external links open in a new tab
setTimeout(() => {
	$$('a[href^="https://"]:not([target]), a[href^="http://"]:not([target])').forEach(a => a.target = "_blank");
}, 1000);

$$(".color-reveal .delayed-children, .color-reveal .questions").forEach(div => {
	let questions = $$("div", div);
	div.classList.add("questions-" + questions.length);
});

$$(".demo.slide.reveal").forEach(slide => {
	if (!slide.hasAttribute("data-steps")) {
		slide.setAttribute("data-steps", "1");
	}

	$.create("button", {
		className: "next-item",
		onclick: Inspire.nextItem,
		inside: slide
	});
})
