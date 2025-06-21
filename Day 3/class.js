class rectangle{
    constructor(width, height, color){
        this.width = width;
        this.height = height;
        this.color = color;
    }

    area(){
        const area = this.width * this.height;
        return area;
    }

    paint(){
        console.log(`Painting with color ${this.color}.`);
    }
}

const rect = new rectangle(4, 2, "red");
const area = rect.area();
console.log(area);
rect.paint();