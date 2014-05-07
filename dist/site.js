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
            }

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
            work.container(d3.select('.work'))
                .infiniteScroll(true)
                .layout(args.layout)
                .lightboxContainer(d3.select('.lightbox'))
                .fixFiltersAfter(d3.select('.intro-quote'))
                .initialize();
        } else {
            d3.select('.work').remove();
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
        container_sel,
        container_margin_bottom,
        window_height;

    self.dispatch = d3.dispatch('bottom');

    self.dirty = function (_) {
        if (!arguments.length) return dirty;
        dirty = _;
        return self;
    };

    self.attachWindowEvents = function () {
        d3.select(window)
            .on('resize.bottom', function () {
                // console.log()
                calculate_variables();
            })
            .on('scroll.bottom', function () {
                if (!container_sel) throw "Bottom requires container.";
                if (dirty) return;

                var cbox = container_sel
                                .node()
                                .getBoundingClientRect();

                if ((cbox.bottom + container_margin_bottom) <=
                     window_height) {

                    dirty = true;
                    self.dispatch.bottom();
                }
            });
    };

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.initialize = function () {
        calculate_variables();
        return self;
    };

    function calculate_variables () {
        window_height = window.innerHeight;
        container_margin_bottom = +container_sel
            .style('margin-bottom')
            .split('p')[0];
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
        console.log('fetching data');
        if (!available) {
            d3.json('../data/metadata.json', process_metadata);
        } else {
            process_request();
        }
    };

    function process_metadata (raw_meta) {
        console.log('processing metadata');
        available = raw_meta.available;
        process_request();
    }

    function process_request () {
        console.log('processing request');
        var next_to_load = choose_and_remove_from_available();
        console.log(next_to_load);
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
        no_translate_sel,
        translate_sel,
        no_translate_distance = 0;

    self.dispatch = d3.dispatch('activatorVisible');

    var vendor = ["", "-webkit-", "-moz-", "-ms-", "-o-"].reduce(
        function (p, v) {
            return v + "transform" in document.body.style ? v : p;
        });

    var transform_attr = vendor + 'transform';

    self.noTranslate = function (_) {
        if (!arguments.length) return no_translate_sel;
        no_translate_sel = _;
        return self;
    };

    self.translate = function (_) {
        if (!arguments.length) return translate_sel;
        translate_sel = _;
        return self;
    };

    self.top = function () {
        return no_translate_distance;
    };

    self.initialize = function () {
        calc_contraints();

        d3.select(window)
            .on('scroll.fixed', function () {
                var translate_y = 0;

                if ((no_translate_distance - pageYOffset) < 0) {
                    translate_y = pageYOffset - no_translate_distance;
                }

                if (window.innerWidth < 768) {
                    self.dispatch
                        .activatorVisible((translate_y === 0) ?
                                           false : true);
                    return;
                }
                translate_sel
                    .style(
                        transform_attr,
                        'translate(0,' + translate_y + 'px)');
            })
            .on('resize.fixed', function () {
                if (window.innerWidth < 768) {
                    translate_sel
                        .style(
                            transform_attr,
                            'translate(0,0)');
                }
                calc_contraints();
            });
    };

    function calc_contraints () {
        var no_translate_margin =
                +no_translate_sel
                    .style('margin-top')
                    .split('p')[0];
        var no_translate_height =
                no_translate_sel
                    .node()
                    .getBoundingClientRect()
                    .height;
        no_translate_distance = no_translate_height +
                                no_translate_margin;
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

module.exports = function work () {
    var self = {},
        container_sel,
        infinite_scroll_bool = false,
        data = [],
        work_container_sel,
        work_sel,
        iso,
        layout = 'image',
        render_layout = {
            image: render_image,
            fixed: render_fixed
        },
        fix_filters_after_sel;

    behance.dispatch
        .on('data', function (requested) {
            bottom.dirty(false);

            if (!requested) throw 'Work. Got no data.';
            var transformed = transform(requested);

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
        });

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
        return self;
    };

    self.fixFiltersAfter = function (_) {
        if (!arguments.length) return fix_filters_after_sel;
        fix_filters_after_sel = _;
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
                .container(container_sel)
                .attachWindowEvents();

            bottom.dispatch
                .on('bottom.work', function () {
                    console.log('reached bottom');
                    bottom.dirty(true);
                    behance.fetch_data();
                });
        }

        return self;
    };

    self.initialize = function (_) {
        if (!container_sel) throw "Work requires a container";
        container_sel.call(add_structure);

        if (infinite_scroll_bool) bottom.initialize();

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

        return self;
    };

    function render () {
        render_layout[layout]();
    }

    function render_fixed () {
        var masonry = masonry_settings();

        work_sel = work_container_sel.selectAll('.piece')
            .data(data);

        var work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d, i) {
                    return 'piece ' + d.risd_program_class;
                })
                .style('width', function (d, i) {
                    return masonry.columnWidth + 'px';
                })
                .style('height', function (d, i) {
                    return ((masonry.columnWidth *
                             d.cover.original_height)/
                             d.cover.original_width)+ 'px';
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
        } else {
            work_sel_enter.each(function () {
                iso.appended(this);
            });
            iso.layout();
        }
    }

    function render_image ()  {
        var masonry = masonry_settings();
        var meta_space = 35;
        var counter = 0;

        work_sel = work_container_sel.selectAll('.piece')
            .data(data);

        var work_sel_enter = work_sel
            .enter()
            .append('div')
                .attr('class', function (d, i) {
                    return 'piece ' + d.risd_program_class;
                })
                .style('width', function (d, i) {
                    // figure out height and width

                    // landscape images deserve to be landscapy
                    if ((d.cover.original_width/
                         d.cover.original_height) >
                        1.8) {

                        d.masonry_width = masonry.columnWidth * 2 +
                                          masonry.gutter;
                        d.masonry_height =
                            ((d.masonry_width *
                              d.cover.original_height)/
                             d.cover.original_width) + meta_space;

                    } else {
                        counter += 1;

                        // make every 5th one big.
                        if (counter % 5 === 0) {
                            d.masonry_width = masonry.columnWidth * 2 +
                                              masonry.gutter;
                        } else {
                            d.masonry_width = masonry.columnWidth;
                        }
                        d.masonry_height =
                            ((d.masonry_width *
                              d.cover.original_height)/
                             d.cover.original_width) +
                            meta_space;
                    }
                    



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
        } else {
            work_sel_enter.each(function () {
                iso.appended(this);
            });
            iso.layout();
        }
    }

    function add_structure (sel)  {
        var dept_container_sel = sel.append('div')
            .attr('class', 'col-percent-2-10 departments');

        work_container_sel = sel.append('div')
            .attr('class', 'col-percent-8-10 work-container omega '+
                           'work-layout-' + layout);

        departments
            .container(dept_container_sel)
            .mobile(d3.select('.nav-mobile'))
            .render();

        fixed
            .noTranslate(fix_filters_after_sel)
            .translate(dept_container_sel);
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

    function masonry_settings () {
        var total_work_width = work_container_sel
                                    .node()
                                    .getBoundingClientRect()
                                    .width;
        var number_of_columns = 4;
        var gutter = 0;
        var column_width = (total_work_width / number_of_columns) -
                           (gutter * (number_of_columns - 1));

        return {
            gutter: gutter,
            columnWidth: column_width
        };
    }

    return self;
};
},{"../departments":1,"./bottom":7,"./data":8,"./fixed":9,"./lightbox":11,"./scrollto":12,"./transform":13}],11:[function(require,module,exports){
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
        if (!container_sel) throw "Lightbox. Requires container.";

        selected_sel = sel;

        var data = sel.datum();

        var lightbox_grid_sel = container_sel
            .append('div')
            .attr('class', 'grid');

        var lightbox_meta_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-meta col-2-10');

        var lightbox_work_sel =
            lightbox_grid_sel
                .append('div')
                .attr('class', 'lightbox-work offset-2-10 col-8-10');

        lightbox_work_sel
            .append('h2')
            .attr('class', 'lightbox-title')
            .text(data.project_name);

        lightbox_work_sel
            .append('p')
            .attr('class', 'lightbox-description')
            .text(data.description);

        lightbox_work_sel.selectAll('.piece')
            .data(data.modules)
            .enter()
            .append('div')
            .attr('class', 'piece')
            .append('img')
            .attr('src', function (d) {
                return d.sizes.max_1240 ? d.sizes.max_1240 : d.src;
            });

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
            .append('a')
            .attr('class', 'lightbox-meta-info--personal-link')
            .attr('href', data.url)
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

    return self;
};
},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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

    // set a scale for mapping
    // width the an image to the
    // width of the masonic version
    var width_extent = d3.extent(all_modules, function (d) {
                        return d.width; }
                    );
    console.log('width_extent');
    console.log(width_extent);
    var widths = d3.scale.ordinal()
        .domain(width_extent)
        .range([100, 200, 400]);
    // var widths = d3.scale.identity()
    //     .domain(width_extent);

    data.forEach(function (d, i) {
        var modules_to_include = [];
        d.details.modules.forEach(function (md, mi) {
            if (md.type === 'image') {
                modules_to_include.push(md);
            }
        });

        // random_cover_option
        var random_module =
            modules_to_include[Math.floor(Math.random() *
                               modules_to_include.length)];

        var random_cover = {
            original_width: +random_module.width,
            original_height: +random_module.height,
            width: widths(random_module.width),
            src: random_module.src
        };
        random_cover.height = (random_cover.width*
                               random_module.height)/
                              random_module.width;

        formatted_data.push({
            'project_name': d.name,
            'student_name': d.owners[0].display_name,
            'risd_program': d.risd_program,
            'risd_program_class': escape_department(d.risd_program),
            'modules': modules_to_include,
            'cover': random_cover,
            description: d.details.description,
            avatar: d.owners[0].images['138'],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvc2FtbGlhbmcvU2l0ZXMvZ3JhZDIwMTQvZ3JhZC10aGVzaXMtZXhoaWJpdGlvbi0yMDE0L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvc2FtbGlhbmcvU2l0ZXMvZ3JhZDIwMTQvZ3JhZC10aGVzaXMtZXhoaWJpdGlvbi0yMDE0L3NyYy9kZXBhcnRtZW50cy5qcyIsIi9Vc2Vycy9zYW1saWFuZy9TaXRlcy9ncmFkMjAxNC9ncmFkLXRoZXNpcy1leGhpYml0aW9uLTIwMTQvc3JjL2luZGV4LmpzIiwiL1VzZXJzL3NhbWxpYW5nL1NpdGVzL2dyYWQyMDE0L2dyYWQtdGhlc2lzLWV4aGliaXRpb24tMjAxNC9zcmMvbG9nby9pbmRleC5qcyIsIi9Vc2Vycy9zYW1saWFuZy9TaXRlcy9ncmFkMjAxNC9ncmFkLXRoZXNpcy1leGhpYml0aW9uLTIwMTQvc3JjL2xvZ28vc2NhbGUuanMiLCIvVXNlcnMvc2FtbGlhbmcvU2l0ZXMvZ3JhZDIwMTQvZ3JhZC10aGVzaXMtZXhoaWJpdGlvbi0yMDE0L3NyYy9sb2dvL3N2Zy5qcyIsIi9Vc2Vycy9zYW1saWFuZy9TaXRlcy9ncmFkMjAxNC9ncmFkLXRoZXNpcy1leGhpYml0aW9uLTIwMTQvc3JjL292ZXJsYXkvbmF2LmpzIiwiL1VzZXJzL3NhbWxpYW5nL1NpdGVzL2dyYWQyMDE0L2dyYWQtdGhlc2lzLWV4aGliaXRpb24tMjAxNC9zcmMvd29yay9ib3R0b20uanMiLCIvVXNlcnMvc2FtbGlhbmcvU2l0ZXMvZ3JhZDIwMTQvZ3JhZC10aGVzaXMtZXhoaWJpdGlvbi0yMDE0L3NyYy93b3JrL2RhdGEuanMiLCIvVXNlcnMvc2FtbGlhbmcvU2l0ZXMvZ3JhZDIwMTQvZ3JhZC10aGVzaXMtZXhoaWJpdGlvbi0yMDE0L3NyYy93b3JrL2ZpeGVkLmpzIiwiL1VzZXJzL3NhbWxpYW5nL1NpdGVzL2dyYWQyMDE0L2dyYWQtdGhlc2lzLWV4aGliaXRpb24tMjAxNC9zcmMvd29yay9pbmRleC5qcyIsIi9Vc2Vycy9zYW1saWFuZy9TaXRlcy9ncmFkMjAxNC9ncmFkLXRoZXNpcy1leGhpYml0aW9uLTIwMTQvc3JjL3dvcmsvbGlnaHRib3guanMiLCIvVXNlcnMvc2FtbGlhbmcvU2l0ZXMvZ3JhZDIwMTQvZ3JhZC10aGVzaXMtZXhoaWJpdGlvbi0yMDE0L3NyYy93b3JrL3Njcm9sbHRvLmpzIiwiL1VzZXJzL3NhbWxpYW5nL1NpdGVzL2dyYWQyMDE0L2dyYWQtdGhlc2lzLWV4aGliaXRpb24tMjAxNC9zcmMvd29yay90cmFuc2Zvcm0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9IQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29udGFpbmVyX3NlbCxcbiAgICAgICAgbW9iaWxlX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGRlcHRhcnRtZW50X3NlbCxcbiAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsLFxuICAgICAgICBtb2JpbGVfYWN0aXZhdG9yX3NlbCxcbiAgICAgICAgbW9iaWxlX2JsYW5rZXRfc2VsLFxuICAgICAgICBtb2JpbGVfYWN0aXZlID0gZmFsc2UsXG4gICAgICAgIHNlbGVjdGVkID0gJ0FsbCcsXG4gICAgICAgIGNscyA9ICdkZXBhcnRtZW50JyxcbiAgICAgICAgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnY2xpY2snKTtcblxuICAgIHZhciBkZXBhcnRtZW50cyA9IFtcbiAgICAgICAgJ0FsbCcsXG4gICAgICAgICdBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnQ2VyYW1pY3MnLFxuICAgICAgICAnRGlnaXRhbCArIE1lZGlhJyxcbiAgICAgICAgJ0Z1cm5pdHVyZSBEZXNpZ24nLFxuICAgICAgICAnR2xhc3MnLFxuICAgICAgICAnR3JhcGhpYyBEZXNpZ24nLFxuICAgICAgICAnSW5kdXN0cmlhbCBEZXNpZ24nLFxuICAgICAgICAnSW50ZXJpb3IgQXJjaGl0ZWN0dXJlJyxcbiAgICAgICAgJ0pld2VscnkgKyBNZXRhbHNtaXRoaW5nJyxcbiAgICAgICAgJ0xhbmRzY2FwZSBBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnUGFpbnRpbmcnLFxuICAgICAgICAnUGhvdG9ncmFwaHknLFxuICAgICAgICAnUHJpbnRtYWtpbmcnLFxuICAgICAgICAnU2N1bHB0dXJlJyxcbiAgICAgICAgJ1RleHRpbGVzJ1xuICAgIF07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5tb2JpbGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBtb2JpbGVfY29udGFpbmVyX3NlbDtcbiAgICAgICAgbW9iaWxlX2NvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hY3RpdmF0b3JWaXNpYmxlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFtb2JpbGVfYWN0aXZhdG9yX3NlbCkgcmV0dXJuO1xuICAgICAgICBtb2JpbGVfYWN0aXZhdG9yX3NlbC5jbGFzc2VkKCd2aXNpYmxlJywgXyk7XG4gICAgfTtcblxuICAgIHNlbGYuc2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkZXB0YXJ0bWVudF9zZWw7XG4gICAgICAgIGRlcHRhcnRtZW50X3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmFzQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJkZXBhcnRtZW50cyBpcyBhIGdldHRlclwiO1xuICAgICAgICByZXR1cm4gZGVwYXJ0bWVudHM7XG4gICAgfTtcblxuICAgIHNlbGYuaXNGaWx0ZXJhYmxlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgY2hlY2tfZmlsdGVyYWJsZShkYXRhKTtcbiAgICAgICAgdXBkYXRlX2RlcGFydG1lbnRfc2VsKCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFjb250YWluZXJfc2VsKSB0aHJvdyBcInJlcXVpcmVzIGEgd3JhcHBlclwiO1xuXG4gICAgICAgIHZhciBkYXRhID0gZGVwYXJ0bWVudHMubWFwKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgdiA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBkLFxuICAgICAgICAgICAgICAgIGVzY2FwZWQ6IGVzY2FwZV9kZXBhcnRtZW50KGQpLFxuICAgICAgICAgICAgICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZCA9PT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2LnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2LmZpbHRlcmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyBzZXR1cCBzdHJ1Y3R1cmVcbiAgICAgICAgbW9iaWxlX2FjdGl2YXRvcl9zZWwgPSBtb2JpbGVfY29udGFpbmVyX3NlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBjbHMgKyAnLWFjdGl2YXRvcicpXG4gICAgICAgICAgICAudGV4dChzZWxlY3RlZClcbiAgICAgICAgICAgIC5vbignY2xpY2submF2QWN0aXZhdG9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG1vYmlsZV9hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9uYXYoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIG1vYmlsZV9ibGFua2V0X3NlbCA9IG1vYmlsZV9jb250YWluZXJfc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGNscyArICctYmxhbmtldCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrLm5hdkJsYW5rZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbW9iaWxlX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9uYXYoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIG1vYmlsZV9kZXBhcnRtZW50X3NlbCA9IG1vYmlsZV9jb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgY2xzICsgJy1lbGVtZW50cyBkZXBhcnRtZW50cycpXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKGNscylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBrbHMgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoZC5maWx0ZXJhYmxlKSBrbHMgKz0gJyBmaWx0ZXJhYmxlJztcbiAgICAgICAgICAgICAgICBpZiAoZC5zZWxlY3RlZCkga2xzICs9ICcgc2VsZWN0ZWQnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubmFtZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NsaWNrLmRlcGFydG1lbnRzJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IHJlc3BvbmRzIHRvIGZpbHRlcmFibGUgaXRlbXNcbiAgICAgICAgICAgICAgICBpZiAoIWQuZmlsdGVyYWJsZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZGVwYXJ0bWVudF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGRkLCBkaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGQuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBkLnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2xpY2soZC5lc2NhcGVkKTtcblxuICAgICAgICAgICAgICAgIHVwZGF0ZV9kZXBhcnRtZW50X3NlbCgpO1xuXG4gICAgICAgICAgICAgICAgbW9iaWxlX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZC5uYW1lO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9uYXYoKTtcblxuICAgICAgICAgICAgICAgIGRlcGFydG1lbnRfc2VsLmRhdGEobW9iaWxlX2RlcGFydG1lbnRfc2VsLmRhdGEoKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGUgYnVzaW5lc3NcblxuICAgICAgICBkZXBhcnRtZW50X3NlbCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoY2xzKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtscyA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChkLmZpbHRlcmFibGUpIGtscyArPSAnIGZpbHRlcmFibGUnO1xuICAgICAgICAgICAgICAgIGlmIChkLnNlbGVjdGVkKSBrbHMgKz0gJyBzZWxlY3RlZCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5uYW1lO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2suZGVwYXJ0bWVudHMnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgcmVzcG9uZHMgdG8gZmlsdGVyYWJsZSBpdGVtc1xuICAgICAgICAgICAgICAgIGlmICghZC5maWx0ZXJhYmxlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBkZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZGQsIGRpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZC5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGQuc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jbGljayhkLmVzY2FwZWQpO1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlX2RlcGFydG1lbnRfc2VsKCk7XG5cbiAgICAgICAgICAgICAgICBtb2JpbGVfYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBkLm5hbWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlX25hdigpO1xuXG4gICAgICAgICAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsLmRhdGEoZGVwYXJ0bWVudF9zZWwuZGF0YSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbmF2ICgpIHtcbiAgICAgICAgbW9iaWxlX2NvbnRhaW5lcl9zZWwuY2xhc3NlZCgnYWN0aXZlJywgbW9iaWxlX2FjdGl2ZSk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ25vLXNjcm9sbCcsIG1vYmlsZV9hY3RpdmUpO1xuICAgICAgICBtb2JpbGVfYWN0aXZhdG9yX3NlbC50ZXh0KHNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfZGVwYXJ0bWVudF9zZWwgKCkge1xuICAgICAgICBkZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgLmNsYXNzZWQoJ2ZpbHRlcmFibGUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmZpbHRlcmFibGU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zZWxlY3RlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBtb2JpbGVfZGVwYXJ0bWVudF9zZWxcbiAgICAgICAgICAgIC5jbGFzc2VkKCdmaWx0ZXJhYmxlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5maWx0ZXJhYmxlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja19maWx0ZXJhYmxlIChkYXRhKSB7XG4gICAgICAgIC8vIGdpdmVuIHNvbWUgZGF0YSwgY2hlY2sgdG8gc2VlIGlmXG4gICAgICAgIC8vIGVhY2ggY2F0ZWdvcnkgaXMgZmlsdGVyYWJsZVxuICAgICAgICBcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkZCwgZGkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQucmlzZF9wcm9ncmFtID09PSBkZC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZC5maWx0ZXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGRkLCBkaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5yaXNkX3Byb2dyYW0gPT09IGRkLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRkLmZpbHRlcmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVzY2FwZV9kZXBhcnRtZW50KGQpIHtcbiAgICAgICAgcmV0dXJuIGQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgTmF2ID0gcmVxdWlyZSgnLi9vdmVybGF5L25hdicpLFxuICAgIExvZ28gPSByZXF1aXJlKCcuL2xvZ28vaW5kZXgnKSxcbiAgICBXb3JrID0gcmVxdWlyZSgnLi93b3JrL2luZGV4Jyk7XG5cbnZhciB3b3JrX2FyZ3MgPSBwYXJzZV91cmxfZm9yX3dvcmsod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuXG5zaXRlKClcbiAgICAuY29sb3JzKClcbiAgICAub3ZlcmxheSgpXG4gICAgLmxvZ28oKVxuICAgIC53b3JrKHdvcmtfYXJncyk7XG5cblxuZnVuY3Rpb24gcGFyc2VfdXJsX2Zvcl93b3JrIChwYXRoKSB7XG4gICAgY29uc29sZS5sb2cocGF0aCk7XG4gICAgdmFyIGlzX2l0X2xpdmUgPSBmYWxzZTtcbiAgICB2YXIgd2hpY2hfbGF5b3V0ID0gJ2ltYWdlJztcbiAgICBpZiAocGF0aC5pbmRleE9mKCd3b3JrJykgPiAtMSkge1xuICAgICAgICBpc19pdF9saXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHBhdGguaW5kZXhPZignZml4ZWQnKSA+IC0xKSB7XG4gICAgICAgIHdoaWNoX2xheW91dCA9ICdmaXhlZCc7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGxpdmU6IGlzX2l0X2xpdmUsXG4gICAgICAgIGxheW91dDogd2hpY2hfbGF5b3V0XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc2l0ZSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29sb3JfdmFsdWVzID0ge1xuICAgICAgICAgICAgcHVycGxlOiAncmdiKDM4LCAzNCwgOTgpOycsXG4gICAgICAgICAgICBvcmFuZ2U6ICdyZ2IoMjU1LCA2MSwgNTYpOycsXG4gICAgICAgICAgICAnbHQtcHVycGxlJzogJ3JnYigxNDYsIDUzLCAxMjUpJyxcbiAgICAgICAgICAgIGJsdWU6ICdyZ2IoNDMsIDg5LCAxODQpJ1xuICAgICAgICB9LFxuICAgICAgICB1c2VfaW1hZ2VzX2FzX292ZXJsYXlfYmFja2dyb3VuZCA9IHRydWUsXG4gICAgICAgIGJhY2tncm91bmRfaW1hZ2Vfcm90YXRpb25fbWV0aG9kID0gJ2Jsb2NrJyxcbiAgICAgICAgYmFja2dyb3VuZF9pbWFnZV9yb3RhdGlvbl9tZXRob2RzID0gWydmYWRlJywgJ2Jsb2NrJ10sXG4gICAgICAgIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIHZhciBjb2xvcnMgPSBPYmplY3Qua2V5cyhjb2xvcl92YWx1ZXMpO1xuXG4gICAgdmFyIG5hdiA9IE5hdigpO1xuICAgIHZhciBsb2dvID0gTG9nbygpO1xuICAgIHZhciB3b3JrID0gV29yaygpO1xuXG4gICAgc2VsZi5jb2xvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByYW5kb21faW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb2xvcnMubGVuZ3RoKTtcblxuICAgICAgICB2YXIgY29sb3IgPSBjb2xvcnNbcmFuZG9tX2luZGV4XTtcbiAgICAgICAgdmFyIGFsdF9jb2xvcnMgPSBjb2xvcnMuc2xpY2UoMCxyYW5kb21faW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbmNhdChjb2xvcnMuc2xpY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21faW5kZXggKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JzLmxlbmd0aCkpO1xuXG4gICAgICAgIHZhciBhbHRfY29sb3IgPSBhbHRfY29sb3JzW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRfY29sb3JzLmxlbmd0aCldO1xuXG4gICAgICAgIGJvZHkuY2xhc3NlZCgnYm9keS0nICsgY29sb3IsIHRydWUpO1xuICAgICAgICBib2R5LmNsYXNzZWQoJ2JvZHktYWx0LScgKyBhbHRfY29sb3IsIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLm92ZXJsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYWlycyA9IGQzLnNlbGVjdEFsbCgnLm92ZXJsYXktbmF2LWl0ZW0nKVxuICAgICAgICAgICAgLmRhdHVtKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGF0YXNldDsgfSk7XG5cbiAgICAgICAgbmF2LnNlbGVjdGlvbihwYWlycylcbiAgICAgICAgICAgIC5zZXR1cCgpXG4gICAgICAgICAgICAuYXR0YWNoUmVzaXplKCk7XG5cbiAgICAgICAgLy8gc2V0dXAgY2xpY2sgdHJhY2tpbmcgd2l0aCBnb29nbGUgYW5hbHl0aWNzXG4gICAgICAgIG5hdi5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdhc3Rlcmlza0NsaWNrJywgZnVuY3Rpb24gKG92ZXJsYWlkX2Jvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9nYXEpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAob3ZlcmxhaWRfYm9vbGVhbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBvcGVuaW5nXG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR29CdXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBc3RlcmlzayBDbGljayAtIE9wZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdIb21lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zaW5nXG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR29CdXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBc3RlcmlzayBDbGljayAtIENsb3NlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQWJvdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmxvZ28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZ28uY29udGFpbmVyKGQzLnNlbGVjdCgnLmxvZ28tbGluZScpKVxuICAgICAgICAgICAgLmF0dGFjaFJlc2l6ZSgpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYud29yayA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIGlmIChhcmdzLmxpdmUpIHtcbiAgICAgICAgICAgIC8vIHNldCB1cFxuICAgICAgICAgICAgd29yay5jb250YWluZXIoZDMuc2VsZWN0KCcud29yaycpKVxuICAgICAgICAgICAgICAgIC5pbmZpbml0ZVNjcm9sbCh0cnVlKVxuICAgICAgICAgICAgICAgIC5sYXlvdXQoYXJncy5sYXlvdXQpXG4gICAgICAgICAgICAgICAgLmxpZ2h0Ym94Q29udGFpbmVyKGQzLnNlbGVjdCgnLmxpZ2h0Ym94JykpXG4gICAgICAgICAgICAgICAgLmZpeEZpbHRlcnNBZnRlcihkMy5zZWxlY3QoJy5pbnRyby1xdW90ZScpKVxuICAgICAgICAgICAgICAgIC5pbml0aWFsaXplKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QoJy53b3JrJykucmVtb3ZlKCk7XG4gICAgICAgICAgICBkMy5zZWxlY3QoJy5saWdodGJveCcpLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn0iLCJ2YXIgY29ubmVjdExvZ29TY2FsZSA9IHJlcXVpcmUoJy4vc2NhbGUnKTtcbnZhciBVdGlsaXR5ID0gcmVxdWlyZSgnLi9zdmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsb2dvICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB3aW5kb3dfc2VsID0gZDMuc2VsZWN0KHdpbmRvdyksXG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCxcbiAgICAgICAgbG9nb19zdmcsXG4gICAgICAgIGxvZ29fdGV4dF9zZWwsXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsLFxuICAgICAgICBzdHJhaWdodF9saW5lID0gZDMuc3ZnLmxpbmUoKSxcbiAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlID0gY29ubmVjdExvZ29TY2FsZSgpLFxuICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWw7XG5cbiAgICB2YXIgdXRpbGl0eSA9IFV0aWxpdHkoKTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbG9nb19jb250YWluZXJfc2VsO1xuICAgICAgICBsb2dvX2NvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5kZWxheVBhc3RSZXZlYWwgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkZWxheV9wYXN0X3JldmVhbF9zZWw7XG4gICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmF0dGFjaFJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93X3NlbFxuICAgICAgICAgICAgLm9uKCdyZXNpemUubG9nbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZWNhbHVsYXRlX2xvZ29fbGluZSgpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignc2Nyb2xsLmxvZ28nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmVjYWx1bGF0ZV9sb2dvX2xpbmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHNldCB1cCBzdmdcbiAgICAgICAgdmFyIHdpbmRvd193aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoLFxuICAgICAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICBsb2dvX3N2ZyA9IGxvZ29fY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1zdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvdy5pbm5lcldpZHRoKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3cuaW5uZXJIZWlnaHQpO1xuXG4gICAgICAgIC8vIHNlbGVjdGlvbiBvZiB0aGUgdGV4dCB0aGF0IHdpbGwgZGVmaW5lIHRoZSBsaW5lXG4gICAgICAgIGxvZ29fdGV4dF9zZWwgPSBkMy5zZWxlY3QoJ2hlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5sb2dvLXRleHQtY29tcG9uZW50Jyk7XG5cbiAgICAgICAgc2V0dXBfcmV2ZWFsKCk7XG5cbiAgICAgICAgLy8gdmVydGljaWVzIGZvciBcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gbG9nb19saW5lX3RleHRfdmVydGljaWVzKGxvZ29fdGV4dF9zZWwpO1xuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQpO1xuXG4gICAgICAgIHZhciBtZXJnZWRfZCA9IG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzKTtcblxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbCA9IGxvZ29fc3ZnLnNlbGVjdEFsbCgnLmxvZ28tbGluZS1tZXJnZWQnKVxuICAgICAgICAgICAgLmRhdGEoW21lcmdlZF9kXSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbG9nby1saW5lLW1lcmdlZCcpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZDsgfSk7XG5cbiAgICAgICAgbG9nb19saW5lX21lcmdlZF9zZWwuY2FsbCh0d2Vlbl9pbik7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNldHVwX3JldmVhbCAoKSB7XG4gICAgICAgIGQzLnNlbGVjdCgnYm9keScpLmNsYXNzZWQoJ3RvLXJldmVhbCcsIGZhbHNlKTtcblxuICAgICAgICBpZiAoZGVsYXlfcGFzdF9yZXZlYWxfc2VsKSB7XG4gICAgICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWxcbiAgICAgICAgICAgICAgICAuZGF0dW0oZnVuY3Rpb24gKCkgeyByZXR1cm4gdGhpcy5kYXRhc2V0OyB9KTtcblxuICAgICAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsXG4gICAgICAgICAgICAgICAgLm9uKCd0cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoZC5kZWxheWVkY2xhc3MsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbigndHJhbnNpdGlvbmVuZCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3dlYmtpdFRyYW5zaXRpb25FbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoZC5kZWxheWVkY2xhc3MsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignd2Via2l0VHJhbnNpdGlvbkVuZCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdvVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdvVHJhbnNpdGlvbkVuZCcpO1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChkLmRlbGF5ZWRjbGFzcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdvVHJhbnNpdGlvbkVuZCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdvdHJhbnNpdGlvbmVuZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdvdHJhbnNpdGlvbmVuZCcpO1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChkLmRlbGF5ZWRjbGFzcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCdvdHJhbnNpdGlvbmVuZCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLm9uKCdNU1RyYW5zaXRpb25FbmQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnTVNUcmFuc2l0aW9uRW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKGQuZGVsYXllZGNsYXNzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ01TVHJhbnNpdGlvbkVuZCcsIG51bGwpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVjYWx1bGF0ZV9sb2dvX2xpbmUgKCkge1xuICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIGxvZ29fc3ZnXG4gICAgICAgICAgICAuYXR0cignd2lkdGgnLCB3aW5kb3dfd2lkdGgpXG4gICAgICAgICAgICAuYXR0cignaGVpZ2h0Jywgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgaWYgKGxvZ29fbGluZV9tZXJnZWRfc2VsKSB7XG4gICAgICAgICAgICB1cGRhdGVfbG9nb19saW5lKHdpbmRvd193aWR0aCwgd2luZG93X2hlaWdodCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbG9nb19saW5lICh3d2lkdGgsIHdoZWlnaHQpIHtcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gbG9nb19saW5lX3RleHRfdmVydGljaWVzKGxvZ29fdGV4dF9zZWwpO1xuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9XG4gICAgICAgICAgICAgICAgbG9nb19saW5lX2Nvbm5lY3Rpbmdfc2VnbWVudHModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWlnaHQpO1xuXG4gICAgICAgIHZhciBtZXJnZWRfZCA9IG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzKTtcblxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbFxuICAgICAgICAgICAgLmRhdGEoW21lcmdlZF9kXSlcbiAgICAgICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24gKGQpIHsgcmV0dXJuIGQ7IH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fbGluZV90ZXh0X3ZlcnRpY2llcyAoc2VsKSB7XG4gICAgICAgIHZhciB0ZXh0X3ZlcnRpY2llcyA9IFtdO1xuXG4gICAgICAgIHNlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgYm91bmRzID0gdGhpcy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHZhciBmaXJzdCwgc2Vjb25kO1xuICAgICAgICAgICAgaWYgKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IFtib3VuZHMubGVmdCArIDMsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjQ1KSkpXTtcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSBbYm91bmRzLnJpZ2h0ICsgNixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNDUpKSldO1xuICAgICAgICAgICAgfSBlbHNlIGlmICgoaSA9PT0gMSkgfCAoaSA9PT0gMikpIHtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IFtib3VuZHMubGVmdCAtIDYsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjQ1KSkpXTtcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSBbYm91bmRzLnJpZ2h0ICsgNixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNDUpKSldO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpID09PSAzKSB7XG4gICAgICAgICAgICAgICAgZmlyc3QgPSBbYm91bmRzLmxlZnQgLSA2LFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC41NSkpKV07XG4gICAgICAgICAgICAgICAgc2Vjb25kID0gW2JvdW5kcy5yaWdodCArIDYsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjU1KSkpXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGV4dF92ZXJ0aWNpZXMucHVzaChbZmlyc3QsIHNlY29uZF0pO1xuXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0ZXh0X3ZlcnRpY2llcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWdtZW50cyhzdGFydF9lbmRfcG9pbnRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHd3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVpZ2h0KSB7XG4gICAgICAgIHZhciBsaW5lX3NpemVfdG9fZHJhdyA9XG4gICAgICAgICAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlLmNob29zZV9zaXplKHd3aWR0aCwgd2hlaWdodCk7XG5cbiAgICAgICAgdmFyIGNvbm5lY3Rpbmdfc2VnbWVudHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGFydF9lbmRfcG9pbnRzLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgIGlmICgoaSsxKSA8IHN0YXJ0X2VuZF9wb2ludHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXJ0ID0gc3RhcnRfZW5kX3BvaW50c1tpXVsxXSxcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gc3RhcnRfZW5kX3BvaW50c1tpKzFdWzBdO1xuXG4gICAgICAgICAgICAgICAgY29ubmVjdGluZ19zZWdtZW50c1xuICAgICAgICAgICAgICAgICAgICAucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3RfbG9nb19zY2FsZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zY2FsZVtsaW5lX3NpemVfdG9fZHJhd10oc3RhcnQsIGVuZCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb25uZWN0aW5nX3NlZ21lbnRzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1lcmdlX2xpbmVzKHRleHRfdmVydGljaWVzLCBjb25uZWN0aW5nX3NlZ21lbnRzKSB7XG4gICAgICAgIC8vIHRha2VzIGFycmF5IG9mIHZlcnRleCBwYWlycywgYW5kIHBhdGhcbiAgICAgICAgLy8gZWxlbWVudHMgb2YgY29ubmVjdGluZyBzZWdtZW50cy5cbiAgICAgICAgLy8gcmV0dXJucyBvbiBwYXRoIGQgYXR0cmlidXRlXG4gICAgICAgIHZhciBkID0gJyc7XG5cbiAgICAgICAgdmFyIHRlbXBfc3ZnID0gZDMuc2VsZWN0KCdib2R5JylcbiAgICAgICAgICAgIC5hcHBlbmQoJ3N2ZycpO1xuICAgICAgICB2YXIgdGVtcF9wYXRoID0gdGVtcF9zdmdcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3RlbXAtcGF0aCcpXG4gICAgICAgICAgICAuZGF0YSh0ZXh0X3ZlcnRpY2llcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5hdHRyKCdkJywgc3RyYWlnaHRfbGluZSlcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICd0ZW1wLXBhdGgnKVxuICAgICAgICAgICAgLnN0eWxlKCdkaXNwbGF5JywgJ25vbmUnKTtcblxuICAgICAgICB0ZW1wX3BhdGguZWFjaChmdW5jdGlvbiAodGQsIHRpKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh0ZCk7XG4gICAgICAgICAgICB2YXIgdGV4dF9kID0gZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2QnKTtcbiAgICAgICAgICAgIGQgKz0gdGV4dF9kO1xuICAgICAgICAgICAgaWYgKGNvbm5lY3Rpbmdfc2VnbWVudHNbdGldKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbm5lY3RpbmdfZCA9IGNvbm5lY3Rpbmdfc2VnbWVudHNbdGldO1xuICAgICAgICAgICAgICAgIGQgKz0gY29ubmVjdGluZ19kO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICB1dGlsaXR5LmNvbnZlcnRUb1JlbGF0aXZlKHRlbXBfcGF0aC5hdHRyKCdkJywgZCkubm9kZSgpKTtcbiAgICAgICAgLy8gcmVwbGFjZSBhbGwgYG1gIGluc3RydWN0aW9ucyB3aXRoIGBsYCwgZXhjZXB0XG4gICAgICAgIC8vIGZvciB0aGUgZmlyc3Qgb25lLiB0aGlzIGlzIGEgcmV2ZXJzZSByZWdleFxuICAgICAgICBkID0gdGVtcF9wYXRoLmF0dHIoJ2QnKS5yZXBsYWNlKC8oPyFeKW0vZywgJ2wnKTtcblxuICAgICAgICB0ZW1wX3N2Zy5yZW1vdmUoKTtcbiAgICAgICAgdGVtcF9wYXRoLnJlbW92ZSgpO1xuXG4gICAgICAgIHJldHVybiBkO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHR3ZWVuX2luKHBhdGgpIHtcbiAgICAgICAgcGF0aC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbig4MDAwKVxuICAgICAgICAgICAgLmF0dHJUd2Vlbignc3Ryb2tlLWRhc2hhcnJheScsIHR3ZWVuRGFzaClcbiAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGRhc2ggYXJyYXksIGFzIHJlc2l6aW5nXG4gICAgICAgICAgICAgICAgLy8gdGhlIGJyb3dzZXIgd2lsbCBjaGFuZ2UgdGhlIGxlbmd0aFxuICAgICAgICAgICAgICAgIC8vIGFuZCB0aGVyZSBpcyBubyBuZWVkIHRvIHJlLWNvbXB1dGVcbiAgICAgICAgICAgICAgICAvLyB0aGUgZGFzaCBhcnJheSB0byBmaXQgaXQuXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ3N0cm9rZS1kYXNoYXJyYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5EYXNoKCkge1xuICAgICAgICB2YXIgbCA9IHRoaXMuZ2V0VG90YWxMZW5ndGgoKSxcbiAgICAgICAgICAgIGkgPSBkMy5pbnRlcnBvbGF0ZVN0cmluZygnMCwnICsgbCwgbCArIFwiLFwiICsgbCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAodCkgeyByZXR1cm4gaSh0KTsgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRfY29sb3Jfc3RvcHMgKHNlbCl7XG4gICAgICAgIHNlbC5hcHBlbmQoJ3N0b3AnKVxuICAgICAgICAgICAgLmF0dHIoJ29mZnNldCcsICcwJScpXG4gICAgICAgICAgICAuYXR0cignc3RvcC1jb2xvcicsICd3aGl0ZScpXG4gICAgICAgICAgICAuYXR0cignc3RvcC1vcGFjaXR5JywgMCk7XG4gICAgICAgIHNlbC5hcHBlbmQoJ3N0b3AnKVxuICAgICAgICAgICAgLmF0dHIoJ29mZnNldCcsICcxMDAlJylcbiAgICAgICAgICAgIC5hdHRyKCdzdG9wLWNvbG9yJywgJ3doaXRlJylcbiAgICAgICAgICAgIC5hdHRyKCdzdG9wLW9wYWNpdHknLCAxKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwidmFyIFV0aWxpdHkgPSByZXF1aXJlKCcuL3N2ZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxvZ29fc2NhbGUgKCkge1xuICAgIHZhciB1dGlsaXR5ID0gVXRpbGl0eSgpO1xuXG4gICAgdmFyIHNlZ21lbnRzID0gW3tcbiAgICAgICAgICAgIGZyb206ICdSSVNEJyxcbiAgICAgICAgICAgIHRvOiAnR3JhZCcsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZLFxuICAgICAgICAgICAgICAgICc3NjgnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgICAgICAvLyAnNzY4JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbCxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmF3bl9kZWx0YToge1xuICAgICAgICAgICAgICAgICczMDAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC01NS43OTM5ODg4ODM0OTUzMyxcbiAgICAgICAgICAgICAgICAgICAgeTogMTAzMy4wNzk5NTYwNTQ2ODc1XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnNzY4Jzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtMTEwLjA0MDAwODU0NDkyMTg4LFxuICAgICAgICAgICAgICAgICAgICB5OiAzODkuMTg0OTk3NTU4NTkzNzVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICcxMDI0Jzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtMTE3LjMyOTk2MzUwNTI2ODEsXG4gICAgICAgICAgICAgICAgICAgIHk6IDM4OS4xODU5NzQxMjEwOTM3NVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAgICczMDAnOiAnTTAuODcxLDAnK1xuICAgICAgICAgICAgICAgICAgJ3YxNi44MScrXG4gICAgICAgICAgICAgICAgICAnYzAsMCwwLDczLjE1NSwwLDEzMS45MTYnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDExNy40MjgsNTkuMjczLDIwNC40OTIsMjY0Ljc2MywyMDQuNDkyJytcbiAgICAgICAgICAgICAgICAgICdjMjA4LjQ5LDAsMjExLjMxNS0yNDAuOTg3LDAtMjQwLjk4NycrXG4gICAgICAgICAgICAgICAgICAnYy00OC43NzQsMC05OS43NzEsMC05OS43NzEsMCcrXG4gICAgICAgICAgICAgICAgICAndjM4OS45MScrXG4gICAgICAgICAgICAgICAgICAnYzAsMCw2MS45NjUtMS4wMzksMTE5Ljk5NCwzNi42NzknK1xuICAgICAgICAgICAgICAgICAgJ2M1OS45OTcsMzguOTk4LDc2LjQ5NiwxMzQuMzgyLDE2MC40OTIsMTM0LjM4MicrXG4gICAgICAgICAgICAgICAgICAnYzk1Ljk5NSwwLDkzLjc1NS05NS43MzQsMS42MzUtMTA3LjQzOScrXG4gICAgICAgICAgICAgICAgICAnYy02NC42MzItOC4yMTMtMTI2LjQ0OCw5Ni4yNy0xNjIuNzQ5LDEzNC4wNTcnK1xuICAgICAgICAgICAgICAgICAgJ2MtNDEuNzQsNDMuNDQ3LTE1NS4zNywxMDMuODc2LTIyOC43MjUsNjQuODc4JytcbiAgICAgICAgICAgICAgICAgICdjLTExMi42MzItNTkuODc5LDIuODkyLTIxMC40OTQsMTAwLjM1My05Ny40OTUnK1xuICAgICAgICAgICAgICAgICAgJ0MzNjMuODUzLDkwNy4xOTItNTQuOTIzLDkxNS43ODgtNTQuOTIzLDkyMS40MycrXG4gICAgICAgICAgICAgICAgICAnYzAsMTguMDEzLDAsMTExLjY1LDAsMTExLjY1JyxcbiAgICAgICAgICAgICAgICAnNzY4JzogJ00wLDAnK1xuICAgICAgICAgICAgICAgICAgJ2gxNy40ODInK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMCwwLDAsMzYuODEnK1xuICAgICAgICAgICAgICAgICAgLy8gJ2MwLDAsMCwyOC44NTEsMCwzNi44MScrXG4gICAgICAgICAgICAgICAgICAnYzAsMjguMDQyLTE1LjkwMSw4Ny4zNy02MS4xODUsODcuMzcnK1xuICAgICAgICAgICAgICAgICAgJ2MtNTMuMjk4LDAtNzkuODA4LDAuMDA1LTc5LjgwOCwwLjAwNWwwLTUyJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDM1LjkyMS00LjM5Myw0OC42NDksMy43NTgnK1xuICAgICAgICAgICAgICAgICAgJ2MzNy44NjEsMjQuMjQyLDI0LjE5NSw4NC45MDktMjguMTM5LDE1Mi4yNDInK1xuICAgICAgICAgICAgICAgICAgJ2MtMjYuMzY4LDMzLjkyNS0zMi43MzQsNzUuMTY3LTMxLjI5LDEwNi42NTMnK1xuICAgICAgICAgICAgICAgICAgJ2MxLjQ0NywzMS41NSwxMi4xMzYsNTQuMzQ3LDI0LjAwNiw1NC4zNDcnLFxuICAgICAgICAgICAgICAgIC8vICc3NjgnOiAnTTk0LjI2LTE1JytcbiAgICAgICAgICAgICAgICAvLyAgICdoMjkuNzk2JytcbiAgICAgICAgICAgICAgICAvLyAgICdjMCwwLDAuOTM2LDguODUxLDAuOTM2LDE2LjgxJytcbiAgICAgICAgICAgICAgICAvLyAgICdjMCwyOC4wNDItMTUuOTAxLDY3LjM3LTYxLjE4NSw2Ny4zNycrXG4gICAgICAgICAgICAgICAgLy8gICAnQzEwLjUxLDY5LjE4LTE2LDY5LjE4NS0xNiw2OS4xODUnK1xuICAgICAgICAgICAgICAgIC8vICAgJ3YtNTInK1xuICAgICAgICAgICAgICAgIC8vICAgJ2MwLDAsMzUuOTIxLTQuMzkzLDQ4LjY0OSwzLjc1OCcrXG4gICAgICAgICAgICAgICAgLy8gICAnYzM3Ljg2MSwyNC4yNDIsMjkuNjQ1LDQ2Ljc3Ny0zLjgsODAuMjQyJytcbiAgICAgICAgICAgICAgICAvLyAgICdjLTE3LjAyNywxNy4wMzgtNDQuNjI5LDE3LTQ0LjYyOSw0OC42NTMnK1xuICAgICAgICAgICAgICAgIC8vICAgJ2MwLDE4LjAxMywwLDI0LjM0NywwLDI0LjM0NycsXG4gICAgICAgICAgICAgICAgJzEwMjQnOiAnTTAuMzMzLDBIMTQwOCcgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsNy4zNyw1NC41MzYtNTYuMzgxLDc1LjYyOScgK1xuICAgICAgICAgICAgICAgICAgJ2MtNDkuNzE4LDE2LjQ1LTE4MS4xMjgtMTYuMjYyLTIzMS45ODksMjYuOTk5JyArXG4gICAgICAgICAgICAgICAgICAnQzk4OS4xMzYsMjEzLjYyMiwxMTQ5LjYyOCwzNDQuMTgsOTIwLjE1MywzNDQuMTgnICtcbiAgICAgICAgICAgICAgICAgICdjLTUzLjI5OCwwLTIxMC42NDEsMC4wMDUtMjEwLjY0MSwwLjAwNWwwLTI3MicgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMTk3LjEyOC0xNi4wNTUsMTgyLjEyOSw4OC45NCcgK1xuICAgICAgICAgICAgICAgICAgJ2MtMjQuNzY4LDE3My4zNzgtNDUyLjgyMS04MS41MTMtNzQ1LjQ2My03MS45OTYnICtcbiAgICAgICAgICAgICAgICAgICdjLTE4NC40OTEsNi0yMzQuMTc4LDY1Ljg5LTI3MS44NDgsMTM5LjQ5MycgK1xuICAgICAgICAgICAgICAgICAgJ2MtMzYuMTA0LDcwLjU0NC0xMC40ODQsMTYwLjU2NCwxLjM4NiwxNjAuNTY0JyArXG4gICAgICAgICAgICAgICAgICAnYzIuMjQxLDAsNy4yODQsMCw3LjI4NCwwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBmcm9tOiAnR3JhZCcsXG4gICAgICAgICAgICB0bzogJ1Nob3cnLFxuICAgICAgICAgICAgc2NhbGVVc2luZzoge1xuICAgICAgICAgICAgICAgICczMDAnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWCxcbiAgICAgICAgICAgICAgICAnNzY4JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFgsXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXduX2RlbHRhOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMzQ0LjE0MDAxNDY0ODQzNzUsXG4gICAgICAgICAgICAgICAgICAgIHk6IDBcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICc3NjgnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDEyNjAuOTU4MDA3ODEyNSxcbiAgICAgICAgICAgICAgICAgICAgeTogMC4yMjY5ODU5NjExOTg4MDY3NlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IDEyNjAuNDk5OTI3NzU5MTcwNSxcbiAgICAgICAgICAgICAgICAgICAgeTogMC4wMDAwMDIzODQxODU3OTEwMTU2MjVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF0aHM6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogJ00wLTAuMTM4JyArXG4gICAgICAgICAgICAgICAgICAgICAgICdjODMuNjI3LDAuNjIsMjM4Ljc1NSwwLDM0NC4xNCwwJyxcbiAgICAgICAgICAgICAgICAnNzY4JzogJ00wLDAgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLDAgMTguODYxLDAuMDQ0IDI1LjgxOCwwLjA5NSAnICtcbiAgICAgICAgICAgICAgICAgICAnYzU5Ljg5NiwwLjQ0NCA0NTAuMDA2LDAgNDUwLjAwNiwwICcgK1xuICAgICAgICAgICAgICAgICAgICdjMCwwIDAsMCAwLDI0OC41ICcgK1xuICAgICAgICAgICAgICAgICAgICdjMCwwIC02Ljc5OSwwIC02OCwwICcgK1xuICAgICAgICAgICAgICAgICAgICdjLTE0OC4yNjYsMCAtMTM4LC0xNTcuNSAwLC0xNTcuNSAnICtcbiAgICAgICAgICAgICAgICAgICAnYzExMCwwIDE4OS42MjgsMTE3LjY1IDMwMiwxMTYgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MxNDcuNjIxLC0yLjE2NyAxOTMuNzg4LC0yMTguNzA1IDE5My43ODgsLTI4NS42NTcgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLC0xOTAuMzQzIC0xNjEuNzg4LC0xMjguMzQzIC0xNjEuNzg4LC00NC4zNDMgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLDUyLjQwMSA0OC43NzcsOTQuNjM4IDEyMy40MjQsMTA2ICcgK1xuICAgICAgICAgICAgICAgICAgICdjMTMyLjg5NCwyMC4yMjggMjg1LjEwNSwxNi45MzYgMzAxLjU2MywxNyAnICtcbiAgICAgICAgICAgICAgICAgICAnYzE0Ljc0NCwwLjA1OCA5NC4xNDcsMC4xMzIgOTQuMTQ3LDAuMTMyJyxcbiAgICAgICAgICAgICAgICAnMTAyNCc6ICdNMC43MDEsMy44MTUnICtcbiAgICAgICAgICAgICAgICAgICdoMTEuNzQ0JytcbiAgICAgICAgICAgICAgICAgICd2MjcxLjE3aC0xNTQuNTAyJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDcuNDY0LTgyLjA1MSw0Ni4xOTgtMTIxLjk5NScrXG4gICAgICAgICAgICAgICAgICAnYzQ3Ljk5OC00OS40OTgsMTQ2Ljg1My02Ny4yNDksMTk0Ljk5LTM4Ljk5OCcrXG4gICAgICAgICAgICAgICAgICAnYzEyMS40OTQsNzEuMzA0LDgwLjk5NiwyMzIuNDkxLDIzMS4wMTYsMjI1LjE2NicrXG4gICAgICAgICAgICAgICAgICAnYzE5Ny4wNjctOS42MjIsMTUyLjk2NS0zOTcuNjU1LDI5Ljk3MS00MzYuNjUzJytcbiAgICAgICAgICAgICAgICAgICdjLTE3MC4xNjctNTMuOTU1LTE3OS45OTEsMjA2LjA2NywxMjUuMzMzLDIwNi4wNjcnK1xuICAgICAgICAgICAgICAgICAgJ2MyMDAuNDg5LDAsMzE0LjE0NS0xMDQuNzU3LDY2Ny45ODctMTA0Ljc1NycrXG4gICAgICAgICAgICAgICAgICAnYzM2Ljc1MywwLDEwNy43NjMsMCwxMDcuNzYzLDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGZyb206ICdTaG93JyxcbiAgICAgICAgICAgIHRvOiAnMjAxNCcsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZLFxuICAgICAgICAgICAgICAgICc3NjgnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWSxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkcmF3bl9kZWx0YToge1xuICAgICAgICAgICAgICAgICczMDAnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC03NS41NTYwMDU0Nzc5MDUyNyxcbiAgICAgICAgICAgICAgICAgICAgeTogNDguNjg5MDA2ODA1NDE5OTJcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICc3NjgnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0xMzAuNzQ0OTk1MTE3MTg3NSxcbiAgICAgICAgICAgICAgICAgICAgeTogNDI2LjcyMzk5OTAyMzQzNzVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICcxMDI0Jzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAtMTAyLjI0OTk5NjQ2MDk3NDIyLFxuICAgICAgICAgICAgICAgICAgICB5OiA0MTAuNTI5MDE5MDQyODQ5NTRcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGF0aHM6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogJ003My42MDYtNDguNjg5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnYzMuMDM3LTAuMDMyLDUuNzQtMC4wNTIsOC4wODktMC4wNTIgJyArXG4gICAgICAgICAgICAgICAgICAgICdjMTUuMzMsMCw2Ljc4My00OS42MjYtMzUuMzM3LTUxLjI1OCAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MtNDMtMS42NjctNzAuNzUsMjQtNzcuMzMzLDU2ICcgK1xuICAgICAgICAgICAgICAgICAgICAnQy0zNi41MjYtMTcuMDE1LTE0LjY0MSwwLTEuOTUsMCcsXG4gICAgICAgICAgICAgICAgJzc2OCc6ICdNMCwwJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLTguMjAxLDM5LjA5OC00NC43NDUsNTMnK1xuICAgICAgICAgICAgICAgICAgJ2MtMjcuNTE0LDEwLjQ2Ny00MC45NTYsMjEuMDg3LTUzLDQ3JytcbiAgICAgICAgICAgICAgICAgICdjLTE2LjUsMzUuNS02LjEwNyw5NS45MzMsNDMuNzc4LDk2LjMyOCcrXG4gICAgICAgICAgICAgICAgICAnQy0xNC4wOCwxOTYuNjQzLTEyLjc0NSwxNDktMTIuNzQ1LDE0OScrXG4gICAgICAgICAgICAgICAgICAnaC0xMjAnK1xuICAgICAgICAgICAgICAgICAgJ3Y4NicrXG4gICAgICAgICAgICAgICAgICAnYzAsMCw1OS4xMjEsOC42NjcsNTkuMTIxLDQ5LjUnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDQ5LjkxMS0zMC4xMjEsNDUuODMzLTUxLjAyOCw3NS40NzknK1xuICAgICAgICAgICAgICAgICAgJ2MtMTguMjQ3LDI1Ljg3My0xNi42OTksNjYuNzQ1LTE2LjY5OSw2Ni43NDUnK1xuICAgICAgICAgICAgICAgICAgJ2gxMC42MDYnLFxuICAgICAgICAgICAgICAgICcxMDI0JzogJ00wLjA2My0wLjE0NycrXG4gICAgICAgICAgICAgICAgICAnYzAsMCw3LjU4OCwwLDkuNDk0LDAnICtcbiAgICAgICAgICAgICAgICAgICdjMCwwLTEzLjcwMS03My4yMjYtOTguMTI1LTYyLjMxMicrXG4gICAgICAgICAgICAgICAgICAnYy04NS42MiwxMS4wNjktMTM3LjYyLDEzMy4wNjktMjI3LjU0MSwyMTIuNjExJytcbiAgICAgICAgICAgICAgICAgICdjLTEyNy4xNTgsMTEyLjQ4MS0zMDcuODk4LDIwMS4yMzYtNDE1LjU2NywyMDEuMjM2JytcbiAgICAgICAgICAgICAgICAgICdjLTEyNy41MDIsMC0xNjMuNTEyLTEwNy45NjQtODMuMDU4LTE1My4zNzEnK1xuICAgICAgICAgICAgICAgICAgJ2M5Ni43MDktNTQuNTgxLDI4Ny4xMjUsMTUzLjQ5MSw0MzEuMTE4LDE1My40OTEnK1xuICAgICAgICAgICAgICAgICAgJ2M1NC4xNSwwLDEzOS40MjgtMTguMDg0LDE1Mi4zOTUtMTAwLjQ4NicrXG4gICAgICAgICAgICAgICAgICAnYzE1LjI1MS05Ni45Miw4MS4wMzMtMTMzLjU5OCwxMzguNTktOTcuNTk4JytcbiAgICAgICAgICAgICAgICAgICdjMjUuMTIyLDE1LjcxMyw0OS40NDMsNzItMTAuNTU3LDExNycrXG4gICAgICAgICAgICAgICAgICAnYy00My45NTMsMzIuOTY1LTYzLjkzNyw1My02My45MzcsOTcuNTgzJytcbiAgICAgICAgICAgICAgICAgICdjMCw0Mi40NjksMzkuMTk4LDQyLjM3NSw0OC40OTcsNDIuMzc1JytcbiAgICAgICAgICAgICAgICAgICdjNS4xMzMsMCwxNi40NDEsMCwxNi40NDEsMCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfV07XG5cbiAgICB2YXIgdGVtcF9zdmcgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIHZhciB0ZW1wX3BhdGggPSB0ZW1wX3N2Z1xuICAgICAgICAuYXBwZW5kKCdwYXRoJyk7XG5cbiAgICB2YXIgbWVhc3VyZV9mb3JfZmYgPSBmYWxzZTtcblxuICAgIHNlZ21lbnRzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgZC5yZWxhdGl2ZV9wYXRoc19kID0ge307XG4gICAgICAgIGQucmVsYXRpdmVfcGF0aHMgPSB7fTtcbiAgICAgICAgZC5zY2FsZSA9IHt9O1xuXG4gICAgICAgIGlmIChtZWFzdXJlX2Zvcl9mZikge1xuICAgICAgICAgICAgY29uc29sZS5sb2coc2VnbWVudHNbaV0uZnJvbSArICcgJyArIHNlZ21lbnRzW2ldLnRvKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAodmFyIHBhdGhfc2l6ZSBpbiBkLnBhdGhzKSB7XG4gICAgICAgICAgICB0ZW1wX3BhdGguYXR0cignZCcsIGQucGF0aHNbcGF0aF9zaXplXSk7XG4gICAgICAgICAgICB1dGlsaXR5LmNvbnZlcnRUb1JlbGF0aXZlKHRlbXBfcGF0aC5ub2RlKCkpO1xuICAgICAgICAgICAgZC5yZWxhdGl2ZV9wYXRoc19kW3BhdGhfc2l6ZV0gPSB0ZW1wX3BhdGguYXR0cignZCcpO1xuICAgICAgICAgICAgZC5yZWxhdGl2ZV9wYXRoc1twYXRoX3NpemVdID0gdGVtcF9wYXRoLm5vZGUoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgaWYgKG1lYXN1cmVfZm9yX2ZmKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3NpemU6ICcsIHBhdGhfc2l6ZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2RlbHRhOiAnLCB1dGlsaXR5LnBhdGhEZWx0YShcbiAgICAgICAgICAgICAgICAgICAgZC5yZWxhdGl2ZV9wYXRoc1twYXRoX3NpemVdKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGQuc2NhbGVbcGF0aF9zaXplXSA9XG4gICAgICAgICAgICAgICAgZC5zY2FsZVVzaW5nW3BhdGhfc2l6ZV0oZC5yZWxhdGl2ZV9wYXRoc1twYXRoX3NpemVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQuZHJhd25fZGVsdGFbcGF0aF9zaXplXSk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHRlbXBfc3ZnLnJlbW92ZSgpO1xuICAgIHRlbXBfcGF0aC5yZW1vdmUoKTtcblxuICAgIHZhciBzaXplcyA9IE9iamVjdC5rZXlzKHNlZ21lbnRzWzBdLnBhdGhzKTtcbiAgICBzZWdtZW50cy5jaG9vc2Vfc2l6ZSA9IGZ1bmN0aW9uICh3aW5kb3dfd2lkdGgsIHdpbmRvd19oZWlnaHQpIHtcbiAgICAgICAgdmFyIGNob3NlbiA9IDA7XG4gICAgICAgIHNpemVzLmZvckVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmIChkIDw9IHdpbmRvd193aWR0aCkge1xuICAgICAgICAgICAgICAgIGNob3NlbiA9IGQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gY2hvc2VuLnRvU3RyaW5nKCk7XG4gICAgfTtcblxuICAgIHdpbmRvdy5zZWdtZW50cyA9IHNlZ21lbnRzO1xuXG4gICAgcmV0dXJuIHNlZ21lbnRzO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN2ZyAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fTtcblxuICAgIHNlbGYuY29udmVydFRvUmVsYXRpdmUgPSBmdW5jdGlvbiAocGF0aCkge1xuICAgICAgICBmdW5jdGlvbiBzZXQodHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBzZWdzLnJlcGxhY2VJdGVtKHJzZWcsIGkpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkeCwgZHksIHgwLCB5MCwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICBzZWdzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgZm9yICh2YXIgeCA9IDAsIHkgPSAwLCBpID0gMCwgbGVuID0gc2Vncy5udW1iZXJPZkl0ZW1zO1xuICAgICAgICAgICAgIGkgPCBsZW47XG4gICAgICAgICAgICAgaSsrKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciBzZWcgPSBzZWdzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgYyAgID0gc2VnLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG5cbiAgICAgICAgICAgIGlmICgvW01MSFZDU1FUQVp6XS8udGVzdChjKSkge1xuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDEgLSB4O1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDIgLSB4O1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTEgLSB5O1xuICAgICAgICAgICAgICAgIGlmICgneTInIGluIHNlZykgeTIgPSBzZWcueTIgLSB5O1xuICAgICAgICAgICAgICAgIGlmICgneCcgIGluIHNlZykgZHggPSAteCArICh4ID0gc2VnLngpO1xuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSAteSArICh5ID0gc2VnLnkpO1xuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdNJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTW92ZXRvJyxkeCxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnTCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0xpbmV0bycsZHgsZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ0gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdMaW5ldG9Ib3Jpem9udGFsJyxkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVic6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0xpbmV0b1ZlcnRpY2FsJyxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9DdWJpYycsZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvQ3ViaWNTbW9vdGgnLGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdRJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b1F1YWRyYXRpYycsZHgsZHkseDEseTEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvUXVhZHJhdGljU21vb3RoJyxkeCxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0FyYycsZHgsZHksc2VnLnIxLHNlZy5yMixzZWcuYW5nbGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VnLmxhcmdlQXJjRmxhZyxzZWcuc3dlZXBGbGFnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdaJzogY2FzZSAneic6IHggPSB4MDsgeSA9IHkwOyBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSB4ICs9IHNlZy54O1xuICAgICAgICAgICAgICAgIGlmICgneScgaW4gc2VnKSB5ICs9IHNlZy55O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIHN0YXJ0IG9mIGEgc3VicGF0aFxuICAgICAgICAgICAgaWYgKGMgPT0gJ00nIHx8IGMgPT0gJ20nKSB7XG4gICAgICAgICAgICAgICAgeDAgPSB4O1xuICAgICAgICAgICAgICAgIHkwID0geTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBhdGguZ2V0QXR0cmlidXRlKCdkJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9aL2csICd6JykpO1xuICAgIH07XG5cbiAgICBzZWxmLnBhdGhEZWx0YSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICB5OiAwXG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHN0YXJ0ID0gcGF0aC5nZXRQb2ludEF0TGVuZ3RoKDApLFxuICAgICAgICAgICAgZW5kID0gcGF0aC5nZXRQb2ludEF0TGVuZ3RoKHBhdGguZ2V0VG90YWxMZW5ndGgoKSk7XG5cbiAgICAgICAgZGVsdGEueCA9IGVuZC54IC0gc3RhcnQueDtcbiAgICAgICAgZGVsdGEueSA9IGVuZC55IC0gc3RhcnQueTtcblxuICAgICAgICByZXR1cm4gZGVsdGE7XG4gICAgfTtcblxuICAgIC8vIHBhc3MgaW4gYSBwYXRoIGVsZW1lbnRcbiAgICAvLyBhbmQgdGhlIHBhdGggc2VnZW1lbnQgaW5kaWNpZXNcbiAgICAvLyB0aGF0IHdpbGwgYmUgc2NhbGVkXG4gICAgc2VsZi5zY2FsZUFuY2hvclkgPSBmdW5jdGlvbiAocGF0aCwgYW5jaG9ycykge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGVBbmNob3JZJyk7XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgICAgICBkcmF3bjogc2VsZi5wYXRoRGVsdGEocGF0aClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmlnaW5hbF9kID0gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgZGVsdGFcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIG9yaWdpbmFsX2QpO1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgdmFyIGZpcnN0X3NlZ21lbnQgPSBzZWdtZW50cy5nZXRJdGVtKDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3NlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhdGhTZWdUeXBlQXNMZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgPT09ICdtJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50X3NlZyA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0FicyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2VtZW50X3NlZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gYW5jaG9ycykge1xuICAgICAgICAgICAgICAgIHZhciB0b19yZXBsYWNlID0gc2VnbWVudHMuZ2V0SXRlbShhbmNob3JzW25hbWVdKTtcbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZV93aXRoID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnQ3VydmV0b0N1YmljUmVsKFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS54LFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS55ICsgKChkZWx0YS5jdXJyZW50LnktXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbHRhLmRyYXduLnkpLzIpLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS54MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueTEsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngyLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS55Mik7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZV93aXRoLCBhbmNob3JzW25hbWVdKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHNlbGYuc2NhbGVQcm9wb3J0aW9uYWwgPSBmdW5jdGlvbiAocGF0aCwgZHJhd25fZGVsdGEpIHtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBkcmF3bl9kZWx0YVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2UoYWxsX3NlZ21lbnRzLCBzZWdtZW50X3RvX3JlcGxhY2UsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgYWxsX3NlZ21lbnRzLnJlcGxhY2VJdGVtKHJzZWcsIHNlZ21lbnRfdG9fcmVwbGFjZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZVByb3BvcnRpb25hbCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR4LCBkeSwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICAgICAgeCA9IHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHkgPSBzdGFydFsxXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VnbWVudHMubnVtYmVyT2ZJdGVtczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ21lbnRzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgICAgIGMgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDEgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDIgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTEgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIGlmICgneTInIGluIHNlZykgeTIgPSBzZWcueTIgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIGlmICgneCcgIGluIHNlZykgZHggPSBzZWcueCAgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSBzZWcueSAgKiByYXRpby55O1xuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ20nOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ01vdmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9Ib3Jpem9udGFsJywgZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b1ZlcnRpY2FsJywgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpYycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgxLHkxLHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWNTbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHNlbGYuc2NhbGVQcm9wb3J0aW9uYWxZID0gZnVuY3Rpb24gKHBhdGgsIGRyYXduX2RlbHRhKSB7XG4gICAgICAgIC8vIHNjYWxlIHksIGZpdCB4XG4gICAgICAgIHZhciBkZWx0YSA9IHtcbiAgICAgICAgICAgICAgICBkcmF3bjogZHJhd25fZGVsdGFcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvcmlnaW5hbF9kID0gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKSxcbiAgICAgICAgICAgIGZpdF94ID0gZmFsc2U7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoTWF0aC5hYnMoZGVsdGEuZHJhd24ueCkgPiAwLjEpIHtcbiAgICAgICAgICAgIGZpdF94ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsJyk7XG4gICAgICAgICAgICBkZWx0YS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGVuZFswXSAtIHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBkZWx0YS5kaWZmID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueCAtIGRlbHRhLmRyYXduLngsXG4gICAgICAgICAgICAgICAgeTogZGVsdGEuY3VycmVudC55IC0gZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdLFxuICAgICAgICAgICAgICAgIHNlZ21lbnRfY291bnQgPSBzZWdtZW50cy5udW1iZXJPZkl0ZW1zO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50X2NvdW50OyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MTtcbiAgICAgICAgICAgICAgICBpZiAoJ3gyJyBpbiBzZWcpIHgyID0gc2VnLngyO1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTEgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIGlmICgneTInIGluIHNlZykgeTIgPSBzZWcueTIgKiByYXRpby55O1xuICAgICAgICAgICAgICAgIGlmIChmaXRfeCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ3gnIGluIHNlZykgZHggPSBzZWcueCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGVsdGEuZGlmZi54LyhzZWdtZW50X2NvdW50LTEpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoJ3gnIGluIHNlZykgZHggPSBzZWcueDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IHNlZy55ICAqIHJhdGlvLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTW92ZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b0hvcml6b250YWwnLCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvVmVydGljYWwnLCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpY1Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbFggPSBmdW5jdGlvbiAocGF0aCwgZHJhd25fZGVsdGEpIHtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBkcmF3bl9kZWx0YVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuXG4gICAgICAgIGZ1bmN0aW9uIHJlcGxhY2UoYWxsX3NlZ21lbnRzLCBzZWdtZW50X3RvX3JlcGxhY2UsIHR5cGUpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10uc2xpY2UuY2FsbChhcmd1bWVudHMsIDMpLFxuICAgICAgICAgICAgICAgIHJjbWQgPSAnY3JlYXRlU1ZHUGF0aFNlZycrIHR5cGUgKydSZWwnLFxuICAgICAgICAgICAgICAgIHJzZWcgPSBwYXRoW3JjbWRdLmFwcGx5KHBhdGgsIGFyZ3MpO1xuICAgICAgICAgICAgYWxsX3NlZ21lbnRzLnJlcGxhY2VJdGVtKHJzZWcsIHNlZ21lbnRfdG9fcmVwbGFjZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHN0YXJ0LCBlbmQpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZVByb3BvcnRpb25hbFgnKTtcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHZhciByYXRpbyA9IHtcbiAgICAgICAgICAgICAgICB4OiBkZWx0YS5jdXJyZW50LngvZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkvZGVsdGEuZHJhd24ueVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGR4LCBkeSwgeDEsIHkxLCB4MiwgeTIsXG4gICAgICAgICAgICAgICAgeCA9IHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHkgPSBzdGFydFsxXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgc2VnbWVudHMubnVtYmVyT2ZJdGVtczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ21lbnRzLmdldEl0ZW0oaSksXG4gICAgICAgICAgICAgICAgICAgIGMgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgICAgIGlmICgneDEnIGluIHNlZykgeDEgPSBzZWcueDEgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDIgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneTEnIGluIHNlZykgeTEgPSBzZWcueTE7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MjtcbiAgICAgICAgICAgICAgICBpZiAoJ3gnICBpbiBzZWcpIGR4ID0gc2VnLnggICogcmF0aW8ueDtcbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTW92ZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b0hvcml6b250YWwnLCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvVmVydGljYWwnLCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpY1Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbmF2ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICB0YXJnZXRfc2VsLFxuICAgICAgICBvdmVybGFpZCA9IGZhbHNlLFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpLFxuICAgICAgICByZW1vdmFibGVfdGV4dCA9IFt7XG4gICAgICAgICAgICB0ZXh0OiAnR28hJ1xuICAgICAgICB9XTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYXN0ZXJpc2tDbGljaycpO1xuXG4gICAgc2VsZi5zZWxlY3Rpb24gPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0YXJnZXRfc2VsO1xuICAgICAgICB0YXJnZXRfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYub3ZlcmxhaWQgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBvdmVybGFpZDtcbiAgICAgICAgb3ZlcmxhaWQgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5zZXR1cCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0YXJnZXRfc2VsKSB0aHJvdyBcInJlcXVpcmVzIGVsZW1lbnRzIHRvIHBhaXJcIjtcbiAgICAgICAgdGFyZ2V0X3NlbFxuICAgICAgICAgICAgLm9uKCdjbGljay5uYXYnLCBmdW5jdGlvbiAoZCwgZGkpIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJyNmbG93ZXInKTtcbiAgICAgICAgICAgICAgICBvdmVybGFpZCA9IG92ZXJsYWlkID8gZmFsc2UgOiB0cnVlO1xuICAgICAgICAgICAgICAgIGFjdGl2YXRlX2RlYWN0aXZhdGUoZCk7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5hc3Rlcmlza0NsaWNrKG92ZXJsYWlkKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHBsYWNlX2J1dHRvbigpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmF0dGFjaFJlc2l6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgIC5vbigncmVzaXplLm5hdicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBwbGFjZV9idXR0b24oKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3Njcm9sbC5uYXYnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYWN0aXZhdGVfZGVhY3RpdmF0ZSAoZCkge1xuICAgICAgICB2YXIgb3ZlcmxheSA9IGQzLnNlbGVjdEFsbChkLmFjdGl2YXRlKTtcbiAgICAgICAgb3ZlcmxheS5jbGFzc2VkKCdvdmVybGFpZCcsIG92ZXJsYWlkKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgb3ZlcmxhaWQpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKGQuYm9keSwgb3ZlcmxhaWQpO1xuICAgICAgICBwbGFjZV9idXR0b24oKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbGFjZV9idXR0b24gKCkge1xuXG4gICAgICAgIHZhciB3d2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgdmFyIHdoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgdmFyIG1hdGNoaW5nX3NlbDtcbiAgICAgICAgdmFyIGJib3g7XG5cbiAgICAgICAgaWYgKG92ZXJsYWlkKSB7XG4gICAgICAgICAgICBiYm94ID0gdGFyZ2V0X3NlbC5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB2YXIgcF9iYm94ID0gdGFyZ2V0X3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2VsZWN0KCdwJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHZhciB0YXJnZXRfaGVpZ2h0ID0gYmJveC5oZWlnaHQ7XG4gICAgICAgICAgICBtYXRjaGluZ19zZWwgPVxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmxvZ28tdGV4dC1jb21wb25lbnQtLXJpc2QnKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdGFyZ2V0X3NlbC5zdHlsZSgnbGVmdCcsICh3d2lkdGggK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwX2Jib3gud2lkdGggLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYm94LndpZHRoIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKCttYXRjaGluZ19zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpO1xuICAgICAgICAgICAgdGFyZ2V0X3NlbC5zdHlsZSgnYm90dG9tJywgKHdoZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJib3guaGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoK21hdGNoaW5nX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgndG9wJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3BsaXQoJ3AnKVswXSkpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdweCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWF0Y2hpbmdfc2VsID1cbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoJy5sb2dvLXRleHQtY29tcG9uZW50LS0yMDE0Jyk7XG4gICAgICAgICAgICB0YXJnZXRfc2VsXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdsZWZ0JywgbWF0Y2hpbmdfc2VsLnN0eWxlKCdyaWdodCcpKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnYm90dG9tJywgbWF0Y2hpbmdfc2VsLnN0eWxlKCdib3R0b20nKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBib3R0b20gKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGRpcnR5ID0gZmFsc2UsXG4gICAgICAgIGNvbnRhaW5lcl9zZWwsXG4gICAgICAgIGNvbnRhaW5lcl9tYXJnaW5fYm90dG9tLFxuICAgICAgICB3aW5kb3dfaGVpZ2h0O1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdib3R0b20nKTtcblxuICAgIHNlbGYuZGlydHkgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkaXJ0eTtcbiAgICAgICAgZGlydHkgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hdHRhY2hXaW5kb3dFdmVudHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgICAgICAub24oJ3Jlc2l6ZS5ib3R0b20nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coKVxuICAgICAgICAgICAgICAgIGNhbGN1bGF0ZV92YXJpYWJsZXMoKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3Njcm9sbC5ib3R0b20nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFjb250YWluZXJfc2VsKSB0aHJvdyBcIkJvdHRvbSByZXF1aXJlcyBjb250YWluZXIuXCI7XG4gICAgICAgICAgICAgICAgaWYgKGRpcnR5KSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB2YXIgY2JveCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoKGNib3guYm90dG9tICsgY29udGFpbmVyX21hcmdpbl9ib3R0b20pIDw9XG4gICAgICAgICAgICAgICAgICAgICB3aW5kb3dfaGVpZ2h0KSB7XG5cbiAgICAgICAgICAgICAgICAgICAgZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmJvdHRvbSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5pbml0aWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBjYWxjdWxhdGVfdmFyaWFibGVzKCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjYWxjdWxhdGVfdmFyaWFibGVzICgpIHtcbiAgICAgICAgd2luZG93X2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICAgICAgY29udGFpbmVyX21hcmdpbl9ib3R0b20gPSArY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgLnN0eWxlKCdtYXJnaW4tYm90dG9tJylcbiAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIERhdGEgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHJlcXVlc3RlZCA9IFtdLFxuICAgICAgICBhdmFpbGFibGU7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2RhdGEnLCdlbmRPZkRhdGEnKTtcblxuICAgIHNlbGYuZmV0Y2hfZGF0YSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2ZldGNoaW5nIGRhdGEnKTtcbiAgICAgICAgaWYgKCFhdmFpbGFibGUpIHtcbiAgICAgICAgICAgIGQzLmpzb24oJy4uL2RhdGEvbWV0YWRhdGEuanNvbicsIHByb2Nlc3NfbWV0YWRhdGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJvY2Vzc19yZXF1ZXN0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc19tZXRhZGF0YSAocmF3X21ldGEpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Byb2Nlc3NpbmcgbWV0YWRhdGEnKTtcbiAgICAgICAgYXZhaWxhYmxlID0gcmF3X21ldGEuYXZhaWxhYmxlO1xuICAgICAgICBwcm9jZXNzX3JlcXVlc3QoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzX3JlcXVlc3QgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygncHJvY2Vzc2luZyByZXF1ZXN0Jyk7XG4gICAgICAgIHZhciBuZXh0X3RvX2xvYWQgPSBjaG9vc2VfYW5kX3JlbW92ZV9mcm9tX2F2YWlsYWJsZSgpO1xuICAgICAgICBjb25zb2xlLmxvZyhuZXh0X3RvX2xvYWQpO1xuICAgICAgICBpZiAobmV4dF90b19sb2FkKSB7XG4gICAgICAgICAgICBkMy5qc29uKG5leHRfdG9fbG9hZCwgZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmRhdGEoZGF0YSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guZW5kT2ZEYXRhKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaG9vc2VfYW5kX3JlbW92ZV9mcm9tX2F2YWlsYWJsZSAoKSB7XG4gICAgICAgIHZhciBzZWxlY3RlZDtcbiAgICAgICAgdmFyIGluZGV4ID0gTWF0aC5yYW5kb20oKSAqIGF2YWlsYWJsZS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgICAgICAgIHNlbGVjdGVkID0gYXZhaWxhYmxlLnNwbGljZShpbmRleCwgMSlbMF07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc2VsZWN0ZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZml4ZWQgKCkge1xuICAgIC8vIHdoZW4gY29udGFpbmVyIGhpdHMgdGhlIHRvcCwgc3dpdGNoIHRoYXQgZWxlbWVudCB0byBmaXhlZFxuICAgIC8vIHBsdXMgdGhlIGFkZGl0aW9uYWwgcGFkZGluZ1xuXG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgbm9fdHJhbnNsYXRlX3NlbCxcbiAgICAgICAgdHJhbnNsYXRlX3NlbCxcbiAgICAgICAgbm9fdHJhbnNsYXRlX2Rpc3RhbmNlID0gMDtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnYWN0aXZhdG9yVmlzaWJsZScpO1xuXG4gICAgdmFyIHZlbmRvciA9IFtcIlwiLCBcIi13ZWJraXQtXCIsIFwiLW1vei1cIiwgXCItbXMtXCIsIFwiLW8tXCJdLnJlZHVjZShcbiAgICAgICAgZnVuY3Rpb24gKHAsIHYpIHtcbiAgICAgICAgICAgIHJldHVybiB2ICsgXCJ0cmFuc2Zvcm1cIiBpbiBkb2N1bWVudC5ib2R5LnN0eWxlID8gdiA6IHA7XG4gICAgICAgIH0pO1xuXG4gICAgdmFyIHRyYW5zZm9ybV9hdHRyID0gdmVuZG9yICsgJ3RyYW5zZm9ybSc7XG5cbiAgICBzZWxmLm5vVHJhbnNsYXRlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbm9fdHJhbnNsYXRlX3NlbDtcbiAgICAgICAgbm9fdHJhbnNsYXRlX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnRyYW5zbGF0ZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRyYW5zbGF0ZV9zZWw7XG4gICAgICAgIHRyYW5zbGF0ZV9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi50b3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBub190cmFuc2xhdGVfZGlzdGFuY2U7XG4gICAgfTtcblxuICAgIHNlbGYuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY2FsY19jb250cmFpbnRzKCk7XG5cbiAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgIC5vbignc2Nyb2xsLmZpeGVkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHZhciB0cmFuc2xhdGVfeSA9IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAoKG5vX3RyYW5zbGF0ZV9kaXN0YW5jZSAtIHBhZ2VZT2Zmc2V0KSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlX3kgPSBwYWdlWU9mZnNldCAtIG5vX3RyYW5zbGF0ZV9kaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaFxuICAgICAgICAgICAgICAgICAgICAgICAgLmFjdGl2YXRvclZpc2libGUoKHRyYW5zbGF0ZV95ID09PSAwKSA/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2UgOiB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0cmFuc2xhdGVfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5zdHlsZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybV9hdHRyLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3RyYW5zbGF0ZSgwLCcgKyB0cmFuc2xhdGVfeSArICdweCknKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3Jlc2l6ZS5maXhlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybV9hdHRyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2xhdGUoMCwwKScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWxjX2NvbnRyYWludHMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjYWxjX2NvbnRyYWludHMgKCkge1xuICAgICAgICB2YXIgbm9fdHJhbnNsYXRlX21hcmdpbiA9XG4gICAgICAgICAgICAgICAgK25vX3RyYW5zbGF0ZV9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdtYXJnaW4tdG9wJylcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF07XG4gICAgICAgIHZhciBub190cmFuc2xhdGVfaGVpZ2h0ID1cbiAgICAgICAgICAgICAgICBub190cmFuc2xhdGVfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgICAgIC5oZWlnaHQ7XG4gICAgICAgIG5vX3RyYW5zbGF0ZV9kaXN0YW5jZSA9IG5vX3RyYW5zbGF0ZV9oZWlnaHQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub190cmFuc2xhdGVfbWFyZ2luO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgYm90dG9tID0gcmVxdWlyZSgnLi9ib3R0b20nKSgpO1xudmFyIGJlaGFuY2UgPSByZXF1aXJlKCcuL2RhdGEnKSgpO1xudmFyIGRlcGFydG1lbnRzID0gcmVxdWlyZSgnLi4vZGVwYXJ0bWVudHMnKSgpO1xudmFyIHRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtJykoKTtcbnZhciBsaWdodGJveCA9IHJlcXVpcmUoJy4vbGlnaHRib3gnKSgpO1xudmFyIHNjcm9sbHRvID0gcmVxdWlyZSgnLi9zY3JvbGx0bycpKHsgZHVyYXRpb246IDEwMDAgfSk7XG52YXIgZml4ZWQgPSByZXF1aXJlKCcuL2ZpeGVkJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB3b3JrICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBjb250YWluZXJfc2VsLFxuICAgICAgICBpbmZpbml0ZV9zY3JvbGxfYm9vbCA9IGZhbHNlLFxuICAgICAgICBkYXRhID0gW10sXG4gICAgICAgIHdvcmtfY29udGFpbmVyX3NlbCxcbiAgICAgICAgd29ya19zZWwsXG4gICAgICAgIGlzbyxcbiAgICAgICAgbGF5b3V0ID0gJ2ltYWdlJyxcbiAgICAgICAgcmVuZGVyX2xheW91dCA9IHtcbiAgICAgICAgICAgIGltYWdlOiByZW5kZXJfaW1hZ2UsXG4gICAgICAgICAgICBmaXhlZDogcmVuZGVyX2ZpeGVkXG4gICAgICAgIH0sXG4gICAgICAgIGZpeF9maWx0ZXJzX2FmdGVyX3NlbDtcblxuICAgIGJlaGFuY2UuZGlzcGF0Y2hcbiAgICAgICAgLm9uKCdkYXRhJywgZnVuY3Rpb24gKHJlcXVlc3RlZCkge1xuICAgICAgICAgICAgYm90dG9tLmRpcnR5KGZhbHNlKTtcblxuICAgICAgICAgICAgaWYgKCFyZXF1ZXN0ZWQpIHRocm93ICdXb3JrLiBHb3Qgbm8gZGF0YS4nO1xuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybWVkID0gdHJhbnNmb3JtKHJlcXVlc3RlZCk7XG5cbiAgICAgICAgICAgIGRhdGEgPSBkYXRhLmNvbmNhdCh0cmFuc2Zvcm1lZCk7XG4gICAgICAgICAgICByZW5kZXIoKTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBmaWx0ZXJhYmxlIGxpc3RcbiAgICAgICAgICAgIGRlcGFydG1lbnRzLmlzRmlsdGVyYWJsZSh0cmFuc2Zvcm1lZCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5vbignZW5kT2ZEYXRhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYm90dG9tLmRpc3BhdGNoLm9uKCdib3R0b20ud29yaycsIG51bGwpO1xuICAgICAgICB9KTtcblxuICAgIGZpeGVkLmRpc3BhdGNoXG4gICAgICAgIC5vbignYWN0aXZhdG9yVmlzaWJsZScsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICBkZXBhcnRtZW50cy5hY3RpdmF0b3JWaXNpYmxlKGQpO1xuICAgICAgICB9KTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmZpeEZpbHRlcnNBZnRlciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGZpeF9maWx0ZXJzX2FmdGVyX3NlbDtcbiAgICAgICAgZml4X2ZpbHRlcnNfYWZ0ZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYubGF5b3V0ID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbGF5b3V0O1xuICAgICAgICBsYXlvdXQgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5saWdodGJveENvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxpZ2h0Ym94LmNvbnRhaW5lcigpO1xuICAgICAgICBsaWdodGJveC5jb250YWluZXIoXyk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmluZmluaXRlU2Nyb2xsID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gaW5maW5pdGVfc2Nyb2xsX2Jvb2w7XG4gICAgICAgIGluZmluaXRlX3Njcm9sbF9ib29sID0gXztcblxuICAgICAgICBpZiAoaW5maW5pdGVfc2Nyb2xsX2Jvb2wgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGJvdHRvbVxuICAgICAgICAgICAgICAgIC5jb250YWluZXIoY29udGFpbmVyX3NlbClcbiAgICAgICAgICAgICAgICAuYXR0YWNoV2luZG93RXZlbnRzKCk7XG5cbiAgICAgICAgICAgIGJvdHRvbS5kaXNwYXRjaFxuICAgICAgICAgICAgICAgIC5vbignYm90dG9tLndvcmsnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdyZWFjaGVkIGJvdHRvbScpO1xuICAgICAgICAgICAgICAgICAgICBib3R0b20uZGlydHkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGJlaGFuY2UuZmV0Y2hfZGF0YSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuaW5pdGlhbGl6ZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghY29udGFpbmVyX3NlbCkgdGhyb3cgXCJXb3JrIHJlcXVpcmVzIGEgY29udGFpbmVyXCI7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwuY2FsbChhZGRfc3RydWN0dXJlKTtcblxuICAgICAgICBpZiAoaW5maW5pdGVfc2Nyb2xsX2Jvb2wpIGJvdHRvbS5pbml0aWFsaXplKCk7XG5cbiAgICAgICAgLy8gd2lsbCBiZSB0aGUgdGhpbmcgdG8gY2FsbCByZW5kZXJcbiAgICAgICAgYmVoYW5jZS5mZXRjaF9kYXRhKCk7XG5cbiAgICAgICAgLy8gZmlsdGVyaW5nXG4gICAgICAgIGRlcGFydG1lbnRzLmRpc3BhdGNoXG4gICAgICAgICAgICAub24oJ2NsaWNrLndvcmsnLCBmdW5jdGlvbiAoZGVwYXJ0bWVudCkge1xuXG4gICAgICAgICAgICBzY3JvbGx0byhmaXhlZC50b3AoKSArIDEwKTtcblxuICAgICAgICAgICAgaWYgKGRlcGFydG1lbnQgPT09ICdhbGwnKSBkZXBhcnRtZW50ID0gJyc7XG5cbiAgICAgICAgICAgIGlmIChpc28pIHtcbiAgICAgICAgICAgICAgICBpc28uYXJyYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KGl0ZW1FbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKGRlcGFydG1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZpeGVkLmluaXRpYWxpemUoKTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyICgpIHtcbiAgICAgICAgcmVuZGVyX2xheW91dFtsYXlvdXRdKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyX2ZpeGVkICgpIHtcbiAgICAgICAgdmFyIG1hc29ucnkgPSBtYXNvbnJ5X3NldHRpbmdzKCk7XG5cbiAgICAgICAgd29ya19zZWwgPSB3b3JrX2NvbnRhaW5lcl9zZWwuc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgICAgICAgdmFyIHdvcmtfc2VsX2VudGVyID0gd29ya19zZWxcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncGllY2UgJyArIGQucmlzZF9wcm9ncmFtX2NsYXNzO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXNvbnJ5LmNvbHVtbldpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICgobWFzb25yeS5jb2x1bW5XaWR0aCAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfaGVpZ2h0KS9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF93aWR0aCkrICdweCc7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLXdyYXBwZXInKVxuICAgICAgICAgICAgICAgIC5jYWxsKGFkZF9pbWFnZSk7XG4gICAgICAgIFxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2UtbWV0YS13cmFwcGVyJylcbiAgICAgICAgICAgICAgICAuY2FsbChhZGRfbWV0YSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDUwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICB3b3JrX3NlbC5vbignY2xpY2sud29yaycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2FsbChsaWdodGJveC5zaG93KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpc28pIHtcbiAgICAgICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbC5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IG1hc29ucnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd29ya19zZWxfZW50ZXIuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaXNvLmFwcGVuZGVkKHRoaXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpc28ubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfaW1hZ2UgKCkgIHtcbiAgICAgICAgdmFyIG1hc29ucnkgPSBtYXNvbnJ5X3NldHRpbmdzKCk7XG4gICAgICAgIHZhciBtZXRhX3NwYWNlID0gMzU7XG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcblxuICAgICAgICB3b3JrX3NlbCA9IHdvcmtfY29udGFpbmVyX3NlbC5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKTtcblxuICAgICAgICB2YXIgd29ya19zZWxfZW50ZXIgPSB3b3JrX3NlbFxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdwaWVjZSAnICsgZC5yaXNkX3Byb2dyYW1fY2xhc3M7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZmlndXJlIG91dCBoZWlnaHQgYW5kIHdpZHRoXG5cbiAgICAgICAgICAgICAgICAgICAgLy8gbGFuZHNjYXBlIGltYWdlcyBkZXNlcnZlIHRvIGJlIGxhbmRzY2FweVxuICAgICAgICAgICAgICAgICAgICBpZiAoKGQuY292ZXIub3JpZ2luYWxfd2lkdGgvXG4gICAgICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF9oZWlnaHQpID5cbiAgICAgICAgICAgICAgICAgICAgICAgIDEuOCkge1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPSBtYXNvbnJ5LmNvbHVtbldpZHRoICogMiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXNvbnJ5Lmd1dHRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGQubWFzb25yeV9oZWlnaHQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgoZC5tYXNvbnJ5X3dpZHRoICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfaGVpZ2h0KS9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF93aWR0aCkgKyBtZXRhX3NwYWNlO1xuXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudGVyICs9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgZXZlcnkgNXRoIG9uZSBiaWcuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoY291bnRlciAlIDUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPSBtYXNvbnJ5LmNvbHVtbldpZHRoICogMiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFzb25yeS5ndXR0ZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQubWFzb25yeV93aWR0aCA9IG1hc29ucnkuY29sdW1uV2lkdGg7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBkLm1hc29ucnlfaGVpZ2h0ID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKGQubWFzb25yeV93aWR0aCAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX2hlaWdodCkvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfd2lkdGgpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRhX3NwYWNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIFxuXG5cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV9oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS13cmFwcGVyJylcbiAgICAgICAgICAgICAgICAuY2FsbChhZGRfaW1hZ2UpO1xuICAgICAgICBcbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLW1ldGEtd3JhcHBlcicpXG4gICAgICAgICAgICAgICAgLmNhbGwoYWRkX21ldGEpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmRlbGF5KGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKiA1MDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZHVyYXRpb24oMjAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG5cbiAgICAgICAgd29ya19zZWwub24oJ2NsaWNrLndvcmsnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNhbGwobGlnaHRib3guc2hvdyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICghaXNvKSB7XG4gICAgICAgICAgICBpc28gPSBuZXcgSXNvdG9wZSh3b3JrX2NvbnRhaW5lcl9zZWwubm9kZSgpLCB7XG4gICAgICAgICAgICAgICAgaXRlbVNlbGVjdG9yOiAnLnBpZWNlJyxcbiAgICAgICAgICAgICAgICBtYXNvbnJ5OiBtYXNvbnJ5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdvcmtfc2VsX2VudGVyLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlzby5hcHBlbmRlZCh0aGlzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXNvLmxheW91dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX3N0cnVjdHVyZSAoc2VsKSAge1xuICAgICAgICB2YXIgZGVwdF9jb250YWluZXJfc2VsID0gc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdjb2wtcGVyY2VudC0yLTEwIGRlcGFydG1lbnRzJyk7XG5cbiAgICAgICAgd29ya19jb250YWluZXJfc2VsID0gc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdjb2wtcGVyY2VudC04LTEwIHdvcmstY29udGFpbmVyIG9tZWdhICcrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAnd29yay1sYXlvdXQtJyArIGxheW91dCk7XG5cbiAgICAgICAgZGVwYXJ0bWVudHNcbiAgICAgICAgICAgIC5jb250YWluZXIoZGVwdF9jb250YWluZXJfc2VsKVxuICAgICAgICAgICAgLm1vYmlsZShkMy5zZWxlY3QoJy5uYXYtbW9iaWxlJykpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgZml4ZWRcbiAgICAgICAgICAgIC5ub1RyYW5zbGF0ZShmaXhfZmlsdGVyc19hZnRlcl9zZWwpXG4gICAgICAgICAgICAudHJhbnNsYXRlKGRlcHRfY29udGFpbmVyX3NlbCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX21ldGEgKHNlbCkge1xuICAgICAgICBzZWwuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdzdHVkZW50LW5hbWUgcGllY2UtbWV0YScpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnN0dWRlbnRfbmFtZTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHNlbC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3Jpc2QtcHJvZ3JhbSBwaWVjZS1tZXRhJylcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQucmlzZF9wcm9ncmFtO1xuICAgICAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkX2ltYWdlIChzZWwpIHtcbiAgICAgICAgc2VsLmFwcGVuZCgnaW1nJylcbiAgICAgICAgICAgIC5hdHRyKCdzcmMnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmNvdmVyLnNyYztcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hc29ucnlfc2V0dGluZ3MgKCkge1xuICAgICAgICB2YXIgdG90YWxfd29ya193aWR0aCA9IHdvcmtfY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAud2lkdGg7XG4gICAgICAgIHZhciBudW1iZXJfb2ZfY29sdW1ucyA9IDQ7XG4gICAgICAgIHZhciBndXR0ZXIgPSAwO1xuICAgICAgICB2YXIgY29sdW1uX3dpZHRoID0gKHRvdGFsX3dvcmtfd2lkdGggLyBudW1iZXJfb2ZfY29sdW1ucykgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgKGd1dHRlciAqIChudW1iZXJfb2ZfY29sdW1ucyAtIDEpKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZ3V0dGVyOiBndXR0ZXIsXG4gICAgICAgICAgICBjb2x1bW5XaWR0aDogY29sdW1uX3dpZHRoXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGlnaHRib3ggKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbnRhaW5lcl9zZWwsXG4gICAgICAgIHNlbGVjdGVkX3NlbCxcbiAgICAgICAgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnNob3cgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGlmICghY29udGFpbmVyX3NlbCkgdGhyb3cgXCJMaWdodGJveC4gUmVxdWlyZXMgY29udGFpbmVyLlwiO1xuXG4gICAgICAgIHNlbGVjdGVkX3NlbCA9IHNlbDtcblxuICAgICAgICB2YXIgZGF0YSA9IHNlbC5kYXR1bSgpO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9ncmlkX3NlbCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnZ3JpZCcpO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9tZXRhX3NlbCA9XG4gICAgICAgICAgICBsaWdodGJveF9ncmlkX3NlbFxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEgY29sLTItMTAnKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfd29ya19zZWwgPVxuICAgICAgICAgICAgbGlnaHRib3hfZ3JpZF9zZWxcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC13b3JrIG9mZnNldC0yLTEwIGNvbC04LTEwJyk7XG5cbiAgICAgICAgbGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2gyJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC10aXRsZScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnByb2plY3RfbmFtZSk7XG5cbiAgICAgICAgbGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LWRlc2NyaXB0aW9uJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEuZGVzY3JpcHRpb24pO1xuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEubW9kdWxlcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zaXplcy5tYXhfMTI0MCA/IGQuc2l6ZXMubWF4XzEyNDAgOiBkLnNyYztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9tZXRhX2luZm9fc2VsID0gbGlnaHRib3hfbWV0YV9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvJyk7XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvLS1zdHVkZW50LW5hbWUnKVxuICAgICAgICAgICAgLnRleHQoZGF0YS5zdHVkZW50X25hbWUpO1xuXG4gICAgICAgIGxpZ2h0Ym94X21ldGFfaW5mb19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mby0tcmlzZC1wcm9ncmFtJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEucmlzZF9wcm9ncmFtKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdhJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXBlcnNvbmFsLWxpbmsnKVxuICAgICAgICAgICAgLmF0dHIoJ2hyZWYnLCBkYXRhLnVybClcbiAgICAgICAgICAgIC50ZXh0KCdCZWhhbmNlJyk7XG5cbiAgICAgICAgY29udGFpbmVyX3NlbC5jbGFzc2VkKCdhY3RpdmUnLCB0cnVlKTtcbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgdHJ1ZSk7XG5cbiAgICAgICAgY29udGFpbmVyX3NlbC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2xvc2UgKCkge1xuICAgICAgICBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAuY2xhc3NlZCgnYWN0aXZlJywgZmFsc2UpXG4gICAgICAgICAgICAuaHRtbCgnJyk7XG5cbiAgICAgICAgYm9keV9zZWwuY2xhc3NlZCgnbm8tc2Nyb2xsJywgZmFsc2UpO1xuXG4gICAgICAgIGNvbnRhaW5lcl9zZWwub24oJ2NsaWNrJywgbnVsbCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2Nyb2xsdG8gKGFyZ3MpIHtcbiAgICB2YXIgb3B0aW9ucyA9IGFyZ3MgfHwge307XG4gICAgb3B0aW9ucy5kdXJhdGlvbiA9IGFyZ3MuZHVyYXRpb24gfHwgMjAwMDtcblxuICAgIGZ1bmN0aW9uIHNjcm9sbF90d2VlbiAob2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaSA9IGQzLmludGVycG9sYXRlTnVtYmVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnBhZ2VZT2Zmc2V0IHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9mZnNldCk7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKHQpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUbygwLCBpKHQpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgZDMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZHVyYXRpb24ob3B0aW9ucy5kdXJhdGlvbilcbiAgICAgICAgICAgIC50d2Vlbignc2Nyb2xsJywgc2Nyb2xsX3R3ZWVuKG9mZnNldCkpO1xuICAgIH07XG59OyIsIi8vIHJlcXVpcmVzIGQzLnNjYWxlLm9yZGluYWxcbm1vZHVsZS5leHBvcnRzID0gdHJhbnNmb3JtO1xuXG5mdW5jdGlvbiB0cmFuc2Zvcm0gKCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgICAgdmFyIGZvcm1hdHRlZCA9IGZvcm1hdF9kYXRhX2NvdmVyX3dpdGhfbW9kdWxlcyhpbnB1dCk7XG4gICAgICAgIHJldHVybiBzaHVmZmxlKGZvcm1hdHRlZCk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZm9ybWF0X2RhdGFfY292ZXJfd2l0aF9tb2R1bGVzIChkYXRhKSB7XG5cbiAgICB2YXIgZm9ybWF0dGVkX2RhdGEgPSBbXTtcblxuICAgIC8vIGRldGVybWluZSB0aGUgZXh0ZW50IG9mIHdpZHRoc1xuICAgIHZhciBhbGxfbW9kdWxlcyA9IFtdO1xuICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICBkLmRldGFpbHMubW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtZCwgbWkpIHtcbiAgICAgICAgICAgIGlmIChtZC50eXBlID09PSAnaW1hZ2UnKSB7XG4gICAgICAgICAgICAgICAgYWxsX21vZHVsZXMucHVzaChtZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gc2V0IGEgc2NhbGUgZm9yIG1hcHBpbmdcbiAgICAvLyB3aWR0aCB0aGUgYW4gaW1hZ2UgdG8gdGhlXG4gICAgLy8gd2lkdGggb2YgdGhlIG1hc29uaWMgdmVyc2lvblxuICAgIHZhciB3aWR0aF9leHRlbnQgPSBkMy5leHRlbnQoYWxsX21vZHVsZXMsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC53aWR0aDsgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgIGNvbnNvbGUubG9nKCd3aWR0aF9leHRlbnQnKTtcbiAgICBjb25zb2xlLmxvZyh3aWR0aF9leHRlbnQpO1xuICAgIHZhciB3aWR0aHMgPSBkMy5zY2FsZS5vcmRpbmFsKClcbiAgICAgICAgLmRvbWFpbih3aWR0aF9leHRlbnQpXG4gICAgICAgIC5yYW5nZShbMTAwLCAyMDAsIDQwMF0pO1xuICAgIC8vIHZhciB3aWR0aHMgPSBkMy5zY2FsZS5pZGVudGl0eSgpXG4gICAgLy8gICAgIC5kb21haW4od2lkdGhfZXh0ZW50KTtcblxuICAgIGRhdGEuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICB2YXIgbW9kdWxlc190b19pbmNsdWRlID0gW107XG4gICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUucHVzaChtZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHJhbmRvbV9jb3Zlcl9vcHRpb25cbiAgICAgICAgdmFyIHJhbmRvbV9tb2R1bGUgPVxuICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kdWxlc190b19pbmNsdWRlLmxlbmd0aCldO1xuXG4gICAgICAgIHZhciByYW5kb21fY292ZXIgPSB7XG4gICAgICAgICAgICBvcmlnaW5hbF93aWR0aDogK3JhbmRvbV9tb2R1bGUud2lkdGgsXG4gICAgICAgICAgICBvcmlnaW5hbF9oZWlnaHQ6ICtyYW5kb21fbW9kdWxlLmhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiB3aWR0aHMocmFuZG9tX21vZHVsZS53aWR0aCksXG4gICAgICAgICAgICBzcmM6IHJhbmRvbV9tb2R1bGUuc3JjXG4gICAgICAgIH07XG4gICAgICAgIHJhbmRvbV9jb3Zlci5oZWlnaHQgPSAocmFuZG9tX2NvdmVyLndpZHRoKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9tb2R1bGUuaGVpZ2h0KS9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmRvbV9tb2R1bGUud2lkdGg7XG5cbiAgICAgICAgZm9ybWF0dGVkX2RhdGEucHVzaCh7XG4gICAgICAgICAgICAncHJvamVjdF9uYW1lJzogZC5uYW1lLFxuICAgICAgICAgICAgJ3N0dWRlbnRfbmFtZSc6IGQub3duZXJzWzBdLmRpc3BsYXlfbmFtZSxcbiAgICAgICAgICAgICdyaXNkX3Byb2dyYW0nOiBkLnJpc2RfcHJvZ3JhbSxcbiAgICAgICAgICAgICdyaXNkX3Byb2dyYW1fY2xhc3MnOiBlc2NhcGVfZGVwYXJ0bWVudChkLnJpc2RfcHJvZ3JhbSksXG4gICAgICAgICAgICAnbW9kdWxlcyc6IG1vZHVsZXNfdG9faW5jbHVkZSxcbiAgICAgICAgICAgICdjb3Zlcic6IHJhbmRvbV9jb3ZlcixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBkLmRldGFpbHMuZGVzY3JpcHRpb24sXG4gICAgICAgICAgICBhdmF0YXI6IGQub3duZXJzWzBdLmltYWdlc1snMTM4J10sXG4gICAgICAgICAgICB1cmw6IGQub3duZXJzWzBdLnVybFxuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIHJldHVybiBmb3JtYXR0ZWRfZGF0YTtcbn1cblxuZnVuY3Rpb24gc2h1ZmZsZSAobykge1xuICAgIGZvcih2YXIgaiwgeCwgaSA9IG8ubGVuZ3RoO1xuICAgICAgICBpO1xuICAgICAgICBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogaSksXG4gICAgICAgIHggPSBvWy0taV0sIG9baV0gPSBvW2pdLCBvW2pdID0geCk7XG4gICAgcmV0dXJuIG87XG59XG5cbmZ1bmN0aW9uIGVzY2FwZV9kZXBhcnRtZW50KGQpIHtcbiAgICByZXR1cm4gZC50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoJyAnLCAnLScpO1xufSJdfQ==
