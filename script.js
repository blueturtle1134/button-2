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
            xCap: 4, // Number at which x loops around
            xLoop: 4, // Amount subtracted per loop
            boundaries: true, // Do you respect boundaries?
            button1: {
                show: true,
                text: "Click me!"
            },
            shapeArray: [
                new Shape(0, 0),
                new Shape(1, 0),
                new Shape(1, 1),
                new Shape(0, 2),
                new Shape(2, 2),
                new Shape(0, 1)
            ],
            numberArray: [3, 4, 5],
        };
    },
    methods: {
        /* The basic button cycle */
        click1(e) {
            this.x++;
            if (this.x >= this.xCap) {
                this.x -= this.xLoop;
            }
        },
        /* Button that doesn't want to be clicked */
        click2(e) {
            this.boundaries = false;
        },
		/* Helper to generate ornamented arrows */
		getShapeArrow(right) {
			let eCap = (this.xCap-2)%10;
			let modCap = Math.ceil((this.xCap-2)/10);
			let result = "";
			if(eCap > 5) {
				for(let i = 0; i<eCap-5; i++) {
					result += "="
				}
			}
			else {
				for(let i = 0; i<eCap; i++) {
					result += "-";
				}
			}
			if(this.xLoop < this.xCap) {
				if(right) {
					result = "|" + result;
				}
				else {
					result += "|";
				}
			}
			else if (this.xLoop > this.xCap) {
				if(right) {
					result += "|";
				}
				else {
					result = "|" + result;
				}
			}
			if(right){
				for(let i = 0; i<modCap; i++){
					result += ">";
				}
			} else{
				for(let i = 0; i<modCap; i++){
					result = "<" + result;
				}
			}
			return result;
		},
        /* The shape game */
        shapeLeft(e) {
            let a = this.shapeArray[0];
            this.shapeArray[0] = this.shapeArray[this.shapeArray.length - 1];
            this.shapeArray[this.shapeArray.length - 1] = a;
        },
        shapeRight(e) {
            this.shapeArray.push(this.shapeArray.shift());
        },
        /* The number game */
        numbersClick(e) {
            let id = parseInt(e.target.id) - 1;
            let green = this.numberArray[id] == 0;
            if (id == 0) {
                this.numberArray[1] += this.numberArray[0];
                this.numberArray[2] += this.numberArray[0];
            } else if (id == 1 && this.boundaries) {
                for (let i = 0; i < this.numberArray.length; i++) {
                    if (Math.abs(this.numberArray[i]) >= 10) {
                        this.numberArray[i] = Math.round(this.numberArray[i] / 10);
                    }
                }
                return;
            } else if (id == 2) {
                this.numberArray[0] -= this.numberArray[2];
                this.numberArray[1] -= this.numberArray[2];
            } else {
                // If nothing has been found, this is a invalid space
                return;
            }
            this.numberArray.push(this.numberArray.shift());
            if (green) {
                this.shapeArray[0] = new Shape(2, 1);
            }
        }
    }
}).mount("#app");
