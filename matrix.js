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

    // заполнение матрицы данными
    fill(data) {
        this.data = data;
        this.rows = this.data.length;
        this.columns = this.data[0].length;
    }

    // заполнение матрицы случайными данными
    randomize(min, max) {
        for (var i = 0; i < this.rows; i++) {
            this.data[i] = [];
            for (var j = 0; j < this.columns; j++) {
                if (min && max) {
                    this.data[i][j] = random(min, max);
                } else {
                    this.data[i][j] = Math.random();
                }
            }
        }
    }

    // получение массива данных из матрицы
    getMatrix() {
        return this.data;
    }

    // получение i-строки матрицы
    getRow(index) {
        return this.data[index];
    }

    // получение i-столбца матрицы
    getColumn(index) {
        var column = [];
        for (var i = 0; i < this.rows; i++) {
            column.push(this.data[i][index]);
        }
        return column;
    }

    // транспонирование матрицы
    transpose() {
        var data = [];
        for (var i = 0; i < this.columns; i++) {
            data[i] = this.getColumn(i);
        }
        this.fill(data);
    }

    // сложение исходной матрицы с матрицей m
    add(m) {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                this.data[i][j] += m.data[i][j];
            }
        }
    }

    // умножение элементов матрицы на скаляр
    scalar(n) {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                this.data[i][j] *= n;
            }
        }
    }

    // применение фуннкции f на элементы матрицы
    map(f) {
        for (var i = 0; i < this.rows; i++) {
            for (var j = 0; j < this.columns; j++) {
                var value = this.data[i][j];
                this.data[i][j] = f(value);
            }
        }
    }

    // вывод матрицы в консоль
    print() {
        console.table(this.data);
    }

    // создание матрицы-столбца из массива
    static createRowMatrixFromArray(array) {
        var nm = new Matrix(array.length, 1);
        nm.fill([array]);
        return nm;
    }

    // получение массива из матрицы-столбца
    static getArrayFromRowMatrix(m) {
        var array = [];
        for (var i = 0; i < m.rows; i++) {
            array.push(m.data[i][0]);
        }
        return array;
    }

    // перемножение двух матриц
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
        var input_layer = Matrix.createRowMatrixFromArray(input);
        var hidden_layer = Matrix.multiply(this.weightsOnInput, input_layer);
        hidden_layer.add(this.hidden_bias);
        hidden_layer.map(sigmoid);

        var output_layer = Matrix.multiply(this.weightsOnOutput, hidden_layer);
        output_layer.add(this.output_bias);
        output_layer.map(sigmoid);

        return Matrix.getArrayFromRowMatrix(output_layer);
    }
}

function sigmoid(value) {
    return 1 / (1 + Math.exp(-value));
}

var input = [0, 1];
var nn = new NeuralNetwork(input.length, 2, 1);
var output = nn.feedforward(input);

console.log(output);
