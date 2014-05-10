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
    console.log(path);
    var is_it_live = false;
    var which_layout = 'image';
    if (path.indexOf('work') > -1) {
        is_it_live = true;
    }
    if (path.indexOf('fixed') > -1) {
        which_layout = 'fixed';
    }
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
                if (wwidth < 768) {
                    first = [bounds.left - 6,
                         (bounds.top + (bounds.height*(0.55)))];
                    second = [bounds.right + 6,
                         (bounds.top + (bounds.height*(0.55)))];
                } else {
                    first = [bounds.right + 6,
                         (bounds.top + (bounds.height*(0.55)))];
                    second = [bounds.left - 6,
                         (bounds.top + (bounds.height*(0.55)))];
                }
                
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
                '1024': utility.scaleProportional
            },
            drawn_delta: {
                '300': {
                    x: -55.79398888349533,
                    y: 1033.0799560546875
                },
                '768': {
                    x: -72.95305413007736,
                    y: 343.3740234375
                },
                '1024': {
                    x: -107.24705696105957,
                    y: 391.428955078125
                }
            },
            paths: {
                '300': 'M0.871,0'+
                  'v16.81'+
                  'c0,0,0,73.155,0,131.916'+
                  'c0,117.428,59.273,204.492,264.763,204.492'+
                  'c208.49,0,211.315-240.987,0-240.987'+
                  'c-48.774,0-99.771,0-99.771,0'+
                  'v389.91'+
                  'c0,0,61.965-1.039,119.994,36.679'+
                  'c59.997,38.998,76.496,134.382,160.492,134.382'+
                  'c95.995,0,93.755-95.734,1.635-107.439'+
                  'c-64.632-8.213-126.448,96.27-162.749,134.057'+
                  'c-41.74,43.447-155.37,103.876-228.725,64.878'+
                  'c-112.632-59.879,2.892-210.494,100.353-97.495'+
                  'C363.853,907.192-54.923,915.788-54.923,921.43'+
                  'c0,18.013,0,111.65,0,111.65',
                '768': 'M-0.754,0'+
                  'h889.719'+
                  'c0,0-9.906,33.908-49.544,47.023'+
                  'c-30.912,10.228-111.956,12.085-178.348,65.982'+
                  'c-83.14,67.493-59.158,170.992-201.836,170.992'+
                  'c-33.138,0-99.88,0.003-99.88,0.003l0-215.105'+
                  'c0,0,14.293-0.134,34.5,0'+
                  'c170.362,1.128,176.608,153.713,54.608,153.713'+
                  'c-153,0-215.593-165.791-332.96-165.791'+
                  'c-174.04,0-193.741,286.557-193.741,286.557'+
                  'h4.529',
                '1024': 'M16.754,0'+
                  'c0,0,1298.779,0,1408.719,0'+
                  'c0,83.872-61.132,129.615-195.592,129.615'+
                  'c-250.519,0-193.831,214.565-423.306,214.565'+
                  'c-53.298,0-160.641,0.005-160.641,0.005'+
                  'l0-286.092'+
                  'c0,0,91.606,0,124.106,0'+
                  'c186.636,0,190.761,203.135,5.214,203.135'+
                  'c-156.958,0-341.366-172.099-572.654-172.099'+
                  'c-213.134,0-304.462,131.885-304.462,302.3'+
                  'c4.284,0,11.368,0,11.368,0'
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
                    x: 786.0529764890671,
                    y: 0.000021755695343017578
                },
                '1024': {
                    x: 1260.5000624656677,
                    y: -0.00003796815872192383
                }
            },
            paths: {
                '300': 'M0-0.138' +
                       'c83.627,0.62,238.755,0,344.14,0',
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
                    x: -75.55600547790527,
                    y: 48.68900680541992
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
                '300': 'M73.606-48.689 ' +
                    'c3.037-0.032,5.74-0.052,8.089-0.052 ' +
                    'c15.33,0,6.783-49.626-35.337-51.258 ' +
                    'c-43-1.667-70.75,24-77.333,56 ' +
                    'C-36.526-17.015-14.641,0-1.95,0',
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

    var measure_for_ff = true;

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
        available;

    var url = window.location.origin +
              window.location.pathname;

    self.dispatch = d3.dispatch('data','endOfData');

    self.fetch_data = function () {
        if (!available) {
            d3.json(url + 'data/metadata.json', process_metadata);
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
            d3.json(url + next_to_load, function (data) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2RlcGFydG1lbnRzLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2xvZ28vaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvbG9nby9zY2FsZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9sb2dvL3N2Zy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L25hdi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2JvdHRvbS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2RhdGEuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29yay9maXhlZC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGF5b3V0X2ZpeGVkLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGF5b3V0X2ltYWdlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGlnaHRib3guanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29yay9zY3JvbGx0by5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL3RyYW5zZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDelpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3Rocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIil9dmFyIGY9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGYuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sZixmLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbnRhaW5lcl9zZWwsXG4gICAgICAgIG1vYmlsZV9jb250YWluZXJfc2VsLFxuICAgICAgICBkZXB0YXJ0bWVudF9zZWwsXG4gICAgICAgIG1vYmlsZV9kZXBhcnRtZW50X3NlbCxcbiAgICAgICAgbW9iaWxlX2FjdGl2YXRvcl9zZWwsXG4gICAgICAgIG1vYmlsZV9ibGFua2V0X3NlbCxcbiAgICAgICAgbW9iaWxlX2FjdGl2ZSA9IGZhbHNlLFxuICAgICAgICBzZWxlY3RlZCA9ICdBbGwnLFxuICAgICAgICBjbHMgPSAnZGVwYXJ0bWVudCcsXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5Jyk7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2NsaWNrJyk7XG5cbiAgICB2YXIgZGVwYXJ0bWVudHMgPSBbXG4gICAgICAgICdBbGwnLFxuICAgICAgICAnQXJjaGl0ZWN0dXJlJyxcbiAgICAgICAgJ0NlcmFtaWNzJyxcbiAgICAgICAgJ0RpZ2l0YWwgKyBNZWRpYScsXG4gICAgICAgICdGdXJuaXR1cmUgRGVzaWduJyxcbiAgICAgICAgJ0dsYXNzJyxcbiAgICAgICAgJ0dyYXBoaWMgRGVzaWduJyxcbiAgICAgICAgJ0luZHVzdHJpYWwgRGVzaWduJyxcbiAgICAgICAgJ0ludGVyaW9yIEFyY2hpdGVjdHVyZScsXG4gICAgICAgICdKZXdlbHJ5ICsgTWV0YWxzbWl0aGluZycsXG4gICAgICAgICdMYW5kc2NhcGUgQXJjaGl0ZWN0dXJlJyxcbiAgICAgICAgJ1BhaW50aW5nJyxcbiAgICAgICAgJ1Bob3RvZ3JhcGh5JyxcbiAgICAgICAgJ1ByaW50bWFraW5nJyxcbiAgICAgICAgJ1NjdWxwdHVyZScsXG4gICAgICAgICdUZXh0aWxlcydcbiAgICBdO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYubW9iaWxlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbW9iaWxlX2NvbnRhaW5lcl9zZWw7XG4gICAgICAgIG1vYmlsZV9jb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYWN0aXZhdG9yVmlzaWJsZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghbW9iaWxlX2FjdGl2YXRvcl9zZWwpIHJldHVybjtcbiAgICAgICAgbW9iaWxlX2FjdGl2YXRvcl9zZWwuY2xhc3NlZCgndmlzaWJsZScsIF8pO1xuICAgIH07XG5cbiAgICBzZWxmLnNlbGVjdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGVwdGFydG1lbnRfc2VsO1xuICAgICAgICBkZXB0YXJ0bWVudF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hc0FycmF5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHRocm93IFwiZGVwYXJ0bWVudHMgaXMgYSBnZXR0ZXJcIjtcbiAgICAgICAgcmV0dXJuIGRlcGFydG1lbnRzO1xuICAgIH07XG5cbiAgICBzZWxmLmlzRmlsdGVyYWJsZSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIGNoZWNrX2ZpbHRlcmFibGUoZGF0YSk7XG4gICAgICAgIHVwZGF0ZV9kZXBhcnRtZW50X3NlbCgpO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghY29udGFpbmVyX3NlbCkgdGhyb3cgXCJyZXF1aXJlcyBhIHdyYXBwZXJcIjtcblxuICAgICAgICB2YXIgZGF0YSA9IGRlcGFydG1lbnRzLm1hcChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIHYgPSB7XG4gICAgICAgICAgICAgICAgbmFtZTogZCxcbiAgICAgICAgICAgICAgICBlc2NhcGVkOiBlc2NhcGVfZGVwYXJ0bWVudChkKSxcbiAgICAgICAgICAgICAgICBmaWx0ZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzZWxlY3RlZDogZmFsc2VcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGlmIChkID09PSBzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHYuc2VsZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHYuZmlsdGVyYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB2O1xuICAgICAgICB9KTtcblxuXG4gICAgICAgIC8vIHNldHVwIHN0cnVjdHVyZVxuICAgICAgICBtb2JpbGVfYWN0aXZhdG9yX3NlbCA9IG1vYmlsZV9jb250YWluZXJfc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGNscyArICctYWN0aXZhdG9yJylcbiAgICAgICAgICAgIC50ZXh0KHNlbGVjdGVkKVxuICAgICAgICAgICAgLm9uKCdjbGljay5uYXZBY3RpdmF0b3InLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbW9iaWxlX2FjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlX25hdigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbW9iaWxlX2JsYW5rZXRfc2VsID0gbW9iaWxlX2NvbnRhaW5lcl9zZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgY2xzICsgJy1ibGFua2V0JylcbiAgICAgICAgICAgIC5vbignY2xpY2submF2QmxhbmtldCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBtb2JpbGVfYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdXBkYXRlX25hdigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsID0gbW9iaWxlX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBjbHMgKyAnLWVsZW1lbnRzIGRlcGFydG1lbnRzJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoY2xzKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtscyA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChkLmZpbHRlcmFibGUpIGtscyArPSAnIGZpbHRlcmFibGUnO1xuICAgICAgICAgICAgICAgIGlmIChkLnNlbGVjdGVkKSBrbHMgKz0gJyBzZWxlY3RlZCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5uYW1lO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2suZGVwYXJ0bWVudHMnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgcmVzcG9uZHMgdG8gZmlsdGVyYWJsZSBpdGVtc1xuICAgICAgICAgICAgICAgIGlmICghZC5maWx0ZXJhYmxlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBkZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZGQsIGRpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZC5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGQuc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jbGljayhkLmVzY2FwZWQpO1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlX2RlcGFydG1lbnRfc2VsKCk7XG5cbiAgICAgICAgICAgICAgICBtb2JpbGVfYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBkLm5hbWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlX25hdigpO1xuXG4gICAgICAgICAgICAgICAgZGVwYXJ0bWVudF9zZWwuZGF0YShtb2JpbGVfZGVwYXJ0bWVudF9zZWwuZGF0YSgpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHRoZSBidXNpbmVzc1xuXG4gICAgICAgIGRlcGFydG1lbnRfc2VsID0gY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgndWwnKVxuICAgICAgICAgICAgLnNlbGVjdEFsbChjbHMpXG4gICAgICAgICAgICAuZGF0YShkYXRhKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2xpJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIga2xzID0gJyc7XG4gICAgICAgICAgICAgICAgaWYgKGQuZmlsdGVyYWJsZSkga2xzICs9ICcgZmlsdGVyYWJsZSc7XG4gICAgICAgICAgICAgICAgaWYgKGQuc2VsZWN0ZWQpIGtscyArPSAnIHNlbGVjdGVkJztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm5hbWU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdjbGljay5kZXBhcnRtZW50cycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgLy8gb25seSByZXNwb25kcyB0byBmaWx0ZXJhYmxlIGl0ZW1zXG4gICAgICAgICAgICAgICAgaWYgKCFkLmZpbHRlcmFibGUpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIGRlcGFydG1lbnRfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkZCwgZGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRkLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgZC5zZWxlY3RlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmNsaWNrKGQuZXNjYXBlZCk7XG5cbiAgICAgICAgICAgICAgICB1cGRhdGVfZGVwYXJ0bWVudF9zZWwoKTtcblxuICAgICAgICAgICAgICAgIG1vYmlsZV9hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZCA9IGQubmFtZTtcbiAgICAgICAgICAgICAgICB1cGRhdGVfbmF2KCk7XG5cbiAgICAgICAgICAgICAgICBtb2JpbGVfZGVwYXJ0bWVudF9zZWwuZGF0YShkZXBhcnRtZW50X3NlbC5kYXRhKCkpO1xuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9uYXYgKCkge1xuICAgICAgICBtb2JpbGVfY29udGFpbmVyX3NlbC5jbGFzc2VkKCdhY3RpdmUnLCBtb2JpbGVfYWN0aXZlKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgbW9iaWxlX2FjdGl2ZSk7XG4gICAgICAgIG1vYmlsZV9hY3RpdmF0b3Jfc2VsLnRleHQoc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9kZXBhcnRtZW50X3NlbCAoKSB7XG4gICAgICAgIGRlcGFydG1lbnRfc2VsXG4gICAgICAgICAgICAuY2xhc3NlZCgnZmlsdGVyYWJsZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuZmlsdGVyYWJsZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2xhc3NlZCgnc2VsZWN0ZWQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnNlbGVjdGVkO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIG1vYmlsZV9kZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgLmNsYXNzZWQoJ2ZpbHRlcmFibGUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmZpbHRlcmFibGU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zZWxlY3RlZDtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrX2ZpbHRlcmFibGUgKGRhdGEpIHtcbiAgICAgICAgLy8gZ2l2ZW4gc29tZSBkYXRhLCBjaGVjayB0byBzZWUgaWZcbiAgICAgICAgLy8gZWFjaCBjYXRlZ29yeSBpcyBmaWx0ZXJhYmxlXG4gICAgICAgIFxuICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGRlcGFydG1lbnRfc2VsXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGRkLCBkaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5yaXNkX3Byb2dyYW0gPT09IGRkLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRkLmZpbHRlcmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBtb2JpbGVfZGVwYXJ0bWVudF9zZWxcbiAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZGQsIGRpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLnJpc2RfcHJvZ3JhbSA9PT0gZGQubmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGQuZmlsdGVyYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXNjYXBlX2RlcGFydG1lbnQoZCkge1xuICAgICAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xuICAgIH1cblxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBOYXYgPSByZXF1aXJlKCcuL292ZXJsYXkvbmF2JyksXG4gICAgTG9nbyA9IHJlcXVpcmUoJy4vbG9nby9pbmRleCcpLFxuICAgIFdvcmsgPSByZXF1aXJlKCcuL3dvcmsvaW5kZXgnKTtcblxudmFyIHdvcmtfYXJncyA9IHBhcnNlX3VybF9mb3Jfd29yayh3aW5kb3cubG9jYXRpb24uaGFzaCk7XG5cbnNpdGUoKVxuICAgIC5jb2xvcnMoKVxuICAgIC5vdmVybGF5KClcbiAgICAubG9nbygpXG4gICAgLndvcmsod29ya19hcmdzKVxuICAgIC5yZXZlYWwoKTtcblxuXG5mdW5jdGlvbiBwYXJzZV91cmxfZm9yX3dvcmsgKHBhdGgpIHtcbiAgICBjb25zb2xlLmxvZyhwYXRoKTtcbiAgICB2YXIgaXNfaXRfbGl2ZSA9IGZhbHNlO1xuICAgIHZhciB3aGljaF9sYXlvdXQgPSAnaW1hZ2UnO1xuICAgIGlmIChwYXRoLmluZGV4T2YoJ3dvcmsnKSA+IC0xKSB7XG4gICAgICAgIGlzX2l0X2xpdmUgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAocGF0aC5pbmRleE9mKCdmaXhlZCcpID4gLTEpIHtcbiAgICAgICAgd2hpY2hfbGF5b3V0ID0gJ2ZpeGVkJztcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgbGl2ZTogaXNfaXRfbGl2ZSxcbiAgICAgICAgbGF5b3V0OiB3aGljaF9sYXlvdXRcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBzaXRlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBjb2xvcl92YWx1ZXMgPSB7XG4gICAgICAgICAgICBwdXJwbGU6ICdyZ2IoMzgsIDM0LCA5OCk7JyxcbiAgICAgICAgICAgIG9yYW5nZTogJ3JnYigyNTUsIDYxLCA1Nik7JyxcbiAgICAgICAgICAgICdsdC1wdXJwbGUnOiAncmdiKDE0NiwgNTMsIDEyNSknLFxuICAgICAgICAgICAgYmx1ZTogJ3JnYig0MywgODksIDE4NCknXG4gICAgICAgIH0sXG4gICAgICAgIHVzZV9pbWFnZXNfYXNfb3ZlcmxheV9iYWNrZ3JvdW5kID0gdHJ1ZSxcbiAgICAgICAgYmFja2dyb3VuZF9pbWFnZV9yb3RhdGlvbl9tZXRob2QgPSAnYmxvY2snLFxuICAgICAgICBiYWNrZ3JvdW5kX2ltYWdlX3JvdGF0aW9uX21ldGhvZHMgPSBbJ2ZhZGUnLCAnYmxvY2snXSxcbiAgICAgICAgYm9keSA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG4gICAgdmFyIGNvbG9ycyA9IE9iamVjdC5rZXlzKGNvbG9yX3ZhbHVlcyk7XG5cbiAgICB2YXIgbmF2ID0gTmF2KCk7XG4gICAgdmFyIGxvZ28gPSBMb2dvKCk7XG4gICAgdmFyIHdvcmsgPSBXb3JrKCk7XG5cbiAgICBzZWxmLmNvbG9ycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJhbmRvbV9pbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGNvbG9ycy5sZW5ndGgpO1xuXG4gICAgICAgIHZhciBjb2xvciA9IGNvbG9yc1tyYW5kb21faW5kZXhdO1xuICAgICAgICB2YXIgYWx0X2NvbG9ycyA9IGNvbG9ycy5zbGljZSgwLHJhbmRvbV9pbmRleClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KGNvbG9ycy5zbGljZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9pbmRleCArIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xvcnMubGVuZ3RoKSk7XG5cbiAgICAgICAgdmFyIGFsdF9jb2xvciA9IGFsdF9jb2xvcnNbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFsdF9jb2xvcnMubGVuZ3RoKV07XG5cbiAgICAgICAgYm9keS5jbGFzc2VkKCdib2R5LScgKyBjb2xvciwgdHJ1ZSk7XG4gICAgICAgIGJvZHkuY2xhc3NlZCgnYm9keS1hbHQtJyArIGFsdF9jb2xvciwgdHJ1ZSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYub3ZlcmxheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhaXJzID0gZDMuc2VsZWN0QWxsKCcub3ZlcmxheS1uYXYtaXRlbScpXG4gICAgICAgICAgICAuZGF0dW0oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kYXRhc2V0OyB9KTtcblxuICAgICAgICBuYXYuc2VsZWN0aW9uKHBhaXJzKVxuICAgICAgICAgICAgLnNldHVwKClcbiAgICAgICAgICAgIC5hdHRhY2hSZXNpemUoKTtcblxuICAgICAgICAvLyBzZXR1cCBjbGljayB0cmFja2luZyB3aXRoIGdvb2dsZSBhbmFseXRpY3NcbiAgICAgICAgbmF2LmRpc3BhdGNoXG4gICAgICAgICAgICAub24oJ2FzdGVyaXNrQ2xpY2snLCBmdW5jdGlvbiAob3ZlcmxhaWRfYm9vbGVhbikge1xuICAgICAgICAgICAgICAgIGlmICghX2dhcSkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIGlmIChvdmVybGFpZF9ib29sZWFuKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG9wZW5pbmdcbiAgICAgICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdHb0J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0FzdGVyaXNrIENsaWNrIC0gT3BlbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0hvbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNsb3NpbmdcbiAgICAgICAgICAgICAgICAgICAgX2dhcS5wdXNoKFsnX3RyYWNrRXZlbnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdHb0J1dHRvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0FzdGVyaXNrIENsaWNrIC0gQ2xvc2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBYm91dCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYubG9nbyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbG9nby5jb250YWluZXIoZDMuc2VsZWN0KCcubG9nby1saW5lJykpXG4gICAgICAgICAgICAuYXR0YWNoUmVzaXplKClcbiAgICAgICAgICAgIC5yZW5kZXIoKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi53b3JrID0gZnVuY3Rpb24gKGFyZ3MpIHtcbiAgICAgICAgaWYgKGFyZ3MubGl2ZSkge1xuICAgICAgICAgICAgLy8gc2V0IHVwXG4gICAgICAgICAgICB3b3JrLmNvbnRhaW5lcihkMy5zZWxlY3QoJy53b3JrLWNvbnRhaW5lcicpKVxuICAgICAgICAgICAgICAgIC5maWx0ZXJzKGQzLnNlbGVjdCgnLmRlcGFydG1lbnQtY29udGFpbmVyJykpXG4gICAgICAgICAgICAgICAgLmluZmluaXRlU2Nyb2xsKHRydWUpXG4gICAgICAgICAgICAgICAgLmxheW91dChhcmdzLmxheW91dClcbiAgICAgICAgICAgICAgICAubGlnaHRib3hDb250YWluZXIoZDMuc2VsZWN0KCcubGlnaHRib3gnKSlcbiAgICAgICAgICAgICAgICAuaW50cm8oZDMuc2VsZWN0KCcuaW50cm8tcXVvdGUnKSlcbiAgICAgICAgICAgICAgICAuaW5pdGlhbGl6ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZDMuc2VsZWN0KCcud29yay1zZWN0aW9uJykucmVtb3ZlKCk7XG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5saWdodGJveCcpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJldmVhbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZlbmRvciA9XG4gICAgICAgICAgICBbXCJcIiwgXCItd2Via2l0LVwiLCBcIi1tb3otXCIsIFwiLW1zLVwiLCBcIi1vLVwiXS5yZWR1Y2UoXG4gICAgICAgICAgICBmdW5jdGlvbiAocCwgdikge1xuICAgICAgICAgICAgICAgIHJldHVybiB2ICtcbiAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zZm9ybVwiIGluIGRvY3VtZW50LmJvZHkuc3R5bGUgPyB2IDogcDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB2YXIgdHJhdmVsID0gKC0od2luZG93LmlubmVySGVpZ2h0KjAuOCkpO1xuICAgICAgICB2YXIgdHJhbnNmcm9tX3N0YXJ0ID0gJ3RyYW5zbGF0ZSgwcHgsJyArIHRyYXZlbCArICdweCknO1xuICAgICAgICB2YXIgdHJhbnNmcm9tX2VuZCA9ICd0cmFuc2xhdGUoMHB4LDBweCknO1xuICAgICAgICB2YXIgcmV2ZWFsID0gZDMuc2VsZWN0QWxsKCcucmV2ZWFsLW1lJyk7XG5cbiAgICAgICAgcmV2ZWFsXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKVxuICAgICAgICAgICAgLnN0eWxlKHZlbmRvcisndHJhbnNmb3JtJywgdHJhbnNmcm9tX3N0YXJ0KTtcblxuICAgICAgICByZXZlYWxcbiAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kZWxheSg4MDApXG4gICAgICAgICAgICAuZHVyYXRpb24oMTIwMClcbiAgICAgICAgICAgIC5lYXNlKCdjdWJpYy1pbm91dCcpXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKVxuICAgICAgICAgICAgLnN0eWxlVHdlZW4odmVuZG9yKyd0cmFuc2Zvcm0nLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDMuaW50ZXJwb2xhdGVTdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zyb21fc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zyb21fZW5kKTtcblxuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufSIsInZhciBjb25uZWN0TG9nb1NjYWxlID0gcmVxdWlyZSgnLi9zY2FsZScpO1xudmFyIFV0aWxpdHkgPSByZXF1aXJlKCcuL3N2ZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxvZ28gKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KSxcbiAgICAgICAgbG9nb19jb250YWluZXJfc2VsLFxuICAgICAgICBsb2dvX3N2ZyxcbiAgICAgICAgbG9nb190ZXh0X3NlbCxcbiAgICAgICAgbG9nb19saW5lX21lcmdlZF9zZWwsXG4gICAgICAgIHN0cmFpZ2h0X2xpbmUgPSBkMy5zdmcubGluZSgpLFxuICAgICAgICBjb25uZWN0X2xvZ29fc2NhbGUgPSBjb25uZWN0TG9nb1NjYWxlKCksXG4gICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbDtcblxuICAgIHZhciB1dGlsaXR5ID0gVXRpbGl0eSgpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsb2dvX2NvbnRhaW5lcl9zZWw7XG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRlbGF5UGFzdFJldmVhbCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbDtcbiAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXR0YWNoUmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3dfc2VsXG4gICAgICAgICAgICAub24oJ3Jlc2l6ZS5sb2dvJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlY2FsdWxhdGVfbG9nb19saW5lKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIFxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHNldCB1cCBzdmdcbiAgICAgICAgdmFyIHdpbmRvd193aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBsb2dvX3N2ZyA9IGxvZ29fY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1zdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgICAgIC8vIHNlbGVjdGlvbiBvZiB0aGUgdGV4dCB0aGF0IHdpbGwgZGVmaW5lIHRoZSBsaW5lXG4gICAgICAgIGxvZ29fdGV4dF9zZWwgPSBkMy5zZWxlY3QoJ2hlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5sb2dvLXRleHQtY29tcG9uZW50Jyk7XG5cbiAgICAgICAgLy8gdmVydGljaWVzIGZvciBcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gbG9nb19saW5lX3RleHRfdmVydGljaWVzKGxvZ29fdGV4dF9zZWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dfd2lkdGgpO1xuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgIHZhciBtZXJnZWRfZCA9IG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzKTtcblxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbCA9IGxvZ29fc3ZnLnNlbGVjdEFsbCgnLmxvZ28tbGluZS1tZXJnZWQnKVxuICAgICAgICAgICAgLmRhdGEoW21lcmdlZF9kXSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1saW5lLW1lcmdlZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZDsgfSk7XG5cbiAgICAgICAgbG9nb19saW5lX21lcmdlZF9zZWwuY2FsbCh0d2Vlbl9pbik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlY2FsdWxhdGVfbG9nb19saW5lICgpIHtcbiAgICAgICAgdmFyIHdpbmRvd193aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBsb2dvX3N2Z1xuICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2luZG93X3dpZHRoKVxuICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgIGlmIChsb2dvX2xpbmVfbWVyZ2VkX3NlbCkge1xuICAgICAgICAgICAgdXBkYXRlX2xvZ29fbGluZSh3aW5kb3dfd2lkdGgsIHdpbmRvd19oZWlnaHQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlX2xvZ29fbGluZSAod3dpZHRoLCB3aGVpZ2h0KSB7XG4gICAgICAgIHZhciB0ZXh0X3ZlcnRpY2llcyA9IGxvZ29fbGluZV90ZXh0X3ZlcnRpY2llcyhsb2dvX3RleHRfc2VsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3dpZHRoKTtcbiAgICAgICAgdmFyIGNvbm5lY3Rpbmdfc2VnbWVudHMgPVxuICAgICAgICAgICAgICAgIGxvZ29fbGluZV9jb25uZWN0aW5nX3NlZ21lbnRzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVpZ2h0KTtcblxuICAgICAgICB2YXIgbWVyZ2VkX2QgPSBtZXJnZV9saW5lcyh0ZXh0X3ZlcnRpY2llcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGluZ19zZWdtZW50cyk7XG5cbiAgICAgICAgbG9nb19saW5lX21lcmdlZF9zZWxcbiAgICAgICAgICAgIC5kYXRhKFttZXJnZWRfZF0pXG4gICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkOyB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dvX2xpbmVfdGV4dF92ZXJ0aWNpZXMgKHNlbCwgd3dpZHRoKSB7XG4gICAgICAgIHZhciB0ZXh0X3ZlcnRpY2llcyA9IFtdO1xuXG4gICAgICAgIHNlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHZhciBmaXJzdCwgc2Vjb25kO1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IFtib3VuZHMubGVmdCArIDMsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjQ1KSkpXTtcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSBbYm91bmRzLnJpZ2h0ICsgNixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNDUpKSldO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoaSA9PT0gMSkgfCAoaSA9PT0gMikpIHtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IFtib3VuZHMubGVmdCAtIDIsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjQ1KSkpXTtcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSBbYm91bmRzLnJpZ2h0ICsgNixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNDUpKSldO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSAzKSB7XG4gICAgICAgICAgICAgICAgaWYgKHd3aWR0aCA8IDc2OCkge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IFtib3VuZHMubGVmdCAtIDYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC41NSkpKV07XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZCA9IFtib3VuZHMucmlnaHQgKyA2LFxuICAgICAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNTUpKSldO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZpcnN0ID0gW2JvdW5kcy5yaWdodCArIDYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC41NSkpKV07XG4gICAgICAgICAgICAgICAgICAgIHNlY29uZCA9IFtib3VuZHMubGVmdCAtIDYsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC41NSkpKV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0X3ZlcnRpY2llcy5wdXNoKFtmaXJzdCwgc2Vjb25kXSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRleHRfdmVydGljaWVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fbGluZV9jb25uZWN0aW5nX3NlZ21lbnRzIChzdGFydF9lbmRfcG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3d2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWlnaHQpIHtcbiAgICAgICAgdmFyIGxpbmVfc2l6ZV90b19kcmF3ID1cbiAgICAgICAgICAgICAgICBjb25uZWN0X2xvZ29fc2NhbGUuY2hvb3NlX3NpemUod3dpZHRoLCB3aGVpZ2h0KTtcblxuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0X2VuZF9wb2ludHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgaWYgKChpKzEpIDwgc3RhcnRfZW5kX3BvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBzdGFydF9lbmRfcG9pbnRzW2ldWzFdLFxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBzdGFydF9lbmRfcG9pbnRzW2krMV1bMF07XG5cbiAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzXG4gICAgICAgICAgICAgICAgICAgIC5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNjYWxlW2xpbmVfc2l6ZV90b19kcmF3XShzdGFydCwgZW5kKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpbmdfc2VnbWVudHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWVyZ2VfbGluZXModGV4dF92ZXJ0aWNpZXMsIGNvbm5lY3Rpbmdfc2VnbWVudHMpIHtcbiAgICAgICAgLy8gdGFrZXMgYXJyYXkgb2YgdmVydGV4IHBhaXJzLCBhbmQgcGF0aFxuICAgICAgICAvLyBlbGVtZW50cyBvZiBjb25uZWN0aW5nIHNlZ21lbnRzLlxuICAgICAgICAvLyByZXR1cm5zIG9uIHBhdGggZCBhdHRyaWJ1dGVcbiAgICAgICAgdmFyIGQgPSAnJztcblxuICAgICAgICB2YXIgdGVtcF9zdmcgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJyk7XG4gICAgICAgIHZhciB0ZW1wX3BhdGggPSB0ZW1wX3N2Z1xuICAgICAgICAgICAgLnNlbGVjdEFsbCgndGVtcC1wYXRoJylcbiAgICAgICAgICAgIC5kYXRhKHRleHRfdmVydGljaWVzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBzdHJhaWdodF9saW5lKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RlbXAtcGF0aCcpXG4gICAgICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgIHRlbXBfcGF0aC5lYWNoKGZ1bmN0aW9uICh0ZCwgdGkpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRkKTtcbiAgICAgICAgICAgIHZhciB0ZXh0X2QgPSBkMy5zZWxlY3QodGhpcykuYXR0cignZCcpO1xuICAgICAgICAgICAgZCArPSB0ZXh0X2Q7XG4gICAgICAgICAgICBpZiAoY29ubmVjdGluZ19zZWdtZW50c1t0aV0pIHtcbiAgICAgICAgICAgICAgICB2YXIgY29ubmVjdGluZ19kID0gY29ubmVjdGluZ19zZWdtZW50c1t0aV07XG4gICAgICAgICAgICAgICAgZCArPSBjb25uZWN0aW5nX2Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxpdHkuY29udmVydFRvUmVsYXRpdmUodGVtcF9wYXRoLmF0dHIoJ2QnLCBkKS5ub2RlKCkpO1xuICAgICAgICAvLyByZXBsYWNlIGFsbCBgbWAgaW5zdHJ1Y3Rpb25zIHdpdGggYGxgLCBleGNlcHRcbiAgICAgICAgLy8gZm9yIHRoZSBmaXJzdCBvbmUuIHRoaXMgaXMgYSByZXZlcnNlIHJlZ2V4XG4gICAgICAgIGQgPSB0ZW1wX3BhdGguYXR0cignZCcpLnJlcGxhY2UoLyg/IV4pbS9nLCAnbCcpO1xuXG4gICAgICAgIHRlbXBfc3ZnLnJlbW92ZSgpO1xuICAgICAgICB0ZW1wX3BhdGgucmVtb3ZlKCk7XG5cbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5faW4ocGF0aCkge1xuICAgICAgICBwYXRoLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDgwMDApXG4gICAgICAgICAgICAuYXR0clR3ZWVuKCdzdHJva2UtZGFzaGFycmF5JywgdHdlZW5EYXNoKVxuICAgICAgICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZGFzaCBhcnJheSwgYXMgcmVzaXppbmdcbiAgICAgICAgICAgICAgICAvLyB0aGUgYnJvd3NlciB3aWxsIGNoYW5nZSB0aGUgbGVuZ3RoXG4gICAgICAgICAgICAgICAgLy8gYW5kIHRoZXJlIGlzIG5vIG5lZWQgdG8gcmUtY29tcHV0ZVxuICAgICAgICAgICAgICAgIC8vIHRoZSBkYXNoIGFycmF5IHRvIGZpdCBpdC5cbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsICdub25lJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2VlbkRhc2goKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKCcwLCcgKyBsLCBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9jb2xvcl9zdG9wcyAoc2VsKXtcbiAgICAgICAgc2VsLmFwcGVuZCgnc3RvcCcpXG4gICAgICAgICAgICAuYXR0cignb2Zmc2V0JywgJzAlJylcbiAgICAgICAgICAgIC5hdHRyKCdzdG9wLWNvbG9yJywgJ3doaXRlJylcbiAgICAgICAgICAgIC5hdHRyKCdzdG9wLW9wYWNpdHknLCAwKTtcbiAgICAgICAgc2VsLmFwcGVuZCgnc3RvcCcpXG4gICAgICAgICAgICAuYXR0cignb2Zmc2V0JywgJzEwMCUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0b3AtY29sb3InLCAnd2hpdGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0b3Atb3BhY2l0eScsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgVXRpbGl0eSA9IHJlcXVpcmUoJy4vc3ZnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9nb19zY2FsZSAoKSB7XG4gICAgdmFyIHV0aWxpdHkgPSBVdGlsaXR5KCk7XG5cbiAgICB2YXIgc2VnbWVudHMgPSBbe1xuICAgICAgICAgICAgZnJvbTogJ1JJU0QnLFxuICAgICAgICAgICAgdG86ICdHcmFkJyxcbiAgICAgICAgICAgIHNjYWxlVXNpbmc6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFksXG4gICAgICAgICAgICAgICAgJzc2OCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZLFxuICAgICAgICAgICAgICAgICcxMDI0JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXduX2RlbHRhOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTU1Ljc5Mzk4ODg4MzQ5NTMzLFxuICAgICAgICAgICAgICAgICAgICB5OiAxMDMzLjA3OTk1NjA1NDY4NzVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICc3NjgnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC03Mi45NTMwNTQxMzAwNzczNixcbiAgICAgICAgICAgICAgICAgICAgeTogMzQzLjM3NDAyMzQzNzVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICcxMDI0Jzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtMTA3LjI0NzA1Njk2MTA1OTU3LFxuICAgICAgICAgICAgICAgICAgICB5OiAzOTEuNDI4OTU1MDc4MTI1XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhdGhzOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6ICdNMC44NzEsMCcrXG4gICAgICAgICAgICAgICAgICAndjE2LjgxJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDAsNzMuMTU1LDAsMTMxLjkxNicrXG4gICAgICAgICAgICAgICAgICAnYzAsMTE3LjQyOCw1OS4yNzMsMjA0LjQ5MiwyNjQuNzYzLDIwNC40OTInK1xuICAgICAgICAgICAgICAgICAgJ2MyMDguNDksMCwyMTEuMzE1LTI0MC45ODcsMC0yNDAuOTg3JytcbiAgICAgICAgICAgICAgICAgICdjLTQ4Ljc3NCwwLTk5Ljc3MSwwLTk5Ljc3MSwwJytcbiAgICAgICAgICAgICAgICAgICd2Mzg5LjkxJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDYxLjk2NS0xLjAzOSwxMTkuOTk0LDM2LjY3OScrXG4gICAgICAgICAgICAgICAgICAnYzU5Ljk5NywzOC45OTgsNzYuNDk2LDEzNC4zODIsMTYwLjQ5MiwxMzQuMzgyJytcbiAgICAgICAgICAgICAgICAgICdjOTUuOTk1LDAsOTMuNzU1LTk1LjczNCwxLjYzNS0xMDcuNDM5JytcbiAgICAgICAgICAgICAgICAgICdjLTY0LjYzMi04LjIxMy0xMjYuNDQ4LDk2LjI3LTE2Mi43NDksMTM0LjA1NycrXG4gICAgICAgICAgICAgICAgICAnYy00MS43NCw0My40NDctMTU1LjM3LDEwMy44NzYtMjI4LjcyNSw2NC44NzgnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTEyLjYzMi01OS44NzksMi44OTItMjEwLjQ5NCwxMDAuMzUzLTk3LjQ5NScrXG4gICAgICAgICAgICAgICAgICAnQzM2My44NTMsOTA3LjE5Mi01NC45MjMsOTE1Ljc4OC01NC45MjMsOTIxLjQzJytcbiAgICAgICAgICAgICAgICAgICdjMCwxOC4wMTMsMCwxMTEuNjUsMCwxMTEuNjUnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTS0wLjc1NCwwJytcbiAgICAgICAgICAgICAgICAgICdoODg5LjcxOScrXG4gICAgICAgICAgICAgICAgICAnYzAsMC05LjkwNiwzMy45MDgtNDkuNTQ0LDQ3LjAyMycrXG4gICAgICAgICAgICAgICAgICAnYy0zMC45MTIsMTAuMjI4LTExMS45NTYsMTIuMDg1LTE3OC4zNDgsNjUuOTgyJytcbiAgICAgICAgICAgICAgICAgICdjLTgzLjE0LDY3LjQ5My01OS4xNTgsMTcwLjk5Mi0yMDEuODM2LDE3MC45OTInK1xuICAgICAgICAgICAgICAgICAgJ2MtMzMuMTM4LDAtOTkuODgsMC4wMDMtOTkuODgsMC4wMDNsMC0yMTUuMTA1JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDE0LjI5My0wLjEzNCwzNC41LDAnK1xuICAgICAgICAgICAgICAgICAgJ2MxNzAuMzYyLDEuMTI4LDE3Ni42MDgsMTUzLjcxMyw1NC42MDgsMTUzLjcxMycrXG4gICAgICAgICAgICAgICAgICAnYy0xNTMsMC0yMTUuNTkzLTE2NS43OTEtMzMyLjk2LTE2NS43OTEnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTc0LjA0LDAtMTkzLjc0MSwyODYuNTU3LTE5My43NDEsMjg2LjU1NycrXG4gICAgICAgICAgICAgICAgICAnaDQuNTI5JyxcbiAgICAgICAgICAgICAgICAnMTAyNCc6ICdNMTYuNzU0LDAnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMTI5OC43NzksMCwxNDA4LjcxOSwwJytcbiAgICAgICAgICAgICAgICAgICdjMCw4My44NzItNjEuMTMyLDEyOS42MTUtMTk1LjU5MiwxMjkuNjE1JytcbiAgICAgICAgICAgICAgICAgICdjLTI1MC41MTksMC0xOTMuODMxLDIxNC41NjUtNDIzLjMwNiwyMTQuNTY1JytcbiAgICAgICAgICAgICAgICAgICdjLTUzLjI5OCwwLTE2MC42NDEsMC4wMDUtMTYwLjY0MSwwLjAwNScrXG4gICAgICAgICAgICAgICAgICAnbDAtMjg2LjA5MicrXG4gICAgICAgICAgICAgICAgICAnYzAsMCw5MS42MDYsMCwxMjQuMTA2LDAnK1xuICAgICAgICAgICAgICAgICAgJ2MxODYuNjM2LDAsMTkwLjc2MSwyMDMuMTM1LDUuMjE0LDIwMy4xMzUnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTU2Ljk1OCwwLTM0MS4zNjYtMTcyLjA5OS01NzIuNjU0LTE3Mi4wOTknK1xuICAgICAgICAgICAgICAgICAgJ2MtMjEzLjEzNCwwLTMwNC40NjIsMTMxLjg4NS0zMDQuNDYyLDMwMi4zJytcbiAgICAgICAgICAgICAgICAgICdjNC4yODQsMCwxMS4zNjgsMCwxMS4zNjgsMCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZnJvbTogJ0dyYWQnLFxuICAgICAgICAgICAgdG86ICdTaG93JyxcbiAgICAgICAgICAgIHNjYWxlVXNpbmc6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFgsXG4gICAgICAgICAgICAgICAgJzc2OCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxYLFxuICAgICAgICAgICAgICAgICcxMDI0JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFhcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmF3bl9kZWx0YToge1xuICAgICAgICAgICAgICAgICczMDAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDM0NC4xNDAwMTQ2NDg0Mzc1LFxuICAgICAgICAgICAgICAgICAgICB5OiAwXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnNzY4Jzoge1xuICAgICAgICAgICAgICAgICAgICB4OiA3ODYuMDUyOTc2NDg5MDY3MSxcbiAgICAgICAgICAgICAgICAgICAgeTogMC4wMDAwMjE3NTU2OTUzNDMwMTc1NzhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICcxMDI0Jzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAxMjYwLjUwMDA2MjQ2NTY2NzcsXG4gICAgICAgICAgICAgICAgICAgIHk6IC0wLjAwMDAzNzk2ODE1ODcyMTkyMzgzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhdGhzOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6ICdNMC0wLjEzOCcgK1xuICAgICAgICAgICAgICAgICAgICAgICAnYzgzLjYyNywwLjYyLDIzOC43NTUsMCwzNDQuMTQsMCcsXG4gICAgICAgICAgICAgICAgJzc2OCc6ICdNMS42OTgtMC43MzQnK1xuICAgICAgICAgICAgICAgICAgJ0g5JytcbiAgICAgICAgICAgICAgICAgICd2MTc5Ljk1JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLTIzLjMzMiwwLTY1LjQ3OCwwJytcbiAgICAgICAgICAgICAgICAgICdjMC0xMjguNTg4LDEwOC4yNy0yNDMuMDQ1LDI1OS4zMzktMjQzLjA0NScrXG4gICAgICAgICAgICAgICAgICAnQzQ0OS4yODktNjMuODI5LDQxNi45MzQsMjIzLDEzMy45NjYsMjIzJytcbiAgICAgICAgICAgICAgICAgICdjLTE2Ny42NDEsMC0xNy4yMTUtMTkwLjUzNCwyNDIuODA4LTE5MC41MzQnK1xuICAgICAgICAgICAgICAgICAgJ0M2NDYuNzUxLDMyLjQ2Niw2NjMuNzUxLDE5NSw2NjMuNzUxLDE5NScrXG4gICAgICAgICAgICAgICAgICAncy0xMzQuMDEsMC4wMTgtMTY3LjUsMC4wMTgnK1xuICAgICAgICAgICAgICAgICAgJ2MwLTEyNy4wMTgsODEuNS0xOTUuNzUyLDI2My41LTE5NS43NTInK1xuICAgICAgICAgICAgICAgICAgJ2M2LjQzNywwLDI4LDAsMjgsMCcsXG4gICAgICAgICAgICAgICAgJzEwMjQnOiAnTTMuNTM5LDAuNTgzJytcbiAgICAgICAgICAgICAgICAgICdoMTguNDc2JytcbiAgICAgICAgICAgICAgICAgICd2MjQxLjE3JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLTEwMC4wMTgsMC0xNDcuMDEsMCcrXG4gICAgICAgICAgICAgICAgICAnYzAtMTAyLjI0Myw3NS44NjItMTUxLjczNywxNDcuMDEtMTUxLjczNycrXG4gICAgICAgICAgICAgICAgICAnYzE2Mi45MiwwLDIxMC4zNTMsMjQ1LjkxLDMxMC45NywyNDUuOTEnK1xuICAgICAgICAgICAgICAgICAgJ2MxOTcuMzAyLDAsMTM2LjU0NS01MzcuNzIzLTEyMC42OTYtNTM3LjcyMycrXG4gICAgICAgICAgICAgICAgICAnYy0xODguMjExLDAtMTQyLjg0MSwzMDcuMTM3LDI3NiwzMDcuMTM3JytcbiAgICAgICAgICAgICAgICAgICdjMzQ2LjAwNSwwLDMxNC4xNDUtMTA0Ljc1Nyw2NjcuOTg3LTEwNC43NTcnK1xuICAgICAgICAgICAgICAgICAgJ2MzNi43NTMsMCwxMDcuNzYzLDAsMTA3Ljc2MywwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBmcm9tOiAnU2hvdycsXG4gICAgICAgICAgICB0bzogJzIwMTQnLFxuICAgICAgICAgICAgc2NhbGVVc2luZzoge1xuICAgICAgICAgICAgICAgICczMDAnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgICAgICAnNzY4JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFksXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXduX2RlbHRhOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTc1LjU1NjAwNTQ3NzkwNTI3LFxuICAgICAgICAgICAgICAgICAgICB5OiA0OC42ODkwMDY4MDU0MTk5MlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzc2OCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgeTogMzI1LjI1MDk4NjgxNDQ5ODlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICcxMDI0Jzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtMC4wMDEwMjIzMzg4NjcxODc1LFxuICAgICAgICAgICAgICAgICAgICB5OiA0MTUuMjM5MDA4MTg4MjQ3N1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAgICczMDAnOiAnTTczLjYwNi00OC42ODkgJyArXG4gICAgICAgICAgICAgICAgICAgICdjMy4wMzctMC4wMzIsNS43NC0wLjA1Miw4LjA4OS0wLjA1MiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MxNS4zMywwLDYuNzgzLTQ5LjYyNi0zNS4zMzctNTEuMjU4ICcgK1xuICAgICAgICAgICAgICAgICAgICAnYy00My0xLjY2Ny03MC43NSwyNC03Ny4zMzMsNTYgJyArXG4gICAgICAgICAgICAgICAgICAgICdDLTM2LjUyNi0xNy4wMTUtMTQuNjQxLDAtMS45NSwwJyxcbiAgICAgICAgICAgICAgICAnNzY4JzogJ00wLTEuNzI3JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLTYtNjIuNzY2LTcwLjQ4OC02Mi43NjYnK1xuICAgICAgICAgICAgICAgICAgJ2MtODIuNTEyLDAtMTI1LjQwNSwxMjIuNDA3LTguMDEyLDIwOC41JytcbiAgICAgICAgICAgICAgICAgICdDLTUuMTg1LDE5Ny43NzQsMCwyODMuMDA3LDAsMzIzLjUyNCcsXG4gICAgICAgICAgICAgICAgJzEwMjQnOiAnTTEtMi4yNjgnK1xuICAgICAgICAgICAgICAgICAgJ2MwLTU0LjkyNy0zNy45MzgtMTIwLjkyLTEyMS40OTMtMTIwLjkyJytcbiAgICAgICAgICAgICAgICAgICdjLTI3My43ODIsMC0zMzEuNjg1LDQ3Mi40NTYtNjc1LjI1Miw0NzIuNDU2JytcbiAgICAgICAgICAgICAgICAgICdjLTE1NS42NTcsMC0xNDkuNDctMTc1LjM3MS0yLjIxNS0xNzUuMzcxJytcbiAgICAgICAgICAgICAgICAgICdjMTc2LjUyMywwLDI2OC40ODcsMTc1LjQ5MSw0MTIuNDc5LDE3NS40OTEnK1xuICAgICAgICAgICAgICAgICAgJ2MxNDkuOTkyLDAsMTQwLjYyOC0yNzYuMTk3LDI4Mi4xMzgtMjc2LjE5NycrXG4gICAgICAgICAgICAgICAgICAnYzUxLjY2NCwwLDg0LjA5MSwzNi45NjQsODQuMDkxLDgyLjEwNCcrXG4gICAgICAgICAgICAgICAgICAnYzAsMTE4LjIwNi0zMTUuNTI5LDE5Mi4zNDMtMTI0Ljc2OCwxOTIuMzQzJytcbiAgICAgICAgICAgICAgICAgICdjMzUuMzMzLDAsMTQ1LjAxOSwwLDE0NS4wMTksMCcrXG4gICAgICAgICAgICAgICAgICAndjY1LjMzMydcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV07XG5cbiAgICB2YXIgdGVtcF9zdmcgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIHZhciB0ZW1wX3BhdGggPSB0ZW1wX3N2Z1xuICAgICAgICAuYXBwZW5kKCdwYXRoJyk7XG5cbiAgICB2YXIgbWVhc3VyZV9mb3JfZmYgPSB0cnVlO1xuXG4gICAgc2VnbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICBkLnJlbGF0aXZlX3BhdGhzX2QgPSB7fTtcbiAgICAgICAgZC5yZWxhdGl2ZV9wYXRocyA9IHt9O1xuICAgICAgICBkLnNjYWxlID0ge307XG5cbiAgICAgICAgaWYgKG1lYXN1cmVfZm9yX2ZmKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWdtZW50c1tpXS5mcm9tICsgJyAnICsgc2VnbWVudHNbaV0udG8pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgcGF0aF9zaXplIGluIGQucGF0aHMpIHtcbiAgICAgICAgICAgIHRlbXBfcGF0aC5hdHRyKCdkJywgZC5wYXRoc1twYXRoX3NpemVdKTtcbiAgICAgICAgICAgIHV0aWxpdHkuY29udmVydFRvUmVsYXRpdmUodGVtcF9wYXRoLm5vZGUoKSk7XG4gICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzX2RbcGF0aF9zaXplXSA9IHRlbXBfcGF0aC5hdHRyKCdkJyk7XG4gICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0gPSB0ZW1wX3BhdGgubm9kZSgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAobWVhc3VyZV9mb3JfZmYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2l6ZTogJywgcGF0aF9zaXplKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVsdGE6ICcsIHV0aWxpdHkucGF0aERlbHRhKFxuICAgICAgICAgICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZC5zY2FsZVtwYXRoX3NpemVdID1cbiAgICAgICAgICAgICAgICBkLnNjYWxlVXNpbmdbcGF0aF9zaXplXShkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5kcmF3bl9kZWx0YVtwYXRoX3NpemVdKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGVtcF9zdmcucmVtb3ZlKCk7XG4gICAgdGVtcF9wYXRoLnJlbW92ZSgpO1xuXG4gICAgdmFyIHNpemVzID0gT2JqZWN0LmtleXMoc2VnbWVudHNbMF0ucGF0aHMpO1xuICAgIHNlZ21lbnRzLmNob29zZV9zaXplID0gZnVuY3Rpb24gKHdpbmRvd193aWR0aCwgd2luZG93X2hlaWdodCkge1xuICAgICAgICB2YXIgY2hvc2VuID0gMDtcbiAgICAgICAgc2l6ZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPD0gd2luZG93X3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgY2hvc2VuID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjaG9zZW4udG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgd2luZG93LnNlZ21lbnRzID0gc2VnbWVudHM7XG5cbiAgICByZXR1cm4gc2VnbWVudHM7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ZnICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5jb252ZXJ0VG9SZWxhdGl2ZSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIGZ1bmN0aW9uIHNldCh0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIHNlZ3MucmVwbGFjZUl0ZW0ocnNlZywgaSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGR4LCBkeSwgeDAsIHkwLCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgIHNlZ3MgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICBmb3IgKHZhciB4ID0gMCwgeSA9IDAsIGkgPSAwLCBsZW4gPSBzZWdzLm51bWJlck9mSXRlbXM7XG4gICAgICAgICAgICAgaSA8IGxlbjtcbiAgICAgICAgICAgICBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ3MuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICBjICAgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgaWYgKC9bTUxIVkNTUVRBWnpdLy50ZXN0KGMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAtIHg7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAtIHg7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAtIHk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAtIHk7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IC14ICsgKHggPSBzZWcueCk7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IC15ICsgKHkgPSBzZWcueSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdNb3ZldG8nLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdMJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvJyxkeCxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnSCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0xpbmV0b0hvcml6b250YWwnLGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdWJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvVmVydGljYWwnLGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdDJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b0N1YmljJyxkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9DdWJpY1Ntb290aCcsZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1EnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvUXVhZHJhdGljJyxkeCxkeSx4MSx5MSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9RdWFkcmF0aWNTbW9vdGgnLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQXJjJyxkeCxkeSxzZWcucjEsc2VnLnIyLHNlZy5hbmdsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWcubGFyZ2VBcmNGbGFnLHNlZy5zd2VlcEZsYWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1onOiBjYXNlICd6JzogeCA9IHgwOyB5ID0geTA7IGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIHggKz0gc2VnLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyBpbiBzZWcpIHkgKz0gc2VnLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgc3RhcnQgb2YgYSBzdWJwYXRoXG4gICAgICAgICAgICBpZiAoYyA9PSAnTScgfHwgYyA9PSAnbScpIHtcbiAgICAgICAgICAgICAgICB4MCA9IHg7XG4gICAgICAgICAgICAgICAgeTAgPSB5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1ovZywgJ3onKSk7XG4gICAgfTtcblxuICAgIHNlbGYucGF0aERlbHRhID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc3RhcnQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgoMCksXG4gICAgICAgICAgICBlbmQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgocGF0aC5nZXRUb3RhbExlbmd0aCgpKTtcblxuICAgICAgICBkZWx0YS54ID0gZW5kLnggLSBzdGFydC54O1xuICAgICAgICBkZWx0YS55ID0gZW5kLnkgLSBzdGFydC55O1xuXG4gICAgICAgIHJldHVybiBkZWx0YTtcbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBhIHBhdGggZWxlbWVudFxuICAgIC8vIGFuZCB0aGUgcGF0aCBzZWdlbWVudCBpbmRpY2llc1xuICAgIC8vIHRoYXQgd2lsbCBiZSBzY2FsZWRcbiAgICBzZWxmLnNjYWxlQW5jaG9yWSA9IGZ1bmN0aW9uIChwYXRoLCBhbmNob3JzKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZUFuY2hvclknKTtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBzZWxmLnBhdGhEZWx0YShwYXRoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY3VycmVudCBkZWx0YVxuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBhbmNob3JzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvX3JlcGxhY2UgPSBzZWdtZW50cy5nZXRJdGVtKGFuY2hvcnNbbmFtZV0pO1xuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlX3dpdGggPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNSZWwoXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkgKyAoKGRlbHRhLmN1cnJlbnQueS1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGEuZHJhd24ueSkvMiksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS55MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueDIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkyKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlX3dpdGgsIGFuY2hvcnNbbmFtZV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbCA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsJyk7XG4gICAgICAgICAgICBkZWx0YS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGVuZFswXSAtIHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50cy5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IHNlZy54ICAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IHNlZy55ICAqIHJhdGlvLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTW92ZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b0hvcml6b250YWwnLCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvVmVydGljYWwnLCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpY1Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbFkgPSBmdW5jdGlvbiAocGF0aCwgZHJhd25fZGVsdGEpIHtcbiAgICAgICAgLy8gc2NhbGUgeSwgZml0IHhcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBkcmF3bl9kZWx0YVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpLFxuICAgICAgICAgICAgZml0X3ggPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlKGFsbF9zZWdtZW50cywgc2VnbWVudF90b19yZXBsYWNlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIGFsbF9zZWdtZW50cy5yZXBsYWNlSXRlbShyc2VnLCBzZWdtZW50X3RvX3JlcGxhY2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChNYXRoLmFicyhkZWx0YS5kcmF3bi54KSA+IDAuMSkge1xuICAgICAgICAgICAgZml0X3ggPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGVQcm9wb3J0aW9uYWwnKTtcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRlbHRhLmRpZmYgPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54IC0gZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkgLSBkZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgcmF0aW8gPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54L2RlbHRhLmRyYXduLngsXG4gICAgICAgICAgICAgICAgeTogZGVsdGEuY3VycmVudC55L2RlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIG9yaWdpbmFsX2QpO1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgdmFyIGZpcnN0X3NlZ21lbnQgPSBzZWdtZW50cy5nZXRJdGVtKDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3NlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhdGhTZWdUeXBlQXNMZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgPT09ICdtJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50X3NlZyA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0FicyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2VtZW50X3NlZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkeCwgZHksIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgICAgIHggPSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5ID0gc3RhcnRbMV0sXG4gICAgICAgICAgICAgICAgc2VnbWVudF9jb3VudCA9IHNlZ21lbnRzLm51bWJlck9mSXRlbXM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlZ21lbnRfY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzZWcgPSBzZWdtZW50cy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgICAgICBjID0gc2VnLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxO1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDI7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKGZpdF94KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSBkeCA9IHNlZy54ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkZWx0YS5kaWZmLngvKHNlZ21lbnRfY291bnQtMSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSBkeCA9IHNlZy54O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnkgICogcmF0aW8ueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsWCA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsWCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50cy5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyO1xuICAgICAgICAgICAgICAgIGlmICgneCcgIGluIHNlZykgZHggPSBzZWcueCAgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSBzZWcueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBuYXYgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHRhcmdldF9zZWwsXG4gICAgICAgIG92ZXJsYWlkID0gZmFsc2UsXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5JyksXG4gICAgICAgIHJlbW92YWJsZV90ZXh0ID0gW3tcbiAgICAgICAgICAgIHRleHQ6ICdHbyEnXG4gICAgICAgIH1dO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhc3Rlcmlza0NsaWNrJyk7XG5cbiAgICBzZWxmLnNlbGVjdGlvbiA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRhcmdldF9zZWw7XG4gICAgICAgIHRhcmdldF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5vdmVybGFpZCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG92ZXJsYWlkO1xuICAgICAgICBvdmVybGFpZCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnNldHVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRhcmdldF9zZWwpIHRocm93IFwicmVxdWlyZXMgZWxlbWVudHMgdG8gcGFpclwiO1xuICAgICAgICB0YXJnZXRfc2VsXG4gICAgICAgICAgICAub24oJ2NsaWNrLm5hdicsIGZ1bmN0aW9uIChkLCBkaSkge1xuICAgICAgICAgICAgICAgIHRhcmdldF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgnI2Zsb3dlcicpO1xuICAgICAgICAgICAgICAgIG92ZXJsYWlkID0gb3ZlcmxhaWQgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgICAgICAgICAgYWN0aXZhdGVfZGVhY3RpdmF0ZShkKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFzdGVyaXNrQ2xpY2sob3ZlcmxhaWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXR0YWNoUmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUubmF2JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHBsYWNlX2J1dHRvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignc2Nyb2xsLm5hdicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBwbGFjZV9idXR0b24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3RvdWNobW92ZS5uYXYnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWN0aXZhdGVfZGVhY3RpdmF0ZSAoZCkge1xuICAgICAgICB2YXIgb3ZlcmxheSA9IGQzLnNlbGVjdEFsbChkLmFjdGl2YXRlKTtcbiAgICAgICAgb3ZlcmxheS5jbGFzc2VkKCdvdmVybGFpZCcsIG92ZXJsYWlkKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgb3ZlcmxhaWQpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKGQuYm9keSwgb3ZlcmxhaWQpO1xuICAgICAgICBwbGFjZV9idXR0b24oKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZV9idXR0b24gKCkge1xuXG4gICAgICAgIHZhciB3d2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdmFyIHdoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgdmFyIG1hdGNoaW5nX3NlbDtcbiAgICAgICAgdmFyIGJib3g7XG5cbiAgICAgICAgaWYgKG92ZXJsYWlkKSB7XG4gICAgICAgICAgICBiYm94ID0gdGFyZ2V0X3NlbC5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB2YXIgcF9iYm94ID0gdGFyZ2V0X3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0KCdwJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciB0YXJnZXRfaGVpZ2h0ID0gYmJveC5oZWlnaHQ7XG4gICAgICAgICAgICBtYXRjaGluZ19zZWwgPVxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmxvZ28tdGV4dC1jb21wb25lbnQtLXJpc2QnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGFyZ2V0X3NlbC5zdHlsZSgnbGVmdCcsICh3d2lkdGggK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwX2Jib3gud2lkdGggLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYm94LndpZHRoIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCttYXRjaGluZ19zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpO1xuICAgICAgICAgICAgdGFyZ2V0X3NlbC5zdHlsZSgnYm90dG9tJywgKHdoZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJib3guaGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoK21hdGNoaW5nX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndG9wJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJ3AnKVswXSkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF0Y2hpbmdfc2VsID1cbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5sb2dvLXRleHQtY29tcG9uZW50LS0yMDE0Jyk7XG4gICAgICAgICAgICB0YXJnZXRfc2VsXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgbWF0Y2hpbmdfc2VsLnN0eWxlKCdyaWdodCcpKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnYm90dG9tJywgbWF0Y2hpbmdfc2VsLnN0eWxlKCdib3R0b20nKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBib3R0b20gKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRpcnR5ID0gZmFsc2UsXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5JyksXG4gICAgICAgIGJvZHlfaGVpZ2h0O1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdib3R0b20nKTtcblxuICAgIHNlbGYuZGlydHkgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkaXJ0eTtcbiAgICAgICAgZGlydHkgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hdHRhY2hXaW5kb3dFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgICAgICAub24oJ3Njcm9sbC5ib3R0b20nLCBjaGVja19kaXNwYXRjaClcbiAgICAgICAgICAgIC5vbigndG91Y2htb3ZlLmJvdHRvbScsIGNoZWNrX2Rpc3BhdGNoKTtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgY29udGFpbmVyX25vZGUgPSBjb250YWluZXJfc2VsLm5vZGUoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNoZWNrX2Rpc3BhdGNoICgpIHtcbiAgICAgICAgaWYgKCFjb250YWluZXJfbm9kZSkgdGhyb3cgXCJSZXF1aXJlcyBjb250YWluZXIuXCI7XG4gICAgICAgIGlmIChkaXJ0eSkgcmV0dXJuO1xuXG4gICAgICAgIGJvZHlfaGVpZ2h0ID0gcGFyc2VJbnQoYm9keV9zZWwuc3R5bGUoJ2hlaWdodCcpKTtcbiAgICAgICAgaWYgKGJvZHlfaGVpZ2h0IDw9XG4gICAgICAgICAgICAod2luZG93LmlubmVySGVpZ2h0ICsgd2luZG93LnNjcm9sbFkpKSB7XG5cbiAgICAgICAgICAgIGRpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYm90dG9tKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBEYXRhICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICByZXF1ZXN0ZWQgPSBbXSxcbiAgICAgICAgYXZhaWxhYmxlO1xuXG4gICAgdmFyIHVybCA9IHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4gK1xuICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2RhdGEnLCdlbmRPZkRhdGEnKTtcblxuICAgIHNlbGYuZmV0Y2hfZGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFhdmFpbGFibGUpIHtcbiAgICAgICAgICAgIGQzLmpzb24odXJsICsgJ2RhdGEvbWV0YWRhdGEuanNvbicsIHByb2Nlc3NfbWV0YWRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvY2Vzc19yZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc19tZXRhZGF0YSAocmF3X21ldGEpIHtcbiAgICAgICAgYXZhaWxhYmxlID0gcmF3X21ldGEucGFnZXM7XG4gICAgICAgIHByb2Nlc3NfcmVxdWVzdCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHByb2Nlc3NfcmVxdWVzdCAoKSB7XG4gICAgICAgIHZhciBuZXh0X3RvX2xvYWQgPSBjaG9vc2VfYW5kX3JlbW92ZV9mcm9tX2F2YWlsYWJsZSgpO1xuICAgICAgICBpZiAobmV4dF90b19sb2FkKSB7XG4gICAgICAgICAgICBkMy5qc29uKHVybCArIG5leHRfdG9fbG9hZCwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmRhdGEoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZW5kT2ZEYXRhKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaG9vc2VfYW5kX3JlbW92ZV9mcm9tX2F2YWlsYWJsZSAoKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZDtcbiAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5yYW5kb20oKSAqIGF2YWlsYWJsZS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkID0gYXZhaWxhYmxlLnNwbGljZShpbmRleCwgMSlbMF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZml4ZWQgKCkge1xuICAgIC8vIHdoZW4gY29udGFpbmVyIGhpdHMgdGhlIHRvcCwgc3dpdGNoIHRoYXQgZWxlbWVudCB0byBmaXhlZFxuICAgIC8vIHBsdXMgdGhlIGFkZGl0aW9uYWwgcGFkZGluZ1xuXG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgbm90X2ZpeGVkX3NlbCxcbiAgICAgICAgZml4ZWRfc2VsLFxuICAgICAgICBwYWRfb25fZml4ZWRfc2VsLFxuICAgICAgICBvcmlnaW5hbF9wYWRfb25fZml4ZWRfcGFkZGluZ190b3AgPSAnMXB4JyxcbiAgICAgICAgcGFkZGVkX3BhZF9vbl9maXhlZF9wYWRkaW5nX3RvcCxcbiAgICAgICAgbm90X2ZpeGVkX2Rpc3RhbmNlID0gMCxcbiAgICAgICAgZml4ZWRfY2xhc3MgPSAnZml4ZWQnO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhY3RpdmF0b3JWaXNpYmxlJyk7XG5cbiAgICBzZWxmLm5vdEZpeGVkID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbm90X2ZpeGVkX3NlbDtcbiAgICAgICAgbm90X2ZpeGVkX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmZpeGVkID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZml4ZWRfc2VsO1xuICAgICAgICBmaXhlZF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5wYWRPbkZpeGVkID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gcGFkX29uX2ZpeGVkX3NlbDtcbiAgICAgICAgcGFkX29uX2ZpeGVkX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnRvcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5vdF9maXhlZF9kaXN0YW5jZTtcbiAgICB9O1xuXG4gICAgc2VsZi5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxjX2NvbnRyYWludHMoKTtcblxuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdzY3JvbGwuZml4ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJlX2ZpeGVkKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCd0b3VjaG1vdmUuZml4ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uZmlndXJlX2ZpeGVkKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUuZml4ZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY2FsY19jb250cmFpbnRzKCk7XG4gICAgICAgICAgICAgICAgY29uZmlndXJlX2ZpeGVkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY29uZmlndXJlX2ZpeGVkICgpIHtcbiAgICAgICAgdmFyIGZpeGVkX3kgPSAwO1xuXG4gICAgICAgIGlmICgobm90X2ZpeGVkX2Rpc3RhbmNlIC0gcGFnZVlPZmZzZXQpIDwgMCkge1xuICAgICAgICAgICAgZml4ZWRfeSA9IHBhZ2VZT2Zmc2V0IC0gbm90X2ZpeGVkX2Rpc3RhbmNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGZpeGVkID0gKGZpeGVkX3kgPT09IDApID8gZmFsc2UgOiB0cnVlO1xuXG4gICAgICAgIHNlbGYuZGlzcGF0Y2hcbiAgICAgICAgICAgIC5hY3RpdmF0b3JWaXNpYmxlKGZpeGVkKTtcblxuICAgICAgICBmaXhlZF9zZWwuY2xhc3NlZChmaXhlZF9jbGFzcywgZml4ZWQpO1xuXG4gICAgICAgIHBhZF9vbl9maXhlZF9zZWxcbiAgICAgICAgICAgIC5zdHlsZSgncGFkZGluZy10b3AnLFxuICAgICAgICAgICAgICAgICAgICBmaXhlZCA/XG4gICAgICAgICAgICAgICAgICAgIHBhZGRlZF9wYWRfb25fZml4ZWRfcGFkZGluZ190b3AgOlxuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbF9wYWRfb25fZml4ZWRfcGFkZGluZ190b3ApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGNfY29udHJhaW50cyAoKSB7XG4gICAgICAgIHZhciBub3RfZml4ZWRfbWFyZ2luID1cbiAgICAgICAgICAgICAgICArbm90X2ZpeGVkX3NlbFxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ21hcmdpbi10b3AnKVxuICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJ3AnKVswXTtcbiAgICAgICAgdmFyIG5vdF9maXhlZF9oZWlnaHQgPVxuICAgICAgICAgICAgICAgIG5vdF9maXhlZF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAgICAgLmhlaWdodDtcblxuICAgICAgICBub3RfZml4ZWRfZGlzdGFuY2UgPSBub3RfZml4ZWRfbWFyZ2luICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbm90X2ZpeGVkX2hlaWdodDtcblxuICAgICAgICB2YXIgZml4ZWRfYmJveF9oZWlnaHQgPSBmaXhlZF9zZWxcbiAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgLmhlaWdodDtcblxuICAgICAgICBwYWRkZWRfcGFkX29uX2ZpeGVkX3BhZGRpbmdfdG9wID0gZml4ZWRfYmJveF9oZWlnaHQgKyAncHgnO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgYm90dG9tID0gcmVxdWlyZSgnLi9ib3R0b20nKSgpO1xudmFyIGJlaGFuY2UgPSByZXF1aXJlKCcuL2RhdGEnKSgpO1xudmFyIGRlcGFydG1lbnRzID0gcmVxdWlyZSgnLi4vZGVwYXJ0bWVudHMnKSgpO1xudmFyIHRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtJykoKTtcbnZhciBsaWdodGJveCA9IHJlcXVpcmUoJy4vbGlnaHRib3gnKSgpO1xudmFyIHNjcm9sbHRvID0gcmVxdWlyZSgnLi9zY3JvbGx0bycpKHsgZHVyYXRpb246IDEwMDAgfSk7XG52YXIgZml4ZWQgPSByZXF1aXJlKCcuL2ZpeGVkJykoKTtcbnZhciBsYXlvdXRfaW1hZ2UgPSByZXF1aXJlKCcuL2xheW91dF9pbWFnZScpKCk7XG52YXIgbGF5b3V0X2ZpeGVkID0gcmVxdWlyZSgnLi9sYXlvdXRfZml4ZWQnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbnRhaW5lcl9zZWwsXG4gICAgICAgIGluZmluaXRlX3Njcm9sbF9ib29sID0gZmFsc2UsXG4gICAgICAgIGRhdGEgPSBbXSxcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsLFxuICAgICAgICBkZXBhcnRtZW50X2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIHdvcmtfc2VsLFxuICAgICAgICBpc28sXG4gICAgICAgIGxheW91dCA9ICdpbWFnZScsXG4gICAgICAgIGxheW91dHMgPSB7XG4gICAgICAgICAgICBpbWFnZToge1xuICAgICAgICAgICAgICAgIHJlbmRlcjogcmVuZGVyX2ltYWdlLFxuICAgICAgICAgICAgICAgIHJlc2l6ZTogcmVzaXplX2ltYWdlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZml4ZWQ6IHtcbiAgICAgICAgICAgICAgICByZW5kZXI6IHJlbmRlcl9maXhlZCxcbiAgICAgICAgICAgICAgICByZXNpemU6IHJlc2l6ZV9maXhlZFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBpbnRyb19zZWwsXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5Jyk7XG5cbiAgICBiZWhhbmNlLmRpc3BhdGNoXG4gICAgICAgIC5vbignZGF0YScsIGZ1bmN0aW9uIChyZXF1ZXN0ZWQpIHtcbiAgICAgICAgICAgIGJvdHRvbS5kaXJ0eShmYWxzZSk7XG5cbiAgICAgICAgICAgIGlmICghcmVxdWVzdGVkKSB0aHJvdyAnV29yay4gR290IG5vIGRhdGEuJztcbiAgICAgICAgICAgIHZhciB0cmFuc2Zvcm1lZCA9IHRyYW5zZm9ybShyZXF1ZXN0ZWQub2JqZWN0cyk7XG5cbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmNvbmNhdCh0cmFuc2Zvcm1lZCk7XG4gICAgICAgICAgICByZW5kZXIoKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBmaWx0ZXJhYmxlIGxpc3RcbiAgICAgICAgICAgIGRlcGFydG1lbnRzLmlzRmlsdGVyYWJsZSh0cmFuc2Zvcm1lZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZW5kT2ZEYXRhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYm90dG9tLmRpc3BhdGNoLm9uKCdib3R0b20ud29yaycsIG51bGwpO1xuICAgICAgICB9KTtcblxuICAgIGZpeGVkLmRpc3BhdGNoXG4gICAgICAgIC5vbignYWN0aXZhdG9yVmlzaWJsZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBkZXBhcnRtZW50cy5hY3RpdmF0b3JWaXNpYmxlKGQpO1xuICAgICAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnaW4td29yaycsIGQpO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmZpbHRlcnMgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkZXBhcnRtZW50X2NvbnRhaW5lcl9zZWw7XG4gICAgICAgIGRlcGFydG1lbnRfY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmludHJvID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gaW50cm9fc2VsO1xuICAgICAgICBpbnRyb19zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5sYXlvdXQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsYXlvdXQ7XG4gICAgICAgIGxheW91dCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmxpZ2h0Ym94Q29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbGlnaHRib3guY29udGFpbmVyKCk7XG4gICAgICAgIGxpZ2h0Ym94LmNvbnRhaW5lcihfKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuaW5maW5pdGVTY3JvbGwgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBpbmZpbml0ZV9zY3JvbGxfYm9vbDtcbiAgICAgICAgaW5maW5pdGVfc2Nyb2xsX2Jvb2wgPSBfO1xuXG4gICAgICAgIGlmIChpbmZpbml0ZV9zY3JvbGxfYm9vbCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgYm90dG9tXG4gICAgICAgICAgICAgICAgLmNvbnRhaW5lcihjb250YWluZXJfc2VsKTtcblxuICAgICAgICAgICAgYm90dG9tLmRpc3BhdGNoXG4gICAgICAgICAgICAgICAgLm9uKCdib3R0b20ud29yaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tLmRpcnR5KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBiZWhhbmNlLmZldGNoX2RhdGEoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBzZXRfaW50cm9faGVpZ2h0KCk7XG5cbiAgICAgICAgaWYgKCFjb250YWluZXJfc2VsKSB0aHJvdyBcIldvcmsgcmVxdWlyZXMgYSBjb250YWluZXJcIjtcbiAgICAgICAgY29udGFpbmVyX3NlbC5jYWxsKGFkZF9zdHJ1Y3R1cmUpO1xuICAgICAgICBsYXlvdXRfZml4ZWQuY29udGFpbmVyKHdvcmtfY29udGFpbmVyX3NlbCk7XG4gICAgICAgIGxheW91dF9pbWFnZS5jb250YWluZXIod29ya19jb250YWluZXJfc2VsKTtcblxuICAgICAgICBpZiAoaW5maW5pdGVfc2Nyb2xsX2Jvb2wpIGJvdHRvbS5hdHRhY2hXaW5kb3dFdmVudHMoKTtcblxuICAgICAgICAvLyB3aWxsIGJlIHRoZSB0aGluZyB0byBjYWxsIHJlbmRlclxuICAgICAgICBiZWhhbmNlLmZldGNoX2RhdGEoKTtcblxuICAgICAgICAvLyBmaWx0ZXJpbmdcbiAgICAgICAgZGVwYXJ0bWVudHMuZGlzcGF0Y2hcbiAgICAgICAgICAgIC5vbignY2xpY2sud29yaycsIGZ1bmN0aW9uIChkZXBhcnRtZW50KSB7XG5cbiAgICAgICAgICAgIHNjcm9sbHRvKGZpeGVkLnRvcCgpICsgMTApO1xuXG4gICAgICAgICAgICBpZiAoZGVwYXJ0bWVudCA9PT0gJ2FsbCcpIGRlcGFydG1lbnQgPSAnJztcblxuICAgICAgICAgICAgaWYgKGlzbykge1xuICAgICAgICAgICAgICAgIGlzby5hcnJhbmdlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyOiBmdW5jdGlvbiAoaXRlbUVsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkMy5zZWxlY3QoaXRlbUVsZW0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoZGVwYXJ0bWVudCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgZml4ZWQuaW5pdGlhbGl6ZSgpO1xuXG4gICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgICAgICAub24oJ3Jlc2l6ZS53b3JrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlc2l6ZSgpO1xuICAgICAgICAgICAgICAgIHNldF9pbnRyb19oZWlnaHQoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZW5kZXIgKCkge1xuICAgICAgICBsYXlvdXRzW2xheW91dF0ucmVuZGVyKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzaXplICgpIHtcbiAgICAgICAgbGF5b3V0c1tsYXlvdXRdLnJlc2l6ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcl9maXhlZCAoKSB7XG4gICAgICAgIHdvcmtfc2VsID0gd29ya19jb250YWluZXJfc2VsLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpO1xuXG4gICAgICAgIHZhciB3b3JrX3NlbF9lbnRlciA9IHdvcmtfc2VsXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2Jyk7XG5cbiAgICAgICAgbGF5b3V0X2ZpeGVkXG4gICAgICAgICAgICAuYXR0cmlidXRlcyh3b3JrX3NlbF9lbnRlcik7XG4gICAgICAgIHZhciBtYXNvbnJ5ID0gbGF5b3V0X2ZpeGVkLm1hc29ucnkoKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV93aWR0aCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAnZml4ZWQtcGllY2UgcGllY2UgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBkLnJpc2RfcHJvZ3JhbV9jbGFzcyArXG4gICAgICAgICAgICAgICAgICAgICAgICAnIG9yaWVudGF0aW9uLScgKyBkLm9yaWVudGF0aW9uO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLXdyYXBwZXInKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkLm1hc29ucnlfaGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLm1ldGFfc3BhY2UpICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2UtaW1nLXdyYXBwZXInKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X3dpZHRoO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGQubWFzb25yeV9oZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQubWV0YV9zcGFjZSkgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmNhbGwoYWRkX2ltYWdlKTtcbiAgICAgICAgXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS1tZXRhLXdyYXBwZXInKVxuICAgICAgICAgICAgICAgIC5jYWxsKGFkZF9tZXRhKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlci50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kZWxheShmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICogNTA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIHdvcmtfc2VsLm9uKCdjbGljay53b3JrJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKGxpZ2h0Ym94LnNob3cpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWlzbykge1xuICAgICAgICAgICAgaXNvID0gbmV3IElzb3RvcGUod29ya19jb250YWluZXJfc2VsLm5vZGUoKSwge1xuICAgICAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjogJy5waWVjZScsXG4gICAgICAgICAgICAgICAgbWFzb25yeTogbWFzb25yeVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3b3JrX3NlbF9lbnRlci5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpc28uYXBwZW5kZWQodGhpcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlzby5sYXlvdXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlcl9pbWFnZSAoKSAge1xuICAgICAgICB3b3JrX3NlbCA9IHdvcmtfY29udGFpbmVyX3NlbC5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKTtcblxuICAgICAgICB2YXIgd29ya19zZWxfZW50ZXIgPSB3b3JrX3NlbFxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdpbWFnZS1waWVjZSBwaWVjZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGQucmlzZF9wcm9ncmFtX2NsYXNzO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxheW91dF9pbWFnZVxuICAgICAgICAgICAgLmF0dHJpYnV0ZXMod29ya19zZWxfZW50ZXIpO1xuICAgICAgICB2YXIgbWFzb25yeSA9IGxheW91dF9pbWFnZS5tYXNvbnJ5KCk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X2hlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2Utd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLmNhbGwoYWRkX2ltYWdlKTtcbiAgICAgICAgXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS1tZXRhLXdyYXBwZXInKVxuICAgICAgICAgICAgICAgIC5jYWxsKGFkZF9tZXRhKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlci50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kZWxheShmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpICogNTA7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDEpO1xuXG4gICAgICAgIHdvcmtfc2VsLm9uKCdjbGljay53b3JrJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jYWxsKGxpZ2h0Ym94LnNob3cpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWlzbykge1xuICAgICAgICAgICAgaXNvID0gbmV3IElzb3RvcGUod29ya19jb250YWluZXJfc2VsLm5vZGUoKSwge1xuICAgICAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjogJy5waWVjZScsXG4gICAgICAgICAgICAgICAgbWFzb25yeTogbWFzb25yeVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpc28udW5iaW5kUmVzaXplKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3b3JrX3NlbF9lbnRlci5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpc28uYXBwZW5kZWQodGhpcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlzby5sYXlvdXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2l6ZV9pbWFnZSAoKSB7XG5cbiAgICAgICAgbGF5b3V0X2ltYWdlXG4gICAgICAgICAgICAuYXR0cmlidXRlcyh3b3JrX3NlbCk7XG4gICAgICAgIHZhciBtYXNvbnJ5ID0gbGF5b3V0X2ltYWdlLm1hc29ucnkoKTtcblxuICAgICAgICB3b3JrX3NlbFxuICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV93aWR0aCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaXNvKSB7XG4gICAgICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWwubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiBtYXNvbnJ5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlzby5vcHRpb25zLm1hc29ucnkgPSBtYXNvbnJ5O1xuICAgICAgICAgICAgaXNvLmxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzaXplX2ZpeGVkICgpIHtcblxuICAgICAgICBsYXlvdXRfZml4ZWRcbiAgICAgICAgICAgIC5hdHRyaWJ1dGVzKHdvcmtfc2VsKTtcbiAgICAgICAgdmFyIG1hc29ucnkgPSBsYXlvdXRfZml4ZWQubWFzb25yeSgpO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV9oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya19zZWxcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5waWVjZS13cmFwcGVyJylcbiAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGQubWFzb25yeV9oZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgZC5tZXRhX3NwYWNlKSArICdweCc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbFxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnBpZWNlLWltZy13cmFwcGVyJylcbiAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfd2lkdGg7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZC5tYXNvbnJ5X2hlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICBkLm1ldGFfc3BhY2UpICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaXNvKSB7XG4gICAgICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWwubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiBtYXNvbnJ5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlzby51bmJpbmRSZXNpemUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlzby5vcHRpb25zLm1hc29ucnkgPSBtYXNvbnJ5O1xuICAgICAgICAgICAgaXNvLmxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX3N0cnVjdHVyZSAoc2VsKSAge1xuICAgICAgICB2YXIgZGVwdF9jb250YWluZXJfc2VsID0gZGVwYXJ0bWVudF9jb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdhcnRpY2xlJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdkZXBhcnRtZW50cyBncmlkIHotMTUnKTtcblxuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWwgPSBzZWwuYXBwZW5kKCdhcnRpY2xlJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd3b3JrIGdyaWQgei0xMCAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3dvcmstbGF5b3V0LScgKyBsYXlvdXQpO1xuXG4gICAgICAgIGRlcGFydG1lbnRzXG4gICAgICAgICAgICAuY29udGFpbmVyKGRlcHRfY29udGFpbmVyX3NlbClcbiAgICAgICAgICAgIC5tb2JpbGUoZDMuc2VsZWN0KCcubmF2LW1vYmlsZScpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuXG4gICAgICAgIGZpeGVkXG4gICAgICAgICAgICAubm90Rml4ZWQoaW50cm9fc2VsKVxuICAgICAgICAgICAgLmZpeGVkKGRlcGFydG1lbnRfY29udGFpbmVyX3NlbClcbiAgICAgICAgICAgIC5wYWRPbkZpeGVkKHNlbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX21ldGEgKHNlbCkge1xuICAgICAgICBzZWwuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdHVkZW50LW5hbWUgcGllY2UtbWV0YScpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0dWRlbnRfbmFtZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jpc2QtcHJvZ3JhbSBwaWVjZS1tZXRhJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQucmlzZF9wcm9ncmFtO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX2ltYWdlIChzZWwpIHtcbiAgICAgICAgc2VsLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLnNyYztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldF9pbnRyb19oZWlnaHQgKCkge1xuICAgICAgICB2YXIgaGVpZ2h0ID1cbiAgICAgICAgICAgIGludHJvX3NlbFxuICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0ICtcbiAgICAgICAgICAgIHBhcnNlSW50KGludHJvX3NlbC5zdHlsZSgnbWFyZ2luLXRvcCcpLCAxMCkgK1xuICAgICAgICAgICAgcGFyc2VJbnQoaW50cm9fc2VsLnN0eWxlKCdtYXJnaW4tYm90dG9tJyksIDEwKTtcblxuICAgICAgICBpZiAoaGVpZ2h0IDwgd2luZG93LmlubmVySGVpZ2h0KSB7XG4gICAgICAgICAgICB2YXIgZGlmZmVyZW5jZSA9IHdpbmRvdy5pbm5lckhlaWdodCAtIGhlaWdodDtcbiAgICAgICAgICAgIGludHJvX3NlbC5zdHlsZSgncGFkZGluZy1ib3R0b20nLCBkaWZmZXJlbmNlICsgJ3B4Jyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsYXlvdXRfZml4ZWQgKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGNvbnRhaW5lcl9zZWw7XG4gICAgdmFyIGNvdW50ZXIgPSB7XG4gICAgICAgIHRhbGw6IDAsXG4gICAgICAgIHdpZGU6IDBcbiAgICB9O1xuICAgIHZhciBmcmVxdWVuY3kgPSB7XG4gICAgICAgIGxhcmdlOiAxNSxcbiAgICAgICAgdGFsbDogOCxcbiAgICAgICAgd2lkZTogNlxuICAgIH07XG4gICAgdmFyIG1ldGFfc3BhY2UgPSA1MDtcbiAgICB2YXIgbWFzb25yeSA9IHtcbiAgICAgICAgZ3V0dGVyOiAwLFxuICAgICAgICBjb2x1bW5XaWR0aDogMCxcbiAgICAgICAgY29sdW1uV2lkdGhEb3VibGU6IDBcbiAgICB9O1xuXG4gICAgc2VsZi5tYXNvbnJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbWFzb25yeTtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXR0cmlidXRlcyA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgY291bnRlciA9IDA7XG4gICAgICAgIG1hc29ucnkgPSBtYXNvbnJ5X3NldHRpbmdzKCk7XG5cbiAgICAgICAgc2VsLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGQubWV0YV9zcGFjZSA9IG1ldGFfc3BhY2U7XG4gICAgICAgICAgICB2YXIgbXVsdGlwbGllciA9IDE7XG5cbiAgICAgICAgICAgIGlmIChpICUgZnJlcXVlbmN5LmxhcmdlID09PSAwKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBsYXJnZVxuICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgPSAyO1xuXG4gICAgICAgICAgICAgICAgaWYgKChkLmNvdmVyLm9yaWdpbmFsX3dpZHRoL1xuICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF9oZWlnaHQpID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBkLm9yaWVudGF0aW9uID0gJ2xhbmRzY2FwZSc7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZC5vcmllbnRhdGlvbiA9ICdwb3J0cmFpdCc7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X3dpZHRoID1cbiAgICAgICAgICAgICAgICAgICAgKG1hc29ucnkuY29sdW1uV2lkdGggKlxuICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGllcikgK1xuICAgICAgICAgICAgICAgICAgICAoKG11bHRpcGxpZXIgPT09IDEpID9cbiAgICAgICAgICAgICAgICAgICAgICAwIDogbWFzb25yeS5ndXR0ZXIpO1xuXG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X2hlaWdodCA9IGQubWFzb25yeV93aWR0aDtcblxuICAgICAgICAgICAgfSBlbHNlIGlmICgoZC5jb3Zlci5vcmlnaW5hbF93aWR0aC9cbiAgICAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfaGVpZ2h0KSA+IDEpIHtcblxuICAgICAgICAgICAgICAgIC8vIGxhbmRzY2FwZVxuICAgICAgICAgICAgICAgIGNvdW50ZXIud2lkZSArPSAxO1xuICAgICAgICAgICAgICAgIGlmIChjb3VudGVyLndpZGUgJSBmcmVxdWVuY3kud2lkZSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyID0gMjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPVxuICAgICAgICAgICAgICAgICAgICAobWFzb25yeS5jb2x1bW5XaWR0aCAqXG4gICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyKSArXG4gICAgICAgICAgICAgICAgICAgICgobXVsdGlwbGllciA9PT0gMSkgP1xuICAgICAgICAgICAgICAgICAgICAgIDAgOiBtYXNvbnJ5Lmd1dHRlcik7XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfaGVpZ2h0ID0gZC5tYXNvbnJ5X3dpZHRoO1xuICAgICAgICAgICAgICAgIGQub3JpZW50YXRpb24gPSAnbGFuZHNjYXBlJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gcG9ydHJhaXRcbiAgICAgICAgICAgICAgICBjb3VudGVyLnRhbGwgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlci50YWxsICUgZnJlcXVlbmN5LnRhbGwgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGllciA9IDI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X2hlaWdodCA9XG4gICAgICAgICAgICAgICAgICAgIChtYXNvbnJ5LmNvbHVtbldpZHRoICpcbiAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIpICtcbiAgICAgICAgICAgICAgICAgICAgKChtdWx0aXBsaWVyID09PSAxKSA/XG4gICAgICAgICAgICAgICAgICAgICAgMCA6IG1hc29ucnkuZ3V0dGVyKTtcblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV93aWR0aCA9IG1hc29ucnkuY29sdW1uV2lkdGg7XG4gICAgICAgICAgICAgICAgZC5vcmllbnRhdGlvbiA9ICdwb3J0cmFpdCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYXNvbnJ5X3NldHRpbmdzICgpIHtcbiAgICAgICAgdmFyIHRvdGFsX3dvcmtfd2lkdGggPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC53aWR0aDtcblxuICAgICAgICB2YXIgbnVtYmVyX29mX2NvbHVtbnMgPSAyO1xuXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSA3NjgpIHtcbiAgICAgICAgICAgIG51bWJlcl9vZl9jb2x1bW5zID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBndXR0ZXIgPSAwO1xuICAgICAgICB2YXIgY29sdW1uX3dpZHRoID0gKHRvdGFsX3dvcmtfd2lkdGggLyBudW1iZXJfb2ZfY29sdW1ucykgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGd1dHRlciAqIChudW1iZXJfb2ZfY29sdW1ucyAtIDEpKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ3V0dGVyOiBndXR0ZXIsXG4gICAgICAgICAgICBjb2x1bW5XaWR0aDogY29sdW1uX3dpZHRoLFxuICAgICAgICAgICAgY29sdW1uRG91YmxlV2lkdGg6IGNvbHVtbl93aWR0aCAqIDIgKyBndXR0ZXJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsYXlvdXRfaW1hZ2UgKCkge1xuICAgIHZhciBzZWxmID0ge307XG4gICAgdmFyIGNvbnRhaW5lcl9zZWw7XG4gICAgdmFyIG1ldGFfc3BhY2UgPSAzNTtcbiAgICB2YXIgY291bnRlciA9IDA7XG4gICAgdmFyIGZyZXF1ZW5jeSA9IDE0O1xuICAgIHZhciBtYXNvbnJ5ID0ge1xuICAgICAgICBndXR0ZXI6IDAsXG4gICAgICAgIGNvbHVtbldpZHRoOiAwLFxuICAgICAgICBjb2x1bW5XaWR0aERvdWJsZTogMFxuICAgIH07XG5cbiAgICBzZWxmLm1hc29ucnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtYXNvbnJ5O1xuICAgIH07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hdHRyaWJ1dGVzID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgbWFzb25yeSA9IG1hc29ucnlfc2V0dGluZ3MoKTtcblxuICAgICAgICBzZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKChkLmNvdmVyLm9yaWdpbmFsX3dpZHRoL1xuICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX2hlaWdodCkgPlxuICAgICAgICAgICAgICAgIDEuOCkge1xuXG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X3dpZHRoID0gbWFzb25yeS5jb2x1bW5Eb3VibGVXaWR0aDtcbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfaGVpZ2h0ID1cbiAgICAgICAgICAgICAgICAgICAgKChkLm1hc29ucnlfd2lkdGggKlxuICAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfaGVpZ2h0KS9cbiAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfd2lkdGgpICsgbWV0YV9zcGFjZTtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3VudGVyICs9IDE7XG5cbiAgICAgICAgICAgICAgICAvLyBtYWtlIGV2ZXJ5IDV0aCBvbmUgYmlnLlxuICAgICAgICAgICAgICAgIGlmIChjb3VudGVyICUgZnJlcXVlbmN5ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGQubWFzb25yeV93aWR0aCA9XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXNvbnJ5LmNvbHVtbkRvdWJsZVdpZHRoO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGQubWFzb25yeV93aWR0aCA9IG1hc29ucnkuY29sdW1uV2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGQubWFzb25yeV9oZWlnaHQgPVxuICAgICAgICAgICAgICAgICAgICAoKGQubWFzb25yeV93aWR0aCAqXG4gICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF9oZWlnaHQpL1xuICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF93aWR0aCkgK1xuICAgICAgICAgICAgICAgICAgICBtZXRhX3NwYWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWFzb25yeV9zZXR0aW5ncyAoKSB7XG4gICAgICAgIHZhciB0b3RhbF93b3JrX3dpZHRoID0gY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAud2lkdGg7XG5cbiAgICAgICAgdmFyIG51bWJlcl9vZl9jb2x1bW5zID0gMjtcblxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gNzY4KSB7XG4gICAgICAgICAgICBudW1iZXJfb2ZfY29sdW1ucyA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZ3V0dGVyID0gMDtcbiAgICAgICAgdmFyIGNvbHVtbl93aWR0aCA9ICh0b3RhbF93b3JrX3dpZHRoIC8gbnVtYmVyX29mX2NvbHVtbnMpIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChndXR0ZXIgKiAobnVtYmVyX29mX2NvbHVtbnMgLSAxKSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGd1dHRlcjogZ3V0dGVyLFxuICAgICAgICAgICAgY29sdW1uV2lkdGg6IGNvbHVtbl93aWR0aCxcbiAgICAgICAgICAgIGNvbHVtbkRvdWJsZVdpZHRoOiBjb2x1bW5fd2lkdGggKiAyICsgZ3V0dGVyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlnaHRib3ggKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbnRhaW5lcl9zZWwsXG4gICAgICAgIHNlbGVjdGVkX3NlbCxcbiAgICAgICAgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnNob3cgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGlja2VkJyk7XG4gICAgICAgIGNvbnNvbGUubG9nKHNlbCk7XG4gICAgICAgIGlmICghY29udGFpbmVyX3NlbCkgdGhyb3cgXCJMaWdodGJveC4gUmVxdWlyZXMgY29udGFpbmVyLlwiO1xuXG4gICAgICAgIHNlbGVjdGVkX3NlbCA9IHNlbDtcblxuICAgICAgICB2YXIgZGF0YSA9IHNlbC5kYXR1bSgpO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9ncmlkX3NlbCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9tZXRhX3NlbCA9XG4gICAgICAgICAgICBsaWdodGJveF9ncmlkX3NlbFxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEnKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfd29ya19zZWwgPVxuICAgICAgICAgICAgbGlnaHRib3hfZ3JpZF9zZWxcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsXG4gICAgICAgICAgICAgICAgICAgICAgJ2xpZ2h0Ym94LXdvcmsgJytcbiAgICAgICAgICAgICAgICAgICAgICAnb2Zmc2V0LXBlcmNlbnQtMi0xMCAnK1xuICAgICAgICAgICAgICAgICAgICAgICdjb2wtcGVyY2VudC04LTEwJyk7XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9zZWxcbiAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLFxuICAgICAgICAgICAgICAgICAgIChwYXJzZUludChsaWdodGJveF93b3JrX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ21hcmdpbi1sZWZ0JykpIC0gMjApICsgJ3B4Jyk7XG5cbiAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgIC5vbigncmVzaXplLmxpZ2h0Ym94JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxpZ2h0Ym94X21ldGFfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKHBhcnNlSW50KGxpZ2h0Ym94X3dvcmtfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdtYXJnaW4tbGVmdCcpKSAtIDIwKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAncHgnKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdoMicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtdGl0bGUnKVxuICAgICAgICAgICAgLnRleHQoZGF0YS5wcm9qZWN0X25hbWUpO1xuXG4gICAgICAgIGlmIChkYXRhLnByb2plY3RfbmFtZSAhPSBkYXRhLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBsaWdodGJveF93b3JrX3NlbFxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1kZXNjcmlwdGlvbicpXG4gICAgICAgICAgICAgICAgLnRleHQoZGF0YS5kZXNjcmlwdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBsaWdodGJveF93b3JrX3NlbC5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhLm1vZHVsZXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZScpXG4gICAgICAgICAgICAuZWFjaChhZGRfbW9kdWxlcyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X21ldGFfaW5mb19zZWwgPSBsaWdodGJveF9tZXRhX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8nKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXN0dWRlbnQtbmFtZScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnN0dWRlbnRfbmFtZSk7XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvLS1yaXNkLXByb2dyYW0nKVxuICAgICAgICAgICAgLnRleHQoZGF0YS5yaXNkX3Byb2dyYW0pO1xuXG4gICAgICAgIGlmIChkYXRhLnBlcnNvbmFsX2xpbmsubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXBlcnNvbmFsLWxpbmsnKVxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2EnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdocmVmJywgZGF0YS5wZXJzb25hbF9saW5rKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJylcbiAgICAgICAgICAgICAgICAudGV4dCgnUGVyc29uYWwgV2Vic2l0ZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvLS1wZXJzb25hbC1saW5rJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2EnKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCBkYXRhLnVybClcbiAgICAgICAgICAgIC5hdHRyKCd0YXJnZXQnLCAnX2JsYW5rJylcbiAgICAgICAgICAgIC50ZXh0KCdCZWhhbmNlIFBvcnRmb2xpbycpO1xuXG4gICAgICAgIGNvbnRhaW5lcl9zZWwuY2xhc3NlZCgnYWN0aXZlJywgdHJ1ZSk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ25vLXNjcm9sbCcsIHRydWUpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCdpbi1saWdodGJveCcsIHRydWUpO1xuXG4gICAgICAgIGNvbnRhaW5lcl9zZWwub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNsb3NlICgpIHtcbiAgICAgICAgY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmNsYXNzZWQoJ2FjdGl2ZScsIGZhbHNlKVxuICAgICAgICAgICAgLmh0bWwoJycpO1xuXG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ25vLXNjcm9sbCcsIGZhbHNlKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnaW4tbGlnaHRib3gnLCBmYWxzZSk7XG5cbiAgICAgICAgY29udGFpbmVyX3NlbC5vbignY2xpY2snLCBudWxsKTtcbiAgICAgICAgXG4gICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgICAgICAub24oJ3Jlc2l6ZS5saWdodGJveCcsIG51bGwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9tb2R1bGVzIChkLCBpKSB7XG4gICAgICAgIHZhciBzZWwgPSBkMy5zZWxlY3QodGhpcyk7XG5cbiAgICAgICAgaWYgKGQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgc2VsLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgICAgICAuYXR0cignc3JjJyxcbiAgICAgICAgICAgICAgICAgICAgZC5zaXplcy5tYXhfMTI0MCA/IGQuc2l6ZXMubWF4XzEyNDAgOiBkLnNyYyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGQudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgICBzZWwuYXBwZW5kKCdwJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2UtbW9kdWxlLXRleHQnKVxuICAgICAgICAgICAgICAgIC50ZXh0KGQudGV4dF9wbGFpbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGQudHlwZSA9PT0gJ2VtYmVkJykge1xuICAgICAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2UtbW9kdWxlLWVtYmVkJylcbiAgICAgICAgICAgICAgICAuaHRtbChkLmVtYmVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNjcm9sbHRvIChhcmdzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmdzIHx8IHt9O1xuICAgIG9wdGlvbnMuZHVyYXRpb24gPSBhcmdzLmR1cmF0aW9uIHx8IDIwMDA7XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxfdHdlZW4gKG9mZnNldCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGkgPSBkMy5pbnRlcnBvbGF0ZU51bWJlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5wYWdlWU9mZnNldCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG8oMCwgaSh0KSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgIGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKG9wdGlvbnMuZHVyYXRpb24pXG4gICAgICAgICAgICAudHdlZW4oJ3Njcm9sbCcsIHNjcm9sbF90d2VlbihvZmZzZXQpKTtcbiAgICB9O1xufTsiLCIvLyByZXF1aXJlcyBkMy5zY2FsZS5vcmRpbmFsXG5tb2R1bGUuZXhwb3J0cyA9IHRyYW5zZm9ybTtcblxuZnVuY3Rpb24gdHJhbnNmb3JtICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHZhciBmb3JtYXR0ZWQgPSBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMoaW5wdXQpO1xuICAgICAgICByZXR1cm4gc2h1ZmZsZShmb3JtYXR0ZWQpO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyAoZGF0YSkge1xuXG4gICAgdmFyIGZvcm1hdHRlZF9kYXRhID0gW107XG5cbiAgICAvLyBkZXRlcm1pbmUgdGhlIGV4dGVudCBvZiB3aWR0aHNcbiAgICB2YXIgYWxsX21vZHVsZXMgPSBbXTtcbiAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgIGFsbF9tb2R1bGVzLnB1c2gobWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICB2YXIgbW9kdWxlc19mb3JfY292ZXIgPSBbXTtcbiAgICAgICAgdmFyIG1vZHVsZXNfdG9faW5jbHVkZSA9IFtdO1xuICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgbW9kdWxlc19mb3JfY292ZXIucHVzaChtZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0aGVzZSBhcmUgYWxsIGNhc2VzIHRoYXQgYXJlXG4gICAgICAgICAgICAvLyBjb3ZlcmVkIGluIGxpZ2h0Ym94LmpzXG4gICAgICAgICAgICBpZiAoKG1kLnR5cGUgPT09ICdpbWFnZScpIHxcbiAgICAgICAgICAgICAgICAobWQudHlwZSA9PT0gJ3RleHQnKSB8XG4gICAgICAgICAgICAgICAgKG1kLnR5cGUgPT09ICdlbWJlZCcpKSB7XG5cbiAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUucHVzaChtZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByYW5kb21fY292ZXI7XG4gICAgICAgIGlmIChtb2R1bGVzX2Zvcl9jb3Zlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyByYW5kb21fY292ZXJfb3B0aW9uXG4gICAgICAgICAgICAvLyBiYXNlZCBvbiBpbWFnZXMgdG8gaW5jbHVkZVxuICAgICAgICAgICAgdmFyIHJhbmRvbV9tb2R1bGUgPVxuICAgICAgICAgICAgICAgIG1vZHVsZXNfZm9yX2NvdmVyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfZm9yX2NvdmVyLmxlbmd0aCldO1xuXG4gICAgICAgICAgICByYW5kb21fY292ZXIgPSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxfd2lkdGg6ICtyYW5kb21fbW9kdWxlLndpZHRoLFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsX2hlaWdodDogK3JhbmRvbV9tb2R1bGUuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHNyYzogcmFuZG9tX21vZHVsZS5zcmNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByYW5kb21fY292ZXIuaGVpZ2h0ID0gKHJhbmRvbV9jb3Zlci53aWR0aCpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZS5oZWlnaHQpL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9tb2R1bGUud2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBvdGhlcndpc2UsIGp1c3QgdXNlIGEgdGhlIGNvdmVyIHRoYXRcbiAgICAgICAgICAgIC8vIGlzIGluY2x1ZGVkXG4gICAgICAgICAgICByYW5kb21fY292ZXIgPSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxfd2lkdGg6IDQwNCxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF9oZWlnaHQ6IDMxNixcbiAgICAgICAgICAgICAgICBzcmM6IGQuZGV0YWlscy5jb3ZlcnNbJzQwNCddXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdHRlZF9kYXRhLnB1c2goe1xuICAgICAgICAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAgICAgICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICAncmlzZF9wcm9ncmFtJzogZC5yaXNkX3Byb2dyYW0sXG4gICAgICAgICAgICAncmlzZF9wcm9ncmFtX2NsYXNzJzpcbiAgICAgICAgICAgICAgICBlc2NhcGVfZGVwYXJ0bWVudChkLnJpc2RfcHJvZ3JhbSksXG4gICAgICAgICAgICAnbW9kdWxlcyc6IG1vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAgICAgICAgICdjb3Zlcic6IHJhbmRvbV9jb3ZlcixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkLmRldGFpbHMuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB1cmw6IGQub3duZXJzWzBdLnVybCxcbiAgICAgICAgICAgIHBlcnNvbmFsX2xpbms6IGQucGVyc29uYWxfbGlua1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmb3JtYXR0ZWRfZGF0YTtcbn1cblxuZnVuY3Rpb24gc2h1ZmZsZSAobykge1xuICAgIGZvcih2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoO1xuICAgICAgICBpO1xuICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksXG4gICAgICAgIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgcmV0dXJuIG87XG59XG5cbmZ1bmN0aW9uIGVzY2FwZV9kZXBhcnRtZW50KGQpIHtcbiAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xufSJdfQ==
