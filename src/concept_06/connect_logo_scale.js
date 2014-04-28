var Utility = require('./svg');

module.exports = function logo_scale () {
    var utility = Utility();

    var segments = [{
            from: 'RISD',
            to: 'Grad',
            // scaleUsing: {
            //     func: utility.scaleAnchorY,
            //     args: {
            //         start: 2,
            //         end: 9
            //     }
            // },
            scaleUsing: {
                func: utility.scaleProportionalY,
                args: {}
            },
            original: 'M94.26-15 '+
                'h29.796 ' +
                'c0,0,0.936,8.851,0.936,16.81 '+
                'c0,28.042-15.901,67.37-61.185,67.37' +
                'C10.51,69.18-16,69.185-16,69.185' +
                'v-52' +
                'c0,0,35.921-4.393,48.649,3.758' +
                'c37.861,24.242,29.645,46.777-3.8,80.242' +
                'c-17.027,17.038-44.629,17-44.629,48.653' +
                'c0,18.013,0,24.347,0,24.347'
        }, {
            from: 'Grad',
            to: 'Show',
            scaleUsing: {
                func: utility.scaleProportionalX,
                args: {}
            },
            original: 'M-16-14.786' +
                'c115.039,0.852,371.006,204.5,571.427,115.732' +
                'c157.928-69.948,67.032-178.978-45.405-130.958' +
                'c-141.016,60.226-346.596,300.976-43.016,322.226' +
                'c200,14,457.94-105.579,667.987-104.757' +
                'c24.487,0.096,51.499,0.185,77.013,0.266' +
                'c14.761,0.047,42,0.132,42,0.132'
        }, {
            from: 'Show',
            to: '2014',
            scaleUsing: {
                func: utility.scaleProportionalY,
                args: {}
            },
            original: 'M116.745-15' +
                'c0,0,0,3.103,0,13' +
                'c0,12.82-25.702,19.756-44.745,27' +
                'C44.486,35.467,18,36.02,18,61.5' +
                'c0,26,17.5,36.828,44.778,36.828' +
                'C102.667,98.328,104,51,104,51' +
                'H-16' +
                'v36' +
                'c0,0,39.618,9.865,62,36' +
                'c21.141,24.686,23.541,28,47.023,28' +
                'C108,151,118,151,118,151v47.724'
        }];

    var temp_path = d3.select('body')
        .append('svg')
        .style('display', 'none')
        .append('path');

    segments.forEach(function (d, i) {
        temp_path.attr('d', d.original);
        console.log(temp_path);

        utility.convertToRelative(temp_path.node());

        d.relative = temp_path.attr('d');

        d.scale = d.scaleUsing
                   .func(temp_path.node(), d.scaleUsing.args);
    });

    window.segments = segments;

    return segments;
};