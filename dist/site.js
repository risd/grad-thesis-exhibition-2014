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
                '300': utility.scaleProportional,
                '768': utility.scaleProportionalX,
                '1024': utility.scaleProportionalX
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
                  'h111.95'+
                  'c0,0,709.259,0,819.199,0'+
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
        available;

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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2RlcGFydG1lbnRzLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2xvZ28vaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvbG9nby9zY2FsZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9sb2dvL3N2Zy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L25hdi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2JvdHRvbS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2RhdGEuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29yay9maXhlZC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGF5b3V0X2ZpeGVkLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGF5b3V0X2ltYWdlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGlnaHRib3guanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29yay9zY3JvbGx0by5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL3RyYW5zZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9KQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDek9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbGZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3paQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBjb250YWluZXJfc2VsLFxuICAgICAgICBtb2JpbGVfY29udGFpbmVyX3NlbCxcbiAgICAgICAgZGVwdGFydG1lbnRfc2VsLFxuICAgICAgICBtb2JpbGVfZGVwYXJ0bWVudF9zZWwsXG4gICAgICAgIG1vYmlsZV9hY3RpdmF0b3Jfc2VsLFxuICAgICAgICBtb2JpbGVfYmxhbmtldF9zZWwsXG4gICAgICAgIG1vYmlsZV9hY3RpdmUgPSBmYWxzZSxcbiAgICAgICAgc2VsZWN0ZWQgPSAnQWxsJyxcbiAgICAgICAgY2xzID0gJ2RlcGFydG1lbnQnLFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdjbGljaycpO1xuXG4gICAgdmFyIGRlcGFydG1lbnRzID0gW1xuICAgICAgICAnQWxsJyxcbiAgICAgICAgJ0FyY2hpdGVjdHVyZScsXG4gICAgICAgICdDZXJhbWljcycsXG4gICAgICAgICdEaWdpdGFsICsgTWVkaWEnLFxuICAgICAgICAnRnVybml0dXJlIERlc2lnbicsXG4gICAgICAgICdHbGFzcycsXG4gICAgICAgICdHcmFwaGljIERlc2lnbicsXG4gICAgICAgICdJbmR1c3RyaWFsIERlc2lnbicsXG4gICAgICAgICdJbnRlcmlvciBBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnSmV3ZWxyeSArIE1ldGFsc21pdGhpbmcnLFxuICAgICAgICAnTGFuZHNjYXBlIEFyY2hpdGVjdHVyZScsXG4gICAgICAgICdQYWludGluZycsXG4gICAgICAgICdQaG90b2dyYXBoeScsXG4gICAgICAgICdQcmludG1ha2luZycsXG4gICAgICAgICdTY3VscHR1cmUnLFxuICAgICAgICAnVGV4dGlsZXMnXG4gICAgXTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLm1vYmlsZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG1vYmlsZV9jb250YWluZXJfc2VsO1xuICAgICAgICBtb2JpbGVfY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmFjdGl2YXRvclZpc2libGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIW1vYmlsZV9hY3RpdmF0b3Jfc2VsKSByZXR1cm47XG4gICAgICAgIG1vYmlsZV9hY3RpdmF0b3Jfc2VsLmNsYXNzZWQoJ3Zpc2libGUnLCBfKTtcbiAgICB9O1xuXG4gICAgc2VsZi5zZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRlcHRhcnRtZW50X3NlbDtcbiAgICAgICAgZGVwdGFydG1lbnRfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXNBcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcImRlcGFydG1lbnRzIGlzIGEgZ2V0dGVyXCI7XG4gICAgICAgIHJldHVybiBkZXBhcnRtZW50cztcbiAgICB9O1xuXG4gICAgc2VsZi5pc0ZpbHRlcmFibGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBjaGVja19maWx0ZXJhYmxlKGRhdGEpO1xuICAgICAgICB1cGRhdGVfZGVwYXJ0bWVudF9zZWwoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWNvbnRhaW5lcl9zZWwpIHRocm93IFwicmVxdWlyZXMgYSB3cmFwcGVyXCI7XG5cbiAgICAgICAgdmFyIGRhdGEgPSBkZXBhcnRtZW50cy5tYXAoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciB2ID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6IGQsXG4gICAgICAgICAgICAgICAgZXNjYXBlZDogZXNjYXBlX2RlcGFydG1lbnQoZCksXG4gICAgICAgICAgICAgICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoZCA9PT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2LnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2LmZpbHRlcmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyBzZXR1cCBzdHJ1Y3R1cmVcbiAgICAgICAgbW9iaWxlX2FjdGl2YXRvcl9zZWwgPSBtb2JpbGVfY29udGFpbmVyX3NlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBjbHMgKyAnLWFjdGl2YXRvcicpXG4gICAgICAgICAgICAudGV4dChzZWxlY3RlZClcbiAgICAgICAgICAgIC5vbignY2xpY2submF2QWN0aXZhdG9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG1vYmlsZV9hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9uYXYoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIG1vYmlsZV9ibGFua2V0X3NlbCA9IG1vYmlsZV9jb250YWluZXJfc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGNscyArICctYmxhbmtldCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrLm5hdkJsYW5rZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbW9iaWxlX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9uYXYoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIG1vYmlsZV9kZXBhcnRtZW50X3NlbCA9IG1vYmlsZV9jb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgY2xzICsgJy1lbGVtZW50cyBkZXBhcnRtZW50cycpXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKGNscylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBrbHMgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoZC5maWx0ZXJhYmxlKSBrbHMgKz0gJyBmaWx0ZXJhYmxlJztcbiAgICAgICAgICAgICAgICBpZiAoZC5zZWxlY3RlZCkga2xzICs9ICcgc2VsZWN0ZWQnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubmFtZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NsaWNrLmRlcGFydG1lbnRzJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IHJlc3BvbmRzIHRvIGZpbHRlcmFibGUgaXRlbXNcbiAgICAgICAgICAgICAgICBpZiAoIWQuZmlsdGVyYWJsZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZGVwYXJ0bWVudF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGRkLCBkaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGQuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBkLnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2xpY2soZC5lc2NhcGVkKTtcblxuICAgICAgICAgICAgICAgIHVwZGF0ZV9kZXBhcnRtZW50X3NlbCgpO1xuXG4gICAgICAgICAgICAgICAgbW9iaWxlX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZC5uYW1lO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9uYXYoKTtcblxuICAgICAgICAgICAgICAgIGRlcGFydG1lbnRfc2VsLmRhdGEobW9iaWxlX2RlcGFydG1lbnRfc2VsLmRhdGEoKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGUgYnVzaW5lc3NcblxuICAgICAgICBkZXBhcnRtZW50X3NlbCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoY2xzKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtscyA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChkLmZpbHRlcmFibGUpIGtscyArPSAnIGZpbHRlcmFibGUnO1xuICAgICAgICAgICAgICAgIGlmIChkLnNlbGVjdGVkKSBrbHMgKz0gJyBzZWxlY3RlZCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5uYW1lO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2suZGVwYXJ0bWVudHMnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgcmVzcG9uZHMgdG8gZmlsdGVyYWJsZSBpdGVtc1xuICAgICAgICAgICAgICAgIGlmICghZC5maWx0ZXJhYmxlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBkZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZGQsIGRpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZC5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGQuc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jbGljayhkLmVzY2FwZWQpO1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlX2RlcGFydG1lbnRfc2VsKCk7XG5cbiAgICAgICAgICAgICAgICBtb2JpbGVfYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBkLm5hbWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlX25hdigpO1xuXG4gICAgICAgICAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsLmRhdGEoZGVwYXJ0bWVudF9zZWwuZGF0YSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbmF2ICgpIHtcbiAgICAgICAgbW9iaWxlX2NvbnRhaW5lcl9zZWwuY2xhc3NlZCgnYWN0aXZlJywgbW9iaWxlX2FjdGl2ZSk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ25vLXNjcm9sbCcsIG1vYmlsZV9hY3RpdmUpO1xuICAgICAgICBtb2JpbGVfYWN0aXZhdG9yX3NlbC50ZXh0KHNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfZGVwYXJ0bWVudF9zZWwgKCkge1xuICAgICAgICBkZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgLmNsYXNzZWQoJ2ZpbHRlcmFibGUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmZpbHRlcmFibGU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zZWxlY3RlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBtb2JpbGVfZGVwYXJ0bWVudF9zZWxcbiAgICAgICAgICAgIC5jbGFzc2VkKCdmaWx0ZXJhYmxlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5maWx0ZXJhYmxlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja19maWx0ZXJhYmxlIChkYXRhKSB7XG4gICAgICAgIC8vIGdpdmVuIHNvbWUgZGF0YSwgY2hlY2sgdG8gc2VlIGlmXG4gICAgICAgIC8vIGVhY2ggY2F0ZWdvcnkgaXMgZmlsdGVyYWJsZVxuICAgICAgICBcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkZCwgZGkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQucmlzZF9wcm9ncmFtID09PSBkZC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZC5maWx0ZXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGRkLCBkaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5yaXNkX3Byb2dyYW0gPT09IGRkLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRkLmZpbHRlcmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVzY2FwZV9kZXBhcnRtZW50KGQpIHtcbiAgICAgICAgcmV0dXJuIGQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgTmF2ID0gcmVxdWlyZSgnLi9vdmVybGF5L25hdicpLFxuICAgIExvZ28gPSByZXF1aXJlKCcuL2xvZ28vaW5kZXgnKSxcbiAgICBXb3JrID0gcmVxdWlyZSgnLi93b3JrL2luZGV4Jyk7XG5cbnZhciB3b3JrX2FyZ3MgPSBwYXJzZV91cmxfZm9yX3dvcmsod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuXG5zaXRlKClcbiAgICAuY29sb3JzKClcbiAgICAub3ZlcmxheSgpXG4gICAgLmxvZ28oKVxuICAgIC53b3JrKHdvcmtfYXJncylcbiAgICAucmV2ZWFsKCk7XG5cblxuZnVuY3Rpb24gcGFyc2VfdXJsX2Zvcl93b3JrIChwYXRoKSB7XG4gICAgY29uc29sZS5sb2cocGF0aCk7XG4gICAgdmFyIGlzX2l0X2xpdmUgPSBmYWxzZTtcbiAgICB2YXIgd2hpY2hfbGF5b3V0ID0gJ2ltYWdlJztcbiAgICBpZiAocGF0aC5pbmRleE9mKCd3b3JrJykgPiAtMSkge1xuICAgICAgICBpc19pdF9saXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHBhdGguaW5kZXhPZignZml4ZWQnKSA+IC0xKSB7XG4gICAgICAgIHdoaWNoX2xheW91dCA9ICdmaXhlZCc7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGxpdmU6IGlzX2l0X2xpdmUsXG4gICAgICAgIGxheW91dDogd2hpY2hfbGF5b3V0XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc2l0ZSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29sb3JfdmFsdWVzID0ge1xuICAgICAgICAgICAgcHVycGxlOiAncmdiKDM4LCAzNCwgOTgpOycsXG4gICAgICAgICAgICBvcmFuZ2U6ICdyZ2IoMjU1LCA2MSwgNTYpOycsXG4gICAgICAgICAgICAnbHQtcHVycGxlJzogJ3JnYigxNDYsIDUzLCAxMjUpJyxcbiAgICAgICAgICAgIGJsdWU6ICdyZ2IoNDMsIDg5LCAxODQpJ1xuICAgICAgICB9LFxuICAgICAgICB1c2VfaW1hZ2VzX2FzX292ZXJsYXlfYmFja2dyb3VuZCA9IHRydWUsXG4gICAgICAgIGJhY2tncm91bmRfaW1hZ2Vfcm90YXRpb25fbWV0aG9kID0gJ2Jsb2NrJyxcbiAgICAgICAgYmFja2dyb3VuZF9pbWFnZV9yb3RhdGlvbl9tZXRob2RzID0gWydmYWRlJywgJ2Jsb2NrJ10sXG4gICAgICAgIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIHZhciBjb2xvcnMgPSBPYmplY3Qua2V5cyhjb2xvcl92YWx1ZXMpO1xuXG4gICAgdmFyIG5hdiA9IE5hdigpO1xuICAgIHZhciBsb2dvID0gTG9nbygpO1xuICAgIHZhciB3b3JrID0gV29yaygpO1xuXG4gICAgc2VsZi5jb2xvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByYW5kb21faW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb2xvcnMubGVuZ3RoKTtcblxuICAgICAgICB2YXIgY29sb3IgPSBjb2xvcnNbcmFuZG9tX2luZGV4XTtcbiAgICAgICAgdmFyIGFsdF9jb2xvcnMgPSBjb2xvcnMuc2xpY2UoMCxyYW5kb21faW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbmNhdChjb2xvcnMuc2xpY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21faW5kZXggKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JzLmxlbmd0aCkpO1xuXG4gICAgICAgIHZhciBhbHRfY29sb3IgPSBhbHRfY29sb3JzW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRfY29sb3JzLmxlbmd0aCldO1xuXG4gICAgICAgIGJvZHkuY2xhc3NlZCgnYm9keS0nICsgY29sb3IsIHRydWUpO1xuICAgICAgICBib2R5LmNsYXNzZWQoJ2JvZHktYWx0LScgKyBhbHRfY29sb3IsIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLm92ZXJsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYWlycyA9IGQzLnNlbGVjdEFsbCgnLm92ZXJsYXktbmF2LWl0ZW0nKVxuICAgICAgICAgICAgLmRhdHVtKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGF0YXNldDsgfSk7XG5cbiAgICAgICAgbmF2LnNlbGVjdGlvbihwYWlycylcbiAgICAgICAgICAgIC5zZXR1cCgpXG4gICAgICAgICAgICAuYXR0YWNoUmVzaXplKCk7XG5cbiAgICAgICAgLy8gc2V0dXAgY2xpY2sgdHJhY2tpbmcgd2l0aCBnb29nbGUgYW5hbHl0aWNzXG4gICAgICAgIG5hdi5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdhc3Rlcmlza0NsaWNrJywgZnVuY3Rpb24gKG92ZXJsYWlkX2Jvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9nYXEpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAob3ZlcmxhaWRfYm9vbGVhbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBvcGVuaW5nXG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR29CdXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBc3RlcmlzayBDbGljayAtIE9wZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdIb21lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zaW5nXG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR29CdXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBc3RlcmlzayBDbGljayAtIENsb3NlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQWJvdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmxvZ28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZ28uY29udGFpbmVyKGQzLnNlbGVjdCgnLmxvZ28tbGluZScpKVxuICAgICAgICAgICAgLmF0dGFjaFJlc2l6ZSgpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYud29yayA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIGlmIChhcmdzLmxpdmUpIHtcbiAgICAgICAgICAgIC8vIHNldCB1cFxuICAgICAgICAgICAgd29yay5jb250YWluZXIoZDMuc2VsZWN0KCcud29yay1jb250YWluZXInKSlcbiAgICAgICAgICAgICAgICAuZmlsdGVycyhkMy5zZWxlY3QoJy5kZXBhcnRtZW50LWNvbnRhaW5lcicpKVxuICAgICAgICAgICAgICAgIC5pbmZpbml0ZVNjcm9sbCh0cnVlKVxuICAgICAgICAgICAgICAgIC5sYXlvdXQoYXJncy5sYXlvdXQpXG4gICAgICAgICAgICAgICAgLmxpZ2h0Ym94Q29udGFpbmVyKGQzLnNlbGVjdCgnLmxpZ2h0Ym94JykpXG4gICAgICAgICAgICAgICAgLmludHJvKGQzLnNlbGVjdCgnLmludHJvLXF1b3RlJykpXG4gICAgICAgICAgICAgICAgLmluaXRpYWxpemUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLndvcmstc2VjdGlvbicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgZDMuc2VsZWN0KCcubGlnaHRib3gnKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZXZlYWwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB2ZW5kb3IgPVxuICAgICAgICAgICAgW1wiXCIsIFwiLXdlYmtpdC1cIiwgXCItbW96LVwiLCBcIi1tcy1cIiwgXCItby1cIl0ucmVkdWNlKFxuICAgICAgICAgICAgZnVuY3Rpb24gKHAsIHYpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdiArXG4gICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2Zvcm1cIiBpbiBkb2N1bWVudC5ib2R5LnN0eWxlID8gdiA6IHA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgdmFyIHRyYXZlbCA9ICgtKHdpbmRvdy5pbm5lckhlaWdodCowLjgpKTtcbiAgICAgICAgdmFyIHRyYW5zZnJvbV9zdGFydCA9ICd0cmFuc2xhdGUoMHB4LCcgKyB0cmF2ZWwgKyAncHgpJztcbiAgICAgICAgdmFyIHRyYW5zZnJvbV9lbmQgPSAndHJhbnNsYXRlKDBweCwwcHgpJztcbiAgICAgICAgdmFyIHJldmVhbCA9IGQzLnNlbGVjdEFsbCgnLnJldmVhbC1tZScpO1xuXG4gICAgICAgIHJldmVhbFxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMClcbiAgICAgICAgICAgIC5zdHlsZSh2ZW5kb3IrJ3RyYW5zZm9ybScsIHRyYW5zZnJvbV9zdGFydCk7XG5cbiAgICAgICAgcmV2ZWFsXG4gICAgICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZGVsYXkoODAwKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDEyMDApXG4gICAgICAgICAgICAuZWFzZSgnY3ViaWMtaW5vdXQnKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSlcbiAgICAgICAgICAgIC5zdHlsZVR3ZWVuKHZlbmRvcisndHJhbnNmb3JtJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQzLmludGVycG9sYXRlU3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmcm9tX3N0YXJ0LFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmcm9tX2VuZCk7XG5cbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn0iLCJ2YXIgY29ubmVjdExvZ29TY2FsZSA9IHJlcXVpcmUoJy4vc2NhbGUnKTtcbnZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi9zdmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsb2dvICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCxcbiAgICAgICAgbG9nb19zdmcsXG4gICAgICAgIGxvZ29fdGV4dF9zZWwsXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsLFxuICAgICAgICBzdHJhaWdodF9saW5lID0gZDMuc3ZnLmxpbmUoKSxcbiAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlID0gY29ubmVjdExvZ29TY2FsZSgpLFxuICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWw7XG5cbiAgICB2YXIgdXRpbGl0eSA9IFV0aWxpdHkoKTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbG9nb19jb250YWluZXJfc2VsO1xuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kZWxheVBhc3RSZXZlYWwgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkZWxheV9wYXN0X3JldmVhbF9zZWw7XG4gICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmF0dGFjaFJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93X3NlbFxuICAgICAgICAgICAgLm9uKCdyZXNpemUubG9nbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZWNhbHVsYXRlX2xvZ29fbGluZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyBzZXQgdXAgc3ZnXG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgbG9nb19zdmcgPSBsb2dvX2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3cuaW5uZXJXaWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93LmlubmVySGVpZ2h0KTtcblxuICAgICAgICAvLyBzZWxlY3Rpb24gb2YgdGhlIHRleHQgdGhhdCB3aWxsIGRlZmluZSB0aGUgbGluZVxuICAgICAgICBsb2dvX3RleHRfc2VsID0gZDMuc2VsZWN0KCdoZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcubG9nby10ZXh0LWNvbXBvbmVudCcpO1xuXG4gICAgICAgIC8vIHZlcnRpY2llcyBmb3IgXG4gICAgICAgIHZhciB0ZXh0X3ZlcnRpY2llcyA9IGxvZ29fbGluZV90ZXh0X3ZlcnRpY2llcyhsb2dvX3RleHRfc2VsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X3dpZHRoKTtcbiAgICAgICAgdmFyIGNvbm5lY3Rpbmdfc2VnbWVudHMgPVxuICAgICAgICAgICAgICAgIGxvZ29fbGluZV9jb25uZWN0aW5nX3NlZ21lbnRzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd193aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICB2YXIgbWVyZ2VkX2QgPSBtZXJnZV9saW5lcyh0ZXh0X3ZlcnRpY2llcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdGluZ19zZWdtZW50cyk7XG5cbiAgICAgICAgbG9nb19saW5lX21lcmdlZF9zZWwgPSBsb2dvX3N2Zy5zZWxlY3RBbGwoJy5sb2dvLWxpbmUtbWVyZ2VkJylcbiAgICAgICAgICAgIC5kYXRhKFttZXJnZWRfZF0pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xvZ28tbGluZS1tZXJnZWQnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQ7IH0pO1xuXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsLmNhbGwodHdlZW5faW4pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiByZWNhbHVsYXRlX2xvZ29fbGluZSAoKSB7XG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgbG9nb19zdmdcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvd193aWR0aClcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICBpZiAobG9nb19saW5lX21lcmdlZF9zZWwpIHtcbiAgICAgICAgICAgIHVwZGF0ZV9sb2dvX2xpbmUod2luZG93X3dpZHRoLCB3aW5kb3dfaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9sb2dvX2xpbmUgKHd3aWR0aCwgd2hlaWdodCkge1xuICAgICAgICB2YXIgdGV4dF92ZXJ0aWNpZXMgPSBsb2dvX2xpbmVfdGV4dF92ZXJ0aWNpZXMobG9nb190ZXh0X3NlbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd3aWR0aCk7XG4gICAgICAgIHZhciBjb25uZWN0aW5nX3NlZ21lbnRzID1cbiAgICAgICAgICAgICAgICBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWdtZW50cyh0ZXh0X3ZlcnRpY2llcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3d2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlaWdodCk7XG5cbiAgICAgICAgdmFyIG1lcmdlZF9kID0gbWVyZ2VfbGluZXModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpbmdfc2VnbWVudHMpO1xuXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsXG4gICAgICAgICAgICAuZGF0YShbbWVyZ2VkX2RdKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZDsgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nb19saW5lX3RleHRfdmVydGljaWVzIChzZWwsIHd3aWR0aCkge1xuICAgICAgICB2YXIgdGV4dF92ZXJ0aWNpZXMgPSBbXTtcblxuICAgICAgICBzZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgdmFyIGJvdW5kcyA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB2YXIgZmlyc3QsIHNlY29uZDtcbiAgICAgICAgICAgIGlmIChpID09PSAwKSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgKyAzLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC40NSkpKV07XG4gICAgICAgICAgICAgICAgc2Vjb25kID0gW2JvdW5kcy5yaWdodCArIDYsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjQ1KSkpXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGkgPT09IDEpIHwgKGkgPT09IDIpKSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgLSAyLFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC40NSkpKV07XG4gICAgICAgICAgICAgICAgc2Vjb25kID0gW2JvdW5kcy5yaWdodCArIDYsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjQ1KSkpXTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaSA9PT0gMykge1xuICAgICAgICAgICAgICAgIGlmICh3d2lkdGggPCA3NjgpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgLSA2LFxuICAgICAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNTUpKSldO1xuICAgICAgICAgICAgICAgICAgICBzZWNvbmQgPSBbYm91bmRzLnJpZ2h0ICsgNixcbiAgICAgICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjU1KSkpXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmaXJzdCA9IFtib3VuZHMucmlnaHQgKyA2LFxuICAgICAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNTUpKSldO1xuICAgICAgICAgICAgICAgICAgICBzZWNvbmQgPSBbYm91bmRzLmxlZnQgLSA2LFxuICAgICAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNTUpKSldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGV4dF92ZXJ0aWNpZXMucHVzaChbZmlyc3QsIHNlY29uZF0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0ZXh0X3ZlcnRpY2llcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWdtZW50cyAoc3RhcnRfZW5kX3BvaW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVpZ2h0KSB7XG4gICAgICAgIHZhciBsaW5lX3NpemVfdG9fZHJhdyA9XG4gICAgICAgICAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlLmNob29zZV9zaXplKHd3aWR0aCwgd2hlaWdodCk7XG5cbiAgICAgICAgdmFyIGNvbm5lY3Rpbmdfc2VnbWVudHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFydF9lbmRfcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGlmICgoaSsxKSA8IHN0YXJ0X2VuZF9wb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gc3RhcnRfZW5kX3BvaW50c1tpXVsxXSxcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gc3RhcnRfZW5kX3BvaW50c1tpKzFdWzBdO1xuXG4gICAgICAgICAgICAgICAgY29ubmVjdGluZ19zZWdtZW50c1xuICAgICAgICAgICAgICAgICAgICAucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3RfbG9nb19zY2FsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zY2FsZVtsaW5lX3NpemVfdG9fZHJhd10oc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29ubmVjdGluZ19zZWdtZW50cztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtZXJnZV9saW5lcyh0ZXh0X3ZlcnRpY2llcywgY29ubmVjdGluZ19zZWdtZW50cykge1xuICAgICAgICAvLyB0YWtlcyBhcnJheSBvZiB2ZXJ0ZXggcGFpcnMsIGFuZCBwYXRoXG4gICAgICAgIC8vIGVsZW1lbnRzIG9mIGNvbm5lY3Rpbmcgc2VnbWVudHMuXG4gICAgICAgIC8vIHJldHVybnMgb24gcGF0aCBkIGF0dHJpYnV0ZVxuICAgICAgICB2YXIgZCA9ICcnO1xuXG4gICAgICAgIHZhciB0ZW1wX3N2ZyA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKTtcbiAgICAgICAgdmFyIHRlbXBfcGF0aCA9IHRlbXBfc3ZnXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCd0ZW1wLXBhdGgnKVxuICAgICAgICAgICAgLmRhdGEodGV4dF92ZXJ0aWNpZXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cignZCcsIHN0cmFpZ2h0X2xpbmUpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAndGVtcC1wYXRoJylcbiAgICAgICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG5cbiAgICAgICAgdGVtcF9wYXRoLmVhY2goZnVuY3Rpb24gKHRkLCB0aSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codGQpO1xuICAgICAgICAgICAgdmFyIHRleHRfZCA9IGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdkJyk7XG4gICAgICAgICAgICBkICs9IHRleHRfZDtcbiAgICAgICAgICAgIGlmIChjb25uZWN0aW5nX3NlZ21lbnRzW3RpXSkge1xuICAgICAgICAgICAgICAgIHZhciBjb25uZWN0aW5nX2QgPSBjb25uZWN0aW5nX3NlZ21lbnRzW3RpXTtcbiAgICAgICAgICAgICAgICBkICs9IGNvbm5lY3RpbmdfZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdXRpbGl0eS5jb252ZXJ0VG9SZWxhdGl2ZSh0ZW1wX3BhdGguYXR0cignZCcsIGQpLm5vZGUoKSk7XG4gICAgICAgIC8vIHJlcGxhY2UgYWxsIGBtYCBpbnN0cnVjdGlvbnMgd2l0aCBgbGAsIGV4Y2VwdFxuICAgICAgICAvLyBmb3IgdGhlIGZpcnN0IG9uZS4gdGhpcyBpcyBhIHJldmVyc2UgcmVnZXhcbiAgICAgICAgZCA9IHRlbXBfcGF0aC5hdHRyKCdkJykucmVwbGFjZSgvKD8hXiltL2csICdsJyk7XG5cbiAgICAgICAgdGVtcF9zdmcucmVtb3ZlKCk7XG4gICAgICAgIHRlbXBfcGF0aC5yZW1vdmUoKTtcblxuICAgICAgICByZXR1cm4gZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2Vlbl9pbihwYXRoKSB7XG4gICAgICAgIHBhdGgudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24oODAwMClcbiAgICAgICAgICAgIC5hdHRyVHdlZW4oJ3N0cm9rZS1kYXNoYXJyYXknLCB0d2VlbkRhc2gpXG4gICAgICAgICAgICAuZWFjaCgnZW5kJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBkYXNoIGFycmF5LCBhcyByZXNpemluZ1xuICAgICAgICAgICAgICAgIC8vIHRoZSBicm93c2VyIHdpbGwgY2hhbmdlIHRoZSBsZW5ndGhcbiAgICAgICAgICAgICAgICAvLyBhbmQgdGhlcmUgaXMgbm8gbmVlZCB0byByZS1jb21wdXRlXG4gICAgICAgICAgICAgICAgLy8gdGhlIGRhc2ggYXJyYXkgdG8gZml0IGl0LlxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKCdzdHJva2UtZGFzaGFycmF5JywgJ25vbmUnKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuRGFzaCgpIHtcbiAgICAgICAgdmFyIGwgPSB0aGlzLmdldFRvdGFsTGVuZ3RoKCksXG4gICAgICAgICAgICBpID0gZDMuaW50ZXJwb2xhdGVTdHJpbmcoJzAsJyArIGwsIGwgKyBcIixcIiArIGwpO1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHsgcmV0dXJuIGkodCk7IH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX2NvbG9yX3N0b3BzIChzZWwpe1xuICAgICAgICBzZWwuYXBwZW5kKCdzdG9wJylcbiAgICAgICAgICAgIC5hdHRyKCdvZmZzZXQnLCAnMCUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0b3AtY29sb3InLCAnd2hpdGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0b3Atb3BhY2l0eScsIDApO1xuICAgICAgICBzZWwuYXBwZW5kKCdzdG9wJylcbiAgICAgICAgICAgIC5hdHRyKCdvZmZzZXQnLCAnMTAwJScpXG4gICAgICAgICAgICAuYXR0cignc3RvcC1jb2xvcicsICd3aGl0ZScpXG4gICAgICAgICAgICAuYXR0cignc3RvcC1vcGFjaXR5JywgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi9zdmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsb2dvX3NjYWxlICgpIHtcbiAgICB2YXIgdXRpbGl0eSA9IFV0aWxpdHkoKTtcblxuICAgIHZhciBzZWdtZW50cyA9IFt7XG4gICAgICAgICAgICBmcm9tOiAnUklTRCcsXG4gICAgICAgICAgICB0bzogJ0dyYWQnLFxuICAgICAgICAgICAgc2NhbGVVc2luZzoge1xuICAgICAgICAgICAgICAgICczMDAnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsLFxuICAgICAgICAgICAgICAgICc3NjgnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWCxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxYXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhd25fZGVsdGE6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtMjcuOTk5OTg0NTkyMTk5MzI2LFxuICAgICAgICAgICAgICAgICAgICB5OiA0OTAuNjMxOTg4NTI1MzkwNlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzc2OCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTUuOTAwMDMxMDg5NzgyNzE1LFxuICAgICAgICAgICAgICAgICAgICB5OiAzNDMuMzc0MDIzNDM3NVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0wLjE2OTk4NTI5NDM0MjA0MTAyLFxuICAgICAgICAgICAgICAgICAgICB5OiAzOTEuNDY4OTYzNjIzMDQ2OVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAgICczMDAnOiAnTS0wLjQ2OSwwJytcbiAgICAgICAgICAgICAgICAgICdoNC45OTMnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMCwyMy41OTcsMCw1Mi4wNzMnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDYzLjE0LDQ5LjQyMSw5OS4wOTcsMTExLjg0LDk5LjA5NycrXG4gICAgICAgICAgICAgICAgICAnYzEyNy41LDAsOTAuOTU5LTExNi43ODMsMTYuMzgyLTExNi43ODMnK1xuICAgICAgICAgICAgICAgICAgJ2MtMjMuNjM2LDAtNDguMjY3LDAtNDguMjY3LDAnK1xuICAgICAgICAgICAgICAgICAgJ3YxNjUuOTUxJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDQ3LjI1MSw3Ni40ODQsOTQuOTQ2LDk1Ljg5NycrXG4gICAgICAgICAgICAgICAgICAnYzU0LjkyNSwyMi4zNTUsNTUuMjQyLTU4Ljk2OSwzLjEyOC00Ni4zMDInK1xuICAgICAgICAgICAgICAgICAgJ2MtMzAuNjgsNy40NTctOTUuNTQ4LDc3LjQyMS0xNjEuMDY2LDcwLjY0MScrXG4gICAgICAgICAgICAgICAgICAnYy03MC42MjItNy4zMDgtNDEuMTIyLTk1LjMwOCwyNC4wNDQtNTYuNjQxJytcbiAgICAgICAgICAgICAgICAgICdjMTQyLjQ4Myw4NC41NDItNzguMDQ1LDE3OS44NTktNzguMDQ1LDE4Mi41OTMnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDguNzI5LDAsNDQuMTA2LDAsNDQuMTA2JytcbiAgICAgICAgICAgICAgICAgICdoNC4wNDUnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTUsMGg1ODAuNzE5JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLTEzLjA4NywyNi42NzQtNDkuNTQ0LDQ3LjAyMycrXG4gICAgICAgICAgICAgICAgICAnYy0zMy4yNzEsMTguNTcyLTQ4LjYwNSwxMy40MzgtODUuMzQsNTAuNjgxJytcbiAgICAgICAgICAgICAgICAgICdjLTU2Ljk0OSw1Ny43MzctMy4xNjYsMTg2LjI5My0xNDUuODQ0LDE4Ni4yOTMnK1xuICAgICAgICAgICAgICAgICAgJ2MtMzMuMTM4LDAtOTkuODgsMC4wMDMtOTkuODgsMC4wMDNsMC0yMTUuMTA1JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDE0LjI5My0wLjEzNCwzNC41LDAnK1xuICAgICAgICAgICAgICAgICAgJ2MxNzAuMzYyLDEuMTI4LDE3Ni42MDgsMTUzLjcxMyw1NC42MDgsMTUzLjcxMycrXG4gICAgICAgICAgICAgICAgICAnYy0xNTMsMC0xMjguMzMzLTE2NS43OTEtMjMyLjk2LTE2NS43OTEnK1xuICAgICAgICAgICAgICAgICAgJ0MxLjMzNiw1Ni44MTctNS4yNjMsMzQzLjM3NC01LjI2MywzNDMuMzc0JytcbiAgICAgICAgICAgICAgICAgICdoNC41MjknLFxuICAgICAgICAgICAgICAgICcxMDI0JzogJ000LjEwNywwJytcbiAgICAgICAgICAgICAgICAgICdoMTExLjk1JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDcwOS4yNTksMCw4MTkuMTk5LDAnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDgzLjg3Mi0zMS4xMzIsMTI5LjYxNS0xNjUuNTkyLDEyOS42MTUnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTM1LjI3NCwwLDI1LjY4OSwyMTQuNTY1LTIwMy43ODYsMjE0LjU2NScrXG4gICAgICAgICAgICAgICAgICAnYy01My4yOTgsMC0xNjAuNjQxLDAuMDA1LTE2MC42NDEsMC4wMDUnK1xuICAgICAgICAgICAgICAgICAgJ2wwLTI4Ni4wOTInK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsOTEuNjA2LDAsMTI0LjEwNiwwJytcbiAgICAgICAgICAgICAgICAgICdjMTYwLjMzNCwwLDE1MS4zMzQsMjAzLjEzNSw1LjIxNCwyMDMuMTM1JytcbiAgICAgICAgICAgICAgICAgICdjLTE1Ni45NTgsMC0yNjYuMzY0LTE2Mi4wOTktMzcyLjY1NC0xNjIuMDk5JytcbiAgICAgICAgICAgICAgICAgICdjLTEwOC4xOTUsMC0xNjQuNDYyLDEyMS45MjYtMTY0LjQ2MiwyOTIuMzQnK1xuICAgICAgICAgICAgICAgICAgJ2MzLjc5NywwLDEwLjYwMywwLDEwLjYwMywwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBmcm9tOiAnR3JhZCcsXG4gICAgICAgICAgICB0bzogJ1Nob3cnLFxuICAgICAgICAgICAgc2NhbGVVc2luZzoge1xuICAgICAgICAgICAgICAgICczMDAnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWCxcbiAgICAgICAgICAgICAgICAnNzY4JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFgsXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXduX2RlbHRhOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMzQ0LjE0MDAxNDY0ODQzNzUsXG4gICAgICAgICAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICc3NjgnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDc4Ni4wNTI5NzY0ODkwNjcxLFxuICAgICAgICAgICAgICAgICAgICB5OiAwLjAwMDAyMTc1NTY5NTM0MzAxNzU3OFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDEyNjAuNTAwMDYyNDY1NjY3NyxcbiAgICAgICAgICAgICAgICAgICAgeTogLTAuMDAwMDM3OTY4MTU4NzIxOTIzODNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF0aHM6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogJ00wLTAuMTM4JyArXG4gICAgICAgICAgICAgICAgICAgICAgICdjODMuNjI3LDAuNjIsMjM4Ljc1NSwwLDM0NC4xNCwwJyxcbiAgICAgICAgICAgICAgICAnNzY4JzogJ00xLjY5OC0wLjczNCcrXG4gICAgICAgICAgICAgICAgICAnSDknK1xuICAgICAgICAgICAgICAgICAgJ3YxNzkuOTUnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAtMjMuMzMyLDAtNjUuNDc4LDAnK1xuICAgICAgICAgICAgICAgICAgJ2MwLTEyOC41ODgsMTA4LjI3LTI0My4wNDUsMjU5LjMzOS0yNDMuMDQ1JytcbiAgICAgICAgICAgICAgICAgICdDNDQ5LjI4OS02My44MjksNDE2LjkzNCwyMjMsMTMzLjk2NiwyMjMnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTY3LjY0MSwwLTE3LjIxNS0xOTAuNTM0LDI0Mi44MDgtMTkwLjUzNCcrXG4gICAgICAgICAgICAgICAgICAnQzY0Ni43NTEsMzIuNDY2LDY2My43NTEsMTk1LDY2My43NTEsMTk1JytcbiAgICAgICAgICAgICAgICAgICdzLTEzNC4wMSwwLjAxOC0xNjcuNSwwLjAxOCcrXG4gICAgICAgICAgICAgICAgICAnYzAtMTI3LjAxOCw4MS41LTE5NS43NTIsMjYzLjUtMTk1Ljc1MicrXG4gICAgICAgICAgICAgICAgICAnYzYuNDM3LDAsMjgsMCwyOCwwJyxcbiAgICAgICAgICAgICAgICAnMTAyNCc6ICdNMy41MzksMC41ODMnK1xuICAgICAgICAgICAgICAgICAgJ2gxOC40NzYnK1xuICAgICAgICAgICAgICAgICAgJ3YyNDEuMTcnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAtMTAwLjAxOCwwLTE0Ny4wMSwwJytcbiAgICAgICAgICAgICAgICAgICdjMC0xMDIuMjQzLDc1Ljg2Mi0xNTEuNzM3LDE0Ny4wMS0xNTEuNzM3JytcbiAgICAgICAgICAgICAgICAgICdjMTYyLjkyLDAsMjEwLjM1MywyNDUuOTEsMzEwLjk3LDI0NS45MScrXG4gICAgICAgICAgICAgICAgICAnYzE5Ny4zMDIsMCwxMzYuNTQ1LTUzNy43MjMtMTIwLjY5Ni01MzcuNzIzJytcbiAgICAgICAgICAgICAgICAgICdjLTE4OC4yMTEsMC0xNDIuODQxLDMwNy4xMzcsMjc2LDMwNy4xMzcnK1xuICAgICAgICAgICAgICAgICAgJ2MzNDYuMDA1LDAsMzE0LjE0NS0xMDQuNzU3LDY2Ny45ODctMTA0Ljc1NycrXG4gICAgICAgICAgICAgICAgICAnYzM2Ljc1MywwLDEwNy43NjMsMCwxMDcuNzYzLDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGZyb206ICdTaG93JyxcbiAgICAgICAgICAgIHRvOiAnMjAxNCcsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZLFxuICAgICAgICAgICAgICAgICc3NjgnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhd25fZGVsdGE6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtNzUuNTU2MDA1NDc3OTA1MjcsXG4gICAgICAgICAgICAgICAgICAgIHk6IDQ4LjY4OTAwNjgwNTQxOTkyXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnNzY4Jzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgICAgICB5OiAzMjUuMjUwOTg2ODE0NDk4OVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0wLjAwMTAyMjMzODg2NzE4NzUsXG4gICAgICAgICAgICAgICAgICAgIHk6IDQxNS4yMzkwMDgxODgyNDc3XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhdGhzOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6ICdNNzMuNjA2LTQ4LjY4OSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MzLjAzNy0wLjAzMiw1Ljc0LTAuMDUyLDguMDg5LTAuMDUyICcgK1xuICAgICAgICAgICAgICAgICAgICAnYzE1LjMzLDAsNi43ODMtNDkuNjI2LTM1LjMzNy01MS4yNTggJyArXG4gICAgICAgICAgICAgICAgICAgICdjLTQzLTEuNjY3LTcwLjc1LDI0LTc3LjMzMyw1NiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ0MtMzYuNTI2LTE3LjAxNS0xNC42NDEsMC0xLjk1LDAnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTAtMS43MjcnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAtNi02Mi43NjYtNzAuNDg4LTYyLjc2NicrXG4gICAgICAgICAgICAgICAgICAnYy04Mi41MTIsMC0xMjUuNDA1LDEyMi40MDctOC4wMTIsMjA4LjUnK1xuICAgICAgICAgICAgICAgICAgJ0MtNS4xODUsMTk3Ljc3NCwwLDI4My4wMDcsMCwzMjMuNTI0JyxcbiAgICAgICAgICAgICAgICAnMTAyNCc6ICdNMS0yLjI2OCcrXG4gICAgICAgICAgICAgICAgICAnYzAtNTQuOTI3LTM3LjkzOC0xMjAuOTItMTIxLjQ5My0xMjAuOTInK1xuICAgICAgICAgICAgICAgICAgJ2MtMjczLjc4MiwwLTMzMS42ODUsNDcyLjQ1Ni02NzUuMjUyLDQ3Mi40NTYnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTU1LjY1NywwLTE0OS40Ny0xNzUuMzcxLTIuMjE1LTE3NS4zNzEnK1xuICAgICAgICAgICAgICAgICAgJ2MxNzYuNTIzLDAsMjY4LjQ4NywxNzUuNDkxLDQxMi40NzksMTc1LjQ5MScrXG4gICAgICAgICAgICAgICAgICAnYzE0OS45OTIsMCwxNDAuNjI4LTI3Ni4xOTcsMjgyLjEzOC0yNzYuMTk3JytcbiAgICAgICAgICAgICAgICAgICdjNTEuNjY0LDAsODQuMDkxLDM2Ljk2NCw4NC4wOTEsODIuMTA0JytcbiAgICAgICAgICAgICAgICAgICdjMCwxMTguMjA2LTMxNS41MjksMTkyLjM0My0xMjQuNzY4LDE5Mi4zNDMnK1xuICAgICAgICAgICAgICAgICAgJ2MzNS4zMzMsMCwxNDUuMDE5LDAsMTQ1LjAxOSwwJytcbiAgICAgICAgICAgICAgICAgICd2NjUuMzMzJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XTtcblxuICAgIHZhciB0ZW1wX3N2ZyA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgdmFyIHRlbXBfcGF0aCA9IHRlbXBfc3ZnXG4gICAgICAgIC5hcHBlbmQoJ3BhdGgnKTtcblxuICAgIHZhciBtZWFzdXJlX2Zvcl9mZiA9IGZhbHNlO1xuXG4gICAgc2VnbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICBkLnJlbGF0aXZlX3BhdGhzX2QgPSB7fTtcbiAgICAgICAgZC5yZWxhdGl2ZV9wYXRocyA9IHt9O1xuICAgICAgICBkLnNjYWxlID0ge307XG5cbiAgICAgICAgaWYgKG1lYXN1cmVfZm9yX2ZmKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWdtZW50c1tpXS5mcm9tICsgJyAnICsgc2VnbWVudHNbaV0udG8pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgcGF0aF9zaXplIGluIGQucGF0aHMpIHtcbiAgICAgICAgICAgIHRlbXBfcGF0aC5hdHRyKCdkJywgZC5wYXRoc1twYXRoX3NpemVdKTtcbiAgICAgICAgICAgIHV0aWxpdHkuY29udmVydFRvUmVsYXRpdmUodGVtcF9wYXRoLm5vZGUoKSk7XG4gICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzX2RbcGF0aF9zaXplXSA9IHRlbXBfcGF0aC5hdHRyKCdkJyk7XG4gICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0gPSB0ZW1wX3BhdGgubm9kZSgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAobWVhc3VyZV9mb3JfZmYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2l6ZTogJywgcGF0aF9zaXplKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVsdGE6ICcsIHV0aWxpdHkucGF0aERlbHRhKFxuICAgICAgICAgICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZC5zY2FsZVtwYXRoX3NpemVdID1cbiAgICAgICAgICAgICAgICBkLnNjYWxlVXNpbmdbcGF0aF9zaXplXShkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5kcmF3bl9kZWx0YVtwYXRoX3NpemVdKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGVtcF9zdmcucmVtb3ZlKCk7XG4gICAgdGVtcF9wYXRoLnJlbW92ZSgpO1xuXG4gICAgdmFyIHNpemVzID0gT2JqZWN0LmtleXMoc2VnbWVudHNbMF0ucGF0aHMpO1xuICAgIHNlZ21lbnRzLmNob29zZV9zaXplID0gZnVuY3Rpb24gKHdpbmRvd193aWR0aCwgd2luZG93X2hlaWdodCkge1xuICAgICAgICB2YXIgY2hvc2VuID0gMDtcbiAgICAgICAgc2l6ZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPD0gd2luZG93X3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgY2hvc2VuID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjaG9zZW4udG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgd2luZG93LnNlZ21lbnRzID0gc2VnbWVudHM7XG5cbiAgICByZXR1cm4gc2VnbWVudHM7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ZnICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5jb252ZXJ0VG9SZWxhdGl2ZSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIGZ1bmN0aW9uIHNldCh0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIHNlZ3MucmVwbGFjZUl0ZW0ocnNlZywgaSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGR4LCBkeSwgeDAsIHkwLCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgIHNlZ3MgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICBmb3IgKHZhciB4ID0gMCwgeSA9IDAsIGkgPSAwLCBsZW4gPSBzZWdzLm51bWJlck9mSXRlbXM7XG4gICAgICAgICAgICAgaSA8IGxlbjtcbiAgICAgICAgICAgICBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ3MuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICBjICAgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgaWYgKC9bTUxIVkNTUVRBWnpdLy50ZXN0KGMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAtIHg7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAtIHg7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAtIHk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAtIHk7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IC14ICsgKHggPSBzZWcueCk7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IC15ICsgKHkgPSBzZWcueSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdNb3ZldG8nLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdMJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvJyxkeCxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnSCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0xpbmV0b0hvcml6b250YWwnLGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdWJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvVmVydGljYWwnLGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdDJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b0N1YmljJyxkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9DdWJpY1Ntb290aCcsZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1EnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvUXVhZHJhdGljJyxkeCxkeSx4MSx5MSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9RdWFkcmF0aWNTbW9vdGgnLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQXJjJyxkeCxkeSxzZWcucjEsc2VnLnIyLHNlZy5hbmdsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWcubGFyZ2VBcmNGbGFnLHNlZy5zd2VlcEZsYWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1onOiBjYXNlICd6JzogeCA9IHgwOyB5ID0geTA7IGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIHggKz0gc2VnLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyBpbiBzZWcpIHkgKz0gc2VnLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgc3RhcnQgb2YgYSBzdWJwYXRoXG4gICAgICAgICAgICBpZiAoYyA9PSAnTScgfHwgYyA9PSAnbScpIHtcbiAgICAgICAgICAgICAgICB4MCA9IHg7XG4gICAgICAgICAgICAgICAgeTAgPSB5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1ovZywgJ3onKSk7XG4gICAgfTtcblxuICAgIHNlbGYucGF0aERlbHRhID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc3RhcnQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgoMCksXG4gICAgICAgICAgICBlbmQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgocGF0aC5nZXRUb3RhbExlbmd0aCgpKTtcblxuICAgICAgICBkZWx0YS54ID0gZW5kLnggLSBzdGFydC54O1xuICAgICAgICBkZWx0YS55ID0gZW5kLnkgLSBzdGFydC55O1xuXG4gICAgICAgIHJldHVybiBkZWx0YTtcbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBhIHBhdGggZWxlbWVudFxuICAgIC8vIGFuZCB0aGUgcGF0aCBzZWdlbWVudCBpbmRpY2llc1xuICAgIC8vIHRoYXQgd2lsbCBiZSBzY2FsZWRcbiAgICBzZWxmLnNjYWxlQW5jaG9yWSA9IGZ1bmN0aW9uIChwYXRoLCBhbmNob3JzKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZUFuY2hvclknKTtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBzZWxmLnBhdGhEZWx0YShwYXRoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY3VycmVudCBkZWx0YVxuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBhbmNob3JzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvX3JlcGxhY2UgPSBzZWdtZW50cy5nZXRJdGVtKGFuY2hvcnNbbmFtZV0pO1xuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlX3dpdGggPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNSZWwoXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkgKyAoKGRlbHRhLmN1cnJlbnQueS1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGEuZHJhd24ueSkvMiksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS55MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueDIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkyKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlX3dpdGgsIGFuY2hvcnNbbmFtZV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbCA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsJyk7XG4gICAgICAgICAgICBkZWx0YS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGVuZFswXSAtIHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50cy5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IHNlZy54ICAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IHNlZy55ICAqIHJhdGlvLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTW92ZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b0hvcml6b250YWwnLCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvVmVydGljYWwnLCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpY1Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbFkgPSBmdW5jdGlvbiAocGF0aCwgZHJhd25fZGVsdGEpIHtcbiAgICAgICAgLy8gc2NhbGUgeSwgZml0IHhcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBkcmF3bl9kZWx0YVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpLFxuICAgICAgICAgICAgZml0X3ggPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlKGFsbF9zZWdtZW50cywgc2VnbWVudF90b19yZXBsYWNlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIGFsbF9zZWdtZW50cy5yZXBsYWNlSXRlbShyc2VnLCBzZWdtZW50X3RvX3JlcGxhY2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChNYXRoLmFicyhkZWx0YS5kcmF3bi54KSA+IDAuMSkge1xuICAgICAgICAgICAgZml0X3ggPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGVQcm9wb3J0aW9uYWwnKTtcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRlbHRhLmRpZmYgPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54IC0gZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkgLSBkZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgcmF0aW8gPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54L2RlbHRhLmRyYXduLngsXG4gICAgICAgICAgICAgICAgeTogZGVsdGEuY3VycmVudC55L2RlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIG9yaWdpbmFsX2QpO1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgdmFyIGZpcnN0X3NlZ21lbnQgPSBzZWdtZW50cy5nZXRJdGVtKDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3NlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhdGhTZWdUeXBlQXNMZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgPT09ICdtJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50X3NlZyA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0FicyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2VtZW50X3NlZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkeCwgZHksIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgICAgIHggPSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5ID0gc3RhcnRbMV0sXG4gICAgICAgICAgICAgICAgc2VnbWVudF9jb3VudCA9IHNlZ21lbnRzLm51bWJlck9mSXRlbXM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlZ21lbnRfY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzZWcgPSBzZWdtZW50cy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgICAgICBjID0gc2VnLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxO1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDI7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKGZpdF94KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSBkeCA9IHNlZy54ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkZWx0YS5kaWZmLngvKHNlZ21lbnRfY291bnQtMSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSBkeCA9IHNlZy54O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnkgICogcmF0aW8ueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsWUNvbnN0cmFpblggPSBmdW5jdGlvbiAocGF0aCwgZHJhd25fZGVsdGEpIHtcbiAgICAgICAgLy8gc2NhbGUgeSwgZml0IHgsIGFuZCBjb25zdHJhaW4gdGhlXG4gICAgICAgIC8vIG1heGltdW0gd2lkdGggb2YgYW55IGhvcml6b250YWwgbGluZXNcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBkcmF3bl9kZWx0YVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpLFxuICAgICAgICAgICAgZml0X3ggPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlKGFsbF9zZWdtZW50cywgc2VnbWVudF90b19yZXBsYWNlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIGFsbF9zZWdtZW50cy5yZXBsYWNlSXRlbShyc2VnLCBzZWdtZW50X3RvX3JlcGxhY2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChNYXRoLmFicyhkZWx0YS5kcmF3bi54KSA+IDAuMSkge1xuICAgICAgICAgICAgZml0X3ggPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kLCB3d2lkdGgsIHdoZWlnaHQpIHtcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRlbHRhLmRpZmYgPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54IC0gZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkgLSBkZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgcmF0aW8gPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54L2RlbHRhLmRyYXduLngsXG4gICAgICAgICAgICAgICAgeTogZGVsdGEuY3VycmVudC55L2RlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciBtYXggPSB7XG4gICAgICAgICAgICAgICAgeDogd3dpZHRoL2RlbHRhLmRyYXduLndpZHRoXG4gICAgICAgICAgICB9O1xuXG5cbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR4LCBkeSwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICAgICAgeCA9IHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHkgPSBzdGFydFsxXSxcbiAgICAgICAgICAgICAgICBzZWdtZW50X2NvdW50ID0gc2VnbWVudHMubnVtYmVyT2ZJdGVtcztcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VnbWVudF9jb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ21lbnRzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgICAgIGMgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDE7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MjtcbiAgICAgICAgICAgICAgICBpZiAoJ3kxJyBpbiBzZWcpIHkxID0gc2VnLnkxICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyICogcmF0aW8ueTtcbiAgICAgICAgICAgICAgICAvLyBpZiAoZml0X3gpIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKCd4JyBpbiBzZWcpIGR4ID0gc2VnLnggK1xuICAgICAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgKGRlbHRhLmRpZmYueC8oc2VnbWVudF9jb3VudC0xKSk7XG4gICAgICAgICAgICAgICAgLy8gfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyAgICAgaWYgKCd4JyBpbiBzZWcpIGR4ID0gc2VnLng7XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSBkeCA9IHNlZy54ICogbWF4Lng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IHNlZy55ICAqIHJhdGlvLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTW92ZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b0hvcml6b250YWwnLCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvVmVydGljYWwnLCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpY1Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbFggPSBmdW5jdGlvbiAocGF0aCwgZHJhd25fZGVsdGEpIHtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBkcmF3bl9kZWx0YVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2UoYWxsX3NlZ21lbnRzLCBzZWdtZW50X3RvX3JlcGxhY2UsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgYWxsX3NlZ21lbnRzLnJlcGxhY2VJdGVtKHJzZWcsIHNlZ21lbnRfdG9fcmVwbGFjZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZVByb3BvcnRpb25hbFgnKTtcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR4LCBkeSwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICAgICAgeCA9IHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHkgPSBzdGFydFsxXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VnbWVudHMubnVtYmVyT2ZJdGVtczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ21lbnRzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgICAgIGMgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDEgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDIgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTE7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MjtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnICBpbiBzZWcpIGR4ID0gc2VnLnggICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTW92ZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b0hvcml6b250YWwnLCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvVmVydGljYWwnLCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpY1Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbmF2ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB0YXJnZXRfc2VsLFxuICAgICAgICBvdmVybGFpZCA9IGZhbHNlLFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpLFxuICAgICAgICByZW1vdmFibGVfdGV4dCA9IFt7XG4gICAgICAgICAgICB0ZXh0OiAnR28hJ1xuICAgICAgICB9XTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYXN0ZXJpc2tDbGljaycpO1xuXG4gICAgc2VsZi5zZWxlY3Rpb24gPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0YXJnZXRfc2VsO1xuICAgICAgICB0YXJnZXRfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYub3ZlcmxhaWQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvdmVybGFpZDtcbiAgICAgICAgb3ZlcmxhaWQgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5zZXR1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRfc2VsKSB0aHJvdyBcInJlcXVpcmVzIGVsZW1lbnRzIHRvIHBhaXJcIjtcbiAgICAgICAgdGFyZ2V0X3NlbFxuICAgICAgICAgICAgLm9uKCdjbGljay5uYXYnLCBmdW5jdGlvbiAoZCwgZGkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJyNmbG93ZXInKTtcbiAgICAgICAgICAgICAgICBvdmVybGFpZCA9IG92ZXJsYWlkID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlX2RlYWN0aXZhdGUoZCk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hc3Rlcmlza0NsaWNrKG92ZXJsYWlkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHBsYWNlX2J1dHRvbigpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmF0dGFjaFJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgIC5vbigncmVzaXplLm5hdicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBwbGFjZV9idXR0b24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3Njcm9sbC5uYXYnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCd0b3VjaG1vdmUubmF2JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHBsYWNlX2J1dHRvbigpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFjdGl2YXRlX2RlYWN0aXZhdGUgKGQpIHtcbiAgICAgICAgdmFyIG92ZXJsYXkgPSBkMy5zZWxlY3RBbGwoZC5hY3RpdmF0ZSk7XG4gICAgICAgIG92ZXJsYXkuY2xhc3NlZCgnb3ZlcmxhaWQnLCBvdmVybGFpZCk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ25vLXNjcm9sbCcsIG92ZXJsYWlkKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZChkLmJvZHksIG92ZXJsYWlkKTtcbiAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcGxhY2VfYnV0dG9uICgpIHtcblxuICAgICAgICB2YXIgd3dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgICAgIHZhciB3aGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIHZhciBtYXRjaGluZ19zZWw7XG4gICAgICAgIHZhciBiYm94O1xuXG4gICAgICAgIGlmIChvdmVybGFpZCkge1xuICAgICAgICAgICAgYmJveCA9IHRhcmdldF9zZWwubm9kZSgpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdmFyIHBfYmJveCA9IHRhcmdldF9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgncCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB2YXIgdGFyZ2V0X2hlaWdodCA9IGJib3guaGVpZ2h0O1xuICAgICAgICAgICAgbWF0Y2hpbmdfc2VsID1cbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5sb2dvLXRleHQtY29tcG9uZW50LS1yaXNkJyk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRhcmdldF9zZWwuc3R5bGUoJ2xlZnQnLCAod3dpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcF9iYm94LndpZHRoIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmJveC53aWR0aCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgrbWF0Y2hpbmdfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJ3AnKVswXSkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHgnKTtcbiAgICAgICAgICAgIHRhcmdldF9zZWwuc3R5bGUoJ2JvdHRvbScsICh3aGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYm94LmhlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCttYXRjaGluZ19zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3RvcCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF0pKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncHgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1hdGNoaW5nX3NlbCA9XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcubG9nby10ZXh0LWNvbXBvbmVudC0tMjAxNCcpO1xuICAgICAgICAgICAgdGFyZ2V0X3NlbFxuICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcsIG1hdGNoaW5nX3NlbC5zdHlsZSgncmlnaHQnKSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2JvdHRvbScsIG1hdGNoaW5nX3NlbC5zdHlsZSgnYm90dG9tJykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYm90dG9tICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBkaXJ0eSA9IGZhbHNlLFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpLFxuICAgICAgICBib2R5X2hlaWdodDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYm90dG9tJyk7XG5cbiAgICBzZWxmLmRpcnR5ID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGlydHk7XG4gICAgICAgIGRpcnR5ID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXR0YWNoV2luZG93RXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdzY3JvbGwuYm90dG9tJywgY2hlY2tfZGlzcGF0Y2gpXG4gICAgICAgICAgICAub24oJ3RvdWNobW92ZS5ib3R0b20nLCBjaGVja19kaXNwYXRjaCk7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIGNvbnRhaW5lcl9ub2RlID0gY29udGFpbmVyX3NlbC5ub2RlKCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjaGVja19kaXNwYXRjaCAoKSB7XG4gICAgICAgIGlmICghY29udGFpbmVyX25vZGUpIHRocm93IFwiUmVxdWlyZXMgY29udGFpbmVyLlwiO1xuICAgICAgICBpZiAoZGlydHkpIHJldHVybjtcblxuICAgICAgICBib2R5X2hlaWdodCA9IHBhcnNlSW50KGJvZHlfc2VsLnN0eWxlKCdoZWlnaHQnKSk7XG4gICAgICAgIGlmIChib2R5X2hlaWdodCA8PVxuICAgICAgICAgICAgKHdpbmRvdy5pbm5lckhlaWdodCArIHdpbmRvdy5zY3JvbGxZKSkge1xuXG4gICAgICAgICAgICBkaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmJvdHRvbSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRGF0YSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgcmVxdWVzdGVkID0gW10sXG4gICAgICAgIGF2YWlsYWJsZTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnZGF0YScsJ2VuZE9mRGF0YScpO1xuXG4gICAgc2VsZi5mZXRjaF9kYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWF2YWlsYWJsZSkge1xuICAgICAgICAgICAgZDMuanNvbih1cmwgKyAnZGF0YS9tZXRhZGF0YS5qc29uJywgcHJvY2Vzc19tZXRhZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9jZXNzX3JlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzX21ldGFkYXRhIChyYXdfbWV0YSkge1xuICAgICAgICBhdmFpbGFibGUgPSByYXdfbWV0YS5wYWdlcztcbiAgICAgICAgcHJvY2Vzc19yZXF1ZXN0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc19yZXF1ZXN0ICgpIHtcbiAgICAgICAgdmFyIG5leHRfdG9fbG9hZCA9IGNob29zZV9hbmRfcmVtb3ZlX2Zyb21fYXZhaWxhYmxlKCk7XG4gICAgICAgIGlmIChuZXh0X3RvX2xvYWQpIHtcbiAgICAgICAgICAgIGQzLmpzb24obmV4dF90b19sb2FkLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZGF0YShkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5lbmRPZkRhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNob29zZV9hbmRfcmVtb3ZlX2Zyb21fYXZhaWxhYmxlICgpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkO1xuICAgICAgICB2YXIgaW5kZXggPSBNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlLmxlbmd0aDtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSBhdmFpbGFibGUuc3BsaWNlKGluZGV4LCAxKVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxlY3RlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaXhlZCAoKSB7XG4gICAgLy8gd2hlbiBjb250YWluZXIgaGl0cyB0aGUgdG9wLCBzd2l0Y2ggdGhhdCBlbGVtZW50IHRvIGZpeGVkXG4gICAgLy8gcGx1cyB0aGUgYWRkaXRpb25hbCBwYWRkaW5nXG5cbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBub3RfZml4ZWRfc2VsLFxuICAgICAgICBmaXhlZF9zZWwsXG4gICAgICAgIHBhZF9vbl9maXhlZF9zZWwsXG4gICAgICAgIG9yaWdpbmFsX3BhZF9vbl9maXhlZF9wYWRkaW5nX3RvcCA9ICcxcHgnLFxuICAgICAgICBwYWRkZWRfcGFkX29uX2ZpeGVkX3BhZGRpbmdfdG9wLFxuICAgICAgICBub3RfZml4ZWRfZGlzdGFuY2UgPSAwLFxuICAgICAgICBmaXhlZF9jbGFzcyA9ICdmaXhlZCc7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FjdGl2YXRvclZpc2libGUnKTtcblxuICAgIHNlbGYubm90Rml4ZWQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBub3RfZml4ZWRfc2VsO1xuICAgICAgICBub3RfZml4ZWRfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZml4ZWQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBmaXhlZF9zZWw7XG4gICAgICAgIGZpeGVkX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnBhZE9uRml4ZWQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBwYWRfb25fZml4ZWRfc2VsO1xuICAgICAgICBwYWRfb25fZml4ZWRfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYudG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbm90X2ZpeGVkX2Rpc3RhbmNlO1xuICAgIH07XG5cbiAgICBzZWxmLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGNfY29udHJhaW50cygpO1xuXG4gICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgICAgICAub24oJ3Njcm9sbC5maXhlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmVfZml4ZWQoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3RvdWNobW92ZS5maXhlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25maWd1cmVfZml4ZWQoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3Jlc2l6ZS5maXhlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjYWxjX2NvbnRyYWludHMoKTtcbiAgICAgICAgICAgICAgICBjb25maWd1cmVfZml4ZWQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjb25maWd1cmVfZml4ZWQgKCkge1xuICAgICAgICB2YXIgZml4ZWRfeSA9IDA7XG5cbiAgICAgICAgaWYgKChub3RfZml4ZWRfZGlzdGFuY2UgLSBwYWdlWU9mZnNldCkgPCAwKSB7XG4gICAgICAgICAgICBmaXhlZF95ID0gcGFnZVlPZmZzZXQgLSBub3RfZml4ZWRfZGlzdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZml4ZWQgPSAoZml4ZWRfeSA9PT0gMCkgPyBmYWxzZSA6IHRydWU7XG5cbiAgICAgICAgc2VsZi5kaXNwYXRjaFxuICAgICAgICAgICAgLmFjdGl2YXRvclZpc2libGUoZml4ZWQpO1xuXG4gICAgICAgIGZpeGVkX3NlbC5jbGFzc2VkKGZpeGVkX2NsYXNzLCBmaXhlZCk7XG5cbiAgICAgICAgcGFkX29uX2ZpeGVkX3NlbFxuICAgICAgICAgICAgLnN0eWxlKCdwYWRkaW5nLXRvcCcsXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkID9cbiAgICAgICAgICAgICAgICAgICAgcGFkZGVkX3BhZF9vbl9maXhlZF9wYWRkaW5nX3RvcCA6XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsX3BhZF9vbl9maXhlZF9wYWRkaW5nX3RvcCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY19jb250cmFpbnRzICgpIHtcbiAgICAgICAgdmFyIG5vdF9maXhlZF9tYXJnaW4gPVxuICAgICAgICAgICAgICAgICtub3RfZml4ZWRfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbWFyZ2luLXRvcCcpXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdO1xuICAgICAgICB2YXIgbm90X2ZpeGVkX2hlaWdodCA9XG4gICAgICAgICAgICAgICAgbm90X2ZpeGVkX3NlbFxuICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgICAgICAuaGVpZ2h0O1xuXG4gICAgICAgIG5vdF9maXhlZF9kaXN0YW5jZSA9IG5vdF9maXhlZF9tYXJnaW4gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RfZml4ZWRfaGVpZ2h0O1xuXG4gICAgICAgIHZhciBmaXhlZF9iYm94X2hlaWdodCA9IGZpeGVkX3NlbFxuICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAuaGVpZ2h0O1xuXG4gICAgICAgIHBhZGRlZF9wYWRfb25fZml4ZWRfcGFkZGluZ190b3AgPSBmaXhlZF9iYm94X2hlaWdodCArICdweCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBib3R0b20gPSByZXF1aXJlKCcuL2JvdHRvbScpKCk7XG52YXIgYmVoYW5jZSA9IHJlcXVpcmUoJy4vZGF0YScpKCk7XG52YXIgZGVwYXJ0bWVudHMgPSByZXF1aXJlKCcuLi9kZXBhcnRtZW50cycpKCk7XG52YXIgdHJhbnNmb3JtID0gcmVxdWlyZSgnLi90cmFuc2Zvcm0nKSgpO1xudmFyIGxpZ2h0Ym94ID0gcmVxdWlyZSgnLi9saWdodGJveCcpKCk7XG52YXIgc2Nyb2xsdG8gPSByZXF1aXJlKCcuL3Njcm9sbHRvJykoeyBkdXJhdGlvbjogMTAwMCB9KTtcbnZhciBmaXhlZCA9IHJlcXVpcmUoJy4vZml4ZWQnKSgpO1xudmFyIGxheW91dF9pbWFnZSA9IHJlcXVpcmUoJy4vbGF5b3V0X2ltYWdlJykoKTtcbnZhciBsYXlvdXRfZml4ZWQgPSByZXF1aXJlKCcuL2xheW91dF9maXhlZCcpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd29yayAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29udGFpbmVyX3NlbCxcbiAgICAgICAgaW5maW5pdGVfc2Nyb2xsX2Jvb2wgPSBmYWxzZSxcbiAgICAgICAgZGF0YSA9IFtdLFxuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGRlcGFydG1lbnRfY29udGFpbmVyX3NlbCxcbiAgICAgICAgd29ya19zZWwsXG4gICAgICAgIGlzbyxcbiAgICAgICAgbGF5b3V0ID0gJ2ltYWdlJyxcbiAgICAgICAgbGF5b3V0cyA9IHtcbiAgICAgICAgICAgIGltYWdlOiB7XG4gICAgICAgICAgICAgICAgcmVuZGVyOiByZW5kZXJfaW1hZ2UsXG4gICAgICAgICAgICAgICAgcmVzaXplOiByZXNpemVfaW1hZ2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaXhlZDoge1xuICAgICAgICAgICAgICAgIHJlbmRlcjogcmVuZGVyX2ZpeGVkLFxuICAgICAgICAgICAgICAgIHJlc2l6ZTogcmVzaXplX2ZpeGVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGludHJvX3NlbCxcbiAgICAgICAgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIGJlaGFuY2UuZGlzcGF0Y2hcbiAgICAgICAgLm9uKCdkYXRhJywgZnVuY3Rpb24gKHJlcXVlc3RlZCkge1xuICAgICAgICAgICAgYm90dG9tLmRpcnR5KGZhbHNlKTtcblxuICAgICAgICAgICAgaWYgKCFyZXF1ZXN0ZWQpIHRocm93ICdXb3JrLiBHb3Qgbm8gZGF0YS4nO1xuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybWVkID0gdHJhbnNmb3JtKHJlcXVlc3RlZC5vYmplY3RzKTtcblxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KHRyYW5zZm9ybWVkKTtcbiAgICAgICAgICAgIHJlbmRlcigpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGZpbHRlcmFibGUgbGlzdFxuICAgICAgICAgICAgZGVwYXJ0bWVudHMuaXNGaWx0ZXJhYmxlKHRyYW5zZm9ybWVkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlbmRPZkRhdGEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBib3R0b20uZGlzcGF0Y2gub24oJ2JvdHRvbS53b3JrJywgbnVsbCk7XG4gICAgICAgIH0pO1xuXG4gICAgZml4ZWQuZGlzcGF0Y2hcbiAgICAgICAgLm9uKCdhY3RpdmF0b3JWaXNpYmxlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIGRlcGFydG1lbnRzLmFjdGl2YXRvclZpc2libGUoZCk7XG4gICAgICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCdpbi13b3JrJywgZCk7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZmlsdGVycyA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRlcGFydG1lbnRfY29udGFpbmVyX3NlbDtcbiAgICAgICAgZGVwYXJ0bWVudF9jb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuaW50cm8gPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBpbnRyb19zZWw7XG4gICAgICAgIGludHJvX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmxheW91dCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxheW91dDtcbiAgICAgICAgbGF5b3V0ID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYubGlnaHRib3hDb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsaWdodGJveC5jb250YWluZXIoKTtcbiAgICAgICAgbGlnaHRib3guY29udGFpbmVyKF8pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5pbmZpbml0ZVNjcm9sbCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGluZmluaXRlX3Njcm9sbF9ib29sO1xuICAgICAgICBpbmZpbml0ZV9zY3JvbGxfYm9vbCA9IF87XG5cbiAgICAgICAgaWYgKGluZmluaXRlX3Njcm9sbF9ib29sID09PSB0cnVlKSB7XG4gICAgICAgICAgICBib3R0b21cbiAgICAgICAgICAgICAgICAuY29udGFpbmVyKGNvbnRhaW5lcl9zZWwpO1xuXG4gICAgICAgICAgICBib3R0b20uZGlzcGF0Y2hcbiAgICAgICAgICAgICAgICAub24oJ2JvdHRvbS53b3JrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBib3R0b20uZGlydHkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJlaGFuY2UuZmV0Y2hfZGF0YSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIHNldF9pbnRyb19oZWlnaHQoKTtcblxuICAgICAgICBpZiAoIWNvbnRhaW5lcl9zZWwpIHRocm93IFwiV29yayByZXF1aXJlcyBhIGNvbnRhaW5lclwiO1xuICAgICAgICBjb250YWluZXJfc2VsLmNhbGwoYWRkX3N0cnVjdHVyZSk7XG4gICAgICAgIGxheW91dF9maXhlZC5jb250YWluZXIod29ya19jb250YWluZXJfc2VsKTtcbiAgICAgICAgbGF5b3V0X2ltYWdlLmNvbnRhaW5lcih3b3JrX2NvbnRhaW5lcl9zZWwpO1xuXG4gICAgICAgIGlmIChpbmZpbml0ZV9zY3JvbGxfYm9vbCkgYm90dG9tLmF0dGFjaFdpbmRvd0V2ZW50cygpO1xuXG4gICAgICAgIC8vIHdpbGwgYmUgdGhlIHRoaW5nIHRvIGNhbGwgcmVuZGVyXG4gICAgICAgIGJlaGFuY2UuZmV0Y2hfZGF0YSgpO1xuXG4gICAgICAgIC8vIGZpbHRlcmluZ1xuICAgICAgICBkZXBhcnRtZW50cy5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdjbGljay53b3JrJywgZnVuY3Rpb24gKGRlcGFydG1lbnQpIHtcblxuICAgICAgICAgICAgc2Nyb2xsdG8oZml4ZWQudG9wKCkgKyAxMCk7XG5cbiAgICAgICAgICAgIGlmIChkZXBhcnRtZW50ID09PSAnYWxsJykgZGVwYXJ0bWVudCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoaXNvKSB7XG4gICAgICAgICAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQzLnNlbGVjdChpdGVtRWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZChkZXBhcnRtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmaXhlZC5pbml0aWFsaXplKCk7XG5cbiAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgIC5vbigncmVzaXplLndvcmsnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVzaXplKCk7XG4gICAgICAgICAgICAgICAgc2V0X2ludHJvX2hlaWdodCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlciAoKSB7XG4gICAgICAgIGxheW91dHNbbGF5b3V0XS5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNpemUgKCkge1xuICAgICAgICBsYXlvdXRzW2xheW91dF0ucmVzaXplKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2ZpeGVkICgpIHtcbiAgICAgICAgd29ya19zZWwgPSB3b3JrX2NvbnRhaW5lcl9zZWwuc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgICAgICAgdmFyIHdvcmtfc2VsX2VudGVyID0gd29ya19zZWxcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKTtcblxuICAgICAgICBsYXlvdXRfZml4ZWRcbiAgICAgICAgICAgIC5hdHRyaWJ1dGVzKHdvcmtfc2VsX2VudGVyKTtcbiAgICAgICAgdmFyIG1hc29ucnkgPSBsYXlvdXRfZml4ZWQubWFzb25yeSgpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV9oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdmaXhlZC1waWVjZSBwaWVjZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQucmlzZF9wcm9ncmFtX2NsYXNzICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcgb3JpZW50YXRpb24tJyArIGQub3JpZW50YXRpb247XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2Utd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGQubWFzb25yeV9oZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQubWV0YV9zcGFjZSkgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS1pbWctd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfd2lkdGg7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZC5tYXNvbnJ5X2hlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5tZXRhX3NwYWNlKSArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2FsbChhZGRfaW1hZ2UpO1xuICAgICAgICBcbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLW1ldGEtd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLmNhbGwoYWRkX21ldGEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA1MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgd29ya19zZWwub24oJ2NsaWNrLndvcmsnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwobGlnaHRib3guc2hvdyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaXNvKSB7XG4gICAgICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWwubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiBtYXNvbnJ5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdvcmtfc2VsX2VudGVyLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlzby5hcHBlbmRlZCh0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXNvLmxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2ltYWdlICgpICB7XG4gICAgICAgIHdvcmtfc2VsID0gd29ya19jb250YWluZXJfc2VsLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpO1xuXG4gICAgICAgIHZhciB3b3JrX3NlbF9lbnRlciA9IHdvcmtfc2VsXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2ltYWdlLXBpZWNlIHBpZWNlICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5yaXNkX3Byb2dyYW1fY2xhc3M7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbGF5b3V0X2ltYWdlXG4gICAgICAgICAgICAuYXR0cmlidXRlcyh3b3JrX3NlbF9lbnRlcik7XG4gICAgICAgIHZhciBtYXNvbnJ5ID0gbGF5b3V0X2ltYWdlLm1hc29ucnkoKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV93aWR0aCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS13cmFwcGVyJylcbiAgICAgICAgICAgICAgICAuY2FsbChhZGRfaW1hZ2UpO1xuICAgICAgICBcbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLW1ldGEtd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLmNhbGwoYWRkX21ldGEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA1MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgd29ya19zZWwub24oJ2NsaWNrLndvcmsnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwobGlnaHRib3guc2hvdyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaXNvKSB7XG4gICAgICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWwubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiBtYXNvbnJ5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlzby51bmJpbmRSZXNpemUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdvcmtfc2VsX2VudGVyLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlzby5hcHBlbmRlZCh0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXNvLmxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzaXplX2ltYWdlICgpIHtcblxuICAgICAgICBsYXlvdXRfaW1hZ2VcbiAgICAgICAgICAgIC5hdHRyaWJ1dGVzKHdvcmtfc2VsKTtcbiAgICAgICAgdmFyIG1hc29ucnkgPSBsYXlvdXRfaW1hZ2UubWFzb25yeSgpO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV9oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpc28pIHtcbiAgICAgICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbC5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IG1hc29ucnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNvLm9wdGlvbnMubWFzb25yeSA9IG1hc29ucnk7XG4gICAgICAgICAgICBpc28ubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNpemVfZml4ZWQgKCkge1xuXG4gICAgICAgIGxheW91dF9maXhlZFxuICAgICAgICAgICAgLmF0dHJpYnV0ZXMod29ya19zZWwpO1xuICAgICAgICB2YXIgbWFzb25yeSA9IGxheW91dF9maXhlZC5tYXNvbnJ5KCk7XG5cbiAgICAgICAgd29ya19zZWxcbiAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X2hlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbFxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnBpZWNlLXdyYXBwZXInKVxuICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZC5tYXNvbnJ5X2hlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICBkLm1ldGFfc3BhY2UpICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucGllY2UtaW1nLXdyYXBwZXInKVxuICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV93aWR0aDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChkLm1hc29ucnlfaGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgIGQubWV0YV9zcGFjZSkgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpc28pIHtcbiAgICAgICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbC5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IG1hc29ucnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXNvLnVuYmluZFJlc2l6ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNvLm9wdGlvbnMubWFzb25yeSA9IG1hc29ucnk7XG4gICAgICAgICAgICBpc28ubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfc3RydWN0dXJlIChzZWwpICB7XG4gICAgICAgIHZhciBkZXB0X2NvbnRhaW5lcl9zZWwgPSBkZXBhcnRtZW50X2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2FydGljbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RlcGFydG1lbnRzIGdyaWQgei0xNScpO1xuXG4gICAgICAgIHdvcmtfY29udGFpbmVyX3NlbCA9IHNlbC5hcHBlbmQoJ2FydGljbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3dvcmsgZ3JpZCB6LTEwICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnd29yay1sYXlvdXQtJyArIGxheW91dCk7XG5cbiAgICAgICAgZGVwYXJ0bWVudHNcbiAgICAgICAgICAgIC5jb250YWluZXIoZGVwdF9jb250YWluZXJfc2VsKVxuICAgICAgICAgICAgLm1vYmlsZShkMy5zZWxlY3QoJy5uYXYtbW9iaWxlJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgZml4ZWRcbiAgICAgICAgICAgIC5ub3RGaXhlZChpbnRyb19zZWwpXG4gICAgICAgICAgICAuZml4ZWQoZGVwYXJ0bWVudF9jb250YWluZXJfc2VsKVxuICAgICAgICAgICAgLnBhZE9uRml4ZWQoc2VsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfbWV0YSAoc2VsKSB7XG4gICAgICAgIHNlbC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N0dWRlbnQtbmFtZSBwaWVjZS1tZXRhJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3R1ZGVudF9uYW1lO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmlzZC1wcm9ncmFtIHBpZWNlLW1ldGEnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5yaXNkX3Byb2dyYW07XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfaW1hZ2UgKHNlbCkge1xuICAgICAgICBzZWwuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIuc3JjO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0X2ludHJvX2hlaWdodCAoKSB7XG4gICAgICAgIHZhciBoZWlnaHQgPVxuICAgICAgICAgICAgaW50cm9fc2VsXG4gICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgK1xuICAgICAgICAgICAgcGFyc2VJbnQoaW50cm9fc2VsLnN0eWxlKCdtYXJnaW4tdG9wJyksIDEwKSArXG4gICAgICAgICAgICBwYXJzZUludChpbnRyb19zZWwuc3R5bGUoJ21hcmdpbi1ib3R0b20nKSwgMTApO1xuXG4gICAgICAgIGlmIChoZWlnaHQgPCB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgICAgIHZhciBkaWZmZXJlbmNlID0gd2luZG93LmlubmVySGVpZ2h0IC0gaGVpZ2h0O1xuICAgICAgICAgICAgaW50cm9fc2VsLnN0eWxlKCdwYWRkaW5nLWJvdHRvbScsIGRpZmZlcmVuY2UgKyAncHgnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxheW91dF9maXhlZCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgY29udGFpbmVyX3NlbDtcbiAgICB2YXIgY291bnRlciA9IHtcbiAgICAgICAgdGFsbDogMCxcbiAgICAgICAgd2lkZTogMFxuICAgIH07XG4gICAgdmFyIGZyZXF1ZW5jeSA9IHtcbiAgICAgICAgbGFyZ2U6IDE1LFxuICAgICAgICB0YWxsOiA4LFxuICAgICAgICB3aWRlOiA2XG4gICAgfTtcbiAgICB2YXIgbWV0YV9zcGFjZSA9IDUwO1xuICAgIHZhciBtYXNvbnJ5ID0ge1xuICAgICAgICBndXR0ZXI6IDAsXG4gICAgICAgIGNvbHVtbldpZHRoOiAwLFxuICAgICAgICBjb2x1bW5XaWR0aERvdWJsZTogMFxuICAgIH07XG5cbiAgICBzZWxmLm1hc29ucnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtYXNvbnJ5O1xuICAgIH07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hdHRyaWJ1dGVzID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgbWFzb25yeSA9IG1hc29ucnlfc2V0dGluZ3MoKTtcblxuICAgICAgICBzZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZC5tZXRhX3NwYWNlID0gbWV0YV9zcGFjZTtcbiAgICAgICAgICAgIHZhciBtdWx0aXBsaWVyID0gMTtcblxuICAgICAgICAgICAgaWYgKGkgJSBmcmVxdWVuY3kubGFyZ2UgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIC8vIGxhcmdlXG4gICAgICAgICAgICAgICAgbXVsdGlwbGllciA9IDI7XG5cbiAgICAgICAgICAgICAgICBpZiAoKGQuY292ZXIub3JpZ2luYWxfd2lkdGgvXG4gICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX2hlaWdodCkgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGQub3JpZW50YXRpb24gPSAnbGFuZHNjYXBlJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkLm9yaWVudGF0aW9uID0gJ3BvcnRyYWl0JztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPVxuICAgICAgICAgICAgICAgICAgICAobWFzb25yeS5jb2x1bW5XaWR0aCAqXG4gICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyKSArXG4gICAgICAgICAgICAgICAgICAgICgobXVsdGlwbGllciA9PT0gMSkgP1xuICAgICAgICAgICAgICAgICAgICAgIDAgOiBtYXNvbnJ5Lmd1dHRlcik7XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfaGVpZ2h0ID0gZC5tYXNvbnJ5X3dpZHRoO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChkLmNvdmVyLm9yaWdpbmFsX3dpZHRoL1xuICAgICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF9oZWlnaHQpID4gMSkge1xuXG4gICAgICAgICAgICAgICAgLy8gbGFuZHNjYXBlXG4gICAgICAgICAgICAgICAgY291bnRlci53aWRlICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIud2lkZSAlIGZyZXF1ZW5jeS53aWRlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgPSAyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV93aWR0aCA9XG4gICAgICAgICAgICAgICAgICAgIChtYXNvbnJ5LmNvbHVtbldpZHRoICpcbiAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIpICtcbiAgICAgICAgICAgICAgICAgICAgKChtdWx0aXBsaWVyID09PSAxKSA/XG4gICAgICAgICAgICAgICAgICAgICAgMCA6IG1hc29ucnkuZ3V0dGVyKTtcblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV9oZWlnaHQgPSBkLm1hc29ucnlfd2lkdGg7XG4gICAgICAgICAgICAgICAgZC5vcmllbnRhdGlvbiA9ICdsYW5kc2NhcGUnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBwb3J0cmFpdFxuICAgICAgICAgICAgICAgIGNvdW50ZXIudGFsbCArPSAxO1xuICAgICAgICAgICAgICAgIGlmIChjb3VudGVyLnRhbGwgJSBmcmVxdWVuY3kudGFsbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyID0gMjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfaGVpZ2h0ID1cbiAgICAgICAgICAgICAgICAgICAgKG1hc29ucnkuY29sdW1uV2lkdGggKlxuICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGllcikgK1xuICAgICAgICAgICAgICAgICAgICAoKG11bHRpcGxpZXIgPT09IDEpID9cbiAgICAgICAgICAgICAgICAgICAgICAwIDogbWFzb25yeS5ndXR0ZXIpO1xuXG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X3dpZHRoID0gbWFzb25yeS5jb2x1bW5XaWR0aDtcbiAgICAgICAgICAgICAgICBkLm9yaWVudGF0aW9uID0gJ3BvcnRyYWl0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1hc29ucnlfc2V0dGluZ3MgKCkge1xuICAgICAgICB2YXIgdG90YWxfd29ya193aWR0aCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLndpZHRoO1xuXG4gICAgICAgIHZhciBudW1iZXJfb2ZfY29sdW1ucyA9IDI7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDc2OCkge1xuICAgICAgICAgICAgbnVtYmVyX29mX2NvbHVtbnMgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGd1dHRlciA9IDA7XG4gICAgICAgIHZhciBjb2x1bW5fd2lkdGggPSAodG90YWxfd29ya193aWR0aCAvIG51bWJlcl9vZl9jb2x1bW5zKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoZ3V0dGVyICogKG51bWJlcl9vZl9jb2x1bW5zIC0gMSkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBndXR0ZXI6IGd1dHRlcixcbiAgICAgICAgICAgIGNvbHVtbldpZHRoOiBjb2x1bW5fd2lkdGgsXG4gICAgICAgICAgICBjb2x1bW5Eb3VibGVXaWR0aDogY29sdW1uX3dpZHRoICogMiArIGd1dHRlclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxheW91dF9pbWFnZSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgY29udGFpbmVyX3NlbDtcbiAgICB2YXIgbWV0YV9zcGFjZSA9IDM1O1xuICAgIHZhciBjb3VudGVyID0gMDtcbiAgICB2YXIgZnJlcXVlbmN5ID0gMTQ7XG4gICAgdmFyIG1hc29ucnkgPSB7XG4gICAgICAgIGd1dHRlcjogMCxcbiAgICAgICAgY29sdW1uV2lkdGg6IDAsXG4gICAgICAgIGNvbHVtbldpZHRoRG91YmxlOiAwXG4gICAgfTtcblxuICAgIHNlbGYubWFzb25yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1hc29ucnk7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBtYXNvbnJ5ID0gbWFzb25yeV9zZXR0aW5ncygpO1xuXG4gICAgICAgIHNlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoKGQuY292ZXIub3JpZ2luYWxfd2lkdGgvXG4gICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfaGVpZ2h0KSA+XG4gICAgICAgICAgICAgICAgMS44KSB7XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPSBtYXNvbnJ5LmNvbHVtbkRvdWJsZVdpZHRoO1xuICAgICAgICAgICAgICAgIGQubWFzb25yeV9oZWlnaHQgPVxuICAgICAgICAgICAgICAgICAgICAoKGQubWFzb25yeV93aWR0aCAqXG4gICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF9oZWlnaHQpL1xuICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF93aWR0aCkgKyBtZXRhX3NwYWNlO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXIgKz0gMTtcblxuICAgICAgICAgICAgICAgIC8vIG1ha2UgZXZlcnkgNXRoIG9uZSBiaWcuXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgJSBmcmVxdWVuY3kgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZC5tYXNvbnJ5X3dpZHRoID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc29ucnkuY29sdW1uRG91YmxlV2lkdGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZC5tYXNvbnJ5X3dpZHRoID0gbWFzb25yeS5jb2x1bW5XaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X2hlaWdodCA9XG4gICAgICAgICAgICAgICAgICAgICgoZC5tYXNvbnJ5X3dpZHRoICpcbiAgICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX2hlaWdodCkvXG4gICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX3dpZHRoKSArXG4gICAgICAgICAgICAgICAgICAgIG1ldGFfc3BhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYXNvbnJ5X3NldHRpbmdzICgpIHtcbiAgICAgICAgdmFyIHRvdGFsX3dvcmtfd2lkdGggPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC53aWR0aDtcblxuICAgICAgICB2YXIgbnVtYmVyX29mX2NvbHVtbnMgPSAyO1xuXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSA3NjgpIHtcbiAgICAgICAgICAgIG51bWJlcl9vZl9jb2x1bW5zID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBndXR0ZXIgPSAwO1xuICAgICAgICB2YXIgY29sdW1uX3dpZHRoID0gKHRvdGFsX3dvcmtfd2lkdGggLyBudW1iZXJfb2ZfY29sdW1ucykgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGd1dHRlciAqIChudW1iZXJfb2ZfY29sdW1ucyAtIDEpKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ3V0dGVyOiBndXR0ZXIsXG4gICAgICAgICAgICBjb2x1bW5XaWR0aDogY29sdW1uX3dpZHRoLFxuICAgICAgICAgICAgY29sdW1uRG91YmxlV2lkdGg6IGNvbHVtbl93aWR0aCAqIDIgKyBndXR0ZXJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaWdodGJveCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29udGFpbmVyX3NlbCxcbiAgICAgICAgc2VsZWN0ZWRfc2VsLFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc2hvdyA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrZWQnKTtcbiAgICAgICAgY29uc29sZS5sb2coc2VsKTtcbiAgICAgICAgaWYgKCFjb250YWluZXJfc2VsKSB0aHJvdyBcIkxpZ2h0Ym94LiBSZXF1aXJlcyBjb250YWluZXIuXCI7XG5cbiAgICAgICAgc2VsZWN0ZWRfc2VsID0gc2VsO1xuXG4gICAgICAgIHZhciBkYXRhID0gc2VsLmRhdHVtKCk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X2dyaWRfc2VsID0gY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X21ldGFfc2VsID1cbiAgICAgICAgICAgIGxpZ2h0Ym94X2dyaWRfc2VsXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YScpO1xuXG4gICAgICAgIHZhciBsaWdodGJveF93b3JrX3NlbCA9XG4gICAgICAgICAgICBsaWdodGJveF9ncmlkX3NlbFxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJyxcbiAgICAgICAgICAgICAgICAgICAgICAnbGlnaHRib3gtd29yayAnK1xuICAgICAgICAgICAgICAgICAgICAgICdvZmZzZXQtcGVyY2VudC0yLTEwICcrXG4gICAgICAgICAgICAgICAgICAgICAgJ2NvbC1wZXJjZW50LTgtMTAnKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX3NlbFxuICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsXG4gICAgICAgICAgICAgICAgICAgKHBhcnNlSW50KGxpZ2h0Ym94X3dvcmtfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbWFyZ2luLWxlZnQnKSkgLSAyMCkgKyAncHgnKTtcblxuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUubGlnaHRib3gnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbGlnaHRib3hfbWV0YV9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAocGFyc2VJbnQobGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ21hcmdpbi1sZWZ0JykpIC0gMjApICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2gyJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC10aXRsZScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnByb2plY3RfbmFtZSk7XG5cbiAgICAgICAgaWYgKGRhdGEucHJvamVjdF9uYW1lICE9IGRhdGEuZGVzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LWRlc2NyaXB0aW9uJylcbiAgICAgICAgICAgICAgICAudGV4dChkYXRhLmRlc2NyaXB0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEubW9kdWxlcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlJylcbiAgICAgICAgICAgIC5lYWNoKGFkZF9tb2R1bGVzKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfbWV0YV9pbmZvX3NlbCA9IGxpZ2h0Ym94X21ldGFfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mbycpO1xuXG4gICAgICAgIGxpZ2h0Ym94X21ldGFfaW5mb19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mby0tc3R1ZGVudC1uYW1lJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEuc3R1ZGVudF9uYW1lKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXJpc2QtcHJvZ3JhbScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnJpc2RfcHJvZ3JhbSk7XG5cbiAgICAgICAgaWYgKGRhdGEucGVyc29uYWxfbGluay5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mby0tcGVyc29uYWwtbGluaycpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnYScpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCBkYXRhLnBlcnNvbmFsX2xpbmspXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RhcmdldCcsICdfYmxhbmsnKVxuICAgICAgICAgICAgICAgIC50ZXh0KCdQZXJzb25hbCBXZWJzaXRlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXBlcnNvbmFsLWxpbmsnKVxuICAgICAgICAgICAgLmFwcGVuZCgnYScpXG4gICAgICAgICAgICAuYXR0cignaHJlZicsIGRhdGEudXJsKVxuICAgICAgICAgICAgLmF0dHIoJ3RhcmdldCcsICdfYmxhbmsnKVxuICAgICAgICAgICAgLnRleHQoJ0JlaGFuY2UgUG9ydGZvbGlvJyk7XG5cbiAgICAgICAgY29udGFpbmVyX3NlbC5jbGFzc2VkKCdhY3RpdmUnLCB0cnVlKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgdHJ1ZSk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ2luLWxpZ2h0Ym94JywgdHJ1ZSk7XG5cbiAgICAgICAgY29udGFpbmVyX3NlbC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2xvc2UgKCkge1xuICAgICAgICBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAuY2xhc3NlZCgnYWN0aXZlJywgZmFsc2UpXG4gICAgICAgICAgICAuaHRtbCgnJyk7XG5cbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgZmFsc2UpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCdpbi1saWdodGJveCcsIGZhbHNlKTtcblxuICAgICAgICBjb250YWluZXJfc2VsLm9uKCdjbGljaycsIG51bGwpO1xuICAgICAgICBcbiAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgIC5vbigncmVzaXplLmxpZ2h0Ym94JywgbnVsbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX21vZHVsZXMgKGQsIGkpIHtcbiAgICAgICAgdmFyIHNlbCA9IGQzLnNlbGVjdCh0aGlzKTtcblxuICAgICAgICBpZiAoZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICBzZWwuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdzcmMnLFxuICAgICAgICAgICAgICAgICAgICBkLnNpemVzLm1heF8xMjQwID8gZC5zaXplcy5tYXhfMTI0MCA6IGQuc3JjKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZC50eXBlID09PSAndGV4dCcpIHtcbiAgICAgICAgICAgIHNlbC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS1tb2R1bGUtdGV4dCcpXG4gICAgICAgICAgICAgICAgLnRleHQoZC50ZXh0X3BsYWluKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZC50eXBlID09PSAnZW1iZWQnKSB7XG4gICAgICAgICAgICBzZWwuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS1tb2R1bGUtZW1iZWQnKVxuICAgICAgICAgICAgICAgIC5odG1sKGQuZW1iZWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2Nyb2xsdG8gKGFyZ3MpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3MgfHwge307XG4gICAgb3B0aW9ucy5kdXJhdGlvbiA9IGFyZ3MuZHVyYXRpb24gfHwgMjAwMDtcblxuICAgIGZ1bmN0aW9uIHNjcm9sbF90d2VlbiAob2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IGQzLmludGVycG9sYXRlTnVtYmVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnBhZ2VZT2Zmc2V0IHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUbygwLCBpKHQpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24ob3B0aW9ucy5kdXJhdGlvbilcbiAgICAgICAgICAgIC50d2Vlbignc2Nyb2xsJywgc2Nyb2xsX3R3ZWVuKG9mZnNldCkpO1xuICAgIH07XG59OyIsIi8vIHJlcXVpcmVzIGQzLnNjYWxlLm9yZGluYWxcbm1vZHVsZS5leHBvcnRzID0gdHJhbnNmb3JtO1xuXG5mdW5jdGlvbiB0cmFuc2Zvcm0gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgdmFyIGZvcm1hdHRlZCA9IGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyhpbnB1dCk7XG4gICAgICAgIHJldHVybiBzaHVmZmxlKGZvcm1hdHRlZCk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0X2RhdGFfY292ZXJfd2l0aF9tb2R1bGVzIChkYXRhKSB7XG5cbiAgICB2YXIgZm9ybWF0dGVkX2RhdGEgPSBbXTtcblxuICAgIC8vIGRldGVybWluZSB0aGUgZXh0ZW50IG9mIHdpZHRoc1xuICAgIHZhciBhbGxfbW9kdWxlcyA9IFtdO1xuICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgYWxsX21vZHVsZXMucHVzaChtZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgIHZhciBtb2R1bGVzX2Zvcl9jb3ZlciA9IFtdO1xuICAgICAgICB2YXIgbW9kdWxlc190b19pbmNsdWRlID0gW107XG4gICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVzX2Zvcl9jb3Zlci5wdXNoKG1kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIHRoZXNlIGFyZSBhbGwgY2FzZXMgdGhhdCBhcmVcbiAgICAgICAgICAgIC8vIGNvdmVyZWQgaW4gbGlnaHRib3guanNcbiAgICAgICAgICAgIGlmICgobWQudHlwZSA9PT0gJ2ltYWdlJykgfFxuICAgICAgICAgICAgICAgIChtZC50eXBlID09PSAndGV4dCcpIHxcbiAgICAgICAgICAgICAgICAobWQudHlwZSA9PT0gJ2VtYmVkJykpIHtcblxuICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5wdXNoKG1kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgdmFyIHJhbmRvbV9jb3ZlcjtcbiAgICAgICAgaWYgKG1vZHVsZXNfZm9yX2NvdmVyLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIC8vIHJhbmRvbV9jb3Zlcl9vcHRpb25cbiAgICAgICAgICAgIC8vIGJhc2VkIG9uIGltYWdlcyB0byBpbmNsdWRlXG4gICAgICAgICAgICB2YXIgcmFuZG9tX21vZHVsZSA9XG4gICAgICAgICAgICAgICAgbW9kdWxlc19mb3JfY292ZXJbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlc19mb3JfY292ZXIubGVuZ3RoKV07XG5cbiAgICAgICAgICAgIHJhbmRvbV9jb3ZlciA9IHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF93aWR0aDogK3JhbmRvbV9tb2R1bGUud2lkdGgsXG4gICAgICAgICAgICAgICAgb3JpZ2luYWxfaGVpZ2h0OiArcmFuZG9tX21vZHVsZS5oZWlnaHQsXG4gICAgICAgICAgICAgICAgc3JjOiByYW5kb21fbW9kdWxlLnNyY1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJhbmRvbV9jb3Zlci5oZWlnaHQgPSAocmFuZG9tX2NvdmVyLndpZHRoKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21fbW9kdWxlLmhlaWdodCkvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZS53aWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIG90aGVyd2lzZSwganVzdCB1c2UgYSB0aGUgY292ZXIgdGhhdFxuICAgICAgICAgICAgLy8gaXMgaW5jbHVkZWRcbiAgICAgICAgICAgIHJhbmRvbV9jb3ZlciA9IHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF93aWR0aDogNDA0LFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsX2hlaWdodDogMzE2LFxuICAgICAgICAgICAgICAgIHNyYzogZC5kZXRhaWxzLmNvdmVyc1snNDA0J11cbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgZm9ybWF0dGVkX2RhdGEucHVzaCh7XG4gICAgICAgICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAgICAgICAgICdyaXNkX3Byb2dyYW1fY2xhc3MnOlxuICAgICAgICAgICAgICAgIGVzY2FwZV9kZXBhcnRtZW50KGQucmlzZF9wcm9ncmFtKSxcbiAgICAgICAgICAgICdtb2R1bGVzJzogbW9kdWxlc190b19pbmNsdWRlLFxuICAgICAgICAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGQuZGV0YWlscy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIHVybDogZC5vd25lcnNbMF0udXJsLFxuICAgICAgICAgICAgcGVyc29uYWxfbGluazogZC5wZXJzb25hbF9saW5rXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZvcm1hdHRlZF9kYXRhO1xufVxuXG5mdW5jdGlvbiBzaHVmZmxlIChvKSB7XG4gICAgZm9yKHZhciBqLCB4LCBpID0gby5sZW5ndGg7XG4gICAgICAgIGk7XG4gICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSxcbiAgICAgICAgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgICByZXR1cm4gbztcbn1cblxuZnVuY3Rpb24gZXNjYXBlX2RlcGFydG1lbnQoZCkge1xuICAgIHJldHVybiBkLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnICcsICctJyk7XG59Il19
