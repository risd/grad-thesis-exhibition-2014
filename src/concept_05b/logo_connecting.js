// segment functions take a start
// and and end point. returning
// an array of points that will
// be used to drawn a line connecting
// the start and end.

// both start and end are arrays,
// start = [x,y],  end = [x,y]
module.exports = [{
    from: 'RISD',
    to: 'Grad',
    segment: function (start, end) {
        var delta_x = start[0] - end[0],
            delta_y = end[1] - start[1];

        var d = 'M' + start[0] + ',' + start[1];

        d += ' c '+
             //cp1
             '0,0 ' +
             //cp2
             (delta_x * 0.08) + ',0 ' +
             //x,y
             (delta_x * 0.1) + ',' +
             (0);

             // total progress
             // x: 0.1
             // y: 0

        d += ' c ' +
             //cp1
             (delta_x * 0.18) + ',0 '+
             //cp2
             (delta_x * 0.18) + ',' + (delta_y * 0.4) + ' ' +
             //x,y
             (0) + ',' +
             ((delta_y * 0.4));
             
             // total progress
             // x: 0.1
             // y: 0.4

        d += ' c ' +
             //cp1
             (-(delta_x * 0.5)) + ',0 '+
             //cp2
             (-(delta_x * 0.9)) + ',' + (-(delta_y * 0.2)) + ' ' +
             //x,y
             (-(delta_x * 1.2)) + ',' +
             ((delta_y * 0.2));
             
             // total progress
             // x: -1.1
             // y: 0.6

        d += ' c ' +
             //cp1
             (-(delta_x * 0.09)) + ',' + (delta_y * 0.09) + ' ' +
             //cp2
             (-(delta_x * 0.09)) + ',' + (delta_y * 0.21) + ' ' +
             //x,y
             (0) + ',' +
             ((delta_y * 0.3));

             // total progress
             // x: -1.1
             // y: 0.9

        d += ' c ' +
             //cp1
             ((delta_x * 0.04)) + ',' + (delta_y * 0.04) + ' ' +
             //cp2
             ((delta_x * 0.12)) + ',' + (delta_y * 0.12) + ' ' +
             //x,y
             ((delta_x * 0.09)) + ',' +
             ((delta_y * 0.1));

             // total progress
             // x: -1.01
             // y: 1

        d += ' c 0,0 0,0 ' +
             ((delta_x * 0.01)) + ',' +
             (0);

             // total progress
             // x: -1
             // y: 1

        return d;
    }
}, {
    from: 'Grad',
    to: 'Show',
    segment: function (start, end) {
        var delta_x = start[0] - end[0],
            delta_y = end[1] - start[1];

        var d = 'M' + start[0] + ',' + start[1];

        return d;
    }
}, {
    from: 'Show',
    to: '2014',
    segment: function (start, end) {
        var delta_x = start[0] - end[0],
            delta_y = end[1] - start[1];

        var d = 'M' + start[0] + ',' + start[1];

        return d;
    }
}];