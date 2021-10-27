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
