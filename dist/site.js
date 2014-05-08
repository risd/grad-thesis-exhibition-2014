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
    .work(work_args);


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

        if (Modernizr) {
            if (Modernizr.touch) {
                window_sel
                    .on('scroll.logo', function () {
                        recalulate_logo_line();
                    });
            }
        }
            
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

        if (delay_past_reveal_sel) {
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
                     (bounds.top + (bounds.height*(0.45)))];
                second = [bounds.right + 6,
                     (bounds.top + (bounds.height*(0.45)))];
            } else if ((i === 1) | (i === 2)) {
                first = [bounds.left - 6,
                     (bounds.top + (bounds.height*(0.45)))];
                second = [bounds.right + 6,
                     (bounds.top + (bounds.height*(0.45)))];
            } else if (i === 3) {
                first = [bounds.left - 6,
                     (bounds.top + (bounds.height*(0.55)))];
                second = [bounds.right + 6,
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
                // '768': utility.scaleProportional,
                '1024': utility.scaleProportional
            },
            drawn_delta: {
                '300': {
                    x: -55.79398888349533,
                    y: 1033.0799560546875
                },
                '768': {
                    x: -110.04000854492188,
                    y: 389.18499755859375
                },
                '1024': {
                    x: -117.3299635052681,
                    y: 389.18597412109375
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
                '768': 'M0,0'+
                  'h17.482'+
                  'c0,0,0,0,0,36.81'+
                  // 'c0,0,0,28.851,0,36.81'+
                  'c0,28.042-15.901,87.37-61.185,87.37'+
                  'c-53.298,0-79.808,0.005-79.808,0.005l0-52'+
                  'c0,0,35.921-4.393,48.649,3.758'+
                  'c37.861,24.242,24.195,84.909-28.139,152.242'+
                  'c-26.368,33.925-32.734,75.167-31.29,106.653'+
                  'c1.447,31.55,12.136,54.347,24.006,54.347',
                // '768': 'M94.26-15'+
                //   'h29.796'+
                //   'c0,0,0.936,8.851,0.936,16.81'+
                //   'c0,28.042-15.901,67.37-61.185,67.37'+
                //   'C10.51,69.18-16,69.185-16,69.185'+
                //   'v-52'+
                //   'c0,0,35.921-4.393,48.649,3.758'+
                //   'c37.861,24.242,29.645,46.777-3.8,80.242'+
                //   'c-17.027,17.038-44.629,17-44.629,48.653'+
                //   'c0,18.013,0,24.347,0,24.347',
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
                    x: -130.7449951171875,
                    y: 426.7239990234375
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
                '768': 'M0,0'+
                  'c0,0-8.201,39.098-44.745,53'+
                  'c-27.514,10.467-40.956,21.087-53,47'+
                  'c-16.5,35.5-6.107,95.933,43.778,96.328'+
                  'C-14.08,196.643-12.745,149-12.745,149'+
                  'h-120'+
                  'v86'+
                  'c0,0,59.121,8.667,59.121,49.5'+
                  'c0,49.911-30.121,45.833-51.028,75.479'+
                  'c-18.247,25.873-16.699,66.745-16.699,66.745'+
                  'h10.606',
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
        // container_sel,
        // container_node,
        // container_margin_bottom,
        // window_height,
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
            .on('resize.bottom', function () {
                calculate_variables();
            })
            .on('scroll.bottom', function () {
                if (!container_node) throw "Requires container.";
                if (dirty) return;

                body_height = parseInt(body_sel.style('height'));
                if (body_height <=
                    (window.innerHeight + window.scrollY)) {

                    dirty = true;
                    self.dispatch.bottom();
                    console.log('dispatch bottom');
                }
            });
    };

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        container_node = container_sel.node();
        return self;
    };

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
                configre_fixed();
            })
            .on('resize.fixed', function () {
                calc_contraints();
                configre_fixed();
            });
    };

    function configre_fixed () {
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
                .attr('class', 'lightbox-meta col-percent-2-10');

        var lightbox_work_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class',
                      'lightbox-work '+
                      'offset-percent-2-10 '+
                      'col-percent-8-10');

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

        lightbox_meta_info_sel
            .append('p')
            .attr('class', 'lightbox-meta-info--personal-link')
            .append('a')
            .attr('href', data.url)
            .attr('target', '_blank')
            .text('Behance');

        container_sel.classed('active', true);
        body_sel.classed('no-scroll', true);

        container_sel.on('click', function () {
            close();
        });
    };

    function close () {
        container_sel
            .classed('active', false)
            .html('');

        body_sel.classed('no-scroll', false);

        container_sel.on('click', null);
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
            url: d.owners[0].url
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2RlcGFydG1lbnRzLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2xvZ28vaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvbG9nby9zY2FsZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9sb2dvL3N2Zy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L25hdi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2JvdHRvbS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2RhdGEuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29yay9maXhlZC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGF5b3V0X2ZpeGVkLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGF5b3V0X2ltYWdlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGlnaHRib3guanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29yay9zY3JvbGx0by5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL3RyYW5zZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDalJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3paQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBjb250YWluZXJfc2VsLFxuICAgICAgICBtb2JpbGVfY29udGFpbmVyX3NlbCxcbiAgICAgICAgZGVwdGFydG1lbnRfc2VsLFxuICAgICAgICBtb2JpbGVfZGVwYXJ0bWVudF9zZWwsXG4gICAgICAgIG1vYmlsZV9hY3RpdmF0b3Jfc2VsLFxuICAgICAgICBtb2JpbGVfYmxhbmtldF9zZWwsXG4gICAgICAgIG1vYmlsZV9hY3RpdmUgPSBmYWxzZSxcbiAgICAgICAgc2VsZWN0ZWQgPSAnQWxsJyxcbiAgICAgICAgY2xzID0gJ2RlcGFydG1lbnQnLFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdjbGljaycpO1xuXG4gICAgdmFyIGRlcGFydG1lbnRzID0gW1xuICAgICAgICAnQWxsJyxcbiAgICAgICAgJ0FyY2hpdGVjdHVyZScsXG4gICAgICAgICdDZXJhbWljcycsXG4gICAgICAgICdEaWdpdGFsICsgTWVkaWEnLFxuICAgICAgICAnRnVybml0dXJlIERlc2lnbicsXG4gICAgICAgICdHbGFzcycsXG4gICAgICAgICdHcmFwaGljIERlc2lnbicsXG4gICAgICAgICdJbmR1c3RyaWFsIERlc2lnbicsXG4gICAgICAgICdJbnRlcmlvciBBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnSmV3ZWxyeSArIE1ldGFsc21pdGhpbmcnLFxuICAgICAgICAnTGFuZHNjYXBlIEFyY2hpdGVjdHVyZScsXG4gICAgICAgICdQYWludGluZycsXG4gICAgICAgICdQaG90b2dyYXBoeScsXG4gICAgICAgICdQcmludG1ha2luZycsXG4gICAgICAgICdTY3VscHR1cmUnLFxuICAgICAgICAnVGV4dGlsZXMnXG4gICAgXTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLm1vYmlsZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG1vYmlsZV9jb250YWluZXJfc2VsO1xuICAgICAgICBtb2JpbGVfY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmFjdGl2YXRvclZpc2libGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIW1vYmlsZV9hY3RpdmF0b3Jfc2VsKSByZXR1cm47XG4gICAgICAgIG1vYmlsZV9hY3RpdmF0b3Jfc2VsLmNsYXNzZWQoJ3Zpc2libGUnLCBfKTtcbiAgICB9O1xuXG4gICAgc2VsZi5zZWxlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRlcHRhcnRtZW50X3NlbDtcbiAgICAgICAgZGVwdGFydG1lbnRfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXNBcnJheSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSB0aHJvdyBcImRlcGFydG1lbnRzIGlzIGEgZ2V0dGVyXCI7XG4gICAgICAgIHJldHVybiBkZXBhcnRtZW50cztcbiAgICB9O1xuXG4gICAgc2VsZi5pc0ZpbHRlcmFibGUgPSBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICBjaGVja19maWx0ZXJhYmxlKGRhdGEpO1xuICAgICAgICB1cGRhdGVfZGVwYXJ0bWVudF9zZWwoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWNvbnRhaW5lcl9zZWwpIHRocm93IFwicmVxdWlyZXMgYSB3cmFwcGVyXCI7XG5cbiAgICAgICAgdmFyIGRhdGEgPSBkZXBhcnRtZW50cy5tYXAoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciB2ID0ge1xuICAgICAgICAgICAgICAgIG5hbWU6IGQsXG4gICAgICAgICAgICAgICAgZXNjYXBlZDogZXNjYXBlX2RlcGFydG1lbnQoZCksXG4gICAgICAgICAgICAgICAgZmlsdGVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQ6IGZhbHNlXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoZCA9PT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2LnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2LmZpbHRlcmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyBzZXR1cCBzdHJ1Y3R1cmVcbiAgICAgICAgbW9iaWxlX2FjdGl2YXRvcl9zZWwgPSBtb2JpbGVfY29udGFpbmVyX3NlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBjbHMgKyAnLWFjdGl2YXRvcicpXG4gICAgICAgICAgICAudGV4dChzZWxlY3RlZClcbiAgICAgICAgICAgIC5vbignY2xpY2submF2QWN0aXZhdG9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG1vYmlsZV9hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9uYXYoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIG1vYmlsZV9ibGFua2V0X3NlbCA9IG1vYmlsZV9jb250YWluZXJfc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGNscyArICctYmxhbmtldCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrLm5hdkJsYW5rZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbW9iaWxlX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9uYXYoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIG1vYmlsZV9kZXBhcnRtZW50X3NlbCA9IG1vYmlsZV9jb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgY2xzICsgJy1lbGVtZW50cyBkZXBhcnRtZW50cycpXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKGNscylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBrbHMgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoZC5maWx0ZXJhYmxlKSBrbHMgKz0gJyBmaWx0ZXJhYmxlJztcbiAgICAgICAgICAgICAgICBpZiAoZC5zZWxlY3RlZCkga2xzICs9ICcgc2VsZWN0ZWQnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubmFtZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NsaWNrLmRlcGFydG1lbnRzJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IHJlc3BvbmRzIHRvIGZpbHRlcmFibGUgaXRlbXNcbiAgICAgICAgICAgICAgICBpZiAoIWQuZmlsdGVyYWJsZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZGVwYXJ0bWVudF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGRkLCBkaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGQuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBkLnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2xpY2soZC5lc2NhcGVkKTtcblxuICAgICAgICAgICAgICAgIHVwZGF0ZV9kZXBhcnRtZW50X3NlbCgpO1xuXG4gICAgICAgICAgICAgICAgbW9iaWxlX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZC5uYW1lO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9uYXYoKTtcblxuICAgICAgICAgICAgICAgIGRlcGFydG1lbnRfc2VsLmRhdGEobW9iaWxlX2RlcGFydG1lbnRfc2VsLmRhdGEoKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGUgYnVzaW5lc3NcblxuICAgICAgICBkZXBhcnRtZW50X3NlbCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoY2xzKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtscyA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChkLmZpbHRlcmFibGUpIGtscyArPSAnIGZpbHRlcmFibGUnO1xuICAgICAgICAgICAgICAgIGlmIChkLnNlbGVjdGVkKSBrbHMgKz0gJyBzZWxlY3RlZCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5uYW1lO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2suZGVwYXJ0bWVudHMnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgcmVzcG9uZHMgdG8gZmlsdGVyYWJsZSBpdGVtc1xuICAgICAgICAgICAgICAgIGlmICghZC5maWx0ZXJhYmxlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBkZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZGQsIGRpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZC5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGQuc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jbGljayhkLmVzY2FwZWQpO1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlX2RlcGFydG1lbnRfc2VsKCk7XG5cbiAgICAgICAgICAgICAgICBtb2JpbGVfYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBkLm5hbWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlX25hdigpO1xuXG4gICAgICAgICAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsLmRhdGEoZGVwYXJ0bWVudF9zZWwuZGF0YSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbmF2ICgpIHtcbiAgICAgICAgbW9iaWxlX2NvbnRhaW5lcl9zZWwuY2xhc3NlZCgnYWN0aXZlJywgbW9iaWxlX2FjdGl2ZSk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ25vLXNjcm9sbCcsIG1vYmlsZV9hY3RpdmUpO1xuICAgICAgICBtb2JpbGVfYWN0aXZhdG9yX3NlbC50ZXh0KHNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfZGVwYXJ0bWVudF9zZWwgKCkge1xuICAgICAgICBkZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgLmNsYXNzZWQoJ2ZpbHRlcmFibGUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmZpbHRlcmFibGU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zZWxlY3RlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBtb2JpbGVfZGVwYXJ0bWVudF9zZWxcbiAgICAgICAgICAgIC5jbGFzc2VkKCdmaWx0ZXJhYmxlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5maWx0ZXJhYmxlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja19maWx0ZXJhYmxlIChkYXRhKSB7XG4gICAgICAgIC8vIGdpdmVuIHNvbWUgZGF0YSwgY2hlY2sgdG8gc2VlIGlmXG4gICAgICAgIC8vIGVhY2ggY2F0ZWdvcnkgaXMgZmlsdGVyYWJsZVxuICAgICAgICBcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkZCwgZGkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQucmlzZF9wcm9ncmFtID09PSBkZC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZC5maWx0ZXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGRkLCBkaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5yaXNkX3Byb2dyYW0gPT09IGRkLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRkLmZpbHRlcmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVzY2FwZV9kZXBhcnRtZW50KGQpIHtcbiAgICAgICAgcmV0dXJuIGQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgTmF2ID0gcmVxdWlyZSgnLi9vdmVybGF5L25hdicpLFxuICAgIExvZ28gPSByZXF1aXJlKCcuL2xvZ28vaW5kZXgnKSxcbiAgICBXb3JrID0gcmVxdWlyZSgnLi93b3JrL2luZGV4Jyk7XG5cbnZhciB3b3JrX2FyZ3MgPSBwYXJzZV91cmxfZm9yX3dvcmsod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuXG5zaXRlKClcbiAgICAuY29sb3JzKClcbiAgICAub3ZlcmxheSgpXG4gICAgLmxvZ28oKVxuICAgIC53b3JrKHdvcmtfYXJncyk7XG5cblxuZnVuY3Rpb24gcGFyc2VfdXJsX2Zvcl93b3JrIChwYXRoKSB7XG4gICAgY29uc29sZS5sb2cocGF0aCk7XG4gICAgdmFyIGlzX2l0X2xpdmUgPSBmYWxzZTtcbiAgICB2YXIgd2hpY2hfbGF5b3V0ID0gJ2ltYWdlJztcbiAgICBpZiAocGF0aC5pbmRleE9mKCd3b3JrJykgPiAtMSkge1xuICAgICAgICBpc19pdF9saXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHBhdGguaW5kZXhPZignZml4ZWQnKSA+IC0xKSB7XG4gICAgICAgIHdoaWNoX2xheW91dCA9ICdmaXhlZCc7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGxpdmU6IGlzX2l0X2xpdmUsXG4gICAgICAgIGxheW91dDogd2hpY2hfbGF5b3V0XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc2l0ZSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29sb3JfdmFsdWVzID0ge1xuICAgICAgICAgICAgcHVycGxlOiAncmdiKDM4LCAzNCwgOTgpOycsXG4gICAgICAgICAgICBvcmFuZ2U6ICdyZ2IoMjU1LCA2MSwgNTYpOycsXG4gICAgICAgICAgICAnbHQtcHVycGxlJzogJ3JnYigxNDYsIDUzLCAxMjUpJyxcbiAgICAgICAgICAgIGJsdWU6ICdyZ2IoNDMsIDg5LCAxODQpJ1xuICAgICAgICB9LFxuICAgICAgICB1c2VfaW1hZ2VzX2FzX292ZXJsYXlfYmFja2dyb3VuZCA9IHRydWUsXG4gICAgICAgIGJhY2tncm91bmRfaW1hZ2Vfcm90YXRpb25fbWV0aG9kID0gJ2Jsb2NrJyxcbiAgICAgICAgYmFja2dyb3VuZF9pbWFnZV9yb3RhdGlvbl9tZXRob2RzID0gWydmYWRlJywgJ2Jsb2NrJ10sXG4gICAgICAgIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIHZhciBjb2xvcnMgPSBPYmplY3Qua2V5cyhjb2xvcl92YWx1ZXMpO1xuXG4gICAgdmFyIG5hdiA9IE5hdigpO1xuICAgIHZhciBsb2dvID0gTG9nbygpO1xuICAgIHZhciB3b3JrID0gV29yaygpO1xuXG4gICAgc2VsZi5jb2xvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByYW5kb21faW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb2xvcnMubGVuZ3RoKTtcblxuICAgICAgICB2YXIgY29sb3IgPSBjb2xvcnNbcmFuZG9tX2luZGV4XTtcbiAgICAgICAgdmFyIGFsdF9jb2xvcnMgPSBjb2xvcnMuc2xpY2UoMCxyYW5kb21faW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbmNhdChjb2xvcnMuc2xpY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21faW5kZXggKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JzLmxlbmd0aCkpO1xuXG4gICAgICAgIHZhciBhbHRfY29sb3IgPSBhbHRfY29sb3JzW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRfY29sb3JzLmxlbmd0aCldO1xuXG4gICAgICAgIGJvZHkuY2xhc3NlZCgnYm9keS0nICsgY29sb3IsIHRydWUpO1xuICAgICAgICBib2R5LmNsYXNzZWQoJ2JvZHktYWx0LScgKyBhbHRfY29sb3IsIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLm92ZXJsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYWlycyA9IGQzLnNlbGVjdEFsbCgnLm92ZXJsYXktbmF2LWl0ZW0nKVxuICAgICAgICAgICAgLmRhdHVtKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGF0YXNldDsgfSk7XG5cbiAgICAgICAgbmF2LnNlbGVjdGlvbihwYWlycylcbiAgICAgICAgICAgIC5zZXR1cCgpXG4gICAgICAgICAgICAuYXR0YWNoUmVzaXplKCk7XG5cbiAgICAgICAgLy8gc2V0dXAgY2xpY2sgdHJhY2tpbmcgd2l0aCBnb29nbGUgYW5hbHl0aWNzXG4gICAgICAgIG5hdi5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdhc3Rlcmlza0NsaWNrJywgZnVuY3Rpb24gKG92ZXJsYWlkX2Jvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9nYXEpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAob3ZlcmxhaWRfYm9vbGVhbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBvcGVuaW5nXG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR29CdXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBc3RlcmlzayBDbGljayAtIE9wZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdIb21lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zaW5nXG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR29CdXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBc3RlcmlzayBDbGljayAtIENsb3NlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQWJvdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmxvZ28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZ28uY29udGFpbmVyKGQzLnNlbGVjdCgnLmxvZ28tbGluZScpKVxuICAgICAgICAgICAgLmF0dGFjaFJlc2l6ZSgpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYud29yayA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIGlmIChhcmdzLmxpdmUpIHtcbiAgICAgICAgICAgIC8vIHNldCB1cFxuICAgICAgICAgICAgd29yay5jb250YWluZXIoZDMuc2VsZWN0KCcud29yay1jb250YWluZXInKSlcbiAgICAgICAgICAgICAgICAuZmlsdGVycyhkMy5zZWxlY3QoJy5kZXBhcnRtZW50LWNvbnRhaW5lcicpKVxuICAgICAgICAgICAgICAgIC5pbmZpbml0ZVNjcm9sbCh0cnVlKVxuICAgICAgICAgICAgICAgIC5sYXlvdXQoYXJncy5sYXlvdXQpXG4gICAgICAgICAgICAgICAgLmxpZ2h0Ym94Q29udGFpbmVyKGQzLnNlbGVjdCgnLmxpZ2h0Ym94JykpXG4gICAgICAgICAgICAgICAgLmludHJvKGQzLnNlbGVjdCgnLmludHJvLXF1b3RlJykpXG4gICAgICAgICAgICAgICAgLmluaXRpYWxpemUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLndvcmstc2VjdGlvbicpLnJlbW92ZSgpO1xuICAgICAgICAgICAgZDMuc2VsZWN0KCcubGlnaHRib3gnKS5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59IiwidmFyIGNvbm5lY3RMb2dvU2NhbGUgPSByZXF1aXJlKCcuL3NjYWxlJyk7XG52YXIgVXRpbGl0eSA9IHJlcXVpcmUoJy4vc3ZnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9nbyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgd2luZG93X3NlbCA9IGQzLnNlbGVjdCh3aW5kb3cpLFxuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGxvZ29fc3ZnLFxuICAgICAgICBsb2dvX3RleHRfc2VsLFxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbCxcbiAgICAgICAgc3RyYWlnaHRfbGluZSA9IGQzLnN2Zy5saW5lKCksXG4gICAgICAgIGNvbm5lY3RfbG9nb19zY2FsZSA9IGNvbm5lY3RMb2dvU2NhbGUoKSxcbiAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsO1xuXG4gICAgdmFyIHV0aWxpdHkgPSBVdGlsaXR5KCk7XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxvZ29fY29udGFpbmVyX3NlbDtcbiAgICAgICAgbG9nb19jb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZGVsYXlQYXN0UmV2ZWFsID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGVsYXlfcGFzdF9yZXZlYWxfc2VsO1xuICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hdHRhY2hSZXNpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvd19zZWxcbiAgICAgICAgICAgIC5vbigncmVzaXplLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVjYWx1bGF0ZV9sb2dvX2xpbmUoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChNb2Rlcm5penIpIHtcbiAgICAgICAgICAgIGlmIChNb2Rlcm5penIudG91Y2gpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3dfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5vbignc2Nyb2xsLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWNhbHVsYXRlX2xvZ29fbGluZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gc2V0IHVwIHN2Z1xuICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIGxvZ29fc3ZnID0gbG9nb19jb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLXN2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2luZG93LmlubmVyV2lkdGgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgICAgICAgLy8gc2VsZWN0aW9uIG9mIHRoZSB0ZXh0IHRoYXQgd2lsbCBkZWZpbmUgdGhlIGxpbmVcbiAgICAgICAgbG9nb190ZXh0X3NlbCA9IGQzLnNlbGVjdCgnaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLmxvZ28tdGV4dC1jb21wb25lbnQnKTtcblxuICAgICAgICBzZXR1cF9yZXZlYWwoKTtcblxuICAgICAgICAvLyB2ZXJ0aWNpZXMgZm9yIFxuICAgICAgICB2YXIgdGV4dF92ZXJ0aWNpZXMgPSBsb2dvX2xpbmVfdGV4dF92ZXJ0aWNpZXMobG9nb190ZXh0X3NlbCk7XG4gICAgICAgIHZhciBjb25uZWN0aW5nX3NlZ21lbnRzID1cbiAgICAgICAgICAgICAgICBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWdtZW50cyh0ZXh0X3ZlcnRpY2llcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dfd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgdmFyIG1lcmdlZF9kID0gbWVyZ2VfbGluZXModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpbmdfc2VnbWVudHMpO1xuXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsID0gbG9nb19zdmcuc2VsZWN0QWxsKCcubG9nby1saW5lLW1lcmdlZCcpXG4gICAgICAgICAgICAuZGF0YShbbWVyZ2VkX2RdKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWxpbmUtbWVyZ2VkJylcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkOyB9KTtcblxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbC5jYWxsKHR3ZWVuX2luKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0dXBfcmV2ZWFsICgpIHtcbiAgICAgICAgZDMuc2VsZWN0KCdib2R5JykuY2xhc3NlZCgndG8tcmV2ZWFsJywgZmFsc2UpO1xuXG4gICAgICAgIGlmIChkZWxheV9wYXN0X3JldmVhbF9zZWwpIHtcbiAgICAgICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbFxuICAgICAgICAgICAgICAgIC5kYXR1bShmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRhdGFzZXQ7IH0pO1xuXG4gICAgICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWxcbiAgICAgICAgICAgICAgICAub24oJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChkLmRlbGF5ZWRjbGFzcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCd0cmFuc2l0aW9uZW5kJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnd2Via2l0VHJhbnNpdGlvbkVuZCcpO1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChkLmRlbGF5ZWRjbGFzcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ29UcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ29UcmFuc2l0aW9uRW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKGQuZGVsYXllZGNsYXNzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ29UcmFuc2l0aW9uRW5kJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ290cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ290cmFuc2l0aW9uZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKGQuZGVsYXllZGNsYXNzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ290cmFuc2l0aW9uZW5kJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ01TVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdNU1RyYW5zaXRpb25FbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoZC5kZWxheWVkY2xhc3MsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignTVNUcmFuc2l0aW9uRW5kJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWNhbHVsYXRlX2xvZ29fbGluZSAoKSB7XG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgbG9nb19zdmdcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvd193aWR0aClcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICBpZiAobG9nb19saW5lX21lcmdlZF9zZWwpIHtcbiAgICAgICAgICAgIHVwZGF0ZV9sb2dvX2xpbmUod2luZG93X3dpZHRoLCB3aW5kb3dfaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9sb2dvX2xpbmUgKHd3aWR0aCwgd2hlaWdodCkge1xuICAgICAgICB2YXIgdGV4dF92ZXJ0aWNpZXMgPSBsb2dvX2xpbmVfdGV4dF92ZXJ0aWNpZXMobG9nb190ZXh0X3NlbCk7XG4gICAgICAgIHZhciBjb25uZWN0aW5nX3NlZ21lbnRzID1cbiAgICAgICAgICAgICAgICBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWdtZW50cyh0ZXh0X3ZlcnRpY2llcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3d2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlaWdodCk7XG5cbiAgICAgICAgdmFyIG1lcmdlZF9kID0gbWVyZ2VfbGluZXModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpbmdfc2VnbWVudHMpO1xuXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsXG4gICAgICAgICAgICAuZGF0YShbbWVyZ2VkX2RdKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZDsgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nb19saW5lX3RleHRfdmVydGljaWVzIChzZWwpIHtcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gW107XG5cbiAgICAgICAgc2VsLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdmFyIGZpcnN0LCBzZWNvbmQ7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gW2JvdW5kcy5sZWZ0ICsgMyxcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNDUpKSldO1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IFtib3VuZHMucmlnaHQgKyA2LFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC40NSkpKV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKChpID09PSAxKSB8IChpID09PSAyKSkge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gW2JvdW5kcy5sZWZ0IC0gNixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNDUpKSldO1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IFtib3VuZHMucmlnaHQgKyA2LFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC40NSkpKV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IDMpIHtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IFtib3VuZHMubGVmdCAtIDYsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjU1KSkpXTtcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSBbYm91bmRzLnJpZ2h0ICsgNixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNTUpKSldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0X3ZlcnRpY2llcy5wdXNoKFtmaXJzdCwgc2Vjb25kXSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRleHRfdmVydGljaWVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fbGluZV9jb25uZWN0aW5nX3NlZ21lbnRzIChzdGFydF9lbmRfcG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3d2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWlnaHQpIHtcbiAgICAgICAgdmFyIGxpbmVfc2l6ZV90b19kcmF3ID1cbiAgICAgICAgICAgICAgICBjb25uZWN0X2xvZ29fc2NhbGUuY2hvb3NlX3NpemUod3dpZHRoLCB3aGVpZ2h0KTtcblxuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0X2VuZF9wb2ludHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgaWYgKChpKzEpIDwgc3RhcnRfZW5kX3BvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBzdGFydF9lbmRfcG9pbnRzW2ldWzFdLFxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBzdGFydF9lbmRfcG9pbnRzW2krMV1bMF07XG5cbiAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzXG4gICAgICAgICAgICAgICAgICAgIC5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNjYWxlW2xpbmVfc2l6ZV90b19kcmF3XShzdGFydCwgZW5kKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpbmdfc2VnbWVudHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWVyZ2VfbGluZXModGV4dF92ZXJ0aWNpZXMsIGNvbm5lY3Rpbmdfc2VnbWVudHMpIHtcbiAgICAgICAgLy8gdGFrZXMgYXJyYXkgb2YgdmVydGV4IHBhaXJzLCBhbmQgcGF0aFxuICAgICAgICAvLyBlbGVtZW50cyBvZiBjb25uZWN0aW5nIHNlZ21lbnRzLlxuICAgICAgICAvLyByZXR1cm5zIG9uIHBhdGggZCBhdHRyaWJ1dGVcbiAgICAgICAgdmFyIGQgPSAnJztcblxuICAgICAgICB2YXIgdGVtcF9zdmcgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJyk7XG4gICAgICAgIHZhciB0ZW1wX3BhdGggPSB0ZW1wX3N2Z1xuICAgICAgICAgICAgLnNlbGVjdEFsbCgndGVtcC1wYXRoJylcbiAgICAgICAgICAgIC5kYXRhKHRleHRfdmVydGljaWVzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBzdHJhaWdodF9saW5lKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RlbXAtcGF0aCcpXG4gICAgICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgIHRlbXBfcGF0aC5lYWNoKGZ1bmN0aW9uICh0ZCwgdGkpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRkKTtcbiAgICAgICAgICAgIHZhciB0ZXh0X2QgPSBkMy5zZWxlY3QodGhpcykuYXR0cignZCcpO1xuICAgICAgICAgICAgZCArPSB0ZXh0X2Q7XG4gICAgICAgICAgICBpZiAoY29ubmVjdGluZ19zZWdtZW50c1t0aV0pIHtcbiAgICAgICAgICAgICAgICB2YXIgY29ubmVjdGluZ19kID0gY29ubmVjdGluZ19zZWdtZW50c1t0aV07XG4gICAgICAgICAgICAgICAgZCArPSBjb25uZWN0aW5nX2Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxpdHkuY29udmVydFRvUmVsYXRpdmUodGVtcF9wYXRoLmF0dHIoJ2QnLCBkKS5ub2RlKCkpO1xuICAgICAgICAvLyByZXBsYWNlIGFsbCBgbWAgaW5zdHJ1Y3Rpb25zIHdpdGggYGxgLCBleGNlcHRcbiAgICAgICAgLy8gZm9yIHRoZSBmaXJzdCBvbmUuIHRoaXMgaXMgYSByZXZlcnNlIHJlZ2V4XG4gICAgICAgIGQgPSB0ZW1wX3BhdGguYXR0cignZCcpLnJlcGxhY2UoLyg/IV4pbS9nLCAnbCcpO1xuXG4gICAgICAgIHRlbXBfc3ZnLnJlbW92ZSgpO1xuICAgICAgICB0ZW1wX3BhdGgucmVtb3ZlKCk7XG5cbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5faW4ocGF0aCkge1xuICAgICAgICBwYXRoLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDgwMDApXG4gICAgICAgICAgICAuYXR0clR3ZWVuKCdzdHJva2UtZGFzaGFycmF5JywgdHdlZW5EYXNoKVxuICAgICAgICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZGFzaCBhcnJheSwgYXMgcmVzaXppbmdcbiAgICAgICAgICAgICAgICAvLyB0aGUgYnJvd3NlciB3aWxsIGNoYW5nZSB0aGUgbGVuZ3RoXG4gICAgICAgICAgICAgICAgLy8gYW5kIHRoZXJlIGlzIG5vIG5lZWQgdG8gcmUtY29tcHV0ZVxuICAgICAgICAgICAgICAgIC8vIHRoZSBkYXNoIGFycmF5IHRvIGZpdCBpdC5cbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsICdub25lJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2VlbkRhc2goKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKCcwLCcgKyBsLCBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9jb2xvcl9zdG9wcyAoc2VsKXtcbiAgICAgICAgc2VsLmFwcGVuZCgnc3RvcCcpXG4gICAgICAgICAgICAuYXR0cignb2Zmc2V0JywgJzAlJylcbiAgICAgICAgICAgIC5hdHRyKCdzdG9wLWNvbG9yJywgJ3doaXRlJylcbiAgICAgICAgICAgIC5hdHRyKCdzdG9wLW9wYWNpdHknLCAwKTtcbiAgICAgICAgc2VsLmFwcGVuZCgnc3RvcCcpXG4gICAgICAgICAgICAuYXR0cignb2Zmc2V0JywgJzEwMCUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0b3AtY29sb3InLCAnd2hpdGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0b3Atb3BhY2l0eScsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgVXRpbGl0eSA9IHJlcXVpcmUoJy4vc3ZnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9nb19zY2FsZSAoKSB7XG4gICAgdmFyIHV0aWxpdHkgPSBVdGlsaXR5KCk7XG5cbiAgICB2YXIgc2VnbWVudHMgPSBbe1xuICAgICAgICAgICAgZnJvbTogJ1JJU0QnLFxuICAgICAgICAgICAgdG86ICdHcmFkJyxcbiAgICAgICAgICAgIHNjYWxlVXNpbmc6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFksXG4gICAgICAgICAgICAgICAgJzc2OCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZLFxuICAgICAgICAgICAgICAgIC8vICc3NjgnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsLFxuICAgICAgICAgICAgICAgICcxMDI0JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXduX2RlbHRhOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTU1Ljc5Mzk4ODg4MzQ5NTMzLFxuICAgICAgICAgICAgICAgICAgICB5OiAxMDMzLjA3OTk1NjA1NDY4NzVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICc3NjgnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0xMTAuMDQwMDA4NTQ0OTIxODgsXG4gICAgICAgICAgICAgICAgICAgIHk6IDM4OS4xODQ5OTc1NTg1OTM3NVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0xMTcuMzI5OTYzNTA1MjY4MSxcbiAgICAgICAgICAgICAgICAgICAgeTogMzg5LjE4NTk3NDEyMTA5Mzc1XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhdGhzOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6ICdNMC44NzEsMCcrXG4gICAgICAgICAgICAgICAgICAndjE2LjgxJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDAsNzMuMTU1LDAsMTMxLjkxNicrXG4gICAgICAgICAgICAgICAgICAnYzAsMTE3LjQyOCw1OS4yNzMsMjA0LjQ5MiwyNjQuNzYzLDIwNC40OTInK1xuICAgICAgICAgICAgICAgICAgJ2MyMDguNDksMCwyMTEuMzE1LTI0MC45ODcsMC0yNDAuOTg3JytcbiAgICAgICAgICAgICAgICAgICdjLTQ4Ljc3NCwwLTk5Ljc3MSwwLTk5Ljc3MSwwJytcbiAgICAgICAgICAgICAgICAgICd2Mzg5LjkxJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDYxLjk2NS0xLjAzOSwxMTkuOTk0LDM2LjY3OScrXG4gICAgICAgICAgICAgICAgICAnYzU5Ljk5NywzOC45OTgsNzYuNDk2LDEzNC4zODIsMTYwLjQ5MiwxMzQuMzgyJytcbiAgICAgICAgICAgICAgICAgICdjOTUuOTk1LDAsOTMuNzU1LTk1LjczNCwxLjYzNS0xMDcuNDM5JytcbiAgICAgICAgICAgICAgICAgICdjLTY0LjYzMi04LjIxMy0xMjYuNDQ4LDk2LjI3LTE2Mi43NDksMTM0LjA1NycrXG4gICAgICAgICAgICAgICAgICAnYy00MS43NCw0My40NDctMTU1LjM3LDEwMy44NzYtMjI4LjcyNSw2NC44NzgnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTEyLjYzMi01OS44NzksMi44OTItMjEwLjQ5NCwxMDAuMzUzLTk3LjQ5NScrXG4gICAgICAgICAgICAgICAgICAnQzM2My44NTMsOTA3LjE5Mi01NC45MjMsOTE1Ljc4OC01NC45MjMsOTIxLjQzJytcbiAgICAgICAgICAgICAgICAgICdjMCwxOC4wMTMsMCwxMTEuNjUsMCwxMTEuNjUnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTAsMCcrXG4gICAgICAgICAgICAgICAgICAnaDE3LjQ4MicrXG4gICAgICAgICAgICAgICAgICAnYzAsMCwwLDAsMCwzNi44MScrXG4gICAgICAgICAgICAgICAgICAvLyAnYzAsMCwwLDI4Ljg1MSwwLDM2LjgxJytcbiAgICAgICAgICAgICAgICAgICdjMCwyOC4wNDItMTUuOTAxLDg3LjM3LTYxLjE4NSw4Ny4zNycrXG4gICAgICAgICAgICAgICAgICAnYy01My4yOTgsMC03OS44MDgsMC4wMDUtNzkuODA4LDAuMDA1bDAtNTInK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMzUuOTIxLTQuMzkzLDQ4LjY0OSwzLjc1OCcrXG4gICAgICAgICAgICAgICAgICAnYzM3Ljg2MSwyNC4yNDIsMjQuMTk1LDg0LjkwOS0yOC4xMzksMTUyLjI0MicrXG4gICAgICAgICAgICAgICAgICAnYy0yNi4zNjgsMzMuOTI1LTMyLjczNCw3NS4xNjctMzEuMjksMTA2LjY1MycrXG4gICAgICAgICAgICAgICAgICAnYzEuNDQ3LDMxLjU1LDEyLjEzNiw1NC4zNDcsMjQuMDA2LDU0LjM0NycsXG4gICAgICAgICAgICAgICAgLy8gJzc2OCc6ICdNOTQuMjYtMTUnK1xuICAgICAgICAgICAgICAgIC8vICAgJ2gyOS43OTYnK1xuICAgICAgICAgICAgICAgIC8vICAgJ2MwLDAsMC45MzYsOC44NTEsMC45MzYsMTYuODEnK1xuICAgICAgICAgICAgICAgIC8vICAgJ2MwLDI4LjA0Mi0xNS45MDEsNjcuMzctNjEuMTg1LDY3LjM3JytcbiAgICAgICAgICAgICAgICAvLyAgICdDMTAuNTEsNjkuMTgtMTYsNjkuMTg1LTE2LDY5LjE4NScrXG4gICAgICAgICAgICAgICAgLy8gICAndi01MicrXG4gICAgICAgICAgICAgICAgLy8gICAnYzAsMCwzNS45MjEtNC4zOTMsNDguNjQ5LDMuNzU4JytcbiAgICAgICAgICAgICAgICAvLyAgICdjMzcuODYxLDI0LjI0MiwyOS42NDUsNDYuNzc3LTMuOCw4MC4yNDInK1xuICAgICAgICAgICAgICAgIC8vICAgJ2MtMTcuMDI3LDE3LjAzOC00NC42MjksMTctNDQuNjI5LDQ4LjY1MycrXG4gICAgICAgICAgICAgICAgLy8gICAnYzAsMTguMDEzLDAsMjQuMzQ3LDAsMjQuMzQ3JyxcbiAgICAgICAgICAgICAgICAnMTAyNCc6ICdNMC4zMzMsMEgxNDA4JyArXG4gICAgICAgICAgICAgICAgICAnYzAsMCw3LjM3LDU0LjUzNi01Ni4zODEsNzUuNjI5JyArXG4gICAgICAgICAgICAgICAgICAnYy00OS43MTgsMTYuNDUtMTgxLjEyOC0xNi4yNjItMjMxLjk4OSwyNi45OTknICtcbiAgICAgICAgICAgICAgICAgICdDOTg5LjEzNiwyMTMuNjIyLDExNDkuNjI4LDM0NC4xOCw5MjAuMTUzLDM0NC4xOCcgK1xuICAgICAgICAgICAgICAgICAgJ2MtNTMuMjk4LDAtMjEwLjY0MSwwLjAwNS0yMTAuNjQxLDAuMDA1bDAtMjcyJyArXG4gICAgICAgICAgICAgICAgICAnYzAsMCwxOTcuMTI4LTE2LjA1NSwxODIuMTI5LDg4Ljk0JyArXG4gICAgICAgICAgICAgICAgICAnYy0yNC43NjgsMTczLjM3OC00NTIuODIxLTgxLjUxMy03NDUuNDYzLTcxLjk5NicgK1xuICAgICAgICAgICAgICAgICAgJ2MtMTg0LjQ5MSw2LTIzNC4xNzgsNjUuODktMjcxLjg0OCwxMzkuNDkzJyArXG4gICAgICAgICAgICAgICAgICAnYy0zNi4xMDQsNzAuNTQ0LTEwLjQ4NCwxNjAuNTY0LDEuMzg2LDE2MC41NjQnICtcbiAgICAgICAgICAgICAgICAgICdjMi4yNDEsMCw3LjI4NCwwLDcuMjg0LDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGZyb206ICdHcmFkJyxcbiAgICAgICAgICAgIHRvOiAnU2hvdycsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxYLFxuICAgICAgICAgICAgICAgICc3NjgnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWCxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxYXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhd25fZGVsdGE6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAzNDQuMTQwMDE0NjQ4NDM3NSxcbiAgICAgICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzc2OCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMTI2MC45NTgwMDc4MTI1LFxuICAgICAgICAgICAgICAgICAgICB5OiAwLjIyNjk4NTk2MTE5ODgwNjc2XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMTI2MC40OTk5Mjc3NTkxNzA1LFxuICAgICAgICAgICAgICAgICAgICB5OiAwLjAwMDAwMjM4NDE4NTc5MTAxNTYyNVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAgICczMDAnOiAnTTAtMC4xMzgnICtcbiAgICAgICAgICAgICAgICAgICAgICAgJ2M4My42MjcsMC42MiwyMzguNzU1LDAsMzQ0LjE0LDAnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTAsMCAnICtcbiAgICAgICAgICAgICAgICAgICAnYzAsMCAxOC44NjEsMC4wNDQgMjUuODE4LDAuMDk1ICcgK1xuICAgICAgICAgICAgICAgICAgICdjNTkuODk2LDAuNDQ0IDQ1MC4wMDYsMCA0NTAuMDA2LDAgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLDAgMCwwIDAsMjQ4LjUgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLDAgLTYuNzk5LDAgLTY4LDAgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MtMTQ4LjI2NiwwIC0xMzgsLTE1Ny41IDAsLTE1Ny41ICcgK1xuICAgICAgICAgICAgICAgICAgICdjMTEwLDAgMTg5LjYyOCwxMTcuNjUgMzAyLDExNiAnICtcbiAgICAgICAgICAgICAgICAgICAnYzE0Ny42MjEsLTIuMTY3IDE5My43ODgsLTIxOC43MDUgMTkzLjc4OCwtMjg1LjY1NyAnICtcbiAgICAgICAgICAgICAgICAgICAnYzAsLTE5MC4zNDMgLTE2MS43ODgsLTEyOC4zNDMgLTE2MS43ODgsLTQ0LjM0MyAnICtcbiAgICAgICAgICAgICAgICAgICAnYzAsNTIuNDAxIDQ4Ljc3Nyw5NC42MzggMTIzLjQyNCwxMDYgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MxMzIuODk0LDIwLjIyOCAyODUuMTA1LDE2LjkzNiAzMDEuNTYzLDE3ICcgK1xuICAgICAgICAgICAgICAgICAgICdjMTQuNzQ0LDAuMDU4IDk0LjE0NywwLjEzMiA5NC4xNDcsMC4xMzInLFxuICAgICAgICAgICAgICAgICcxMDI0JzogJ00wLjcwMSwzLjgxNScgK1xuICAgICAgICAgICAgICAgICAgJ2gxMS43NDQnK1xuICAgICAgICAgICAgICAgICAgJ3YyNzEuMTdoLTE1NC41MDInK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsNy40NjQtODIuMDUxLDQ2LjE5OC0xMjEuOTk1JytcbiAgICAgICAgICAgICAgICAgICdjNDcuOTk4LTQ5LjQ5OCwxNDYuODUzLTY3LjI0OSwxOTQuOTktMzguOTk4JytcbiAgICAgICAgICAgICAgICAgICdjMTIxLjQ5NCw3MS4zMDQsODAuOTk2LDIzMi40OTEsMjMxLjAxNiwyMjUuMTY2JytcbiAgICAgICAgICAgICAgICAgICdjMTk3LjA2Ny05LjYyMiwxNTIuOTY1LTM5Ny42NTUsMjkuOTcxLTQzNi42NTMnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTcwLjE2Ny01My45NTUtMTc5Ljk5MSwyMDYuMDY3LDEyNS4zMzMsMjA2LjA2NycrXG4gICAgICAgICAgICAgICAgICAnYzIwMC40ODksMCwzMTQuMTQ1LTEwNC43NTcsNjY3Ljk4Ny0xMDQuNzU3JytcbiAgICAgICAgICAgICAgICAgICdjMzYuNzUzLDAsMTA3Ljc2MywwLDEwNy43NjMsMCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZnJvbTogJ1Nob3cnLFxuICAgICAgICAgICAgdG86ICcyMDE0JyxcbiAgICAgICAgICAgIHNjYWxlVXNpbmc6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFksXG4gICAgICAgICAgICAgICAgJzc2OCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZLFxuICAgICAgICAgICAgICAgICcxMDI0JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXduX2RlbHRhOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTc1LjU1NjAwNTQ3NzkwNTI3LFxuICAgICAgICAgICAgICAgICAgICB5OiA0OC42ODkwMDY4MDU0MTk5MlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzc2OCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTEzMC43NDQ5OTUxMTcxODc1LFxuICAgICAgICAgICAgICAgICAgICB5OiA0MjYuNzIzOTk5MDIzNDM3NVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0xMDIuMjQ5OTk2NDYwOTc0MjIsXG4gICAgICAgICAgICAgICAgICAgIHk6IDQxMC41MjkwMTkwNDI4NDk1NFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAgICczMDAnOiAnTTczLjYwNi00OC42ODkgJyArXG4gICAgICAgICAgICAgICAgICAgICdjMy4wMzctMC4wMzIsNS43NC0wLjA1Miw4LjA4OS0wLjA1MiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MxNS4zMywwLDYuNzgzLTQ5LjYyNi0zNS4zMzctNTEuMjU4ICcgK1xuICAgICAgICAgICAgICAgICAgICAnYy00My0xLjY2Ny03MC43NSwyNC03Ny4zMzMsNTYgJyArXG4gICAgICAgICAgICAgICAgICAgICdDLTM2LjUyNi0xNy4wMTUtMTQuNjQxLDAtMS45NSwwJyxcbiAgICAgICAgICAgICAgICAnNzY4JzogJ00wLDAnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAtOC4yMDEsMzkuMDk4LTQ0Ljc0NSw1MycrXG4gICAgICAgICAgICAgICAgICAnYy0yNy41MTQsMTAuNDY3LTQwLjk1NiwyMS4wODctNTMsNDcnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTYuNSwzNS41LTYuMTA3LDk1LjkzMyw0My43NzgsOTYuMzI4JytcbiAgICAgICAgICAgICAgICAgICdDLTE0LjA4LDE5Ni42NDMtMTIuNzQ1LDE0OS0xMi43NDUsMTQ5JytcbiAgICAgICAgICAgICAgICAgICdoLTEyMCcrXG4gICAgICAgICAgICAgICAgICAndjg2JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDU5LjEyMSw4LjY2Nyw1OS4xMjEsNDkuNScrXG4gICAgICAgICAgICAgICAgICAnYzAsNDkuOTExLTMwLjEyMSw0NS44MzMtNTEuMDI4LDc1LjQ3OScrXG4gICAgICAgICAgICAgICAgICAnYy0xOC4yNDcsMjUuODczLTE2LjY5OSw2Ni43NDUtMTYuNjk5LDY2Ljc0NScrXG4gICAgICAgICAgICAgICAgICAnaDEwLjYwNicsXG4gICAgICAgICAgICAgICAgJzEwMjQnOiAnTTAuMDYzLTAuMTQ3JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDcuNTg4LDAsOS40OTQsMCcgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAtMTMuNzAxLTczLjIyNi05OC4xMjUtNjIuMzEyJytcbiAgICAgICAgICAgICAgICAgICdjLTg1LjYyLDExLjA2OS0xMzcuNjIsMTMzLjA2OS0yMjcuNTQxLDIxMi42MTEnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTI3LjE1OCwxMTIuNDgxLTMwNy44OTgsMjAxLjIzNi00MTUuNTY3LDIwMS4yMzYnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTI3LjUwMiwwLTE2My41MTItMTA3Ljk2NC04My4wNTgtMTUzLjM3MScrXG4gICAgICAgICAgICAgICAgICAnYzk2LjcwOS01NC41ODEsMjg3LjEyNSwxNTMuNDkxLDQzMS4xMTgsMTUzLjQ5MScrXG4gICAgICAgICAgICAgICAgICAnYzU0LjE1LDAsMTM5LjQyOC0xOC4wODQsMTUyLjM5NS0xMDAuNDg2JytcbiAgICAgICAgICAgICAgICAgICdjMTUuMjUxLTk2LjkyLDgxLjAzMy0xMzMuNTk4LDEzOC41OS05Ny41OTgnK1xuICAgICAgICAgICAgICAgICAgJ2MyNS4xMjIsMTUuNzEzLDQ5LjQ0Myw3Mi0xMC41NTcsMTE3JytcbiAgICAgICAgICAgICAgICAgICdjLTQzLjk1MywzMi45NjUtNjMuOTM3LDUzLTYzLjkzNyw5Ny41ODMnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDQyLjQ2OSwzOS4xOTgsNDIuMzc1LDQ4LjQ5Nyw0Mi4zNzUnK1xuICAgICAgICAgICAgICAgICAgJ2M1LjEzMywwLDE2LjQ0MSwwLDE2LjQ0MSwwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XTtcblxuICAgIHZhciB0ZW1wX3N2ZyA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgdmFyIHRlbXBfcGF0aCA9IHRlbXBfc3ZnXG4gICAgICAgIC5hcHBlbmQoJ3BhdGgnKTtcblxuICAgIHZhciBtZWFzdXJlX2Zvcl9mZiA9IGZhbHNlO1xuXG4gICAgc2VnbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICBkLnJlbGF0aXZlX3BhdGhzX2QgPSB7fTtcbiAgICAgICAgZC5yZWxhdGl2ZV9wYXRocyA9IHt9O1xuICAgICAgICBkLnNjYWxlID0ge307XG5cbiAgICAgICAgaWYgKG1lYXN1cmVfZm9yX2ZmKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWdtZW50c1tpXS5mcm9tICsgJyAnICsgc2VnbWVudHNbaV0udG8pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgcGF0aF9zaXplIGluIGQucGF0aHMpIHtcbiAgICAgICAgICAgIHRlbXBfcGF0aC5hdHRyKCdkJywgZC5wYXRoc1twYXRoX3NpemVdKTtcbiAgICAgICAgICAgIHV0aWxpdHkuY29udmVydFRvUmVsYXRpdmUodGVtcF9wYXRoLm5vZGUoKSk7XG4gICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzX2RbcGF0aF9zaXplXSA9IHRlbXBfcGF0aC5hdHRyKCdkJyk7XG4gICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0gPSB0ZW1wX3BhdGgubm9kZSgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAobWVhc3VyZV9mb3JfZmYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2l6ZTogJywgcGF0aF9zaXplKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVsdGE6ICcsIHV0aWxpdHkucGF0aERlbHRhKFxuICAgICAgICAgICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZC5zY2FsZVtwYXRoX3NpemVdID1cbiAgICAgICAgICAgICAgICBkLnNjYWxlVXNpbmdbcGF0aF9zaXplXShkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5kcmF3bl9kZWx0YVtwYXRoX3NpemVdKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGVtcF9zdmcucmVtb3ZlKCk7XG4gICAgdGVtcF9wYXRoLnJlbW92ZSgpO1xuXG4gICAgdmFyIHNpemVzID0gT2JqZWN0LmtleXMoc2VnbWVudHNbMF0ucGF0aHMpO1xuICAgIHNlZ21lbnRzLmNob29zZV9zaXplID0gZnVuY3Rpb24gKHdpbmRvd193aWR0aCwgd2luZG93X2hlaWdodCkge1xuICAgICAgICB2YXIgY2hvc2VuID0gMDtcbiAgICAgICAgc2l6ZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPD0gd2luZG93X3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgY2hvc2VuID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjaG9zZW4udG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgd2luZG93LnNlZ21lbnRzID0gc2VnbWVudHM7XG5cbiAgICByZXR1cm4gc2VnbWVudHM7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ZnICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5jb252ZXJ0VG9SZWxhdGl2ZSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIGZ1bmN0aW9uIHNldCh0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIHNlZ3MucmVwbGFjZUl0ZW0ocnNlZywgaSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGR4LCBkeSwgeDAsIHkwLCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgIHNlZ3MgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICBmb3IgKHZhciB4ID0gMCwgeSA9IDAsIGkgPSAwLCBsZW4gPSBzZWdzLm51bWJlck9mSXRlbXM7XG4gICAgICAgICAgICAgaSA8IGxlbjtcbiAgICAgICAgICAgICBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ3MuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICBjICAgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgaWYgKC9bTUxIVkNTUVRBWnpdLy50ZXN0KGMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAtIHg7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAtIHg7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAtIHk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAtIHk7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IC14ICsgKHggPSBzZWcueCk7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IC15ICsgKHkgPSBzZWcueSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdNb3ZldG8nLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdMJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvJyxkeCxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnSCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0xpbmV0b0hvcml6b250YWwnLGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdWJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvVmVydGljYWwnLGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdDJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b0N1YmljJyxkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9DdWJpY1Ntb290aCcsZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1EnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvUXVhZHJhdGljJyxkeCxkeSx4MSx5MSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9RdWFkcmF0aWNTbW9vdGgnLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQXJjJyxkeCxkeSxzZWcucjEsc2VnLnIyLHNlZy5hbmdsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWcubGFyZ2VBcmNGbGFnLHNlZy5zd2VlcEZsYWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1onOiBjYXNlICd6JzogeCA9IHgwOyB5ID0geTA7IGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIHggKz0gc2VnLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyBpbiBzZWcpIHkgKz0gc2VnLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgc3RhcnQgb2YgYSBzdWJwYXRoXG4gICAgICAgICAgICBpZiAoYyA9PSAnTScgfHwgYyA9PSAnbScpIHtcbiAgICAgICAgICAgICAgICB4MCA9IHg7XG4gICAgICAgICAgICAgICAgeTAgPSB5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1ovZywgJ3onKSk7XG4gICAgfTtcblxuICAgIHNlbGYucGF0aERlbHRhID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc3RhcnQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgoMCksXG4gICAgICAgICAgICBlbmQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgocGF0aC5nZXRUb3RhbExlbmd0aCgpKTtcblxuICAgICAgICBkZWx0YS54ID0gZW5kLnggLSBzdGFydC54O1xuICAgICAgICBkZWx0YS55ID0gZW5kLnkgLSBzdGFydC55O1xuXG4gICAgICAgIHJldHVybiBkZWx0YTtcbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBhIHBhdGggZWxlbWVudFxuICAgIC8vIGFuZCB0aGUgcGF0aCBzZWdlbWVudCBpbmRpY2llc1xuICAgIC8vIHRoYXQgd2lsbCBiZSBzY2FsZWRcbiAgICBzZWxmLnNjYWxlQW5jaG9yWSA9IGZ1bmN0aW9uIChwYXRoLCBhbmNob3JzKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZUFuY2hvclknKTtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBzZWxmLnBhdGhEZWx0YShwYXRoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY3VycmVudCBkZWx0YVxuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBhbmNob3JzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvX3JlcGxhY2UgPSBzZWdtZW50cy5nZXRJdGVtKGFuY2hvcnNbbmFtZV0pO1xuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlX3dpdGggPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNSZWwoXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkgKyAoKGRlbHRhLmN1cnJlbnQueS1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGEuZHJhd24ueSkvMiksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS55MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueDIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkyKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlX3dpdGgsIGFuY2hvcnNbbmFtZV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbCA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsJyk7XG4gICAgICAgICAgICBkZWx0YS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGVuZFswXSAtIHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50cy5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IHNlZy54ICAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IHNlZy55ICAqIHJhdGlvLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTW92ZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b0hvcml6b250YWwnLCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvVmVydGljYWwnLCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpY1Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbFkgPSBmdW5jdGlvbiAocGF0aCwgZHJhd25fZGVsdGEpIHtcbiAgICAgICAgLy8gc2NhbGUgeSwgZml0IHhcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBkcmF3bl9kZWx0YVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpLFxuICAgICAgICAgICAgZml0X3ggPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlKGFsbF9zZWdtZW50cywgc2VnbWVudF90b19yZXBsYWNlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIGFsbF9zZWdtZW50cy5yZXBsYWNlSXRlbShyc2VnLCBzZWdtZW50X3RvX3JlcGxhY2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChNYXRoLmFicyhkZWx0YS5kcmF3bi54KSA+IDAuMSkge1xuICAgICAgICAgICAgZml0X3ggPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGVQcm9wb3J0aW9uYWwnKTtcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRlbHRhLmRpZmYgPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54IC0gZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkgLSBkZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgcmF0aW8gPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54L2RlbHRhLmRyYXduLngsXG4gICAgICAgICAgICAgICAgeTogZGVsdGEuY3VycmVudC55L2RlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIG9yaWdpbmFsX2QpO1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgdmFyIGZpcnN0X3NlZ21lbnQgPSBzZWdtZW50cy5nZXRJdGVtKDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3NlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhdGhTZWdUeXBlQXNMZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgPT09ICdtJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50X3NlZyA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0FicyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2VtZW50X3NlZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkeCwgZHksIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgICAgIHggPSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5ID0gc3RhcnRbMV0sXG4gICAgICAgICAgICAgICAgc2VnbWVudF9jb3VudCA9IHNlZ21lbnRzLm51bWJlck9mSXRlbXM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlZ21lbnRfY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzZWcgPSBzZWdtZW50cy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgICAgICBjID0gc2VnLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxO1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDI7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKGZpdF94KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSBkeCA9IHNlZy54ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkZWx0YS5kaWZmLngvKHNlZ21lbnRfY291bnQtMSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSBkeCA9IHNlZy54O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnkgICogcmF0aW8ueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsWCA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsWCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50cy5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyO1xuICAgICAgICAgICAgICAgIGlmICgneCcgIGluIHNlZykgZHggPSBzZWcueCAgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSBzZWcueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBuYXYgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHRhcmdldF9zZWwsXG4gICAgICAgIG92ZXJsYWlkID0gZmFsc2UsXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5JyksXG4gICAgICAgIHJlbW92YWJsZV90ZXh0ID0gW3tcbiAgICAgICAgICAgIHRleHQ6ICdHbyEnXG4gICAgICAgIH1dO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhc3Rlcmlza0NsaWNrJyk7XG5cbiAgICBzZWxmLnNlbGVjdGlvbiA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRhcmdldF9zZWw7XG4gICAgICAgIHRhcmdldF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5vdmVybGFpZCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG92ZXJsYWlkO1xuICAgICAgICBvdmVybGFpZCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnNldHVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRhcmdldF9zZWwpIHRocm93IFwicmVxdWlyZXMgZWxlbWVudHMgdG8gcGFpclwiO1xuICAgICAgICB0YXJnZXRfc2VsXG4gICAgICAgICAgICAub24oJ2NsaWNrLm5hdicsIGZ1bmN0aW9uIChkLCBkaSkge1xuICAgICAgICAgICAgICAgIHRhcmdldF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgnI2Zsb3dlcicpO1xuICAgICAgICAgICAgICAgIG92ZXJsYWlkID0gb3ZlcmxhaWQgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgICAgICAgICAgYWN0aXZhdGVfZGVhY3RpdmF0ZShkKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFzdGVyaXNrQ2xpY2sob3ZlcmxhaWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXR0YWNoUmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUubmF2JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHBsYWNlX2J1dHRvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignc2Nyb2xsLm5hdicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBwbGFjZV9idXR0b24oKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhY3RpdmF0ZV9kZWFjdGl2YXRlIChkKSB7XG4gICAgICAgIHZhciBvdmVybGF5ID0gZDMuc2VsZWN0QWxsKGQuYWN0aXZhdGUpO1xuICAgICAgICBvdmVybGF5LmNsYXNzZWQoJ292ZXJsYWlkJywgb3ZlcmxhaWQpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCduby1zY3JvbGwnLCBvdmVybGFpZCk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoZC5ib2R5LCBvdmVybGFpZCk7XG4gICAgICAgIHBsYWNlX2J1dHRvbigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlX2J1dHRvbiAoKSB7XG5cbiAgICAgICAgdmFyIHd3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB2YXIgd2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICB2YXIgbWF0Y2hpbmdfc2VsO1xuICAgICAgICB2YXIgYmJveDtcblxuICAgICAgICBpZiAob3ZlcmxhaWQpIHtcbiAgICAgICAgICAgIGJib3ggPSB0YXJnZXRfc2VsLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHZhciBwX2Jib3ggPSB0YXJnZXRfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJ3AnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHRhcmdldF9oZWlnaHQgPSBiYm94LmhlaWdodDtcbiAgICAgICAgICAgIG1hdGNoaW5nX3NlbCA9XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcubG9nby10ZXh0LWNvbXBvbmVudC0tcmlzZCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0YXJnZXRfc2VsLnN0eWxlKCdsZWZ0JywgKHd3aWR0aCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBfYmJveC53aWR0aCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJib3gud2lkdGggLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoK21hdGNoaW5nX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF0pKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4Jyk7XG4gICAgICAgICAgICB0YXJnZXRfc2VsLnN0eWxlKCdib3R0b20nLCAod2hlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmJveC5oZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgrbWF0Y2hpbmdfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXRjaGluZ19zZWwgPVxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmxvZ28tdGV4dC1jb21wb25lbnQtLTIwMTQnKTtcbiAgICAgICAgICAgIHRhcmdldF9zZWxcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCBtYXRjaGluZ19zZWwuc3R5bGUoJ3JpZ2h0JykpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdib3R0b20nLCBtYXRjaGluZ19zZWwuc3R5bGUoJ2JvdHRvbScpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJvdHRvbSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgZGlydHkgPSBmYWxzZSxcbiAgICAgICAgLy8gY29udGFpbmVyX3NlbCxcbiAgICAgICAgLy8gY29udGFpbmVyX25vZGUsXG4gICAgICAgIC8vIGNvbnRhaW5lcl9tYXJnaW5fYm90dG9tLFxuICAgICAgICAvLyB3aW5kb3dfaGVpZ2h0LFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpLFxuICAgICAgICBib2R5X2hlaWdodDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYm90dG9tJyk7XG5cbiAgICBzZWxmLmRpcnR5ID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gZGlydHk7XG4gICAgICAgIGRpcnR5ID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXR0YWNoV2luZG93RXZlbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUuYm90dG9tJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZV92YXJpYWJsZXMoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3Njcm9sbC5ib3R0b20nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb250YWluZXJfbm9kZSkgdGhyb3cgXCJSZXF1aXJlcyBjb250YWluZXIuXCI7XG4gICAgICAgICAgICAgICAgaWYgKGRpcnR5KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBib2R5X2hlaWdodCA9IHBhcnNlSW50KGJvZHlfc2VsLnN0eWxlKCdoZWlnaHQnKSk7XG4gICAgICAgICAgICAgICAgaWYgKGJvZHlfaGVpZ2h0IDw9XG4gICAgICAgICAgICAgICAgICAgICh3aW5kb3cuaW5uZXJIZWlnaHQgKyB3aW5kb3cuc2Nyb2xsWSkpIHtcblxuICAgICAgICAgICAgICAgICAgICBkaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYm90dG9tKCk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkaXNwYXRjaCBib3R0b20nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgY29udGFpbmVyX25vZGUgPSBjb250YWluZXJfc2VsLm5vZGUoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIERhdGEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHJlcXVlc3RlZCA9IFtdLFxuICAgICAgICBhdmFpbGFibGU7XG5cbiAgICB2YXIgdXJsID0gd2luZG93LmxvY2F0aW9uLm9yaWdpbiArXG4gICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnZGF0YScsJ2VuZE9mRGF0YScpO1xuXG4gICAgc2VsZi5mZXRjaF9kYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWF2YWlsYWJsZSkge1xuICAgICAgICAgICAgZDMuanNvbih1cmwgKyAnZGF0YS9tZXRhZGF0YS5qc29uJywgcHJvY2Vzc19tZXRhZGF0YSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcm9jZXNzX3JlcXVlc3QoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzX21ldGFkYXRhIChyYXdfbWV0YSkge1xuICAgICAgICBhdmFpbGFibGUgPSByYXdfbWV0YS5wYWdlcztcbiAgICAgICAgcHJvY2Vzc19yZXF1ZXN0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc19yZXF1ZXN0ICgpIHtcbiAgICAgICAgdmFyIG5leHRfdG9fbG9hZCA9IGNob29zZV9hbmRfcmVtb3ZlX2Zyb21fYXZhaWxhYmxlKCk7XG4gICAgICAgIGlmIChuZXh0X3RvX2xvYWQpIHtcbiAgICAgICAgICAgIGQzLmpzb24odXJsICsgbmV4dF90b19sb2FkLCBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZGF0YShkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5lbmRPZkRhdGEoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNob29zZV9hbmRfcmVtb3ZlX2Zyb21fYXZhaWxhYmxlICgpIHtcbiAgICAgICAgdmFyIHNlbGVjdGVkO1xuICAgICAgICB2YXIgaW5kZXggPSBNYXRoLnJhbmRvbSgpICogYXZhaWxhYmxlLmxlbmd0aDtcblxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xuICAgICAgICAgICAgc2VsZWN0ZWQgPSBhdmFpbGFibGUuc3BsaWNlKGluZGV4LCAxKVswXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxlY3RlZDtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmaXhlZCAoKSB7XG4gICAgLy8gd2hlbiBjb250YWluZXIgaGl0cyB0aGUgdG9wLCBzd2l0Y2ggdGhhdCBlbGVtZW50IHRvIGZpeGVkXG4gICAgLy8gcGx1cyB0aGUgYWRkaXRpb25hbCBwYWRkaW5nXG5cbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBub3RfZml4ZWRfc2VsLFxuICAgICAgICBmaXhlZF9zZWwsXG4gICAgICAgIHBhZF9vbl9maXhlZF9zZWwsXG4gICAgICAgIG9yaWdpbmFsX3BhZF9vbl9maXhlZF9wYWRkaW5nX3RvcCA9ICcxcHgnLFxuICAgICAgICBwYWRkZWRfcGFkX29uX2ZpeGVkX3BhZGRpbmdfdG9wLFxuICAgICAgICBub3RfZml4ZWRfZGlzdGFuY2UgPSAwLFxuICAgICAgICBmaXhlZF9jbGFzcyA9ICdmaXhlZCc7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FjdGl2YXRvclZpc2libGUnKTtcblxuICAgIHNlbGYubm90Rml4ZWQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBub3RfZml4ZWRfc2VsO1xuICAgICAgICBub3RfZml4ZWRfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZml4ZWQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBmaXhlZF9zZWw7XG4gICAgICAgIGZpeGVkX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnBhZE9uRml4ZWQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBwYWRfb25fZml4ZWRfc2VsO1xuICAgICAgICBwYWRfb25fZml4ZWRfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYudG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbm90X2ZpeGVkX2Rpc3RhbmNlO1xuICAgIH07XG5cbiAgICBzZWxmLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGNfY29udHJhaW50cygpO1xuXG4gICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgICAgICAub24oJ3Njcm9sbC5maXhlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25maWdyZV9maXhlZCgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbigncmVzaXplLmZpeGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNhbGNfY29udHJhaW50cygpO1xuICAgICAgICAgICAgICAgIGNvbmZpZ3JlX2ZpeGVkKCk7XG4gICAgICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY29uZmlncmVfZml4ZWQgKCkge1xuICAgICAgICB2YXIgZml4ZWRfeSA9IDA7XG5cbiAgICAgICAgaWYgKChub3RfZml4ZWRfZGlzdGFuY2UgLSBwYWdlWU9mZnNldCkgPCAwKSB7XG4gICAgICAgICAgICBmaXhlZF95ID0gcGFnZVlPZmZzZXQgLSBub3RfZml4ZWRfZGlzdGFuY2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZml4ZWQgPSAoZml4ZWRfeSA9PT0gMCkgPyBmYWxzZSA6IHRydWU7XG5cbiAgICAgICAgc2VsZi5kaXNwYXRjaFxuICAgICAgICAgICAgLmFjdGl2YXRvclZpc2libGUoZml4ZWQpO1xuXG4gICAgICAgIGZpeGVkX3NlbC5jbGFzc2VkKGZpeGVkX2NsYXNzLCBmaXhlZCk7XG5cbiAgICAgICAgcGFkX29uX2ZpeGVkX3NlbFxuICAgICAgICAgICAgLnN0eWxlKCdwYWRkaW5nLXRvcCcsXG4gICAgICAgICAgICAgICAgICAgIGZpeGVkID9cbiAgICAgICAgICAgICAgICAgICAgcGFkZGVkX3BhZF9vbl9maXhlZF9wYWRkaW5nX3RvcCA6XG4gICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsX3BhZF9vbl9maXhlZF9wYWRkaW5nX3RvcCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FsY19jb250cmFpbnRzICgpIHtcbiAgICAgICAgdmFyIG5vdF9maXhlZF9tYXJnaW4gPVxuICAgICAgICAgICAgICAgICtub3RfZml4ZWRfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbWFyZ2luLXRvcCcpXG4gICAgICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdO1xuICAgICAgICB2YXIgbm90X2ZpeGVkX2hlaWdodCA9XG4gICAgICAgICAgICAgICAgbm90X2ZpeGVkX3NlbFxuICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgICAgICAuaGVpZ2h0O1xuXG4gICAgICAgIG5vdF9maXhlZF9kaXN0YW5jZSA9IG5vdF9maXhlZF9tYXJnaW4gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub3RfZml4ZWRfaGVpZ2h0O1xuXG4gICAgICAgIHZhciBmaXhlZF9iYm94X2hlaWdodCA9IGZpeGVkX3NlbFxuICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAuaGVpZ2h0O1xuXG4gICAgICAgIHBhZGRlZF9wYWRfb25fZml4ZWRfcGFkZGluZ190b3AgPSBmaXhlZF9iYm94X2hlaWdodCArICdweCc7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsInZhciBib3R0b20gPSByZXF1aXJlKCcuL2JvdHRvbScpKCk7XG52YXIgYmVoYW5jZSA9IHJlcXVpcmUoJy4vZGF0YScpKCk7XG52YXIgZGVwYXJ0bWVudHMgPSByZXF1aXJlKCcuLi9kZXBhcnRtZW50cycpKCk7XG52YXIgdHJhbnNmb3JtID0gcmVxdWlyZSgnLi90cmFuc2Zvcm0nKSgpO1xudmFyIGxpZ2h0Ym94ID0gcmVxdWlyZSgnLi9saWdodGJveCcpKCk7XG52YXIgc2Nyb2xsdG8gPSByZXF1aXJlKCcuL3Njcm9sbHRvJykoeyBkdXJhdGlvbjogMTAwMCB9KTtcbnZhciBmaXhlZCA9IHJlcXVpcmUoJy4vZml4ZWQnKSgpO1xudmFyIGxheW91dF9pbWFnZSA9IHJlcXVpcmUoJy4vbGF5b3V0X2ltYWdlJykoKTtcbnZhciBsYXlvdXRfZml4ZWQgPSByZXF1aXJlKCcuL2xheW91dF9maXhlZCcpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gd29yayAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29udGFpbmVyX3NlbCxcbiAgICAgICAgaW5maW5pdGVfc2Nyb2xsX2Jvb2wgPSBmYWxzZSxcbiAgICAgICAgZGF0YSA9IFtdLFxuICAgICAgICB3b3JrX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGRlcGFydG1lbnRfY29udGFpbmVyX3NlbCxcbiAgICAgICAgd29ya19zZWwsXG4gICAgICAgIGlzbyxcbiAgICAgICAgbGF5b3V0ID0gJ2ltYWdlJyxcbiAgICAgICAgbGF5b3V0cyA9IHtcbiAgICAgICAgICAgIGltYWdlOiB7XG4gICAgICAgICAgICAgICAgcmVuZGVyOiByZW5kZXJfaW1hZ2UsXG4gICAgICAgICAgICAgICAgcmVzaXplOiByZXNpemVfaW1hZ2VcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmaXhlZDoge1xuICAgICAgICAgICAgICAgIHJlbmRlcjogcmVuZGVyX2ZpeGVkLFxuICAgICAgICAgICAgICAgIHJlc2l6ZTogcmVzaXplX2ZpeGVkXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGludHJvX3NlbCxcbiAgICAgICAgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIGJlaGFuY2UuZGlzcGF0Y2hcbiAgICAgICAgLm9uKCdkYXRhJywgZnVuY3Rpb24gKHJlcXVlc3RlZCkge1xuICAgICAgICAgICAgYm90dG9tLmRpcnR5KGZhbHNlKTtcblxuICAgICAgICAgICAgaWYgKCFyZXF1ZXN0ZWQpIHRocm93ICdXb3JrLiBHb3Qgbm8gZGF0YS4nO1xuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybWVkID0gdHJhbnNmb3JtKHJlcXVlc3RlZC5vYmplY3RzKTtcblxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KHRyYW5zZm9ybWVkKTtcbiAgICAgICAgICAgIHJlbmRlcigpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGZpbHRlcmFibGUgbGlzdFxuICAgICAgICAgICAgZGVwYXJ0bWVudHMuaXNGaWx0ZXJhYmxlKHRyYW5zZm9ybWVkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlbmRPZkRhdGEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBib3R0b20uZGlzcGF0Y2gub24oJ2JvdHRvbS53b3JrJywgbnVsbCk7XG4gICAgICAgIH0pO1xuXG4gICAgZml4ZWQuZGlzcGF0Y2hcbiAgICAgICAgLm9uKCdhY3RpdmF0b3JWaXNpYmxlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIGRlcGFydG1lbnRzLmFjdGl2YXRvclZpc2libGUoZCk7XG4gICAgICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCdpbi13b3JrJywgZCk7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuZmlsdGVycyA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRlcGFydG1lbnRfY29udGFpbmVyX3NlbDtcbiAgICAgICAgZGVwYXJ0bWVudF9jb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuaW50cm8gPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBpbnRyb19zZWw7XG4gICAgICAgIGludHJvX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmxheW91dCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxheW91dDtcbiAgICAgICAgbGF5b3V0ID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYubGlnaHRib3hDb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsaWdodGJveC5jb250YWluZXIoKTtcbiAgICAgICAgbGlnaHRib3guY29udGFpbmVyKF8pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5pbmZpbml0ZVNjcm9sbCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGluZmluaXRlX3Njcm9sbF9ib29sO1xuICAgICAgICBpbmZpbml0ZV9zY3JvbGxfYm9vbCA9IF87XG5cbiAgICAgICAgaWYgKGluZmluaXRlX3Njcm9sbF9ib29sID09PSB0cnVlKSB7XG4gICAgICAgICAgICBib3R0b21cbiAgICAgICAgICAgICAgICAuY29udGFpbmVyKGNvbnRhaW5lcl9zZWwpO1xuXG4gICAgICAgICAgICBib3R0b20uZGlzcGF0Y2hcbiAgICAgICAgICAgICAgICAub24oJ2JvdHRvbS53b3JrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBib3R0b20uZGlydHkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJlaGFuY2UuZmV0Y2hfZGF0YSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIHNldF9pbnRyb19oZWlnaHQoKTtcblxuICAgICAgICBpZiAoIWNvbnRhaW5lcl9zZWwpIHRocm93IFwiV29yayByZXF1aXJlcyBhIGNvbnRhaW5lclwiO1xuICAgICAgICBjb250YWluZXJfc2VsLmNhbGwoYWRkX3N0cnVjdHVyZSk7XG4gICAgICAgIGxheW91dF9maXhlZC5jb250YWluZXIod29ya19jb250YWluZXJfc2VsKTtcbiAgICAgICAgbGF5b3V0X2ltYWdlLmNvbnRhaW5lcih3b3JrX2NvbnRhaW5lcl9zZWwpO1xuXG4gICAgICAgIGlmIChpbmZpbml0ZV9zY3JvbGxfYm9vbCkgYm90dG9tLmF0dGFjaFdpbmRvd0V2ZW50cygpO1xuXG4gICAgICAgIC8vIHdpbGwgYmUgdGhlIHRoaW5nIHRvIGNhbGwgcmVuZGVyXG4gICAgICAgIGJlaGFuY2UuZmV0Y2hfZGF0YSgpO1xuXG4gICAgICAgIC8vIGZpbHRlcmluZ1xuICAgICAgICBkZXBhcnRtZW50cy5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdjbGljay53b3JrJywgZnVuY3Rpb24gKGRlcGFydG1lbnQpIHtcblxuICAgICAgICAgICAgc2Nyb2xsdG8oZml4ZWQudG9wKCkgKyAxMCk7XG5cbiAgICAgICAgICAgIGlmIChkZXBhcnRtZW50ID09PSAnYWxsJykgZGVwYXJ0bWVudCA9ICcnO1xuXG4gICAgICAgICAgICBpZiAoaXNvKSB7XG4gICAgICAgICAgICAgICAgaXNvLmFycmFuZ2Uoe1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGZ1bmN0aW9uIChpdGVtRWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQzLnNlbGVjdChpdGVtRWxlbSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xhc3NlZChkZXBhcnRtZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBmaXhlZC5pbml0aWFsaXplKCk7XG5cbiAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgIC5vbigncmVzaXplLndvcmsnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVzaXplKCk7XG4gICAgICAgICAgICAgICAgc2V0X2ludHJvX2hlaWdodCgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHJlbmRlciAoKSB7XG4gICAgICAgIGxheW91dHNbbGF5b3V0XS5yZW5kZXIoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNpemUgKCkge1xuICAgICAgICBsYXlvdXRzW2xheW91dF0ucmVzaXplKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2ZpeGVkICgpIHtcbiAgICAgICAgd29ya19zZWwgPSB3b3JrX2NvbnRhaW5lcl9zZWwuc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgICAgICAgdmFyIHdvcmtfc2VsX2VudGVyID0gd29ya19zZWxcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKTtcblxuICAgICAgICBsYXlvdXRfZml4ZWRcbiAgICAgICAgICAgIC5hdHRyaWJ1dGVzKHdvcmtfc2VsX2VudGVyKTtcbiAgICAgICAgdmFyIG1hc29ucnkgPSBsYXlvdXRfZml4ZWQubWFzb25yeSgpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV9oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICdmaXhlZC1waWVjZSBwaWVjZSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQucmlzZF9wcm9ncmFtX2NsYXNzICtcbiAgICAgICAgICAgICAgICAgICAgICAgICcgb3JpZW50YXRpb24tJyArIGQub3JpZW50YXRpb247XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2Utd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKGQubWFzb25yeV9oZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQubWV0YV9zcGFjZSkgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS1pbWctd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfd2lkdGg7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZC5tYXNvbnJ5X2hlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5tZXRhX3NwYWNlKSArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuY2FsbChhZGRfaW1hZ2UpO1xuICAgICAgICBcbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLW1ldGEtd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLmNhbGwoYWRkX21ldGEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA1MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgd29ya19zZWwub24oJ2NsaWNrLndvcmsnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwobGlnaHRib3guc2hvdyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaXNvKSB7XG4gICAgICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWwubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiBtYXNvbnJ5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdvcmtfc2VsX2VudGVyLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlzby5hcHBlbmRlZCh0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXNvLmxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2ltYWdlICgpICB7XG4gICAgICAgIHdvcmtfc2VsID0gd29ya19jb250YWluZXJfc2VsLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpO1xuXG4gICAgICAgIHZhciB3b3JrX3NlbF9lbnRlciA9IHdvcmtfc2VsXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2ltYWdlLXBpZWNlIHBpZWNlICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5yaXNkX3Byb2dyYW1fY2xhc3M7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgbGF5b3V0X2ltYWdlXG4gICAgICAgICAgICAuYXR0cmlidXRlcyh3b3JrX3NlbF9lbnRlcik7XG4gICAgICAgIHZhciBtYXNvbnJ5ID0gbGF5b3V0X2ltYWdlLm1hc29ucnkoKTtcblxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV93aWR0aCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS13cmFwcGVyJylcbiAgICAgICAgICAgICAgICAuY2FsbChhZGRfaW1hZ2UpO1xuICAgICAgICBcbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLW1ldGEtd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLmNhbGwoYWRkX21ldGEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA1MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgd29ya19zZWwub24oJ2NsaWNrLndvcmsnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwobGlnaHRib3guc2hvdyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaXNvKSB7XG4gICAgICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWwubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiBtYXNvbnJ5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlzby51bmJpbmRSZXNpemUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdvcmtfc2VsX2VudGVyLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlzby5hcHBlbmRlZCh0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXNvLmxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVzaXplX2ltYWdlICgpIHtcblxuICAgICAgICBsYXlvdXRfaW1hZ2VcbiAgICAgICAgICAgIC5hdHRyaWJ1dGVzKHdvcmtfc2VsKTtcbiAgICAgICAgdmFyIG1hc29ucnkgPSBsYXlvdXRfaW1hZ2UubWFzb25yeSgpO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV9oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpc28pIHtcbiAgICAgICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbC5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IG1hc29ucnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNvLm9wdGlvbnMubWFzb25yeSA9IG1hc29ucnk7XG4gICAgICAgICAgICBpc28ubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNpemVfZml4ZWQgKCkge1xuXG4gICAgICAgIGxheW91dF9maXhlZFxuICAgICAgICAgICAgLmF0dHJpYnV0ZXMod29ya19zZWwpO1xuICAgICAgICB2YXIgbWFzb25yeSA9IGxheW91dF9maXhlZC5tYXNvbnJ5KCk7XG5cbiAgICAgICAgd29ya19zZWxcbiAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X2hlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB3b3JrX3NlbFxuICAgICAgICAgICAgLnNlbGVjdEFsbCgnLnBpZWNlLXdyYXBwZXInKVxuICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAoZC5tYXNvbnJ5X2hlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICBkLm1ldGFfc3BhY2UpICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucGllY2UtaW1nLXdyYXBwZXInKVxuICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV93aWR0aDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChkLm1hc29ucnlfaGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgIGQubWV0YV9zcGFjZSkgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpc28pIHtcbiAgICAgICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbC5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IG1hc29ucnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXNvLnVuYmluZFJlc2l6ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXNvLm9wdGlvbnMubWFzb25yeSA9IG1hc29ucnk7XG4gICAgICAgICAgICBpc28ubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfc3RydWN0dXJlIChzZWwpICB7XG4gICAgICAgIHZhciBkZXB0X2NvbnRhaW5lcl9zZWwgPSBkZXBhcnRtZW50X2NvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2FydGljbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2RlcGFydG1lbnRzIGdyaWQgei0xNScpO1xuXG4gICAgICAgIHdvcmtfY29udGFpbmVyX3NlbCA9IHNlbC5hcHBlbmQoJ2FydGljbGUnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3dvcmsgZ3JpZCB6LTEwICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnd29yay1sYXlvdXQtJyArIGxheW91dCk7XG5cbiAgICAgICAgZGVwYXJ0bWVudHNcbiAgICAgICAgICAgIC5jb250YWluZXIoZGVwdF9jb250YWluZXJfc2VsKVxuICAgICAgICAgICAgLm1vYmlsZShkMy5zZWxlY3QoJy5uYXYtbW9iaWxlJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgZml4ZWRcbiAgICAgICAgICAgIC5ub3RGaXhlZChpbnRyb19zZWwpXG4gICAgICAgICAgICAuZml4ZWQoZGVwYXJ0bWVudF9jb250YWluZXJfc2VsKVxuICAgICAgICAgICAgLnBhZE9uRml4ZWQoc2VsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfbWV0YSAoc2VsKSB7XG4gICAgICAgIHNlbC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N0dWRlbnQtbmFtZSBwaWVjZS1tZXRhJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc3R1ZGVudF9uYW1lO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgc2VsLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncmlzZC1wcm9ncmFtIHBpZWNlLW1ldGEnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5yaXNkX3Byb2dyYW07XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfaW1hZ2UgKHNlbCkge1xuICAgICAgICBzZWwuYXBwZW5kKCdpbWcnKVxuICAgICAgICAgICAgLmF0dHIoJ3NyYycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuY292ZXIuc3JjO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0X2ludHJvX2hlaWdodCAoKSB7XG4gICAgICAgIHZhciBoZWlnaHQgPVxuICAgICAgICAgICAgaW50cm9fc2VsXG4gICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQgK1xuICAgICAgICAgICAgcGFyc2VJbnQoaW50cm9fc2VsLnN0eWxlKCdtYXJnaW4tdG9wJyksIDEwKSArXG4gICAgICAgICAgICBwYXJzZUludChpbnRyb19zZWwuc3R5bGUoJ21hcmdpbi1ib3R0b20nKSwgMTApO1xuXG4gICAgICAgIGlmIChoZWlnaHQgPCB3aW5kb3cuaW5uZXJIZWlnaHQpIHtcbiAgICAgICAgICAgIHZhciBkaWZmZXJlbmNlID0gd2luZG93LmlubmVySGVpZ2h0IC0gaGVpZ2h0O1xuICAgICAgICAgICAgaW50cm9fc2VsLnN0eWxlKCdwYWRkaW5nLWJvdHRvbScsIGRpZmZlcmVuY2UgKyAncHgnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxheW91dF9maXhlZCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgY29udGFpbmVyX3NlbDtcbiAgICB2YXIgY291bnRlciA9IHtcbiAgICAgICAgdGFsbDogMCxcbiAgICAgICAgd2lkZTogMFxuICAgIH07XG4gICAgdmFyIGZyZXF1ZW5jeSA9IHtcbiAgICAgICAgbGFyZ2U6IDE1LFxuICAgICAgICB0YWxsOiA4LFxuICAgICAgICB3aWRlOiA2XG4gICAgfTtcbiAgICB2YXIgbWV0YV9zcGFjZSA9IDUwO1xuICAgIHZhciBtYXNvbnJ5ID0ge1xuICAgICAgICBndXR0ZXI6IDAsXG4gICAgICAgIGNvbHVtbldpZHRoOiAwLFxuICAgICAgICBjb2x1bW5XaWR0aERvdWJsZTogMFxuICAgIH07XG5cbiAgICBzZWxmLm1hc29ucnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBtYXNvbnJ5O1xuICAgIH07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hdHRyaWJ1dGVzID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBjb3VudGVyID0gMDtcbiAgICAgICAgbWFzb25yeSA9IG1hc29ucnlfc2V0dGluZ3MoKTtcblxuICAgICAgICBzZWwuZWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZC5tZXRhX3NwYWNlID0gbWV0YV9zcGFjZTtcbiAgICAgICAgICAgIHZhciBtdWx0aXBsaWVyID0gMTtcblxuICAgICAgICAgICAgaWYgKGkgJSBmcmVxdWVuY3kubGFyZ2UgPT09IDApIHtcblxuICAgICAgICAgICAgICAgIC8vIGxhcmdlXG4gICAgICAgICAgICAgICAgbXVsdGlwbGllciA9IDI7XG5cbiAgICAgICAgICAgICAgICBpZiAoKGQuY292ZXIub3JpZ2luYWxfd2lkdGgvXG4gICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX2hlaWdodCkgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGQub3JpZW50YXRpb24gPSAnbGFuZHNjYXBlJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkLm9yaWVudGF0aW9uID0gJ3BvcnRyYWl0JztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPVxuICAgICAgICAgICAgICAgICAgICAobWFzb25yeS5jb2x1bW5XaWR0aCAqXG4gICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyKSArXG4gICAgICAgICAgICAgICAgICAgICgobXVsdGlwbGllciA9PT0gMSkgP1xuICAgICAgICAgICAgICAgICAgICAgIDAgOiBtYXNvbnJ5Lmd1dHRlcik7XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfaGVpZ2h0ID0gZC5tYXNvbnJ5X3dpZHRoO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKChkLmNvdmVyLm9yaWdpbmFsX3dpZHRoL1xuICAgICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF9oZWlnaHQpID4gMSkge1xuXG4gICAgICAgICAgICAgICAgLy8gbGFuZHNjYXBlXG4gICAgICAgICAgICAgICAgY291bnRlci53aWRlICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIud2lkZSAlIGZyZXF1ZW5jeS53aWRlID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgPSAyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV93aWR0aCA9XG4gICAgICAgICAgICAgICAgICAgIChtYXNvbnJ5LmNvbHVtbldpZHRoICpcbiAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIpICtcbiAgICAgICAgICAgICAgICAgICAgKChtdWx0aXBsaWVyID09PSAxKSA/XG4gICAgICAgICAgICAgICAgICAgICAgMCA6IG1hc29ucnkuZ3V0dGVyKTtcblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV9oZWlnaHQgPSBkLm1hc29ucnlfd2lkdGg7XG4gICAgICAgICAgICAgICAgZC5vcmllbnRhdGlvbiA9ICdsYW5kc2NhcGUnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBwb3J0cmFpdFxuICAgICAgICAgICAgICAgIGNvdW50ZXIudGFsbCArPSAxO1xuICAgICAgICAgICAgICAgIGlmIChjb3VudGVyLnRhbGwgJSBmcmVxdWVuY3kudGFsbCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyID0gMjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfaGVpZ2h0ID1cbiAgICAgICAgICAgICAgICAgICAgKG1hc29ucnkuY29sdW1uV2lkdGggKlxuICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGllcikgK1xuICAgICAgICAgICAgICAgICAgICAoKG11bHRpcGxpZXIgPT09IDEpID9cbiAgICAgICAgICAgICAgICAgICAgICAwIDogbWFzb25yeS5ndXR0ZXIpO1xuXG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X3dpZHRoID0gbWFzb25yeS5jb2x1bW5XaWR0aDtcbiAgICAgICAgICAgICAgICBkLm9yaWVudGF0aW9uID0gJ3BvcnRyYWl0JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1hc29ucnlfc2V0dGluZ3MgKCkge1xuICAgICAgICB2YXIgdG90YWxfd29ya193aWR0aCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLndpZHRoO1xuXG4gICAgICAgIHZhciBudW1iZXJfb2ZfY29sdW1ucyA9IDI7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDc2OCkge1xuICAgICAgICAgICAgbnVtYmVyX29mX2NvbHVtbnMgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGd1dHRlciA9IDA7XG4gICAgICAgIHZhciBjb2x1bW5fd2lkdGggPSAodG90YWxfd29ya193aWR0aCAvIG51bWJlcl9vZl9jb2x1bW5zKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoZ3V0dGVyICogKG51bWJlcl9vZl9jb2x1bW5zIC0gMSkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBndXR0ZXI6IGd1dHRlcixcbiAgICAgICAgICAgIGNvbHVtbldpZHRoOiBjb2x1bW5fd2lkdGgsXG4gICAgICAgICAgICBjb2x1bW5Eb3VibGVXaWR0aDogY29sdW1uX3dpZHRoICogMiArIGd1dHRlclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxheW91dF9pbWFnZSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcbiAgICB2YXIgY29udGFpbmVyX3NlbDtcbiAgICB2YXIgbWV0YV9zcGFjZSA9IDM1O1xuICAgIHZhciBjb3VudGVyID0gMDtcbiAgICB2YXIgZnJlcXVlbmN5ID0gMTQ7XG4gICAgdmFyIG1hc29ucnkgPSB7XG4gICAgICAgIGd1dHRlcjogMCxcbiAgICAgICAgY29sdW1uV2lkdGg6IDAsXG4gICAgICAgIGNvbHVtbldpZHRoRG91YmxlOiAwXG4gICAgfTtcblxuICAgIHNlbGYubWFzb25yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1hc29ucnk7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBtYXNvbnJ5ID0gbWFzb25yeV9zZXR0aW5ncygpO1xuXG4gICAgICAgIHNlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBpZiAoKGQuY292ZXIub3JpZ2luYWxfd2lkdGgvXG4gICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfaGVpZ2h0KSA+XG4gICAgICAgICAgICAgICAgMS44KSB7XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPSBtYXNvbnJ5LmNvbHVtbkRvdWJsZVdpZHRoO1xuICAgICAgICAgICAgICAgIGQubWFzb25yeV9oZWlnaHQgPVxuICAgICAgICAgICAgICAgICAgICAoKGQubWFzb25yeV93aWR0aCAqXG4gICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF9oZWlnaHQpL1xuICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF93aWR0aCkgKyBtZXRhX3NwYWNlO1xuXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvdW50ZXIgKz0gMTtcblxuICAgICAgICAgICAgICAgIC8vIG1ha2UgZXZlcnkgNXRoIG9uZSBiaWcuXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgJSBmcmVxdWVuY3kgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgZC5tYXNvbnJ5X3dpZHRoID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG1hc29ucnkuY29sdW1uRG91YmxlV2lkdGg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZC5tYXNvbnJ5X3dpZHRoID0gbWFzb25yeS5jb2x1bW5XaWR0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X2hlaWdodCA9XG4gICAgICAgICAgICAgICAgICAgICgoZC5tYXNvbnJ5X3dpZHRoICpcbiAgICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX2hlaWdodCkvXG4gICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX3dpZHRoKSArXG4gICAgICAgICAgICAgICAgICAgIG1ldGFfc3BhY2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBtYXNvbnJ5X3NldHRpbmdzICgpIHtcbiAgICAgICAgdmFyIHRvdGFsX3dvcmtfd2lkdGggPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC53aWR0aDtcblxuICAgICAgICB2YXIgbnVtYmVyX29mX2NvbHVtbnMgPSAyO1xuXG4gICAgICAgIGlmICh3aW5kb3cuaW5uZXJXaWR0aCA+PSA3NjgpIHtcbiAgICAgICAgICAgIG51bWJlcl9vZl9jb2x1bW5zID0gNDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBndXR0ZXIgPSAwO1xuICAgICAgICB2YXIgY29sdW1uX3dpZHRoID0gKHRvdGFsX3dvcmtfd2lkdGggLyBudW1iZXJfb2ZfY29sdW1ucykgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGd1dHRlciAqIChudW1iZXJfb2ZfY29sdW1ucyAtIDEpKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ3V0dGVyOiBndXR0ZXIsXG4gICAgICAgICAgICBjb2x1bW5XaWR0aDogY29sdW1uX3dpZHRoLFxuICAgICAgICAgICAgY29sdW1uRG91YmxlV2lkdGg6IGNvbHVtbl93aWR0aCAqIDIgKyBndXR0ZXJcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsaWdodGJveCAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29udGFpbmVyX3NlbCxcbiAgICAgICAgc2VsZWN0ZWRfc2VsLFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuc2hvdyA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrZWQnKTtcbiAgICAgICAgY29uc29sZS5sb2coc2VsKTtcbiAgICAgICAgaWYgKCFjb250YWluZXJfc2VsKSB0aHJvdyBcIkxpZ2h0Ym94LiBSZXF1aXJlcyBjb250YWluZXIuXCI7XG5cbiAgICAgICAgc2VsZWN0ZWRfc2VsID0gc2VsO1xuXG4gICAgICAgIHZhciBkYXRhID0gc2VsLmRhdHVtKCk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X2dyaWRfc2VsID0gY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdncmlkJyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X21ldGFfc2VsID1cbiAgICAgICAgICAgIGxpZ2h0Ym94X2dyaWRfc2VsXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YSBjb2wtcGVyY2VudC0yLTEwJyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X3dvcmtfc2VsID1cbiAgICAgICAgICAgIGxpZ2h0Ym94X2dyaWRfc2VsXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICdsaWdodGJveC13b3JrICcrXG4gICAgICAgICAgICAgICAgICAgICAgJ29mZnNldC1wZXJjZW50LTItMTAgJytcbiAgICAgICAgICAgICAgICAgICAgICAnY29sLXBlcmNlbnQtOC0xMCcpO1xuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdoMicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtdGl0bGUnKVxuICAgICAgICAgICAgLnRleHQoZGF0YS5wcm9qZWN0X25hbWUpO1xuXG4gICAgICAgIGlmIChkYXRhLnByb2plY3RfbmFtZSAhPSBkYXRhLmRlc2NyaXB0aW9uKSB7XG4gICAgICAgICAgICBsaWdodGJveF93b3JrX3NlbFxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1kZXNjcmlwdGlvbicpXG4gICAgICAgICAgICAgICAgLnRleHQoZGF0YS5kZXNjcmlwdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBsaWdodGJveF93b3JrX3NlbC5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhLm1vZHVsZXMpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZScpXG4gICAgICAgICAgICAuZWFjaChhZGRfbW9kdWxlcyk7XG5cbiAgICAgICAgdmFyIGxpZ2h0Ym94X21ldGFfaW5mb19zZWwgPSBsaWdodGJveF9tZXRhX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8nKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXN0dWRlbnQtbmFtZScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnN0dWRlbnRfbmFtZSk7XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvLS1yaXNkLXByb2dyYW0nKVxuICAgICAgICAgICAgLnRleHQoZGF0YS5yaXNkX3Byb2dyYW0pO1xuXG4gICAgICAgIGxpZ2h0Ym94X21ldGFfaW5mb19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mby0tcGVyc29uYWwtbGluaycpXG4gICAgICAgICAgICAuYXBwZW5kKCdhJylcbiAgICAgICAgICAgIC5hdHRyKCdocmVmJywgZGF0YS51cmwpXG4gICAgICAgICAgICAuYXR0cigndGFyZ2V0JywgJ19ibGFuaycpXG4gICAgICAgICAgICAudGV4dCgnQmVoYW5jZScpO1xuXG4gICAgICAgIGNvbnRhaW5lcl9zZWwuY2xhc3NlZCgnYWN0aXZlJywgdHJ1ZSk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ25vLXNjcm9sbCcsIHRydWUpO1xuXG4gICAgICAgIGNvbnRhaW5lcl9zZWwub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY2xvc2UoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNsb3NlICgpIHtcbiAgICAgICAgY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmNsYXNzZWQoJ2FjdGl2ZScsIGZhbHNlKVxuICAgICAgICAgICAgLmh0bWwoJycpO1xuXG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ25vLXNjcm9sbCcsIGZhbHNlKTtcblxuICAgICAgICBjb250YWluZXJfc2VsLm9uKCdjbGljaycsIG51bGwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9tb2R1bGVzIChkLCBpKSB7XG4gICAgICAgIHZhciBzZWwgPSBkMy5zZWxlY3QodGhpcyk7XG5cbiAgICAgICAgaWYgKGQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgc2VsLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgICAgICAuYXR0cignc3JjJyxcbiAgICAgICAgICAgICAgICAgICAgZC5zaXplcy5tYXhfMTI0MCA/IGQuc2l6ZXMubWF4XzEyNDAgOiBkLnNyYyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGQudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICAgICAgICBzZWwuYXBwZW5kKCdwJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2UtbW9kdWxlLXRleHQnKVxuICAgICAgICAgICAgICAgIC50ZXh0KGQudGV4dF9wbGFpbik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGQudHlwZSA9PT0gJ2VtYmVkJykge1xuICAgICAgICAgICAgc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2UtbW9kdWxlLWVtYmVkJylcbiAgICAgICAgICAgICAgICAuaHRtbChkLmVtYmVkKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNjcm9sbHRvIChhcmdzKSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmdzIHx8IHt9O1xuICAgIG9wdGlvbnMuZHVyYXRpb24gPSBhcmdzLmR1cmF0aW9uIHx8IDIwMDA7XG5cbiAgICBmdW5jdGlvbiBzY3JvbGxfdHdlZW4gKG9mZnNldCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGkgPSBkMy5pbnRlcnBvbGF0ZU51bWJlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5wYWdlWU9mZnNldCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AsXG4gICAgICAgICAgICAgICAgICAgICAgICBvZmZzZXQpO1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG8oMCwgaSh0KSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgIGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKG9wdGlvbnMuZHVyYXRpb24pXG4gICAgICAgICAgICAudHdlZW4oJ3Njcm9sbCcsIHNjcm9sbF90d2VlbihvZmZzZXQpKTtcbiAgICB9O1xufTsiLCIvLyByZXF1aXJlcyBkMy5zY2FsZS5vcmRpbmFsXG5tb2R1bGUuZXhwb3J0cyA9IHRyYW5zZm9ybTtcblxuZnVuY3Rpb24gdHJhbnNmb3JtICgpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgIHZhciBmb3JtYXR0ZWQgPSBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMoaW5wdXQpO1xuICAgICAgICByZXR1cm4gc2h1ZmZsZShmb3JtYXR0ZWQpO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyAoZGF0YSkge1xuXG4gICAgdmFyIGZvcm1hdHRlZF9kYXRhID0gW107XG5cbiAgICAvLyBkZXRlcm1pbmUgdGhlIGV4dGVudCBvZiB3aWR0aHNcbiAgICB2YXIgYWxsX21vZHVsZXMgPSBbXTtcbiAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgIGFsbF9tb2R1bGVzLnB1c2gobWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICB2YXIgbW9kdWxlc19mb3JfY292ZXIgPSBbXTtcbiAgICAgICAgdmFyIG1vZHVsZXNfdG9faW5jbHVkZSA9IFtdO1xuICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgbW9kdWxlc19mb3JfY292ZXIucHVzaChtZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyB0aGVzZSBhcmUgYWxsIGNhc2VzIHRoYXQgYXJlXG4gICAgICAgICAgICAvLyBjb3ZlcmVkIGluIGxpZ2h0Ym94LmpzXG4gICAgICAgICAgICBpZiAoKG1kLnR5cGUgPT09ICdpbWFnZScpIHxcbiAgICAgICAgICAgICAgICAobWQudHlwZSA9PT0gJ3RleHQnKSB8XG4gICAgICAgICAgICAgICAgKG1kLnR5cGUgPT09ICdlbWJlZCcpKSB7XG5cbiAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUucHVzaChtZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciByYW5kb21fY292ZXI7XG4gICAgICAgIGlmIChtb2R1bGVzX2Zvcl9jb3Zlci5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAvLyByYW5kb21fY292ZXJfb3B0aW9uXG4gICAgICAgICAgICAvLyBiYXNlZCBvbiBpbWFnZXMgdG8gaW5jbHVkZVxuICAgICAgICAgICAgdmFyIHJhbmRvbV9tb2R1bGUgPVxuICAgICAgICAgICAgICAgIG1vZHVsZXNfZm9yX2NvdmVyW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZHVsZXNfZm9yX2NvdmVyLmxlbmd0aCldO1xuXG4gICAgICAgICAgICByYW5kb21fY292ZXIgPSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxfd2lkdGg6ICtyYW5kb21fbW9kdWxlLndpZHRoLFxuICAgICAgICAgICAgICAgIG9yaWdpbmFsX2hlaWdodDogK3JhbmRvbV9tb2R1bGUuaGVpZ2h0LFxuICAgICAgICAgICAgICAgIHNyYzogcmFuZG9tX21vZHVsZS5zcmNcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByYW5kb21fY292ZXIuaGVpZ2h0ID0gKHJhbmRvbV9jb3Zlci53aWR0aCpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZS5oZWlnaHQpL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9tb2R1bGUud2lkdGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBvdGhlcndpc2UsIGp1c3QgdXNlIGEgdGhlIGNvdmVyIHRoYXRcbiAgICAgICAgICAgIC8vIGlzIGluY2x1ZGVkXG4gICAgICAgICAgICByYW5kb21fY292ZXIgPSB7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxfd2lkdGg6IDQwNCxcbiAgICAgICAgICAgICAgICBvcmlnaW5hbF9oZWlnaHQ6IDMxNixcbiAgICAgICAgICAgICAgICBzcmM6IGQuZGV0YWlscy5jb3ZlcnNbJzQwNCddXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIGZvcm1hdHRlZF9kYXRhLnB1c2goe1xuICAgICAgICAgICAgJ3Byb2plY3RfbmFtZSc6IGQubmFtZSxcbiAgICAgICAgICAgICdzdHVkZW50X25hbWUnOiBkLm93bmVyc1swXS5kaXNwbGF5X25hbWUsXG4gICAgICAgICAgICAncmlzZF9wcm9ncmFtJzogZC5yaXNkX3Byb2dyYW0sXG4gICAgICAgICAgICAncmlzZF9wcm9ncmFtX2NsYXNzJzpcbiAgICAgICAgICAgICAgICBlc2NhcGVfZGVwYXJ0bWVudChkLnJpc2RfcHJvZ3JhbSksXG4gICAgICAgICAgICAnbW9kdWxlcyc6IG1vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAgICAgICAgICdjb3Zlcic6IHJhbmRvbV9jb3ZlcixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkLmRldGFpbHMuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICB1cmw6IGQub3duZXJzWzBdLnVybFxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmb3JtYXR0ZWRfZGF0YTtcbn1cblxuZnVuY3Rpb24gc2h1ZmZsZSAobykge1xuICAgIGZvcih2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoO1xuICAgICAgICBpO1xuICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksXG4gICAgICAgIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgcmV0dXJuIG87XG59XG5cbmZ1bmN0aW9uIGVzY2FwZV9kZXBhcnRtZW50KGQpIHtcbiAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xufSJdfQ==
