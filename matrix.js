function random(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
}

function Matrix(rows, columns) {
    this.rows = (rows) ? rows : 0;
    this.columns = (columns) ? columns : 0;
    this.matrix = [];

    this.fill = function (matrix) {
        if (matrix) {
            this.matrix = matrix;
            this.rows = this.matrix.length;
            this.columns = this.matrix[0].length;
        } else {
            for (var i = 0; i < this.rows; i++) {
                this.matrix[i] = [];
                for (var j = 0; j < this.columns; j++) {
                    this.matrix[i][j] = random(0, 9);
                }
            }
        }
    }

    this.fill();

    this.getMatrix = function () {
        return this.matrix;
    }

    this.getRow = function (index) {
        return this.matrix[index];
    }

    this.getColumn = function (index) {
        var column = [];
        for (var i = 0; i < this.rows; i++) {
            column.push(this.matrix[i][index]);
        }
        return column;
    }

    this.transpose = function () {
        var matrix = [];
        for (var i = 0; i < this.columns; i++) {
            matrix[i] = this.getColumn(i);
        }
        this.fill(matrix);
    }

    this.multiply = function (m) {
        var matrix = [];
        for (var i = 0; i < this.rows; i++) {
            var row = this.getRow(i);
            matrix[i] = [];
            for (var j = 0; j < m.columns; j++) {
                var column = m.getColumn(j),
                    sum = 0,
                    k = 0;
                while (k < column.length) {
                    sum += (row[k] * column[k]);
                    k++;
                }
                matrix[i][j] = sum;
            }
        }
        var nm = new Matrix(this.rows, m.columns);
        nm.fill(matrix);
        return nm;
    }

    this.draw = function (out) {
        var str = '<table><tr><td></td>';
        for (var i = 0; i < this.columns; i++) {
            str += '<td>C' + i + '</td>';
        }
        str += '</tr>';
        for (var i = 0; i < this.rows; i++) {
            str += '<tr><td>R' + i + '</td>';
            for (var j = 0; j < this.columns; j++) {
                str += '<td>' + this.matrix[i][j] + '</td>';
            }
            str += '</tr>';
        }
        str += '</table>';
        out.innerHTML += str;
    }
}

var output = document.getElementById('output');

var a = new Matrix(1, 5),
    b = new Matrix(1, 5);

a.fill();
b.fill();

var c = a.multiply(b);

c.draw(output);

// var a = new Matrix(2, 3);
//
// var m1 = a.getMatrix();
//
// a.transpose();
//
// var m2 = a.getMatrix();
//
// var a = new Matrix(),
//     b = new Matrix();
//
// a.fill(m1);
// b.fill(m2);
//
// var c = a.multiply(b);
//
// a.draw(output);
// b.draw(output);
// c.draw(output);
