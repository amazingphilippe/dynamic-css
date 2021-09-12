if (typeof PaintWorkletGlobalScope === "undefined") {
	// We are not in a paint worklet, register our worklet
	CSS.paintWorklet.addModule(import.meta.url);
	await new Promise(x => 0);
}
else {
	// We are in a paint worklet! Let’s paint! 🎨
	registerPaint("image", class {
		// Custom properties from element's style to look for
		static get inputProperties() { return ['--accent-color']; }

		// Whether Alpha is allowed?
		static get contextOptions() { return {alpha: true}; }

		paint(ctx, size, properties) {
			ctx.fillStyle = properties.get("--accent-color") || "red";
			ctx.fillRect( /* order: x, y, w, h */
				(size.width / 10) * Math.random(),
				(size.height / 10) * Math.random(),
				size.width * Math.random(),
				size.height * Math.random()
			);
			ctx.font = '48px serif';
  			ctx.fillText('Hello world', 10, 50);
		}
	});
}
