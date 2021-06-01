var $ = Bliss, $$ = Bliss.$;

$$(".takeaway.slide").forEach((slide, i) => slide.style.setProperty("--takeaway", i+1));

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
});

$$(".math").forEach(math => {
	math.classList.add("delayed-children");

	for (let li of math.children) {
		li.innerHTML = li.innerHTML.replace(/\b[a-z]+\b/g, "<var>$&</var>");
	}

});

$$("header.slide[style*='--icon']").forEach(slide => {
	let icon = slide.style.getPropertyValue("--icon").trim();
	let style = "font-size: 30px;";
	let styleFlipped = "transform: scaleX(-1); transform-origin: center; transform-box: fill-box;"

	slide.style.setProperty("--icon-svg", `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text style="${style}" x="20" y="50">${icon}</text></svg>')`)
	slide.style.setProperty("--icon-svg-flipped", `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text style="${style} ${styleFlipped}" x="20" y="50">${icon}</text></svg>')`)

});

(async () => {

await Inspire.importsLoaded;

// Reduced slide deck for attendees to follow along with certain activities
if (Inspire.profile !== "speaker") {
	let keep = `header, footer, .demo, .browser-support, .allow-attendee, [data-insert]`;
	let remove = `.speaker-only, .demo.reveal`;
	let slidesToRemove = $$(`.slide:not(${keep}), ${remove}`);

	slidesToRemove.forEach(slide => slide.remove());

	// Remove empty sections
	$$("header.slide:only-child").forEach(slide => slide.remove());
}

})();

$$("#day-end ~ section .slide, #day-end ~ .slide").forEach(s => s.remove());
