(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function () {
    var self = {},
        container_sel,
        mobile_container_sel,
        deptartment_sel,
        mobile_department_sel,
        mobile_activator_sel,
        mobile_blanket_sel,
        mobile_active = false,
        selected = 'All',
        cls = 'department',
        body_sel = d3.select('body');

    self.dispatch = d3.dispatch('click');

    var departments = [
        'All',
        'Architecture',
        'Ceramics',
        'Digital + Media',
        'Furniture Design',
        'Glass',
        'Graphic Design',
        'Industrial Design',
        'Interior Architecture',
        'Jewelry + Metalsmithing',
        'Landscape Architecture',
        'Painting',
        'Photography',
        'Printmaking',
        'Sculpture',
        'Textiles'
    ];

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.mobile = function (_) {
        if (!arguments.length) return mobile_container_sel;
        mobile_container_sel = _;
        return self;
    };

    self.activatorVisible = function (_) {
        if (!mobile_activator_sel) return;
        mobile_activator_sel.classed('visible', _);
    };

    self.selection = function () {
        if (!arguments.length) return deptartment_sel;
        deptartment_sel = _;
        return self;
    };

    self.asArray = function () {
        if (!arguments.length) throw "departments is a getter";
        return departments;
    };

    self.isFilterable = function (data) {
        check_filterable(data);
        update_department_sel();
        return self;
    };

    self.render = function () {
        if (!container_sel) throw "requires a wrapper";

        var data = departments.map(function (d, i) {
            var v = {
                name: d,
                escaped: escape_department(d),
                filterable: false,
                selected: false
            };

            if (d === selected) {
                v.selected = true;
                v.filterable = true;
            }

            return v;
        });


        // setup structure
        mobile_activator_sel = mobile_container_sel.append('div')
            .attr('class', cls + '-activator')
            .text(selected)
            .on('click.navActivator', function () {
                mobile_active = true;
                update_nav();
            });

        mobile_blanket_sel = mobile_container_sel.append('div')
            .attr('class', cls + '-blanket')
            .on('click.navBlanket', function () {
                mobile_active = false;
                update_nav();
            });

        mobile_department_sel = mobile_container_sel
            .append('div')
            .attr('class', cls + '-elements departments')
            .append('ul')
            .selectAll(cls)
            .data(data)
            .enter()
            .append('li')
            .append('p')
            .attr('class', function (d) {
                var kls = '';
                if (d.filterable) kls += ' filterable';
                if (d.selected) kls += ' selected';
            })
            .text(function (d) {
                return d.name;
            })
            .on('click.departments', function (d, i) {
                // only responds to filterable items
                if (!d.filterable) return;

                department_sel
                    .each(function (dd, di) {
                        dd.selected = false;
                    });

                d.selected = true;

                self.dispatch.click(d.escaped);

                update_department_sel();

                mobile_active = false;
                selected = d.name;
                update_nav();

                department_sel.data(mobile_department_sel.data());
            });

        // the business

        department_sel = container_sel
            .append('ul')
            .selectAll(cls)
            .data(data)
            .enter()
            .append('li')
            .append('p')
            .attr('class', function (d) {
                var kls = '';
                if (d.filterable) kls += ' filterable';
                if (d.selected) kls += ' selected';
            })
            .text(function (d) {
                return d.name;
            })
            .on('click.departments', function (d, i) {
                // only responds to filterable items
                if (!d.filterable) return;

                department_sel
                    .each(function (dd, di) {
                        dd.selected = false;
                    });

                d.selected = true;

                self.dispatch.click(d.escaped);

                update_department_sel();

                mobile_active = false;
                selected = d.name;
                update_nav();

                mobile_department_sel.data(department_sel.data());
            });
    };

    function update_nav () {
        mobile_container_sel.classed('active', mobile_active);
        body_sel.classed('no-scroll', mobile_active);
        mobile_activator_sel.text(selected);
    }

    function update_department_sel () {
        department_sel
            .classed('filterable', function (d) {
                return d.filterable;
            })
            .classed('selected', function (d) {
                return d.selected;
            });
        mobile_department_sel
            .classed('filterable', function (d) {
                return d.filterable;
            })
            .classed('selected', function (d) {
                return d.selected;
            });
    }

    function check_filterable (data) {
        // given some data, check to see if
        // each category is filterable
        
        data.forEach(function (d, i) {
            department_sel
                .each(function (dd, di) {
                    if (d.risd_program === dd.name) {
                        dd.filterable = true;
                    }
                });
            mobile_department_sel
                .each(function (dd, di) {
                    if (d.risd_program === dd.name) {
                        dd.filterable = true;
                    }
                });
        });
    }

    function escape_department(d) {
        return d.toLowerCase().replace(' ', '-');
    }


    return self;
};
},{}],2:[function(require,module,exports){
var Nav = require('./overlay/nav'),
    Logo = require('./logo/index'),
    Work = require('./work/index');

var work_args = parse_url_for_work(window.location.hash);

site()
    .colors()
    .overlay()
    .logo()
    .work(work_args)
    .reveal();


function parse_url_for_work (path) {
    // console.log(path);
    var is_it_live = true;
    var which_layout = 'image';
    // if (path.indexOf('work') > -1) {
    //     is_it_live = true;
    // }
    // if (path.indexOf('fixed') > -1) {
    //     which_layout = 'fixed';
    // }
    return {
        live: is_it_live,
        layout: which_layout
    };
}

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
    var work = Work();

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
            .setup()
            .attachResize();

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
            .render();

        return self;
    };

    self.work = function (args) {
        if (args.live) {
            // set up
            work.container(d3.select('.work-container'))
                .filters(d3.select('.department-container'))
                .infiniteScroll(true)
                .layout(args.layout)
                .lightboxContainer(d3.select('.lightbox'))
                .intro(d3.select('.intro-quote'))
                .initialize();
        } else {
            d3.select('.work-section').remove();
            d3.select('.lightbox').remove();
        }
        return self;
    };

    self.reveal = function () {
        var vendor =
            ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(
            function (p, v) {
                return v +
                      "transform" in document.body.style ? v : p;
            });
        var travel = (-(window.innerHeight*0.8));
        var transfrom_start = 'translate(0px,' + travel + 'px)';
        var transfrom_end = 'translate(0px,0px)';
        var reveal = d3.selectAll('.reveal-me');

        reveal
            .style('opacity', 0)
            .style(vendor+'transform', transfrom_start);

        reveal
            .transition()
            .delay(800)
            .duration(1200)
            .ease('cubic-inout')
            .style('opacity', 1)
            .styleTween(vendor+'transform', function() {
                return d3.interpolateString(
                        transfrom_start,
                        transfrom_end);

            });
    };

    return self;
}
},{"./logo/index":3,"./overlay/nav":6,"./work/index":10}],3:[function(require,module,exports){
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

        // verticies for 
        var text_verticies = logo_line_text_verticies(logo_text_sel,
                                                      window_width);
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
        var text_verticies = logo_line_text_verticies(logo_text_sel,
                                                      wwidth);
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

    function logo_line_text_verticies (sel, wwidth) {
        var text_verticies = [];

        sel.each(function (d, i) {
            var bounds = this.getBoundingClientRect();
            var first, second;
            if (i === 0) {
                first = [bounds.left + 3,
                     (bounds.top + (bounds.height*(0.45)))];
                second = [bounds.right + 6,
                     (bounds.top + (bounds.height*(0.45)))];
            } else if ((i === 1) | (i === 2)) {
                first = [bounds.left - 2,
                     (bounds.top + (bounds.height*(0.45)))];
                second = [bounds.right + 6,
                     (bounds.top + (bounds.height*(0.45)))];
            } else if (i === 3) {
                first = [bounds.right + 6,
                     (bounds.top + (bounds.height*(0.55)))];
                second = [bounds.left - 6,
                     (bounds.top + (bounds.height*(0.55)))];
                
            }

            text_verticies.push([first, second]);

        });

        return text_verticies;
    }

    function logo_line_connecting_segments (start_end_points,
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
                            .scale[line_size_to_draw](start,
                                                      end));
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

    function add_color_stops (sel){
        sel.append('stop')
            .attr('offset', '0%')
            .attr('stop-color', 'white')
            .attr('stop-opacity', 0);
        sel.append('stop')
            .attr('offset', '100%')
            .attr('stop-color', 'white')
            .attr('stop-opacity', 1);
    }

    return self;
};
},{"./scale":4,"./svg":5}],4:[function(require,module,exports){
var Utility = require('./svg');

module.exports = function logo_scale () {
    var utility = Utility();

    var segments = [{
            from: 'RISD',
            to: 'Grad',
            scaleUsing: {
                '300': utility.scaleProportionalY,
                '768': utility.scaleProportionalY,
                '1024': utility.scaleProportionalY
            },
            drawn_delta: {
                '300': {
                    x: -27.999984592199326,
                    y: 490.6319885253906
                },
                '768': {
                    x: -5.900031089782715,
                    y: 343.3740234375
                },
                '1024': {
                    x: -0.16998529434204102,
                    y: 391.4689636230469
                }
            },
            paths: {
                '300': 'M-0.469,0'+
                  'h4.993'+
                  'c0,0,0,23.597,0,52.073'+
                  'c0,63.14,49.421,99.097,111.84,99.097'+
                  'c127.5,0,90.959-116.783,16.382-116.783'+
                  'c-23.636,0-48.267,0-48.267,0'+
                  'v165.951'+
                  'c0,0,47.251,76.484,94.946,95.897'+
                  'c54.925,22.355,55.242-58.969,3.128-46.302'+
                  'c-30.68,7.457-95.548,77.421-161.066,70.641'+
                  'c-70.622-7.308-41.122-95.308,24.044-56.641'+
                  'c142.483,84.542-78.045,179.859-78.045,182.593'+
                  'c0,8.729,0,44.106,0,44.106'+
                  'h4.045',
                '768': 'M5,0h580.719'+
                  'c0,0-13.087,26.674-49.544,47.023'+
                  'c-33.271,18.572-48.605,13.438-85.34,50.681'+
                  'c-56.949,57.737-3.166,186.293-145.844,186.293'+
                  'c-33.138,0-99.88,0.003-99.88,0.003l0-215.105'+
                  'c0,0,14.293-0.134,34.5,0'+
                  'c170.362,1.128,176.608,153.713,54.608,153.713'+
                  'c-153,0-128.333-165.791-232.96-165.791'+
                  'C1.336,56.817-5.263,343.374-5.263,343.374'+
                  'h4.529',
                '1024': 'M4.107,0'+
                  'h919.199'+
                  'c0,83.872-31.132,129.615-165.592,129.615'+
                  'c-135.274,0,25.689,214.565-203.786,214.565'+
                  'c-53.298,0-160.641,0.005-160.641,0.005'+
                  'l0-286.092'+
                  'c0,0,91.606,0,124.106,0'+
                  'c160.334,0,151.334,203.135,5.214,203.135'+
                  'c-156.958,0-266.364-162.099-372.654-162.099'+
                  'c-108.195,0-164.462,121.926-164.462,292.34'+
                  'c3.797,0,10.603,0,10.603,0'
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
                    x: 253.5,
                    y: 0
                },
                '768': {
                    x: 786.0529764890671,
                    y: 0.000021755695343017578
                },
                '1024': {
                    x: 1260.5000624656677,
                    y: -0.00003796815872192383
                }
            },
            paths: {
                '300': 'M0,0'+
                  'c0,0,41.853,0,68.667,0'+
                  'c64,0,99.688-55.139,98.492-92.747'+
                  'c-1.992-62.619-74.992-39.619-55.941,11.244'+
                  'C123.207-49.491,172.334,0,211.764,0'+
                  'c20.17,0,41.736,0,41.736,0',
                '768': 'M1.698-0.734'+
                  'H9'+
                  'v179.95'+
                  'c0,0-23.332,0-65.478,0'+
                  'c0-128.588,108.27-243.045,259.339-243.045'+
                  'C449.289-63.829,416.934,223,133.966,223'+
                  'c-167.641,0-17.215-190.534,242.808-190.534'+
                  'C646.751,32.466,663.751,195,663.751,195'+
                  's-134.01,0.018-167.5,0.018'+
                  'c0-127.018,81.5-195.752,263.5-195.752'+
                  'c6.437,0,28,0,28,0',
                '1024': 'M3.539,0.583'+
                  'h18.476'+
                  'v241.17'+
                  'c0,0-100.018,0-147.01,0'+
                  'c0-102.243,75.862-151.737,147.01-151.737'+
                  'c162.92,0,210.353,245.91,310.97,245.91'+
                  'c197.302,0,136.545-537.723-120.696-537.723'+
                  'c-188.211,0-142.841,307.137,276,307.137'+
                  'c346.005,0,314.145-104.757,667.987-104.757'+
                  'c36.753,0,107.763,0,107.763,0'
            }
        }, {
            from: 'Show',
            to: '2014',
            scaleUsing: {
                '300': utility.scaleProportionalY,
                '768': utility.scaleProportionalY,
                '1024': utility.scaleProportionalY
            },
            drawn_delta: {
                '300': {
                    x: 5.894000053405762,
                    y: 69.93599700927734
                },
                '768': {
                    x: 0,
                    y: 325.2509868144989
                },
                '1024': {
                    x: -0.0010223388671875,
                    y: 415.2390081882477
                }
            },
            paths: {
                '300': 'M0,0 ' +
                    'l 0.666 0 ' +
                    'l 2.614 0 ' +
                    'l 2.614 34.968 ' +
                    'l 0 34.968 ',
                '768': 'M0-1.727'+
                  'c0,0-6-62.766-70.488-62.766'+
                  'c-82.512,0-125.405,122.407-8.012,208.5'+
                  'C-5.185,197.774,0,283.007,0,323.524',
                '1024': 'M1-2.268'+
                  'c0-54.927-37.938-120.92-121.493-120.92'+
                  'c-273.782,0-331.685,472.456-675.252,472.456'+
                  'c-155.657,0-149.47-175.371-2.215-175.371'+
                  'c176.523,0,268.487,175.491,412.479,175.491'+
                  'c149.992,0,140.628-276.197,282.138-276.197'+
                  'c51.664,0,84.091,36.964,84.091,82.104'+
                  'c0,118.206-315.529,192.343-124.768,192.343'+
                  'c35.333,0,145.019,0,145.019,0'+
                  'v65.333'
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
},{"./svg":5}],5:[function(require,module,exports){
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

    self.scaleProportionalYConstrainX = function (path, drawn_delta) {
        // scale y, fit x, and constrain the
        // maximum width of any horizontal lines
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

        return function (start, end, wwidth, wheight) {
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

            var max = {
                x: wwidth/delta.drawn.width
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
                // if (fit_x) {
                //     if ('x' in seg) dx = seg.x +
                //                     (delta.diff.x/(segment_count-1));
                // } else {
                //     if ('x' in seg) dx = seg.x;
                // }
                if ('x' in seg) dx = seg.x * max.x;
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
},{}],6:[function(require,module,exports){
module.exports = function nav () {
    var self = {},
        target_sel,
        overlaid = false,
        body_sel = d3.select('body'),
        removable_text = [{
            text: 'Go!'
        }];

    self.dispatch = d3.dispatch('asteriskClick');

    self.selection = function (_) {
        if (!arguments.length) return target_sel;
        target_sel = _;
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

        return self;
    };

    self.attachResize = function () {
        d3.select(window)
            .on('resize.nav', function () {
                place_button();
            })
            .on('scroll.nav', function () {
                place_button();
            })
            .on('touchmove.nav', function () {
                place_button();
            });

        return self;
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
            matching_sel =
                d3.select('.logo-text-component--2014');
            target_sel
                .style('left', matching_sel.style('right'))
                .style('bottom', matching_sel.style('bottom'));
        }
    }

    return self;
};
},{}],7:[function(require,module,exports){
module.exports = function bottom () {
    var self = {},
        dirty = false,
        body_sel = d3.select('body'),
        body_height;

    self.dispatch = d3.dispatch('bottom');

    self.dirty = function (_) {
        if (!arguments.length) return dirty;
        dirty = _;
        return self;
    };

    self.attachWindowEvents = function () {
        d3.select(window)
            .on('scroll.bottom', check_dispatch)
            .on('touchmove.bottom', check_dispatch);
    };

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        container_node = container_sel.node();
        return self;
    };

    function check_dispatch () {
        if (!container_node) throw "Requires container.";
        if (dirty) return;

        body_height = parseInt(body_sel.style('height'));
        if (body_height <=
            (window.innerHeight + window.scrollY)) {

            dirty = true;
            self.dispatch.bottom();
        }
    }

    return self;
};
},{}],8:[function(require,module,exports){
module.exports = function Data () {
    var self = {},
        requested = [],
        available,
        s3 = 'https://risdgradshow2014.s3.amazonaws.com/';

    self.dispatch = d3.dispatch('data','endOfData');

    self.fetch_data = function () {
        if (!available) {
            d3.json(s3 + 'data/metadata.json', process_metadata);
        } else {
            process_request();
        }
    };

    function process_metadata (raw_meta) {
        available = raw_meta.pages;
        process_request();
    }

    function process_request () {
        var next_to_load = choose_and_remove_from_available();
        if (next_to_load) {
            d3.json(next_to_load, function (data) {
                self.dispatch.data(data);
            });
        } else {
            self.dispatch.endOfData();
        }
    }

    function choose_and_remove_from_available () {
        var selected;
        var index = Math.random() * available.length;

        if (index > -1) {
            selected = available.splice(index, 1)[0];
        }

        return selected;
    }

    return self;
};
},{}],9:[function(require,module,exports){
module.exports = function fixed () {
    // when container hits the top, switch that element to fixed
    // plus the additional padding

    var self = {},
        not_fixed_sel,
        fixed_sel,
        pad_on_fixed_sel,
        original_pad_on_fixed_padding_top = '1px',
        padded_pad_on_fixed_padding_top,
        not_fixed_distance = 0,
        fixed_class = 'fixed';

    self.dispatch = d3.dispatch('activatorVisible');

    self.notFixed = function (_) {
        if (!arguments.length) return not_fixed_sel;
        not_fixed_sel = _;
        return self;
    };

    self.fixed = function (_) {
        if (!arguments.length) return fixed_sel;
        fixed_sel = _;
        return self;
    };

    self.padOnFixed = function (_) {
        if (!arguments.length) return pad_on_fixed_sel;
        pad_on_fixed_sel = _;
        return self;
    };

    self.top = function () {
        return not_fixed_distance;
    };

    self.initialize = function () {
        calc_contraints();

        d3.select(window)
            .on('scroll.fixed', function () {
                configure_fixed();
            })
            .on('touchmove.fixed', function () {
                configure_fixed();
            })
            .on('resize.fixed', function () {
                calc_contraints();
                configure_fixed();
            });
    };

    function configure_fixed () {
        var fixed_y = 0;

        if ((not_fixed_distance - pageYOffset) < 0) {
            fixed_y = pageYOffset - not_fixed_distance;
        }

        var fixed = (fixed_y === 0) ? false : true;

        self.dispatch
            .activatorVisible(fixed);

        fixed_sel.classed(fixed_class, fixed);

        pad_on_fixed_sel
            .style('padding-top',
                    fixed ?
                    padded_pad_on_fixed_padding_top :
                    original_pad_on_fixed_padding_top);
    }

    function calc_contraints () {
        var not_fixed_margin =
                +not_fixed_sel
                    .style('margin-top')
                    .split('p')[0];
        var not_fixed_height =
                not_fixed_sel
                    .node()
                    .getBoundingClientRect()
                    .height;

        not_fixed_distance = not_fixed_margin +
                             not_fixed_height;

        var fixed_bbox_height = fixed_sel
                .node()
                .getBoundingClientRect()
                .height;

        padded_pad_on_fixed_padding_top = fixed_bbox_height + 'px';
    }

    return self;
};
},{}],10:[function(require,module,exports){
var bottom = require('./bottom')();
var behance = require('./data')();
var departments = require('../departments')();
var transform = require('./transform')();
var lightbox = require('./lightbox')();
var scrollto = require('./scrollto')({ duration: 1000 });
var fixed = require('./fixed')();
var layout_image = require('./layout_image')();
var layout_fixed = require('./layout_fixed')();

module.exports = function work () {
    var self = {},
        container_sel,
        infinite_scroll_bool = false,
        data = [],
        work_container_sel,
        department_container_sel,
        work_sel,
        iso,
        layout = 'image',
        layouts = {
            image: {
                render: render_image,
                resize: resize_image
            },
            fixed: {
                render: render_fixed,
                resize: resize_fixed
            }
        },
        intro_sel,
        body_sel = d3.select('body');

    behance.dispatch
        .on('data', function (requested) {
            bottom.dirty(false);

            if (!requested) throw 'Work. Got no data.';
            var transformed = transform(requested.objects);

            data = data.concat(transformed);
            render();

            // update the filterable list
            departments.isFilterable(transformed);

            // google analytics tracking
            if (_gaq) {
                _gaq.push(['_trackEvent',
                           'WorkBottom',
                           'Reached bottom - Loading more data',
                           'Work',
                           2,
                           true]);
            }
        })
        .on('endOfData', function () {
            bottom.dispatch.on('bottom.work', null);
        });

    fixed.dispatch
        .on('activatorVisible', function (d) {
            departments.activatorVisible(d);
            body_sel.classed('in-work', d);
        });

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.filters = function (_) {
        if (!arguments.length) return department_container_sel;
        department_container_sel = _;
        return self;
    };

    self.intro = function (_) {
        if (!arguments.length) return intro_sel;
        intro_sel = _;
        return self;
    };

    self.layout = function (_) {
        if (!arguments.length) return layout;
        layout = _;
        return self;
    };

    self.lightboxContainer = function (_) {
        if (!arguments.length) return lightbox.container();
        lightbox.container(_);
        return self;
    };

    self.infiniteScroll = function (_) {
        if (!arguments.length) return infinite_scroll_bool;
        infinite_scroll_bool = _;

        if (infinite_scroll_bool === true) {
            bottom
                .container(container_sel);

            bottom.dispatch
                .on('bottom.work', function () {
                    bottom.dirty(true);
                    behance.fetch_data();
                });
        }

        return self;
    };

    self.initialize = function (_) {
        set_intro_height();

        if (!container_sel) throw "Work requires a container";
        container_sel.call(add_structure);
        layout_fixed.container(work_container_sel);
        layout_image.container(work_container_sel);

        if (infinite_scroll_bool) bottom.attachWindowEvents();

        // will be the thing to call render
        behance.fetch_data();

        // filtering
        departments.dispatch
            .on('click.work', function (department) {

            scrollto(fixed.top() + 10);

            if (department === 'all') department = '';

            if (iso) {
                iso.arrange({
                    filter: function (itemElem) {
                        return d3.select(itemElem)
                            .classed(department);
                    }
                });
            }
        });

        fixed.initialize();

        d3.select(window)
            .on('resize.work', function () {
                resize();
                set_intro_height();
            });

        return self;
    };

    function render () {
        layouts[layout].render();
    }

    function resize () {
        layouts[layout].resize();
    }

    function render_fixed () {
        work_sel = work_container_sel.selectAll('.piece')
            .data(data);

        var work_sel_enter = work_sel
            .enter()
            .append('div');

        layout_fixed
            .attributes(work_sel_enter);
        var masonry = layout_fixed.masonry();

        work_sel_enter
            .style('width', function (d, i) {
                return d.masonry_width + 'px';
            })
            .style('height', function (d, i) {
                return d.masonry_height + 'px';
            })
            .attr('class', function (d, i) {
                return 'fixed-piece piece ' +
                        d.risd_program_class +
                        ' orientation-' + d.orientation;
            });

        work_sel_enter
            .append('div')
                .attr('class', 'piece-wrapper')
                .style('height', function (d) {
                    return (d.masonry_height -
                            d.meta_space) + 'px';
                })
            .append('div')
                .attr('class', 'piece-img-wrapper')
                .style('width', function (d) {
                    return d.masonry_width;
                })
                .style('height', function (d) {
                    return (d.masonry_height -
                            d.meta_space) + 'px';
                })
                .call(add_image);
        
        work_sel_enter
            .append('div')
                .attr('class', 'piece-meta-wrapper')
                .call(add_meta);

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        if (!iso) {
            iso = new Isotope(work_container_sel.node(), {
                itemSelector: '.piece',
                masonry: masonry
            });
        } else {
            work_sel_enter.each(function () {
                iso.appended(this);
            });
            iso.layout();
        }
    }

    function render_image ()  {
        work_sel = work_container_sel.selectAll('.piece')
            .data(data);

        var work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d, i) {
                    return 'image-piece piece ' +
                           d.risd_program_class;
                });

        layout_image
            .attributes(work_sel_enter);
        var masonry = layout_image.masonry();

        work_sel_enter
            .style('width', function (d, i) {
                return d.masonry_width + 'px';
            })
            .style('height', function (d, i) {
                return d.masonry_height + 'px';
            });

        work_sel_enter
            .append('div')
                .attr('class', 'piece-wrapper')
                .call(add_image);
        
        work_sel_enter
            .append('div')
                .attr('class', 'piece-meta-wrapper')
                .call(add_meta);

        work_sel_enter.transition()
            .delay(function (d, i) {
                return i * 50;
            })
            .duration(200)
            .style('opacity', 1);

        work_sel.on('click.work', function (d, i) {
            d3.select(this).call(lightbox.show);
        });

        if (!iso) {
            iso = new Isotope(work_container_sel.node(), {
                itemSelector: '.piece',
                masonry: masonry
            });
            iso.unbindResize();
        } else {
            work_sel_enter.each(function () {
                iso.appended(this);
            });
            iso.layout();
        }
    }

    function resize_image () {

        layout_image
            .attributes(work_sel);
        var masonry = layout_image.masonry();

        work_sel
            .style('width', function (d, i) {
                return d.masonry_width + 'px';
            })
            .style('height', function (d, i) {
                return d.masonry_height + 'px';
            });

        if (!iso) {
            iso = new Isotope(work_container_sel.node(), {
                itemSelector: '.piece',
                masonry: masonry
            });
        } else {
            iso.options.masonry = masonry;
            iso.layout();
        }
    }

    function resize_fixed () {

        layout_fixed
            .attributes(work_sel);
        var masonry = layout_fixed.masonry();

        work_sel
            .style('width', function (d, i) {
                return d.masonry_width + 'px';
            })
            .style('height', function (d, i) {
                return d.masonry_height + 'px';
            });

        work_sel
            .selectAll('.piece-wrapper')
            .style('height', function (d) {
                return (d.masonry_height -
                        d.meta_space) + 'px';
            });

        work_sel
            .selectAll('.piece-img-wrapper')
            .style('width', function (d) {
                return d.masonry_width;
            })
            .style('height', function (d) {
                return (d.masonry_height -
                        d.meta_space) + 'px';
            });

        if (!iso) {
            iso = new Isotope(work_container_sel.node(), {
                itemSelector: '.piece',
                masonry: masonry
            });
            iso.unbindResize();
        } else {
            iso.options.masonry = masonry;
            iso.layout();
        }
    }

    function add_structure (sel)  {
        var dept_container_sel = department_container_sel
            .append('article')
            .attr('class', 'departments grid z-15');

        work_container_sel = sel.append('article')
            .attr('class', 'work grid z-10 '+
                           'work-layout-' + layout);

        departments
            .container(dept_container_sel)
            .mobile(d3.select('.nav-mobile'))
            .render();

        fixed
            .notFixed(intro_sel)
            .fixed(department_container_sel)
            .padOnFixed(sel);
    }

    function add_meta (sel) {
        sel.append('p')
            .attr('class', 'student-name piece-meta')
            .text(function (d) {
                return d.student_name;
            });

        sel.append('p')
            .attr('class', 'risd-program piece-meta')
            .text(function (d) {
                return d.risd_program;
            });
    }

    function add_image (sel) {
        sel.append('img')
            .attr('src', function (d) {
                return d.cover.src;
            });
    }

    function set_intro_height () {
        var height =
            intro_sel
                .node()
                .getBoundingClientRect().height +
            parseInt(intro_sel.style('margin-top'), 10) +
            parseInt(intro_sel.style('margin-bottom'), 10);

        if (height < window.innerHeight) {
            var difference = window.innerHeight - height;
            intro_sel.style('padding-bottom', difference + 'px');
        }
    }

    return self;
};
},{"../departments":1,"./bottom":7,"./data":8,"./fixed":9,"./layout_fixed":11,"./layout_image":12,"./lightbox":13,"./scrollto":14,"./transform":15}],11:[function(require,module,exports){
module.exports = function layout_fixed () {
    var self = {};
    var container_sel;
    var counter = {
        tall: 0,
        wide: 0
    };
    var frequency = {
        large: 15,
        tall: 8,
        wide: 6
    };
    var meta_space = 50;
    var masonry = {
        gutter: 0,
        columnWidth: 0,
        columnWidthDouble: 0
    };

    self.masonry = function () {
        return masonry;
    };

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.attributes = function (sel) {
        counter = 0;
        masonry = masonry_settings();

        sel.each(function (d, i) {
            d.meta_space = meta_space;
            var multiplier = 1;

            if (i % frequency.large === 0) {

                // large
                multiplier = 2;

                if ((d.cover.original_width/
                     d.cover.original_height) > 1) {
                    d.orientation = 'landscape';
                } else {
                    d.orientation = 'portrait';
                }

                d.masonry_width =
                    (masonry.columnWidth *
                     multiplier) +
                    ((multiplier === 1) ?
                      0 : masonry.gutter);

                d.masonry_height = d.masonry_width;

            } else if ((d.cover.original_width/
                        d.cover.original_height) > 1) {

                // landscape
                counter.wide += 1;
                if (counter.wide % frequency.wide === 0) {
                    multiplier = 2;
                }

                d.masonry_width =
                    (masonry.columnWidth *
                     multiplier) +
                    ((multiplier === 1) ?
                      0 : masonry.gutter);

                d.masonry_height = d.masonry_width;
                d.orientation = 'landscape';
            } else {
                // portrait
                counter.tall += 1;
                if (counter.tall % frequency.tall === 0) {
                    multiplier = 2;
                }

                d.masonry_height =
                    (masonry.columnWidth *
                     multiplier) +
                    ((multiplier === 1) ?
                      0 : masonry.gutter);

                d.masonry_width = masonry.columnWidth;
                d.orientation = 'portrait';
            }
        });
    };

    function masonry_settings () {
        var total_work_width = container_sel
                                    .node()
                                    .getBoundingClientRect()
                                    .width;

        var number_of_columns = 2;

        if (window.innerWidth >= 768) {
            number_of_columns = 4;
        }

        var gutter = 0;
        var column_width = (total_work_width / number_of_columns) -
                           (gutter * (number_of_columns - 1));

        return {
            gutter: gutter,
            columnWidth: column_width,
            columnDoubleWidth: column_width * 2 + gutter
        };
    }

    return self;
};
},{}],12:[function(require,module,exports){
module.exports = function layout_image () {
    var self = {};
    var container_sel;
    var meta_space = 35;
    var counter = 0;
    var frequency = 14;
    var masonry = {
        gutter: 0,
        columnWidth: 0,
        columnWidthDouble: 0
    };

    self.masonry = function () {
        return masonry;
    };

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.attributes = function (sel) {
        counter = 0;
        masonry = masonry_settings();

        sel.each(function (d, i) {
            if ((d.cover.original_width/
                 d.cover.original_height) >
                1.8) {

                d.masonry_width = masonry.columnDoubleWidth;
                d.masonry_height =
                    ((d.masonry_width *
                      d.cover.original_height)/
                     d.cover.original_width) + meta_space;

            } else {
                counter += 1;

                // make every 5th one big.
                if (counter % frequency === 0) {
                    d.masonry_width =
                        masonry.columnDoubleWidth;
                } else {
                    d.masonry_width = masonry.columnWidth;
                }
                d.masonry_height =
                    ((d.masonry_width *
                      d.cover.original_height)/
                     d.cover.original_width) +
                    meta_space;
            }
        });
    };

    function masonry_settings () {
        var total_work_width = container_sel
                                    .node()
                                    .getBoundingClientRect()
                                    .width;

        var number_of_columns = 2;

        if (window.innerWidth >= 768) {
            number_of_columns = 4;
        }

        var gutter = 0;
        var column_width = (total_work_width / number_of_columns) -
                           (gutter * (number_of_columns - 1));

        return {
            gutter: gutter,
            columnWidth: column_width,
            columnDoubleWidth: column_width * 2 + gutter
        };
    }

    return self;
};
},{}],13:[function(require,module,exports){
module.exports = function lightbox () {
    var self = {},
        container_sel,
        selected_sel,
        body_sel = d3.select('body');

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.show = function (sel) {
        console.log('clicked');
        console.log(sel);
        if (!container_sel) throw "Lightbox. Requires container.";

        selected_sel = sel;

        var data = sel.datum();

        var lightbox_grid_sel = container_sel
            .append('div')
            .attr('class', 'grid');

        var lightbox_meta_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-meta');

        var lightbox_work_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class',
                      'lightbox-work '+
                      'offset-percent-2-10 '+
                      'col-percent-8-10');

        lightbox_meta_sel
            .style('width',
                   (parseInt(lightbox_work_sel
                                .style('margin-left')) - 20) + 'px');

        d3.select(window)
            .on('resize.lightbox', function () {
                lightbox_meta_sel
                    .style('width',
                           (parseInt(lightbox_work_sel
                                        .style('margin-left')) - 20) +
                           'px');
            });

        lightbox_work_sel
            .append('h2')
            .attr('class', 'lightbox-title')
            .text(data.project_name);

        if (data.project_name != data.description) {
            lightbox_work_sel
                .append('p')
                .attr('class', 'lightbox-description')
                .text(data.description);
        }

        lightbox_work_sel.selectAll('.piece')
            .data(data.modules)
            .enter()
            .append('div')
            .attr('class', 'piece')
            .each(add_modules);

        var lightbox_meta_info_sel = lightbox_meta_sel
            .append('div')
            .attr('class', 'lightbox-meta-info');

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--student-name')
            .text(data.student_name);

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--risd-program')
            .text(data.risd_program);

        if (data.personal_link.length > 0) {
            lightbox_meta_info_sel
                .append('p')
                .attr('class', 'lightbox-meta-info--personal-link')
                .append('a')
                .attr('href', data.personal_link)
                .attr('target', '_blank')
                .text('Personal Website');
        }

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--personal-link')
            .append('a')
            .attr('href', data.url)
            .attr('target', '_blank')
            .text('Behance Portfolio');

        container_sel.classed('active', true);
        body_sel.classed('no-scroll', true);
        body_sel.classed('in-lightbox', true);

        container_sel.on('click', function () {
            close();
        });
    };

    function close () {
        container_sel
            .classed('active', false)
            .html('');

        body_sel.classed('no-scroll', false);
        body_sel.classed('in-lightbox', false);

        container_sel.on('click', null);
        
        d3.select(window)
            .on('resize.lightbox', null);
    }

    function add_modules (d, i) {
        var sel = d3.select(this);

        if (d.type === 'image') {
            sel.append('img')
                .attr('src',
                    d.sizes.max_1240 ? d.sizes.max_1240 : d.src);
        }
        if (d.type === 'text') {
            sel.append('p')
                .attr('class', 'piece-module-text')
                .text(d.text_plain);
        }
        if (d.type === 'embed') {
            sel.append('div')
                .attr('class', 'piece-module-embed')
                .html(d.embed);
        }
    }

    return self;
};
},{}],14:[function(require,module,exports){
module.exports = function scrollto (args) {
    var options = args || {};
    options.duration = args.duration || 2000;

    function scroll_tween (offset) {
        return function () {
            var i = d3.interpolateNumber(
                        window.pageYOffset ||
                            document.documentElement.scrollTop,
                        offset);
            return function (t) {
                scrollTo(0, i(t));
            };
        };
    }

    return function (offset) {
        d3.transition()
            .duration(options.duration)
            .tween('scroll', scroll_tween(offset));
    };
};
},{}],15:[function(require,module,exports){
// requires d3.scale.ordinal
module.exports = transform;

function transform () {
    return function (input) {
        var formatted = format_data_cover_with_modules(input);
        return shuffle(formatted);
    };
}

function format_data_cover_with_modules (data) {

    var formatted_data = [];

    // determine the extent of widths
    var all_modules = [];
    data.forEach(function (d, i) {
        d.details.modules.forEach(function (md, mi) {
            if (md.type === 'image') {
                all_modules.push(md);
            }
        });
    });

    data.forEach(function (d, i) {
        var modules_for_cover = [];
        var modules_to_include = [];
        d.details.modules.forEach(function (md, mi) {
            if (md.type === 'image') {
                modules_for_cover.push(md);
            }
            // these are all cases that are
            // covered in lightbox.js
            if ((md.type === 'image') |
                (md.type === 'text') |
                (md.type === 'embed')) {

                modules_to_include.push(md);
            }
        });

        var random_cover;
        if (modules_for_cover.length > 0) {
            // random_cover_option
            // based on images to include
            var random_module =
                modules_for_cover[Math.floor(Math.random() *
                                   modules_for_cover.length)];

            random_cover = {
                original_width: +random_module.width,
                original_height: +random_module.height,
                src: random_module.src
            };
            random_cover.height = (random_cover.width*
                                   random_module.height)/
                                  random_module.width;
        } else {
            // otherwise, just use a the cover that
            // is included
            random_cover = {
                original_width: 404,
                original_height: 316,
                src: d.details.covers['404']
            };
        }
        formatted_data.push({
            'project_name': d.name,
            'student_name': d.owners[0].display_name,
            'risd_program': d.risd_program,
            'risd_program_class':
                escape_department(d.risd_program),
            'modules': modules_to_include,
            'cover': random_cover,
            description: d.details.description,
            url: d.owners[0].url,
            personal_link: d.personal_link
        });
    });

    return formatted_data;
}

function shuffle (o) {
    for(var j, x, i = o.length;
        i;
        j = Math.floor(Math.random() * i),
        x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function escape_department(d) {
    return d.toLowerCase().replace(' ', '-');
}
},{}]},{},[2])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2RlcGFydG1lbnRzLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2xvZ28vaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvbG9nby9zY2FsZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9sb2dvL3N2Zy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L25hdi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2JvdHRvbS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2RhdGEuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29yay9maXhlZC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGF5b3V0X2ZpeGVkLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGF5b3V0X2ltYWdlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGlnaHRib3guanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29yay9zY3JvbGx0by5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL3RyYW5zZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcE5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbmFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbnRhaW5lcl9zZWwsXG4gICAgICAgIG1vYmlsZV9jb250YWluZXJfc2VsLFxuICAgICAgICBkZXB0YXJ0bWVudF9zZWwsXG4gICAgICAgIG1vYmlsZV9kZXBhcnRtZW50X3NlbCxcbiAgICAgICAgbW9iaWxlX2FjdGl2YXRvcl9zZWwsXG4gICAgICAgIG1vYmlsZV9ibGFua2V0X3NlbCxcbiAgICAgICAgbW9iaWxlX2FjdGl2ZSA9IGZhbHNlLFxuICAgICAgICBzZWxlY3RlZCA9ICdBbGwnLFxuICAgICAgICBjbHMgPSAnZGVwYXJ0bWVudCcsXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5Jyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2NsaWNrJyk7XG5cbiAgICB2YXIgZGVwYXJ0bWVudHMgPSBbXG4gICAgICAgICdBbGwnLFxuICAgICAgICAnQXJjaGl0ZWN0dXJlJyxcbiAgICAgICAgJ0NlcmFtaWNzJyxcbiAgICAgICAgJ0RpZ2l0YWwgKyBNZWRpYScsXG4gICAgICAgICdGdXJuaXR1cmUgRGVzaWduJyxcbiAgICAgICAgJ0dsYXNzJyxcbiAgICAgICAgJ0dyYXBoaWMgRGVzaWduJyxcbiAgICAgICAgJ0luZHVzdHJpYWwgRGVzaWduJyxcbiAgICAgICAgJ0ludGVyaW9yIEFyY2hpdGVjdHVyZScsXG4gICAgICAgICdKZXdlbHJ5ICsgTWV0YWxzbWl0aGluZycsXG4gICAgICAgICdMYW5kc2NhcGUgQXJjaGl0ZWN0dXJlJyxcbiAgICAgICAgJ1BhaW50aW5nJyxcbiAgICAgICAgJ1Bob3RvZ3JhcGh5JyxcbiAgICAgICAgJ1ByaW50bWFraW5nJyxcbiAgICAgICAgJ1NjdWxwdHVyZScsXG4gICAgICAgICdUZXh0aWxlcydcbiAgICBdO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYubW9iaWxlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbW9iaWxlX2NvbnRhaW5lcl9zZWw7XG4gICAgICAgIG1vYmlsZV9jb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYWN0aXZhdG9yVmlzaWJsZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghbW9iaWxlX2FjdGl2YXRvcl9zZWwpIHJldHVybjtcbiAgICAgICAgbW9iaWxlX2FjdGl2YXRvcl9zZWwuY2xhc3NlZCgndmlzaWJsZScsIF8pO1xuICAgIH07XG5cbiAgICBzZWxmLnNlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGVwdGFydG1lbnRfc2VsO1xuICAgICAgICBkZXB0YXJ0bWVudF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hc0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiZGVwYXJ0bWVudHMgaXMgYSBnZXR0ZXJcIjtcbiAgICAgICAgcmV0dXJuIGRlcGFydG1lbnRzO1xuICAgIH07XG5cbiAgICBzZWxmLmlzRmlsdGVyYWJsZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGNoZWNrX2ZpbHRlcmFibGUoZGF0YSk7XG4gICAgICAgIHVwZGF0ZV9kZXBhcnRtZW50X3NlbCgpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghY29udGFpbmVyX3NlbCkgdGhyb3cgXCJyZXF1aXJlcyBhIHdyYXBwZXJcIjtcblxuICAgICAgICB2YXIgZGF0YSA9IGRlcGFydG1lbnRzLm1hcChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIHYgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogZCxcbiAgICAgICAgICAgICAgICBlc2NhcGVkOiBlc2NhcGVfZGVwYXJ0bWVudChkKSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChkID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHYuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHYuZmlsdGVyYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vIHNldHVwIHN0cnVjdHVyZVxuICAgICAgICBtb2JpbGVfYWN0aXZhdG9yX3NlbCA9IG1vYmlsZV9jb250YWluZXJfc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGNscyArICctYWN0aXZhdG9yJylcbiAgICAgICAgICAgIC50ZXh0KHNlbGVjdGVkKVxuICAgICAgICAgICAgLm9uKCdjbGljay5uYXZBY3RpdmF0b3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbW9iaWxlX2FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlX25hdigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbW9iaWxlX2JsYW5rZXRfc2VsID0gbW9iaWxlX2NvbnRhaW5lcl9zZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgY2xzICsgJy1ibGFua2V0JylcbiAgICAgICAgICAgIC5vbignY2xpY2submF2QmxhbmtldCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBtb2JpbGVfYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdXBkYXRlX25hdigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsID0gbW9iaWxlX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBjbHMgKyAnLWVsZW1lbnRzIGRlcGFydG1lbnRzJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoY2xzKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtscyA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChkLmZpbHRlcmFibGUpIGtscyArPSAnIGZpbHRlcmFibGUnO1xuICAgICAgICAgICAgICAgIGlmIChkLnNlbGVjdGVkKSBrbHMgKz0gJyBzZWxlY3RlZCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5uYW1lO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2suZGVwYXJ0bWVudHMnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgcmVzcG9uZHMgdG8gZmlsdGVyYWJsZSBpdGVtc1xuICAgICAgICAgICAgICAgIGlmICghZC5maWx0ZXJhYmxlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBkZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZGQsIGRpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZC5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGQuc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jbGljayhkLmVzY2FwZWQpO1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlX2RlcGFydG1lbnRfc2VsKCk7XG5cbiAgICAgICAgICAgICAgICBtb2JpbGVfYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBkLm5hbWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlX25hdigpO1xuXG4gICAgICAgICAgICAgICAgZGVwYXJ0bWVudF9zZWwuZGF0YShtb2JpbGVfZGVwYXJ0bWVudF9zZWwuZGF0YSgpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRoZSBidXNpbmVzc1xuXG4gICAgICAgIGRlcGFydG1lbnRfc2VsID0gY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgndWwnKVxuICAgICAgICAgICAgLnNlbGVjdEFsbChjbHMpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIga2xzID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGQuZmlsdGVyYWJsZSkga2xzICs9ICcgZmlsdGVyYWJsZSc7XG4gICAgICAgICAgICAgICAgaWYgKGQuc2VsZWN0ZWQpIGtscyArPSAnIHNlbGVjdGVkJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm5hbWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljay5kZXBhcnRtZW50cycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSByZXNwb25kcyB0byBmaWx0ZXJhYmxlIGl0ZW1zXG4gICAgICAgICAgICAgICAgaWYgKCFkLmZpbHRlcmFibGUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGRlcGFydG1lbnRfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkZCwgZGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRkLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZC5zZWxlY3RlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNsaWNrKGQuZXNjYXBlZCk7XG5cbiAgICAgICAgICAgICAgICB1cGRhdGVfZGVwYXJ0bWVudF9zZWwoKTtcblxuICAgICAgICAgICAgICAgIG1vYmlsZV9hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGQubmFtZTtcbiAgICAgICAgICAgICAgICB1cGRhdGVfbmF2KCk7XG5cbiAgICAgICAgICAgICAgICBtb2JpbGVfZGVwYXJ0bWVudF9zZWwuZGF0YShkZXBhcnRtZW50X3NlbC5kYXRhKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9uYXYgKCkge1xuICAgICAgICBtb2JpbGVfY29udGFpbmVyX3NlbC5jbGFzc2VkKCdhY3RpdmUnLCBtb2JpbGVfYWN0aXZlKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgbW9iaWxlX2FjdGl2ZSk7XG4gICAgICAgIG1vYmlsZV9hY3RpdmF0b3Jfc2VsLnRleHQoc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9kZXBhcnRtZW50X3NlbCAoKSB7XG4gICAgICAgIGRlcGFydG1lbnRfc2VsXG4gICAgICAgICAgICAuY2xhc3NlZCgnZmlsdGVyYWJsZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuZmlsdGVyYWJsZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnNlbGVjdGVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIG1vYmlsZV9kZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgLmNsYXNzZWQoJ2ZpbHRlcmFibGUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmZpbHRlcmFibGU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zZWxlY3RlZDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrX2ZpbHRlcmFibGUgKGRhdGEpIHtcbiAgICAgICAgLy8gZ2l2ZW4gc29tZSBkYXRhLCBjaGVjayB0byBzZWUgaWZcbiAgICAgICAgLy8gZWFjaCBjYXRlZ29yeSBpcyBmaWx0ZXJhYmxlXG4gICAgICAgIFxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGRlcGFydG1lbnRfc2VsXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGRkLCBkaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5yaXNkX3Byb2dyYW0gPT09IGRkLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRkLmZpbHRlcmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtb2JpbGVfZGVwYXJ0bWVudF9zZWxcbiAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZGQsIGRpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLnJpc2RfcHJvZ3JhbSA9PT0gZGQubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGQuZmlsdGVyYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXNjYXBlX2RlcGFydG1lbnQoZCkge1xuICAgICAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBOYXYgPSByZXF1aXJlKCcuL292ZXJsYXkvbmF2JyksXG4gICAgTG9nbyA9IHJlcXVpcmUoJy4vbG9nby9pbmRleCcpLFxuICAgIFdvcmsgPSByZXF1aXJlKCcuL3dvcmsvaW5kZXgnKTtcblxudmFyIHdvcmtfYXJncyA9IHBhcnNlX3VybF9mb3Jfd29yayh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG5cbnNpdGUoKVxuICAgIC5jb2xvcnMoKVxuICAgIC5vdmVybGF5KClcbiAgICAubG9nbygpXG4gICAgLndvcmsod29ya19hcmdzKVxuICAgIC5yZXZlYWwoKTtcblxuXG5mdW5jdGlvbiBwYXJzZV91cmxfZm9yX3dvcmsgKHBhdGgpIHtcbiAgICAvLyBjb25zb2xlLmxvZyhwYXRoKTtcbiAgICB2YXIgaXNfaXRfbGl2ZSA9IHRydWU7XG4gICAgdmFyIHdoaWNoX2xheW91dCA9ICdpbWFnZSc7XG4gICAgLy8gaWYgKHBhdGguaW5kZXhPZignd29yaycpID4gLTEpIHtcbiAgICAvLyAgICAgaXNfaXRfbGl2ZSA9IHRydWU7XG4gICAgLy8gfVxuICAgIC8vIGlmIChwYXRoLmluZGV4T2YoJ2ZpeGVkJykgPiAtMSkge1xuICAgIC8vICAgICB3aGljaF9sYXlvdXQgPSAnZml4ZWQnO1xuICAgIC8vIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBsaXZlOiBpc19pdF9saXZlLFxuICAgICAgICBsYXlvdXQ6IHdoaWNoX2xheW91dFxuICAgIH07XG59XG5cbmZ1bmN0aW9uIHNpdGUgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbG9yX3ZhbHVlcyA9IHtcbiAgICAgICAgICAgIHB1cnBsZTogJ3JnYigzOCwgMzQsIDk4KTsnLFxuICAgICAgICAgICAgb3JhbmdlOiAncmdiKDI1NSwgNjEsIDU2KTsnLFxuICAgICAgICAgICAgJ2x0LXB1cnBsZSc6ICdyZ2IoMTQ2LCA1MywgMTI1KScsXG4gICAgICAgICAgICBibHVlOiAncmdiKDQzLCA4OSwgMTg0KSdcbiAgICAgICAgfSxcbiAgICAgICAgdXNlX2ltYWdlc19hc19vdmVybGF5X2JhY2tncm91bmQgPSB0cnVlLFxuICAgICAgICBiYWNrZ3JvdW5kX2ltYWdlX3JvdGF0aW9uX21ldGhvZCA9ICdibG9jaycsXG4gICAgICAgIGJhY2tncm91bmRfaW1hZ2Vfcm90YXRpb25fbWV0aG9kcyA9IFsnZmFkZScsICdibG9jayddLFxuICAgICAgICBib2R5ID0gZDMuc2VsZWN0KCdib2R5Jyk7XG5cbiAgICB2YXIgY29sb3JzID0gT2JqZWN0LmtleXMoY29sb3JfdmFsdWVzKTtcblxuICAgIHZhciBuYXYgPSBOYXYoKTtcbiAgICB2YXIgbG9nbyA9IExvZ28oKTtcbiAgICB2YXIgd29yayA9IFdvcmsoKTtcblxuICAgIHNlbGYuY29sb3JzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcmFuZG9tX2luZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY29sb3JzLmxlbmd0aCk7XG5cbiAgICAgICAgdmFyIGNvbG9yID0gY29sb3JzW3JhbmRvbV9pbmRleF07XG4gICAgICAgIHZhciBhbHRfY29sb3JzID0gY29sb3JzLnNsaWNlKDAscmFuZG9tX2luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQoY29sb3JzLnNsaWNlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX2luZGV4ICsgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9ycy5sZW5ndGgpKTtcblxuICAgICAgICB2YXIgYWx0X2NvbG9yID0gYWx0X2NvbG9yc1tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmZsb29yKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0X2NvbG9ycy5sZW5ndGgpXTtcblxuICAgICAgICBib2R5LmNsYXNzZWQoJ2JvZHktJyArIGNvbG9yLCB0cnVlKTtcbiAgICAgICAgYm9keS5jbGFzc2VkKCdib2R5LWFsdC0nICsgYWx0X2NvbG9yLCB0cnVlKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5vdmVybGF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFpcnMgPSBkMy5zZWxlY3RBbGwoJy5vdmVybGF5LW5hdi1pdGVtJylcbiAgICAgICAgICAgIC5kYXR1bShmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRhdGFzZXQ7IH0pO1xuXG4gICAgICAgIG5hdi5zZWxlY3Rpb24ocGFpcnMpXG4gICAgICAgICAgICAuc2V0dXAoKVxuICAgICAgICAgICAgLmF0dGFjaFJlc2l6ZSgpO1xuXG4gICAgICAgIC8vIHNldHVwIGNsaWNrIHRyYWNraW5nIHdpdGggZ29vZ2xlIGFuYWx5dGljc1xuICAgICAgICBuYXYuZGlzcGF0Y2hcbiAgICAgICAgICAgIC5vbignYXN0ZXJpc2tDbGljaycsIGZ1bmN0aW9uIChvdmVybGFpZF9ib29sZWFuKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFfZ2FxKSByZXR1cm47XG4gICAgICAgICAgICAgICAgaWYgKG92ZXJsYWlkX2Jvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gb3BlbmluZ1xuICAgICAgICAgICAgICAgICAgICBfZ2FxLnB1c2goWydfdHJhY2tFdmVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0dvQnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQXN0ZXJpc2sgQ2xpY2sgLSBPcGVuJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnSG9tZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlXSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2luZ1xuICAgICAgICAgICAgICAgICAgICBfZ2FxLnB1c2goWydfdHJhY2tFdmVudCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0dvQnV0dG9uJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQXN0ZXJpc2sgQ2xpY2sgLSBDbG9zZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0Fib3V0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5sb2dvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBsb2dvLmNvbnRhaW5lcihkMy5zZWxlY3QoJy5sb2dvLWxpbmUnKSlcbiAgICAgICAgICAgIC5hdHRhY2hSZXNpemUoKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLndvcmsgPSBmdW5jdGlvbiAoYXJncykge1xuICAgICAgICBpZiAoYXJncy5saXZlKSB7XG4gICAgICAgICAgICAvLyBzZXQgdXBcbiAgICAgICAgICAgIHdvcmsuY29udGFpbmVyKGQzLnNlbGVjdCgnLndvcmstY29udGFpbmVyJykpXG4gICAgICAgICAgICAgICAgLmZpbHRlcnMoZDMuc2VsZWN0KCcuZGVwYXJ0bWVudC1jb250YWluZXInKSlcbiAgICAgICAgICAgICAgICAuaW5maW5pdGVTY3JvbGwodHJ1ZSlcbiAgICAgICAgICAgICAgICAubGF5b3V0KGFyZ3MubGF5b3V0KVxuICAgICAgICAgICAgICAgIC5saWdodGJveENvbnRhaW5lcihkMy5zZWxlY3QoJy5saWdodGJveCcpKVxuICAgICAgICAgICAgICAgIC5pbnRybyhkMy5zZWxlY3QoJy5pbnRyby1xdW90ZScpKVxuICAgICAgICAgICAgICAgIC5pbml0aWFsaXplKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QoJy53b3JrLXNlY3Rpb24nKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmxpZ2h0Ym94JykucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmV2ZWFsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmVuZG9yID1cbiAgICAgICAgICAgIFtcIlwiLCBcIi13ZWJraXQtXCIsIFwiLW1vei1cIiwgXCItbXMtXCIsIFwiLW8tXCJdLnJlZHVjZShcbiAgICAgICAgICAgIGZ1bmN0aW9uIChwLCB2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHYgK1xuICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNmb3JtXCIgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSA/IHYgOiBwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHZhciB0cmF2ZWwgPSAoLSh3aW5kb3cuaW5uZXJIZWlnaHQqMC44KSk7XG4gICAgICAgIHZhciB0cmFuc2Zyb21fc3RhcnQgPSAndHJhbnNsYXRlKDBweCwnICsgdHJhdmVsICsgJ3B4KSc7XG4gICAgICAgIHZhciB0cmFuc2Zyb21fZW5kID0gJ3RyYW5zbGF0ZSgwcHgsMHB4KSc7XG4gICAgICAgIHZhciByZXZlYWwgPSBkMy5zZWxlY3RBbGwoJy5yZXZlYWwtbWUnKTtcblxuICAgICAgICByZXZlYWxcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDApXG4gICAgICAgICAgICAuc3R5bGUodmVuZG9yKyd0cmFuc2Zvcm0nLCB0cmFuc2Zyb21fc3RhcnQpO1xuXG4gICAgICAgIHJldmVhbFxuICAgICAgICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmRlbGF5KDgwMClcbiAgICAgICAgICAgIC5kdXJhdGlvbigxMjAwKVxuICAgICAgICAgICAgLmVhc2UoJ2N1YmljLWlub3V0JylcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpXG4gICAgICAgICAgICAuc3R5bGVUd2Vlbih2ZW5kb3IrJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkMy5pbnRlcnBvbGF0ZVN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZnJvbV9zdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZnJvbV9lbmQpO1xuXG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59IiwidmFyIGNvbm5lY3RMb2dvU2NhbGUgPSByZXF1aXJlKCcuL3NjYWxlJyk7XG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoJy4vc3ZnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9nbyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGxvZ29fc3ZnLFxuICAgICAgICBsb2dvX3RleHRfc2VsLFxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbCxcbiAgICAgICAgc3RyYWlnaHRfbGluZSA9IGQzLnN2Zy5saW5lKCksXG4gICAgICAgIGNvbm5lY3RfbG9nb19zY2FsZSA9IGNvbm5lY3RMb2dvU2NhbGUoKSxcbiAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsO1xuXG4gICAgdmFyIHV0aWxpdHkgPSBVdGlsaXR5KCk7XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxvZ29fY29udGFpbmVyX3NlbDtcbiAgICAgICAgbG9nb19jb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGVsYXlQYXN0UmV2ZWFsID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGVsYXlfcGFzdF9yZXZlYWxfc2VsO1xuICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hdHRhY2hSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvd19zZWxcbiAgICAgICAgICAgIC5vbigncmVzaXplLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVjYWx1bGF0ZV9sb2dvX2xpbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gc2V0IHVwIHN2Z1xuICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIGxvZ29fc3ZnID0gbG9nb19jb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLXN2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2luZG93LmlubmVyV2lkdGgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgICAgICAgLy8gc2VsZWN0aW9uIG9mIHRoZSB0ZXh0IHRoYXQgd2lsbCBkZWZpbmUgdGhlIGxpbmVcbiAgICAgICAgbG9nb190ZXh0X3NlbCA9IGQzLnNlbGVjdCgnaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLmxvZ28tdGV4dC1jb21wb25lbnQnKTtcblxuICAgICAgICAvLyB2ZXJ0aWNpZXMgZm9yIFxuICAgICAgICB2YXIgdGV4dF92ZXJ0aWNpZXMgPSBsb2dvX2xpbmVfdGV4dF92ZXJ0aWNpZXMobG9nb190ZXh0X3NlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd193aWR0aCk7XG4gICAgICAgIHZhciBjb25uZWN0aW5nX3NlZ21lbnRzID1cbiAgICAgICAgICAgICAgICBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWdtZW50cyh0ZXh0X3ZlcnRpY2llcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dfd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgdmFyIG1lcmdlZF9kID0gbWVyZ2VfbGluZXModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpbmdfc2VnbWVudHMpO1xuXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsID0gbG9nb19zdmcuc2VsZWN0QWxsKCcubG9nby1saW5lLW1lcmdlZCcpXG4gICAgICAgICAgICAuZGF0YShbbWVyZ2VkX2RdKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWxpbmUtbWVyZ2VkJylcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkOyB9KTtcblxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbC5jYWxsKHR3ZWVuX2luKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVjYWx1bGF0ZV9sb2dvX2xpbmUgKCkge1xuICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIGxvZ29fc3ZnXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3dfd2lkdGgpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgaWYgKGxvZ29fbGluZV9tZXJnZWRfc2VsKSB7XG4gICAgICAgICAgICB1cGRhdGVfbG9nb19saW5lKHdpbmRvd193aWR0aCwgd2luZG93X2hlaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbG9nb19saW5lICh3d2lkdGgsIHdoZWlnaHQpIHtcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gbG9nb19saW5lX3RleHRfdmVydGljaWVzKGxvZ29fdGV4dF9zZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3d2lkdGgpO1xuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWlnaHQpO1xuXG4gICAgICAgIHZhciBtZXJnZWRfZCA9IG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzKTtcblxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbFxuICAgICAgICAgICAgLmRhdGEoW21lcmdlZF9kXSlcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQ7IH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fbGluZV90ZXh0X3ZlcnRpY2llcyAoc2VsLCB3d2lkdGgpIHtcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gW107XG5cbiAgICAgICAgc2VsLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdmFyIGZpcnN0LCBzZWNvbmQ7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gW2JvdW5kcy5sZWZ0ICsgMyxcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNDUpKSldO1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IFtib3VuZHMucmlnaHQgKyA2LFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC40NSkpKV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKChpID09PSAxKSB8IChpID09PSAyKSkge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gW2JvdW5kcy5sZWZ0IC0gMixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNDUpKSldO1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IFtib3VuZHMucmlnaHQgKyA2LFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC40NSkpKV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IDMpIHtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IFtib3VuZHMucmlnaHQgKyA2LFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC41NSkpKV07XG4gICAgICAgICAgICAgICAgc2Vjb25kID0gW2JvdW5kcy5sZWZ0IC0gNixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNTUpKSldO1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0X3ZlcnRpY2llcy5wdXNoKFtmaXJzdCwgc2Vjb25kXSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRleHRfdmVydGljaWVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fbGluZV9jb25uZWN0aW5nX3NlZ21lbnRzIChzdGFydF9lbmRfcG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3d2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWlnaHQpIHtcbiAgICAgICAgdmFyIGxpbmVfc2l6ZV90b19kcmF3ID1cbiAgICAgICAgICAgICAgICBjb25uZWN0X2xvZ29fc2NhbGUuY2hvb3NlX3NpemUod3dpZHRoLCB3aGVpZ2h0KTtcblxuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0X2VuZF9wb2ludHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgaWYgKChpKzEpIDwgc3RhcnRfZW5kX3BvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBzdGFydF9lbmRfcG9pbnRzW2ldWzFdLFxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBzdGFydF9lbmRfcG9pbnRzW2krMV1bMF07XG5cbiAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzXG4gICAgICAgICAgICAgICAgICAgIC5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNjYWxlW2xpbmVfc2l6ZV90b19kcmF3XShzdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25uZWN0aW5nX3NlZ21lbnRzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLCBjb25uZWN0aW5nX3NlZ21lbnRzKSB7XG4gICAgICAgIC8vIHRha2VzIGFycmF5IG9mIHZlcnRleCBwYWlycywgYW5kIHBhdGhcbiAgICAgICAgLy8gZWxlbWVudHMgb2YgY29ubmVjdGluZyBzZWdtZW50cy5cbiAgICAgICAgLy8gcmV0dXJucyBvbiBwYXRoIGQgYXR0cmlidXRlXG4gICAgICAgIHZhciBkID0gJyc7XG5cbiAgICAgICAgdmFyIHRlbXBfc3ZnID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpO1xuICAgICAgICB2YXIgdGVtcF9wYXRoID0gdGVtcF9zdmdcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3RlbXAtcGF0aCcpXG4gICAgICAgICAgICAuZGF0YSh0ZXh0X3ZlcnRpY2llcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdkJywgc3RyYWlnaHRfbGluZSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd0ZW1wLXBhdGgnKVxuICAgICAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICB0ZW1wX3BhdGguZWFjaChmdW5jdGlvbiAodGQsIHRpKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZCk7XG4gICAgICAgICAgICB2YXIgdGV4dF9kID0gZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2QnKTtcbiAgICAgICAgICAgIGQgKz0gdGV4dF9kO1xuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpbmdfc2VnbWVudHNbdGldKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbm5lY3RpbmdfZCA9IGNvbm5lY3Rpbmdfc2VnbWVudHNbdGldO1xuICAgICAgICAgICAgICAgIGQgKz0gY29ubmVjdGluZ19kO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB1dGlsaXR5LmNvbnZlcnRUb1JlbGF0aXZlKHRlbXBfcGF0aC5hdHRyKCdkJywgZCkubm9kZSgpKTtcbiAgICAgICAgLy8gcmVwbGFjZSBhbGwgYG1gIGluc3RydWN0aW9ucyB3aXRoIGBsYCwgZXhjZXB0XG4gICAgICAgIC8vIGZvciB0aGUgZmlyc3Qgb25lLiB0aGlzIGlzIGEgcmV2ZXJzZSByZWdleFxuICAgICAgICBkID0gdGVtcF9wYXRoLmF0dHIoJ2QnKS5yZXBsYWNlKC8oPyFeKW0vZywgJ2wnKTtcblxuICAgICAgICB0ZW1wX3N2Zy5yZW1vdmUoKTtcbiAgICAgICAgdGVtcF9wYXRoLnJlbW92ZSgpO1xuXG4gICAgICAgIHJldHVybiBkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2luKHBhdGgpIHtcbiAgICAgICAgcGF0aC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig4MDAwKVxuICAgICAgICAgICAgLmF0dHJUd2Vlbignc3Ryb2tlLWRhc2hhcnJheScsIHR3ZWVuRGFzaClcbiAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGRhc2ggYXJyYXksIGFzIHJlc2l6aW5nXG4gICAgICAgICAgICAgICAgLy8gdGhlIGJyb3dzZXIgd2lsbCBjaGFuZ2UgdGhlIGxlbmd0aFxuICAgICAgICAgICAgICAgIC8vIGFuZCB0aGVyZSBpcyBubyBuZWVkIHRvIHJlLWNvbXB1dGVcbiAgICAgICAgICAgICAgICAvLyB0aGUgZGFzaCBhcnJheSB0byBmaXQgaXQuXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5EYXNoKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZygnMCwnICsgbCwgbCArIFwiLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfY29sb3Jfc3RvcHMgKHNlbCl7XG4gICAgICAgIHNlbC5hcHBlbmQoJ3N0b3AnKVxuICAgICAgICAgICAgLmF0dHIoJ29mZnNldCcsICcwJScpXG4gICAgICAgICAgICAuYXR0cignc3RvcC1jb2xvcicsICd3aGl0ZScpXG4gICAgICAgICAgICAuYXR0cignc3RvcC1vcGFjaXR5JywgMCk7XG4gICAgICAgIHNlbC5hcHBlbmQoJ3N0b3AnKVxuICAgICAgICAgICAgLmF0dHIoJ29mZnNldCcsICcxMDAlJylcbiAgICAgICAgICAgIC5hdHRyKCdzdG9wLWNvbG9yJywgJ3doaXRlJylcbiAgICAgICAgICAgIC5hdHRyKCdzdG9wLW9wYWNpdHknLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIFV0aWxpdHkgPSByZXF1aXJlKCcuL3N2ZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxvZ29fc2NhbGUgKCkge1xuICAgIHZhciB1dGlsaXR5ID0gVXRpbGl0eSgpO1xuXG4gICAgdmFyIHNlZ21lbnRzID0gW3tcbiAgICAgICAgICAgIGZyb206ICdSSVNEJyxcbiAgICAgICAgICAgIHRvOiAnR3JhZCcsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZLFxuICAgICAgICAgICAgICAgICc3NjgnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhd25fZGVsdGE6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtMjcuOTk5OTg0NTkyMTk5MzI2LFxuICAgICAgICAgICAgICAgICAgICB5OiA0OTAuNjMxOTg4NTI1MzkwNlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzc2OCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTUuOTAwMDMxMDg5NzgyNzE1LFxuICAgICAgICAgICAgICAgICAgICB5OiAzNDMuMzc0MDIzNDM3NVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0wLjE2OTk4NTI5NDM0MjA0MTAyLFxuICAgICAgICAgICAgICAgICAgICB5OiAzOTEuNDY4OTYzNjIzMDQ2OVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAgICczMDAnOiAnTS0wLjQ2OSwwJytcbiAgICAgICAgICAgICAgICAgICdoNC45OTMnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMCwyMy41OTcsMCw1Mi4wNzMnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDYzLjE0LDQ5LjQyMSw5OS4wOTcsMTExLjg0LDk5LjA5NycrXG4gICAgICAgICAgICAgICAgICAnYzEyNy41LDAsOTAuOTU5LTExNi43ODMsMTYuMzgyLTExNi43ODMnK1xuICAgICAgICAgICAgICAgICAgJ2MtMjMuNjM2LDAtNDguMjY3LDAtNDguMjY3LDAnK1xuICAgICAgICAgICAgICAgICAgJ3YxNjUuOTUxJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDQ3LjI1MSw3Ni40ODQsOTQuOTQ2LDk1Ljg5NycrXG4gICAgICAgICAgICAgICAgICAnYzU0LjkyNSwyMi4zNTUsNTUuMjQyLTU4Ljk2OSwzLjEyOC00Ni4zMDInK1xuICAgICAgICAgICAgICAgICAgJ2MtMzAuNjgsNy40NTctOTUuNTQ4LDc3LjQyMS0xNjEuMDY2LDcwLjY0MScrXG4gICAgICAgICAgICAgICAgICAnYy03MC42MjItNy4zMDgtNDEuMTIyLTk1LjMwOCwyNC4wNDQtNTYuNjQxJytcbiAgICAgICAgICAgICAgICAgICdjMTQyLjQ4Myw4NC41NDItNzguMDQ1LDE3OS44NTktNzguMDQ1LDE4Mi41OTMnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDguNzI5LDAsNDQuMTA2LDAsNDQuMTA2JytcbiAgICAgICAgICAgICAgICAgICdoNC4wNDUnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTUsMGg1ODAuNzE5JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLTEzLjA4NywyNi42NzQtNDkuNTQ0LDQ3LjAyMycrXG4gICAgICAgICAgICAgICAgICAnYy0zMy4yNzEsMTguNTcyLTQ4LjYwNSwxMy40MzgtODUuMzQsNTAuNjgxJytcbiAgICAgICAgICAgICAgICAgICdjLTU2Ljk0OSw1Ny43MzctMy4xNjYsMTg2LjI5My0xNDUuODQ0LDE4Ni4yOTMnK1xuICAgICAgICAgICAgICAgICAgJ2MtMzMuMTM4LDAtOTkuODgsMC4wMDMtOTkuODgsMC4wMDNsMC0yMTUuMTA1JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDE0LjI5My0wLjEzNCwzNC41LDAnK1xuICAgICAgICAgICAgICAgICAgJ2MxNzAuMzYyLDEuMTI4LDE3Ni42MDgsMTUzLjcxMyw1NC42MDgsMTUzLjcxMycrXG4gICAgICAgICAgICAgICAgICAnYy0xNTMsMC0xMjguMzMzLTE2NS43OTEtMjMyLjk2LTE2NS43OTEnK1xuICAgICAgICAgICAgICAgICAgJ0MxLjMzNiw1Ni44MTctNS4yNjMsMzQzLjM3NC01LjI2MywzNDMuMzc0JytcbiAgICAgICAgICAgICAgICAgICdoNC41MjknLFxuICAgICAgICAgICAgICAgICcxMDI0JzogJ000LjEwNywwJytcbiAgICAgICAgICAgICAgICAgICdoOTE5LjE5OScrXG4gICAgICAgICAgICAgICAgICAnYzAsODMuODcyLTMxLjEzMiwxMjkuNjE1LTE2NS41OTIsMTI5LjYxNScrXG4gICAgICAgICAgICAgICAgICAnYy0xMzUuMjc0LDAsMjUuNjg5LDIxNC41NjUtMjAzLjc4NiwyMTQuNTY1JytcbiAgICAgICAgICAgICAgICAgICdjLTUzLjI5OCwwLTE2MC42NDEsMC4wMDUtMTYwLjY0MSwwLjAwNScrXG4gICAgICAgICAgICAgICAgICAnbDAtMjg2LjA5MicrXG4gICAgICAgICAgICAgICAgICAnYzAsMCw5MS42MDYsMCwxMjQuMTA2LDAnK1xuICAgICAgICAgICAgICAgICAgJ2MxNjAuMzM0LDAsMTUxLjMzNCwyMDMuMTM1LDUuMjE0LDIwMy4xMzUnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTU2Ljk1OCwwLTI2Ni4zNjQtMTYyLjA5OS0zNzIuNjU0LTE2Mi4wOTknK1xuICAgICAgICAgICAgICAgICAgJ2MtMTA4LjE5NSwwLTE2NC40NjIsMTIxLjkyNi0xNjQuNDYyLDI5Mi4zNCcrXG4gICAgICAgICAgICAgICAgICAnYzMuNzk3LDAsMTAuNjAzLDAsMTAuNjAzLDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGZyb206ICdHcmFkJyxcbiAgICAgICAgICAgIHRvOiAnU2hvdycsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxYLFxuICAgICAgICAgICAgICAgICc3NjgnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWCxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxYXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhd25fZGVsdGE6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAyNTMuNSxcbiAgICAgICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzc2OCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogNzg2LjA1Mjk3NjQ4OTA2NzEsXG4gICAgICAgICAgICAgICAgICAgIHk6IDAuMDAwMDIxNzU1Njk1MzQzMDE3NTc4XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMTI2MC41MDAwNjI0NjU2Njc3LFxuICAgICAgICAgICAgICAgICAgICB5OiAtMC4wMDAwMzc5NjgxNTg3MjE5MjM4M1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAgICczMDAnOiAnTTAsMCcrXG4gICAgICAgICAgICAgICAgICAnYzAsMCw0MS44NTMsMCw2OC42NjcsMCcrXG4gICAgICAgICAgICAgICAgICAnYzY0LDAsOTkuNjg4LTU1LjEzOSw5OC40OTItOTIuNzQ3JytcbiAgICAgICAgICAgICAgICAgICdjLTEuOTkyLTYyLjYxOS03NC45OTItMzkuNjE5LTU1Ljk0MSwxMS4yNDQnK1xuICAgICAgICAgICAgICAgICAgJ0MxMjMuMjA3LTQ5LjQ5MSwxNzIuMzM0LDAsMjExLjc2NCwwJytcbiAgICAgICAgICAgICAgICAgICdjMjAuMTcsMCw0MS43MzYsMCw0MS43MzYsMCcsXG4gICAgICAgICAgICAgICAgJzc2OCc6ICdNMS42OTgtMC43MzQnK1xuICAgICAgICAgICAgICAgICAgJ0g5JytcbiAgICAgICAgICAgICAgICAgICd2MTc5Ljk1JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLTIzLjMzMiwwLTY1LjQ3OCwwJytcbiAgICAgICAgICAgICAgICAgICdjMC0xMjguNTg4LDEwOC4yNy0yNDMuMDQ1LDI1OS4zMzktMjQzLjA0NScrXG4gICAgICAgICAgICAgICAgICAnQzQ0OS4yODktNjMuODI5LDQxNi45MzQsMjIzLDEzMy45NjYsMjIzJytcbiAgICAgICAgICAgICAgICAgICdjLTE2Ny42NDEsMC0xNy4yMTUtMTkwLjUzNCwyNDIuODA4LTE5MC41MzQnK1xuICAgICAgICAgICAgICAgICAgJ0M2NDYuNzUxLDMyLjQ2Niw2NjMuNzUxLDE5NSw2NjMuNzUxLDE5NScrXG4gICAgICAgICAgICAgICAgICAncy0xMzQuMDEsMC4wMTgtMTY3LjUsMC4wMTgnK1xuICAgICAgICAgICAgICAgICAgJ2MwLTEyNy4wMTgsODEuNS0xOTUuNzUyLDI2My41LTE5NS43NTInK1xuICAgICAgICAgICAgICAgICAgJ2M2LjQzNywwLDI4LDAsMjgsMCcsXG4gICAgICAgICAgICAgICAgJzEwMjQnOiAnTTMuNTM5LDAuNTgzJytcbiAgICAgICAgICAgICAgICAgICdoMTguNDc2JytcbiAgICAgICAgICAgICAgICAgICd2MjQxLjE3JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLTEwMC4wMTgsMC0xNDcuMDEsMCcrXG4gICAgICAgICAgICAgICAgICAnYzAtMTAyLjI0Myw3NS44NjItMTUxLjczNywxNDcuMDEtMTUxLjczNycrXG4gICAgICAgICAgICAgICAgICAnYzE2Mi45MiwwLDIxMC4zNTMsMjQ1LjkxLDMxMC45NywyNDUuOTEnK1xuICAgICAgICAgICAgICAgICAgJ2MxOTcuMzAyLDAsMTM2LjU0NS01MzcuNzIzLTEyMC42OTYtNTM3LjcyMycrXG4gICAgICAgICAgICAgICAgICAnYy0xODguMjExLDAtMTQyLjg0MSwzMDcuMTM3LDI3NiwzMDcuMTM3JytcbiAgICAgICAgICAgICAgICAgICdjMzQ2LjAwNSwwLDMxNC4xNDUtMTA0Ljc1Nyw2NjcuOTg3LTEwNC43NTcnK1xuICAgICAgICAgICAgICAgICAgJ2MzNi43NTMsMCwxMDcuNzYzLDAsMTA3Ljc2MywwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBmcm9tOiAnU2hvdycsXG4gICAgICAgICAgICB0bzogJzIwMTQnLFxuICAgICAgICAgICAgc2NhbGVVc2luZzoge1xuICAgICAgICAgICAgICAgICczMDAnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgICAgICAnNzY4JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFksXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXduX2RlbHRhOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogNS44OTQwMDAwNTM0MDU3NjIsXG4gICAgICAgICAgICAgICAgICAgIHk6IDY5LjkzNTk5NzAwOTI3NzM0XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnNzY4Jzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgICAgICB5OiAzMjUuMjUwOTg2ODE0NDk4OVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0wLjAwMTAyMjMzODg2NzE4NzUsXG4gICAgICAgICAgICAgICAgICAgIHk6IDQxNS4yMzkwMDgxODgyNDc3XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhdGhzOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6ICdNMCwwICcgK1xuICAgICAgICAgICAgICAgICAgICAnbCAwLjY2NiAwICcgK1xuICAgICAgICAgICAgICAgICAgICAnbCAyLjYxNCAwICcgK1xuICAgICAgICAgICAgICAgICAgICAnbCAyLjYxNCAzNC45NjggJyArXG4gICAgICAgICAgICAgICAgICAgICdsIDAgMzQuOTY4ICcsXG4gICAgICAgICAgICAgICAgJzc2OCc6ICdNMC0xLjcyNycrXG4gICAgICAgICAgICAgICAgICAnYzAsMC02LTYyLjc2Ni03MC40ODgtNjIuNzY2JytcbiAgICAgICAgICAgICAgICAgICdjLTgyLjUxMiwwLTEyNS40MDUsMTIyLjQwNy04LjAxMiwyMDguNScrXG4gICAgICAgICAgICAgICAgICAnQy01LjE4NSwxOTcuNzc0LDAsMjgzLjAwNywwLDMyMy41MjQnLFxuICAgICAgICAgICAgICAgICcxMDI0JzogJ00xLTIuMjY4JytcbiAgICAgICAgICAgICAgICAgICdjMC01NC45MjctMzcuOTM4LTEyMC45Mi0xMjEuNDkzLTEyMC45MicrXG4gICAgICAgICAgICAgICAgICAnYy0yNzMuNzgyLDAtMzMxLjY4NSw0NzIuNDU2LTY3NS4yNTIsNDcyLjQ1NicrXG4gICAgICAgICAgICAgICAgICAnYy0xNTUuNjU3LDAtMTQ5LjQ3LTE3NS4zNzEtMi4yMTUtMTc1LjM3MScrXG4gICAgICAgICAgICAgICAgICAnYzE3Ni41MjMsMCwyNjguNDg3LDE3NS40OTEsNDEyLjQ3OSwxNzUuNDkxJytcbiAgICAgICAgICAgICAgICAgICdjMTQ5Ljk5MiwwLDE0MC42MjgtMjc2LjE5NywyODIuMTM4LTI3Ni4xOTcnK1xuICAgICAgICAgICAgICAgICAgJ2M1MS42NjQsMCw4NC4wOTEsMzYuOTY0LDg0LjA5MSw4Mi4xMDQnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDExOC4yMDYtMzE1LjUyOSwxOTIuMzQzLTEyNC43NjgsMTkyLjM0MycrXG4gICAgICAgICAgICAgICAgICAnYzM1LjMzMywwLDE0NS4wMTksMCwxNDUuMDE5LDAnK1xuICAgICAgICAgICAgICAgICAgJ3Y2NS4zMzMnXG4gICAgICAgICAgICB9XG4gICAgICAgIH1dO1xuXG4gICAgdmFyIHRlbXBfc3ZnID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcbiAgICB2YXIgdGVtcF9wYXRoID0gdGVtcF9zdmdcbiAgICAgICAgLmFwcGVuZCgncGF0aCcpO1xuXG4gICAgdmFyIG1lYXN1cmVfZm9yX2ZmID0gZmFsc2U7XG5cbiAgICBzZWdtZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgIGQucmVsYXRpdmVfcGF0aHNfZCA9IHt9O1xuICAgICAgICBkLnJlbGF0aXZlX3BhdGhzID0ge307XG4gICAgICAgIGQuc2NhbGUgPSB7fTtcblxuICAgICAgICBpZiAobWVhc3VyZV9mb3JfZmYpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHNlZ21lbnRzW2ldLmZyb20gKyAnICcgKyBzZWdtZW50c1tpXS50byk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKHZhciBwYXRoX3NpemUgaW4gZC5wYXRocykge1xuICAgICAgICAgICAgdGVtcF9wYXRoLmF0dHIoJ2QnLCBkLnBhdGhzW3BhdGhfc2l6ZV0pO1xuICAgICAgICAgICAgdXRpbGl0eS5jb252ZXJ0VG9SZWxhdGl2ZSh0ZW1wX3BhdGgubm9kZSgpKTtcbiAgICAgICAgICAgIGQucmVsYXRpdmVfcGF0aHNfZFtwYXRoX3NpemVdID0gdGVtcF9wYXRoLmF0dHIoJ2QnKTtcbiAgICAgICAgICAgIGQucmVsYXRpdmVfcGF0aHNbcGF0aF9zaXplXSA9IHRlbXBfcGF0aC5ub2RlKCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGlmIChtZWFzdXJlX2Zvcl9mZikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaXplOiAnLCBwYXRoX3NpemUpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkZWx0YTogJywgdXRpbGl0eS5wYXRoRGVsdGEoXG4gICAgICAgICAgICAgICAgICAgIGQucmVsYXRpdmVfcGF0aHNbcGF0aF9zaXplXSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkLnNjYWxlW3BhdGhfc2l6ZV0gPVxuICAgICAgICAgICAgICAgIGQuc2NhbGVVc2luZ1twYXRoX3NpemVdKGQucmVsYXRpdmVfcGF0aHNbcGF0aF9zaXplXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLmRyYXduX2RlbHRhW3BhdGhfc2l6ZV0pO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB0ZW1wX3N2Zy5yZW1vdmUoKTtcbiAgICB0ZW1wX3BhdGgucmVtb3ZlKCk7XG5cbiAgICB2YXIgc2l6ZXMgPSBPYmplY3Qua2V5cyhzZWdtZW50c1swXS5wYXRocyk7XG4gICAgc2VnbWVudHMuY2hvb3NlX3NpemUgPSBmdW5jdGlvbiAod2luZG93X3dpZHRoLCB3aW5kb3dfaGVpZ2h0KSB7XG4gICAgICAgIHZhciBjaG9zZW4gPSAwO1xuICAgICAgICBzaXplcy5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoZCA8PSB3aW5kb3dfd2lkdGgpIHtcbiAgICAgICAgICAgICAgICBjaG9zZW4gPSBkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGNob3Nlbi50b1N0cmluZygpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuc2VnbWVudHMgPSBzZWdtZW50cztcblxuICAgIHJldHVybiBzZWdtZW50cztcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdmcgKCkge1xuICAgIHZhciBzZWxmID0ge307XG5cbiAgICBzZWxmLmNvbnZlcnRUb1JlbGF0aXZlID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgZnVuY3Rpb24gc2V0KHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgc2Vncy5yZXBsYWNlSXRlbShyc2VnLCBpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZHgsIGR5LCB4MCwgeTAsIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgc2VncyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgIGZvciAodmFyIHggPSAwLCB5ID0gMCwgaSA9IDAsIGxlbiA9IHNlZ3MubnVtYmVyT2ZJdGVtcztcbiAgICAgICAgICAgICBpIDwgbGVuO1xuICAgICAgICAgICAgIGkrKykge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgc2VnID0gc2Vncy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgIGMgICA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICBpZiAoL1tNTEhWQ1NRVEFael0vLnRlc3QoYykpIHtcbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxIC0geDtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0gc2VnLngyIC0geDtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxIC0geTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyIC0geTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnICBpbiBzZWcpIGR4ID0gLXggKyAoeCA9IHNlZy54KTtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gLXkgKyAoeSA9IHNlZy55KTtcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ01vdmV0bycsZHgsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdMaW5ldG8nLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdIJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvSG9yaXpvbnRhbCcsZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdMaW5ldG9WZXJ0aWNhbCcsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvQ3ViaWMnLGR4LGR5LHgxLHkxLHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdTJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b0N1YmljU21vb3RoJyxkeCxkeSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9RdWFkcmF0aWMnLGR4LGR5LHgxLHkxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b1F1YWRyYXRpY1Ntb290aCcsZHgsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdBcmMnLGR4LGR5LHNlZy5yMSxzZWcucjIsc2VnLmFuZ2xlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlZy5sYXJnZUFyY0ZsYWcsc2VnLnN3ZWVwRmxhZyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnWic6IGNhc2UgJ3onOiB4ID0geDA7IHkgPSB5MDsgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnIGluIHNlZykgeCArPSBzZWcueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knIGluIHNlZykgeSArPSBzZWcueTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBzdGFydCBvZiBhIHN1YnBhdGhcbiAgICAgICAgICAgIGlmIChjID09ICdNJyB8fCBjID09ICdtJykge1xuICAgICAgICAgICAgICAgIHgwID0geDtcbiAgICAgICAgICAgICAgICB5MCA9IHk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvWi9nLCAneicpKTtcbiAgICB9O1xuXG4gICAgc2VsZi5wYXRoRGVsdGEgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMFxuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzdGFydCA9IHBhdGguZ2V0UG9pbnRBdExlbmd0aCgwKSxcbiAgICAgICAgICAgIGVuZCA9IHBhdGguZ2V0UG9pbnRBdExlbmd0aChwYXRoLmdldFRvdGFsTGVuZ3RoKCkpO1xuXG4gICAgICAgIGRlbHRhLnggPSBlbmQueCAtIHN0YXJ0Lng7XG4gICAgICAgIGRlbHRhLnkgPSBlbmQueSAtIHN0YXJ0Lnk7XG5cbiAgICAgICAgcmV0dXJuIGRlbHRhO1xuICAgIH07XG5cbiAgICAvLyBwYXNzIGluIGEgcGF0aCBlbGVtZW50XG4gICAgLy8gYW5kIHRoZSBwYXRoIHNlZ2VtZW50IGluZGljaWVzXG4gICAgLy8gdGhhdCB3aWxsIGJlIHNjYWxlZFxuICAgIHNlbGYuc2NhbGVBbmNob3JZID0gZnVuY3Rpb24gKHBhdGgsIGFuY2hvcnMpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlQW5jaG9yWScpO1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IHNlbGYucGF0aERlbHRhKHBhdGgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjdXJyZW50IGRlbHRhXG4gICAgICAgICAgICBkZWx0YS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGVuZFswXSAtIHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IgKHZhciBuYW1lIGluIGFuY2hvcnMpIHtcbiAgICAgICAgICAgICAgICB2YXIgdG9fcmVwbGFjZSA9IHNlZ21lbnRzLmdldEl0ZW0oYW5jaG9yc1tuYW1lXSk7XG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2Vfd2l0aCA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ0N1cnZldG9DdWJpY1JlbChcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueSArICgoZGVsdGEuY3VycmVudC55LVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWx0YS5kcmF3bi55KS8yKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueDEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS54MixcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueTIpO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2Vfd2l0aCwgYW5jaG9yc1tuYW1lXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsID0gZnVuY3Rpb24gKHBhdGgsIGRyYXduX2RlbHRhKSB7XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgICAgICBkcmF3bjogZHJhd25fZGVsdGFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmlnaW5hbF9kID0gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlKGFsbF9zZWdtZW50cywgc2VnbWVudF90b19yZXBsYWNlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIGFsbF9zZWdtZW50cy5yZXBsYWNlSXRlbShyc2VnLCBzZWdtZW50X3RvX3JlcGxhY2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGVQcm9wb3J0aW9uYWwnKTtcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgcmF0aW8gPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54L2RlbHRhLmRyYXduLngsXG4gICAgICAgICAgICAgICAgeTogZGVsdGEuY3VycmVudC55L2RlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIG9yaWdpbmFsX2QpO1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgdmFyIGZpcnN0X3NlZ21lbnQgPSBzZWdtZW50cy5nZXRJdGVtKDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3NlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhdGhTZWdUeXBlQXNMZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgPT09ICdtJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50X3NlZyA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0FicyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2VtZW50X3NlZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkeCwgZHksIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgICAgIHggPSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5ID0gc3RhcnRbMV07XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlZ21lbnRzLm51bWJlck9mSXRlbXM7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzZWcgPSBzZWdtZW50cy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgICAgICBjID0gc2VnLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0gc2VnLngyICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnICBpbiBzZWcpIGR4ID0gc2VnLnggICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnkgICogcmF0aW8ueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsWSA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICAvLyBzY2FsZSB5LCBmaXQgeFxuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyksXG4gICAgICAgICAgICBmaXRfeCA9IGZhbHNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2UoYWxsX3NlZ21lbnRzLCBzZWdtZW50X3RvX3JlcGxhY2UsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgYWxsX3NlZ21lbnRzLnJlcGxhY2VJdGVtKHJzZWcsIHNlZ21lbnRfdG9fcmVwbGFjZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhLmRyYXduLngpID4gMC4xKSB7XG4gICAgICAgICAgICBmaXRfeCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZVByb3BvcnRpb25hbCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGVsdGEuZGlmZiA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LnggLSBkZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueSAtIGRlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR4LCBkeSwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICAgICAgeCA9IHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHkgPSBzdGFydFsxXSxcbiAgICAgICAgICAgICAgICBzZWdtZW50X2NvdW50ID0gc2VnbWVudHMubnVtYmVyT2ZJdGVtcztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VnbWVudF9jb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ21lbnRzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgICAgIGMgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDE7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MjtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoZml0X3gpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIGR4ID0gc2VnLnggK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRlbHRhLmRpZmYueC8oc2VnbWVudF9jb3VudC0xKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIGR4ID0gc2VnLng7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSBzZWcueSAgKiByYXRpby55O1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ01vdmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9Ib3Jpem9udGFsJywgZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b1ZlcnRpY2FsJywgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpYycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgxLHkxLHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWNTbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHNlbGYuc2NhbGVQcm9wb3J0aW9uYWxZQ29uc3RyYWluWCA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICAvLyBzY2FsZSB5LCBmaXQgeCwgYW5kIGNvbnN0cmFpbiB0aGVcbiAgICAgICAgLy8gbWF4aW11bSB3aWR0aCBvZiBhbnkgaG9yaXpvbnRhbCBsaW5lc1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyksXG4gICAgICAgICAgICBmaXRfeCA9IGZhbHNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2UoYWxsX3NlZ21lbnRzLCBzZWdtZW50X3RvX3JlcGxhY2UsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgYWxsX3NlZ21lbnRzLnJlcGxhY2VJdGVtKHJzZWcsIHNlZ21lbnRfdG9fcmVwbGFjZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKE1hdGguYWJzKGRlbHRhLmRyYXduLngpID4gMC4xKSB7XG4gICAgICAgICAgICBmaXRfeCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQsIHd3aWR0aCwgd2hlaWdodCkge1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgZGVsdGEuZGlmZiA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LnggLSBkZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueSAtIGRlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIG1heCA9IHtcbiAgICAgICAgICAgICAgICB4OiB3d2lkdGgvZGVsdGEuZHJhd24ud2lkdGhcbiAgICAgICAgICAgIH07XG5cblxuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdLFxuICAgICAgICAgICAgICAgIHNlZ21lbnRfY291bnQgPSBzZWdtZW50cy5udW1iZXJPZkl0ZW1zO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50X2NvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0gc2VnLngyO1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTEgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIGlmICgneTInIGluIHNlZykgeTIgPSBzZWcueTIgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIC8vIGlmIChmaXRfeCkge1xuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoJ3gnIGluIHNlZykgZHggPSBzZWcueCArXG4gICAgICAgICAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICAoZGVsdGEuZGlmZi54LyhzZWdtZW50X2NvdW50LTEpKTtcbiAgICAgICAgICAgICAgICAvLyB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vICAgICBpZiAoJ3gnIGluIHNlZykgZHggPSBzZWcueDtcbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIGR4ID0gc2VnLnggKiBtYXgueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnkgICogcmF0aW8ueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsWCA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsWCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50cy5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyO1xuICAgICAgICAgICAgICAgIGlmICgneCcgIGluIHNlZykgZHggPSBzZWcueCAgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSBzZWcueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBuYXYgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHRhcmdldF9zZWwsXG4gICAgICAgIG92ZXJsYWlkID0gZmFsc2UsXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5JyksXG4gICAgICAgIHJlbW92YWJsZV90ZXh0ID0gW3tcbiAgICAgICAgICAgIHRleHQ6ICdHbyEnXG4gICAgICAgIH1dO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhc3Rlcmlza0NsaWNrJyk7XG5cbiAgICBzZWxmLnNlbGVjdGlvbiA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRhcmdldF9zZWw7XG4gICAgICAgIHRhcmdldF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5vdmVybGFpZCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG92ZXJsYWlkO1xuICAgICAgICBvdmVybGFpZCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnNldHVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRhcmdldF9zZWwpIHRocm93IFwicmVxdWlyZXMgZWxlbWVudHMgdG8gcGFpclwiO1xuICAgICAgICB0YXJnZXRfc2VsXG4gICAgICAgICAgICAub24oJ2NsaWNrLm5hdicsIGZ1bmN0aW9uIChkLCBkaSkge1xuICAgICAgICAgICAgICAgIHRhcmdldF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgnI2Zsb3dlcicpO1xuICAgICAgICAgICAgICAgIG92ZXJsYWlkID0gb3ZlcmxhaWQgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgICAgICAgICAgYWN0aXZhdGVfZGVhY3RpdmF0ZShkKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFzdGVyaXNrQ2xpY2sob3ZlcmxhaWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXR0YWNoUmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUubmF2JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHBsYWNlX2J1dHRvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignc2Nyb2xsLm5hdicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBwbGFjZV9idXR0b24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3RvdWNobW92ZS5uYXYnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWN0aXZhdGVfZGVhY3RpdmF0ZSAoZCkge1xuICAgICAgICB2YXIgb3ZlcmxheSA9IGQzLnNlbGVjdEFsbChkLmFjdGl2YXRlKTtcbiAgICAgICAgb3ZlcmxheS5jbGFzc2VkKCdvdmVybGFpZCcsIG92ZXJsYWlkKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgb3ZlcmxhaWQpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKGQuYm9keSwgb3ZlcmxhaWQpO1xuICAgICAgICBwbGFjZV9idXR0b24oKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZV9idXR0b24gKCkge1xuXG4gICAgICAgIHZhciB3d2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdmFyIHdoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgdmFyIG1hdGNoaW5nX3NlbDtcbiAgICAgICAgdmFyIGJib3g7XG5cbiAgICAgICAgaWYgKG92ZXJsYWlkKSB7XG4gICAgICAgICAgICBiYm94ID0gdGFyZ2V0X3NlbC5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB2YXIgcF9iYm94ID0gdGFyZ2V0X3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0KCdwJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciB0YXJnZXRfaGVpZ2h0ID0gYmJveC5oZWlnaHQ7XG4gICAgICAgICAgICBtYXRjaGluZ19zZWwgPVxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmxvZ28tdGV4dC1jb21wb25lbnQtLXJpc2QnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGFyZ2V0X3NlbC5zdHlsZSgnbGVmdCcsICh3d2lkdGggK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwX2Jib3gud2lkdGggLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYm94LndpZHRoIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCttYXRjaGluZ19zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpO1xuICAgICAgICAgICAgdGFyZ2V0X3NlbC5zdHlsZSgnYm90dG9tJywgKHdoZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJib3guaGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoK21hdGNoaW5nX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndG9wJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJ3AnKVswXSkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF0Y2hpbmdfc2VsID1cbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5sb2dvLXRleHQtY29tcG9uZW50LS0yMDE0Jyk7XG4gICAgICAgICAgICB0YXJnZXRfc2VsXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgbWF0Y2hpbmdfc2VsLnN0eWxlKCdyaWdodCcpKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnYm90dG9tJywgbWF0Y2hpbmdfc2VsLnN0eWxlKCdib3R0b20nKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBib3R0b20gKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRpcnR5ID0gZmFsc2UsXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5JyksXG4gICAgICAgIGJvZHlfaGVpZ2h0O1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdib3R0b20nKTtcblxuICAgIHNlbGYuZGlydHkgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkaXJ0eTtcbiAgICAgICAgZGlydHkgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hdHRhY2hXaW5kb3dFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgICAgICAub24oJ3Njcm9sbC5ib3R0b20nLCBjaGVja19kaXNwYXRjaClcbiAgICAgICAgICAgIC5vbigndG91Y2htb3ZlLmJvdHRvbScsIGNoZWNrX2Rpc3BhdGNoKTtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgY29udGFpbmVyX25vZGUgPSBjb250YWluZXJfc2VsLm5vZGUoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNoZWNrX2Rpc3BhdGNoICgpIHtcbiAgICAgICAgaWYgKCFjb250YWluZXJfbm9kZSkgdGhyb3cgXCJSZXF1aXJlcyBjb250YWluZXIuXCI7XG4gICAgICAgIGlmIChkaXJ0eSkgcmV0dXJuO1xuXG4gICAgICAgIGJvZHlfaGVpZ2h0ID0gcGFyc2VJbnQoYm9keV9zZWwuc3R5bGUoJ2hlaWdodCcpKTtcbiAgICAgICAgaWYgKGJvZHlfaGVpZ2h0IDw9XG4gICAgICAgICAgICAod2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnNjcm9sbFkpKSB7XG5cbiAgICAgICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYm90dG9tKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBEYXRhICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICByZXF1ZXN0ZWQgPSBbXSxcbiAgICAgICAgYXZhaWxhYmxlLFxuICAgICAgICBzMyA9ICdodHRwczovL3Jpc2RncmFkc2hvdzIwMTQuczMuYW1hem9uYXdzLmNvbS8nO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdkYXRhJywnZW5kT2ZEYXRhJyk7XG5cbiAgICBzZWxmLmZldGNoX2RhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICBkMy5qc29uKHMzICsgJ2RhdGEvbWV0YWRhdGEuanNvbicsIHByb2Nlc3NfbWV0YWRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvY2Vzc19yZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc19tZXRhZGF0YSAocmF3X21ldGEpIHtcbiAgICAgICAgYXZhaWxhYmxlID0gcmF3X21ldGEucGFnZXM7XG4gICAgICAgIHByb2Nlc3NfcmVxdWVzdCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByb2Nlc3NfcmVxdWVzdCAoKSB7XG4gICAgICAgIHZhciBuZXh0X3RvX2xvYWQgPSBjaG9vc2VfYW5kX3JlbW92ZV9mcm9tX2F2YWlsYWJsZSgpO1xuICAgICAgICBpZiAobmV4dF90b19sb2FkKSB7XG4gICAgICAgICAgICBkMy5qc29uKG5leHRfdG9fbG9hZCwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmRhdGEoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZW5kT2ZEYXRhKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaG9vc2VfYW5kX3JlbW92ZV9mcm9tX2F2YWlsYWJsZSAoKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZDtcbiAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5yYW5kb20oKSAqIGF2YWlsYWJsZS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkID0gYXZhaWxhYmxlLnNwbGljZShpbmRleCwgMSlbMF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZml4ZWQgKCkge1xuICAgIC8vIHdoZW4gY29udGFpbmVyIGhpdHMgdGhlIHRvcCwgc3dpdGNoIHRoYXQgZWxlbWVudCB0byBmaXhlZFxuICAgIC8vIHBsdXMgdGhlIGFkZGl0aW9uYWwgcGFkZGluZ1xuXG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgbm90X2ZpeGVkX3NlbCxcbiAgICAgICAgZml4ZWRfc2VsLFxuICAgICAgICBwYWRfb25fZml4ZWRfc2VsLFxuICAgICAgICBvcmlnaW5hbF9wYWRfb25fZml4ZWRfcGFkZGluZ190b3AgPSAnMXB4JyxcbiAgICAgICAgcGFkZGVkX3BhZF9vbl9maXhlZF9wYWRkaW5nX3RvcCxcbiAgICAgICAgbm90X2ZpeGVkX2Rpc3RhbmNlID0gMCxcbiAgICAgICAgZml4ZWRfY2xhc3MgPSAnZml4ZWQnO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhY3RpdmF0b3JWaXNpYmxlJyk7XG5cbiAgICBzZWxmLm5vdEZpeGVkID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbm90X2ZpeGVkX3NlbDtcbiAgICAgICAgbm90X2ZpeGVkX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmZpeGVkID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZml4ZWRfc2VsO1xuICAgICAgICBmaXhlZF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5wYWRPbkZpeGVkID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcGFkX29uX2ZpeGVkX3NlbDtcbiAgICAgICAgcGFkX29uX2ZpeGVkX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnRvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5vdF9maXhlZF9kaXN0YW5jZTtcbiAgICB9O1xuXG4gICAgc2VsZi5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxjX2NvbnRyYWludHMoKTtcblxuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdzY3JvbGwuZml4ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJlX2ZpeGVkKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCd0b3VjaG1vdmUuZml4ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJlX2ZpeGVkKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUuZml4ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2FsY19jb250cmFpbnRzKCk7XG4gICAgICAgICAgICAgICAgY29uZmlndXJlX2ZpeGVkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY29uZmlndXJlX2ZpeGVkICgpIHtcbiAgICAgICAgdmFyIGZpeGVkX3kgPSAwO1xuXG4gICAgICAgIGlmICgobm90X2ZpeGVkX2Rpc3RhbmNlIC0gcGFnZVlPZmZzZXQpIDwgMCkge1xuICAgICAgICAgICAgZml4ZWRfeSA9IHBhZ2VZT2Zmc2V0IC0gbm90X2ZpeGVkX2Rpc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpeGVkID0gKGZpeGVkX3kgPT09IDApID8gZmFsc2UgOiB0cnVlO1xuXG4gICAgICAgIHNlbGYuZGlzcGF0Y2hcbiAgICAgICAgICAgIC5hY3RpdmF0b3JWaXNpYmxlKGZpeGVkKTtcblxuICAgICAgICBmaXhlZF9zZWwuY2xhc3NlZChmaXhlZF9jbGFzcywgZml4ZWQpO1xuXG4gICAgICAgIHBhZF9vbl9maXhlZF9zZWxcbiAgICAgICAgICAgIC5zdHlsZSgncGFkZGluZy10b3AnLFxuICAgICAgICAgICAgICAgICAgICBmaXhlZCA/XG4gICAgICAgICAgICAgICAgICAgIHBhZGRlZF9wYWRfb25fZml4ZWRfcGFkZGluZ190b3AgOlxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbF9wYWRfb25fZml4ZWRfcGFkZGluZ190b3ApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGNfY29udHJhaW50cyAoKSB7XG4gICAgICAgIHZhciBub3RfZml4ZWRfbWFyZ2luID1cbiAgICAgICAgICAgICAgICArbm90X2ZpeGVkX3NlbFxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ21hcmdpbi10b3AnKVxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJ3AnKVswXTtcbiAgICAgICAgdmFyIG5vdF9maXhlZF9oZWlnaHQgPVxuICAgICAgICAgICAgICAgIG5vdF9maXhlZF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAgICAgLmhlaWdodDtcblxuICAgICAgICBub3RfZml4ZWRfZGlzdGFuY2UgPSBub3RfZml4ZWRfbWFyZ2luICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90X2ZpeGVkX2hlaWdodDtcblxuICAgICAgICB2YXIgZml4ZWRfYmJveF9oZWlnaHQgPSBmaXhlZF9zZWxcbiAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgLmhlaWdodDtcblxuICAgICAgICBwYWRkZWRfcGFkX29uX2ZpeGVkX3BhZGRpbmdfdG9wID0gZml4ZWRfYmJveF9oZWlnaHQgKyAncHgnO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgYm90dG9tID0gcmVxdWlyZSgnLi9ib3R0b20nKSgpO1xudmFyIGJlaGFuY2UgPSByZXF1aXJlKCcuL2RhdGEnKSgpO1xudmFyIGRlcGFydG1lbnRzID0gcmVxdWlyZSgnLi4vZGVwYXJ0bWVudHMnKSgpO1xudmFyIHRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtJykoKTtcbnZhciBsaWdodGJveCA9IHJlcXVpcmUoJy4vbGlnaHRib3gnKSgpO1xudmFyIHNjcm9sbHRvID0gcmVxdWlyZSgnLi9zY3JvbGx0bycpKHsgZHVyYXRpb246IDEwMDAgfSk7XG52YXIgZml4ZWQgPSByZXF1aXJlKCcuL2ZpeGVkJykoKTtcbnZhciBsYXlvdXRfaW1hZ2UgPSByZXF1aXJlKCcuL2xheW91dF9pbWFnZScpKCk7XG52YXIgbGF5b3V0X2ZpeGVkID0gcmVxdWlyZSgnLi9sYXlvdXRfZml4ZWQnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbnRhaW5lcl9zZWwsXG4gICAgICAgIGluZmluaXRlX3Njcm9sbF9ib29sID0gZmFsc2UsXG4gICAgICAgIGRhdGEgPSBbXSxcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsLFxuICAgICAgICBkZXBhcnRtZW50X2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIHdvcmtfc2VsLFxuICAgICAgICBpc28sXG4gICAgICAgIGxheW91dCA9ICdpbWFnZScsXG4gICAgICAgIGxheW91dHMgPSB7XG4gICAgICAgICAgICBpbWFnZToge1xuICAgICAgICAgICAgICAgIHJlbmRlcjogcmVuZGVyX2ltYWdlLFxuICAgICAgICAgICAgICAgIHJlc2l6ZTogcmVzaXplX2ltYWdlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZml4ZWQ6IHtcbiAgICAgICAgICAgICAgICByZW5kZXI6IHJlbmRlcl9maXhlZCxcbiAgICAgICAgICAgICAgICByZXNpemU6IHJlc2l6ZV9maXhlZFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnRyb19zZWwsXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5Jyk7XG5cbiAgICBiZWhhbmNlLmRpc3BhdGNoXG4gICAgICAgIC5vbignZGF0YScsIGZ1bmN0aW9uIChyZXF1ZXN0ZWQpIHtcbiAgICAgICAgICAgIGJvdHRvbS5kaXJ0eShmYWxzZSk7XG5cbiAgICAgICAgICAgIGlmICghcmVxdWVzdGVkKSB0aHJvdyAnV29yay4gR290IG5vIGRhdGEuJztcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1lZCA9IHRyYW5zZm9ybShyZXF1ZXN0ZWQub2JqZWN0cyk7XG5cbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmNvbmNhdCh0cmFuc2Zvcm1lZCk7XG4gICAgICAgICAgICByZW5kZXIoKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBmaWx0ZXJhYmxlIGxpc3RcbiAgICAgICAgICAgIGRlcGFydG1lbnRzLmlzRmlsdGVyYWJsZSh0cmFuc2Zvcm1lZCk7XG5cbiAgICAgICAgICAgIC8vIGdvb2dsZSBhbmFseXRpY3MgdHJhY2tpbmdcbiAgICAgICAgICAgIGlmIChfZ2FxKSB7XG4gICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1dvcmtCb3R0b20nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1JlYWNoZWQgYm90dG9tIC0gTG9hZGluZyBtb3JlIGRhdGEnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ1dvcmsnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlbmRPZkRhdGEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBib3R0b20uZGlzcGF0Y2gub24oJ2JvdHRvbS53b3JrJywgbnVsbCk7XG4gICAgICAgIH0pO1xuXG4gICAgZml4ZWQuZGlzcGF0Y2hcbiAgICAgICAgLm9uKCdhY3RpdmF0b3JWaXNpYmxlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIGRlcGFydG1lbnRzLmFjdGl2YXRvclZpc2libGUoZCk7XG4gICAgICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCdpbi13b3JrJywgZCk7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZmlsdGVycyA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRlcGFydG1lbnRfY29udGFpbmVyX3NlbDtcbiAgICAgICAgZGVwYXJ0bWVudF9jb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuaW50cm8gPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBpbnRyb19zZWw7XG4gICAgICAgIGludHJvX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmxheW91dCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxheW91dDtcbiAgICAgICAgbGF5b3V0ID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYubGlnaHRib3hDb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsaWdodGJveC5jb250YWluZXIoKTtcbiAgICAgICAgbGlnaHRib3guY29udGFpbmVyKF8pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5pbmZpbml0ZVNjcm9sbCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGluZmluaXRlX3Njcm9sbF9ib29sO1xuICAgICAgICBpbmZpbml0ZV9zY3JvbGxfYm9vbCA9IF87XG5cbiAgICAgICAgaWYgKGluZmluaXRlX3Njcm9sbF9ib29sID09PSB0cnVlKSB7XG4gICAgICAgICAgICBib3R0b21cbiAgICAgICAgICAgICAgICAuY29udGFpbmVyKGNvbnRhaW5lcl9zZWwpO1xuXG4gICAgICAgICAgICBib3R0b20uZGlzcGF0Y2hcbiAgICAgICAgICAgICAgICAub24oJ2JvdHRvbS53b3JrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBib3R0b20uZGlydHkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJlaGFuY2UuZmV0Y2hfZGF0YSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIHNldF9pbnRyb19oZWlnaHQoKTtcblxuICAgICAgICBpZiAoIWNvbnRhaW5lcl9zZWwpIHRocm93IFwiV29yayByZXF1aXJlcyBhIGNvbnRhaW5lclwiO1xuICAgICAgICBjb250YWluZXJfc2VsLmNhbGwoYWRkX3N0cnVjdHVyZSk7XG4gICAgICAgIGxheW91dF9maXhlZC5jb250YWluZXIod29ya19jb250YWluZXJfc2VsKTtcbiAgICAgICAgbGF5b3V0X2ltYWdlLmNvbnRhaW5lcih3b3JrX2NvbnRhaW5lcl9zZWwpO1xuXG4gICAgICAgIGlmIChpbmZpbml0ZV9zY3JvbGxfYm9vbCkgYm90dG9tLmF0dGFjaFdpbmRvd0V2ZW50cygpO1xuXG4gICAgICAgIC8vIHdpbGwgYmUgdGhlIHRoaW5nIHRvIGNhbGwgcmVuZGVyXG4gICAgICAgIGJlaGFuY2UuZmV0Y2hfZGF0YSgpO1xuXG4gICAgICAgIC8vIGZpbHRlcmluZ1xuICAgICAgICBkZXBhcnRtZW50cy5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdjbGljay53b3JrJywgZnVuY3Rpb24gKGRlcGFydG1lbnQpIHtcblxuICAgICAgICAgICAgc2Nyb2xsdG8oZml4ZWQudG9wKCkgKyAxMCk7XG5cbiAgICAgICAgICAgIGlmIChkZXBhcnRtZW50ID09PSAnYWxsJykgZGVwYXJ0bWVudCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoaXNvKSB7XG4gICAgICAgICAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQzLnNlbGVjdChpdGVtRWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZChkZXBhcnRtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmaXhlZC5pbml0aWFsaXplKCk7XG5cbiAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgIC5vbigncmVzaXplLndvcmsnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVzaXplKCk7XG4gICAgICAgICAgICAgICAgc2V0X2ludHJvX2hlaWdodCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlciAoKSB7XG4gICAgICAgIGxheW91dHNbbGF5b3V0XS5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNpemUgKCkge1xuICAgICAgICBsYXlvdXRzW2xheW91dF0ucmVzaXplKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2ZpeGVkICgpIHtcbiAgICAgICAgd29ya19zZWwgPSB3b3JrX2NvbnRhaW5lcl9zZWwuc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgICAgICAgdmFyIHdvcmtfc2VsX2VudGVyID0gd29ya19zZWxcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKTtcblxuICAgICAgICBsYXlvdXRfZml4ZWRcbiAgICAgICAgICAgIC5hdHRyaWJ1dGVzKHdvcmtfc2VsX2VudGVyKTtcbiAgICAgICAgdmFyIG1hc29ucnkgPSBsYXlvdXRfZml4ZWQubWFzb25yeSgpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV9oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdmaXhlZC1waWVjZSBwaWVjZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQucmlzZF9wcm9ncmFtX2NsYXNzICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcgb3JpZW50YXRpb24tJyArIGQub3JpZW50YXRpb247XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2Utd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGQubWFzb25yeV9oZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQubWV0YV9zcGFjZSkgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS1pbWctd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfd2lkdGg7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZC5tYXNvbnJ5X2hlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5tZXRhX3NwYWNlKSArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2FsbChhZGRfaW1hZ2UpO1xuICAgICAgICBcbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLW1ldGEtd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLmNhbGwoYWRkX21ldGEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA1MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgd29ya19zZWwub24oJ2NsaWNrLndvcmsnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwobGlnaHRib3guc2hvdyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaXNvKSB7XG4gICAgICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWwubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiBtYXNvbnJ5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdvcmtfc2VsX2VudGVyLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlzby5hcHBlbmRlZCh0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXNvLmxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2ltYWdlICgpICB7XG4gICAgICAgIHdvcmtfc2VsID0gd29ya19jb250YWluZXJfc2VsLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpO1xuXG4gICAgICAgIHZhciB3b3JrX3NlbF9lbnRlciA9IHdvcmtfc2VsXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2ltYWdlLXBpZWNlIHBpZWNlICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5yaXNkX3Byb2dyYW1fY2xhc3M7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbGF5b3V0X2ltYWdlXG4gICAgICAgICAgICAuYXR0cmlidXRlcyh3b3JrX3NlbF9lbnRlcik7XG4gICAgICAgIHZhciBtYXNvbnJ5ID0gbGF5b3V0X2ltYWdlLm1hc29ucnkoKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV93aWR0aCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS13cmFwcGVyJylcbiAgICAgICAgICAgICAgICAuY2FsbChhZGRfaW1hZ2UpO1xuICAgICAgICBcbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLW1ldGEtd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLmNhbGwoYWRkX21ldGEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA1MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgd29ya19zZWwub24oJ2NsaWNrLndvcmsnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwobGlnaHRib3guc2hvdyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaXNvKSB7XG4gICAgICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWwubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiBtYXNvbnJ5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlzby51bmJpbmRSZXNpemUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdvcmtfc2VsX2VudGVyLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlzby5hcHBlbmRlZCh0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXNvLmxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzaXplX2ltYWdlICgpIHtcblxuICAgICAgICBsYXlvdXRfaW1hZ2VcbiAgICAgICAgICAgIC5hdHRyaWJ1dGVzKHdvcmtfc2VsKTtcbiAgICAgICAgdmFyIG1hc29ucnkgPSBsYXlvdXRfaW1hZ2UubWFzb25yeSgpO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV9oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpc28pIHtcbiAgICAgICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbC5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IG1hc29ucnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNvLm9wdGlvbnMubWFzb25yeSA9IG1hc29ucnk7XG4gICAgICAgICAgICBpc28ubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNpemVfZml4ZWQgKCkge1xuXG4gICAgICAgIGxheW91dF9maXhlZFxuICAgICAgICAgICAgLmF0dHJpYnV0ZXMod29ya19zZWwpO1xuICAgICAgICB2YXIgbWFzb25yeSA9IGxheW91dF9maXhlZC5tYXNvbnJ5KCk7XG5cbiAgICAgICAgd29ya19zZWxcbiAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X2hlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbFxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnBpZWNlLXdyYXBwZXInKVxuICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZC5tYXNvbnJ5X2hlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICBkLm1ldGFfc3BhY2UpICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucGllY2UtaW1nLXdyYXBwZXInKVxuICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV93aWR0aDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChkLm1hc29ucnlfaGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgIGQubWV0YV9zcGFjZSkgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpc28pIHtcbiAgICAgICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbC5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IG1hc29ucnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXNvLnVuYmluZFJlc2l6ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNvLm9wdGlvbnMubWFzb25yeSA9IG1hc29ucnk7XG4gICAgICAgICAgICBpc28ubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfc3RydWN0dXJlIChzZWwpICB7XG4gICAgICAgIHZhciBkZXB0X2NvbnRhaW5lcl9zZWwgPSBkZXBhcnRtZW50X2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2FydGljbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RlcGFydG1lbnRzIGdyaWQgei0xNScpO1xuXG4gICAgICAgIHdvcmtfY29udGFpbmVyX3NlbCA9IHNlbC5hcHBlbmQoJ2FydGljbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3dvcmsgZ3JpZCB6LTEwICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnd29yay1sYXlvdXQtJyArIGxheW91dCk7XG5cbiAgICAgICAgZGVwYXJ0bWVudHNcbiAgICAgICAgICAgIC5jb250YWluZXIoZGVwdF9jb250YWluZXJfc2VsKVxuICAgICAgICAgICAgLm1vYmlsZShkMy5zZWxlY3QoJy5uYXYtbW9iaWxlJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgZml4ZWRcbiAgICAgICAgICAgIC5ub3RGaXhlZChpbnRyb19zZWwpXG4gICAgICAgICAgICAuZml4ZWQoZGVwYXJ0bWVudF9jb250YWluZXJfc2VsKVxuICAgICAgICAgICAgLnBhZE9uRml4ZWQoc2VsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfbWV0YSAoc2VsKSB7XG4gICAgICAgIHNlbC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N0dWRlbnQtbmFtZSBwaWVjZS1tZXRhJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3R1ZGVudF9uYW1lO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmlzZC1wcm9ncmFtIHBpZWNlLW1ldGEnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5yaXNkX3Byb2dyYW07XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfaW1hZ2UgKHNlbCkge1xuICAgICAgICBzZWwuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIuc3JjO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0X2ludHJvX2hlaWdodCAoKSB7XG4gICAgICAgIHZhciBoZWlnaHQgPVxuICAgICAgICAgICAgaW50cm9fc2VsXG4gICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgK1xuICAgICAgICAgICAgcGFyc2VJbnQoaW50cm9fc2VsLnN0eWxlKCdtYXJnaW4tdG9wJyksIDEwKSArXG4gICAgICAgICAgICBwYXJzZUludChpbnRyb19zZWwuc3R5bGUoJ21hcmdpbi1ib3R0b20nKSwgMTApO1xuXG4gICAgICAgIGlmIChoZWlnaHQgPCB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgICAgIHZhciBkaWZmZXJlbmNlID0gd2luZG93LmlubmVySGVpZ2h0IC0gaGVpZ2h0O1xuICAgICAgICAgICAgaW50cm9fc2VsLnN0eWxlKCdwYWRkaW5nLWJvdHRvbScsIGRpZmZlcmVuY2UgKyAncHgnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxheW91dF9maXhlZCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgY29udGFpbmVyX3NlbDtcbiAgICB2YXIgY291bnRlciA9IHtcbiAgICAgICAgdGFsbDogMCxcbiAgICAgICAgd2lkZTogMFxuICAgIH07XG4gICAgdmFyIGZyZXF1ZW5jeSA9IHtcbiAgICAgICAgbGFyZ2U6IDE1LFxuICAgICAgICB0YWxsOiA4LFxuICAgICAgICB3aWRlOiA2XG4gICAgfTtcbiAgICB2YXIgbWV0YV9zcGFjZSA9IDUwO1xuICAgIHZhciBtYXNvbnJ5ID0ge1xuICAgICAgICBndXR0ZXI6IDAsXG4gICAgICAgIGNvbHVtbldpZHRoOiAwLFxuICAgICAgICBjb2x1bW5XaWR0aERvdWJsZTogMFxuICAgIH07XG5cbiAgICBzZWxmLm1hc29ucnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtYXNvbnJ5O1xuICAgIH07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hdHRyaWJ1dGVzID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgbWFzb25yeSA9IG1hc29ucnlfc2V0dGluZ3MoKTtcblxuICAgICAgICBzZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZC5tZXRhX3NwYWNlID0gbWV0YV9zcGFjZTtcbiAgICAgICAgICAgIHZhciBtdWx0aXBsaWVyID0gMTtcblxuICAgICAgICAgICAgaWYgKGkgJSBmcmVxdWVuY3kubGFyZ2UgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIC8vIGxhcmdlXG4gICAgICAgICAgICAgICAgbXVsdGlwbGllciA9IDI7XG5cbiAgICAgICAgICAgICAgICBpZiAoKGQuY292ZXIub3JpZ2luYWxfd2lkdGgvXG4gICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX2hlaWdodCkgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGQub3JpZW50YXRpb24gPSAnbGFuZHNjYXBlJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkLm9yaWVudGF0aW9uID0gJ3BvcnRyYWl0JztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPVxuICAgICAgICAgICAgICAgICAgICAobWFzb25yeS5jb2x1bW5XaWR0aCAqXG4gICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyKSArXG4gICAgICAgICAgICAgICAgICAgICgobXVsdGlwbGllciA9PT0gMSkgP1xuICAgICAgICAgICAgICAgICAgICAgIDAgOiBtYXNvbnJ5Lmd1dHRlcik7XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfaGVpZ2h0ID0gZC5tYXNvbnJ5X3dpZHRoO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChkLmNvdmVyLm9yaWdpbmFsX3dpZHRoL1xuICAgICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF9oZWlnaHQpID4gMSkge1xuXG4gICAgICAgICAgICAgICAgLy8gbGFuZHNjYXBlXG4gICAgICAgICAgICAgICAgY291bnRlci53aWRlICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIud2lkZSAlIGZyZXF1ZW5jeS53aWRlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgPSAyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV93aWR0aCA9XG4gICAgICAgICAgICAgICAgICAgIChtYXNvbnJ5LmNvbHVtbldpZHRoICpcbiAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIpICtcbiAgICAgICAgICAgICAgICAgICAgKChtdWx0aXBsaWVyID09PSAxKSA/XG4gICAgICAgICAgICAgICAgICAgICAgMCA6IG1hc29ucnkuZ3V0dGVyKTtcblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV9oZWlnaHQgPSBkLm1hc29ucnlfd2lkdGg7XG4gICAgICAgICAgICAgICAgZC5vcmllbnRhdGlvbiA9ICdsYW5kc2NhcGUnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBwb3J0cmFpdFxuICAgICAgICAgICAgICAgIGNvdW50ZXIudGFsbCArPSAxO1xuICAgICAgICAgICAgICAgIGlmIChjb3VudGVyLnRhbGwgJSBmcmVxdWVuY3kudGFsbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyID0gMjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfaGVpZ2h0ID1cbiAgICAgICAgICAgICAgICAgICAgKG1hc29ucnkuY29sdW1uV2lkdGggKlxuICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGllcikgK1xuICAgICAgICAgICAgICAgICAgICAoKG11bHRpcGxpZXIgPT09IDEpID9cbiAgICAgICAgICAgICAgICAgICAgICAwIDogbWFzb25yeS5ndXR0ZXIpO1xuXG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X3dpZHRoID0gbWFzb25yeS5jb2x1bW5XaWR0aDtcbiAgICAgICAgICAgICAgICBkLm9yaWVudGF0aW9uID0gJ3BvcnRyYWl0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1hc29ucnlfc2V0dGluZ3MgKCkge1xuICAgICAgICB2YXIgdG90YWxfd29ya193aWR0aCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLndpZHRoO1xuXG4gICAgICAgIHZhciBudW1iZXJfb2ZfY29sdW1ucyA9IDI7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDc2OCkge1xuICAgICAgICAgICAgbnVtYmVyX29mX2NvbHVtbnMgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGd1dHRlciA9IDA7XG4gICAgICAgIHZhciBjb2x1bW5fd2lkdGggPSAodG90YWxfd29ya193aWR0aCAvIG51bWJlcl9vZl9jb2x1bW5zKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoZ3V0dGVyICogKG51bWJlcl9vZl9jb2x1bW5zIC0gMSkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBndXR0ZXI6IGd1dHRlcixcbiAgICAgICAgICAgIGNvbHVtbldpZHRoOiBjb2x1bW5fd2lkdGgsXG4gICAgICAgICAgICBjb2x1bW5Eb3VibGVXaWR0aDogY29sdW1uX3dpZHRoICogMiArIGd1dHRlclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxheW91dF9pbWFnZSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgY29udGFpbmVyX3NlbDtcbiAgICB2YXIgbWV0YV9zcGFjZSA9IDM1O1xuICAgIHZhciBjb3VudGVyID0gMDtcbiAgICB2YXIgZnJlcXVlbmN5ID0gMTQ7XG4gICAgdmFyIG1hc29ucnkgPSB7XG4gICAgICAgIGd1dHRlcjogMCxcbiAgICAgICAgY29sdW1uV2lkdGg6IDAsXG4gICAgICAgIGNvbHVtbldpZHRoRG91YmxlOiAwXG4gICAgfTtcblxuICAgIHNlbGYubWFzb25yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1hc29ucnk7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBtYXNvbnJ5ID0gbWFzb25yeV9zZXR0aW5ncygpO1xuXG4gICAgICAgIHNlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoKGQuY292ZXIub3JpZ2luYWxfd2lkdGgvXG4gICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfaGVpZ2h0KSA+XG4gICAgICAgICAgICAgICAgMS44KSB7XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPSBtYXNvbnJ5LmNvbHVtbkRvdWJsZVdpZHRoO1xuICAgICAgICAgICAgICAgIGQubWFzb25yeV9oZWlnaHQgPVxuICAgICAgICAgICAgICAgICAgICAoKGQubWFzb25yeV93aWR0aCAqXG4gICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF9oZWlnaHQpL1xuICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF93aWR0aCkgKyBtZXRhX3NwYWNlO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXIgKz0gMTtcblxuICAgICAgICAgICAgICAgIC8vIG1ha2UgZXZlcnkgNXRoIG9uZSBiaWcuXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgJSBmcmVxdWVuY3kgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZC5tYXNvbnJ5X3dpZHRoID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc29ucnkuY29sdW1uRG91YmxlV2lkdGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZC5tYXNvbnJ5X3dpZHRoID0gbWFzb25yeS5jb2x1bW5XaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X2hlaWdodCA9XG4gICAgICAgICAgICAgICAgICAgICgoZC5tYXNvbnJ5X3dpZHRoICpcbiAgICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX2hlaWdodCkvXG4gICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX3dpZHRoKSArXG4gICAgICAgICAgICAgICAgICAgIG1ldGFfc3BhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYXNvbnJ5X3NldHRpbmdzICgpIHtcbiAgICAgICAgdmFyIHRvdGFsX3dvcmtfd2lkdGggPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC53aWR0aDtcblxuICAgICAgICB2YXIgbnVtYmVyX29mX2NvbHVtbnMgPSAyO1xuXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSA3NjgpIHtcbiAgICAgICAgICAgIG51bWJlcl9vZl9jb2x1bW5zID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBndXR0ZXIgPSAwO1xuICAgICAgICB2YXIgY29sdW1uX3dpZHRoID0gKHRvdGFsX3dvcmtfd2lkdGggLyBudW1iZXJfb2ZfY29sdW1ucykgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGd1dHRlciAqIChudW1iZXJfb2ZfY29sdW1ucyAtIDEpKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ3V0dGVyOiBndXR0ZXIsXG4gICAgICAgICAgICBjb2x1bW5XaWR0aDogY29sdW1uX3dpZHRoLFxuICAgICAgICAgICAgY29sdW1uRG91YmxlV2lkdGg6IGNvbHVtbl93aWR0aCAqIDIgKyBndXR0ZXJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaWdodGJveCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29udGFpbmVyX3NlbCxcbiAgICAgICAgc2VsZWN0ZWRfc2VsLFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc2hvdyA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrZWQnKTtcbiAgICAgICAgY29uc29sZS5sb2coc2VsKTtcbiAgICAgICAgaWYgKCFjb250YWluZXJfc2VsKSB0aHJvdyBcIkxpZ2h0Ym94LiBSZXF1aXJlcyBjb250YWluZXIuXCI7XG5cbiAgICAgICAgc2VsZWN0ZWRfc2VsID0gc2VsO1xuXG4gICAgICAgIHZhciBkYXRhID0gc2VsLmRhdHVtKCk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X2dyaWRfc2VsID0gY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X21ldGFfc2VsID1cbiAgICAgICAgICAgIGxpZ2h0Ym94X2dyaWRfc2VsXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YScpO1xuXG4gICAgICAgIHZhciBsaWdodGJveF93b3JrX3NlbCA9XG4gICAgICAgICAgICBsaWdodGJveF9ncmlkX3NlbFxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAnbGlnaHRib3gtd29yayAnK1xuICAgICAgICAgICAgICAgICAgICAgICdvZmZzZXQtcGVyY2VudC0yLTEwICcrXG4gICAgICAgICAgICAgICAgICAgICAgJ2NvbC1wZXJjZW50LTgtMTAnKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX3NlbFxuICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsXG4gICAgICAgICAgICAgICAgICAgKHBhcnNlSW50KGxpZ2h0Ym94X3dvcmtfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbWFyZ2luLWxlZnQnKSkgLSAyMCkgKyAncHgnKTtcblxuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUubGlnaHRib3gnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGlnaHRib3hfbWV0YV9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAocGFyc2VJbnQobGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ21hcmdpbi1sZWZ0JykpIC0gMjApICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2gyJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC10aXRsZScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnByb2plY3RfbmFtZSk7XG5cbiAgICAgICAgaWYgKGRhdGEucHJvamVjdF9uYW1lICE9IGRhdGEuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LWRlc2NyaXB0aW9uJylcbiAgICAgICAgICAgICAgICAudGV4dChkYXRhLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEubW9kdWxlcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlJylcbiAgICAgICAgICAgIC5lYWNoKGFkZF9tb2R1bGVzKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfbWV0YV9pbmZvX3NlbCA9IGxpZ2h0Ym94X21ldGFfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mbycpO1xuXG4gICAgICAgIGxpZ2h0Ym94X21ldGFfaW5mb19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mby0tc3R1ZGVudC1uYW1lJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEuc3R1ZGVudF9uYW1lKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXJpc2QtcHJvZ3JhbScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnJpc2RfcHJvZ3JhbSk7XG5cbiAgICAgICAgaWYgKGRhdGEucGVyc29uYWxfbGluay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mby0tcGVyc29uYWwtbGluaycpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnYScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCBkYXRhLnBlcnNvbmFsX2xpbmspXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RhcmdldCcsICdfYmxhbmsnKVxuICAgICAgICAgICAgICAgIC50ZXh0KCdQZXJzb25hbCBXZWJzaXRlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXBlcnNvbmFsLWxpbmsnKVxuICAgICAgICAgICAgLmFwcGVuZCgnYScpXG4gICAgICAgICAgICAuYXR0cignaHJlZicsIGRhdGEudXJsKVxuICAgICAgICAgICAgLmF0dHIoJ3RhcmdldCcsICdfYmxhbmsnKVxuICAgICAgICAgICAgLnRleHQoJ0JlaGFuY2UgUG9ydGZvbGlvJyk7XG5cbiAgICAgICAgY29udGFpbmVyX3NlbC5jbGFzc2VkKCdhY3RpdmUnLCB0cnVlKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgdHJ1ZSk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ2luLWxpZ2h0Ym94JywgdHJ1ZSk7XG5cbiAgICAgICAgY29udGFpbmVyX3NlbC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2xvc2UgKCkge1xuICAgICAgICBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAuY2xhc3NlZCgnYWN0aXZlJywgZmFsc2UpXG4gICAgICAgICAgICAuaHRtbCgnJyk7XG5cbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgZmFsc2UpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCdpbi1saWdodGJveCcsIGZhbHNlKTtcblxuICAgICAgICBjb250YWluZXJfc2VsLm9uKCdjbGljaycsIG51bGwpO1xuICAgICAgICBcbiAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgIC5vbigncmVzaXplLmxpZ2h0Ym94JywgbnVsbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX21vZHVsZXMgKGQsIGkpIHtcbiAgICAgICAgdmFyIHNlbCA9IGQzLnNlbGVjdCh0aGlzKTtcblxuICAgICAgICBpZiAoZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICBzZWwuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLFxuICAgICAgICAgICAgICAgICAgICBkLnNpemVzLm1heF8xMjQwID8gZC5zaXplcy5tYXhfMTI0MCA6IGQuc3JjKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZC50eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgICAgIHNlbC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS1tb2R1bGUtdGV4dCcpXG4gICAgICAgICAgICAgICAgLnRleHQoZC50ZXh0X3BsYWluKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZC50eXBlID09PSAnZW1iZWQnKSB7XG4gICAgICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS1tb2R1bGUtZW1iZWQnKVxuICAgICAgICAgICAgICAgIC5odG1sKGQuZW1iZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2Nyb2xsdG8gKGFyZ3MpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3MgfHwge307XG4gICAgb3B0aW9ucy5kdXJhdGlvbiA9IGFyZ3MuZHVyYXRpb24gfHwgMjAwMDtcblxuICAgIGZ1bmN0aW9uIHNjcm9sbF90d2VlbiAob2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IGQzLmludGVycG9sYXRlTnVtYmVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnBhZ2VZT2Zmc2V0IHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUbygwLCBpKHQpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24ob3B0aW9ucy5kdXJhdGlvbilcbiAgICAgICAgICAgIC50d2Vlbignc2Nyb2xsJywgc2Nyb2xsX3R3ZWVuKG9mZnNldCkpO1xuICAgIH07XG59OyIsIi8vIHJlcXVpcmVzIGQzLnNjYWxlLm9yZGluYWxcbm1vZHVsZS5leHBvcnRzID0gdHJhbnNmb3JtO1xuXG5mdW5jdGlvbiB0cmFuc2Zvcm0gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgdmFyIGZvcm1hdHRlZCA9IGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyhpbnB1dCk7XG4gICAgICAgIHJldHVybiBzaHVmZmxlKGZvcm1hdHRlZCk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0X2RhdGFfY292ZXJfd2l0aF9tb2R1bGVzIChkYXRhKSB7XG5cbiAgICB2YXIgZm9ybWF0dGVkX2RhdGEgPSBbXTtcblxuICAgIC8vIGRldGVybWluZSB0aGUgZXh0ZW50IG9mIHdpZHRoc1xuICAgIHZhciBhbGxfbW9kdWxlcyA9IFtdO1xuICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgYWxsX21vZHVsZXMucHVzaChtZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgIHZhciBtb2R1bGVzX2Zvcl9jb3ZlciA9IFtdO1xuICAgICAgICB2YXIgbW9kdWxlc190b19pbmNsdWRlID0gW107XG4gICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVzX2Zvcl9jb3Zlci5wdXNoKG1kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRoZXNlIGFyZSBhbGwgY2FzZXMgdGhhdCBhcmVcbiAgICAgICAgICAgIC8vIGNvdmVyZWQgaW4gbGlnaHRib3guanNcbiAgICAgICAgICAgIGlmICgobWQudHlwZSA9PT0gJ2ltYWdlJykgfFxuICAgICAgICAgICAgICAgIChtZC50eXBlID09PSAndGV4dCcpIHxcbiAgICAgICAgICAgICAgICAobWQudHlwZSA9PT0gJ2VtYmVkJykpIHtcblxuICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5wdXNoKG1kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJhbmRvbV9jb3ZlcjtcbiAgICAgICAgaWYgKG1vZHVsZXNfZm9yX2NvdmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIHJhbmRvbV9jb3Zlcl9vcHRpb25cbiAgICAgICAgICAgIC8vIGJhc2VkIG9uIGltYWdlcyB0byBpbmNsdWRlXG4gICAgICAgICAgICB2YXIgcmFuZG9tX21vZHVsZSA9XG4gICAgICAgICAgICAgICAgbW9kdWxlc19mb3JfY292ZXJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlc19mb3JfY292ZXIubGVuZ3RoKV07XG5cbiAgICAgICAgICAgIHJhbmRvbV9jb3ZlciA9IHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF93aWR0aDogK3JhbmRvbV9tb2R1bGUud2lkdGgsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxfaGVpZ2h0OiArcmFuZG9tX21vZHVsZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgc3JjOiByYW5kb21fbW9kdWxlLnNyY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJhbmRvbV9jb3Zlci5oZWlnaHQgPSAocmFuZG9tX2NvdmVyLndpZHRoKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21fbW9kdWxlLmhlaWdodCkvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZS53aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSwganVzdCB1c2UgYSB0aGUgY292ZXIgdGhhdFxuICAgICAgICAgICAgLy8gaXMgaW5jbHVkZWRcbiAgICAgICAgICAgIHJhbmRvbV9jb3ZlciA9IHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF93aWR0aDogNDA0LFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsX2hlaWdodDogMzE2LFxuICAgICAgICAgICAgICAgIHNyYzogZC5kZXRhaWxzLmNvdmVyc1snNDA0J11cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0dGVkX2RhdGEucHVzaCh7XG4gICAgICAgICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAgICAgICAgICdyaXNkX3Byb2dyYW1fY2xhc3MnOlxuICAgICAgICAgICAgICAgIGVzY2FwZV9kZXBhcnRtZW50KGQucmlzZF9wcm9ncmFtKSxcbiAgICAgICAgICAgICdtb2R1bGVzJzogbW9kdWxlc190b19pbmNsdWRlLFxuICAgICAgICAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGQuZGV0YWlscy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIHVybDogZC5vd25lcnNbMF0udXJsLFxuICAgICAgICAgICAgcGVyc29uYWxfbGluazogZC5wZXJzb25hbF9saW5rXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZvcm1hdHRlZF9kYXRhO1xufVxuXG5mdW5jdGlvbiBzaHVmZmxlIChvKSB7XG4gICAgZm9yKHZhciBqLCB4LCBpID0gby5sZW5ndGg7XG4gICAgICAgIGk7XG4gICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSxcbiAgICAgICAgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgICByZXR1cm4gbztcbn1cblxuZnVuY3Rpb24gZXNjYXBlX2RlcGFydG1lbnQoZCkge1xuICAgIHJldHVybiBkLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnICcsICctJyk7XG59Il19
