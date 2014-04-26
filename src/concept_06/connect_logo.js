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
        var current_delta = {
                x: start[0] - end[0],
                y: end[1] - start[1]
            },
            drawn_delta = {
                x: 115.253,
                y: 189.185
            };

        var d = 'M' + start[0] + ',' + start[1];

        d += 'c0,0 0.936,8.851 0.936,' +
             (16.81+((current_delta.y-drawn_delta.y)/2)) +
             'c0,28.042-15.901,67.37-61.185,67.37' +
             'c-53.297,0 -79.807,0 -79.807,0'+
             'l0-52 ' +
             'c0,0,35.921-4.393,48.649,3.758' +
             'c37.861,24.242,29.645,46.777-3.8,80.242' +
             'c-17.027,17.038-44.629,17-44.629,48.653 '+
             'c0,18.013,0,24.347,0,' +
             (24.347+((current_delta.y-drawn_delta.y)/2));

        if (current_delta.x > drawn_delta.x) {
            d += 'l' + (current_delta.x - drawn_delta.x)  + ',0';
        }

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
             ((delta_x * 0.113027414468)) + ',' +
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
             ((delta_x * -0.968703908963)) + ',' +
             (delta_y * 0.053263198909);

        d += ' c ' +
             //cp1
             ((delta_x * -0.383152294391)) + ',' +
             (delta_y * 0.273777518021) + ' ' +
             //cp2
             ((delta_x * -0.530990911106)) + ',' +
             (delta_y * 1.0091954023) + ' ' +
             //x,y
             ((delta_x * -0.209385206532)) + ',' +
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
             (delta_y * 0.272232612507);

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