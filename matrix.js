function random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

class Matrix {
    constructor(rows, columns) {
        this.rows = (rows) ? rows : 0;
        this.columns = (columns) ? columns : 0;
        this.data = [];

        for (var i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (var j = 0; j < this.columns; j++) {
                this.data[i][j] = 0;
            }
        }
    }

    fill(data) {
        this.data = data;
        this.rows = this.data.length;
        this.columns = this.data[0].length;
    }

    randomize() {
        for (var i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (var j = 0; j < this.columns; j++) {
                this.data[i][j] = Math.random();
                // this.data[i][j] = random(0, 9);
            }
        }
    }

    getMatrix() {
        return this.data;
    }

    getRow(index) {
        return this.data[index];
    }

    getColumn(index) {
        var column = [];
        for (var i = 0; i < this.rows; i++) {
            column.push(this.data[i][index]);
        }
        return column;
    }

    transpose() {
        var data = [];
        for (var i = 0; i < this.columns; i++) {
            data[i] = this.getColumn(i);
        }
        this.fill(data);
    }

    add(m) {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                this.data[i][j] += m.data[i][j];
            }
        }
    }

    scalar(n) {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                this.data[i][j] *= n;
            }
        }
    }

    map(f) {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                var value = this.data[i][j];
                this.data[i][j] = f(value);
            }
        }
    }

    static multiply(a, b) {
        var data = [];
        for (var i = 0; i < a.rows; i++) {
            var row = a.getRow(i);
            data[i] = [];
            for (var j = 0; j < b.columns; j++) {
                var column = b.getColumn(j),
                    sum = 0,
                    k = 0;
                while (k < column.length) {
                    sum += (row[k] * column[k]);
                    k++;
                }
                data[i][j] = sum;
            }
        }
        var nm = new Matrix(a.rows, b.columns);
        nm.fill(data);
        return nm;
    }

    print() {
        console.table(this.data);
    }
}

class NeuralNetwork {
    constructor(input, hidden, output) {
        this.input = input;
        this.hidden = hidden;
        this.output = output;

        this.weightsOnInput = new Matrix(this.hidden, this.input);
        this.weightsOnOutput = new Matrix(this.output, this.hidden);

        this.weightsOnInput.randomize();
        this.weightsOnOutput.randomize();

        this.hidden_bias = new Matrix(this.hidden, 1);
        this.output_bias = new Matrix(this.output, 1);

        this.hidden_bias.randomize();
        this.output_bias.randomize();
    }

    feedforward(input) {
        input.transpose(); // сделать отдельной функцией!!
        var input_layer = input;
        var hidden_layer = Matrix.multiply(this.weightsOnInput, input_layer);
        hidden_layer.add(this.hidden_bias);
        hidden_layer.map(sigmoid);

        var output = Matrix.multiply(this.weightsOnOutput, hidden_layer);
        output.add(this.output_bias);
        output.map(sigmoid);
        output.transpose();

        return output;
    }
}

function sigmoid(value) {
    return 1 / (1 + Math.exp(-value));
}

var input = new Matrix(1, 5);
input.randomize();
input.print();

var nn = new NeuralNetwork(input.data[0].length, 2, 2);

var output = nn.feedforward(input);
output.print();
