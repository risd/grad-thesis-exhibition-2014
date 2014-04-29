(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var Nav = require('./overlay/nav'),
    Logo = require('./logo/index');

site()
    .colors()
    .overlay()
    .logo();

function site () {
    var self = {},
        color_values = {
            purple: 'rgb(38, 34, 98);',
            orange: 'rgb(255, 61, 56);',
            'lt-purple': 'rgb(146, 53, 125)',
            blue: 'rgb(43, 89, 184)'
        },
        use_images_as_overlay_background = true,
        background_image_rotation_method = 'block',
        background_image_rotation_methods = ['fade', 'block'],
        body = d3.select('body');

    var colors = Object.keys(color_values);

    var nav = Nav();
    var logo = Logo();

    self.colors = function () {
        var random_index = Math.floor(Math.random() * colors.length);

        var color = colors[random_index];
        var alt_colors = colors.slice(0,random_index)
                               .concat(colors.slice(
                                                random_index + 1,
                                                colors.length));

        var alt_color = alt_colors[
                            Math.floor(
                                Math.random() *
                                alt_colors.length)];

        body.classed('body-' + color, true);
        body.classed('body-alt-' + alt_color, true);

        return self;
    };

    self.overlay = function () {
        var pairs = d3.selectAll('.overlay-nav-item')
            .datum(function () { return this.dataset; });

        nav.selection(pairs)
            .setup();

        // setup click tracking with google analytics
        nav.dispatch
            .on('asteriskClick', function (overlaid_boolean) {
                if (!_gaq) return;
                if (overlaid_boolean) {
                    // opening
                    _gaq.push(['_trackEvent',
                               'GoButton',
                               'Asterisk Click - Open',
                               'Home',
                               1,
                               true]);
                } else {
                    // closing
                    _gaq.push(['_trackEvent',
                               'GoButton',
                               'Asterisk Click - Close',
                               'About',
                               2,
                               true]);
                }
            });

        return self;
    };

    self.logo = function () {
        logo.container(d3.select('.logo-line'))
            .attachResize()
            .dupeContainer(d3.select('.overlay .logo-line'))
            .render();

        return self;
    };

    return self;
}
},{"./logo/index":2,"./overlay/nav":6}],2:[function(require,module,exports){
var connectLogoScale = require('./scale');
var Utility = require('./svg');

module.exports = function logo () {
    var self = {},
        window_sel = d3.select(window),
        logo_container_sel,
        dupe_logo_container_sel,
        logo_svg,
        logo_text_sel,
        logo_line_text_sel,
        logo_line_connecting_sel,
        logo_line_merged_sel,
        straight_line = d3.svg.line(),
        connect_logo_scale = connectLogoScale();

    var utility = Utility();

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.dupeContainer = function (_) {
        if (!arguments.length) return dupe_logo_container_sel;
        dupe_logo_container_sel = _;
        return self;
    };

    self.attachResize = function () {
        window_sel
            .on('resize.logo', function () {
                var window_width = window.innerWidth,
                    window_height = window.innerHeight;

                logo_svg
                    .attr('width', window_width)
                    .attr('height', window_height);

                // if (logo_line_connecting_sel) {
                if (logo_line_merged_sel) {
                    update_logo_line(window_width, window_height);
                }

                if (dupe_logo_container_sel) {
                    dupe_logo_container_sel
                        .html(logo_container_sel.html());
                }
            });
        return self;
    };

    self.render = function () {
        // set up svg
        var window_width = window.innerWidth,
            window_height = window.innerHeight;

        logo_svg = logo_container_sel
            .append('svg')
                .attr('class', 'logo-svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight);

        // selection of the text that will define the line
        logo_text_sel = d3.select('header')
                          .selectAll('.logo-text-component');

        d3.select('body').classed('to-reveal', false);

        // verticies for 
        var text_verticies = logo_line_text_verticies(logo_text_sel);
        var connecting_segments =
                logo_line_connecting_segments(text_verticies,
                                              window_width,
                                              window_height);

        var merged_d = merge_lines(text_verticies,
                                   connecting_segments);

        logo_line_merged_sel = logo_svg.selectAll('.logo-line-merged')
            .data([merged_d])
            .enter()
            .append('path')
                .attr('class', 'logo-line-merged')
                .attr('d', function (d) { return d; });

        logo_line_merged_sel.call(tween_in);


        // logo_line_text_sel = logo_svg.selectAll('.logo-line-text')
        //     .data(text_verticies)
        //     .enter()
        //     .append('path')
        //         .attr('class', 'logo-line-text')
        //         .attr('d', straight_line);

        // logo_line_connecting_sel =
        //     logo_svg
        //         .selectAll('.logo-line-connecting')
        //         .data(connecting_segments)
        //         .enter()
        //         .append('path')
        //             .attr('class', 'logo-line-connecting')
        //             .attr('d', function (d) { return d; });

        if (dupe_logo_container_sel) {
            dupe_logo_container_sel
                .html(logo_container_sel.html());
        }
    };

    function update_logo_line (wwidth, wheight) {
        console.log('update_logo_line');
        var text_verticies = logo_line_text_verticies(logo_text_sel);
        var connecting_segments =
                logo_line_connecting_segments(text_verticies,
                                              wwidth,
                                              wheight);

        var merged_d = merge_lines(text_verticies,
                                   connecting_segments);

        logo_line_merged_sel
            .data([merged_d])
            .attr('d', function (d) { return d; });

        // logo_line_text_sel
        //     .data(text_verticies)
        //     .attr('d', straight_line);

        // logo_line_connecting_sel
        //     .data(connecting_segments)
        //     .attr('d', function (d) { return d; });
    }

    function logo_line_text_verticies (sel) {
        var text_verticies = [];

        sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            var first, second;
            if (i === 0) {
                first = [bounds.left + 3,
                     (bounds.top + (bounds.height*(0.55)))];
            } else {
                first = [bounds.left - 6,
                     (bounds.top + (bounds.height*(0.55)))];
            }

            second = [bounds.right + 6,
                 (bounds.top + (bounds.height*(0.55)))];

            text_verticies.push([first, second]);

        });

        return text_verticies;
    }

    function logo_line_connecting_segments(start_end_points,
                                           wwidth,
                                           wheight) {
        var line_size_to_draw =
                connect_logo_scale.choose_size(wwidth, wheight);

        var connecting_segments = [];
        for (var i = 0; i < start_end_points.length; i++) {
            if ((i+1) < start_end_points.length) {
                var start = start_end_points[i][1],
                    end = start_end_points[i+1][0];

                connecting_segments
                    .push(
                        connect_logo_scale
                            [i]
                            .scale
                            [line_size_to_draw](start, end));
            }
        }
        return connecting_segments;
    }

    function merge_lines(text_verticies, connecting_segments) {
        // takes array of vertex pairs, and path
        // elements of connecting segments.
        // returns on path d attribute
        var d = '';

        var temp_svg = d3.select('body')
            .append('svg');
        var temp_path = temp_svg
            .selectAll('temp-path')
            .data(text_verticies)
            .enter()
            .append('path')
            .attr('d', straight_line)
            .attr('class', 'temp-path')
            .style('display', 'none');

        temp_path.each(function (td, ti) {
            // console.log(td);
            var text_d = d3.select(this).attr('d');
            d += text_d;
            if (connecting_segments[ti]) {
                var connecting_d = connecting_segments[ti];
                d += connecting_d;
            }
        });

        utility.convertToRelative(temp_path.attr('d', d).node());
        // replace all `m` instructions with `l`, except
        // for the first one. this is a reverse regex
        d = temp_path.attr('d').replace(/(?!^)m/g, 'l');

        temp_svg.remove();
        temp_path.remove();

        return d;
    }

    function tween_in(path) {
        path.transition()
            .duration(8000)
            .attrTween('stroke-dasharray', tweenDash);
    }

    function tweenDash() {
        var l = this.getTotalLength(),
            i = d3.interpolateString('0,' + l, l + "," + l);
        return function (t) { return i(t); };
    }

    return self;
};
},{"./scale":3,"./svg":4}],3:[function(require,module,exports){
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
            scaleUsing: utility.scaleProportionalY,
            paths: {
                '300': 'M3.564,0' +
                    'c0,0,0,8.851,0,16.81' +
                    'c0,10.554-41.045,97.981-45.904,198.917' +
                    'c-6.86,142.493,102.049,174.925,199.49,178.491' +
                    'c81.964,3,182.991-31.498,208.49-133.493 ' +
                    'c27.54-110.159-83.347-191.99-187.491-148.493 ' +
                    'C-18.932,194.547-25.869,433.805,61.921,533.29 ' +
                    'c87.729,99.415,26.014,171.339-9.625,181.911 ' +
                    'c-66.138,19.62-118.789-31.498-79.638-94.266 ' +
                    'c44.337-71.081,191.99-63.226,229.489-10.729 ' +
                    'C323.852,780.593-59.136,915.788-59.136,921.43' +
                    'c0,18.013,0,111.65,0,111.65',
                '768': 'M94.26-15 '+
                  'h29.796 ' +
                  'c0,0,0.936,8.851,0.936,16.81 '+
                  'c0,28.042-15.901,67.37-61.185,67.37' +
                  'C10.51,69.18-16,69.185-16,69.185' +
                  'v-52' +
                  'c0,0,35.921-4.393,48.649,3.758' +
                  'c37.861,24.242,29.645,46.777-3.8,80.242' +
                  'c-17.027,17.038-44.629,17-44.629,48.653' +
                  // 'c0,18.013,0,24.347,0,24.347'
                  'c0,0,0,0,0,24.347'
            }
        }, {
            from: 'Grad',
            to: 'Show',
            scaleUsing: utility.scaleProportionalX,
            paths: {
                '300': 'M0-0.138' +
                       'c83.627,0.62,238.755,0,344.14,0',
                '768': 'M0,0 ' +
                   'c0,0 18.861,0.044 25.818,0.095 ' +
                   'c59.896,0.444 450.006,0 450.006,0 ' +
                   'c0,0 0,0 0,248.5 ' +
                   'c0,0 -6.799,0 -68,0 ' +
                   'c-148.266,0 -138,-157.5 0,-157.5 ' +
                   'c110,0 189.628,117.65 302,116 ' +
                   'c147.621,-2.167 193.788,-218.705 193.788,-285.657 ' +
                   'c0,-190.343 -161.788,-128.343 -161.788,-44.343 ' +
                   'c0,52.401 48.777,94.638 123.424,106 ' +
                   'c132.894,20.228 285.105,16.936 301.563,17 ' +
                   'c14.744,0.058 94.147,0.132 94.147,0.132'
                // '768': 'M-16-14.786 ' +
                //     'c115.039,0.852,371.006,14.5,571.427-74.268 ' +
                //     'c157.928-69.948,67.032-178.978-45.405-130.958 ' +
                //     'c-141.016,60.226-346.596,300.976-43.016,322.226' +
                //     'c200,14,457.94-117.822,667.987-117' +
                //     'c24.487,0.096,51.499-0.081,77.013,0' +
                //     'c14.761,0.047,42,0,42,0'
            }
        }, {
            from: 'Show',
            to: '2014',
            scaleUsing: utility.scaleProportionalY,
            paths: {
                '300': 'M73.606-48.689 ' +
                    'c3.037-0.032,5.74-0.052,8.089-0.052 ' +
                    'c15.33,0,6.783-49.626-35.337-51.258 ' +
                    'c-43-1.667-70.75,24-77.333,56 ' +
                    'C-36.526-17.015-14.641,0-1.95,0',
                '768': 'M116.745-15' +
                  'c0,0,0,3.103,0,13 '+
                  'c0,12.82-25.702,19.756-44.745,27' +
                  'C44.486,35.467,18,36.02,18,61.5' +
                  'c0,26,17.5,36.828,44.778,36.828' +
                  'C102.667,98.328,104,51,104,51' +
                  'H-16v36' +
                  'c0,0,39.618,9.865,62,36' +
                  'c21.141,24.686,23.541,28,47.023,28' +
                  'c14.977,0,13.697,0,23.697,0' +
                  'v47.724'
            }
        }];

    var temp_svg = d3.select('body')
        .append('svg')
        .style('display', 'none');
    var temp_path = temp_svg
        .append('path');

    segments.forEach(function (d, i) {
        d.relative_paths_d = {};
        d.relative_paths = {};
        d.scale = {};

        for (var path_size in d.paths) {
            temp_path.attr('d', d.paths[path_size]);
            utility.convertToRelative(temp_path.node());
            d.relative_paths_d[path_size] = temp_path.attr('d');
            d.relative_paths = temp_path.node();
            d.scale[path_size] = d.scaleUsing(d.relative_paths);
        }
    });

    temp_svg.remove();
    temp_path.remove();

    var sizes = Object.keys(segments[0].paths);
    segments.choose_size = function (window_width, window_height) {
        var chosen = 0;
        sizes.forEach(function (d, i) {
            if (d < window_width) {
                chosen = d;
            }
        });
        return chosen.toString();
    };

    window.segments = segments;

    return segments;
};
},{"./svg":4}],4:[function(require,module,exports){
module.exports = function svg () {
    var self = {};

    self.convertToRelative = function (path) {
        function set(type) {
            var args = [].slice.call(arguments, 1),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            segs.replaceItem(rseg, i);
        }
        var dx, dy, x0, y0, x1, y1, x2, y2,
            segs = path.pathSegList;
        for (var x = 0, y = 0, i = 0, len = segs.numberOfItems;
             i < len;
             i++) {
            
            var seg = segs.getItem(i),
                c   = seg.pathSegTypeAsLetter;

            if (/[MLHVCSQTAZz]/.test(c)) {
                if ('x1' in seg) x1 = seg.x1 - x;
                if ('x2' in seg) x2 = seg.x2 - x;
                if ('y1' in seg) y1 = seg.y1 - y;
                if ('y2' in seg) y2 = seg.y2 - y;
                if ('x'  in seg) dx = -x + (x = seg.x);
                if ('y'  in seg) dy = -y + (y = seg.y);
                switch (c) {
                    case 'M':
                        set('Moveto',dx,dy);
                        break;
                    case 'L':
                        set('Lineto',dx,dy);
                        break;
                    case 'H':
                        set('LinetoHorizontal',dx);
                        break;
                    case 'V':
                        set('LinetoVertical',dy);
                        break;
                    case 'C':
                        set('CurvetoCubic',dx,dy,x1,y1,x2,y2);
                        break;
                    case 'S':
                        set('CurvetoCubicSmooth',dx,dy,x2,y2);
                        break;
                    case 'Q':
                        set('CurvetoQuadratic',dx,dy,x1,y1);
                        break;
                    case 'T':
                        set('CurvetoQuadraticSmooth',dx,dy);
                        break;
                    case 'A':
                        set('Arc',dx,dy,seg.r1,seg.r2,seg.angle,
                            seg.largeArcFlag,seg.sweepFlag);
                        break;
                    case 'Z': case 'z': x = x0; y = y0; break;
                }
            } else {
                if ('x' in seg) x += seg.x;
                if ('y' in seg) y += seg.y;
            }
            // store the start of a subpath
            if (c == 'M' || c == 'm') {
                x0 = x;
                y0 = y;
            }
        }
        path.setAttribute('d',
                          path.getAttribute('d')
                              .replace(/Z/g, 'z'));
    };

    self.pathDelta = function (path) {
        var delta = {
            x: 0,
            y: 0
        };

        var start = path.getPointAtLength(0),
            end = path.getPointAtLength(path.getTotalLength());

        delta.x = end.x - start.x;
        delta.y = end.y - start.y;

        return delta;
    };

    // pass in a path element
    // and the path segement indicies
    // that will be scaled
    self.scaleAnchorY = function (path, anchors) {
        // console.log('scaleAnchorY');
        var delta = {
                drawn: self.pathDelta(path)
            },
            original_d = path.getAttribute('d');

        return function (start, end) {
            // current delta
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            for (var name in anchors) {
                var to_replace = segments.getItem(anchors[name]);
                var replace_with =
                    path.createSVGPathSegCurvetoCubicRel(
                        to_replace.x,
                        to_replace.y + ((delta.current.y-
                                         delta.drawn.y)/2),
                        to_replace.x1,
                        to_replace.y1,
                        to_replace.x2,
                        to_replace.y2);
                segments.replaceItem(replace_with, anchors[name]);
            }

            return path.getAttribute('d');
        };
    };

    self.scaleProportional = function (path) {
        var delta = {
                drawn: self.pathDelta(path)
            },
            original_d = path.getAttribute('d');

        function replace(all_segments, segment_to_replace, type) {
            var args = [].slice.call(arguments, 3),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            all_segments.replaceItem(rseg, segment_to_replace);
        }

        return function (start, end) {
            // console.log('scaleProportional');
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };
            var ratio = {
                x: delta.current.x/delta.drawn.x,
                y: delta.current.y/delta.drawn.y
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            var dx, dy, x1, y1, x2, y2,
                x = start[0],
                y = start[1];
            for (var i = 1; i < segments.numberOfItems; i++) {
                var seg = segments.getItem(i),
                    c = seg.pathSegTypeAsLetter;

                if ('x1' in seg) x1 = seg.x1 * ratio.x;
                if ('x2' in seg) x2 = seg.x2 * ratio.x;
                if ('y1' in seg) y1 = seg.y1 * ratio.y;
                if ('y2' in seg) y2 = seg.y2 * ratio.y;
                if ('x'  in seg) dx = seg.x  * ratio.x;
                if ('y'  in seg) dy = seg.y  * ratio.y;

                switch (c) {
                    case 'm':
                        replace(segments, i, 'Moveto', dx, dy);
                        break;
                    case 'l':
                        replace(segments, i, 'Lineto', dx, dy);
                        break;
                    case 'h':
                        replace(segments, i, 'LinetoHorizontal', dx);
                        break;
                    case 'v':
                        replace(segments, i, 'LinetoVertical', dy);
                        break;
                    case 'c':
                        replace(segments, i, 'CurvetoCubic',
                                dx,dy,x1,y1,x2,y2);
                        break;
                    case 's':
                        replace(segments, i, 'CurvetoCubicSmooth',
                                dx,dy,x2,y2);
                        break;
                }

            }

            return path.getAttribute('d');
        };
    };

    self.scaleProportionalY = function (path) {
        // scale y, fit x
        var delta = {
                drawn: self.pathDelta(path)
            },
            original_d = path.getAttribute('d'),
            fit_x = false;

        function replace(all_segments, segment_to_replace, type) {
            var args = [].slice.call(arguments, 3),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            all_segments.replaceItem(rseg, segment_to_replace);
        }
        if (Math.abs(delta.drawn.x) > 0.1) {
            fit_x = true;
        }

        return function (start, end) {
            // console.log('scaleProportional');
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };

            delta.diff = {
                x: delta.current.x - delta.drawn.x,
                y: delta.current.y - delta.drawn.y
            };

            var ratio = {
                x: delta.current.x/delta.drawn.x,
                y: delta.current.y/delta.drawn.y
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            var dx, dy, x1, y1, x2, y2,
                x = start[0],
                y = start[1],
                segment_count = segments.numberOfItems;
            for (var i = 1; i < segment_count; i++) {
                var seg = segments.getItem(i),
                    c = seg.pathSegTypeAsLetter;

                if ('x1' in seg) x1 = seg.x1;
                if ('x2' in seg) x2 = seg.x2;
                if ('y1' in seg) y1 = seg.y1 * ratio.y;
                if ('y2' in seg) y2 = seg.y2 * ratio.y;
                if (fit_x) {
                    if ('x' in seg) dx = seg.x +
                                    (delta.diff.x/(segment_count-1));
                } else {
                    if ('x' in seg) dx = seg.x;
                }
                if ('y'  in seg) dy = seg.y  * ratio.y;

                switch (c) {
                    case 'm':
                        replace(segments, i, 'Moveto', dx, dy);
                        break;
                    case 'l':
                        replace(segments, i, 'Lineto', dx, dy);
                        break;
                    case 'h':
                        replace(segments, i, 'LinetoHorizontal', dx);
                        break;
                    case 'v':
                        replace(segments, i, 'LinetoVertical', dy);
                        break;
                    case 'c':
                        replace(segments, i, 'CurvetoCubic',
                                dx,dy,x1,y1,x2,y2);
                        break;
                    case 's':
                        replace(segments, i, 'CurvetoCubicSmooth',
                                dx,dy,x2,y2);
                        break;
                }

            }

            return path.getAttribute('d');
        };
    };

    self.scaleProportionalX = function (path) {
        var delta = {
                drawn: self.pathDelta(path)
            },
            original_d = path.getAttribute('d');

        console.log('drawn delta');
        console.log(delta.drawn);

        function replace(all_segments, segment_to_replace, type) {
            var args = [].slice.call(arguments, 3),
                rcmd = 'createSVGPathSeg'+ type +'Rel',
                rseg = path[rcmd].apply(path, args);
            all_segments.replaceItem(rseg, segment_to_replace);
        }

        return function (start, end) {
            // console.log('scaleProportionalX');
            delta.current = {
                x: end[0] - start[0],
                y: end[1] - start[1]
            };
            var ratio = {
                x: delta.current.x/delta.drawn.x,
                y: delta.current.y/delta.drawn.y
            };
            path.setAttribute('d', original_d);

            var segments = path.pathSegList;
            var first_segment = segments.getItem(0);
            if (first_segment
                    .pathSegTypeAsLetter
                    .toLowerCase() === 'm') {

                var replacement_seg =
                    path.createSVGPathSegMovetoAbs(
                            start[0], start[1]);
                segments.replaceItem(replacement_seg, 0);
            }

            var dx, dy, x1, y1, x2, y2,
                x = start[0],
                y = start[1];
            for (var i = 1; i < segments.numberOfItems; i++) {
                var seg = segments.getItem(i),
                    c = seg.pathSegTypeAsLetter;

                if ('x1' in seg) x1 = seg.x1 * ratio.x;
                if ('x2' in seg) x2 = seg.x2 * ratio.x;
                if ('y1' in seg) y1 = seg.y1;
                if ('y2' in seg) y2 = seg.y2;
                if ('x'  in seg) dx = seg.x  * ratio.x;
                if ('y'  in seg) dy = seg.y;

                switch (c) {
                    case 'm':
                        replace(segments, i, 'Moveto', dx, dy);
                        break;
                    case 'l':
                        replace(segments, i, 'Lineto', dx, dy);
                        break;
                    case 'h':
                        replace(segments, i, 'LinetoHorizontal', dx);
                        break;
                    case 'v':
                        replace(segments, i, 'LinetoVertical', dy);
                        break;
                    case 'c':
                        replace(segments, i, 'CurvetoCubic',
                                dx,dy,x1,y1,x2,y2);
                        break;
                    case 's':
                        replace(segments, i, 'CurvetoCubicSmooth',
                                dx,dy,x2,y2);
                        break;
                }

            }

            return path.getAttribute('d');
        };
    };

    return self;
};
},{}],5:[function(require,module,exports){
var RotateSvg = require('./rotate');

module.exports = function button () {
    var self = {},
        selection,
        dimensions;

    var rotate_svg = RotateSvg();

    self.selection = function (_) {
        if (!arguments.length) return selection;
        selection = _;

        dimensions = get_dimensions(selection);
        rotate_svg
            .selection(selection.select('#flower'));

        return self;
    };

    self.start = function () {
        // rotate_svg.start();
        return self;
    };

    function get_dimensions (selection) {
        return selection.node().getBoundingClientRect();
    }

    return self;
};
},{"./rotate":7}],6:[function(require,module,exports){
var Button = require('./button');

module.exports = function nav () {
    var self = {},
        target_sel,
        overlaid = false,
        body_sel = d3.select('body');

    var button = Button();

    self.dispatch = d3.dispatch('asteriskClick');

    self.selection = function (_) {
        if (!arguments.length) return target_sel;
        target_sel = _;

        button
            .selection(target_sel)
            .start();

        return self;
    };

    self.setup = function () {
        if (!target_sel) throw "requires elements to pair";
        target_sel
            .on('click.nav', function (d, di) {
                target_sel
                    .select('#flower');
                overlaid = overlaid ? false : true;
                activate_deactivate(d);
                self.dispatch.asteriskClick(overlaid);
            });
    };

    function activate_deactivate (d) {
        var overlay = d3.select(d.activate);
        overlay.classed('overlaid', overlaid);
        body_sel.classed('no-scroll', overlaid);
        body_sel.classed(d.body, overlaid);
    }

    return self;
};
},{"./button":5}],7:[function(require,module,exports){
module.exports = function rotate () {
    var self = {},
        selection,
        offset = 0,
        speed = 0.2,
        start = Date.now(),
        radius;

    var vendor = ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(
        function (p, v) {
            return v + "transform" in document.body.style ? v : p;
        });

    self.selection = function (_) {
        if (!arguments.length) return selection;
        selection = _;

        radius = selection.node().getBoundingClientRect().height/2;

        return self;
    };

    self.start = function () {
        start = Date.now();

        selection
            .on('mouseover', function () {
                speed = 1;
            })
            .on('mouseout', function () {
                speed = 0.2;
            })
            .on('click.rotate', function () {
                setTimeout(function () {
                    speed = 0.2;
                }, 1000);
                speed = 5;
            });


        d3.timer(function () {
            var angle = (Date.now() - start) * speed;
            selection
                .style(vendor+'transform',
                      'rotate('+ (angle/radius) +'deg)');
        });
    };

    function get_position () {
        var window_width = window.innerWidth;
        var window_height = window.innerHeight;

        
    }

    return self;
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2xvZ28vaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvbG9nby9zY2FsZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9sb2dvL3N2Zy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L2J1dHRvbi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L25hdi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L3JvdGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1WUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIE5hdiA9IHJlcXVpcmUoJy4vb3ZlcmxheS9uYXYnKSxcbiAgICBMb2dvID0gcmVxdWlyZSgnLi9sb2dvL2luZGV4Jyk7XG5cbnNpdGUoKVxuICAgIC5jb2xvcnMoKVxuICAgIC5vdmVybGF5KClcbiAgICAubG9nbygpO1xuXG5mdW5jdGlvbiBzaXRlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBjb2xvcl92YWx1ZXMgPSB7XG4gICAgICAgICAgICBwdXJwbGU6ICdyZ2IoMzgsIDM0LCA5OCk7JyxcbiAgICAgICAgICAgIG9yYW5nZTogJ3JnYigyNTUsIDYxLCA1Nik7JyxcbiAgICAgICAgICAgICdsdC1wdXJwbGUnOiAncmdiKDE0NiwgNTMsIDEyNSknLFxuICAgICAgICAgICAgYmx1ZTogJ3JnYig0MywgODksIDE4NCknXG4gICAgICAgIH0sXG4gICAgICAgIHVzZV9pbWFnZXNfYXNfb3ZlcmxheV9iYWNrZ3JvdW5kID0gdHJ1ZSxcbiAgICAgICAgYmFja2dyb3VuZF9pbWFnZV9yb3RhdGlvbl9tZXRob2QgPSAnYmxvY2snLFxuICAgICAgICBiYWNrZ3JvdW5kX2ltYWdlX3JvdGF0aW9uX21ldGhvZHMgPSBbJ2ZhZGUnLCAnYmxvY2snXSxcbiAgICAgICAgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG4gICAgdmFyIGNvbG9ycyA9IE9iamVjdC5rZXlzKGNvbG9yX3ZhbHVlcyk7XG5cbiAgICB2YXIgbmF2ID0gTmF2KCk7XG4gICAgdmFyIGxvZ28gPSBMb2dvKCk7XG5cbiAgICBzZWxmLmNvbG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJhbmRvbV9pbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvbG9ycy5sZW5ndGgpO1xuXG4gICAgICAgIHZhciBjb2xvciA9IGNvbG9yc1tyYW5kb21faW5kZXhdO1xuICAgICAgICB2YXIgYWx0X2NvbG9ycyA9IGNvbG9ycy5zbGljZSgwLHJhbmRvbV9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KGNvbG9ycy5zbGljZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9pbmRleCArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcnMubGVuZ3RoKSk7XG5cbiAgICAgICAgdmFyIGFsdF9jb2xvciA9IGFsdF9jb2xvcnNbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdF9jb2xvcnMubGVuZ3RoKV07XG5cbiAgICAgICAgYm9keS5jbGFzc2VkKCdib2R5LScgKyBjb2xvciwgdHJ1ZSk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnYm9keS1hbHQtJyArIGFsdF9jb2xvciwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYub3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhaXJzID0gZDMuc2VsZWN0QWxsKCcub3ZlcmxheS1uYXYtaXRlbScpXG4gICAgICAgICAgICAuZGF0dW0oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kYXRhc2V0OyB9KTtcblxuICAgICAgICBuYXYuc2VsZWN0aW9uKHBhaXJzKVxuICAgICAgICAgICAgLnNldHVwKCk7XG5cbiAgICAgICAgLy8gc2V0dXAgY2xpY2sgdHJhY2tpbmcgd2l0aCBnb29nbGUgYW5hbHl0aWNzXG4gICAgICAgIG5hdi5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdhc3Rlcmlza0NsaWNrJywgZnVuY3Rpb24gKG92ZXJsYWlkX2Jvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9nYXEpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAob3ZlcmxhaWRfYm9vbGVhbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBvcGVuaW5nXG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR29CdXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBc3RlcmlzayBDbGljayAtIE9wZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdIb21lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zaW5nXG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR29CdXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBc3RlcmlzayBDbGljayAtIENsb3NlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQWJvdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmxvZ28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZ28uY29udGFpbmVyKGQzLnNlbGVjdCgnLmxvZ28tbGluZScpKVxuICAgICAgICAgICAgLmF0dGFjaFJlc2l6ZSgpXG4gICAgICAgICAgICAuZHVwZUNvbnRhaW5lcihkMy5zZWxlY3QoJy5vdmVybGF5IC5sb2dvLWxpbmUnKSlcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59IiwidmFyIGNvbm5lY3RMb2dvU2NhbGUgPSByZXF1aXJlKCcuL3NjYWxlJyk7XG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoJy4vc3ZnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9nbyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGR1cGVfbG9nb19jb250YWluZXJfc2VsLFxuICAgICAgICBsb2dvX3N2ZyxcbiAgICAgICAgbG9nb190ZXh0X3NlbCxcbiAgICAgICAgbG9nb19saW5lX3RleHRfc2VsLFxuICAgICAgICBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWwsXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsLFxuICAgICAgICBzdHJhaWdodF9saW5lID0gZDMuc3ZnLmxpbmUoKSxcbiAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlID0gY29ubmVjdExvZ29TY2FsZSgpO1xuXG4gICAgdmFyIHV0aWxpdHkgPSBVdGlsaXR5KCk7XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxvZ29fY29udGFpbmVyX3NlbDtcbiAgICAgICAgbG9nb19jb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZHVwZUNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGR1cGVfbG9nb19jb250YWluZXJfc2VsO1xuICAgICAgICBkdXBlX2xvZ29fY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmF0dGFjaFJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93X3NlbFxuICAgICAgICAgICAgLm9uKCdyZXNpemUubG9nbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBsb2dvX3N2Z1xuICAgICAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3dfd2lkdGgpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIChsb2dvX2xpbmVfY29ubmVjdGluZ19zZWwpIHtcbiAgICAgICAgICAgICAgICBpZiAobG9nb19saW5lX21lcmdlZF9zZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlX2xvZ29fbGluZSh3aW5kb3dfd2lkdGgsIHdpbmRvd19oZWlnaHQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkdXBlX2xvZ29fY29udGFpbmVyX3NlbCkge1xuICAgICAgICAgICAgICAgICAgICBkdXBlX2xvZ29fY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLmh0bWwobG9nb19jb250YWluZXJfc2VsLmh0bWwoKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gc2V0IHVwIHN2Z1xuICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIGxvZ29fc3ZnID0gbG9nb19jb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLXN2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2luZG93LmlubmVyV2lkdGgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgICAgICAgLy8gc2VsZWN0aW9uIG9mIHRoZSB0ZXh0IHRoYXQgd2lsbCBkZWZpbmUgdGhlIGxpbmVcbiAgICAgICAgbG9nb190ZXh0X3NlbCA9IGQzLnNlbGVjdCgnaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLmxvZ28tdGV4dC1jb21wb25lbnQnKTtcblxuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5jbGFzc2VkKCd0by1yZXZlYWwnLCBmYWxzZSk7XG5cbiAgICAgICAgLy8gdmVydGljaWVzIGZvciBcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gbG9nb19saW5lX3RleHRfdmVydGljaWVzKGxvZ29fdGV4dF9zZWwpO1xuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgIHZhciBtZXJnZWRfZCA9IG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzKTtcblxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbCA9IGxvZ29fc3ZnLnNlbGVjdEFsbCgnLmxvZ28tbGluZS1tZXJnZWQnKVxuICAgICAgICAgICAgLmRhdGEoW21lcmdlZF9kXSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1saW5lLW1lcmdlZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZDsgfSk7XG5cbiAgICAgICAgbG9nb19saW5lX21lcmdlZF9zZWwuY2FsbCh0d2Vlbl9pbik7XG5cblxuICAgICAgICAvLyBsb2dvX2xpbmVfdGV4dF9zZWwgPSBsb2dvX3N2Zy5zZWxlY3RBbGwoJy5sb2dvLWxpbmUtdGV4dCcpXG4gICAgICAgIC8vICAgICAuZGF0YSh0ZXh0X3ZlcnRpY2llcylcbiAgICAgICAgLy8gICAgIC5lbnRlcigpXG4gICAgICAgIC8vICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgLy8gICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1saW5lLXRleHQnKVxuICAgICAgICAvLyAgICAgICAgIC5hdHRyKCdkJywgc3RyYWlnaHRfbGluZSk7XG5cbiAgICAgICAgLy8gbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VsID1cbiAgICAgICAgLy8gICAgIGxvZ29fc3ZnXG4gICAgICAgIC8vICAgICAgICAgLnNlbGVjdEFsbCgnLmxvZ28tbGluZS1jb25uZWN0aW5nJylcbiAgICAgICAgLy8gICAgICAgICAuZGF0YShjb25uZWN0aW5nX3NlZ21lbnRzKVxuICAgICAgICAvLyAgICAgICAgIC5lbnRlcigpXG4gICAgICAgIC8vICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWxpbmUtY29ubmVjdGluZycpXG4gICAgICAgIC8vICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQ7IH0pO1xuXG4gICAgICAgIGlmIChkdXBlX2xvZ29fY29udGFpbmVyX3NlbCkge1xuICAgICAgICAgICAgZHVwZV9sb2dvX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAuaHRtbChsb2dvX2NvbnRhaW5lcl9zZWwuaHRtbCgpKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbG9nb19saW5lICh3d2lkdGgsIHdoZWlnaHQpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3VwZGF0ZV9sb2dvX2xpbmUnKTtcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gbG9nb19saW5lX3RleHRfdmVydGljaWVzKGxvZ29fdGV4dF9zZWwpO1xuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWlnaHQpO1xuXG4gICAgICAgIHZhciBtZXJnZWRfZCA9IG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzKTtcblxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbFxuICAgICAgICAgICAgLmRhdGEoW21lcmdlZF9kXSlcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQ7IH0pO1xuXG4gICAgICAgIC8vIGxvZ29fbGluZV90ZXh0X3NlbFxuICAgICAgICAvLyAgICAgLmRhdGEodGV4dF92ZXJ0aWNpZXMpXG4gICAgICAgIC8vICAgICAuYXR0cignZCcsIHN0cmFpZ2h0X2xpbmUpO1xuXG4gICAgICAgIC8vIGxvZ29fbGluZV9jb25uZWN0aW5nX3NlbFxuICAgICAgICAvLyAgICAgLmRhdGEoY29ubmVjdGluZ19zZWdtZW50cylcbiAgICAgICAgLy8gICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQ7IH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fbGluZV90ZXh0X3ZlcnRpY2llcyAoc2VsKSB7XG4gICAgICAgIHZhciB0ZXh0X3ZlcnRpY2llcyA9IFtdO1xuXG4gICAgICAgIHNlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHZhciBmaXJzdCwgc2Vjb25kO1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IFtib3VuZHMubGVmdCArIDMsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjU1KSkpXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgLSA2LFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC41NSkpKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlY29uZCA9IFtib3VuZHMucmlnaHQgKyA2LFxuICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjU1KSkpXTtcblxuICAgICAgICAgICAgdGV4dF92ZXJ0aWNpZXMucHVzaChbZmlyc3QsIHNlY29uZF0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0ZXh0X3ZlcnRpY2llcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWdtZW50cyhzdGFydF9lbmRfcG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVpZ2h0KSB7XG4gICAgICAgIHZhciBsaW5lX3NpemVfdG9fZHJhdyA9XG4gICAgICAgICAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlLmNob29zZV9zaXplKHd3aWR0aCwgd2hlaWdodCk7XG5cbiAgICAgICAgdmFyIGNvbm5lY3Rpbmdfc2VnbWVudHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFydF9lbmRfcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoKGkrMSkgPCBzdGFydF9lbmRfcG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBzdGFydCA9IHN0YXJ0X2VuZF9wb2ludHNbaV1bMV0sXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IHN0YXJ0X2VuZF9wb2ludHNbaSsxXVswXTtcblxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpbmdfc2VnbWVudHNcbiAgICAgICAgICAgICAgICAgICAgLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0X2xvZ29fc2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGluZV9zaXplX3RvX2RyYXddKHN0YXJ0LCBlbmQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29ubmVjdGluZ19zZWdtZW50cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJnZV9saW5lcyh0ZXh0X3ZlcnRpY2llcywgY29ubmVjdGluZ19zZWdtZW50cykge1xuICAgICAgICAvLyB0YWtlcyBhcnJheSBvZiB2ZXJ0ZXggcGFpcnMsIGFuZCBwYXRoXG4gICAgICAgIC8vIGVsZW1lbnRzIG9mIGNvbm5lY3Rpbmcgc2VnbWVudHMuXG4gICAgICAgIC8vIHJldHVybnMgb24gcGF0aCBkIGF0dHJpYnV0ZVxuICAgICAgICB2YXIgZCA9ICcnO1xuXG4gICAgICAgIHZhciB0ZW1wX3N2ZyA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKTtcbiAgICAgICAgdmFyIHRlbXBfcGF0aCA9IHRlbXBfc3ZnXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCd0ZW1wLXBhdGgnKVxuICAgICAgICAgICAgLmRhdGEodGV4dF92ZXJ0aWNpZXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cignZCcsIHN0cmFpZ2h0X2xpbmUpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAndGVtcC1wYXRoJylcbiAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgdGVtcF9wYXRoLmVhY2goZnVuY3Rpb24gKHRkLCB0aSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGQpO1xuICAgICAgICAgICAgdmFyIHRleHRfZCA9IGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkJyk7XG4gICAgICAgICAgICBkICs9IHRleHRfZDtcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW5nX3NlZ21lbnRzW3RpXSkge1xuICAgICAgICAgICAgICAgIHZhciBjb25uZWN0aW5nX2QgPSBjb25uZWN0aW5nX3NlZ21lbnRzW3RpXTtcbiAgICAgICAgICAgICAgICBkICs9IGNvbm5lY3RpbmdfZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbGl0eS5jb252ZXJ0VG9SZWxhdGl2ZSh0ZW1wX3BhdGguYXR0cignZCcsIGQpLm5vZGUoKSk7XG4gICAgICAgIC8vIHJlcGxhY2UgYWxsIGBtYCBpbnN0cnVjdGlvbnMgd2l0aCBgbGAsIGV4Y2VwdFxuICAgICAgICAvLyBmb3IgdGhlIGZpcnN0IG9uZS4gdGhpcyBpcyBhIHJldmVyc2UgcmVnZXhcbiAgICAgICAgZCA9IHRlbXBfcGF0aC5hdHRyKCdkJykucmVwbGFjZSgvKD8hXiltL2csICdsJyk7XG5cbiAgICAgICAgdGVtcF9zdmcucmVtb3ZlKCk7XG4gICAgICAgIHRlbXBfcGF0aC5yZW1vdmUoKTtcblxuICAgICAgICByZXR1cm4gZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9pbihwYXRoKSB7XG4gICAgICAgIHBhdGgudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oODAwMClcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oJ3N0cm9rZS1kYXNoYXJyYXknLCB0d2VlbkRhc2gpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuRGFzaCgpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcoJzAsJyArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi9zdmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsb2dvX3NjYWxlICgpIHtcbiAgICB2YXIgdXRpbGl0eSA9IFV0aWxpdHkoKTtcblxuICAgIHZhciBzZWdtZW50cyA9IFt7XG4gICAgICAgICAgICBmcm9tOiAnUklTRCcsXG4gICAgICAgICAgICB0bzogJ0dyYWQnLFxuICAgICAgICAgICAgLy8gc2NhbGVVc2luZzoge1xuICAgICAgICAgICAgLy8gICAgIGZ1bmM6IHV0aWxpdHkuc2NhbGVBbmNob3JZLFxuICAgICAgICAgICAgLy8gICAgIGFyZ3M6IHtcbiAgICAgICAgICAgIC8vICAgICAgICAgc3RhcnQ6IDIsXG4gICAgICAgICAgICAvLyAgICAgICAgIGVuZDogOVxuICAgICAgICAgICAgLy8gICAgIH1cbiAgICAgICAgICAgIC8vIH0sXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgIHBhdGhzOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6ICdNMy41NjQsMCcgK1xuICAgICAgICAgICAgICAgICAgICAnYzAsMCwwLDguODUxLDAsMTYuODEnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MwLDEwLjU1NC00MS4wNDUsOTcuOTgxLTQ1LjkwNCwxOTguOTE3JyArXG4gICAgICAgICAgICAgICAgICAgICdjLTYuODYsMTQyLjQ5MywxMDIuMDQ5LDE3NC45MjUsMTk5LjQ5LDE3OC40OTEnICtcbiAgICAgICAgICAgICAgICAgICAgJ2M4MS45NjQsMywxODIuOTkxLTMxLjQ5OCwyMDguNDktMTMzLjQ5MyAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MyNy41NC0xMTAuMTU5LTgzLjM0Ny0xOTEuOTktMTg3LjQ5MS0xNDguNDkzICcgK1xuICAgICAgICAgICAgICAgICAgICAnQy0xOC45MzIsMTk0LjU0Ny0yNS44NjksNDMzLjgwNSw2MS45MjEsNTMzLjI5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnYzg3LjcyOSw5OS40MTUsMjYuMDE0LDE3MS4zMzktOS42MjUsMTgxLjkxMSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MtNjYuMTM4LDE5LjYyLTExOC43ODktMzEuNDk4LTc5LjYzOC05NC4yNjYgJyArXG4gICAgICAgICAgICAgICAgICAgICdjNDQuMzM3LTcxLjA4MSwxOTEuOTktNjMuMjI2LDIyOS40ODktMTAuNzI5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnQzMyMy44NTIsNzgwLjU5My01OS4xMzYsOTE1Ljc4OC01OS4xMzYsOTIxLjQzJyArXG4gICAgICAgICAgICAgICAgICAgICdjMCwxOC4wMTMsMCwxMTEuNjUsMCwxMTEuNjUnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTk0LjI2LTE1ICcrXG4gICAgICAgICAgICAgICAgICAnaDI5Ljc5NiAnICtcbiAgICAgICAgICAgICAgICAgICdjMCwwLDAuOTM2LDguODUxLDAuOTM2LDE2LjgxICcrXG4gICAgICAgICAgICAgICAgICAnYzAsMjguMDQyLTE1LjkwMSw2Ny4zNy02MS4xODUsNjcuMzcnICtcbiAgICAgICAgICAgICAgICAgICdDMTAuNTEsNjkuMTgtMTYsNjkuMTg1LTE2LDY5LjE4NScgK1xuICAgICAgICAgICAgICAgICAgJ3YtNTInICtcbiAgICAgICAgICAgICAgICAgICdjMCwwLDM1LjkyMS00LjM5Myw0OC42NDksMy43NTgnICtcbiAgICAgICAgICAgICAgICAgICdjMzcuODYxLDI0LjI0MiwyOS42NDUsNDYuNzc3LTMuOCw4MC4yNDInICtcbiAgICAgICAgICAgICAgICAgICdjLTE3LjAyNywxNy4wMzgtNDQuNjI5LDE3LTQ0LjYyOSw0OC42NTMnICtcbiAgICAgICAgICAgICAgICAgIC8vICdjMCwxOC4wMTMsMCwyNC4zNDcsMCwyNC4zNDcnXG4gICAgICAgICAgICAgICAgICAnYzAsMCwwLDAsMCwyNC4zNDcnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGZyb206ICdHcmFkJyxcbiAgICAgICAgICAgIHRvOiAnU2hvdycsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWCxcbiAgICAgICAgICAgIHBhdGhzOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6ICdNMC0wLjEzOCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAnYzgzLjYyNywwLjYyLDIzOC43NTUsMCwzNDQuMTQsMCcsXG4gICAgICAgICAgICAgICAgJzc2OCc6ICdNMCwwICcgK1xuICAgICAgICAgICAgICAgICAgICdjMCwwIDE4Ljg2MSwwLjA0NCAyNS44MTgsMC4wOTUgJyArXG4gICAgICAgICAgICAgICAgICAgJ2M1OS44OTYsMC40NDQgNDUwLjAwNiwwIDQ1MC4wMDYsMCAnICtcbiAgICAgICAgICAgICAgICAgICAnYzAsMCAwLDAgMCwyNDguNSAnICtcbiAgICAgICAgICAgICAgICAgICAnYzAsMCAtNi43OTksMCAtNjgsMCAnICtcbiAgICAgICAgICAgICAgICAgICAnYy0xNDguMjY2LDAgLTEzOCwtMTU3LjUgMCwtMTU3LjUgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MxMTAsMCAxODkuNjI4LDExNy42NSAzMDIsMTE2ICcgK1xuICAgICAgICAgICAgICAgICAgICdjMTQ3LjYyMSwtMi4xNjcgMTkzLjc4OCwtMjE4LjcwNSAxOTMuNzg4LC0yODUuNjU3ICcgK1xuICAgICAgICAgICAgICAgICAgICdjMCwtMTkwLjM0MyAtMTYxLjc4OCwtMTI4LjM0MyAtMTYxLjc4OCwtNDQuMzQzICcgK1xuICAgICAgICAgICAgICAgICAgICdjMCw1Mi40MDEgNDguNzc3LDk0LjYzOCAxMjMuNDI0LDEwNiAnICtcbiAgICAgICAgICAgICAgICAgICAnYzEzMi44OTQsMjAuMjI4IDI4NS4xMDUsMTYuOTM2IDMwMS41NjMsMTcgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MxNC43NDQsMC4wNTggOTQuMTQ3LDAuMTMyIDk0LjE0NywwLjEzMidcbiAgICAgICAgICAgICAgICAvLyAnNzY4JzogJ00tMTYtMTQuNzg2ICcgK1xuICAgICAgICAgICAgICAgIC8vICAgICAnYzExNS4wMzksMC44NTIsMzcxLjAwNiwxNC41LDU3MS40MjctNzQuMjY4ICcgK1xuICAgICAgICAgICAgICAgIC8vICAgICAnYzE1Ny45MjgtNjkuOTQ4LDY3LjAzMi0xNzguOTc4LTQ1LjQwNS0xMzAuOTU4ICcgK1xuICAgICAgICAgICAgICAgIC8vICAgICAnYy0xNDEuMDE2LDYwLjIyNi0zNDYuNTk2LDMwMC45NzYtNDMuMDE2LDMyMi4yMjYnICtcbiAgICAgICAgICAgICAgICAvLyAgICAgJ2MyMDAsMTQsNDU3Ljk0LTExNy44MjIsNjY3Ljk4Ny0xMTcnICtcbiAgICAgICAgICAgICAgICAvLyAgICAgJ2MyNC40ODcsMC4wOTYsNTEuNDk5LTAuMDgxLDc3LjAxMywwJyArXG4gICAgICAgICAgICAgICAgLy8gICAgICdjMTQuNzYxLDAuMDQ3LDQyLDAsNDIsMCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZnJvbTogJ1Nob3cnLFxuICAgICAgICAgICAgdG86ICcyMDE0JyxcbiAgICAgICAgICAgIHNjYWxlVXNpbmc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZLFxuICAgICAgICAgICAgcGF0aHM6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogJ003My42MDYtNDguNjg5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnYzMuMDM3LTAuMDMyLDUuNzQtMC4wNTIsOC4wODktMC4wNTIgJyArXG4gICAgICAgICAgICAgICAgICAgICdjMTUuMzMsMCw2Ljc4My00OS42MjYtMzUuMzM3LTUxLjI1OCAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MtNDMtMS42NjctNzAuNzUsMjQtNzcuMzMzLDU2ICcgK1xuICAgICAgICAgICAgICAgICAgICAnQy0zNi41MjYtMTcuMDE1LTE0LjY0MSwwLTEuOTUsMCcsXG4gICAgICAgICAgICAgICAgJzc2OCc6ICdNMTE2Ljc0NS0xNScgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMCwzLjEwMywwLDEzICcrXG4gICAgICAgICAgICAgICAgICAnYzAsMTIuODItMjUuNzAyLDE5Ljc1Ni00NC43NDUsMjcnICtcbiAgICAgICAgICAgICAgICAgICdDNDQuNDg2LDM1LjQ2NywxOCwzNi4wMiwxOCw2MS41JyArXG4gICAgICAgICAgICAgICAgICAnYzAsMjYsMTcuNSwzNi44MjgsNDQuNzc4LDM2LjgyOCcgK1xuICAgICAgICAgICAgICAgICAgJ0MxMDIuNjY3LDk4LjMyOCwxMDQsNTEsMTA0LDUxJyArXG4gICAgICAgICAgICAgICAgICAnSC0xNnYzNicgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMzkuNjE4LDkuODY1LDYyLDM2JyArXG4gICAgICAgICAgICAgICAgICAnYzIxLjE0MSwyNC42ODYsMjMuNTQxLDI4LDQ3LjAyMywyOCcgK1xuICAgICAgICAgICAgICAgICAgJ2MxNC45NzcsMCwxMy42OTcsMCwyMy42OTcsMCcgK1xuICAgICAgICAgICAgICAgICAgJ3Y0Ny43MjQnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1dO1xuXG4gICAgdmFyIHRlbXBfc3ZnID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICB2YXIgdGVtcF9wYXRoID0gdGVtcF9zdmdcbiAgICAgICAgLmFwcGVuZCgncGF0aCcpO1xuXG4gICAgc2VnbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICBkLnJlbGF0aXZlX3BhdGhzX2QgPSB7fTtcbiAgICAgICAgZC5yZWxhdGl2ZV9wYXRocyA9IHt9O1xuICAgICAgICBkLnNjYWxlID0ge307XG5cbiAgICAgICAgZm9yICh2YXIgcGF0aF9zaXplIGluIGQucGF0aHMpIHtcbiAgICAgICAgICAgIHRlbXBfcGF0aC5hdHRyKCdkJywgZC5wYXRoc1twYXRoX3NpemVdKTtcbiAgICAgICAgICAgIHV0aWxpdHkuY29udmVydFRvUmVsYXRpdmUodGVtcF9wYXRoLm5vZGUoKSk7XG4gICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzX2RbcGF0aF9zaXplXSA9IHRlbXBfcGF0aC5hdHRyKCdkJyk7XG4gICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzID0gdGVtcF9wYXRoLm5vZGUoKTtcbiAgICAgICAgICAgIGQuc2NhbGVbcGF0aF9zaXplXSA9IGQuc2NhbGVVc2luZyhkLnJlbGF0aXZlX3BhdGhzKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGVtcF9zdmcucmVtb3ZlKCk7XG4gICAgdGVtcF9wYXRoLnJlbW92ZSgpO1xuXG4gICAgdmFyIHNpemVzID0gT2JqZWN0LmtleXMoc2VnbWVudHNbMF0ucGF0aHMpO1xuICAgIHNlZ21lbnRzLmNob29zZV9zaXplID0gZnVuY3Rpb24gKHdpbmRvd193aWR0aCwgd2luZG93X2hlaWdodCkge1xuICAgICAgICB2YXIgY2hvc2VuID0gMDtcbiAgICAgICAgc2l6ZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPCB3aW5kb3dfd2lkdGgpIHtcbiAgICAgICAgICAgICAgICBjaG9zZW4gPSBkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNob3Nlbi50b1N0cmluZygpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuc2VnbWVudHMgPSBzZWdtZW50cztcblxuICAgIHJldHVybiBzZWdtZW50cztcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdmcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICBzZWxmLmNvbnZlcnRUb1JlbGF0aXZlID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgZnVuY3Rpb24gc2V0KHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgc2Vncy5yZXBsYWNlSXRlbShyc2VnLCBpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZHgsIGR5LCB4MCwgeTAsIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgc2VncyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgIGZvciAodmFyIHggPSAwLCB5ID0gMCwgaSA9IDAsIGxlbiA9IHNlZ3MubnVtYmVyT2ZJdGVtcztcbiAgICAgICAgICAgICBpIDwgbGVuO1xuICAgICAgICAgICAgIGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgc2VnID0gc2Vncy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgIGMgICA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICBpZiAoL1tNTEhWQ1NRVEFael0vLnRlc3QoYykpIHtcbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxIC0geDtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0gc2VnLngyIC0geDtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxIC0geTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyIC0geTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnICBpbiBzZWcpIGR4ID0gLXggKyAoeCA9IHNlZy54KTtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gLXkgKyAoeSA9IHNlZy55KTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ01vdmV0bycsZHgsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdMaW5ldG8nLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdIJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvSG9yaXpvbnRhbCcsZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdMaW5ldG9WZXJ0aWNhbCcsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvQ3ViaWMnLGR4LGR5LHgxLHkxLHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdTJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b0N1YmljU21vb3RoJyxkeCxkeSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9RdWFkcmF0aWMnLGR4LGR5LHgxLHkxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b1F1YWRyYXRpY1Ntb290aCcsZHgsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdBcmMnLGR4LGR5LHNlZy5yMSxzZWcucjIsc2VnLmFuZ2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZy5sYXJnZUFyY0ZsYWcsc2VnLnN3ZWVwRmxhZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnWic6IGNhc2UgJ3onOiB4ID0geDA7IHkgPSB5MDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnIGluIHNlZykgeCArPSBzZWcueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knIGluIHNlZykgeSArPSBzZWcueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBzdGFydCBvZiBhIHN1YnBhdGhcbiAgICAgICAgICAgIGlmIChjID09ICdNJyB8fCBjID09ICdtJykge1xuICAgICAgICAgICAgICAgIHgwID0geDtcbiAgICAgICAgICAgICAgICB5MCA9IHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvWi9nLCAneicpKTtcbiAgICB9O1xuXG4gICAgc2VsZi5wYXRoRGVsdGEgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzdGFydCA9IHBhdGguZ2V0UG9pbnRBdExlbmd0aCgwKSxcbiAgICAgICAgICAgIGVuZCA9IHBhdGguZ2V0UG9pbnRBdExlbmd0aChwYXRoLmdldFRvdGFsTGVuZ3RoKCkpO1xuXG4gICAgICAgIGRlbHRhLnggPSBlbmQueCAtIHN0YXJ0Lng7XG4gICAgICAgIGRlbHRhLnkgPSBlbmQueSAtIHN0YXJ0Lnk7XG5cbiAgICAgICAgcmV0dXJuIGRlbHRhO1xuICAgIH07XG5cbiAgICAvLyBwYXNzIGluIGEgcGF0aCBlbGVtZW50XG4gICAgLy8gYW5kIHRoZSBwYXRoIHNlZ2VtZW50IGluZGljaWVzXG4gICAgLy8gdGhhdCB3aWxsIGJlIHNjYWxlZFxuICAgIHNlbGYuc2NhbGVBbmNob3JZID0gZnVuY3Rpb24gKHBhdGgsIGFuY2hvcnMpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlQW5jaG9yWScpO1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IHNlbGYucGF0aERlbHRhKHBhdGgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjdXJyZW50IGRlbHRhXG4gICAgICAgICAgICBkZWx0YS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGVuZFswXSAtIHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIGFuY2hvcnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9fcmVwbGFjZSA9IHNlZ21lbnRzLmdldEl0ZW0oYW5jaG9yc1tuYW1lXSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2Vfd2l0aCA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY1JlbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueSArICgoZGVsdGEuY3VycmVudC55LVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YS5kcmF3bi55KS8yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS54MixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueTIpO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2Vfd2l0aCwgYW5jaG9yc1tuYW1lXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBzZWxmLnBhdGhEZWx0YShwYXRoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2UoYWxsX3NlZ21lbnRzLCBzZWdtZW50X3RvX3JlcGxhY2UsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgYWxsX3NlZ21lbnRzLnJlcGxhY2VJdGVtKHJzZWcsIHNlZ21lbnRfdG9fcmVwbGFjZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZVByb3BvcnRpb25hbCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR4LCBkeSwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICAgICAgeCA9IHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHkgPSBzdGFydFsxXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VnbWVudHMubnVtYmVyT2ZJdGVtczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ21lbnRzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgICAgIGMgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDEgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDIgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTEgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIGlmICgneTInIGluIHNlZykgeTIgPSBzZWcueTIgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIGlmICgneCcgIGluIHNlZykgZHggPSBzZWcueCAgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSBzZWcueSAgKiByYXRpby55O1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ01vdmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9Ib3Jpem9udGFsJywgZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b1ZlcnRpY2FsJywgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpYycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgxLHkxLHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWNTbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHNlbGYuc2NhbGVQcm9wb3J0aW9uYWxZID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgLy8gc2NhbGUgeSwgZml0IHhcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBzZWxmLnBhdGhEZWx0YShwYXRoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpLFxuICAgICAgICAgICAgZml0X3ggPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlKGFsbF9zZWdtZW50cywgc2VnbWVudF90b19yZXBsYWNlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIGFsbF9zZWdtZW50cy5yZXBsYWNlSXRlbShyc2VnLCBzZWdtZW50X3RvX3JlcGxhY2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChNYXRoLmFicyhkZWx0YS5kcmF3bi54KSA+IDAuMSkge1xuICAgICAgICAgICAgZml0X3ggPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGVQcm9wb3J0aW9uYWwnKTtcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRlbHRhLmRpZmYgPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54IC0gZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkgLSBkZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgcmF0aW8gPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54L2RlbHRhLmRyYXduLngsXG4gICAgICAgICAgICAgICAgeTogZGVsdGEuY3VycmVudC55L2RlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIG9yaWdpbmFsX2QpO1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgdmFyIGZpcnN0X3NlZ21lbnQgPSBzZWdtZW50cy5nZXRJdGVtKDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3NlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhdGhTZWdUeXBlQXNMZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgPT09ICdtJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50X3NlZyA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0FicyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2VtZW50X3NlZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkeCwgZHksIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgICAgIHggPSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5ID0gc3RhcnRbMV0sXG4gICAgICAgICAgICAgICAgc2VnbWVudF9jb3VudCA9IHNlZ21lbnRzLm51bWJlck9mSXRlbXM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlZ21lbnRfY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzZWcgPSBzZWdtZW50cy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgICAgICBjID0gc2VnLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxO1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDI7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKGZpdF94KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSBkeCA9IHNlZy54ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkZWx0YS5kaWZmLngvKHNlZ21lbnRfY291bnQtMSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSBkeCA9IHNlZy54O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnkgICogcmF0aW8ueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsWCA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgICAgICBkcmF3bjogc2VsZi5wYXRoRGVsdGEocGF0aClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmlnaW5hbF9kID0gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnZHJhd24gZGVsdGEnKTtcbiAgICAgICAgY29uc29sZS5sb2coZGVsdGEuZHJhd24pO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2UoYWxsX3NlZ21lbnRzLCBzZWdtZW50X3RvX3JlcGxhY2UsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgYWxsX3NlZ21lbnRzLnJlcGxhY2VJdGVtKHJzZWcsIHNlZ21lbnRfdG9fcmVwbGFjZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZVByb3BvcnRpb25hbFgnKTtcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcmF0aW8gPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54L2RlbHRhLmRyYXduLngsXG4gICAgICAgICAgICAgICAgeTogZGVsdGEuY3VycmVudC55L2RlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIG9yaWdpbmFsX2QpO1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgdmFyIGZpcnN0X3NlZ21lbnQgPSBzZWdtZW50cy5nZXRJdGVtKDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3NlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhdGhTZWdUeXBlQXNMZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgPT09ICdtJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50X3NlZyA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0FicyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2VtZW50X3NlZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkeCwgZHksIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgICAgIHggPSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5ID0gc3RhcnRbMV07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlZ21lbnRzLm51bWJlck9mSXRlbXM7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzZWcgPSBzZWdtZW50cy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgICAgICBjID0gc2VnLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0gc2VnLngyICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxO1xuICAgICAgICAgICAgICAgIGlmICgneTInIGluIHNlZykgeTIgPSBzZWcueTI7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IHNlZy54ICAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IHNlZy55O1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ01vdmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9Ib3Jpem9udGFsJywgZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b1ZlcnRpY2FsJywgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpYycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgxLHkxLHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWNTbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgUm90YXRlU3ZnID0gcmVxdWlyZSgnLi9yb3RhdGUnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBidXR0b24gKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHNlbGVjdGlvbixcbiAgICAgICAgZGltZW5zaW9ucztcblxuICAgIHZhciByb3RhdGVfc3ZnID0gUm90YXRlU3ZnKCk7XG5cbiAgICBzZWxmLnNlbGVjdGlvbiA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHNlbGVjdGlvbjtcbiAgICAgICAgc2VsZWN0aW9uID0gXztcblxuICAgICAgICBkaW1lbnNpb25zID0gZ2V0X2RpbWVuc2lvbnMoc2VsZWN0aW9uKTtcbiAgICAgICAgcm90YXRlX3N2Z1xuICAgICAgICAgICAgLnNlbGVjdGlvbihzZWxlY3Rpb24uc2VsZWN0KCcjZmxvd2VyJykpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnN0YXJ0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyByb3RhdGVfc3ZnLnN0YXJ0KCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfZGltZW5zaW9ucyAoc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBzZWxlY3Rpb24ubm9kZSgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgQnV0dG9uID0gcmVxdWlyZSgnLi9idXR0b24nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBuYXYgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHRhcmdldF9zZWwsXG4gICAgICAgIG92ZXJsYWlkID0gZmFsc2UsXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5Jyk7XG5cbiAgICB2YXIgYnV0dG9uID0gQnV0dG9uKCk7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FzdGVyaXNrQ2xpY2snKTtcblxuICAgIHNlbGYuc2VsZWN0aW9uID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gdGFyZ2V0X3NlbDtcbiAgICAgICAgdGFyZ2V0X3NlbCA9IF87XG5cbiAgICAgICAgYnV0dG9uXG4gICAgICAgICAgICAuc2VsZWN0aW9uKHRhcmdldF9zZWwpXG4gICAgICAgICAgICAuc3RhcnQoKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5zZXR1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRfc2VsKSB0aHJvdyBcInJlcXVpcmVzIGVsZW1lbnRzIHRvIHBhaXJcIjtcbiAgICAgICAgdGFyZ2V0X3NlbFxuICAgICAgICAgICAgLm9uKCdjbGljay5uYXYnLCBmdW5jdGlvbiAoZCwgZGkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJyNmbG93ZXInKTtcbiAgICAgICAgICAgICAgICBvdmVybGFpZCA9IG92ZXJsYWlkID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlX2RlYWN0aXZhdGUoZCk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hc3Rlcmlza0NsaWNrKG92ZXJsYWlkKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhY3RpdmF0ZV9kZWFjdGl2YXRlIChkKSB7XG4gICAgICAgIHZhciBvdmVybGF5ID0gZDMuc2VsZWN0KGQuYWN0aXZhdGUpO1xuICAgICAgICBvdmVybGF5LmNsYXNzZWQoJ292ZXJsYWlkJywgb3ZlcmxhaWQpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCduby1zY3JvbGwnLCBvdmVybGFpZCk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoZC5ib2R5LCBvdmVybGFpZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcm90YXRlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBzZWxlY3Rpb24sXG4gICAgICAgIG9mZnNldCA9IDAsXG4gICAgICAgIHNwZWVkID0gMC4yLFxuICAgICAgICBzdGFydCA9IERhdGUubm93KCksXG4gICAgICAgIHJhZGl1cztcblxuICAgIHZhciB2ZW5kb3IgPSBbXCJcIiwgXCItd2Via2l0LVwiLCBcIi1tb3otXCIsIFwiLW1zLVwiLCBcIi1vLVwiXS5yZWR1Y2UoXG4gICAgICAgIGZ1bmN0aW9uIChwLCB2KSB7XG4gICAgICAgICAgICByZXR1cm4gdiArIFwidHJhbnNmb3JtXCIgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSA/IHYgOiBwO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYuc2VsZWN0aW9uID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICBzZWxlY3Rpb24gPSBfO1xuXG4gICAgICAgIHJhZGl1cyA9IHNlbGVjdGlvbi5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0LzI7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAgIC5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNwZWVkID0gMTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNwZWVkID0gMC4yO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2sucm90YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBzcGVlZCA9IDAuMjtcbiAgICAgICAgICAgICAgICB9LCAxMDAwKTtcbiAgICAgICAgICAgICAgICBzcGVlZCA9IDU7XG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgIGQzLnRpbWVyKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IChEYXRlLm5vdygpIC0gc3RhcnQpICogc3BlZWQ7XG4gICAgICAgICAgICBzZWxlY3Rpb25cbiAgICAgICAgICAgICAgICAuc3R5bGUodmVuZG9yKyd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgICAgICAgICAgICdyb3RhdGUoJysgKGFuZ2xlL3JhZGl1cykgKydkZWcpJyk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBnZXRfcG9zaXRpb24gKCkge1xuICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHZhciB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIFxuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiXX0=
