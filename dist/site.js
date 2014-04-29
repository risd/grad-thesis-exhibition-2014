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
                recalulate_logo_line();
            })
            .on('scroll.logo', function () {
                recalulate_logo_line();
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

        if (dupe_logo_container_sel) {
            dupe_logo_container_sel
                .html(logo_container_sel.html());
        }
    };

    function recalulate_logo_line () {
        var window_width = window.innerWidth,
            window_height = window.innerHeight;

        logo_svg
            .attr('width', window_width)
            .attr('height', window_height);

        if (logo_line_merged_sel) {
            update_logo_line(window_width, window_height);
        }

        if (dupe_logo_container_sel) {
            dupe_logo_container_sel
                .html(logo_container_sel.html());
        }
    }

    function update_logo_line (wwidth, wheight) {
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
            .attrTween('stroke-dasharray', tweenDash)
            .each('end', function () {
                // remove dash array, as resizing
                // the browser will change the length
                // and there is no need to re-compute
                // the dash array to fit it.
                d3.select(this).attr('stroke-dasharray', 'none');
            });
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
            if (d <= window_width) {
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
        body_sel = d3.select('body'),
        window_sel = d3.select(window);

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

    self.overlaid = function (_) {
        if (!arguments.length) return overlaid;
        overlaid = _;
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

        
        place_button();

        window_sel
            .on('resize.nav', function () {
                place_button();
            });
    };

    function activate_deactivate (d) {
        var overlay = d3.select(d.activate);
        overlay.classed('overlaid', overlaid);
        body_sel.classed('no-scroll', overlaid);
        body_sel.classed(d.body, overlaid);
        place_button();
    }

    function place_button () {
        var wwidth = window.innerWidth;
        var wheight = window.innerHeight;

        var bbox = target_sel.node().getBoundingClientRect();
        var matching_sel;

        if (overlaid) {
            var target_height = bbox.height;
            matching_sel =
                d3.select('.logo-text-component--risd');
            target_sel.style('left', (wwidth -
                                      bbox.width -
                                      (+matching_sel
                                        .style('left')
                                        .split('p')[0])) +
                                     'px');
            target_sel.style('bottom', (wheight -
                                        bbox.height -
                                        (+matching_sel
                                           .style('top')
                                           .split('p')[0])) +
                                       'px');
        } else {
            if (wwidth < 768) {
                matching_sel =
                    d3.select('.logo-text-component--show');
                var matching_box = matching_sel
                                        .node()
                                        .getBoundingClientRect();
                target_sel
                    .style('left', ((wwidth - bbox.width)/2) +
                                           'px')
                    .style('bottom', ((+matching_sel
                                        .style('bottom')
                                        .split('p')[0]) -
                                      (bbox.height-
                                       matching_box.height)/2) +
                                     'px');
            } else {
                matching_sel =
                    d3.select('.logo-text-component--2014');
                target_sel
                    .style('left', matching_sel.style('right'))
                    .style('bottom', matching_sel.style('bottom'));
            }
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2xvZ28vaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvbG9nby9zY2FsZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9sb2dvL3N2Zy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L2J1dHRvbi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L25hdi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L3JvdGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgTmF2ID0gcmVxdWlyZSgnLi9vdmVybGF5L25hdicpLFxuICAgIExvZ28gPSByZXF1aXJlKCcuL2xvZ28vaW5kZXgnKTtcblxuc2l0ZSgpXG4gICAgLmNvbG9ycygpXG4gICAgLm92ZXJsYXkoKVxuICAgIC5sb2dvKCk7XG5cbmZ1bmN0aW9uIHNpdGUgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbG9yX3ZhbHVlcyA9IHtcbiAgICAgICAgICAgIHB1cnBsZTogJ3JnYigzOCwgMzQsIDk4KTsnLFxuICAgICAgICAgICAgb3JhbmdlOiAncmdiKDI1NSwgNjEsIDU2KTsnLFxuICAgICAgICAgICAgJ2x0LXB1cnBsZSc6ICdyZ2IoMTQ2LCA1MywgMTI1KScsXG4gICAgICAgICAgICBibHVlOiAncmdiKDQzLCA4OSwgMTg0KSdcbiAgICAgICAgfSxcbiAgICAgICAgdXNlX2ltYWdlc19hc19vdmVybGF5X2JhY2tncm91bmQgPSB0cnVlLFxuICAgICAgICBiYWNrZ3JvdW5kX2ltYWdlX3JvdGF0aW9uX21ldGhvZCA9ICdibG9jaycsXG4gICAgICAgIGJhY2tncm91bmRfaW1hZ2Vfcm90YXRpb25fbWV0aG9kcyA9IFsnZmFkZScsICdibG9jayddLFxuICAgICAgICBib2R5ID0gZDMuc2VsZWN0KCdib2R5Jyk7XG5cbiAgICB2YXIgY29sb3JzID0gT2JqZWN0LmtleXMoY29sb3JfdmFsdWVzKTtcblxuICAgIHZhciBuYXYgPSBOYXYoKTtcbiAgICB2YXIgbG9nbyA9IExvZ28oKTtcblxuICAgIHNlbGYuY29sb3JzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmFuZG9tX2luZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY29sb3JzLmxlbmd0aCk7XG5cbiAgICAgICAgdmFyIGNvbG9yID0gY29sb3JzW3JhbmRvbV9pbmRleF07XG4gICAgICAgIHZhciBhbHRfY29sb3JzID0gY29sb3JzLnNsaWNlKDAscmFuZG9tX2luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQoY29sb3JzLnNsaWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX2luZGV4ICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9ycy5sZW5ndGgpKTtcblxuICAgICAgICB2YXIgYWx0X2NvbG9yID0gYWx0X2NvbG9yc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0X2NvbG9ycy5sZW5ndGgpXTtcblxuICAgICAgICBib2R5LmNsYXNzZWQoJ2JvZHktJyArIGNvbG9yLCB0cnVlKTtcbiAgICAgICAgYm9keS5jbGFzc2VkKCdib2R5LWFsdC0nICsgYWx0X2NvbG9yLCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5vdmVybGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFpcnMgPSBkMy5zZWxlY3RBbGwoJy5vdmVybGF5LW5hdi1pdGVtJylcbiAgICAgICAgICAgIC5kYXR1bShmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRhdGFzZXQ7IH0pO1xuXG4gICAgICAgIG5hdi5zZWxlY3Rpb24ocGFpcnMpXG4gICAgICAgICAgICAuc2V0dXAoKTtcblxuICAgICAgICAvLyBzZXR1cCBjbGljayB0cmFja2luZyB3aXRoIGdvb2dsZSBhbmFseXRpY3NcbiAgICAgICAgbmF2LmRpc3BhdGNoXG4gICAgICAgICAgICAub24oJ2FzdGVyaXNrQ2xpY2snLCBmdW5jdGlvbiAob3ZlcmxhaWRfYm9vbGVhbikge1xuICAgICAgICAgICAgICAgIGlmICghX2dhcSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChvdmVybGFpZF9ib29sZWFuKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG9wZW5pbmdcbiAgICAgICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdHb0J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0FzdGVyaXNrIENsaWNrIC0gT3BlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0hvbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb3NpbmdcbiAgICAgICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdHb0J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0FzdGVyaXNrIENsaWNrIC0gQ2xvc2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBYm91dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYubG9nbyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nby5jb250YWluZXIoZDMuc2VsZWN0KCcubG9nby1saW5lJykpXG4gICAgICAgICAgICAuYXR0YWNoUmVzaXplKClcbiAgICAgICAgICAgIC5kdXBlQ29udGFpbmVyKGQzLnNlbGVjdCgnLm92ZXJsYXkgLmxvZ28tbGluZScpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn0iLCJ2YXIgY29ubmVjdExvZ29TY2FsZSA9IHJlcXVpcmUoJy4vc2NhbGUnKTtcbnZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi9zdmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsb2dvICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCxcbiAgICAgICAgZHVwZV9sb2dvX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGxvZ29fc3ZnLFxuICAgICAgICBsb2dvX3RleHRfc2VsLFxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbCxcbiAgICAgICAgc3RyYWlnaHRfbGluZSA9IGQzLnN2Zy5saW5lKCksXG4gICAgICAgIGNvbm5lY3RfbG9nb19zY2FsZSA9IGNvbm5lY3RMb2dvU2NhbGUoKTtcblxuICAgIHZhciB1dGlsaXR5ID0gVXRpbGl0eSgpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsb2dvX2NvbnRhaW5lcl9zZWw7XG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmR1cGVDb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkdXBlX2xvZ29fY29udGFpbmVyX3NlbDtcbiAgICAgICAgZHVwZV9sb2dvX2NvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hdHRhY2hSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvd19zZWxcbiAgICAgICAgICAgIC5vbigncmVzaXplLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVjYWx1bGF0ZV9sb2dvX2xpbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3Njcm9sbC5sb2dvJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlY2FsdWxhdGVfbG9nb19saW5lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBzZXQgdXAgc3ZnXG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgbG9nb19zdmcgPSBsb2dvX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgICAgICAvLyBzZWxlY3Rpb24gb2YgdGhlIHRleHQgdGhhdCB3aWxsIGRlZmluZSB0aGUgbGluZVxuICAgICAgICBsb2dvX3RleHRfc2VsID0gZDMuc2VsZWN0KCdoZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcubG9nby10ZXh0LWNvbXBvbmVudCcpO1xuXG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLmNsYXNzZWQoJ3RvLXJldmVhbCcsIGZhbHNlKTtcblxuICAgICAgICAvLyB2ZXJ0aWNpZXMgZm9yIFxuICAgICAgICB2YXIgdGV4dF92ZXJ0aWNpZXMgPSBsb2dvX2xpbmVfdGV4dF92ZXJ0aWNpZXMobG9nb190ZXh0X3NlbCk7XG4gICAgICAgIHZhciBjb25uZWN0aW5nX3NlZ21lbnRzID1cbiAgICAgICAgICAgICAgICBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWdtZW50cyh0ZXh0X3ZlcnRpY2llcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dfd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgdmFyIG1lcmdlZF9kID0gbWVyZ2VfbGluZXModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpbmdfc2VnbWVudHMpO1xuXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsID0gbG9nb19zdmcuc2VsZWN0QWxsKCcubG9nby1saW5lLW1lcmdlZCcpXG4gICAgICAgICAgICAuZGF0YShbbWVyZ2VkX2RdKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWxpbmUtbWVyZ2VkJylcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkOyB9KTtcblxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbC5jYWxsKHR3ZWVuX2luKTtcblxuICAgICAgICBpZiAoZHVwZV9sb2dvX2NvbnRhaW5lcl9zZWwpIHtcbiAgICAgICAgICAgIGR1cGVfbG9nb19jb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgLmh0bWwobG9nb19jb250YWluZXJfc2VsLmh0bWwoKSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVjYWx1bGF0ZV9sb2dvX2xpbmUgKCkge1xuICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIGxvZ29fc3ZnXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3dfd2lkdGgpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgaWYgKGxvZ29fbGluZV9tZXJnZWRfc2VsKSB7XG4gICAgICAgICAgICB1cGRhdGVfbG9nb19saW5lKHdpbmRvd193aWR0aCwgd2luZG93X2hlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZHVwZV9sb2dvX2NvbnRhaW5lcl9zZWwpIHtcbiAgICAgICAgICAgIGR1cGVfbG9nb19jb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgLmh0bWwobG9nb19jb250YWluZXJfc2VsLmh0bWwoKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbG9nb19saW5lICh3d2lkdGgsIHdoZWlnaHQpIHtcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gbG9nb19saW5lX3RleHRfdmVydGljaWVzKGxvZ29fdGV4dF9zZWwpO1xuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWlnaHQpO1xuXG4gICAgICAgIHZhciBtZXJnZWRfZCA9IG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzKTtcblxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbFxuICAgICAgICAgICAgLmRhdGEoW21lcmdlZF9kXSlcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQ7IH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fbGluZV90ZXh0X3ZlcnRpY2llcyAoc2VsKSB7XG4gICAgICAgIHZhciB0ZXh0X3ZlcnRpY2llcyA9IFtdO1xuXG4gICAgICAgIHNlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHZhciBmaXJzdCwgc2Vjb25kO1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IFtib3VuZHMubGVmdCArIDMsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjU1KSkpXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgLSA2LFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC41NSkpKV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlY29uZCA9IFtib3VuZHMucmlnaHQgKyA2LFxuICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjU1KSkpXTtcblxuICAgICAgICAgICAgdGV4dF92ZXJ0aWNpZXMucHVzaChbZmlyc3QsIHNlY29uZF0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0ZXh0X3ZlcnRpY2llcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWdtZW50cyhzdGFydF9lbmRfcG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVpZ2h0KSB7XG4gICAgICAgIHZhciBsaW5lX3NpemVfdG9fZHJhdyA9XG4gICAgICAgICAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlLmNob29zZV9zaXplKHd3aWR0aCwgd2hlaWdodCk7XG5cbiAgICAgICAgdmFyIGNvbm5lY3Rpbmdfc2VnbWVudHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFydF9lbmRfcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoKGkrMSkgPCBzdGFydF9lbmRfcG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBzdGFydCA9IHN0YXJ0X2VuZF9wb2ludHNbaV1bMV0sXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IHN0YXJ0X2VuZF9wb2ludHNbaSsxXVswXTtcblxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpbmdfc2VnbWVudHNcbiAgICAgICAgICAgICAgICAgICAgLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0X2xvZ29fc2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGluZV9zaXplX3RvX2RyYXddKHN0YXJ0LCBlbmQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29ubmVjdGluZ19zZWdtZW50cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJnZV9saW5lcyh0ZXh0X3ZlcnRpY2llcywgY29ubmVjdGluZ19zZWdtZW50cykge1xuICAgICAgICAvLyB0YWtlcyBhcnJheSBvZiB2ZXJ0ZXggcGFpcnMsIGFuZCBwYXRoXG4gICAgICAgIC8vIGVsZW1lbnRzIG9mIGNvbm5lY3Rpbmcgc2VnbWVudHMuXG4gICAgICAgIC8vIHJldHVybnMgb24gcGF0aCBkIGF0dHJpYnV0ZVxuICAgICAgICB2YXIgZCA9ICcnO1xuXG4gICAgICAgIHZhciB0ZW1wX3N2ZyA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKTtcbiAgICAgICAgdmFyIHRlbXBfcGF0aCA9IHRlbXBfc3ZnXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCd0ZW1wLXBhdGgnKVxuICAgICAgICAgICAgLmRhdGEodGV4dF92ZXJ0aWNpZXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cignZCcsIHN0cmFpZ2h0X2xpbmUpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAndGVtcC1wYXRoJylcbiAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgdGVtcF9wYXRoLmVhY2goZnVuY3Rpb24gKHRkLCB0aSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGQpO1xuICAgICAgICAgICAgdmFyIHRleHRfZCA9IGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkJyk7XG4gICAgICAgICAgICBkICs9IHRleHRfZDtcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW5nX3NlZ21lbnRzW3RpXSkge1xuICAgICAgICAgICAgICAgIHZhciBjb25uZWN0aW5nX2QgPSBjb25uZWN0aW5nX3NlZ21lbnRzW3RpXTtcbiAgICAgICAgICAgICAgICBkICs9IGNvbm5lY3RpbmdfZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbGl0eS5jb252ZXJ0VG9SZWxhdGl2ZSh0ZW1wX3BhdGguYXR0cignZCcsIGQpLm5vZGUoKSk7XG4gICAgICAgIC8vIHJlcGxhY2UgYWxsIGBtYCBpbnN0cnVjdGlvbnMgd2l0aCBgbGAsIGV4Y2VwdFxuICAgICAgICAvLyBmb3IgdGhlIGZpcnN0IG9uZS4gdGhpcyBpcyBhIHJldmVyc2UgcmVnZXhcbiAgICAgICAgZCA9IHRlbXBfcGF0aC5hdHRyKCdkJykucmVwbGFjZSgvKD8hXiltL2csICdsJyk7XG5cbiAgICAgICAgdGVtcF9zdmcucmVtb3ZlKCk7XG4gICAgICAgIHRlbXBfcGF0aC5yZW1vdmUoKTtcblxuICAgICAgICByZXR1cm4gZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9pbihwYXRoKSB7XG4gICAgICAgIHBhdGgudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oODAwMClcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oJ3N0cm9rZS1kYXNoYXJyYXknLCB0d2VlbkRhc2gpXG4gICAgICAgICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBkYXNoIGFycmF5LCBhcyByZXNpemluZ1xuICAgICAgICAgICAgICAgIC8vIHRoZSBicm93c2VyIHdpbGwgY2hhbmdlIHRoZSBsZW5ndGhcbiAgICAgICAgICAgICAgICAvLyBhbmQgdGhlcmUgaXMgbm8gbmVlZCB0byByZS1jb21wdXRlXG4gICAgICAgICAgICAgICAgLy8gdGhlIGRhc2ggYXJyYXkgdG8gZml0IGl0LlxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuRGFzaCgpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcoJzAsJyArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi9zdmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsb2dvX3NjYWxlICgpIHtcbiAgICB2YXIgdXRpbGl0eSA9IFV0aWxpdHkoKTtcblxuICAgIHZhciBzZWdtZW50cyA9IFt7XG4gICAgICAgICAgICBmcm9tOiAnUklTRCcsXG4gICAgICAgICAgICB0bzogJ0dyYWQnLFxuICAgICAgICAgICAgc2NhbGVVc2luZzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFksXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAgICczMDAnOiAnTTMuNTY0LDAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MwLDAsMCw4Ljg1MSwwLDE2LjgxJyArXG4gICAgICAgICAgICAgICAgICAgICdjMCwxMC41NTQtNDEuMDQ1LDk3Ljk4MS00NS45MDQsMTk4LjkxNycgK1xuICAgICAgICAgICAgICAgICAgICAnYy02Ljg2LDE0Mi40OTMsMTAyLjA0OSwxNzQuOTI1LDE5OS40OSwxNzguNDkxJyArXG4gICAgICAgICAgICAgICAgICAgICdjODEuOTY0LDMsMTgyLjk5MS0zMS40OTgsMjA4LjQ5LTEzMy40OTMgJyArXG4gICAgICAgICAgICAgICAgICAgICdjMjcuNTQtMTEwLjE1OS04My4zNDctMTkxLjk5LTE4Ny40OTEtMTQ4LjQ5MyAnICtcbiAgICAgICAgICAgICAgICAgICAgJ0MtMTguOTMyLDE5NC41NDctMjUuODY5LDQzMy44MDUsNjEuOTIxLDUzMy4yOSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2M4Ny43MjksOTkuNDE1LDI2LjAxNCwxNzEuMzM5LTkuNjI1LDE4MS45MTEgJyArXG4gICAgICAgICAgICAgICAgICAgICdjLTY2LjEzOCwxOS42Mi0xMTguNzg5LTMxLjQ5OC03OS42MzgtOTQuMjY2ICcgK1xuICAgICAgICAgICAgICAgICAgICAnYzQ0LjMzNy03MS4wODEsMTkxLjk5LTYzLjIyNiwyMjkuNDg5LTEwLjcyOSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ0MzMjMuODUyLDc4MC41OTMtNTkuMTM2LDkxNS43ODgtNTkuMTM2LDkyMS40MycgK1xuICAgICAgICAgICAgICAgICAgICAnYzAsMTguMDEzLDAsMTExLjY1LDAsMTExLjY1JyxcbiAgICAgICAgICAgICAgICAnNzY4JzogJ005NC4yNi0xNSAnK1xuICAgICAgICAgICAgICAgICAgJ2gyOS43OTYgJyArXG4gICAgICAgICAgICAgICAgICAnYzAsMCwwLjkzNiw4Ljg1MSwwLjkzNiwxNi44MSAnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDI4LjA0Mi0xNS45MDEsNjcuMzctNjEuMTg1LDY3LjM3JyArXG4gICAgICAgICAgICAgICAgICAnQzEwLjUxLDY5LjE4LTE2LDY5LjE4NS0xNiw2OS4xODUnICtcbiAgICAgICAgICAgICAgICAgICd2LTUyJyArXG4gICAgICAgICAgICAgICAgICAnYzAsMCwzNS45MjEtNC4zOTMsNDguNjQ5LDMuNzU4JyArXG4gICAgICAgICAgICAgICAgICAnYzM3Ljg2MSwyNC4yNDIsMjkuNjQ1LDQ2Ljc3Ny0zLjgsODAuMjQyJyArXG4gICAgICAgICAgICAgICAgICAnYy0xNy4wMjcsMTcuMDM4LTQ0LjYyOSwxNy00NC42MjksNDguNjUzJyArXG4gICAgICAgICAgICAgICAgICAvLyAnYzAsMTguMDEzLDAsMjQuMzQ3LDAsMjQuMzQ3J1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMCwwLDAsMjQuMzQ3J1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBmcm9tOiAnR3JhZCcsXG4gICAgICAgICAgICB0bzogJ1Nob3cnLFxuICAgICAgICAgICAgc2NhbGVVc2luZzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFgsXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAgICczMDAnOiAnTTAtMC4xMzgnICtcbiAgICAgICAgICAgICAgICAgICAgICAgJ2M4My42MjcsMC42MiwyMzguNzU1LDAsMzQ0LjE0LDAnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTAsMCAnICtcbiAgICAgICAgICAgICAgICAgICAnYzAsMCAxOC44NjEsMC4wNDQgMjUuODE4LDAuMDk1ICcgK1xuICAgICAgICAgICAgICAgICAgICdjNTkuODk2LDAuNDQ0IDQ1MC4wMDYsMCA0NTAuMDA2LDAgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLDAgMCwwIDAsMjQ4LjUgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLDAgLTYuNzk5LDAgLTY4LDAgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MtMTQ4LjI2NiwwIC0xMzgsLTE1Ny41IDAsLTE1Ny41ICcgK1xuICAgICAgICAgICAgICAgICAgICdjMTEwLDAgMTg5LjYyOCwxMTcuNjUgMzAyLDExNiAnICtcbiAgICAgICAgICAgICAgICAgICAnYzE0Ny42MjEsLTIuMTY3IDE5My43ODgsLTIxOC43MDUgMTkzLjc4OCwtMjg1LjY1NyAnICtcbiAgICAgICAgICAgICAgICAgICAnYzAsLTE5MC4zNDMgLTE2MS43ODgsLTEyOC4zNDMgLTE2MS43ODgsLTQ0LjM0MyAnICtcbiAgICAgICAgICAgICAgICAgICAnYzAsNTIuNDAxIDQ4Ljc3Nyw5NC42MzggMTIzLjQyNCwxMDYgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MxMzIuODk0LDIwLjIyOCAyODUuMTA1LDE2LjkzNiAzMDEuNTYzLDE3ICcgK1xuICAgICAgICAgICAgICAgICAgICdjMTQuNzQ0LDAuMDU4IDk0LjE0NywwLjEzMiA5NC4xNDcsMC4xMzInXG4gICAgICAgICAgICAgICAgLy8gJzc2OCc6ICdNLTE2LTE0Ljc4NiAnICtcbiAgICAgICAgICAgICAgICAvLyAgICAgJ2MxMTUuMDM5LDAuODUyLDM3MS4wMDYsMTQuNSw1NzEuNDI3LTc0LjI2OCAnICtcbiAgICAgICAgICAgICAgICAvLyAgICAgJ2MxNTcuOTI4LTY5Ljk0OCw2Ny4wMzItMTc4Ljk3OC00NS40MDUtMTMwLjk1OCAnICtcbiAgICAgICAgICAgICAgICAvLyAgICAgJ2MtMTQxLjAxNiw2MC4yMjYtMzQ2LjU5NiwzMDAuOTc2LTQzLjAxNiwzMjIuMjI2JyArXG4gICAgICAgICAgICAgICAgLy8gICAgICdjMjAwLDE0LDQ1Ny45NC0xMTcuODIyLDY2Ny45ODctMTE3JyArXG4gICAgICAgICAgICAgICAgLy8gICAgICdjMjQuNDg3LDAuMDk2LDUxLjQ5OS0wLjA4MSw3Ny4wMTMsMCcgK1xuICAgICAgICAgICAgICAgIC8vICAgICAnYzE0Ljc2MSwwLjA0Nyw0MiwwLDQyLDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGZyb206ICdTaG93JyxcbiAgICAgICAgICAgIHRvOiAnMjAxNCcsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgIHBhdGhzOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6ICdNNzMuNjA2LTQ4LjY4OSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MzLjAzNy0wLjAzMiw1Ljc0LTAuMDUyLDguMDg5LTAuMDUyICcgK1xuICAgICAgICAgICAgICAgICAgICAnYzE1LjMzLDAsNi43ODMtNDkuNjI2LTM1LjMzNy01MS4yNTggJyArXG4gICAgICAgICAgICAgICAgICAgICdjLTQzLTEuNjY3LTcwLjc1LDI0LTc3LjMzMyw1NiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ0MtMzYuNTI2LTE3LjAxNS0xNC42NDEsMC0xLjk1LDAnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTExNi43NDUtMTUnICtcbiAgICAgICAgICAgICAgICAgICdjMCwwLDAsMy4xMDMsMCwxMyAnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDEyLjgyLTI1LjcwMiwxOS43NTYtNDQuNzQ1LDI3JyArXG4gICAgICAgICAgICAgICAgICAnQzQ0LjQ4NiwzNS40NjcsMTgsMzYuMDIsMTgsNjEuNScgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDI2LDE3LjUsMzYuODI4LDQ0Ljc3OCwzNi44MjgnICtcbiAgICAgICAgICAgICAgICAgICdDMTAyLjY2Nyw5OC4zMjgsMTA0LDUxLDEwNCw1MScgK1xuICAgICAgICAgICAgICAgICAgJ0gtMTZ2MzYnICtcbiAgICAgICAgICAgICAgICAgICdjMCwwLDM5LjYxOCw5Ljg2NSw2MiwzNicgK1xuICAgICAgICAgICAgICAgICAgJ2MyMS4xNDEsMjQuNjg2LDIzLjU0MSwyOCw0Ny4wMjMsMjgnICtcbiAgICAgICAgICAgICAgICAgICdjMTQuOTc3LDAsMTMuNjk3LDAsMjMuNjk3LDAnICtcbiAgICAgICAgICAgICAgICAgICd2NDcuNzI0J1xuICAgICAgICAgICAgfVxuICAgICAgICB9XTtcblxuICAgIHZhciB0ZW1wX3N2ZyA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgdmFyIHRlbXBfcGF0aCA9IHRlbXBfc3ZnXG4gICAgICAgIC5hcHBlbmQoJ3BhdGgnKTtcblxuICAgIHNlZ21lbnRzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgZC5yZWxhdGl2ZV9wYXRoc19kID0ge307XG4gICAgICAgIGQucmVsYXRpdmVfcGF0aHMgPSB7fTtcbiAgICAgICAgZC5zY2FsZSA9IHt9O1xuXG4gICAgICAgIGZvciAodmFyIHBhdGhfc2l6ZSBpbiBkLnBhdGhzKSB7XG4gICAgICAgICAgICB0ZW1wX3BhdGguYXR0cignZCcsIGQucGF0aHNbcGF0aF9zaXplXSk7XG4gICAgICAgICAgICB1dGlsaXR5LmNvbnZlcnRUb1JlbGF0aXZlKHRlbXBfcGF0aC5ub2RlKCkpO1xuICAgICAgICAgICAgZC5yZWxhdGl2ZV9wYXRoc19kW3BhdGhfc2l6ZV0gPSB0ZW1wX3BhdGguYXR0cignZCcpO1xuICAgICAgICAgICAgZC5yZWxhdGl2ZV9wYXRocyA9IHRlbXBfcGF0aC5ub2RlKCk7XG4gICAgICAgICAgICBkLnNjYWxlW3BhdGhfc2l6ZV0gPSBkLnNjYWxlVXNpbmcoZC5yZWxhdGl2ZV9wYXRocyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRlbXBfc3ZnLnJlbW92ZSgpO1xuICAgIHRlbXBfcGF0aC5yZW1vdmUoKTtcblxuICAgIHZhciBzaXplcyA9IE9iamVjdC5rZXlzKHNlZ21lbnRzWzBdLnBhdGhzKTtcbiAgICBzZWdtZW50cy5jaG9vc2Vfc2l6ZSA9IGZ1bmN0aW9uICh3aW5kb3dfd2lkdGgsIHdpbmRvd19oZWlnaHQpIHtcbiAgICAgICAgdmFyIGNob3NlbiA9IDA7XG4gICAgICAgIHNpemVzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmIChkIDw9IHdpbmRvd193aWR0aCkge1xuICAgICAgICAgICAgICAgIGNob3NlbiA9IGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2hvc2VuLnRvU3RyaW5nKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5zZWdtZW50cyA9IHNlZ21lbnRzO1xuXG4gICAgcmV0dXJuIHNlZ21lbnRzO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN2ZyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcblxuICAgIHNlbGYuY29udmVydFRvUmVsYXRpdmUgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICBmdW5jdGlvbiBzZXQodHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBzZWdzLnJlcGxhY2VJdGVtKHJzZWcsIGkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkeCwgZHksIHgwLCB5MCwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICBzZWdzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgZm9yICh2YXIgeCA9IDAsIHkgPSAwLCBpID0gMCwgbGVuID0gc2Vncy5udW1iZXJPZkl0ZW1zO1xuICAgICAgICAgICAgIGkgPCBsZW47XG4gICAgICAgICAgICAgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzZWcgPSBzZWdzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgYyAgID0gc2VnLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG5cbiAgICAgICAgICAgIGlmICgvW01MSFZDU1FUQVp6XS8udGVzdChjKSkge1xuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDEgLSB4O1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDIgLSB4O1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTEgLSB5O1xuICAgICAgICAgICAgICAgIGlmICgneTInIGluIHNlZykgeTIgPSBzZWcueTIgLSB5O1xuICAgICAgICAgICAgICAgIGlmICgneCcgIGluIHNlZykgZHggPSAteCArICh4ID0gc2VnLngpO1xuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSAteSArICh5ID0gc2VnLnkpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdNJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTW92ZXRvJyxkeCxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0xpbmV0bycsZHgsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdMaW5ldG9Ib3Jpem9udGFsJyxkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVic6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0xpbmV0b1ZlcnRpY2FsJyxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9DdWJpYycsZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvQ3ViaWNTbW9vdGgnLGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdRJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b1F1YWRyYXRpYycsZHgsZHkseDEseTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvUXVhZHJhdGljU21vb3RoJyxkeCxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0FyYycsZHgsZHksc2VnLnIxLHNlZy5yMixzZWcuYW5nbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnLmxhcmdlQXJjRmxhZyxzZWcuc3dlZXBGbGFnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdaJzogY2FzZSAneic6IHggPSB4MDsgeSA9IHkwOyBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSB4ICs9IHNlZy54O1xuICAgICAgICAgICAgICAgIGlmICgneScgaW4gc2VnKSB5ICs9IHNlZy55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIHN0YXJ0IG9mIGEgc3VicGF0aFxuICAgICAgICAgICAgaWYgKGMgPT0gJ00nIHx8IGMgPT0gJ20nKSB7XG4gICAgICAgICAgICAgICAgeDAgPSB4O1xuICAgICAgICAgICAgICAgIHkwID0geTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGguZ2V0QXR0cmlidXRlKCdkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9aL2csICd6JykpO1xuICAgIH07XG5cbiAgICBzZWxmLnBhdGhEZWx0YSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHN0YXJ0ID0gcGF0aC5nZXRQb2ludEF0TGVuZ3RoKDApLFxuICAgICAgICAgICAgZW5kID0gcGF0aC5nZXRQb2ludEF0TGVuZ3RoKHBhdGguZ2V0VG90YWxMZW5ndGgoKSk7XG5cbiAgICAgICAgZGVsdGEueCA9IGVuZC54IC0gc3RhcnQueDtcbiAgICAgICAgZGVsdGEueSA9IGVuZC55IC0gc3RhcnQueTtcblxuICAgICAgICByZXR1cm4gZGVsdGE7XG4gICAgfTtcblxuICAgIC8vIHBhc3MgaW4gYSBwYXRoIGVsZW1lbnRcbiAgICAvLyBhbmQgdGhlIHBhdGggc2VnZW1lbnQgaW5kaWNpZXNcbiAgICAvLyB0aGF0IHdpbGwgYmUgc2NhbGVkXG4gICAgc2VsZi5zY2FsZUFuY2hvclkgPSBmdW5jdGlvbiAocGF0aCwgYW5jaG9ycykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGVBbmNob3JZJyk7XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgICAgICBkcmF3bjogc2VsZi5wYXRoRGVsdGEocGF0aClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmlnaW5hbF9kID0gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgZGVsdGFcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIG9yaWdpbmFsX2QpO1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgdmFyIGZpcnN0X3NlZ21lbnQgPSBzZWdtZW50cy5nZXRJdGVtKDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3NlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhdGhTZWdUeXBlQXNMZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgPT09ICdtJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50X3NlZyA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0FicyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2VtZW50X3NlZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gYW5jaG9ycykge1xuICAgICAgICAgICAgICAgIHZhciB0b19yZXBsYWNlID0gc2VnbWVudHMuZ2V0SXRlbShhbmNob3JzW25hbWVdKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZV93aXRoID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnQ3VydmV0b0N1YmljUmVsKFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS55ICsgKChkZWx0YS5jdXJyZW50LnktXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhLmRyYXduLnkpLzIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS54MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueTEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS55Mik7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZV93aXRoLCBhbmNob3JzW25hbWVdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHNlbGYuc2NhbGVQcm9wb3J0aW9uYWwgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IHNlbGYucGF0aERlbHRhKHBhdGgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsJyk7XG4gICAgICAgICAgICBkZWx0YS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGVuZFswXSAtIHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50cy5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IHNlZy54ICAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IHNlZy55ICAqIHJhdGlvLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTW92ZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b0hvcml6b250YWwnLCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvVmVydGljYWwnLCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpY1Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbFkgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICAvLyBzY2FsZSB5LCBmaXQgeFxuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IHNlbGYucGF0aERlbHRhKHBhdGgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyksXG4gICAgICAgICAgICBmaXRfeCA9IGZhbHNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2UoYWxsX3NlZ21lbnRzLCBzZWdtZW50X3RvX3JlcGxhY2UsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgYWxsX3NlZ21lbnRzLnJlcGxhY2VJdGVtKHJzZWcsIHNlZ21lbnRfdG9fcmVwbGFjZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhLmRyYXduLngpID4gMC4xKSB7XG4gICAgICAgICAgICBmaXRfeCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZVByb3BvcnRpb25hbCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGVsdGEuZGlmZiA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LnggLSBkZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueSAtIGRlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR4LCBkeSwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICAgICAgeCA9IHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHkgPSBzdGFydFsxXSxcbiAgICAgICAgICAgICAgICBzZWdtZW50X2NvdW50ID0gc2VnbWVudHMubnVtYmVyT2ZJdGVtcztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VnbWVudF9jb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ21lbnRzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgICAgIGMgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDE7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MjtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoZml0X3gpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIGR4ID0gc2VnLnggK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRlbHRhLmRpZmYueC8oc2VnbWVudF9jb3VudC0xKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIGR4ID0gc2VnLng7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSBzZWcueSAgKiByYXRpby55O1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ01vdmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9Ib3Jpem9udGFsJywgZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b1ZlcnRpY2FsJywgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpYycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgxLHkxLHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWNTbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHNlbGYuc2NhbGVQcm9wb3J0aW9uYWxYID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBzZWxmLnBhdGhEZWx0YShwYXRoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuXG4gICAgICAgIGNvbnNvbGUubG9nKCdkcmF3biBkZWx0YScpO1xuICAgICAgICBjb25zb2xlLmxvZyhkZWx0YS5kcmF3bik7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsWCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR4LCBkeSwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICAgICAgeCA9IHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHkgPSBzdGFydFsxXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VnbWVudHMubnVtYmVyT2ZJdGVtczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ21lbnRzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgICAgIGMgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDEgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDIgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTE7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MjtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnICBpbiBzZWcpIGR4ID0gc2VnLnggICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTW92ZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b0hvcml6b250YWwnLCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvVmVydGljYWwnLCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpY1Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBSb3RhdGVTdmcgPSByZXF1aXJlKCcuL3JvdGF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJ1dHRvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgc2VsZWN0aW9uLFxuICAgICAgICBkaW1lbnNpb25zO1xuXG4gICAgdmFyIHJvdGF0ZV9zdmcgPSBSb3RhdGVTdmcoKTtcblxuICAgIHNlbGYuc2VsZWN0aW9uID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gc2VsZWN0aW9uO1xuICAgICAgICBzZWxlY3Rpb24gPSBfO1xuXG4gICAgICAgIGRpbWVuc2lvbnMgPSBnZXRfZGltZW5zaW9ucyhzZWxlY3Rpb24pO1xuICAgICAgICByb3RhdGVfc3ZnXG4gICAgICAgICAgICAuc2VsZWN0aW9uKHNlbGVjdGlvbi5zZWxlY3QoJyNmbG93ZXInKSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc3RhcnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHJvdGF0ZV9zdmcuc3RhcnQoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldF9kaW1lbnNpb25zIChzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdGlvbi5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBCdXR0b24gPSByZXF1aXJlKCcuL2J1dHRvbicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5hdiAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgdGFyZ2V0X3NlbCxcbiAgICAgICAgb3ZlcmxhaWQgPSBmYWxzZSxcbiAgICAgICAgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpO1xuXG4gICAgdmFyIGJ1dHRvbiA9IEJ1dHRvbigpO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhc3Rlcmlza0NsaWNrJyk7XG5cbiAgICBzZWxmLnNlbGVjdGlvbiA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRhcmdldF9zZWw7XG4gICAgICAgIHRhcmdldF9zZWwgPSBfO1xuXG4gICAgICAgIGJ1dHRvblxuICAgICAgICAgICAgLnNlbGVjdGlvbih0YXJnZXRfc2VsKVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYub3ZlcmxhaWQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvdmVybGFpZDtcbiAgICAgICAgb3ZlcmxhaWQgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5zZXR1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRfc2VsKSB0aHJvdyBcInJlcXVpcmVzIGVsZW1lbnRzIHRvIHBhaXJcIjtcbiAgICAgICAgdGFyZ2V0X3NlbFxuICAgICAgICAgICAgLm9uKCdjbGljay5uYXYnLCBmdW5jdGlvbiAoZCwgZGkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJyNmbG93ZXInKTtcbiAgICAgICAgICAgICAgICBvdmVybGFpZCA9IG92ZXJsYWlkID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlX2RlYWN0aXZhdGUoZCk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hc3Rlcmlza0NsaWNrKG92ZXJsYWlkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIFxuICAgICAgICBwbGFjZV9idXR0b24oKTtcblxuICAgICAgICB3aW5kb3dfc2VsXG4gICAgICAgICAgICAub24oJ3Jlc2l6ZS5uYXYnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWN0aXZhdGVfZGVhY3RpdmF0ZSAoZCkge1xuICAgICAgICB2YXIgb3ZlcmxheSA9IGQzLnNlbGVjdChkLmFjdGl2YXRlKTtcbiAgICAgICAgb3ZlcmxheS5jbGFzc2VkKCdvdmVybGFpZCcsIG92ZXJsYWlkKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgb3ZlcmxhaWQpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKGQuYm9keSwgb3ZlcmxhaWQpO1xuICAgICAgICBwbGFjZV9idXR0b24oKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZV9idXR0b24gKCkge1xuICAgICAgICB2YXIgd3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHZhciB3aGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIHZhciBiYm94ID0gdGFyZ2V0X3NlbC5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHZhciBtYXRjaGluZ19zZWw7XG5cbiAgICAgICAgaWYgKG92ZXJsYWlkKSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0X2hlaWdodCA9IGJib3guaGVpZ2h0O1xuICAgICAgICAgICAgbWF0Y2hpbmdfc2VsID1cbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5sb2dvLXRleHQtY29tcG9uZW50LS1yaXNkJyk7XG4gICAgICAgICAgICB0YXJnZXRfc2VsLnN0eWxlKCdsZWZ0JywgKHd3aWR0aCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJib3gud2lkdGggLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoK21hdGNoaW5nX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF0pKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4Jyk7XG4gICAgICAgICAgICB0YXJnZXRfc2VsLnN0eWxlKCdib3R0b20nLCAod2hlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmJveC5oZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgrbWF0Y2hpbmdfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAod3dpZHRoIDwgNzY4KSB7XG4gICAgICAgICAgICAgICAgbWF0Y2hpbmdfc2VsID1cbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcubG9nby10ZXh0LWNvbXBvbmVudC0tc2hvdycpO1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaGluZ19ib3ggPSBtYXRjaGluZ19zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIHRhcmdldF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgKCh3d2lkdGggLSBiYm94LndpZHRoKS8yKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdib3R0b20nLCAoKCttYXRjaGluZ19zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2JvdHRvbScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF0pIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJib3guaGVpZ2h0LVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hpbmdfYm94LmhlaWdodCkvMikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXRjaGluZ19zZWwgPVxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5sb2dvLXRleHQtY29tcG9uZW50LS0yMDE0Jyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0X3NlbFxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCBtYXRjaGluZ19zZWwuc3R5bGUoJ3JpZ2h0JykpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnYm90dG9tJywgbWF0Y2hpbmdfc2VsLnN0eWxlKCdib3R0b20nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByb3RhdGUgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHNlbGVjdGlvbixcbiAgICAgICAgb2Zmc2V0ID0gMCxcbiAgICAgICAgc3BlZWQgPSAwLjIsXG4gICAgICAgIHN0YXJ0ID0gRGF0ZS5ub3coKSxcbiAgICAgICAgcmFkaXVzO1xuXG4gICAgdmFyIHZlbmRvciA9IFtcIlwiLCBcIi13ZWJraXQtXCIsIFwiLW1vei1cIiwgXCItbXMtXCIsIFwiLW8tXCJdLnJlZHVjZShcbiAgICAgICAgZnVuY3Rpb24gKHAsIHYpIHtcbiAgICAgICAgICAgIHJldHVybiB2ICsgXCJ0cmFuc2Zvcm1cIiBpbiBkb2N1bWVudC5ib2R5LnN0eWxlID8gdiA6IHA7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5zZWxlY3Rpb24gPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzZWxlY3Rpb247XG4gICAgICAgIHNlbGVjdGlvbiA9IF87XG5cbiAgICAgICAgcmFkaXVzID0gc2VsZWN0aW9uLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQvMjtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RhcnQgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3BlZWQgPSAxO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3BlZWQgPSAwLjI7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljay5yb3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWVkID0gMC4yO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIHNwZWVkID0gNTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgZDMudGltZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFuZ2xlID0gKERhdGUubm93KCkgLSBzdGFydCkgKiBzcGVlZDtcbiAgICAgICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIC5zdHlsZSh2ZW5kb3IrJ3RyYW5zZm9ybScsXG4gICAgICAgICAgICAgICAgICAgICAgJ3JvdGF0ZSgnKyAoYW5nbGUvcmFkaXVzKSArJ2RlZyknKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldF9wb3NpdGlvbiAoKSB7XG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdmFyIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgXG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyJdfQ==
