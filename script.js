class Shape {
	static COLORS = ["red", "blue", "green"];
	static SHAPES = ["circle", "square", "diamond"];

	constructor(color, shape) {
		this.color = color;
		this.shape = shape;
    // todo need to investigate ways to pass a method into client-side
		this.class = Shape.COLORS[color] + " " + Shape.SHAPES[shape];
	}
}

app = Vue.createApp({
	data() {
		return {
			x: 0, // Main cycle variable
			xCap: 5, // Number at which x loops around
			xLoop: 5, // Amount subtracted per loop
			boundaries: true, // Do you respect boundaries?
			shapeArray: [
				new Shape(0, 0),
				new Shape(1, 0),
				new Shape(1, 1),
				new Shape(0, 2),
				new Shape(2, 1),
				new Shape(0, 1)
			],
			button1: {
				show: true,
				text: "Click me!"
			}
		};
	},
	methods: {
		click1(e) {
			this.x++;
			if (this.x >= this.xCap) {
				this.x -= this.xLoop;
			}
		},
		click2(e) {
			this.boundaries = false;
		},
		shapeLeft(e) {
			let a = this.shapeArray[0];
			this.shapeArray[0] = this.shapeArray[this.shapeArray.length - 1];
			this.shapeArray[this.shapeArray.length - 1] = a;
		},
		shapeRight(e) {
			this.shapeArray.push(this.shapeArray.shift());
		}
	}
}).mount("#app");
