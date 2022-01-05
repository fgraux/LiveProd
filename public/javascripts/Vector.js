function Vector (magnitude, angle) {
    var m, a;

    this.getX = function () {
        return m * Math.cos(a);
    };

    this.setX = function (x) {
        var y = m * Math.sin(a);
        m = Math.sqrt((x * x) + (y * y));
        a = Math.atan2(y, x);
    };

    this.getY = function () {
        return m * Math.sin(a);
    };

    this.setY = function (y) {
        var x = m * Math.cos(a);
        m = Math.sqrt((x * x) + (y * y));
        a = Math.atan2(y, x);
    };

    this.getMag = function () {
        return m;
    };

    this.setMag = function (magnitude) {
        m = magnitude;
    };

    this.getAngle = function () {
        return a;
    };

    this.setAngle = function (angle) {
        a = angle;
    };

    this.add = function (v) {
        return Vector.add(this, v);
    };

    this.subtract = function (v) {
        return Vector.subtract(this, v);
    };

    this.setMag(magnitude);
    this.setAngle(angle);
}

Vector.rectangular = function (x, y) {
    var m = Math.sqrt(x * x + y * y),
        a = Math.atan2(y, x);
    return new Vector(m, a);
};

Vector.polar = function (m, a) {
    return new Vector(m, a);
};

Vector.add = function (v1, v2) {
    return Vector.rectangular(v1.getX() + v2.getX(), v1.getY() + v2.getY());
};

Vector.subtract = function (v1, v2) {
    return Vector.rectangular(v1.getX() - v2.getX(), v1.getY() - v2.getY());
};
