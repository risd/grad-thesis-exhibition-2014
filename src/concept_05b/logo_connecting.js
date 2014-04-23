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
             (-(delta_x * 0.4137)) + ',0 '+
             //cp2
             (-(delta_x * 1)) + ',' + (-(delta_y * 0.128)) + ' ' +
             //x,y
             (-(delta_x * 1.206)) + ',' +
             ((delta_y * 0.03));
             
             // total progress
             // x: -1.106
             // y: 0.43

        d += ' c ' +
             //cp1
             (-(delta_x * 0.148)) + ',' + (delta_y * 0.13244) + ' ' +
             //cp2
             (-(delta_x * 0.15)) + ',' + (delta_y * 0.3908) + ' ' +
             //x,y
             (0) + ',' +
             ((delta_y * 0.549));

             // total progress
             // x: -1.106
             // y: 0.9727

        d += ' c ' +
             //cp1
             ((delta_x * 0.03310)) + ',' + (delta_y * 0.01145) + ' ' +
             //cp2
             ((delta_x * 0.0675)) + ',' + (delta_y * 0.01870) + ' ' +
             //x,y
             ((delta_x * 0.0915)) + ',' +
             ((delta_y * 0.0188));

             // total progress
             // x: -1.106 + 0.0915 = -1.0145
             // y: 0.9727 + 0.0273 = 1.0

        d += ' c ' +
             //cp1
             ((delta_x * 0.024)) + ',' + (delta_y * 0) + ' ' +
             //cp2
             ((delta_x * 0.024)) + ',' + (delta_y * 0) + ' ' +
             //x,y
             ((delta_x * 0.0365)) + ',' +
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

        d += ' c '+
             //cp1
             (delta_x * 0.0481637478756) + ',0 ' +
             //cp2
             (delta_x * 0.0847336141284) + ',0 ' +
             //x,y
             (delta_x * 0.111549545555) + ',' +
             (0);

        d += ' c ' +
             //cp1
             ((delta_x * 0)) + ',' +
             (delta_y * 0) + ' ' +
             //cp2
             ((delta_x * -0.113027414468)) + ',' +
             (delta_y * -0.498616793298) + ' ' +
             //x,y
             ((delta_x * -0.365824281386)) + ',' +
             (delta_y * -0.738116111436);

        d += ' c ' +
             //cp1
             ((delta_x * -0.330894849627)) + ',' +
             (delta_y * -0.218897330996) + ' ' +
             //cp2
             ((delta_x * -0.705298160053)) + ',' +
             (delta_y * -0.140405221118) + ' ' +
             //x,y
             ((delta_x * -0.978703908963)) + ',' +
             (delta_y * 0.053263198909);

        d += ' c ' +
             //cp1
             ((delta_x * -0.383152294391)) + ',' +
             (delta_y * 0.273777518021) + ' ' +
             //cp2
             ((delta_x * -0.530990911106)) + ',' +
             (delta_y * 1.0091954023) + ' ' +
             //x,y
             ((delta_x * -0.239385206532)) + ',' +
             (delta_y * 1.4154880187);

        d += ' c ' +
             //cp1
             ((delta_x * 0.0713293430873)) + ',' +
             (delta_y * 0.137385544516) + ' ' +
             //cp2
             ((delta_x * 0.239385206532)) + ',' +
             (delta_y * 0.282232612507) + ' ' +
             //x,y
             ((delta_x * 0.35666888347)) + ',' +
             (delta_y * 0.282232612507);

        d += ' c ' +
             //cp1
             ((delta_x * 0.0355575260474)) + ',' +
             (delta_y * 0) + ' ' +
             //cp2
             ((delta_x * 0.0406340057637)) + ',' +
             (delta_y * 0) + ' ' +
             //x,y
             ((delta_x * 0.0795093475209 )) + ',' +
             (delta_y * 0);

        return d;
    }
}];