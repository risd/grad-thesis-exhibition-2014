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

        var points = [start];

        points.push([start[0] + 10, start[1]]);
        points.push([start[0] + (delta_x*(1/5)),
                     start[1] + (delta_y*(1/8))]);
        points.push([start[0] + (delta_x*(1/5)),
                     start[1] + (delta_y*(4/6))]);


        points.push([end[0] - (delta_x*(1/3)),
                     end[1] - (delta_y*(4/6))]);
        points.push([end[0] - (delta_x*(1/4)),
                     end[1] - (delta_y*(1/8))]);

        points.push(end);
        return points;
    }
}, {
    from: 'Grad',
    to: 'Show',
    segment: function (start, end) {
        var delta_x = end[0] - start[0],
            delta_y = end[1] - start[1];

        var points = [start];

        points.push([start[0] + (delta_x*(1/3)),
                     start[1] + (delta_y*(1/6))]);
        points.push([start[0] + (delta_x*(1/3)),
                     start[1] + (delta_y*(4/6))]);


        points.push([end[0] - (delta_x*(1/3)),
                     end[1] - (delta_y*(4/6))]);
        points.push([end[0] - (delta_x*(1/4)),
                     end[1] - (delta_y*(1/6))]);

        points.push(end);
        return points;
    }
}, {
    from: 'Show',
    to: '2014',
    segment: function (start, end) {
        var delta_x = end[0] - start[0],
            delta_y = end[1] - start[1];

        var points = [start];

        points.push([start[0] + (delta_x*(1/3)),
                     start[1] + (delta_y*(1/6))]);
        points.push([start[0] + (delta_x*(1/3)),
                     start[1] + (delta_y*(4/6))]);


        points.push([end[0] - (delta_x*(1/3)),
                     end[1] - (delta_y*(4/6))]);
        points.push([end[0] - (delta_x*(1/4)),
                     end[1] - (delta_y*(1/6))]);

        points.push(end);
        return points;
    }
}];