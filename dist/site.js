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
            .delayPastReveal(
                    d3.selectAll('.delay-class-post-transition'))
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
        logo_svg,
        logo_text_sel,
        logo_line_merged_sel,
        straight_line = d3.svg.line(),
        connect_logo_scale = connectLogoScale(),
        delay_past_reveal_sel;

    var utility = Utility();

    self.container = function (_) {
        if (!arguments.length) return logo_container_sel;
        logo_container_sel = _;
        return self;
    };

    self.delayPastReveal = function (_) {
        if (!arguments.length) return delay_past_reveal_sel;
        delay_past_reveal_sel = _;
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

        setup_reveal();

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
    };

    function setup_reveal () {
        d3.select('body').classed('to-reveal', false);

        delay_past_reveal_sel
            .datum(function () { return this.dataset; });

        delay_past_reveal_sel
            .on('transitionend', function (d) {
                d3.select(this).classed(d.delayedclass, true);
                delay_past_reveal_sel
                    .on('transitionend', null);
            })
            .on('webkitTransitionEnd', function (d) {
                // console.log('webkitTransitionEnd');
                d3.select(this).classed(d.delayedclass, true);
                delay_past_reveal_sel
                    .on('webkitTransitionEnd', null);
            })
            .on('oTransitionEnd', function (d) {
                // console.log('oTransitionEnd');
                d3.select(this).classed(d.delayedclass, true);
                delay_past_reveal_sel
                    .on('oTransitionEnd', null);
            })
            .on('otransitionend', function (d) {
                // console.log('otransitionend');
                d3.select(this).classed(d.delayedclass, true);
                delay_past_reveal_sel
                    .on('otransitionend', null);
            })
            .on('MSTransitionEnd', function (d) {
                // console.log('MSTransitionEnd');
                d3.select(this).classed(d.delayedclass, true);
                delay_past_reveal_sel
                    .on('MSTransitionEnd', null);
            });
    }

    function recalulate_logo_line () {
        var window_width = window.innerWidth,
            window_height = window.innerHeight;

        logo_svg
            .attr('width', window_width)
            .attr('height', window_height);

        if (logo_line_merged_sel) {
            update_logo_line(window_width, window_height);
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
                            .scale[line_size_to_draw](start, end));
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
            scaleUsing: {
                '300': utility.scaleProportionalY,
                '768': utility.scaleProportionalY,
                '1024': utility.scaleProportional
            },
            drawn_delta: {
                '300': {
                    x: -62.699971199035645,
                    y: 1033.080078125
                },
                '768': {
                    x: -110.04000854492188,
                    y: 189.18499755859375
                },
                '1024': {
                    x: -117.3299635052681,
                    y: 389.18597412109375
                }
            },
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
                  'c0,0,0,0,0,24.347',
                '1024': 'M0.333,0H1408' +
                  'c0,0,7.37,54.536-56.381,75.629' +
                  'c-49.718,16.45-181.128-16.262-231.989,26.999' +
                  'C989.136,213.622,1149.628,344.18,920.153,344.18' +
                  'c-53.298,0-210.641,0.005-210.641,0.005l0-272' +
                  'c0,0,197.128-16.055,182.129,88.94' +
                  'c-24.768,173.378-452.821-81.513-745.463-71.996' +
                  'c-184.491,6-234.178,65.89-271.848,139.493' +
                  'c-36.104,70.544-10.484,160.564,1.386,160.564' +
                  'c2.241,0,7.284,0,7.284,0'
            }
        }, {
            from: 'Grad',
            to: 'Show',
            scaleUsing: {
                '300': utility.scaleProportionalX,
                '768': utility.scaleProportionalX,
                '1024': utility.scaleProportionalX
            },
            drawn_delta: {
                '300': {
                    x: 344.1400146484375,
                    y: 0
                },
                '768': {
                    x: 1260.9580078125,
                    y: 0.22698596119880676
                },
                '1024': {
                    x: 1260.4999277591705,
                    y: 0.000002384185791015625
                }
            },
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
                   'c14.744,0.058 94.147,0.132 94.147,0.132',
                '1024': 'M0.701,3.815' +
                  'h11.744'+
                  'v271.17h-154.502'+
                  'c0,0,7.464-82.051,46.198-121.995'+
                  'c47.998-49.498,146.853-67.249,194.99-38.998'+
                  'c121.494,71.304,80.996,232.491,231.016,225.166'+
                  'c197.067-9.622,152.965-397.655,29.971-436.653'+
                  'c-170.167-53.955-179.991,206.067,125.333,206.067'+
                  'c200.489,0,314.145-104.757,667.987-104.757'+
                  'c36.753,0,107.763,0,107.763,0'
            }
        }, {
            from: 'Show',
            to: '2014',
            scaleUsing: {
                '300': utility.scaleProportionalY,
                '768': utility.scaleProportionalY,
                '1024': utility.scaleProportional
            },
            drawn_delta: {
                '300': {
                    x: -75.55600547790527,
                    y: 48.68900680541992
                },
                '768': {
                    x: -0.0250091552734375,
                    y: 213.7239990234375
                },
                '1024': {
                    x: -102.24999646097422,
                    y: 410.52901904284954
                }
            },
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
                  'v47.724',
                '1024': 'M0.063-0.147'+
                  'c0,0,7.588,0,9.494,0' +
                  'c0,0-13.701-73.226-98.125-62.312'+
                  'c-85.62,11.069-137.62,133.069-227.541,212.611'+
                  'c-127.158,112.481-307.898,201.236-415.567,201.236'+
                  'c-127.502,0-163.512-107.964-83.058-153.371'+
                  'c96.709-54.581,287.125,153.491,431.118,153.491'+
                  'c54.15,0,139.428-18.084,152.395-100.486'+
                  'c15.251-96.92,81.033-133.598,138.59-97.598'+
                  'c25.122,15.713,49.443,72-10.557,117'+
                  'c-43.953,32.965-63.937,53-63.937,97.583'+
                  'c0,42.469,39.198,42.375,48.497,42.375'+
                  'c5.133,0,16.441,0,16.441,0'
            }
        }];

    var temp_svg = d3.select('body')
        .append('svg')
        .style('display', 'none');
    var temp_path = temp_svg
        .append('path');

    var measure_for_ff = false;

    segments.forEach(function (d, i) {
        d.relative_paths_d = {};
        d.relative_paths = {};
        d.scale = {};

        if (measure_for_ff) {
            console.log(segments[i].from + ' ' + segments[i].to);
        }

        for (var path_size in d.paths) {
            temp_path.attr('d', d.paths[path_size]);
            utility.convertToRelative(temp_path.node());
            d.relative_paths_d[path_size] = temp_path.attr('d');
            d.relative_paths[path_size] = temp_path.node();
            
            if (measure_for_ff) {
                console.log('size: ', path_size);
                console.log('delta: ', utility.pathDelta(
                    d.relative_paths[path_size]));
            }

            d.scale[path_size] =
                d.scaleUsing[path_size](d.relative_paths[path_size],
                                        d.drawn_delta[path_size]);
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

    self.scaleProportional = function (path, drawn_delta) {
        var delta = {
                drawn: drawn_delta
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

    self.scaleProportionalY = function (path, drawn_delta) {
        // scale y, fit x
        var delta = {
                drawn: drawn_delta
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

    self.scaleProportionalX = function (path, drawn_delta) {
        var delta = {
                drawn: drawn_delta
            },
            original_d = path.getAttribute('d');

        console.log('drawn delta');
        console.log(delta.drawn);
        console.log(path);

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
            console.log('current delta');
            console.log(delta.current);
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
        window_sel = d3.select(window),
        removable_text = [{
            text: 'Go!'
        }];

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
        var overlay = d3.selectAll(d.activate);
        overlay.classed('overlaid', overlaid);
        body_sel.classed('no-scroll', overlaid);
        body_sel.classed(d.body, overlaid);
        place_button();
    }

    function place_button () {
        var wwidth = window.innerWidth;
        var wheight = window.innerHeight;

        var matching_sel;
        var bbox;

        if (overlaid) {
            bbox = target_sel.node().getBoundingClientRect();
            var p_bbox = target_sel
                                .select('p')
                                .node()
                                .getBoundingClientRect();
            
            var target_height = bbox.height;
            matching_sel =
                d3.select('.logo-text-component--risd');
            
            target_sel.style('left', (wwidth +
                                      p_bbox.width -
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
                bbox = target_sel.node().getBoundingClientRect();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2xvZ28vaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvbG9nby9zY2FsZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9sb2dvL3N2Zy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L2J1dHRvbi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L25hdi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L3JvdGF0ZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIE5hdiA9IHJlcXVpcmUoJy4vb3ZlcmxheS9uYXYnKSxcbiAgICBMb2dvID0gcmVxdWlyZSgnLi9sb2dvL2luZGV4Jyk7XG5cbnNpdGUoKVxuICAgIC5jb2xvcnMoKVxuICAgIC5vdmVybGF5KClcbiAgICAubG9nbygpO1xuXG5mdW5jdGlvbiBzaXRlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBjb2xvcl92YWx1ZXMgPSB7XG4gICAgICAgICAgICBwdXJwbGU6ICdyZ2IoMzgsIDM0LCA5OCk7JyxcbiAgICAgICAgICAgIG9yYW5nZTogJ3JnYigyNTUsIDYxLCA1Nik7JyxcbiAgICAgICAgICAgICdsdC1wdXJwbGUnOiAncmdiKDE0NiwgNTMsIDEyNSknLFxuICAgICAgICAgICAgYmx1ZTogJ3JnYig0MywgODksIDE4NCknXG4gICAgICAgIH0sXG4gICAgICAgIHVzZV9pbWFnZXNfYXNfb3ZlcmxheV9iYWNrZ3JvdW5kID0gdHJ1ZSxcbiAgICAgICAgYmFja2dyb3VuZF9pbWFnZV9yb3RhdGlvbl9tZXRob2QgPSAnYmxvY2snLFxuICAgICAgICBiYWNrZ3JvdW5kX2ltYWdlX3JvdGF0aW9uX21ldGhvZHMgPSBbJ2ZhZGUnLCAnYmxvY2snXSxcbiAgICAgICAgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG4gICAgdmFyIGNvbG9ycyA9IE9iamVjdC5rZXlzKGNvbG9yX3ZhbHVlcyk7XG5cbiAgICB2YXIgbmF2ID0gTmF2KCk7XG4gICAgdmFyIGxvZ28gPSBMb2dvKCk7XG5cbiAgICBzZWxmLmNvbG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJhbmRvbV9pbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvbG9ycy5sZW5ndGgpO1xuXG4gICAgICAgIHZhciBjb2xvciA9IGNvbG9yc1tyYW5kb21faW5kZXhdO1xuICAgICAgICB2YXIgYWx0X2NvbG9ycyA9IGNvbG9ycy5zbGljZSgwLHJhbmRvbV9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KGNvbG9ycy5zbGljZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9pbmRleCArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcnMubGVuZ3RoKSk7XG5cbiAgICAgICAgdmFyIGFsdF9jb2xvciA9IGFsdF9jb2xvcnNbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdF9jb2xvcnMubGVuZ3RoKV07XG5cbiAgICAgICAgYm9keS5jbGFzc2VkKCdib2R5LScgKyBjb2xvciwgdHJ1ZSk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnYm9keS1hbHQtJyArIGFsdF9jb2xvciwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYub3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhaXJzID0gZDMuc2VsZWN0QWxsKCcub3ZlcmxheS1uYXYtaXRlbScpXG4gICAgICAgICAgICAuZGF0dW0oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kYXRhc2V0OyB9KTtcblxuICAgICAgICBuYXYuc2VsZWN0aW9uKHBhaXJzKVxuICAgICAgICAgICAgLnNldHVwKCk7XG5cbiAgICAgICAgLy8gc2V0dXAgY2xpY2sgdHJhY2tpbmcgd2l0aCBnb29nbGUgYW5hbHl0aWNzXG4gICAgICAgIG5hdi5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdhc3Rlcmlza0NsaWNrJywgZnVuY3Rpb24gKG92ZXJsYWlkX2Jvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9nYXEpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAob3ZlcmxhaWRfYm9vbGVhbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBvcGVuaW5nXG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR29CdXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBc3RlcmlzayBDbGljayAtIE9wZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdIb21lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zaW5nXG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR29CdXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBc3RlcmlzayBDbGljayAtIENsb3NlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQWJvdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmxvZ28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZ28uY29udGFpbmVyKGQzLnNlbGVjdCgnLmxvZ28tbGluZScpKVxuICAgICAgICAgICAgLmF0dGFjaFJlc2l6ZSgpXG4gICAgICAgICAgICAuZGVsYXlQYXN0UmV2ZWFsKFxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3RBbGwoJy5kZWxheS1jbGFzcy1wb3N0LXRyYW5zaXRpb24nKSlcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59IiwidmFyIGNvbm5lY3RMb2dvU2NhbGUgPSByZXF1aXJlKCcuL3NjYWxlJyk7XG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoJy4vc3ZnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9nbyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGxvZ29fc3ZnLFxuICAgICAgICBsb2dvX3RleHRfc2VsLFxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbCxcbiAgICAgICAgc3RyYWlnaHRfbGluZSA9IGQzLnN2Zy5saW5lKCksXG4gICAgICAgIGNvbm5lY3RfbG9nb19zY2FsZSA9IGNvbm5lY3RMb2dvU2NhbGUoKSxcbiAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsO1xuXG4gICAgdmFyIHV0aWxpdHkgPSBVdGlsaXR5KCk7XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxvZ29fY29udGFpbmVyX3NlbDtcbiAgICAgICAgbG9nb19jb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGVsYXlQYXN0UmV2ZWFsID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGVsYXlfcGFzdF9yZXZlYWxfc2VsO1xuICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hdHRhY2hSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvd19zZWxcbiAgICAgICAgICAgIC5vbigncmVzaXplLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVjYWx1bGF0ZV9sb2dvX2xpbmUoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3Njcm9sbC5sb2dvJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlY2FsdWxhdGVfbG9nb19saW5lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBzZXQgdXAgc3ZnXG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgbG9nb19zdmcgPSBsb2dvX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgICAgICAvLyBzZWxlY3Rpb24gb2YgdGhlIHRleHQgdGhhdCB3aWxsIGRlZmluZSB0aGUgbGluZVxuICAgICAgICBsb2dvX3RleHRfc2VsID0gZDMuc2VsZWN0KCdoZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcubG9nby10ZXh0LWNvbXBvbmVudCcpO1xuXG4gICAgICAgIHNldHVwX3JldmVhbCgpO1xuXG4gICAgICAgIC8vIHZlcnRpY2llcyBmb3IgXG4gICAgICAgIHZhciB0ZXh0X3ZlcnRpY2llcyA9IGxvZ29fbGluZV90ZXh0X3ZlcnRpY2llcyhsb2dvX3RleHRfc2VsKTtcbiAgICAgICAgdmFyIGNvbm5lY3Rpbmdfc2VnbWVudHMgPVxuICAgICAgICAgICAgICAgIGxvZ29fbGluZV9jb25uZWN0aW5nX3NlZ21lbnRzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd193aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICB2YXIgbWVyZ2VkX2QgPSBtZXJnZV9saW5lcyh0ZXh0X3ZlcnRpY2llcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGluZ19zZWdtZW50cyk7XG5cbiAgICAgICAgbG9nb19saW5lX21lcmdlZF9zZWwgPSBsb2dvX3N2Zy5zZWxlY3RBbGwoJy5sb2dvLWxpbmUtbWVyZ2VkJylcbiAgICAgICAgICAgIC5kYXRhKFttZXJnZWRfZF0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tbGluZS1tZXJnZWQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQ7IH0pO1xuXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsLmNhbGwodHdlZW5faW4pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzZXR1cF9yZXZlYWwgKCkge1xuICAgICAgICBkMy5zZWxlY3QoJ2JvZHknKS5jbGFzc2VkKCd0by1yZXZlYWwnLCBmYWxzZSk7XG5cbiAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsXG4gICAgICAgICAgICAuZGF0dW0oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kYXRhc2V0OyB9KTtcblxuICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWxcbiAgICAgICAgICAgIC5vbigndHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoZC5kZWxheWVkY2xhc3MsIHRydWUpO1xuICAgICAgICAgICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbFxuICAgICAgICAgICAgICAgICAgICAub24oJ3RyYW5zaXRpb25lbmQnLCBudWxsKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd3ZWJraXRUcmFuc2l0aW9uRW5kJyk7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoZC5kZWxheWVkY2xhc3MsIHRydWUpO1xuICAgICAgICAgICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbFxuICAgICAgICAgICAgICAgICAgICAub24oJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBudWxsKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ29UcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnb1RyYW5zaXRpb25FbmQnKTtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChkLmRlbGF5ZWRjbGFzcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5vbignb1RyYW5zaXRpb25FbmQnLCBudWxsKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ290cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnb3RyYW5zaXRpb25lbmQnKTtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChkLmRlbGF5ZWRjbGFzcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5vbignb3RyYW5zaXRpb25lbmQnLCBudWxsKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ01TVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ01TVHJhbnNpdGlvbkVuZCcpO1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKGQuZGVsYXllZGNsYXNzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLm9uKCdNU1RyYW5zaXRpb25FbmQnLCBudWxsKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlY2FsdWxhdGVfbG9nb19saW5lICgpIHtcbiAgICAgICAgdmFyIHdpbmRvd193aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBsb2dvX3N2Z1xuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2luZG93X3dpZHRoKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgIGlmIChsb2dvX2xpbmVfbWVyZ2VkX3NlbCkge1xuICAgICAgICAgICAgdXBkYXRlX2xvZ29fbGluZSh3aW5kb3dfd2lkdGgsIHdpbmRvd19oZWlnaHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlX2xvZ29fbGluZSAod3dpZHRoLCB3aGVpZ2h0KSB7XG4gICAgICAgIHZhciB0ZXh0X3ZlcnRpY2llcyA9IGxvZ29fbGluZV90ZXh0X3ZlcnRpY2llcyhsb2dvX3RleHRfc2VsKTtcbiAgICAgICAgdmFyIGNvbm5lY3Rpbmdfc2VnbWVudHMgPVxuICAgICAgICAgICAgICAgIGxvZ29fbGluZV9jb25uZWN0aW5nX3NlZ21lbnRzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVpZ2h0KTtcblxuICAgICAgICB2YXIgbWVyZ2VkX2QgPSBtZXJnZV9saW5lcyh0ZXh0X3ZlcnRpY2llcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGluZ19zZWdtZW50cyk7XG5cbiAgICAgICAgbG9nb19saW5lX21lcmdlZF9zZWxcbiAgICAgICAgICAgIC5kYXRhKFttZXJnZWRfZF0pXG4gICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkOyB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dvX2xpbmVfdGV4dF92ZXJ0aWNpZXMgKHNlbCkge1xuICAgICAgICB2YXIgdGV4dF92ZXJ0aWNpZXMgPSBbXTtcblxuICAgICAgICBzZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgKyAzLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC41NSkpKV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gW2JvdW5kcy5sZWZ0IC0gNixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNTUpKSldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZWNvbmQgPSBbYm91bmRzLnJpZ2h0ICsgNixcbiAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC41NSkpKV07XG5cbiAgICAgICAgICAgIHRleHRfdmVydGljaWVzLnB1c2goW2ZpcnN0LCBzZWNvbmRdKTtcblxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gdGV4dF92ZXJ0aWNpZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHMoc3RhcnRfZW5kX3BvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3d2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlaWdodCkge1xuICAgICAgICB2YXIgbGluZV9zaXplX3RvX2RyYXcgPVxuICAgICAgICAgICAgICAgIGNvbm5lY3RfbG9nb19zY2FsZS5jaG9vc2Vfc2l6ZSh3d2lkdGgsIHdoZWlnaHQpO1xuXG4gICAgICAgIHZhciBjb25uZWN0aW5nX3NlZ21lbnRzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc3RhcnRfZW5kX3BvaW50cy5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICBpZiAoKGkrMSkgPCBzdGFydF9lbmRfcG9pbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciBzdGFydCA9IHN0YXJ0X2VuZF9wb2ludHNbaV1bMV0sXG4gICAgICAgICAgICAgICAgICAgIGVuZCA9IHN0YXJ0X2VuZF9wb2ludHNbaSsxXVswXTtcblxuICAgICAgICAgICAgICAgIGNvbm5lY3Rpbmdfc2VnbWVudHNcbiAgICAgICAgICAgICAgICAgICAgLnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0X2xvZ29fc2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2NhbGVbbGluZV9zaXplX3RvX2RyYXddKHN0YXJ0LCBlbmQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29ubmVjdGluZ19zZWdtZW50cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJnZV9saW5lcyh0ZXh0X3ZlcnRpY2llcywgY29ubmVjdGluZ19zZWdtZW50cykge1xuICAgICAgICAvLyB0YWtlcyBhcnJheSBvZiB2ZXJ0ZXggcGFpcnMsIGFuZCBwYXRoXG4gICAgICAgIC8vIGVsZW1lbnRzIG9mIGNvbm5lY3Rpbmcgc2VnbWVudHMuXG4gICAgICAgIC8vIHJldHVybnMgb24gcGF0aCBkIGF0dHJpYnV0ZVxuICAgICAgICB2YXIgZCA9ICcnO1xuXG4gICAgICAgIHZhciB0ZW1wX3N2ZyA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKTtcbiAgICAgICAgdmFyIHRlbXBfcGF0aCA9IHRlbXBfc3ZnXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCd0ZW1wLXBhdGgnKVxuICAgICAgICAgICAgLmRhdGEodGV4dF92ZXJ0aWNpZXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cignZCcsIHN0cmFpZ2h0X2xpbmUpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAndGVtcC1wYXRoJylcbiAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgdGVtcF9wYXRoLmVhY2goZnVuY3Rpb24gKHRkLCB0aSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGQpO1xuICAgICAgICAgICAgdmFyIHRleHRfZCA9IGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkJyk7XG4gICAgICAgICAgICBkICs9IHRleHRfZDtcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW5nX3NlZ21lbnRzW3RpXSkge1xuICAgICAgICAgICAgICAgIHZhciBjb25uZWN0aW5nX2QgPSBjb25uZWN0aW5nX3NlZ21lbnRzW3RpXTtcbiAgICAgICAgICAgICAgICBkICs9IGNvbm5lY3RpbmdfZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbGl0eS5jb252ZXJ0VG9SZWxhdGl2ZSh0ZW1wX3BhdGguYXR0cignZCcsIGQpLm5vZGUoKSk7XG4gICAgICAgIC8vIHJlcGxhY2UgYWxsIGBtYCBpbnN0cnVjdGlvbnMgd2l0aCBgbGAsIGV4Y2VwdFxuICAgICAgICAvLyBmb3IgdGhlIGZpcnN0IG9uZS4gdGhpcyBpcyBhIHJldmVyc2UgcmVnZXhcbiAgICAgICAgZCA9IHRlbXBfcGF0aC5hdHRyKCdkJykucmVwbGFjZSgvKD8hXiltL2csICdsJyk7XG5cbiAgICAgICAgdGVtcF9zdmcucmVtb3ZlKCk7XG4gICAgICAgIHRlbXBfcGF0aC5yZW1vdmUoKTtcblxuICAgICAgICByZXR1cm4gZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9pbihwYXRoKSB7XG4gICAgICAgIHBhdGgudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oODAwMClcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oJ3N0cm9rZS1kYXNoYXJyYXknLCB0d2VlbkRhc2gpXG4gICAgICAgICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBkYXNoIGFycmF5LCBhcyByZXNpemluZ1xuICAgICAgICAgICAgICAgIC8vIHRoZSBicm93c2VyIHdpbGwgY2hhbmdlIHRoZSBsZW5ndGhcbiAgICAgICAgICAgICAgICAvLyBhbmQgdGhlcmUgaXMgbm8gbmVlZCB0byByZS1jb21wdXRlXG4gICAgICAgICAgICAgICAgLy8gdGhlIGRhc2ggYXJyYXkgdG8gZml0IGl0LlxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuRGFzaCgpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcoJzAsJyArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi9zdmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsb2dvX3NjYWxlICgpIHtcbiAgICB2YXIgdXRpbGl0eSA9IFV0aWxpdHkoKTtcblxuICAgIHZhciBzZWdtZW50cyA9IFt7XG4gICAgICAgICAgICBmcm9tOiAnUklTRCcsXG4gICAgICAgICAgICB0bzogJ0dyYWQnLFxuICAgICAgICAgICAgc2NhbGVVc2luZzoge1xuICAgICAgICAgICAgICAgICczMDAnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgICAgICAnNzY4JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFksXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhd25fZGVsdGE6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtNjIuNjk5OTcxMTk5MDM1NjQ1LFxuICAgICAgICAgICAgICAgICAgICB5OiAxMDMzLjA4MDA3ODEyNVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzc2OCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTExMC4wNDAwMDg1NDQ5MjE4OCxcbiAgICAgICAgICAgICAgICAgICAgeTogMTg5LjE4NDk5NzU1ODU5Mzc1XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTExNy4zMjk5NjM1MDUyNjgxLFxuICAgICAgICAgICAgICAgICAgICB5OiAzODkuMTg1OTc0MTIxMDkzNzVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF0aHM6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogJ00zLjU2NCwwJyArXG4gICAgICAgICAgICAgICAgICAgICdjMCwwLDAsOC44NTEsMCwxNi44MScgK1xuICAgICAgICAgICAgICAgICAgICAnYzAsMTAuNTU0LTQxLjA0NSw5Ny45ODEtNDUuOTA0LDE5OC45MTcnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MtNi44NiwxNDIuNDkzLDEwMi4wNDksMTc0LjkyNSwxOTkuNDksMTc4LjQ5MScgK1xuICAgICAgICAgICAgICAgICAgICAnYzgxLjk2NCwzLDE4Mi45OTEtMzEuNDk4LDIwOC40OS0xMzMuNDkzICcgK1xuICAgICAgICAgICAgICAgICAgICAnYzI3LjU0LTExMC4xNTktODMuMzQ3LTE5MS45OS0xODcuNDkxLTE0OC40OTMgJyArXG4gICAgICAgICAgICAgICAgICAgICdDLTE4LjkzMiwxOTQuNTQ3LTI1Ljg2OSw0MzMuODA1LDYxLjkyMSw1MzMuMjkgJyArXG4gICAgICAgICAgICAgICAgICAgICdjODcuNzI5LDk5LjQxNSwyNi4wMTQsMTcxLjMzOS05LjYyNSwxODEuOTExICcgK1xuICAgICAgICAgICAgICAgICAgICAnYy02Ni4xMzgsMTkuNjItMTE4Ljc4OS0zMS40OTgtNzkuNjM4LTk0LjI2NiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2M0NC4zMzctNzEuMDgxLDE5MS45OS02My4yMjYsMjI5LjQ4OS0xMC43MjkgJyArXG4gICAgICAgICAgICAgICAgICAgICdDMzIzLjg1Miw3ODAuNTkzLTU5LjEzNiw5MTUuNzg4LTU5LjEzNiw5MjEuNDMnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MwLDE4LjAxMywwLDExMS42NSwwLDExMS42NScsXG4gICAgICAgICAgICAgICAgJzc2OCc6ICdNOTQuMjYtMTUgJytcbiAgICAgICAgICAgICAgICAgICdoMjkuNzk2ICcgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMC45MzYsOC44NTEsMC45MzYsMTYuODEgJytcbiAgICAgICAgICAgICAgICAgICdjMCwyOC4wNDItMTUuOTAxLDY3LjM3LTYxLjE4NSw2Ny4zNycgK1xuICAgICAgICAgICAgICAgICAgJ0MxMC41MSw2OS4xOC0xNiw2OS4xODUtMTYsNjkuMTg1JyArXG4gICAgICAgICAgICAgICAgICAndi01MicgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMzUuOTIxLTQuMzkzLDQ4LjY0OSwzLjc1OCcgK1xuICAgICAgICAgICAgICAgICAgJ2MzNy44NjEsMjQuMjQyLDI5LjY0NSw0Ni43NzctMy44LDgwLjI0MicgK1xuICAgICAgICAgICAgICAgICAgJ2MtMTcuMDI3LDE3LjAzOC00NC42MjksMTctNDQuNjI5LDQ4LjY1MycgK1xuICAgICAgICAgICAgICAgICAgLy8gJ2MwLDE4LjAxMywwLDI0LjM0NywwLDI0LjM0NydcbiAgICAgICAgICAgICAgICAgICdjMCwwLDAsMCwwLDI0LjM0NycsXG4gICAgICAgICAgICAgICAgJzEwMjQnOiAnTTAuMzMzLDBIMTQwOCcgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsNy4zNyw1NC41MzYtNTYuMzgxLDc1LjYyOScgK1xuICAgICAgICAgICAgICAgICAgJ2MtNDkuNzE4LDE2LjQ1LTE4MS4xMjgtMTYuMjYyLTIzMS45ODksMjYuOTk5JyArXG4gICAgICAgICAgICAgICAgICAnQzk4OS4xMzYsMjEzLjYyMiwxMTQ5LjYyOCwzNDQuMTgsOTIwLjE1MywzNDQuMTgnICtcbiAgICAgICAgICAgICAgICAgICdjLTUzLjI5OCwwLTIxMC42NDEsMC4wMDUtMjEwLjY0MSwwLjAwNWwwLTI3MicgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMTk3LjEyOC0xNi4wNTUsMTgyLjEyOSw4OC45NCcgK1xuICAgICAgICAgICAgICAgICAgJ2MtMjQuNzY4LDE3My4zNzgtNDUyLjgyMS04MS41MTMtNzQ1LjQ2My03MS45OTYnICtcbiAgICAgICAgICAgICAgICAgICdjLTE4NC40OTEsNi0yMzQuMTc4LDY1Ljg5LTI3MS44NDgsMTM5LjQ5MycgK1xuICAgICAgICAgICAgICAgICAgJ2MtMzYuMTA0LDcwLjU0NC0xMC40ODQsMTYwLjU2NCwxLjM4NiwxNjAuNTY0JyArXG4gICAgICAgICAgICAgICAgICAnYzIuMjQxLDAsNy4yODQsMCw3LjI4NCwwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBmcm9tOiAnR3JhZCcsXG4gICAgICAgICAgICB0bzogJ1Nob3cnLFxuICAgICAgICAgICAgc2NhbGVVc2luZzoge1xuICAgICAgICAgICAgICAgICczMDAnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWCxcbiAgICAgICAgICAgICAgICAnNzY4JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFgsXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXduX2RlbHRhOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMzQ0LjE0MDAxNDY0ODQzNzUsXG4gICAgICAgICAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICc3NjgnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDEyNjAuOTU4MDA3ODEyNSxcbiAgICAgICAgICAgICAgICAgICAgeTogMC4yMjY5ODU5NjExOTg4MDY3NlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDEyNjAuNDk5OTI3NzU5MTcwNSxcbiAgICAgICAgICAgICAgICAgICAgeTogMC4wMDAwMDIzODQxODU3OTEwMTU2MjVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF0aHM6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogJ00wLTAuMTM4JyArXG4gICAgICAgICAgICAgICAgICAgICAgICdjODMuNjI3LDAuNjIsMjM4Ljc1NSwwLDM0NC4xNCwwJyxcbiAgICAgICAgICAgICAgICAnNzY4JzogJ00wLDAgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLDAgMTguODYxLDAuMDQ0IDI1LjgxOCwwLjA5NSAnICtcbiAgICAgICAgICAgICAgICAgICAnYzU5Ljg5NiwwLjQ0NCA0NTAuMDA2LDAgNDUwLjAwNiwwICcgK1xuICAgICAgICAgICAgICAgICAgICdjMCwwIDAsMCAwLDI0OC41ICcgK1xuICAgICAgICAgICAgICAgICAgICdjMCwwIC02Ljc5OSwwIC02OCwwICcgK1xuICAgICAgICAgICAgICAgICAgICdjLTE0OC4yNjYsMCAtMTM4LC0xNTcuNSAwLC0xNTcuNSAnICtcbiAgICAgICAgICAgICAgICAgICAnYzExMCwwIDE4OS42MjgsMTE3LjY1IDMwMiwxMTYgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MxNDcuNjIxLC0yLjE2NyAxOTMuNzg4LC0yMTguNzA1IDE5My43ODgsLTI4NS42NTcgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLC0xOTAuMzQzIC0xNjEuNzg4LC0xMjguMzQzIC0xNjEuNzg4LC00NC4zNDMgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLDUyLjQwMSA0OC43NzcsOTQuNjM4IDEyMy40MjQsMTA2ICcgK1xuICAgICAgICAgICAgICAgICAgICdjMTMyLjg5NCwyMC4yMjggMjg1LjEwNSwxNi45MzYgMzAxLjU2MywxNyAnICtcbiAgICAgICAgICAgICAgICAgICAnYzE0Ljc0NCwwLjA1OCA5NC4xNDcsMC4xMzIgOTQuMTQ3LDAuMTMyJyxcbiAgICAgICAgICAgICAgICAnMTAyNCc6ICdNMC43MDEsMy44MTUnICtcbiAgICAgICAgICAgICAgICAgICdoMTEuNzQ0JytcbiAgICAgICAgICAgICAgICAgICd2MjcxLjE3aC0xNTQuNTAyJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDcuNDY0LTgyLjA1MSw0Ni4xOTgtMTIxLjk5NScrXG4gICAgICAgICAgICAgICAgICAnYzQ3Ljk5OC00OS40OTgsMTQ2Ljg1My02Ny4yNDksMTk0Ljk5LTM4Ljk5OCcrXG4gICAgICAgICAgICAgICAgICAnYzEyMS40OTQsNzEuMzA0LDgwLjk5NiwyMzIuNDkxLDIzMS4wMTYsMjI1LjE2NicrXG4gICAgICAgICAgICAgICAgICAnYzE5Ny4wNjctOS42MjIsMTUyLjk2NS0zOTcuNjU1LDI5Ljk3MS00MzYuNjUzJytcbiAgICAgICAgICAgICAgICAgICdjLTE3MC4xNjctNTMuOTU1LTE3OS45OTEsMjA2LjA2NywxMjUuMzMzLDIwNi4wNjcnK1xuICAgICAgICAgICAgICAgICAgJ2MyMDAuNDg5LDAsMzE0LjE0NS0xMDQuNzU3LDY2Ny45ODctMTA0Ljc1NycrXG4gICAgICAgICAgICAgICAgICAnYzM2Ljc1MywwLDEwNy43NjMsMCwxMDcuNzYzLDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGZyb206ICdTaG93JyxcbiAgICAgICAgICAgIHRvOiAnMjAxNCcsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZLFxuICAgICAgICAgICAgICAgICc3NjgnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmF3bl9kZWx0YToge1xuICAgICAgICAgICAgICAgICczMDAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC03NS41NTYwMDU0Nzc5MDUyNyxcbiAgICAgICAgICAgICAgICAgICAgeTogNDguNjg5MDA2ODA1NDE5OTJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICc3NjgnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0wLjAyNTAwOTE1NTI3MzQzNzUsXG4gICAgICAgICAgICAgICAgICAgIHk6IDIxMy43MjM5OTkwMjM0Mzc1XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTEwMi4yNDk5OTY0NjA5NzQyMixcbiAgICAgICAgICAgICAgICAgICAgeTogNDEwLjUyOTAxOTA0Mjg0OTU0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhdGhzOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6ICdNNzMuNjA2LTQ4LjY4OSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MzLjAzNy0wLjAzMiw1Ljc0LTAuMDUyLDguMDg5LTAuMDUyICcgK1xuICAgICAgICAgICAgICAgICAgICAnYzE1LjMzLDAsNi43ODMtNDkuNjI2LTM1LjMzNy01MS4yNTggJyArXG4gICAgICAgICAgICAgICAgICAgICdjLTQzLTEuNjY3LTcwLjc1LDI0LTc3LjMzMyw1NiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ0MtMzYuNTI2LTE3LjAxNS0xNC42NDEsMC0xLjk1LDAnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTExNi43NDUtMTUnICtcbiAgICAgICAgICAgICAgICAgICdjMCwwLDAsMy4xMDMsMCwxMyAnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDEyLjgyLTI1LjcwMiwxOS43NTYtNDQuNzQ1LDI3JyArXG4gICAgICAgICAgICAgICAgICAnQzQ0LjQ4NiwzNS40NjcsMTgsMzYuMDIsMTgsNjEuNScgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDI2LDE3LjUsMzYuODI4LDQ0Ljc3OCwzNi44MjgnICtcbiAgICAgICAgICAgICAgICAgICdDMTAyLjY2Nyw5OC4zMjgsMTA0LDUxLDEwNCw1MScgK1xuICAgICAgICAgICAgICAgICAgJ0gtMTZ2MzYnICtcbiAgICAgICAgICAgICAgICAgICdjMCwwLDM5LjYxOCw5Ljg2NSw2MiwzNicgK1xuICAgICAgICAgICAgICAgICAgJ2MyMS4xNDEsMjQuNjg2LDIzLjU0MSwyOCw0Ny4wMjMsMjgnICtcbiAgICAgICAgICAgICAgICAgICdjMTQuOTc3LDAsMTMuNjk3LDAsMjMuNjk3LDAnICtcbiAgICAgICAgICAgICAgICAgICd2NDcuNzI0JyxcbiAgICAgICAgICAgICAgICAnMTAyNCc6ICdNMC4wNjMtMC4xNDcnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsNy41ODgsMCw5LjQ5NCwwJyArXG4gICAgICAgICAgICAgICAgICAnYzAsMC0xMy43MDEtNzMuMjI2LTk4LjEyNS02Mi4zMTInK1xuICAgICAgICAgICAgICAgICAgJ2MtODUuNjIsMTEuMDY5LTEzNy42MiwxMzMuMDY5LTIyNy41NDEsMjEyLjYxMScrXG4gICAgICAgICAgICAgICAgICAnYy0xMjcuMTU4LDExMi40ODEtMzA3Ljg5OCwyMDEuMjM2LTQxNS41NjcsMjAxLjIzNicrXG4gICAgICAgICAgICAgICAgICAnYy0xMjcuNTAyLDAtMTYzLjUxMi0xMDcuOTY0LTgzLjA1OC0xNTMuMzcxJytcbiAgICAgICAgICAgICAgICAgICdjOTYuNzA5LTU0LjU4MSwyODcuMTI1LDE1My40OTEsNDMxLjExOCwxNTMuNDkxJytcbiAgICAgICAgICAgICAgICAgICdjNTQuMTUsMCwxMzkuNDI4LTE4LjA4NCwxNTIuMzk1LTEwMC40ODYnK1xuICAgICAgICAgICAgICAgICAgJ2MxNS4yNTEtOTYuOTIsODEuMDMzLTEzMy41OTgsMTM4LjU5LTk3LjU5OCcrXG4gICAgICAgICAgICAgICAgICAnYzI1LjEyMiwxNS43MTMsNDkuNDQzLDcyLTEwLjU1NywxMTcnK1xuICAgICAgICAgICAgICAgICAgJ2MtNDMuOTUzLDMyLjk2NS02My45MzcsNTMtNjMuOTM3LDk3LjU4MycrXG4gICAgICAgICAgICAgICAgICAnYzAsNDIuNDY5LDM5LjE5OCw0Mi4zNzUsNDguNDk3LDQyLjM3NScrXG4gICAgICAgICAgICAgICAgICAnYzUuMTMzLDAsMTYuNDQxLDAsMTYuNDQxLDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1dO1xuXG4gICAgdmFyIHRlbXBfc3ZnID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICB2YXIgdGVtcF9wYXRoID0gdGVtcF9zdmdcbiAgICAgICAgLmFwcGVuZCgncGF0aCcpO1xuXG4gICAgdmFyIG1lYXN1cmVfZm9yX2ZmID0gZmFsc2U7XG5cbiAgICBzZWdtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgIGQucmVsYXRpdmVfcGF0aHNfZCA9IHt9O1xuICAgICAgICBkLnJlbGF0aXZlX3BhdGhzID0ge307XG4gICAgICAgIGQuc2NhbGUgPSB7fTtcblxuICAgICAgICBpZiAobWVhc3VyZV9mb3JfZmYpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlZ21lbnRzW2ldLmZyb20gKyAnICcgKyBzZWdtZW50c1tpXS50byk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBwYXRoX3NpemUgaW4gZC5wYXRocykge1xuICAgICAgICAgICAgdGVtcF9wYXRoLmF0dHIoJ2QnLCBkLnBhdGhzW3BhdGhfc2l6ZV0pO1xuICAgICAgICAgICAgdXRpbGl0eS5jb252ZXJ0VG9SZWxhdGl2ZSh0ZW1wX3BhdGgubm9kZSgpKTtcbiAgICAgICAgICAgIGQucmVsYXRpdmVfcGF0aHNfZFtwYXRoX3NpemVdID0gdGVtcF9wYXRoLmF0dHIoJ2QnKTtcbiAgICAgICAgICAgIGQucmVsYXRpdmVfcGF0aHNbcGF0aF9zaXplXSA9IHRlbXBfcGF0aC5ub2RlKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChtZWFzdXJlX2Zvcl9mZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaXplOiAnLCBwYXRoX3NpemUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWx0YTogJywgdXRpbGl0eS5wYXRoRGVsdGEoXG4gICAgICAgICAgICAgICAgICAgIGQucmVsYXRpdmVfcGF0aHNbcGF0aF9zaXplXSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkLnNjYWxlW3BhdGhfc2l6ZV0gPVxuICAgICAgICAgICAgICAgIGQuc2NhbGVVc2luZ1twYXRoX3NpemVdKGQucmVsYXRpdmVfcGF0aHNbcGF0aF9zaXplXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLmRyYXduX2RlbHRhW3BhdGhfc2l6ZV0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0ZW1wX3N2Zy5yZW1vdmUoKTtcbiAgICB0ZW1wX3BhdGgucmVtb3ZlKCk7XG5cbiAgICB2YXIgc2l6ZXMgPSBPYmplY3Qua2V5cyhzZWdtZW50c1swXS5wYXRocyk7XG4gICAgc2VnbWVudHMuY2hvb3NlX3NpemUgPSBmdW5jdGlvbiAod2luZG93X3dpZHRoLCB3aW5kb3dfaGVpZ2h0KSB7XG4gICAgICAgIHZhciBjaG9zZW4gPSAwO1xuICAgICAgICBzaXplcy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA8PSB3aW5kb3dfd2lkdGgpIHtcbiAgICAgICAgICAgICAgICBjaG9zZW4gPSBkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNob3Nlbi50b1N0cmluZygpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuc2VnbWVudHMgPSBzZWdtZW50cztcblxuICAgIHJldHVybiBzZWdtZW50cztcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdmcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICBzZWxmLmNvbnZlcnRUb1JlbGF0aXZlID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgZnVuY3Rpb24gc2V0KHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgc2Vncy5yZXBsYWNlSXRlbShyc2VnLCBpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZHgsIGR5LCB4MCwgeTAsIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgc2VncyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgIGZvciAodmFyIHggPSAwLCB5ID0gMCwgaSA9IDAsIGxlbiA9IHNlZ3MubnVtYmVyT2ZJdGVtcztcbiAgICAgICAgICAgICBpIDwgbGVuO1xuICAgICAgICAgICAgIGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgc2VnID0gc2Vncy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgIGMgICA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICBpZiAoL1tNTEhWQ1NRVEFael0vLnRlc3QoYykpIHtcbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxIC0geDtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0gc2VnLngyIC0geDtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxIC0geTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyIC0geTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnICBpbiBzZWcpIGR4ID0gLXggKyAoeCA9IHNlZy54KTtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gLXkgKyAoeSA9IHNlZy55KTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ01vdmV0bycsZHgsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdMaW5ldG8nLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdIJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvSG9yaXpvbnRhbCcsZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdMaW5ldG9WZXJ0aWNhbCcsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvQ3ViaWMnLGR4LGR5LHgxLHkxLHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdTJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b0N1YmljU21vb3RoJyxkeCxkeSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9RdWFkcmF0aWMnLGR4LGR5LHgxLHkxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b1F1YWRyYXRpY1Ntb290aCcsZHgsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdBcmMnLGR4LGR5LHNlZy5yMSxzZWcucjIsc2VnLmFuZ2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZy5sYXJnZUFyY0ZsYWcsc2VnLnN3ZWVwRmxhZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnWic6IGNhc2UgJ3onOiB4ID0geDA7IHkgPSB5MDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnIGluIHNlZykgeCArPSBzZWcueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knIGluIHNlZykgeSArPSBzZWcueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBzdGFydCBvZiBhIHN1YnBhdGhcbiAgICAgICAgICAgIGlmIChjID09ICdNJyB8fCBjID09ICdtJykge1xuICAgICAgICAgICAgICAgIHgwID0geDtcbiAgICAgICAgICAgICAgICB5MCA9IHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvWi9nLCAneicpKTtcbiAgICB9O1xuXG4gICAgc2VsZi5wYXRoRGVsdGEgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzdGFydCA9IHBhdGguZ2V0UG9pbnRBdExlbmd0aCgwKSxcbiAgICAgICAgICAgIGVuZCA9IHBhdGguZ2V0UG9pbnRBdExlbmd0aChwYXRoLmdldFRvdGFsTGVuZ3RoKCkpO1xuXG4gICAgICAgIGRlbHRhLnggPSBlbmQueCAtIHN0YXJ0Lng7XG4gICAgICAgIGRlbHRhLnkgPSBlbmQueSAtIHN0YXJ0Lnk7XG5cbiAgICAgICAgcmV0dXJuIGRlbHRhO1xuICAgIH07XG5cbiAgICAvLyBwYXNzIGluIGEgcGF0aCBlbGVtZW50XG4gICAgLy8gYW5kIHRoZSBwYXRoIHNlZ2VtZW50IGluZGljaWVzXG4gICAgLy8gdGhhdCB3aWxsIGJlIHNjYWxlZFxuICAgIHNlbGYuc2NhbGVBbmNob3JZID0gZnVuY3Rpb24gKHBhdGgsIGFuY2hvcnMpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlQW5jaG9yWScpO1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IHNlbGYucGF0aERlbHRhKHBhdGgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjdXJyZW50IGRlbHRhXG4gICAgICAgICAgICBkZWx0YS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGVuZFswXSAtIHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIGFuY2hvcnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9fcmVwbGFjZSA9IHNlZ21lbnRzLmdldEl0ZW0oYW5jaG9yc1tuYW1lXSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2Vfd2l0aCA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY1JlbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueSArICgoZGVsdGEuY3VycmVudC55LVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YS5kcmF3bi55KS8yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS54MixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueTIpO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2Vfd2l0aCwgYW5jaG9yc1tuYW1lXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsID0gZnVuY3Rpb24gKHBhdGgsIGRyYXduX2RlbHRhKSB7XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgICAgICBkcmF3bjogZHJhd25fZGVsdGFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmlnaW5hbF9kID0gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlKGFsbF9zZWdtZW50cywgc2VnbWVudF90b19yZXBsYWNlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIGFsbF9zZWdtZW50cy5yZXBsYWNlSXRlbShyc2VnLCBzZWdtZW50X3RvX3JlcGxhY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGVQcm9wb3J0aW9uYWwnKTtcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcmF0aW8gPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54L2RlbHRhLmRyYXduLngsXG4gICAgICAgICAgICAgICAgeTogZGVsdGEuY3VycmVudC55L2RlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIG9yaWdpbmFsX2QpO1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgdmFyIGZpcnN0X3NlZ21lbnQgPSBzZWdtZW50cy5nZXRJdGVtKDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3NlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhdGhTZWdUeXBlQXNMZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgPT09ICdtJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50X3NlZyA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0FicyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2VtZW50X3NlZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkeCwgZHksIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgICAgIHggPSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5ID0gc3RhcnRbMV07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlZ21lbnRzLm51bWJlck9mSXRlbXM7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzZWcgPSBzZWdtZW50cy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgICAgICBjID0gc2VnLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0gc2VnLngyICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnICBpbiBzZWcpIGR4ID0gc2VnLnggICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnkgICogcmF0aW8ueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsWSA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICAvLyBzY2FsZSB5LCBmaXQgeFxuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyksXG4gICAgICAgICAgICBmaXRfeCA9IGZhbHNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2UoYWxsX3NlZ21lbnRzLCBzZWdtZW50X3RvX3JlcGxhY2UsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgYWxsX3NlZ21lbnRzLnJlcGxhY2VJdGVtKHJzZWcsIHNlZ21lbnRfdG9fcmVwbGFjZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhLmRyYXduLngpID4gMC4xKSB7XG4gICAgICAgICAgICBmaXRfeCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZVByb3BvcnRpb25hbCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGVsdGEuZGlmZiA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LnggLSBkZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueSAtIGRlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR4LCBkeSwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICAgICAgeCA9IHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHkgPSBzdGFydFsxXSxcbiAgICAgICAgICAgICAgICBzZWdtZW50X2NvdW50ID0gc2VnbWVudHMubnVtYmVyT2ZJdGVtcztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VnbWVudF9jb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ21lbnRzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgICAgIGMgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDE7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MjtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoZml0X3gpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIGR4ID0gc2VnLnggK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRlbHRhLmRpZmYueC8oc2VnbWVudF9jb3VudC0xKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIGR4ID0gc2VnLng7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSBzZWcueSAgKiByYXRpby55O1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ01vdmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9Ib3Jpem9udGFsJywgZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b1ZlcnRpY2FsJywgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpYycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgxLHkxLHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWNTbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHNlbGYuc2NhbGVQcm9wb3J0aW9uYWxYID0gZnVuY3Rpb24gKHBhdGgsIGRyYXduX2RlbHRhKSB7XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgICAgICBkcmF3bjogZHJhd25fZGVsdGFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmlnaW5hbF9kID0gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcblxuICAgICAgICBjb25zb2xlLmxvZygnZHJhd24gZGVsdGEnKTtcbiAgICAgICAgY29uc29sZS5sb2coZGVsdGEuZHJhd24pO1xuICAgICAgICBjb25zb2xlLmxvZyhwYXRoKTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlKGFsbF9zZWdtZW50cywgc2VnbWVudF90b19yZXBsYWNlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIGFsbF9zZWdtZW50cy5yZXBsYWNlSXRlbShyc2VnLCBzZWdtZW50X3RvX3JlcGxhY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGVQcm9wb3J0aW9uYWxYJyk7XG4gICAgICAgICAgICBkZWx0YS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGVuZFswXSAtIHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2N1cnJlbnQgZGVsdGEnKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGRlbHRhLmN1cnJlbnQpO1xuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50cy5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyO1xuICAgICAgICAgICAgICAgIGlmICgneCcgIGluIHNlZykgZHggPSBzZWcueCAgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSBzZWcueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIFJvdGF0ZVN2ZyA9IHJlcXVpcmUoJy4vcm90YXRlJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnV0dG9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBzZWxlY3Rpb24sXG4gICAgICAgIGRpbWVuc2lvbnM7XG5cbiAgICB2YXIgcm90YXRlX3N2ZyA9IFJvdGF0ZVN2ZygpO1xuXG4gICAgc2VsZi5zZWxlY3Rpb24gPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzZWxlY3Rpb247XG4gICAgICAgIHNlbGVjdGlvbiA9IF87XG5cbiAgICAgICAgZGltZW5zaW9ucyA9IGdldF9kaW1lbnNpb25zKHNlbGVjdGlvbik7XG4gICAgICAgIHJvdGF0ZV9zdmdcbiAgICAgICAgICAgIC5zZWxlY3Rpb24oc2VsZWN0aW9uLnNlbGVjdCgnI2Zsb3dlcicpKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gcm90YXRlX3N2Zy5zdGFydCgpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gZ2V0X2RpbWVuc2lvbnMgKHNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gc2VsZWN0aW9uLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIEJ1dHRvbiA9IHJlcXVpcmUoJy4vYnV0dG9uJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbmF2ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB0YXJnZXRfc2VsLFxuICAgICAgICBvdmVybGFpZCA9IGZhbHNlLFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpLFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIHJlbW92YWJsZV90ZXh0ID0gW3tcbiAgICAgICAgICAgIHRleHQ6ICdHbyEnXG4gICAgICAgIH1dO1xuXG4gICAgdmFyIGJ1dHRvbiA9IEJ1dHRvbigpO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhc3Rlcmlza0NsaWNrJyk7XG5cbiAgICBzZWxmLnNlbGVjdGlvbiA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRhcmdldF9zZWw7XG4gICAgICAgIHRhcmdldF9zZWwgPSBfO1xuXG4gICAgICAgIGJ1dHRvblxuICAgICAgICAgICAgLnNlbGVjdGlvbih0YXJnZXRfc2VsKVxuICAgICAgICAgICAgLnN0YXJ0KCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYub3ZlcmxhaWQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvdmVybGFpZDtcbiAgICAgICAgb3ZlcmxhaWQgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5zZXR1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRfc2VsKSB0aHJvdyBcInJlcXVpcmVzIGVsZW1lbnRzIHRvIHBhaXJcIjtcbiAgICAgICAgdGFyZ2V0X3NlbFxuICAgICAgICAgICAgLm9uKCdjbGljay5uYXYnLCBmdW5jdGlvbiAoZCwgZGkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJyNmbG93ZXInKTtcbiAgICAgICAgICAgICAgICBvdmVybGFpZCA9IG92ZXJsYWlkID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlX2RlYWN0aXZhdGUoZCk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hc3Rlcmlza0NsaWNrKG92ZXJsYWlkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIFxuICAgICAgICBwbGFjZV9idXR0b24oKTtcblxuICAgICAgICB3aW5kb3dfc2VsXG4gICAgICAgICAgICAub24oJ3Jlc2l6ZS5uYXYnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWN0aXZhdGVfZGVhY3RpdmF0ZSAoZCkge1xuICAgICAgICB2YXIgb3ZlcmxheSA9IGQzLnNlbGVjdEFsbChkLmFjdGl2YXRlKTtcbiAgICAgICAgb3ZlcmxheS5jbGFzc2VkKCdvdmVybGFpZCcsIG92ZXJsYWlkKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgb3ZlcmxhaWQpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKGQuYm9keSwgb3ZlcmxhaWQpO1xuICAgICAgICBwbGFjZV9idXR0b24oKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZV9idXR0b24gKCkge1xuICAgICAgICB2YXIgd3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHZhciB3aGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIHZhciBtYXRjaGluZ19zZWw7XG4gICAgICAgIHZhciBiYm94O1xuXG4gICAgICAgIGlmIChvdmVybGFpZCkge1xuICAgICAgICAgICAgYmJveCA9IHRhcmdldF9zZWwubm9kZSgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdmFyIHBfYmJveCA9IHRhcmdldF9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgncCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgdGFyZ2V0X2hlaWdodCA9IGJib3guaGVpZ2h0O1xuICAgICAgICAgICAgbWF0Y2hpbmdfc2VsID1cbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5sb2dvLXRleHQtY29tcG9uZW50LS1yaXNkJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRhcmdldF9zZWwuc3R5bGUoJ2xlZnQnLCAod3dpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcF9iYm94LndpZHRoIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmJveC53aWR0aCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgrbWF0Y2hpbmdfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJ3AnKVswXSkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHgnKTtcbiAgICAgICAgICAgIHRhcmdldF9zZWwuc3R5bGUoJ2JvdHRvbScsICh3aGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYm94LmhlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCttYXRjaGluZ19zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF0pKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh3d2lkdGggPCA3NjgpIHtcbiAgICAgICAgICAgICAgICBiYm94ID0gdGFyZ2V0X3NlbC5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgbWF0Y2hpbmdfc2VsID1cbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcubG9nby10ZXh0LWNvbXBvbmVudC0tc2hvdycpO1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaGluZ19ib3ggPSBtYXRjaGluZ19zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRhcmdldF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgKCh3d2lkdGggLSBiYm94LndpZHRoKS8yKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4JylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdib3R0b20nLCAoKCttYXRjaGluZ19zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2JvdHRvbScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF0pIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGJib3guaGVpZ2h0LVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hpbmdfYm94LmhlaWdodCkvMikgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtYXRjaGluZ19zZWwgPVxuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5sb2dvLXRleHQtY29tcG9uZW50LS0yMDE0Jyk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0X3NlbFxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCBtYXRjaGluZ19zZWwuc3R5bGUoJ3JpZ2h0JykpXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnYm90dG9tJywgbWF0Y2hpbmdfc2VsLnN0eWxlKCdib3R0b20nKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiByb3RhdGUgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHNlbGVjdGlvbixcbiAgICAgICAgb2Zmc2V0ID0gMCxcbiAgICAgICAgc3BlZWQgPSAwLjIsXG4gICAgICAgIHN0YXJ0ID0gRGF0ZS5ub3coKSxcbiAgICAgICAgcmFkaXVzO1xuXG4gICAgdmFyIHZlbmRvciA9IFtcIlwiLCBcIi13ZWJraXQtXCIsIFwiLW1vei1cIiwgXCItbXMtXCIsIFwiLW8tXCJdLnJlZHVjZShcbiAgICAgICAgZnVuY3Rpb24gKHAsIHYpIHtcbiAgICAgICAgICAgIHJldHVybiB2ICsgXCJ0cmFuc2Zvcm1cIiBpbiBkb2N1bWVudC5ib2R5LnN0eWxlID8gdiA6IHA7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5zZWxlY3Rpb24gPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBzZWxlY3Rpb247XG4gICAgICAgIHNlbGVjdGlvbiA9IF87XG5cbiAgICAgICAgcmFkaXVzID0gc2VsZWN0aW9uLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQvMjtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5zdGFydCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc3RhcnQgPSBEYXRlLm5vdygpO1xuXG4gICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3BlZWQgPSAxO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc3BlZWQgPSAwLjI7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljay5yb3RhdGUnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNwZWVkID0gMC4yO1xuICAgICAgICAgICAgICAgIH0sIDEwMDApO1xuICAgICAgICAgICAgICAgIHNwZWVkID0gNTtcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgZDMudGltZXIoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFuZ2xlID0gKERhdGUubm93KCkgLSBzdGFydCkgKiBzcGVlZDtcbiAgICAgICAgICAgIHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIC5zdHlsZSh2ZW5kb3IrJ3RyYW5zZm9ybScsXG4gICAgICAgICAgICAgICAgICAgICAgJ3JvdGF0ZSgnKyAoYW5nbGUvcmFkaXVzKSArJ2RlZyknKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldF9wb3NpdGlvbiAoKSB7XG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdmFyIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgXG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyJdfQ==
