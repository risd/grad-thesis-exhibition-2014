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
                .intro(d3.select('.intro-quote'))
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

    var url = window.location.origin +
              window.location.pathname;

    self.dispatch = d3.dispatch('data','endOfData');

    self.fetch_data = function () {
        console.log('fetching data');
        if (!available) {
            d3.json(url + 'data/metadata.json', process_metadata);
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

                self.dispatch
                    .activatorVisible((translate_y === 0) ?
                                       false : true);

                if (window.innerWidth >= 768) {
                    translate_sel
                        .style(
                            transform_attr,
                            'translate(0,' + translate_y + 'px)');
                }
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
var layout_image = require('./layout_image')();
var layout_fixed = require('./layout_fixed')();

module.exports = function work () {
    var self = {},
        container_sel,
        infinite_scroll_bool = false,
        data = [],
        work_container_sel,
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
            body_sel.classed('in-work', d);
        });

    self.container = function (_) {
        if (!arguments.length) return container_sel;
        container_sel = _;
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
        set_intro_height();

        if (!container_sel) throw "Work requires a container";
        container_sel.call(add_structure);
        layout_fixed.container(work_container_sel);
        layout_image.container(work_container_sel);

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
            .noTranslate(intro_sel)
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
            .append('p')
            .attr('class', 'lightbox-meta-info--personal-link')
            .append('a')
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlcyI6WyIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9ub2RlX21vZHVsZXMvYnJvd3NlcmlmeS9ub2RlX21vZHVsZXMvYnJvd3Nlci1wYWNrL19wcmVsdWRlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2RlcGFydG1lbnRzLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL2xvZ28vaW5kZXguanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvbG9nby9zY2FsZS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9sb2dvL3N2Zy5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy9vdmVybGF5L25hdi5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2JvdHRvbS5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2RhdGEuanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29yay9maXhlZC5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL2luZGV4LmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGF5b3V0X2ZpeGVkLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGF5b3V0X2ltYWdlLmpzIiwiL1VzZXJzL3J1YmVucm9kcmlndWV6L0RvY3VtZW50cy9jb21taXNpb25zL3Jpc2RfbWVkaWEvMjAxNF9ncmFkX3RoZXNpc19leGhpYml0aW9uL3JlcG8vc3JjL3dvcmsvbGlnaHRib3guanMiLCIvVXNlcnMvcnViZW5yb2RyaWd1ZXovRG9jdW1lbnRzL2NvbW1pc2lvbnMvcmlzZF9tZWRpYS8yMDE0X2dyYWRfdGhlc2lzX2V4aGliaXRpb24vcmVwby9zcmMvd29yay9zY3JvbGx0by5qcyIsIi9Vc2Vycy9ydWJlbnJvZHJpZ3Vlei9Eb2N1bWVudHMvY29tbWlzaW9ucy9yaXNkX21lZGlhLzIwMTRfZ3JhZF90aGVzaXNfZXhoaWJpdGlvbi9yZXBvL3NyYy93b3JrL3RyYW5zZm9ybS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFZQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNySEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29udGFpbmVyX3NlbCxcbiAgICAgICAgbW9iaWxlX2NvbnRhaW5lcl9zZWwsXG4gICAgICAgIGRlcHRhcnRtZW50X3NlbCxcbiAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsLFxuICAgICAgICBtb2JpbGVfYWN0aXZhdG9yX3NlbCxcbiAgICAgICAgbW9iaWxlX2JsYW5rZXRfc2VsLFxuICAgICAgICBtb2JpbGVfYWN0aXZlID0gZmFsc2UsXG4gICAgICAgIHNlbGVjdGVkID0gJ0FsbCcsXG4gICAgICAgIGNscyA9ICdkZXBhcnRtZW50JyxcbiAgICAgICAgYm9keV9zZWwgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIHNlbGYuZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaCgnY2xpY2snKTtcblxuICAgIHZhciBkZXBhcnRtZW50cyA9IFtcbiAgICAgICAgJ0FsbCcsXG4gICAgICAgICdBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnQ2VyYW1pY3MnLFxuICAgICAgICAnRGlnaXRhbCArIE1lZGlhJyxcbiAgICAgICAgJ0Z1cm5pdHVyZSBEZXNpZ24nLFxuICAgICAgICAnR2xhc3MnLFxuICAgICAgICAnR3JhcGhpYyBEZXNpZ24nLFxuICAgICAgICAnSW5kdXN0cmlhbCBEZXNpZ24nLFxuICAgICAgICAnSW50ZXJpb3IgQXJjaGl0ZWN0dXJlJyxcbiAgICAgICAgJ0pld2VscnkgKyBNZXRhbHNtaXRoaW5nJyxcbiAgICAgICAgJ0xhbmRzY2FwZSBBcmNoaXRlY3R1cmUnLFxuICAgICAgICAnUGFpbnRpbmcnLFxuICAgICAgICAnUGhvdG9ncmFwaHknLFxuICAgICAgICAnUHJpbnRtYWtpbmcnLFxuICAgICAgICAnU2N1bHB0dXJlJyxcbiAgICAgICAgJ1RleHRpbGVzJ1xuICAgIF07XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5tb2JpbGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBtb2JpbGVfY29udGFpbmVyX3NlbDtcbiAgICAgICAgbW9iaWxlX2NvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5hY3RpdmF0b3JWaXNpYmxlID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFtb2JpbGVfYWN0aXZhdG9yX3NlbCkgcmV0dXJuO1xuICAgICAgICBtb2JpbGVfYWN0aXZhdG9yX3NlbC5jbGFzc2VkKCd2aXNpYmxlJywgXyk7XG4gICAgfTtcblxuICAgIHNlbGYuc2VsZWN0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkZXB0YXJ0bWVudF9zZWw7XG4gICAgICAgIGRlcHRhcnRtZW50X3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmFzQXJyYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgdGhyb3cgXCJkZXBhcnRtZW50cyBpcyBhIGdldHRlclwiO1xuICAgICAgICByZXR1cm4gZGVwYXJ0bWVudHM7XG4gICAgfTtcblxuICAgIHNlbGYuaXNGaWx0ZXJhYmxlID0gZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgY2hlY2tfZmlsdGVyYWJsZShkYXRhKTtcbiAgICAgICAgdXBkYXRlX2RlcGFydG1lbnRfc2VsKCk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCFjb250YWluZXJfc2VsKSB0aHJvdyBcInJlcXVpcmVzIGEgd3JhcHBlclwiO1xuXG4gICAgICAgIHZhciBkYXRhID0gZGVwYXJ0bWVudHMubWFwKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICB2YXIgdiA9IHtcbiAgICAgICAgICAgICAgICBuYW1lOiBkLFxuICAgICAgICAgICAgICAgIGVzY2FwZWQ6IGVzY2FwZV9kZXBhcnRtZW50KGQpLFxuICAgICAgICAgICAgICAgIGZpbHRlcmFibGU6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHNlbGVjdGVkOiBmYWxzZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZCA9PT0gc2VsZWN0ZWQpIHtcbiAgICAgICAgICAgICAgICB2LnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2LmZpbHRlcmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gdjtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyBzZXR1cCBzdHJ1Y3R1cmVcbiAgICAgICAgbW9iaWxlX2FjdGl2YXRvcl9zZWwgPSBtb2JpbGVfY29udGFpbmVyX3NlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBjbHMgKyAnLWFjdGl2YXRvcicpXG4gICAgICAgICAgICAudGV4dChzZWxlY3RlZClcbiAgICAgICAgICAgIC5vbignY2xpY2submF2QWN0aXZhdG9yJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIG1vYmlsZV9hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9uYXYoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIG1vYmlsZV9ibGFua2V0X3NlbCA9IG1vYmlsZV9jb250YWluZXJfc2VsLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGNscyArICctYmxhbmtldCcpXG4gICAgICAgICAgICAub24oJ2NsaWNrLm5hdkJsYW5rZXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgbW9iaWxlX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9uYXYoKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIG1vYmlsZV9kZXBhcnRtZW50X3NlbCA9IG1vYmlsZV9jb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgY2xzICsgJy1lbGVtZW50cyBkZXBhcnRtZW50cycpXG4gICAgICAgICAgICAuYXBwZW5kKCd1bCcpXG4gICAgICAgICAgICAuc2VsZWN0QWxsKGNscylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgnbGknKVxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHZhciBrbHMgPSAnJztcbiAgICAgICAgICAgICAgICBpZiAoZC5maWx0ZXJhYmxlKSBrbHMgKz0gJyBmaWx0ZXJhYmxlJztcbiAgICAgICAgICAgICAgICBpZiAoZC5zZWxlY3RlZCkga2xzICs9ICcgc2VsZWN0ZWQnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC50ZXh0KGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubmFtZTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2NsaWNrLmRlcGFydG1lbnRzJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAvLyBvbmx5IHJlc3BvbmRzIHRvIGZpbHRlcmFibGUgaXRlbXNcbiAgICAgICAgICAgICAgICBpZiAoIWQuZmlsdGVyYWJsZSkgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgZGVwYXJ0bWVudF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGRkLCBkaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGQuc2VsZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBkLnNlbGVjdGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guY2xpY2soZC5lc2NhcGVkKTtcblxuICAgICAgICAgICAgICAgIHVwZGF0ZV9kZXBhcnRtZW50X3NlbCgpO1xuXG4gICAgICAgICAgICAgICAgbW9iaWxlX2FjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHNlbGVjdGVkID0gZC5uYW1lO1xuICAgICAgICAgICAgICAgIHVwZGF0ZV9uYXYoKTtcblxuICAgICAgICAgICAgICAgIGRlcGFydG1lbnRfc2VsLmRhdGEobW9iaWxlX2RlcGFydG1lbnRfc2VsLmRhdGEoKSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGUgYnVzaW5lc3NcblxuICAgICAgICBkZXBhcnRtZW50X3NlbCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoY2xzKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGtscyA9ICcnO1xuICAgICAgICAgICAgICAgIGlmIChkLmZpbHRlcmFibGUpIGtscyArPSAnIGZpbHRlcmFibGUnO1xuICAgICAgICAgICAgICAgIGlmIChkLnNlbGVjdGVkKSBrbHMgKz0gJyBzZWxlY3RlZCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5uYW1lO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignY2xpY2suZGVwYXJ0bWVudHMnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIC8vIG9ubHkgcmVzcG9uZHMgdG8gZmlsdGVyYWJsZSBpdGVtc1xuICAgICAgICAgICAgICAgIGlmICghZC5maWx0ZXJhYmxlKSByZXR1cm47XG5cbiAgICAgICAgICAgICAgICBkZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbiAoZGQsIGRpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZC5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIGQuc2VsZWN0ZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5jbGljayhkLmVzY2FwZWQpO1xuXG4gICAgICAgICAgICAgICAgdXBkYXRlX2RlcGFydG1lbnRfc2VsKCk7XG5cbiAgICAgICAgICAgICAgICBtb2JpbGVfYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgc2VsZWN0ZWQgPSBkLm5hbWU7XG4gICAgICAgICAgICAgICAgdXBkYXRlX25hdigpO1xuXG4gICAgICAgICAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsLmRhdGEoZGVwYXJ0bWVudF9zZWwuZGF0YSgpKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfbmF2ICgpIHtcbiAgICAgICAgbW9iaWxlX2NvbnRhaW5lcl9zZWwuY2xhc3NlZCgnYWN0aXZlJywgbW9iaWxlX2FjdGl2ZSk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoJ25vLXNjcm9sbCcsIG1vYmlsZV9hY3RpdmUpO1xuICAgICAgICBtb2JpbGVfYWN0aXZhdG9yX3NlbC50ZXh0KHNlbGVjdGVkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVfZGVwYXJ0bWVudF9zZWwgKCkge1xuICAgICAgICBkZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgLmNsYXNzZWQoJ2ZpbHRlcmFibGUnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLmZpbHRlcmFibGU7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNsYXNzZWQoJ3NlbGVjdGVkJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zZWxlY3RlZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICBtb2JpbGVfZGVwYXJ0bWVudF9zZWxcbiAgICAgICAgICAgIC5jbGFzc2VkKCdmaWx0ZXJhYmxlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5maWx0ZXJhYmxlO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jbGFzc2VkKCdzZWxlY3RlZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuc2VsZWN0ZWQ7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja19maWx0ZXJhYmxlIChkYXRhKSB7XG4gICAgICAgIC8vIGdpdmVuIHNvbWUgZGF0YSwgY2hlY2sgdG8gc2VlIGlmXG4gICAgICAgIC8vIGVhY2ggY2F0ZWdvcnkgaXMgZmlsdGVyYWJsZVxuICAgICAgICBcbiAgICAgICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkZXBhcnRtZW50X3NlbFxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChkZCwgZGkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQucmlzZF9wcm9ncmFtID09PSBkZC5uYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkZC5maWx0ZXJhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbW9iaWxlX2RlcGFydG1lbnRfc2VsXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24gKGRkLCBkaSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZC5yaXNkX3Byb2dyYW0gPT09IGRkLm5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRkLmZpbHRlcmFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVzY2FwZV9kZXBhcnRtZW50KGQpIHtcbiAgICAgICAgcmV0dXJuIGQudG9Mb3dlckNhc2UoKS5yZXBsYWNlKCcgJywgJy0nKTtcbiAgICB9XG5cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgTmF2ID0gcmVxdWlyZSgnLi9vdmVybGF5L25hdicpLFxuICAgIExvZ28gPSByZXF1aXJlKCcuL2xvZ28vaW5kZXgnKSxcbiAgICBXb3JrID0gcmVxdWlyZSgnLi93b3JrL2luZGV4Jyk7XG5cbnZhciB3b3JrX2FyZ3MgPSBwYXJzZV91cmxfZm9yX3dvcmsod2luZG93LmxvY2F0aW9uLmhhc2gpO1xuXG5zaXRlKClcbiAgICAuY29sb3JzKClcbiAgICAub3ZlcmxheSgpXG4gICAgLmxvZ28oKVxuICAgIC53b3JrKHdvcmtfYXJncyk7XG5cblxuZnVuY3Rpb24gcGFyc2VfdXJsX2Zvcl93b3JrIChwYXRoKSB7XG4gICAgY29uc29sZS5sb2cocGF0aCk7XG4gICAgdmFyIGlzX2l0X2xpdmUgPSBmYWxzZTtcbiAgICB2YXIgd2hpY2hfbGF5b3V0ID0gJ2ltYWdlJztcbiAgICBpZiAocGF0aC5pbmRleE9mKCd3b3JrJykgPiAtMSkge1xuICAgICAgICBpc19pdF9saXZlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKHBhdGguaW5kZXhPZignZml4ZWQnKSA+IC0xKSB7XG4gICAgICAgIHdoaWNoX2xheW91dCA9ICdmaXhlZCc7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGxpdmU6IGlzX2l0X2xpdmUsXG4gICAgICAgIGxheW91dDogd2hpY2hfbGF5b3V0XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc2l0ZSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgY29sb3JfdmFsdWVzID0ge1xuICAgICAgICAgICAgcHVycGxlOiAncmdiKDM4LCAzNCwgOTgpOycsXG4gICAgICAgICAgICBvcmFuZ2U6ICdyZ2IoMjU1LCA2MSwgNTYpOycsXG4gICAgICAgICAgICAnbHQtcHVycGxlJzogJ3JnYigxNDYsIDUzLCAxMjUpJyxcbiAgICAgICAgICAgIGJsdWU6ICdyZ2IoNDMsIDg5LCAxODQpJ1xuICAgICAgICB9LFxuICAgICAgICB1c2VfaW1hZ2VzX2FzX292ZXJsYXlfYmFja2dyb3VuZCA9IHRydWUsXG4gICAgICAgIGJhY2tncm91bmRfaW1hZ2Vfcm90YXRpb25fbWV0aG9kID0gJ2Jsb2NrJyxcbiAgICAgICAgYmFja2dyb3VuZF9pbWFnZV9yb3RhdGlvbl9tZXRob2RzID0gWydmYWRlJywgJ2Jsb2NrJ10sXG4gICAgICAgIGJvZHkgPSBkMy5zZWxlY3QoJ2JvZHknKTtcblxuICAgIHZhciBjb2xvcnMgPSBPYmplY3Qua2V5cyhjb2xvcl92YWx1ZXMpO1xuXG4gICAgdmFyIG5hdiA9IE5hdigpO1xuICAgIHZhciBsb2dvID0gTG9nbygpO1xuICAgIHZhciB3b3JrID0gV29yaygpO1xuXG4gICAgc2VsZi5jb2xvcnMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciByYW5kb21faW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBjb2xvcnMubGVuZ3RoKTtcblxuICAgICAgICB2YXIgY29sb3IgPSBjb2xvcnNbcmFuZG9tX2luZGV4XTtcbiAgICAgICAgdmFyIGFsdF9jb2xvcnMgPSBjb2xvcnMuc2xpY2UoMCxyYW5kb21faW5kZXgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmNvbmNhdChjb2xvcnMuc2xpY2UoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5kb21faW5kZXggKyAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3JzLmxlbmd0aCkpO1xuXG4gICAgICAgIHZhciBhbHRfY29sb3IgPSBhbHRfY29sb3JzW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1hdGgucmFuZG9tKCkgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbHRfY29sb3JzLmxlbmd0aCldO1xuXG4gICAgICAgIGJvZHkuY2xhc3NlZCgnYm9keS0nICsgY29sb3IsIHRydWUpO1xuICAgICAgICBib2R5LmNsYXNzZWQoJ2JvZHktYWx0LScgKyBhbHRfY29sb3IsIHRydWUpO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLm92ZXJsYXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYWlycyA9IGQzLnNlbGVjdEFsbCgnLm92ZXJsYXktbmF2LWl0ZW0nKVxuICAgICAgICAgICAgLmRhdHVtKGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXMuZGF0YXNldDsgfSk7XG5cbiAgICAgICAgbmF2LnNlbGVjdGlvbihwYWlycylcbiAgICAgICAgICAgIC5zZXR1cCgpXG4gICAgICAgICAgICAuYXR0YWNoUmVzaXplKCk7XG5cbiAgICAgICAgLy8gc2V0dXAgY2xpY2sgdHJhY2tpbmcgd2l0aCBnb29nbGUgYW5hbHl0aWNzXG4gICAgICAgIG5hdi5kaXNwYXRjaFxuICAgICAgICAgICAgLm9uKCdhc3Rlcmlza0NsaWNrJywgZnVuY3Rpb24gKG92ZXJsYWlkX2Jvb2xlYW4pIHtcbiAgICAgICAgICAgICAgICBpZiAoIV9nYXEpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpZiAob3ZlcmxhaWRfYm9vbGVhbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBvcGVuaW5nXG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR29CdXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBc3RlcmlzayBDbGljayAtIE9wZW4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdIb21lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAxLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRydWVdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjbG9zaW5nXG4gICAgICAgICAgICAgICAgICAgIF9nYXEucHVzaChbJ190cmFja0V2ZW50JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnR29CdXR0b24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdBc3RlcmlzayBDbGljayAtIENsb3NlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnQWJvdXQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmxvZ28gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxvZ28uY29udGFpbmVyKGQzLnNlbGVjdCgnLmxvZ28tbGluZScpKVxuICAgICAgICAgICAgLmF0dGFjaFJlc2l6ZSgpXG4gICAgICAgICAgICAucmVuZGVyKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYud29yayA9IGZ1bmN0aW9uIChhcmdzKSB7XG4gICAgICAgIGlmIChhcmdzLmxpdmUpIHtcbiAgICAgICAgICAgIC8vIHNldCB1cFxuICAgICAgICAgICAgd29yay5jb250YWluZXIoZDMuc2VsZWN0KCcud29yaycpKVxuICAgICAgICAgICAgICAgIC5pbmZpbml0ZVNjcm9sbCh0cnVlKVxuICAgICAgICAgICAgICAgIC5sYXlvdXQoYXJncy5sYXlvdXQpXG4gICAgICAgICAgICAgICAgLmxpZ2h0Ym94Q29udGFpbmVyKGQzLnNlbGVjdCgnLmxpZ2h0Ym94JykpXG4gICAgICAgICAgICAgICAgLmludHJvKGQzLnNlbGVjdCgnLmludHJvLXF1b3RlJykpXG4gICAgICAgICAgICAgICAgLmluaXRpYWxpemUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLndvcmsnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGQzLnNlbGVjdCgnLmxpZ2h0Ym94JykucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHJldHVybiBzZWxmO1xufSIsInZhciBjb25uZWN0TG9nb1NjYWxlID0gcmVxdWlyZSgnLi9zY2FsZScpO1xudmFyIFV0aWxpdHkgPSByZXF1aXJlKCcuL3N2ZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxvZ28gKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHdpbmRvd19zZWwgPSBkMy5zZWxlY3Qod2luZG93KSxcbiAgICAgICAgbG9nb19jb250YWluZXJfc2VsLFxuICAgICAgICBsb2dvX3N2ZyxcbiAgICAgICAgbG9nb190ZXh0X3NlbCxcbiAgICAgICAgbG9nb19saW5lX21lcmdlZF9zZWwsXG4gICAgICAgIHN0cmFpZ2h0X2xpbmUgPSBkMy5zdmcubGluZSgpLFxuICAgICAgICBjb25uZWN0X2xvZ29fc2NhbGUgPSBjb25uZWN0TG9nb1NjYWxlKCksXG4gICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbDtcblxuICAgIHZhciB1dGlsaXR5ID0gVXRpbGl0eSgpO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsb2dvX2NvbnRhaW5lcl9zZWw7XG4gICAgICAgIGxvZ29fY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmRlbGF5UGFzdFJldmVhbCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbDtcbiAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXR0YWNoUmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3dfc2VsXG4gICAgICAgICAgICAub24oJ3Jlc2l6ZS5sb2dvJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJlY2FsdWxhdGVfbG9nb19saW5lKCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdzY3JvbGwubG9nbycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZWNhbHVsYXRlX2xvZ29fbGluZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gc2V0IHVwIHN2Z1xuICAgICAgICB2YXIgd2luZG93X3dpZHRoID0gd2luZG93LmlubmVyV2lkdGgsXG4gICAgICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuXG4gICAgICAgIGxvZ29fc3ZnID0gbG9nb19jb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdzdmcnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLXN2ZycpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgd2luZG93LmlubmVyV2lkdGgpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2hlaWdodCcsIHdpbmRvdy5pbm5lckhlaWdodCk7XG5cbiAgICAgICAgLy8gc2VsZWN0aW9uIG9mIHRoZSB0ZXh0IHRoYXQgd2lsbCBkZWZpbmUgdGhlIGxpbmVcbiAgICAgICAgbG9nb190ZXh0X3NlbCA9IGQzLnNlbGVjdCgnaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLmxvZ28tdGV4dC1jb21wb25lbnQnKTtcblxuICAgICAgICBzZXR1cF9yZXZlYWwoKTtcblxuICAgICAgICAvLyB2ZXJ0aWNpZXMgZm9yIFxuICAgICAgICB2YXIgdGV4dF92ZXJ0aWNpZXMgPSBsb2dvX2xpbmVfdGV4dF92ZXJ0aWNpZXMobG9nb190ZXh0X3NlbCk7XG4gICAgICAgIHZhciBjb25uZWN0aW5nX3NlZ21lbnRzID1cbiAgICAgICAgICAgICAgICBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWdtZW50cyh0ZXh0X3ZlcnRpY2llcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3dfd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93X2hlaWdodCk7XG5cbiAgICAgICAgdmFyIG1lcmdlZF9kID0gbWVyZ2VfbGluZXModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpbmdfc2VnbWVudHMpO1xuXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsID0gbG9nb19zdmcuc2VsZWN0QWxsKCcubG9nby1saW5lLW1lcmdlZCcpXG4gICAgICAgICAgICAuZGF0YShbbWVyZ2VkX2RdKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsb2dvLWxpbmUtbWVyZ2VkJylcbiAgICAgICAgICAgICAgICAuYXR0cignZCcsIGZ1bmN0aW9uIChkKSB7IHJldHVybiBkOyB9KTtcblxuICAgICAgICBsb2dvX2xpbmVfbWVyZ2VkX3NlbC5jYWxsKHR3ZWVuX2luKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc2V0dXBfcmV2ZWFsICgpIHtcbiAgICAgICAgZDMuc2VsZWN0KCdib2R5JykuY2xhc3NlZCgndG8tcmV2ZWFsJywgZmFsc2UpO1xuXG4gICAgICAgIGlmIChkZWxheV9wYXN0X3JldmVhbF9zZWwpIHtcbiAgICAgICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbFxuICAgICAgICAgICAgICAgIC5kYXR1bShmdW5jdGlvbiAoKSB7IHJldHVybiB0aGlzLmRhdGFzZXQ7IH0pO1xuXG4gICAgICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWxcbiAgICAgICAgICAgICAgICAub24oJ3RyYW5zaXRpb25lbmQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChkLmRlbGF5ZWRjbGFzcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCd0cmFuc2l0aW9uZW5kJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ3dlYmtpdFRyYW5zaXRpb25FbmQnLCBmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnd2Via2l0VHJhbnNpdGlvbkVuZCcpO1xuICAgICAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChkLmRlbGF5ZWRjbGFzcywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGRlbGF5X3Bhc3RfcmV2ZWFsX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLm9uKCd3ZWJraXRUcmFuc2l0aW9uRW5kJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ29UcmFuc2l0aW9uRW5kJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ29UcmFuc2l0aW9uRW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKGQuZGVsYXllZGNsYXNzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ29UcmFuc2l0aW9uRW5kJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ290cmFuc2l0aW9uZW5kJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ290cmFuc2l0aW9uZW5kJyk7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKGQuZGVsYXllZGNsYXNzLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgZGVsYXlfcGFzdF9yZXZlYWxfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAub24oJ290cmFuc2l0aW9uZW5kJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ01TVHJhbnNpdGlvbkVuZCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdNU1RyYW5zaXRpb25FbmQnKTtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoZC5kZWxheWVkY2xhc3MsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBkZWxheV9wYXN0X3JldmVhbF9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vbignTVNUcmFuc2l0aW9uRW5kJywgbnVsbCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWNhbHVsYXRlX2xvZ29fbGluZSAoKSB7XG4gICAgICAgIHZhciB3aW5kb3dfd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aCxcbiAgICAgICAgICAgIHdpbmRvd19oZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgbG9nb19zdmdcbiAgICAgICAgICAgIC5hdHRyKCd3aWR0aCcsIHdpbmRvd193aWR0aClcbiAgICAgICAgICAgIC5hdHRyKCdoZWlnaHQnLCB3aW5kb3dfaGVpZ2h0KTtcblxuICAgICAgICBpZiAobG9nb19saW5lX21lcmdlZF9zZWwpIHtcbiAgICAgICAgICAgIHVwZGF0ZV9sb2dvX2xpbmUod2luZG93X3dpZHRoLCB3aW5kb3dfaGVpZ2h0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZV9sb2dvX2xpbmUgKHd3aWR0aCwgd2hlaWdodCkge1xuICAgICAgICB2YXIgdGV4dF92ZXJ0aWNpZXMgPSBsb2dvX2xpbmVfdGV4dF92ZXJ0aWNpZXMobG9nb190ZXh0X3NlbCk7XG4gICAgICAgIHZhciBjb25uZWN0aW5nX3NlZ21lbnRzID1cbiAgICAgICAgICAgICAgICBsb2dvX2xpbmVfY29ubmVjdGluZ19zZWdtZW50cyh0ZXh0X3ZlcnRpY2llcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3d2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2hlaWdodCk7XG5cbiAgICAgICAgdmFyIG1lcmdlZF9kID0gbWVyZ2VfbGluZXModGV4dF92ZXJ0aWNpZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpbmdfc2VnbWVudHMpO1xuXG4gICAgICAgIGxvZ29fbGluZV9tZXJnZWRfc2VsXG4gICAgICAgICAgICAuZGF0YShbbWVyZ2VkX2RdKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBmdW5jdGlvbiAoZCkgeyByZXR1cm4gZDsgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbG9nb19saW5lX3RleHRfdmVydGljaWVzIChzZWwpIHtcbiAgICAgICAgdmFyIHRleHRfdmVydGljaWVzID0gW107XG5cbiAgICAgICAgc2VsLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBib3VuZHMgPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdmFyIGZpcnN0LCBzZWNvbmQ7XG4gICAgICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gW2JvdW5kcy5sZWZ0ICsgMyxcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNDUpKSldO1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IFtib3VuZHMucmlnaHQgKyA2LFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC40NSkpKV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKChpID09PSAxKSB8IChpID09PSAyKSkge1xuICAgICAgICAgICAgICAgIGZpcnN0ID0gW2JvdW5kcy5sZWZ0IC0gNixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNDUpKSldO1xuICAgICAgICAgICAgICAgIHNlY29uZCA9IFtib3VuZHMucmlnaHQgKyA2LFxuICAgICAgICAgICAgICAgICAgICAgKGJvdW5kcy50b3AgKyAoYm91bmRzLmhlaWdodCooMC40NSkpKV07XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGkgPT09IDMpIHtcbiAgICAgICAgICAgICAgICBmaXJzdCA9IFtib3VuZHMubGVmdCAtIDYsXG4gICAgICAgICAgICAgICAgICAgICAoYm91bmRzLnRvcCArIChib3VuZHMuaGVpZ2h0KigwLjU1KSkpXTtcbiAgICAgICAgICAgICAgICBzZWNvbmQgPSBbYm91bmRzLnJpZ2h0ICsgNixcbiAgICAgICAgICAgICAgICAgICAgIChib3VuZHMudG9wICsgKGJvdW5kcy5oZWlnaHQqKDAuNTUpKSldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZXh0X3ZlcnRpY2llcy5wdXNoKFtmaXJzdCwgc2Vjb25kXSk7XG5cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRleHRfdmVydGljaWVzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGxvZ29fbGluZV9jb25uZWN0aW5nX3NlZ21lbnRzKHN0YXJ0X2VuZF9wb2ludHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd3dpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdoZWlnaHQpIHtcbiAgICAgICAgdmFyIGxpbmVfc2l6ZV90b19kcmF3ID1cbiAgICAgICAgICAgICAgICBjb25uZWN0X2xvZ29fc2NhbGUuY2hvb3NlX3NpemUod3dpZHRoLCB3aGVpZ2h0KTtcblxuICAgICAgICB2YXIgY29ubmVjdGluZ19zZWdtZW50cyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXJ0X2VuZF9wb2ludHMubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgaWYgKChpKzEpIDwgc3RhcnRfZW5kX3BvaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgc3RhcnQgPSBzdGFydF9lbmRfcG9pbnRzW2ldWzFdLFxuICAgICAgICAgICAgICAgICAgICBlbmQgPSBzdGFydF9lbmRfcG9pbnRzW2krMV1bMF07XG5cbiAgICAgICAgICAgICAgICBjb25uZWN0aW5nX3NlZ21lbnRzXG4gICAgICAgICAgICAgICAgICAgIC5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgY29ubmVjdF9sb2dvX3NjYWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNjYWxlW2xpbmVfc2l6ZV90b19kcmF3XShzdGFydCwgZW5kKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpbmdfc2VnbWVudHM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWVyZ2VfbGluZXModGV4dF92ZXJ0aWNpZXMsIGNvbm5lY3Rpbmdfc2VnbWVudHMpIHtcbiAgICAgICAgLy8gdGFrZXMgYXJyYXkgb2YgdmVydGV4IHBhaXJzLCBhbmQgcGF0aFxuICAgICAgICAvLyBlbGVtZW50cyBvZiBjb25uZWN0aW5nIHNlZ21lbnRzLlxuICAgICAgICAvLyByZXR1cm5zIG9uIHBhdGggZCBhdHRyaWJ1dGVcbiAgICAgICAgdmFyIGQgPSAnJztcblxuICAgICAgICB2YXIgdGVtcF9zdmcgPSBkMy5zZWxlY3QoJ2JvZHknKVxuICAgICAgICAgICAgLmFwcGVuZCgnc3ZnJyk7XG4gICAgICAgIHZhciB0ZW1wX3BhdGggPSB0ZW1wX3N2Z1xuICAgICAgICAgICAgLnNlbGVjdEFsbCgndGVtcC1wYXRoJylcbiAgICAgICAgICAgIC5kYXRhKHRleHRfdmVydGljaWVzKVxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBzdHJhaWdodF9saW5lKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RlbXAtcGF0aCcpXG4gICAgICAgICAgICAuc3R5bGUoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXG4gICAgICAgIHRlbXBfcGF0aC5lYWNoKGZ1bmN0aW9uICh0ZCwgdGkpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHRkKTtcbiAgICAgICAgICAgIHZhciB0ZXh0X2QgPSBkMy5zZWxlY3QodGhpcykuYXR0cignZCcpO1xuICAgICAgICAgICAgZCArPSB0ZXh0X2Q7XG4gICAgICAgICAgICBpZiAoY29ubmVjdGluZ19zZWdtZW50c1t0aV0pIHtcbiAgICAgICAgICAgICAgICB2YXIgY29ubmVjdGluZ19kID0gY29ubmVjdGluZ19zZWdtZW50c1t0aV07XG4gICAgICAgICAgICAgICAgZCArPSBjb25uZWN0aW5nX2Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHV0aWxpdHkuY29udmVydFRvUmVsYXRpdmUodGVtcF9wYXRoLmF0dHIoJ2QnLCBkKS5ub2RlKCkpO1xuICAgICAgICAvLyByZXBsYWNlIGFsbCBgbWAgaW5zdHJ1Y3Rpb25zIHdpdGggYGxgLCBleGNlcHRcbiAgICAgICAgLy8gZm9yIHRoZSBmaXJzdCBvbmUuIHRoaXMgaXMgYSByZXZlcnNlIHJlZ2V4XG4gICAgICAgIGQgPSB0ZW1wX3BhdGguYXR0cignZCcpLnJlcGxhY2UoLyg/IV4pbS9nLCAnbCcpO1xuXG4gICAgICAgIHRlbXBfc3ZnLnJlbW92ZSgpO1xuICAgICAgICB0ZW1wX3BhdGgucmVtb3ZlKCk7XG5cbiAgICAgICAgcmV0dXJuIGQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHdlZW5faW4ocGF0aCkge1xuICAgICAgICBwYXRoLnRyYW5zaXRpb24oKVxuICAgICAgICAgICAgLmR1cmF0aW9uKDgwMDApXG4gICAgICAgICAgICAuYXR0clR3ZWVuKCdzdHJva2UtZGFzaGFycmF5JywgdHdlZW5EYXNoKVxuICAgICAgICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyByZW1vdmUgZGFzaCBhcnJheSwgYXMgcmVzaXppbmdcbiAgICAgICAgICAgICAgICAvLyB0aGUgYnJvd3NlciB3aWxsIGNoYW5nZSB0aGUgbGVuZ3RoXG4gICAgICAgICAgICAgICAgLy8gYW5kIHRoZXJlIGlzIG5vIG5lZWQgdG8gcmUtY29tcHV0ZVxuICAgICAgICAgICAgICAgIC8vIHRoZSBkYXNoIGFycmF5IHRvIGZpdCBpdC5cbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignc3Ryb2tlLWRhc2hhcnJheScsICdub25lJyk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0d2VlbkRhc2goKSB7XG4gICAgICAgIHZhciBsID0gdGhpcy5nZXRUb3RhbExlbmd0aCgpLFxuICAgICAgICAgICAgaSA9IGQzLmludGVycG9sYXRlU3RyaW5nKCcwLCcgKyBsLCBsICsgXCIsXCIgKyBsKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICh0KSB7IHJldHVybiBpKHQpOyB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9jb2xvcl9zdG9wcyAoc2VsKXtcbiAgICAgICAgc2VsLmFwcGVuZCgnc3RvcCcpXG4gICAgICAgICAgICAuYXR0cignb2Zmc2V0JywgJzAlJylcbiAgICAgICAgICAgIC5hdHRyKCdzdG9wLWNvbG9yJywgJ3doaXRlJylcbiAgICAgICAgICAgIC5hdHRyKCdzdG9wLW9wYWNpdHknLCAwKTtcbiAgICAgICAgc2VsLmFwcGVuZCgnc3RvcCcpXG4gICAgICAgICAgICAuYXR0cignb2Zmc2V0JywgJzEwMCUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0b3AtY29sb3InLCAnd2hpdGUnKVxuICAgICAgICAgICAgLmF0dHIoJ3N0b3Atb3BhY2l0eScsIDEpO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgVXRpbGl0eSA9IHJlcXVpcmUoJy4vc3ZnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9nb19zY2FsZSAoKSB7XG4gICAgdmFyIHV0aWxpdHkgPSBVdGlsaXR5KCk7XG5cbiAgICB2YXIgc2VnbWVudHMgPSBbe1xuICAgICAgICAgICAgZnJvbTogJ1JJU0QnLFxuICAgICAgICAgICAgdG86ICdHcmFkJyxcbiAgICAgICAgICAgIHNjYWxlVXNpbmc6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFksXG4gICAgICAgICAgICAgICAgJzc2OCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZLFxuICAgICAgICAgICAgICAgIC8vICc3NjgnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsLFxuICAgICAgICAgICAgICAgICcxMDI0JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXduX2RlbHRhOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTU1Ljc5Mzk4ODg4MzQ5NTMzLFxuICAgICAgICAgICAgICAgICAgICB5OiAxMDMzLjA3OTk1NjA1NDY4NzVcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICc3NjgnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0xMTAuMDQwMDA4NTQ0OTIxODgsXG4gICAgICAgICAgICAgICAgICAgIHk6IDM4OS4xODQ5OTc1NTg1OTM3NVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0xMTcuMzI5OTYzNTA1MjY4MSxcbiAgICAgICAgICAgICAgICAgICAgeTogMzg5LjE4NTk3NDEyMTA5Mzc1XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBhdGhzOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6ICdNMC44NzEsMCcrXG4gICAgICAgICAgICAgICAgICAndjE2LjgxJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDAsNzMuMTU1LDAsMTMxLjkxNicrXG4gICAgICAgICAgICAgICAgICAnYzAsMTE3LjQyOCw1OS4yNzMsMjA0LjQ5MiwyNjQuNzYzLDIwNC40OTInK1xuICAgICAgICAgICAgICAgICAgJ2MyMDguNDksMCwyMTEuMzE1LTI0MC45ODcsMC0yNDAuOTg3JytcbiAgICAgICAgICAgICAgICAgICdjLTQ4Ljc3NCwwLTk5Ljc3MSwwLTk5Ljc3MSwwJytcbiAgICAgICAgICAgICAgICAgICd2Mzg5LjkxJytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDYxLjk2NS0xLjAzOSwxMTkuOTk0LDM2LjY3OScrXG4gICAgICAgICAgICAgICAgICAnYzU5Ljk5NywzOC45OTgsNzYuNDk2LDEzNC4zODIsMTYwLjQ5MiwxMzQuMzgyJytcbiAgICAgICAgICAgICAgICAgICdjOTUuOTk1LDAsOTMuNzU1LTk1LjczNCwxLjYzNS0xMDcuNDM5JytcbiAgICAgICAgICAgICAgICAgICdjLTY0LjYzMi04LjIxMy0xMjYuNDQ4LDk2LjI3LTE2Mi43NDksMTM0LjA1NycrXG4gICAgICAgICAgICAgICAgICAnYy00MS43NCw0My40NDctMTU1LjM3LDEwMy44NzYtMjI4LjcyNSw2NC44NzgnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTEyLjYzMi01OS44NzksMi44OTItMjEwLjQ5NCwxMDAuMzUzLTk3LjQ5NScrXG4gICAgICAgICAgICAgICAgICAnQzM2My44NTMsOTA3LjE5Mi01NC45MjMsOTE1Ljc4OC01NC45MjMsOTIxLjQzJytcbiAgICAgICAgICAgICAgICAgICdjMCwxOC4wMTMsMCwxMTEuNjUsMCwxMTEuNjUnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTAsMCcrXG4gICAgICAgICAgICAgICAgICAnaDE3LjQ4MicrXG4gICAgICAgICAgICAgICAgICAnYzAsMCwwLDAsMCwzNi44MScrXG4gICAgICAgICAgICAgICAgICAvLyAnYzAsMCwwLDI4Ljg1MSwwLDM2LjgxJytcbiAgICAgICAgICAgICAgICAgICdjMCwyOC4wNDItMTUuOTAxLDg3LjM3LTYxLjE4NSw4Ny4zNycrXG4gICAgICAgICAgICAgICAgICAnYy01My4yOTgsMC03OS44MDgsMC4wMDUtNzkuODA4LDAuMDA1bDAtNTInK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsMzUuOTIxLTQuMzkzLDQ4LjY0OSwzLjc1OCcrXG4gICAgICAgICAgICAgICAgICAnYzM3Ljg2MSwyNC4yNDIsMjQuMTk1LDg0LjkwOS0yOC4xMzksMTUyLjI0MicrXG4gICAgICAgICAgICAgICAgICAnYy0yNi4zNjgsMzMuOTI1LTMyLjczNCw3NS4xNjctMzEuMjksMTA2LjY1MycrXG4gICAgICAgICAgICAgICAgICAnYzEuNDQ3LDMxLjU1LDEyLjEzNiw1NC4zNDcsMjQuMDA2LDU0LjM0NycsXG4gICAgICAgICAgICAgICAgLy8gJzc2OCc6ICdNOTQuMjYtMTUnK1xuICAgICAgICAgICAgICAgIC8vICAgJ2gyOS43OTYnK1xuICAgICAgICAgICAgICAgIC8vICAgJ2MwLDAsMC45MzYsOC44NTEsMC45MzYsMTYuODEnK1xuICAgICAgICAgICAgICAgIC8vICAgJ2MwLDI4LjA0Mi0xNS45MDEsNjcuMzctNjEuMTg1LDY3LjM3JytcbiAgICAgICAgICAgICAgICAvLyAgICdDMTAuNTEsNjkuMTgtMTYsNjkuMTg1LTE2LDY5LjE4NScrXG4gICAgICAgICAgICAgICAgLy8gICAndi01MicrXG4gICAgICAgICAgICAgICAgLy8gICAnYzAsMCwzNS45MjEtNC4zOTMsNDguNjQ5LDMuNzU4JytcbiAgICAgICAgICAgICAgICAvLyAgICdjMzcuODYxLDI0LjI0MiwyOS42NDUsNDYuNzc3LTMuOCw4MC4yNDInK1xuICAgICAgICAgICAgICAgIC8vICAgJ2MtMTcuMDI3LDE3LjAzOC00NC42MjksMTctNDQuNjI5LDQ4LjY1MycrXG4gICAgICAgICAgICAgICAgLy8gICAnYzAsMTguMDEzLDAsMjQuMzQ3LDAsMjQuMzQ3JyxcbiAgICAgICAgICAgICAgICAnMTAyNCc6ICdNMC4zMzMsMEgxNDA4JyArXG4gICAgICAgICAgICAgICAgICAnYzAsMCw3LjM3LDU0LjUzNi01Ni4zODEsNzUuNjI5JyArXG4gICAgICAgICAgICAgICAgICAnYy00OS43MTgsMTYuNDUtMTgxLjEyOC0xNi4yNjItMjMxLjk4OSwyNi45OTknICtcbiAgICAgICAgICAgICAgICAgICdDOTg5LjEzNiwyMTMuNjIyLDExNDkuNjI4LDM0NC4xOCw5MjAuMTUzLDM0NC4xOCcgK1xuICAgICAgICAgICAgICAgICAgJ2MtNTMuMjk4LDAtMjEwLjY0MSwwLjAwNS0yMTAuNjQxLDAuMDA1bDAtMjcyJyArXG4gICAgICAgICAgICAgICAgICAnYzAsMCwxOTcuMTI4LTE2LjA1NSwxODIuMTI5LDg4Ljk0JyArXG4gICAgICAgICAgICAgICAgICAnYy0yNC43NjgsMTczLjM3OC00NTIuODIxLTgxLjUxMy03NDUuNDYzLTcxLjk5NicgK1xuICAgICAgICAgICAgICAgICAgJ2MtMTg0LjQ5MSw2LTIzNC4xNzgsNjUuODktMjcxLjg0OCwxMzkuNDkzJyArXG4gICAgICAgICAgICAgICAgICAnYy0zNi4xMDQsNzAuNTQ0LTEwLjQ4NCwxNjAuNTY0LDEuMzg2LDE2MC41NjQnICtcbiAgICAgICAgICAgICAgICAgICdjMi4yNDEsMCw3LjI4NCwwLDcuMjg0LDAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIHtcbiAgICAgICAgICAgIGZyb206ICdHcmFkJyxcbiAgICAgICAgICAgIHRvOiAnU2hvdycsXG4gICAgICAgICAgICBzY2FsZVVzaW5nOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxYLFxuICAgICAgICAgICAgICAgICc3NjgnOiB1dGlsaXR5LnNjYWxlUHJvcG9ydGlvbmFsWCxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxYXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZHJhd25fZGVsdGE6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzoge1xuICAgICAgICAgICAgICAgICAgICB4OiAzNDQuMTQwMDE0NjQ4NDM3NSxcbiAgICAgICAgICAgICAgICAgICAgeTogMFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzc2OCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMTI2MC45NTgwMDc4MTI1LFxuICAgICAgICAgICAgICAgICAgICB5OiAwLjIyNjk4NTk2MTE5ODgwNjc2XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnMTAyNCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogMTI2MC40OTk5Mjc3NTkxNzA1LFxuICAgICAgICAgICAgICAgICAgICB5OiAwLjAwMDAwMjM4NDE4NTc5MTAxNTYyNVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAgICczMDAnOiAnTTAtMC4xMzgnICtcbiAgICAgICAgICAgICAgICAgICAgICAgJ2M4My42MjcsMC42MiwyMzguNzU1LDAsMzQ0LjE0LDAnLFxuICAgICAgICAgICAgICAgICc3NjgnOiAnTTAsMCAnICtcbiAgICAgICAgICAgICAgICAgICAnYzAsMCAxOC44NjEsMC4wNDQgMjUuODE4LDAuMDk1ICcgK1xuICAgICAgICAgICAgICAgICAgICdjNTkuODk2LDAuNDQ0IDQ1MC4wMDYsMCA0NTAuMDA2LDAgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLDAgMCwwIDAsMjQ4LjUgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MwLDAgLTYuNzk5LDAgLTY4LDAgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MtMTQ4LjI2NiwwIC0xMzgsLTE1Ny41IDAsLTE1Ny41ICcgK1xuICAgICAgICAgICAgICAgICAgICdjMTEwLDAgMTg5LjYyOCwxMTcuNjUgMzAyLDExNiAnICtcbiAgICAgICAgICAgICAgICAgICAnYzE0Ny42MjEsLTIuMTY3IDE5My43ODgsLTIxOC43MDUgMTkzLjc4OCwtMjg1LjY1NyAnICtcbiAgICAgICAgICAgICAgICAgICAnYzAsLTE5MC4zNDMgLTE2MS43ODgsLTEyOC4zNDMgLTE2MS43ODgsLTQ0LjM0MyAnICtcbiAgICAgICAgICAgICAgICAgICAnYzAsNTIuNDAxIDQ4Ljc3Nyw5NC42MzggMTIzLjQyNCwxMDYgJyArXG4gICAgICAgICAgICAgICAgICAgJ2MxMzIuODk0LDIwLjIyOCAyODUuMTA1LDE2LjkzNiAzMDEuNTYzLDE3ICcgK1xuICAgICAgICAgICAgICAgICAgICdjMTQuNzQ0LDAuMDU4IDk0LjE0NywwLjEzMiA5NC4xNDcsMC4xMzInLFxuICAgICAgICAgICAgICAgICcxMDI0JzogJ00wLjcwMSwzLjgxNScgK1xuICAgICAgICAgICAgICAgICAgJ2gxMS43NDQnK1xuICAgICAgICAgICAgICAgICAgJ3YyNzEuMTdoLTE1NC41MDInK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAsNy40NjQtODIuMDUxLDQ2LjE5OC0xMjEuOTk1JytcbiAgICAgICAgICAgICAgICAgICdjNDcuOTk4LTQ5LjQ5OCwxNDYuODUzLTY3LjI0OSwxOTQuOTktMzguOTk4JytcbiAgICAgICAgICAgICAgICAgICdjMTIxLjQ5NCw3MS4zMDQsODAuOTk2LDIzMi40OTEsMjMxLjAxNiwyMjUuMTY2JytcbiAgICAgICAgICAgICAgICAgICdjMTk3LjA2Ny05LjYyMiwxNTIuOTY1LTM5Ny42NTUsMjkuOTcxLTQzNi42NTMnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTcwLjE2Ny01My45NTUtMTc5Ljk5MSwyMDYuMDY3LDEyNS4zMzMsMjA2LjA2NycrXG4gICAgICAgICAgICAgICAgICAnYzIwMC40ODksMCwzMTQuMTQ1LTEwNC43NTcsNjY3Ljk4Ny0xMDQuNzU3JytcbiAgICAgICAgICAgICAgICAgICdjMzYuNzUzLDAsMTA3Ljc2MywwLDEwNy43NjMsMCdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwge1xuICAgICAgICAgICAgZnJvbTogJ1Nob3cnLFxuICAgICAgICAgICAgdG86ICcyMDE0JyxcbiAgICAgICAgICAgIHNjYWxlVXNpbmc6IHtcbiAgICAgICAgICAgICAgICAnMzAwJzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFksXG4gICAgICAgICAgICAgICAgJzc2OCc6IHV0aWxpdHkuc2NhbGVQcm9wb3J0aW9uYWxZLFxuICAgICAgICAgICAgICAgICcxMDI0JzogdXRpbGl0eS5zY2FsZVByb3BvcnRpb25hbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRyYXduX2RlbHRhOiB7XG4gICAgICAgICAgICAgICAgJzMwMCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTc1LjU1NjAwNTQ3NzkwNTI3LFxuICAgICAgICAgICAgICAgICAgICB5OiA0OC42ODkwMDY4MDU0MTk5MlxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzc2OCc6IHtcbiAgICAgICAgICAgICAgICAgICAgeDogLTEzMC43NDQ5OTUxMTcxODc1LFxuICAgICAgICAgICAgICAgICAgICB5OiA0MjYuNzIzOTk5MDIzNDM3NVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJzEwMjQnOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IC0xMDIuMjQ5OTk2NDYwOTc0MjIsXG4gICAgICAgICAgICAgICAgICAgIHk6IDQxMC41MjkwMTkwNDI4NDk1NFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwYXRoczoge1xuICAgICAgICAgICAgICAgICczMDAnOiAnTTczLjYwNi00OC42ODkgJyArXG4gICAgICAgICAgICAgICAgICAgICdjMy4wMzctMC4wMzIsNS43NC0wLjA1Miw4LjA4OS0wLjA1MiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2MxNS4zMywwLDYuNzgzLTQ5LjYyNi0zNS4zMzctNTEuMjU4ICcgK1xuICAgICAgICAgICAgICAgICAgICAnYy00My0xLjY2Ny03MC43NSwyNC03Ny4zMzMsNTYgJyArXG4gICAgICAgICAgICAgICAgICAgICdDLTM2LjUyNi0xNy4wMTUtMTQuNjQxLDAtMS45NSwwJyxcbiAgICAgICAgICAgICAgICAnNzY4JzogJ00wLDAnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAtOC4yMDEsMzkuMDk4LTQ0Ljc0NSw1MycrXG4gICAgICAgICAgICAgICAgICAnYy0yNy41MTQsMTAuNDY3LTQwLjk1NiwyMS4wODctNTMsNDcnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTYuNSwzNS41LTYuMTA3LDk1LjkzMyw0My43NzgsOTYuMzI4JytcbiAgICAgICAgICAgICAgICAgICdDLTE0LjA4LDE5Ni42NDMtMTIuNzQ1LDE0OS0xMi43NDUsMTQ5JytcbiAgICAgICAgICAgICAgICAgICdoLTEyMCcrXG4gICAgICAgICAgICAgICAgICAndjg2JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDU5LjEyMSw4LjY2Nyw1OS4xMjEsNDkuNScrXG4gICAgICAgICAgICAgICAgICAnYzAsNDkuOTExLTMwLjEyMSw0NS44MzMtNTEuMDI4LDc1LjQ3OScrXG4gICAgICAgICAgICAgICAgICAnYy0xOC4yNDcsMjUuODczLTE2LjY5OSw2Ni43NDUtMTYuNjk5LDY2Ljc0NScrXG4gICAgICAgICAgICAgICAgICAnaDEwLjYwNicsXG4gICAgICAgICAgICAgICAgJzEwMjQnOiAnTTAuMDYzLTAuMTQ3JytcbiAgICAgICAgICAgICAgICAgICdjMCwwLDcuNTg4LDAsOS40OTQsMCcgK1xuICAgICAgICAgICAgICAgICAgJ2MwLDAtMTMuNzAxLTczLjIyNi05OC4xMjUtNjIuMzEyJytcbiAgICAgICAgICAgICAgICAgICdjLTg1LjYyLDExLjA2OS0xMzcuNjIsMTMzLjA2OS0yMjcuNTQxLDIxMi42MTEnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTI3LjE1OCwxMTIuNDgxLTMwNy44OTgsMjAxLjIzNi00MTUuNTY3LDIwMS4yMzYnK1xuICAgICAgICAgICAgICAgICAgJ2MtMTI3LjUwMiwwLTE2My41MTItMTA3Ljk2NC04My4wNTgtMTUzLjM3MScrXG4gICAgICAgICAgICAgICAgICAnYzk2LjcwOS01NC41ODEsMjg3LjEyNSwxNTMuNDkxLDQzMS4xMTgsMTUzLjQ5MScrXG4gICAgICAgICAgICAgICAgICAnYzU0LjE1LDAsMTM5LjQyOC0xOC4wODQsMTUyLjM5NS0xMDAuNDg2JytcbiAgICAgICAgICAgICAgICAgICdjMTUuMjUxLTk2LjkyLDgxLjAzMy0xMzMuNTk4LDEzOC41OS05Ny41OTgnK1xuICAgICAgICAgICAgICAgICAgJ2MyNS4xMjIsMTUuNzEzLDQ5LjQ0Myw3Mi0xMC41NTcsMTE3JytcbiAgICAgICAgICAgICAgICAgICdjLTQzLjk1MywzMi45NjUtNjMuOTM3LDUzLTYzLjkzNyw5Ny41ODMnK1xuICAgICAgICAgICAgICAgICAgJ2MwLDQyLjQ2OSwzOS4xOTgsNDIuMzc1LDQ4LjQ5Nyw0Mi4zNzUnK1xuICAgICAgICAgICAgICAgICAgJ2M1LjEzMywwLDE2LjQ0MSwwLDE2LjQ0MSwwJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XTtcblxuICAgIHZhciB0ZW1wX3N2ZyA9IGQzLnNlbGVjdCgnYm9keScpXG4gICAgICAgIC5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5zdHlsZSgnZGlzcGxheScsICdub25lJyk7XG4gICAgdmFyIHRlbXBfcGF0aCA9IHRlbXBfc3ZnXG4gICAgICAgIC5hcHBlbmQoJ3BhdGgnKTtcblxuICAgIHZhciBtZWFzdXJlX2Zvcl9mZiA9IGZhbHNlO1xuXG4gICAgc2VnbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICBkLnJlbGF0aXZlX3BhdGhzX2QgPSB7fTtcbiAgICAgICAgZC5yZWxhdGl2ZV9wYXRocyA9IHt9O1xuICAgICAgICBkLnNjYWxlID0ge307XG5cbiAgICAgICAgaWYgKG1lYXN1cmVfZm9yX2ZmKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhzZWdtZW50c1tpXS5mcm9tICsgJyAnICsgc2VnbWVudHNbaV0udG8pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yICh2YXIgcGF0aF9zaXplIGluIGQucGF0aHMpIHtcbiAgICAgICAgICAgIHRlbXBfcGF0aC5hdHRyKCdkJywgZC5wYXRoc1twYXRoX3NpemVdKTtcbiAgICAgICAgICAgIHV0aWxpdHkuY29udmVydFRvUmVsYXRpdmUodGVtcF9wYXRoLm5vZGUoKSk7XG4gICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzX2RbcGF0aF9zaXplXSA9IHRlbXBfcGF0aC5hdHRyKCdkJyk7XG4gICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0gPSB0ZW1wX3BhdGgubm9kZSgpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAobWVhc3VyZV9mb3JfZmYpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2l6ZTogJywgcGF0aF9zaXplKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZGVsdGE6ICcsIHV0aWxpdHkucGF0aERlbHRhKFxuICAgICAgICAgICAgICAgICAgICBkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0pKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZC5zY2FsZVtwYXRoX3NpemVdID1cbiAgICAgICAgICAgICAgICBkLnNjYWxlVXNpbmdbcGF0aF9zaXplXShkLnJlbGF0aXZlX3BhdGhzW3BhdGhfc2l6ZV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5kcmF3bl9kZWx0YVtwYXRoX3NpemVdKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgdGVtcF9zdmcucmVtb3ZlKCk7XG4gICAgdGVtcF9wYXRoLnJlbW92ZSgpO1xuXG4gICAgdmFyIHNpemVzID0gT2JqZWN0LmtleXMoc2VnbWVudHNbMF0ucGF0aHMpO1xuICAgIHNlZ21lbnRzLmNob29zZV9zaXplID0gZnVuY3Rpb24gKHdpbmRvd193aWR0aCwgd2luZG93X2hlaWdodCkge1xuICAgICAgICB2YXIgY2hvc2VuID0gMDtcbiAgICAgICAgc2l6ZXMuZm9yRWFjaChmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgaWYgKGQgPD0gd2luZG93X3dpZHRoKSB7XG4gICAgICAgICAgICAgICAgY2hvc2VuID0gZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBjaG9zZW4udG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgd2luZG93LnNlZ21lbnRzID0gc2VnbWVudHM7XG5cbiAgICByZXR1cm4gc2VnbWVudHM7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ZnICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuXG4gICAgc2VsZi5jb252ZXJ0VG9SZWxhdGl2ZSA9IGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgICAgIGZ1bmN0aW9uIHNldCh0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIHNlZ3MucmVwbGFjZUl0ZW0ocnNlZywgaSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGR4LCBkeSwgeDAsIHkwLCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgIHNlZ3MgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICBmb3IgKHZhciB4ID0gMCwgeSA9IDAsIGkgPSAwLCBsZW4gPSBzZWdzLm51bWJlck9mSXRlbXM7XG4gICAgICAgICAgICAgaSA8IGxlbjtcbiAgICAgICAgICAgICBpKyspIHtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHNlZyA9IHNlZ3MuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICBjICAgPSBzZWcucGF0aFNlZ1R5cGVBc0xldHRlcjtcblxuICAgICAgICAgICAgaWYgKC9bTUxIVkNTUVRBWnpdLy50ZXN0KGMpKSB7XG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAtIHg7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAtIHg7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAtIHk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAtIHk7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IC14ICsgKHggPSBzZWcueCk7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IC15ICsgKHkgPSBzZWcueSk7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChjKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ00nOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdNb3ZldG8nLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdMJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvJyxkeCxkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnSCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0xpbmV0b0hvcml6b250YWwnLGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdWJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnTGluZXRvVmVydGljYWwnLGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdDJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQ3VydmV0b0N1YmljJyxkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnUyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9DdWJpY1Ntb290aCcsZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1EnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0KCdDdXJ2ZXRvUXVhZHJhdGljJyxkeCxkeSx4MSx5MSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXQoJ0N1cnZldG9RdWFkcmF0aWNTbW9vdGgnLGR4LGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldCgnQXJjJyxkeCxkeSxzZWcucjEsc2VnLnIyLHNlZy5hbmdsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWcubGFyZ2VBcmNGbGFnLHNlZy5zd2VlcEZsYWcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1onOiBjYXNlICd6JzogeCA9IHgwOyB5ID0geTA7IGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyBpbiBzZWcpIHggKz0gc2VnLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyBpbiBzZWcpIHkgKz0gc2VnLnk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgc3RhcnQgb2YgYSBzdWJwYXRoXG4gICAgICAgICAgICBpZiAoYyA9PSAnTScgfHwgYyA9PSAnbScpIHtcbiAgICAgICAgICAgICAgICB4MCA9IHg7XG4gICAgICAgICAgICAgICAgeTAgPSB5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnJlcGxhY2UoL1ovZywgJ3onKSk7XG4gICAgfTtcblxuICAgIHNlbGYucGF0aERlbHRhID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgIHk6IDBcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc3RhcnQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgoMCksXG4gICAgICAgICAgICBlbmQgPSBwYXRoLmdldFBvaW50QXRMZW5ndGgocGF0aC5nZXRUb3RhbExlbmd0aCgpKTtcblxuICAgICAgICBkZWx0YS54ID0gZW5kLnggLSBzdGFydC54O1xuICAgICAgICBkZWx0YS55ID0gZW5kLnkgLSBzdGFydC55O1xuXG4gICAgICAgIHJldHVybiBkZWx0YTtcbiAgICB9O1xuXG4gICAgLy8gcGFzcyBpbiBhIHBhdGggZWxlbWVudFxuICAgIC8vIGFuZCB0aGUgcGF0aCBzZWdlbWVudCBpbmRpY2llc1xuICAgIC8vIHRoYXQgd2lsbCBiZSBzY2FsZWRcbiAgICBzZWxmLnNjYWxlQW5jaG9yWSA9IGZ1bmN0aW9uIChwYXRoLCBhbmNob3JzKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdzY2FsZUFuY2hvclknKTtcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBzZWxmLnBhdGhEZWx0YShwYXRoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY3VycmVudCBkZWx0YVxuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgb3JpZ2luYWxfZCk7XG5cbiAgICAgICAgICAgIHZhciBzZWdtZW50cyA9IHBhdGgucGF0aFNlZ0xpc3Q7XG4gICAgICAgICAgICB2YXIgZmlyc3Rfc2VnbWVudCA9IHNlZ21lbnRzLmdldEl0ZW0oMCk7XG4gICAgICAgICAgICBpZiAoZmlyc3Rfc2VnbWVudFxuICAgICAgICAgICAgICAgICAgICAucGF0aFNlZ1R5cGVBc0xldHRlclxuICAgICAgICAgICAgICAgICAgICAudG9Mb3dlckNhc2UoKSA9PT0gJ20nKSB7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVwbGFjZW1lbnRfc2VnID1cbiAgICAgICAgICAgICAgICAgICAgcGF0aC5jcmVhdGVTVkdQYXRoU2VnTW92ZXRvQWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0WzBdLCBzdGFydFsxXSk7XG4gICAgICAgICAgICAgICAgc2VnbWVudHMucmVwbGFjZUl0ZW0ocmVwbGFjZW1lbnRfc2VnLCAwKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBhbmNob3JzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRvX3JlcGxhY2UgPSBzZWdtZW50cy5nZXRJdGVtKGFuY2hvcnNbbmFtZV0pO1xuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlX3dpdGggPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdDdXJ2ZXRvQ3ViaWNSZWwoXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkgKyAoKGRlbHRhLmN1cnJlbnQueS1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVsdGEuZHJhd24ueSkvMiksXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLngxLFxuICAgICAgICAgICAgICAgICAgICAgICAgdG9fcmVwbGFjZS55MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvX3JlcGxhY2UueDIsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b19yZXBsYWNlLnkyKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlX3dpdGgsIGFuY2hvcnNbbmFtZV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbCA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsJyk7XG4gICAgICAgICAgICBkZWx0YS5jdXJyZW50ID0ge1xuICAgICAgICAgICAgICAgIHg6IGVuZFswXSAtIHN0YXJ0WzBdLFxuICAgICAgICAgICAgICAgIHk6IGVuZFsxXSAtIHN0YXJ0WzFdXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50cy5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd4JyAgaW4gc2VnKSBkeCA9IHNlZy54ICAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5JyAgaW4gc2VnKSBkeSA9IHNlZy55ICAqIHJhdGlvLnk7XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbSc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTW92ZXRvJywgZHgsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0b0hvcml6b250YWwnLCBkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvVmVydGljYWwnLCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDEseTEseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0N1cnZldG9DdWJpY1Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR4LGR5LHgyLHkyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5nZXRBdHRyaWJ1dGUoJ2QnKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2VsZi5zY2FsZVByb3BvcnRpb25hbFkgPSBmdW5jdGlvbiAocGF0aCwgZHJhd25fZGVsdGEpIHtcbiAgICAgICAgLy8gc2NhbGUgeSwgZml0IHhcbiAgICAgICAgdmFyIGRlbHRhID0ge1xuICAgICAgICAgICAgICAgIGRyYXduOiBkcmF3bl9kZWx0YVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9yaWdpbmFsX2QgPSBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpLFxuICAgICAgICAgICAgZml0X3ggPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiByZXBsYWNlKGFsbF9zZWdtZW50cywgc2VnbWVudF90b19yZXBsYWNlLCB0eXBlKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IFtdLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAzKSxcbiAgICAgICAgICAgICAgICByY21kID0gJ2NyZWF0ZVNWR1BhdGhTZWcnKyB0eXBlICsnUmVsJyxcbiAgICAgICAgICAgICAgICByc2VnID0gcGF0aFtyY21kXS5hcHBseShwYXRoLCBhcmdzKTtcbiAgICAgICAgICAgIGFsbF9zZWdtZW50cy5yZXBsYWNlSXRlbShyc2VnLCBzZWdtZW50X3RvX3JlcGxhY2UpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChNYXRoLmFicyhkZWx0YS5kcmF3bi54KSA+IDAuMSkge1xuICAgICAgICAgICAgZml0X3ggPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnc2NhbGVQcm9wb3J0aW9uYWwnKTtcbiAgICAgICAgICAgIGRlbHRhLmN1cnJlbnQgPSB7XG4gICAgICAgICAgICAgICAgeDogZW5kWzBdIC0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeTogZW5kWzFdIC0gc3RhcnRbMV1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIGRlbHRhLmRpZmYgPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54IC0gZGVsdGEuZHJhd24ueCxcbiAgICAgICAgICAgICAgICB5OiBkZWx0YS5jdXJyZW50LnkgLSBkZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB2YXIgcmF0aW8gPSB7XG4gICAgICAgICAgICAgICAgeDogZGVsdGEuY3VycmVudC54L2RlbHRhLmRyYXduLngsXG4gICAgICAgICAgICAgICAgeTogZGVsdGEuY3VycmVudC55L2RlbHRhLmRyYXduLnlcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIG9yaWdpbmFsX2QpO1xuXG4gICAgICAgICAgICB2YXIgc2VnbWVudHMgPSBwYXRoLnBhdGhTZWdMaXN0O1xuICAgICAgICAgICAgdmFyIGZpcnN0X3NlZ21lbnQgPSBzZWdtZW50cy5nZXRJdGVtKDApO1xuICAgICAgICAgICAgaWYgKGZpcnN0X3NlZ21lbnRcbiAgICAgICAgICAgICAgICAgICAgLnBhdGhTZWdUeXBlQXNMZXR0ZXJcbiAgICAgICAgICAgICAgICAgICAgLnRvTG93ZXJDYXNlKCkgPT09ICdtJykge1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlcGxhY2VtZW50X3NlZyA9XG4gICAgICAgICAgICAgICAgICAgIHBhdGguY3JlYXRlU1ZHUGF0aFNlZ01vdmV0b0FicyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydFswXSwgc3RhcnRbMV0pO1xuICAgICAgICAgICAgICAgIHNlZ21lbnRzLnJlcGxhY2VJdGVtKHJlcGxhY2VtZW50X3NlZywgMCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBkeCwgZHksIHgxLCB5MSwgeDIsIHkyLFxuICAgICAgICAgICAgICAgIHggPSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5ID0gc3RhcnRbMV0sXG4gICAgICAgICAgICAgICAgc2VnbWVudF9jb3VudCA9IHNlZ21lbnRzLm51bWJlck9mSXRlbXM7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IHNlZ21lbnRfY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBzZWcgPSBzZWdtZW50cy5nZXRJdGVtKGkpLFxuICAgICAgICAgICAgICAgICAgICBjID0gc2VnLnBhdGhTZWdUeXBlQXNMZXR0ZXI7XG5cbiAgICAgICAgICAgICAgICBpZiAoJ3gxJyBpbiBzZWcpIHgxID0gc2VnLngxO1xuICAgICAgICAgICAgICAgIGlmICgneDInIGluIHNlZykgeDIgPSBzZWcueDI7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MSAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKCd5MicgaW4gc2VnKSB5MiA9IHNlZy55MiAqIHJhdGlvLnk7XG4gICAgICAgICAgICAgICAgaWYgKGZpdF94KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSBkeCA9IHNlZy54ICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkZWx0YS5kaWZmLngvKHNlZ21lbnRfY291bnQtMSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICgneCcgaW4gc2VnKSBkeCA9IHNlZy54O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoJ3knICBpbiBzZWcpIGR5ID0gc2VnLnkgICogcmF0aW8ueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBzZWxmLnNjYWxlUHJvcG9ydGlvbmFsWCA9IGZ1bmN0aW9uIChwYXRoLCBkcmF3bl9kZWx0YSkge1xuICAgICAgICB2YXIgZGVsdGEgPSB7XG4gICAgICAgICAgICAgICAgZHJhd246IGRyYXduX2RlbHRhXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb3JpZ2luYWxfZCA9IHBhdGguZ2V0QXR0cmlidXRlKCdkJyk7XG5cbiAgICAgICAgZnVuY3Rpb24gcmVwbGFjZShhbGxfc2VnbWVudHMsIHNlZ21lbnRfdG9fcmVwbGFjZSwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBbXS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMyksXG4gICAgICAgICAgICAgICAgcmNtZCA9ICdjcmVhdGVTVkdQYXRoU2VnJysgdHlwZSArJ1JlbCcsXG4gICAgICAgICAgICAgICAgcnNlZyA9IHBhdGhbcmNtZF0uYXBwbHkocGF0aCwgYXJncyk7XG4gICAgICAgICAgICBhbGxfc2VnbWVudHMucmVwbGFjZUl0ZW0ocnNlZywgc2VnbWVudF90b19yZXBsYWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoc3RhcnQsIGVuZCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3NjYWxlUHJvcG9ydGlvbmFsWCcpO1xuICAgICAgICAgICAgZGVsdGEuY3VycmVudCA9IHtcbiAgICAgICAgICAgICAgICB4OiBlbmRbMF0gLSBzdGFydFswXSxcbiAgICAgICAgICAgICAgICB5OiBlbmRbMV0gLSBzdGFydFsxXVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdmFyIHJhdGlvID0ge1xuICAgICAgICAgICAgICAgIHg6IGRlbHRhLmN1cnJlbnQueC9kZWx0YS5kcmF3bi54LFxuICAgICAgICAgICAgICAgIHk6IGRlbHRhLmN1cnJlbnQueS9kZWx0YS5kcmF3bi55XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgcGF0aC5zZXRBdHRyaWJ1dGUoJ2QnLCBvcmlnaW5hbF9kKTtcblxuICAgICAgICAgICAgdmFyIHNlZ21lbnRzID0gcGF0aC5wYXRoU2VnTGlzdDtcbiAgICAgICAgICAgIHZhciBmaXJzdF9zZWdtZW50ID0gc2VnbWVudHMuZ2V0SXRlbSgwKTtcbiAgICAgICAgICAgIGlmIChmaXJzdF9zZWdtZW50XG4gICAgICAgICAgICAgICAgICAgIC5wYXRoU2VnVHlwZUFzTGV0dGVyXG4gICAgICAgICAgICAgICAgICAgIC50b0xvd2VyQ2FzZSgpID09PSAnbScpIHtcblxuICAgICAgICAgICAgICAgIHZhciByZXBsYWNlbWVudF9zZWcgPVxuICAgICAgICAgICAgICAgICAgICBwYXRoLmNyZWF0ZVNWR1BhdGhTZWdNb3ZldG9BYnMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnRbMF0sIHN0YXJ0WzFdKTtcbiAgICAgICAgICAgICAgICBzZWdtZW50cy5yZXBsYWNlSXRlbShyZXBsYWNlbWVudF9zZWcsIDApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgZHgsIGR5LCB4MSwgeTEsIHgyLCB5MixcbiAgICAgICAgICAgICAgICB4ID0gc3RhcnRbMF0sXG4gICAgICAgICAgICAgICAgeSA9IHN0YXJ0WzFdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBzZWdtZW50cy5udW1iZXJPZkl0ZW1zOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VnID0gc2VnbWVudHMuZ2V0SXRlbShpKSxcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNlZy5wYXRoU2VnVHlwZUFzTGV0dGVyO1xuXG4gICAgICAgICAgICAgICAgaWYgKCd4MScgaW4gc2VnKSB4MSA9IHNlZy54MSAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd4MicgaW4gc2VnKSB4MiA9IHNlZy54MiAqIHJhdGlvLng7XG4gICAgICAgICAgICAgICAgaWYgKCd5MScgaW4gc2VnKSB5MSA9IHNlZy55MTtcbiAgICAgICAgICAgICAgICBpZiAoJ3kyJyBpbiBzZWcpIHkyID0gc2VnLnkyO1xuICAgICAgICAgICAgICAgIGlmICgneCcgIGluIHNlZykgZHggPSBzZWcueCAgKiByYXRpby54O1xuICAgICAgICAgICAgICAgIGlmICgneScgIGluIHNlZykgZHkgPSBzZWcueTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCAoYykge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdtJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdNb3ZldG8nLCBkeCwgZHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgICAgICAgICAgICAgICAgcmVwbGFjZShzZWdtZW50cywgaSwgJ0xpbmV0bycsIGR4LCBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaCc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnTGluZXRvSG9yaXpvbnRhbCcsIGR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdMaW5ldG9WZXJ0aWNhbCcsIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcGxhY2Uoc2VnbWVudHMsIGksICdDdXJ2ZXRvQ3ViaWMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkeCxkeSx4MSx5MSx4Mix5Mik7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBsYWNlKHNlZ21lbnRzLCBpLCAnQ3VydmV0b0N1YmljU21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHgsZHkseDIseTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBwYXRoLmdldEF0dHJpYnV0ZSgnZCcpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBuYXYgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIHRhcmdldF9zZWwsXG4gICAgICAgIG92ZXJsYWlkID0gZmFsc2UsXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5JyksXG4gICAgICAgIHJlbW92YWJsZV90ZXh0ID0gW3tcbiAgICAgICAgICAgIHRleHQ6ICdHbyEnXG4gICAgICAgIH1dO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdhc3Rlcmlza0NsaWNrJyk7XG5cbiAgICBzZWxmLnNlbGVjdGlvbiA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIHRhcmdldF9zZWw7XG4gICAgICAgIHRhcmdldF9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5vdmVybGFpZCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG92ZXJsYWlkO1xuICAgICAgICBvdmVybGFpZCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLnNldHVwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRhcmdldF9zZWwpIHRocm93IFwicmVxdWlyZXMgZWxlbWVudHMgdG8gcGFpclwiO1xuICAgICAgICB0YXJnZXRfc2VsXG4gICAgICAgICAgICAub24oJ2NsaWNrLm5hdicsIGZ1bmN0aW9uIChkLCBkaSkge1xuICAgICAgICAgICAgICAgIHRhcmdldF9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnNlbGVjdCgnI2Zsb3dlcicpO1xuICAgICAgICAgICAgICAgIG92ZXJsYWlkID0gb3ZlcmxhaWQgPyBmYWxzZSA6IHRydWU7XG4gICAgICAgICAgICAgICAgYWN0aXZhdGVfZGVhY3RpdmF0ZShkKTtcbiAgICAgICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmFzdGVyaXNrQ2xpY2sob3ZlcmxhaWQpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgcGxhY2VfYnV0dG9uKCk7XG5cbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXR0YWNoUmVzaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUubmF2JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHBsYWNlX2J1dHRvbigpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignc2Nyb2xsLm5hdicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBwbGFjZV9idXR0b24oKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhY3RpdmF0ZV9kZWFjdGl2YXRlIChkKSB7XG4gICAgICAgIHZhciBvdmVybGF5ID0gZDMuc2VsZWN0QWxsKGQuYWN0aXZhdGUpO1xuICAgICAgICBvdmVybGF5LmNsYXNzZWQoJ292ZXJsYWlkJywgb3ZlcmxhaWQpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCduby1zY3JvbGwnLCBvdmVybGFpZCk7XG4gICAgICAgIGJvZHlfc2VsLmNsYXNzZWQoZC5ib2R5LCBvdmVybGFpZCk7XG4gICAgICAgIHBsYWNlX2J1dHRvbigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBsYWNlX2J1dHRvbiAoKSB7XG5cbiAgICAgICAgdmFyIHd3aWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgICAgICB2YXIgd2hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICB2YXIgbWF0Y2hpbmdfc2VsO1xuICAgICAgICB2YXIgYmJveDtcblxuICAgICAgICBpZiAob3ZlcmxhaWQpIHtcbiAgICAgICAgICAgIGJib3ggPSB0YXJnZXRfc2VsLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIHZhciBwX2Jib3ggPSB0YXJnZXRfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3QoJ3AnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgdmFyIHRhcmdldF9oZWlnaHQgPSBiYm94LmhlaWdodDtcbiAgICAgICAgICAgIG1hdGNoaW5nX3NlbCA9XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KCcubG9nby10ZXh0LWNvbXBvbmVudC0tcmlzZCcpO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICB0YXJnZXRfc2VsLnN0eWxlKCdsZWZ0JywgKHd3aWR0aCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBfYmJveC53aWR0aCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJib3gud2lkdGggLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoK21hdGNoaW5nX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZSgnbGVmdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF0pKSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4Jyk7XG4gICAgICAgICAgICB0YXJnZXRfc2VsLnN0eWxlKCdib3R0b20nLCAod2hlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmJveC5oZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICgrbWF0Y2hpbmdfc2VsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCd0b3AnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zcGxpdCgncCcpWzBdKSkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3B4Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtYXRjaGluZ19zZWwgPVxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCgnLmxvZ28tdGV4dC1jb21wb25lbnQtLTIwMTQnKTtcbiAgICAgICAgICAgIHRhcmdldF9zZWxcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2xlZnQnLCBtYXRjaGluZ19zZWwuc3R5bGUoJ3JpZ2h0JykpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdib3R0b20nLCBtYXRjaGluZ19zZWwuc3R5bGUoJ2JvdHRvbScpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGJvdHRvbSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgZGlydHkgPSBmYWxzZSxcbiAgICAgICAgY29udGFpbmVyX3NlbCxcbiAgICAgICAgY29udGFpbmVyX21hcmdpbl9ib3R0b20sXG4gICAgICAgIHdpbmRvd19oZWlnaHQ7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2JvdHRvbScpO1xuXG4gICAgc2VsZi5kaXJ0eSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRpcnR5O1xuICAgICAgICBkaXJ0eSA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmF0dGFjaFdpbmRvd0V2ZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZDMuc2VsZWN0KHdpbmRvdylcbiAgICAgICAgICAgIC5vbigncmVzaXplLmJvdHRvbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygpXG4gICAgICAgICAgICAgICAgY2FsY3VsYXRlX3ZhcmlhYmxlcygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignc2Nyb2xsLmJvdHRvbScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWNvbnRhaW5lcl9zZWwpIHRocm93IFwiQm90dG9tIHJlcXVpcmVzIGNvbnRhaW5lci5cIjtcbiAgICAgICAgICAgICAgICBpZiAoZGlydHkpIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHZhciBjYm94ID0gY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgICAgICAgICAgICAgIGlmICgoY2JveC5ib3R0b20gKyBjb250YWluZXJfbWFyZ2luX2JvdHRvbSkgPD1cbiAgICAgICAgICAgICAgICAgICAgIHdpbmRvd19oZWlnaHQpIHtcblxuICAgICAgICAgICAgICAgICAgICBkaXJ0eSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZGlzcGF0Y2guYm90dG9tKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGN1bGF0ZV92YXJpYWJsZXMoKTtcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGNhbGN1bGF0ZV92YXJpYWJsZXMgKCkge1xuICAgICAgICB3aW5kb3dfaGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgICAgICBjb250YWluZXJfbWFyZ2luX2JvdHRvbSA9ICtjb250YWluZXJfc2VsXG4gICAgICAgICAgICAuc3R5bGUoJ21hcmdpbi1ib3R0b20nKVxuICAgICAgICAgICAgLnNwbGl0KCdwJylbMF07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gRGF0YSAoKSB7XG4gICAgdmFyIHNlbGYgPSB7fSxcbiAgICAgICAgcmVxdWVzdGVkID0gW10sXG4gICAgICAgIGF2YWlsYWJsZTtcblxuICAgIHZhciB1cmwgPSB3aW5kb3cubG9jYXRpb24ub3JpZ2luICtcbiAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXG4gICAgc2VsZi5kaXNwYXRjaCA9IGQzLmRpc3BhdGNoKCdkYXRhJywnZW5kT2ZEYXRhJyk7XG5cbiAgICBzZWxmLmZldGNoX2RhdGEgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdmZXRjaGluZyBkYXRhJyk7XG4gICAgICAgIGlmICghYXZhaWxhYmxlKSB7XG4gICAgICAgICAgICBkMy5qc29uKHVybCArICdkYXRhL21ldGFkYXRhLmpzb24nLCBwcm9jZXNzX21ldGFkYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByb2Nlc3NfcmVxdWVzdCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHByb2Nlc3NfbWV0YWRhdGEgKHJhd19tZXRhKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdwcm9jZXNzaW5nIG1ldGFkYXRhJyk7XG4gICAgICAgIGF2YWlsYWJsZSA9IHJhd19tZXRhLmF2YWlsYWJsZTtcbiAgICAgICAgcHJvY2Vzc19yZXF1ZXN0KCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc19yZXF1ZXN0ICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3Byb2Nlc3NpbmcgcmVxdWVzdCcpO1xuICAgICAgICB2YXIgbmV4dF90b19sb2FkID0gY2hvb3NlX2FuZF9yZW1vdmVfZnJvbV9hdmFpbGFibGUoKTtcbiAgICAgICAgY29uc29sZS5sb2cobmV4dF90b19sb2FkKTtcbiAgICAgICAgaWYgKG5leHRfdG9fbG9hZCkge1xuICAgICAgICAgICAgZDMuanNvbih1cmwgKyBuZXh0X3RvX2xvYWQsIGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaC5kYXRhKGRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZWxmLmRpc3BhdGNoLmVuZE9mRGF0YSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hvb3NlX2FuZF9yZW1vdmVfZnJvbV9hdmFpbGFibGUgKCkge1xuICAgICAgICB2YXIgc2VsZWN0ZWQ7XG4gICAgICAgIHZhciBpbmRleCA9IE1hdGgucmFuZG9tKCkgKiBhdmFpbGFibGUubGVuZ3RoO1xuXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBzZWxlY3RlZCA9IGF2YWlsYWJsZS5zcGxpY2UoaW5kZXgsIDEpWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHNlbGVjdGVkO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGZpeGVkICgpIHtcbiAgICAvLyB3aGVuIGNvbnRhaW5lciBoaXRzIHRoZSB0b3AsIHN3aXRjaCB0aGF0IGVsZW1lbnQgdG8gZml4ZWRcbiAgICAvLyBwbHVzIHRoZSBhZGRpdGlvbmFsIHBhZGRpbmdcblxuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIG5vX3RyYW5zbGF0ZV9zZWwsXG4gICAgICAgIHRyYW5zbGF0ZV9zZWwsXG4gICAgICAgIG5vX3RyYW5zbGF0ZV9kaXN0YW5jZSA9IDA7XG5cbiAgICBzZWxmLmRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2FjdGl2YXRvclZpc2libGUnKTtcblxuICAgIHZhciB2ZW5kb3IgPSBbXCJcIiwgXCItd2Via2l0LVwiLCBcIi1tb3otXCIsIFwiLW1zLVwiLCBcIi1vLVwiXS5yZWR1Y2UoXG4gICAgICAgIGZ1bmN0aW9uIChwLCB2KSB7XG4gICAgICAgICAgICByZXR1cm4gdiArIFwidHJhbnNmb3JtXCIgaW4gZG9jdW1lbnQuYm9keS5zdHlsZSA/IHYgOiBwO1xuICAgICAgICB9KTtcblxuICAgIHZhciB0cmFuc2Zvcm1fYXR0ciA9IHZlbmRvciArICd0cmFuc2Zvcm0nO1xuXG4gICAgc2VsZi5ub1RyYW5zbGF0ZSA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIG5vX3RyYW5zbGF0ZV9zZWw7XG4gICAgICAgIG5vX3RyYW5zbGF0ZV9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi50cmFuc2xhdGUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiB0cmFuc2xhdGVfc2VsO1xuICAgICAgICB0cmFuc2xhdGVfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYudG9wID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbm9fdHJhbnNsYXRlX2Rpc3RhbmNlO1xuICAgIH07XG5cbiAgICBzZWxmLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNhbGNfY29udHJhaW50cygpO1xuXG4gICAgICAgIGQzLnNlbGVjdCh3aW5kb3cpXG4gICAgICAgICAgICAub24oJ3Njcm9sbC5maXhlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNsYXRlX3kgPSAwO1xuXG4gICAgICAgICAgICAgICAgaWYgKChub190cmFuc2xhdGVfZGlzdGFuY2UgLSBwYWdlWU9mZnNldCkgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZV95ID0gcGFnZVlPZmZzZXQgLSBub190cmFuc2xhdGVfZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc2VsZi5kaXNwYXRjaFxuICAgICAgICAgICAgICAgICAgICAuYWN0aXZhdG9yVmlzaWJsZSgodHJhbnNsYXRlX3kgPT09IDApID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlIDogdHJ1ZSk7XG5cbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gNzY4KSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYW5zbGF0ZV9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zdHlsZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm1fYXR0cixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJhbnNsYXRlKDAsJyArIHRyYW5zbGF0ZV95ICsgJ3B4KScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ3Jlc2l6ZS5maXhlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPCA3NjgpIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNsYXRlX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybV9hdHRyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICd0cmFuc2xhdGUoMCwwKScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYWxjX2NvbnRyYWludHMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjYWxjX2NvbnRyYWludHMgKCkge1xuICAgICAgICB2YXIgbm9fdHJhbnNsYXRlX21hcmdpbiA9XG4gICAgICAgICAgICAgICAgK25vX3RyYW5zbGF0ZV9zZWxcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdtYXJnaW4tdG9wJylcbiAgICAgICAgICAgICAgICAgICAgLnNwbGl0KCdwJylbMF07XG4gICAgICAgIHZhciBub190cmFuc2xhdGVfaGVpZ2h0ID1cbiAgICAgICAgICAgICAgICBub190cmFuc2xhdGVfc2VsXG4gICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgICAgIC5oZWlnaHQ7XG4gICAgICAgIG5vX3RyYW5zbGF0ZV9kaXN0YW5jZSA9IG5vX3RyYW5zbGF0ZV9oZWlnaHQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBub190cmFuc2xhdGVfbWFyZ2luO1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJ2YXIgYm90dG9tID0gcmVxdWlyZSgnLi9ib3R0b20nKSgpO1xudmFyIGJlaGFuY2UgPSByZXF1aXJlKCcuL2RhdGEnKSgpO1xudmFyIGRlcGFydG1lbnRzID0gcmVxdWlyZSgnLi4vZGVwYXJ0bWVudHMnKSgpO1xudmFyIHRyYW5zZm9ybSA9IHJlcXVpcmUoJy4vdHJhbnNmb3JtJykoKTtcbnZhciBsaWdodGJveCA9IHJlcXVpcmUoJy4vbGlnaHRib3gnKSgpO1xudmFyIHNjcm9sbHRvID0gcmVxdWlyZSgnLi9zY3JvbGx0bycpKHsgZHVyYXRpb246IDEwMDAgfSk7XG52YXIgZml4ZWQgPSByZXF1aXJlKCcuL2ZpeGVkJykoKTtcbnZhciBsYXlvdXRfaW1hZ2UgPSByZXF1aXJlKCcuL2xheW91dF9pbWFnZScpKCk7XG52YXIgbGF5b3V0X2ZpeGVkID0gcmVxdWlyZSgnLi9sYXlvdXRfZml4ZWQnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHdvcmsgKCkge1xuICAgIHZhciBzZWxmID0ge30sXG4gICAgICAgIGNvbnRhaW5lcl9zZWwsXG4gICAgICAgIGluZmluaXRlX3Njcm9sbF9ib29sID0gZmFsc2UsXG4gICAgICAgIGRhdGEgPSBbXSxcbiAgICAgICAgd29ya19jb250YWluZXJfc2VsLFxuICAgICAgICB3b3JrX3NlbCxcbiAgICAgICAgaXNvLFxuICAgICAgICBsYXlvdXQgPSAnaW1hZ2UnLFxuICAgICAgICBsYXlvdXRzID0ge1xuICAgICAgICAgICAgaW1hZ2U6IHtcbiAgICAgICAgICAgICAgICByZW5kZXI6IHJlbmRlcl9pbWFnZSxcbiAgICAgICAgICAgICAgICByZXNpemU6IHJlc2l6ZV9pbWFnZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGZpeGVkOiB7XG4gICAgICAgICAgICAgICAgcmVuZGVyOiByZW5kZXJfZml4ZWQsXG4gICAgICAgICAgICAgICAgcmVzaXplOiByZXNpemVfZml4ZWRcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgaW50cm9fc2VsLFxuICAgICAgICBib2R5X3NlbCA9IGQzLnNlbGVjdCgnYm9keScpO1xuXG4gICAgYmVoYW5jZS5kaXNwYXRjaFxuICAgICAgICAub24oJ2RhdGEnLCBmdW5jdGlvbiAocmVxdWVzdGVkKSB7XG4gICAgICAgICAgICBib3R0b20uZGlydHkoZmFsc2UpO1xuXG4gICAgICAgICAgICBpZiAoIXJlcXVlc3RlZCkgdGhyb3cgJ1dvcmsuIEdvdCBubyBkYXRhLic7XG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtZWQgPSB0cmFuc2Zvcm0ocmVxdWVzdGVkKTtcblxuICAgICAgICAgICAgZGF0YSA9IGRhdGEuY29uY2F0KHRyYW5zZm9ybWVkKTtcbiAgICAgICAgICAgIHJlbmRlcigpO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIGZpbHRlcmFibGUgbGlzdFxuICAgICAgICAgICAgZGVwYXJ0bWVudHMuaXNGaWx0ZXJhYmxlKHRyYW5zZm9ybWVkKTtcbiAgICAgICAgfSlcbiAgICAgICAgLm9uKCdlbmRPZkRhdGEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBib3R0b20uZGlzcGF0Y2gub24oJ2JvdHRvbS53b3JrJywgbnVsbCk7XG4gICAgICAgIH0pO1xuXG4gICAgZml4ZWQuZGlzcGF0Y2hcbiAgICAgICAgLm9uKCdhY3RpdmF0b3JWaXNpYmxlJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgIGRlcGFydG1lbnRzLmFjdGl2YXRvclZpc2libGUoZCk7XG4gICAgICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCdpbi13b3JrJywgZCk7XG4gICAgICAgIH0pO1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuaW50cm8gPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBpbnRyb19zZWw7XG4gICAgICAgIGludHJvX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmxheW91dCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGxheW91dDtcbiAgICAgICAgbGF5b3V0ID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYubGlnaHRib3hDb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBsaWdodGJveC5jb250YWluZXIoKTtcbiAgICAgICAgbGlnaHRib3guY29udGFpbmVyKF8pO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5pbmZpbml0ZVNjcm9sbCA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGluZmluaXRlX3Njcm9sbF9ib29sO1xuICAgICAgICBpbmZpbml0ZV9zY3JvbGxfYm9vbCA9IF87XG5cbiAgICAgICAgaWYgKGluZmluaXRlX3Njcm9sbF9ib29sID09PSB0cnVlKSB7XG4gICAgICAgICAgICBib3R0b21cbiAgICAgICAgICAgICAgICAuY29udGFpbmVyKGNvbnRhaW5lcl9zZWwpXG4gICAgICAgICAgICAgICAgLmF0dGFjaFdpbmRvd0V2ZW50cygpO1xuXG4gICAgICAgICAgICBib3R0b20uZGlzcGF0Y2hcbiAgICAgICAgICAgICAgICAub24oJ2JvdHRvbS53b3JrJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygncmVhY2hlZCBib3R0b20nKTtcbiAgICAgICAgICAgICAgICAgICAgYm90dG9tLmRpcnR5KHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBiZWhhbmNlLmZldGNoX2RhdGEoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmluaXRpYWxpemUgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBzZXRfaW50cm9faGVpZ2h0KCk7XG5cbiAgICAgICAgaWYgKCFjb250YWluZXJfc2VsKSB0aHJvdyBcIldvcmsgcmVxdWlyZXMgYSBjb250YWluZXJcIjtcbiAgICAgICAgY29udGFpbmVyX3NlbC5jYWxsKGFkZF9zdHJ1Y3R1cmUpO1xuICAgICAgICBsYXlvdXRfZml4ZWQuY29udGFpbmVyKHdvcmtfY29udGFpbmVyX3NlbCk7XG4gICAgICAgIGxheW91dF9pbWFnZS5jb250YWluZXIod29ya19jb250YWluZXJfc2VsKTtcblxuICAgICAgICBpZiAoaW5maW5pdGVfc2Nyb2xsX2Jvb2wpIGJvdHRvbS5pbml0aWFsaXplKCk7XG5cbiAgICAgICAgLy8gd2lsbCBiZSB0aGUgdGhpbmcgdG8gY2FsbCByZW5kZXJcbiAgICAgICAgYmVoYW5jZS5mZXRjaF9kYXRhKCk7XG5cbiAgICAgICAgLy8gZmlsdGVyaW5nXG4gICAgICAgIGRlcGFydG1lbnRzLmRpc3BhdGNoXG4gICAgICAgICAgICAub24oJ2NsaWNrLndvcmsnLCBmdW5jdGlvbiAoZGVwYXJ0bWVudCkge1xuXG4gICAgICAgICAgICBzY3JvbGx0byhmaXhlZC50b3AoKSArIDEwKTtcblxuICAgICAgICAgICAgaWYgKGRlcGFydG1lbnQgPT09ICdhbGwnKSBkZXBhcnRtZW50ID0gJyc7XG5cbiAgICAgICAgICAgIGlmIChpc28pIHtcbiAgICAgICAgICAgICAgICBpc28uYXJyYW5nZSh7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlcjogZnVuY3Rpb24gKGl0ZW1FbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZDMuc2VsZWN0KGl0ZW1FbGVtKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGFzc2VkKGRlcGFydG1lbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZpeGVkLmluaXRpYWxpemUoKTtcblxuICAgICAgICBkMy5zZWxlY3Qod2luZG93KVxuICAgICAgICAgICAgLm9uKCdyZXNpemUud29yaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXNpemUoKTtcbiAgICAgICAgICAgICAgICBzZXRfaW50cm9faGVpZ2h0KCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gcmVuZGVyICgpIHtcbiAgICAgICAgbGF5b3V0c1tsYXlvdXRdLnJlbmRlcigpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2l6ZSAoKSB7XG4gICAgICAgIGxheW91dHNbbGF5b3V0XS5yZXNpemUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfZml4ZWQgKCkge1xuICAgICAgICB3b3JrX3NlbCA9IHdvcmtfY29udGFpbmVyX3NlbC5zZWxlY3RBbGwoJy5waWVjZScpXG4gICAgICAgICAgICAuZGF0YShkYXRhKTtcblxuICAgICAgICB2YXIgd29ya19zZWxfZW50ZXIgPSB3b3JrX3NlbFxuICAgICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpO1xuXG4gICAgICAgIGxheW91dF9maXhlZFxuICAgICAgICAgICAgLmF0dHJpYnV0ZXMod29ya19zZWxfZW50ZXIpO1xuICAgICAgICB2YXIgbWFzb25yeSA9IGxheW91dF9maXhlZC5tYXNvbnJ5KCk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X2hlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ2ZpeGVkLXBpZWNlIHBpZWNlICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgZC5yaXNkX3Byb2dyYW1fY2xhc3MgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJyBvcmllbnRhdGlvbi0nICsgZC5vcmllbnRhdGlvbjtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdwaWVjZS13cmFwcGVyJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoZC5tYXNvbnJ5X2hlaWdodCAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZC5tZXRhX3NwYWNlKSArICdweCc7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLWltZy13cmFwcGVyJylcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV93aWR0aDtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChkLm1hc29ucnlfaGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLm1ldGFfc3BhY2UpICsgJ3B4JztcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5jYWxsKGFkZF9pbWFnZSk7XG4gICAgICAgIFxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2UtbWV0YS13cmFwcGVyJylcbiAgICAgICAgICAgICAgICAuY2FsbChhZGRfbWV0YSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDUwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICB3b3JrX3NlbC5vbignY2xpY2sud29yaycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2FsbChsaWdodGJveC5zaG93KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpc28pIHtcbiAgICAgICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbC5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IG1hc29ucnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd29ya19zZWxfZW50ZXIuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaXNvLmFwcGVuZGVkKHRoaXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpc28ubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJfaW1hZ2UgKCkgIHtcbiAgICAgICAgd29ya19zZWwgPSB3b3JrX2NvbnRhaW5lcl9zZWwuc2VsZWN0QWxsKCcucGllY2UnKVxuICAgICAgICAgICAgLmRhdGEoZGF0YSk7XG5cbiAgICAgICAgdmFyIHdvcmtfc2VsX2VudGVyID0gd29ya19zZWxcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnaW1hZ2UtcGllY2UgcGllY2UgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBkLnJpc2RfcHJvZ3JhbV9jbGFzcztcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICBsYXlvdXRfaW1hZ2VcbiAgICAgICAgICAgIC5hdHRyaWJ1dGVzKHdvcmtfc2VsX2VudGVyKTtcbiAgICAgICAgdmFyIG1hc29ucnkgPSBsYXlvdXRfaW1hZ2UubWFzb25yeSgpO1xuXG4gICAgICAgIHdvcmtfc2VsX2VudGVyXG4gICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X3dpZHRoICsgJ3B4JztcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV9oZWlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXJcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlLXdyYXBwZXInKVxuICAgICAgICAgICAgICAgIC5jYWxsKGFkZF9pbWFnZSk7XG4gICAgICAgIFxuICAgICAgICB3b3JrX3NlbF9lbnRlclxuICAgICAgICAgICAgLmFwcGVuZCgnZGl2JylcbiAgICAgICAgICAgICAgICAuYXR0cignY2xhc3MnLCAncGllY2UtbWV0YS13cmFwcGVyJylcbiAgICAgICAgICAgICAgICAuY2FsbChhZGRfbWV0YSk7XG5cbiAgICAgICAgd29ya19zZWxfZW50ZXIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAuZGVsYXkoZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAqIDUwO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAgICAgICAuc3R5bGUoJ29wYWNpdHknLCAxKTtcblxuICAgICAgICB3b3JrX3NlbC5vbignY2xpY2sud29yaycsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2FsbChsaWdodGJveC5zaG93KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKCFpc28pIHtcbiAgICAgICAgICAgIGlzbyA9IG5ldyBJc290b3BlKHdvcmtfY29udGFpbmVyX3NlbC5ub2RlKCksIHtcbiAgICAgICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICcucGllY2UnLFxuICAgICAgICAgICAgICAgIG1hc29ucnk6IG1hc29ucnlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaXNvLnVuYmluZFJlc2l6ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgd29ya19zZWxfZW50ZXIuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaXNvLmFwcGVuZGVkKHRoaXMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpc28ubGF5b3V0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXNpemVfaW1hZ2UgKCkge1xuXG4gICAgICAgIGxheW91dF9pbWFnZVxuICAgICAgICAgICAgLmF0dHJpYnV0ZXMod29ya19zZWwpO1xuICAgICAgICB2YXIgbWFzb25yeSA9IGxheW91dF9pbWFnZS5tYXNvbnJ5KCk7XG5cbiAgICAgICAgd29ya19zZWxcbiAgICAgICAgICAgIC5zdHlsZSgnd2lkdGgnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X2hlaWdodCArICdweCc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWlzbykge1xuICAgICAgICAgICAgaXNvID0gbmV3IElzb3RvcGUod29ya19jb250YWluZXJfc2VsLm5vZGUoKSwge1xuICAgICAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjogJy5waWVjZScsXG4gICAgICAgICAgICAgICAgbWFzb25yeTogbWFzb25yeVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpc28ub3B0aW9ucy5tYXNvbnJ5ID0gbWFzb25yeTtcbiAgICAgICAgICAgIGlzby5sYXlvdXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlc2l6ZV9maXhlZCAoKSB7XG5cbiAgICAgICAgbGF5b3V0X2ZpeGVkXG4gICAgICAgICAgICAuYXR0cmlidXRlcyh3b3JrX3NlbCk7XG4gICAgICAgIHZhciBtYXNvbnJ5ID0gbGF5b3V0X2ZpeGVkLm1hc29ucnkoKTtcblxuICAgICAgICB3b3JrX3NlbFxuICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQubWFzb25yeV93aWR0aCArICdweCc7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBmdW5jdGlvbiAoZCwgaSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLm1hc29ucnlfaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHdvcmtfc2VsXG4gICAgICAgICAgICAuc2VsZWN0QWxsKCcucGllY2Utd3JhcHBlcicpXG4gICAgICAgICAgICAuc3R5bGUoJ2hlaWdodCcsIGZ1bmN0aW9uIChkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIChkLm1hc29ucnlfaGVpZ2h0IC1cbiAgICAgICAgICAgICAgICAgICAgICAgIGQubWV0YV9zcGFjZSkgKyAncHgnO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgd29ya19zZWxcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5waWVjZS1pbWctd3JhcHBlcicpXG4gICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5tYXNvbnJ5X3dpZHRoO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKGQubWFzb25yeV9oZWlnaHQgLVxuICAgICAgICAgICAgICAgICAgICAgICAgZC5tZXRhX3NwYWNlKSArICdweCc7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIWlzbykge1xuICAgICAgICAgICAgaXNvID0gbmV3IElzb3RvcGUod29ya19jb250YWluZXJfc2VsLm5vZGUoKSwge1xuICAgICAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjogJy5waWVjZScsXG4gICAgICAgICAgICAgICAgbWFzb25yeTogbWFzb25yeVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpc28udW5iaW5kUmVzaXplKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpc28ub3B0aW9ucy5tYXNvbnJ5ID0gbWFzb25yeTtcbiAgICAgICAgICAgIGlzby5sYXlvdXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9zdHJ1Y3R1cmUgKHNlbCkgIHtcbiAgICAgICAgdmFyIGRlcHRfY29udGFpbmVyX3NlbCA9IHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY29sLXBlcmNlbnQtMi0xMCBkZXBhcnRtZW50cycpO1xuXG4gICAgICAgIHdvcmtfY29udGFpbmVyX3NlbCA9IHNlbC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnY29sLXBlcmNlbnQtOC0xMCB3b3JrLWNvbnRhaW5lciBvbWVnYSAnK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3dvcmstbGF5b3V0LScgKyBsYXlvdXQpO1xuXG4gICAgICAgIGRlcGFydG1lbnRzXG4gICAgICAgICAgICAuY29udGFpbmVyKGRlcHRfY29udGFpbmVyX3NlbClcbiAgICAgICAgICAgIC5tb2JpbGUoZDMuc2VsZWN0KCcubmF2LW1vYmlsZScpKVxuICAgICAgICAgICAgLnJlbmRlcigpO1xuXG4gICAgICAgIGZpeGVkXG4gICAgICAgICAgICAubm9UcmFuc2xhdGUoaW50cm9fc2VsKVxuICAgICAgICAgICAgLnRyYW5zbGF0ZShkZXB0X2NvbnRhaW5lcl9zZWwpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9tZXRhIChzZWwpIHtcbiAgICAgICAgc2VsLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnc3R1ZGVudC1uYW1lIHBpZWNlLW1ldGEnKVxuICAgICAgICAgICAgLnRleHQoZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zdHVkZW50X25hbWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBzZWwuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdyaXNkLXByb2dyYW0gcGllY2UtbWV0YScpXG4gICAgICAgICAgICAudGV4dChmdW5jdGlvbiAoZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBkLnJpc2RfcHJvZ3JhbTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZF9pbWFnZSAoc2VsKSB7XG4gICAgICAgIHNlbC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5jb3Zlci5zcmM7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRfaW50cm9faGVpZ2h0ICgpIHtcbiAgICAgICAgdmFyIGhlaWdodCA9XG4gICAgICAgICAgICBpbnRyb19zZWxcbiAgICAgICAgICAgICAgICAubm9kZSgpXG4gICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCArXG4gICAgICAgICAgICBwYXJzZUludChpbnRyb19zZWwuc3R5bGUoJ21hcmdpbi10b3AnKSwgMTApICtcbiAgICAgICAgICAgIHBhcnNlSW50KGludHJvX3NlbC5zdHlsZSgnbWFyZ2luLWJvdHRvbScpLCAxMCk7XG5cbiAgICAgICAgaWYgKGhlaWdodCA8IHdpbmRvdy5pbm5lckhlaWdodCkge1xuICAgICAgICAgICAgdmFyIGRpZmZlcmVuY2UgPSB3aW5kb3cuaW5uZXJIZWlnaHQgLSBoZWlnaHQ7XG4gICAgICAgICAgICBpbnRyb19zZWwuc3R5bGUoJ3BhZGRpbmctYm90dG9tJywgZGlmZmVyZW5jZSArICdweCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGF5b3V0X2ZpeGVkICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBjb250YWluZXJfc2VsO1xuICAgIHZhciBjb3VudGVyID0ge1xuICAgICAgICB0YWxsOiAwLFxuICAgICAgICB3aWRlOiAwXG4gICAgfTtcbiAgICB2YXIgZnJlcXVlbmN5ID0ge1xuICAgICAgICBsYXJnZTogMTUsXG4gICAgICAgIHRhbGw6IDgsXG4gICAgICAgIHdpZGU6IDZcbiAgICB9O1xuICAgIHZhciBtZXRhX3NwYWNlID0gNTA7XG4gICAgdmFyIG1hc29ucnkgPSB7XG4gICAgICAgIGd1dHRlcjogMCxcbiAgICAgICAgY29sdW1uV2lkdGg6IDAsXG4gICAgICAgIGNvbHVtbldpZHRoRG91YmxlOiAwXG4gICAgfTtcblxuICAgIHNlbGYubWFzb25yeSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG1hc29ucnk7XG4gICAgfTtcblxuICAgIHNlbGYuY29udGFpbmVyID0gZnVuY3Rpb24gKF8pIHtcbiAgICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gY29udGFpbmVyX3NlbDtcbiAgICAgICAgY29udGFpbmVyX3NlbCA9IF87XG4gICAgICAgIHJldHVybiBzZWxmO1xuICAgIH07XG5cbiAgICBzZWxmLmF0dHJpYnV0ZXMgPSBmdW5jdGlvbiAoc2VsKSB7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBtYXNvbnJ5ID0gbWFzb25yeV9zZXR0aW5ncygpO1xuXG4gICAgICAgIHNlbC5lYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgICAgICBkLm1ldGFfc3BhY2UgPSBtZXRhX3NwYWNlO1xuICAgICAgICAgICAgdmFyIG11bHRpcGxpZXIgPSAxO1xuXG4gICAgICAgICAgICBpZiAoaSAlIGZyZXF1ZW5jeS5sYXJnZSA9PT0gMCkge1xuXG4gICAgICAgICAgICAgICAgLy8gbGFyZ2VcbiAgICAgICAgICAgICAgICBtdWx0aXBsaWVyID0gMjtcblxuICAgICAgICAgICAgICAgIGlmICgoZC5jb3Zlci5vcmlnaW5hbF93aWR0aC9cbiAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfaGVpZ2h0KSA+IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZC5vcmllbnRhdGlvbiA9ICdsYW5kc2NhcGUnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGQub3JpZW50YXRpb24gPSAncG9ydHJhaXQnO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV93aWR0aCA9XG4gICAgICAgICAgICAgICAgICAgIChtYXNvbnJ5LmNvbHVtbldpZHRoICpcbiAgICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIpICtcbiAgICAgICAgICAgICAgICAgICAgKChtdWx0aXBsaWVyID09PSAxKSA/XG4gICAgICAgICAgICAgICAgICAgICAgMCA6IG1hc29ucnkuZ3V0dGVyKTtcblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV9oZWlnaHQgPSBkLm1hc29ucnlfd2lkdGg7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKGQuY292ZXIub3JpZ2luYWxfd2lkdGgvXG4gICAgICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX2hlaWdodCkgPiAxKSB7XG5cbiAgICAgICAgICAgICAgICAvLyBsYW5kc2NhcGVcbiAgICAgICAgICAgICAgICBjb3VudGVyLndpZGUgKz0gMTtcbiAgICAgICAgICAgICAgICBpZiAoY291bnRlci53aWRlICUgZnJlcXVlbmN5LndpZGUgPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGllciA9IDI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X3dpZHRoID1cbiAgICAgICAgICAgICAgICAgICAgKG1hc29ucnkuY29sdW1uV2lkdGggKlxuICAgICAgICAgICAgICAgICAgICAgbXVsdGlwbGllcikgK1xuICAgICAgICAgICAgICAgICAgICAoKG11bHRpcGxpZXIgPT09IDEpID9cbiAgICAgICAgICAgICAgICAgICAgICAwIDogbWFzb25yeS5ndXR0ZXIpO1xuXG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X2hlaWdodCA9IGQubWFzb25yeV93aWR0aDtcbiAgICAgICAgICAgICAgICBkLm9yaWVudGF0aW9uID0gJ2xhbmRzY2FwZSc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHBvcnRyYWl0XG4gICAgICAgICAgICAgICAgY291bnRlci50YWxsICs9IDE7XG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIudGFsbCAlIGZyZXF1ZW5jeS50YWxsID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG11bHRpcGxpZXIgPSAyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV9oZWlnaHQgPVxuICAgICAgICAgICAgICAgICAgICAobWFzb25yeS5jb2x1bW5XaWR0aCAqXG4gICAgICAgICAgICAgICAgICAgICBtdWx0aXBsaWVyKSArXG4gICAgICAgICAgICAgICAgICAgICgobXVsdGlwbGllciA9PT0gMSkgP1xuICAgICAgICAgICAgICAgICAgICAgIDAgOiBtYXNvbnJ5Lmd1dHRlcik7XG5cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPSBtYXNvbnJ5LmNvbHVtbldpZHRoO1xuICAgICAgICAgICAgICAgIGQub3JpZW50YXRpb24gPSAncG9ydHJhaXQnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWFzb25yeV9zZXR0aW5ncyAoKSB7XG4gICAgICAgIHZhciB0b3RhbF93b3JrX3dpZHRoID0gY29udGFpbmVyX3NlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLm5vZGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAud2lkdGg7XG5cbiAgICAgICAgdmFyIG51bWJlcl9vZl9jb2x1bW5zID0gMjtcblxuICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPj0gNzY4KSB7XG4gICAgICAgICAgICBudW1iZXJfb2ZfY29sdW1ucyA9IDQ7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZ3V0dGVyID0gMDtcbiAgICAgICAgdmFyIGNvbHVtbl93aWR0aCA9ICh0b3RhbF93b3JrX3dpZHRoIC8gbnVtYmVyX29mX2NvbHVtbnMpIC1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgIChndXR0ZXIgKiAobnVtYmVyX29mX2NvbHVtbnMgLSAxKSk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGd1dHRlcjogZ3V0dGVyLFxuICAgICAgICAgICAgY29sdW1uV2lkdGg6IGNvbHVtbl93aWR0aCxcbiAgICAgICAgICAgIGNvbHVtbkRvdWJsZVdpZHRoOiBjb2x1bW5fd2lkdGggKiAyICsgZ3V0dGVyXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGY7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbGF5b3V0X2ltYWdlICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9O1xuICAgIHZhciBjb250YWluZXJfc2VsO1xuICAgIHZhciBtZXRhX3NwYWNlID0gMzU7XG4gICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgIHZhciBmcmVxdWVuY3kgPSAxNDtcbiAgICB2YXIgbWFzb25yeSA9IHtcbiAgICAgICAgZ3V0dGVyOiAwLFxuICAgICAgICBjb2x1bW5XaWR0aDogMCxcbiAgICAgICAgY29sdW1uV2lkdGhEb3VibGU6IDBcbiAgICB9O1xuXG4gICAgc2VsZi5tYXNvbnJ5ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbWFzb25yeTtcbiAgICB9O1xuXG4gICAgc2VsZi5jb250YWluZXIgPSBmdW5jdGlvbiAoXykge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb250YWluZXJfc2VsO1xuICAgICAgICBjb250YWluZXJfc2VsID0gXztcbiAgICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfTtcblxuICAgIHNlbGYuYXR0cmlidXRlcyA9IGZ1bmN0aW9uIChzZWwpIHtcbiAgICAgICAgY291bnRlciA9IDA7XG4gICAgICAgIG1hc29ucnkgPSBtYXNvbnJ5X3NldHRpbmdzKCk7XG5cbiAgICAgICAgc2VsLmVhY2goZnVuY3Rpb24gKGQsIGkpIHtcbiAgICAgICAgICAgIGlmICgoZC5jb3Zlci5vcmlnaW5hbF93aWR0aC9cbiAgICAgICAgICAgICAgICAgZC5jb3Zlci5vcmlnaW5hbF9oZWlnaHQpID5cbiAgICAgICAgICAgICAgICAxLjgpIHtcblxuICAgICAgICAgICAgICAgIGQubWFzb25yeV93aWR0aCA9IG1hc29ucnkuY29sdW1uRG91YmxlV2lkdGg7XG4gICAgICAgICAgICAgICAgZC5tYXNvbnJ5X2hlaWdodCA9XG4gICAgICAgICAgICAgICAgICAgICgoZC5tYXNvbnJ5X3dpZHRoICpcbiAgICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX2hlaWdodCkvXG4gICAgICAgICAgICAgICAgICAgICBkLmNvdmVyLm9yaWdpbmFsX3dpZHRoKSArIG1ldGFfc3BhY2U7XG5cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY291bnRlciArPSAxO1xuXG4gICAgICAgICAgICAgICAgLy8gbWFrZSBldmVyeSA1dGggb25lIGJpZy5cbiAgICAgICAgICAgICAgICBpZiAoY291bnRlciAlIGZyZXF1ZW5jeSA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPVxuICAgICAgICAgICAgICAgICAgICAgICAgbWFzb25yeS5jb2x1bW5Eb3VibGVXaWR0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkLm1hc29ucnlfd2lkdGggPSBtYXNvbnJ5LmNvbHVtbldpZHRoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkLm1hc29ucnlfaGVpZ2h0ID1cbiAgICAgICAgICAgICAgICAgICAgKChkLm1hc29ucnlfd2lkdGggKlxuICAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfaGVpZ2h0KS9cbiAgICAgICAgICAgICAgICAgICAgIGQuY292ZXIub3JpZ2luYWxfd2lkdGgpICtcbiAgICAgICAgICAgICAgICAgICAgbWV0YV9zcGFjZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIG1hc29ucnlfc2V0dGluZ3MgKCkge1xuICAgICAgICB2YXIgdG90YWxfd29ya193aWR0aCA9IGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5ub2RlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLndpZHRoO1xuXG4gICAgICAgIHZhciBudW1iZXJfb2ZfY29sdW1ucyA9IDI7XG5cbiAgICAgICAgaWYgKHdpbmRvdy5pbm5lcldpZHRoID49IDc2OCkge1xuICAgICAgICAgICAgbnVtYmVyX29mX2NvbHVtbnMgPSA0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGd1dHRlciA9IDA7XG4gICAgICAgIHZhciBjb2x1bW5fd2lkdGggPSAodG90YWxfd29ya193aWR0aCAvIG51bWJlcl9vZl9jb2x1bW5zKSAtXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAoZ3V0dGVyICogKG51bWJlcl9vZl9jb2x1bW5zIC0gMSkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBndXR0ZXI6IGd1dHRlcixcbiAgICAgICAgICAgIGNvbHVtbldpZHRoOiBjb2x1bW5fd2lkdGgsXG4gICAgICAgICAgICBjb2x1bW5Eb3VibGVXaWR0aDogY29sdW1uX3dpZHRoICogMiArIGd1dHRlclxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBzZWxmO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxpZ2h0Ym94ICgpIHtcbiAgICB2YXIgc2VsZiA9IHt9LFxuICAgICAgICBjb250YWluZXJfc2VsLFxuICAgICAgICBzZWxlY3RlZF9zZWwsXG4gICAgICAgIGJvZHlfc2VsID0gZDMuc2VsZWN0KCdib2R5Jyk7XG5cbiAgICBzZWxmLmNvbnRhaW5lciA9IGZ1bmN0aW9uIChfKSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbnRhaW5lcl9zZWw7XG4gICAgICAgIGNvbnRhaW5lcl9zZWwgPSBfO1xuICAgICAgICByZXR1cm4gc2VsZjtcbiAgICB9O1xuXG4gICAgc2VsZi5zaG93ID0gZnVuY3Rpb24gKHNlbCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY2xpY2tlZCcpO1xuICAgICAgICBjb25zb2xlLmxvZyhzZWwpO1xuICAgICAgICBpZiAoIWNvbnRhaW5lcl9zZWwpIHRocm93IFwiTGlnaHRib3guIFJlcXVpcmVzIGNvbnRhaW5lci5cIjtcblxuICAgICAgICBzZWxlY3RlZF9zZWwgPSBzZWw7XG5cbiAgICAgICAgdmFyIGRhdGEgPSBzZWwuZGF0dW0oKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfZ3JpZF9zZWwgPSBjb250YWluZXJfc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dyaWQnKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfbWV0YV9zZWwgPVxuICAgICAgICAgICAgbGlnaHRib3hfZ3JpZF9zZWxcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhIGNvbC1wZXJjZW50LTItMTAnKTtcblxuICAgICAgICB2YXIgbGlnaHRib3hfd29ya19zZWwgPVxuICAgICAgICAgICAgbGlnaHRib3hfZ3JpZF9zZWxcbiAgICAgICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsXG4gICAgICAgICAgICAgICAgICAgICAgJ2xpZ2h0Ym94LXdvcmsgJytcbiAgICAgICAgICAgICAgICAgICAgICAnb2Zmc2V0LXBlcmNlbnQtMi0xMCAnK1xuICAgICAgICAgICAgICAgICAgICAgICdjb2wtcGVyY2VudC04LTEwJyk7XG5cbiAgICAgICAgbGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2gyJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC10aXRsZScpXG4gICAgICAgICAgICAudGV4dChkYXRhLnByb2plY3RfbmFtZSk7XG5cbiAgICAgICAgbGlnaHRib3hfd29ya19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LWRlc2NyaXB0aW9uJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEuZGVzY3JpcHRpb24pO1xuXG4gICAgICAgIGxpZ2h0Ym94X3dvcmtfc2VsLnNlbGVjdEFsbCgnLnBpZWNlJylcbiAgICAgICAgICAgIC5kYXRhKGRhdGEubW9kdWxlcylcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdkaXYnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BpZWNlJylcbiAgICAgICAgICAgIC5hcHBlbmQoJ2ltZycpXG4gICAgICAgICAgICAuYXR0cignc3JjJywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5zaXplcy5tYXhfMTI0MCA/IGQuc2l6ZXMubWF4XzEyNDAgOiBkLnNyYztcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBsaWdodGJveF9tZXRhX2luZm9fc2VsID0gbGlnaHRib3hfbWV0YV9zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ2RpdicpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvJyk7XG5cbiAgICAgICAgbGlnaHRib3hfbWV0YV9pbmZvX3NlbFxuICAgICAgICAgICAgLmFwcGVuZCgncCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnbGlnaHRib3gtbWV0YS1pbmZvLS1zdHVkZW50LW5hbWUnKVxuICAgICAgICAgICAgLnRleHQoZGF0YS5zdHVkZW50X25hbWUpO1xuXG4gICAgICAgIGxpZ2h0Ym94X21ldGFfaW5mb19zZWxcbiAgICAgICAgICAgIC5hcHBlbmQoJ3AnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2xpZ2h0Ym94LW1ldGEtaW5mby0tcmlzZC1wcm9ncmFtJylcbiAgICAgICAgICAgIC50ZXh0KGRhdGEucmlzZF9wcm9ncmFtKTtcblxuICAgICAgICBsaWdodGJveF9tZXRhX2luZm9fc2VsXG4gICAgICAgICAgICAuYXBwZW5kKCdwJylcbiAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsICdsaWdodGJveC1tZXRhLWluZm8tLXBlcnNvbmFsLWxpbmsnKVxuICAgICAgICAgICAgLmFwcGVuZCgnYScpXG4gICAgICAgICAgICAuYXR0cignaHJlZicsIGRhdGEudXJsKVxuICAgICAgICAgICAgLnRleHQoJ0JlaGFuY2UnKTtcblxuICAgICAgICBjb250YWluZXJfc2VsLmNsYXNzZWQoJ2FjdGl2ZScsIHRydWUpO1xuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCduby1zY3JvbGwnLCB0cnVlKTtcblxuICAgICAgICBjb250YWluZXJfc2VsLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNsb3NlKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBjbG9zZSAoKSB7XG4gICAgICAgIGNvbnRhaW5lcl9zZWxcbiAgICAgICAgICAgIC5jbGFzc2VkKCdhY3RpdmUnLCBmYWxzZSlcbiAgICAgICAgICAgIC5odG1sKCcnKTtcblxuICAgICAgICBib2R5X3NlbC5jbGFzc2VkKCduby1zY3JvbGwnLCBmYWxzZSk7XG5cbiAgICAgICAgY29udGFpbmVyX3NlbC5vbignY2xpY2snLCBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZjtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzY3JvbGx0byAoYXJncykge1xuICAgIHZhciBvcHRpb25zID0gYXJncyB8fCB7fTtcbiAgICBvcHRpb25zLmR1cmF0aW9uID0gYXJncy5kdXJhdGlvbiB8fCAyMDAwO1xuXG4gICAgZnVuY3Rpb24gc2Nyb2xsX3R3ZWVuIChvZmZzZXQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpID0gZDMuaW50ZXJwb2xhdGVOdW1iZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cucGFnZVlPZmZzZXQgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgb2Zmc2V0KTtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAodCkge1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvKDAsIGkodCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKG9mZnNldCkge1xuICAgICAgICBkMy50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbihvcHRpb25zLmR1cmF0aW9uKVxuICAgICAgICAgICAgLnR3ZWVuKCdzY3JvbGwnLCBzY3JvbGxfdHdlZW4ob2Zmc2V0KSk7XG4gICAgfTtcbn07IiwiLy8gcmVxdWlyZXMgZDMuc2NhbGUub3JkaW5hbFxubW9kdWxlLmV4cG9ydHMgPSB0cmFuc2Zvcm07XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybSAoKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICB2YXIgZm9ybWF0dGVkID0gZm9ybWF0X2RhdGFfY292ZXJfd2l0aF9tb2R1bGVzKGlucHV0KTtcbiAgICAgICAgcmV0dXJuIHNodWZmbGUoZm9ybWF0dGVkKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBmb3JtYXRfZGF0YV9jb3Zlcl93aXRoX21vZHVsZXMgKGRhdGEpIHtcblxuICAgIHZhciBmb3JtYXR0ZWRfZGF0YSA9IFtdO1xuXG4gICAgLy8gZGV0ZXJtaW5lIHRoZSBleHRlbnQgb2Ygd2lkdGhzXG4gICAgdmFyIGFsbF9tb2R1bGVzID0gW107XG4gICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgIGQuZGV0YWlscy5tb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1kLCBtaSkge1xuICAgICAgICAgICAgaWYgKG1kLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgICAgICBhbGxfbW9kdWxlcy5wdXNoKG1kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBzZXQgYSBzY2FsZSBmb3IgbWFwcGluZ1xuICAgIC8vIHdpZHRoIHRoZSBhbiBpbWFnZSB0byB0aGVcbiAgICAvLyB3aWR0aCBvZiB0aGUgbWFzb25pYyB2ZXJzaW9uXG4gICAgdmFyIHdpZHRoX2V4dGVudCA9IGQzLmV4dGVudChhbGxfbW9kdWxlcywgZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkLndpZHRoOyB9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgY29uc29sZS5sb2coJ3dpZHRoX2V4dGVudCcpO1xuICAgIGNvbnNvbGUubG9nKHdpZHRoX2V4dGVudCk7XG4gICAgdmFyIHdpZHRocyA9IGQzLnNjYWxlLm9yZGluYWwoKVxuICAgICAgICAuZG9tYWluKHdpZHRoX2V4dGVudClcbiAgICAgICAgLnJhbmdlKFsxMDAsIDIwMCwgNDAwXSk7XG4gICAgLy8gdmFyIHdpZHRocyA9IGQzLnNjYWxlLmlkZW50aXR5KClcbiAgICAvLyAgICAgLmRvbWFpbih3aWR0aF9leHRlbnQpO1xuXG4gICAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChkLCBpKSB7XG4gICAgICAgIHZhciBtb2R1bGVzX3RvX2luY2x1ZGUgPSBbXTtcbiAgICAgICAgZC5kZXRhaWxzLm1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobWQsIG1pKSB7XG4gICAgICAgICAgICBpZiAobWQudHlwZSA9PT0gJ2ltYWdlJykge1xuICAgICAgICAgICAgICAgIG1vZHVsZXNfdG9faW5jbHVkZS5wdXNoKG1kKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gcmFuZG9tX2NvdmVyX29wdGlvblxuICAgICAgICB2YXIgcmFuZG9tX21vZHVsZSA9XG4gICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGVbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2R1bGVzX3RvX2luY2x1ZGUubGVuZ3RoKV07XG5cbiAgICAgICAgdmFyIHJhbmRvbV9jb3ZlciA9IHtcbiAgICAgICAgICAgIG9yaWdpbmFsX3dpZHRoOiArcmFuZG9tX21vZHVsZS53aWR0aCxcbiAgICAgICAgICAgIG9yaWdpbmFsX2hlaWdodDogK3JhbmRvbV9tb2R1bGUuaGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IHdpZHRocyhyYW5kb21fbW9kdWxlLndpZHRoKSxcbiAgICAgICAgICAgIHNyYzogcmFuZG9tX21vZHVsZS5zcmNcbiAgICAgICAgfTtcbiAgICAgICAgcmFuZG9tX2NvdmVyLmhlaWdodCA9IChyYW5kb21fY292ZXIud2lkdGgqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZS5oZWlnaHQpL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmFuZG9tX21vZHVsZS53aWR0aDtcblxuICAgICAgICBmb3JtYXR0ZWRfZGF0YS5wdXNoKHtcbiAgICAgICAgICAgICdwcm9qZWN0X25hbWUnOiBkLm5hbWUsXG4gICAgICAgICAgICAnc3R1ZGVudF9uYW1lJzogZC5vd25lcnNbMF0uZGlzcGxheV9uYW1lLFxuICAgICAgICAgICAgJ3Jpc2RfcHJvZ3JhbSc6IGQucmlzZF9wcm9ncmFtLFxuICAgICAgICAgICAgJ3Jpc2RfcHJvZ3JhbV9jbGFzcyc6IGVzY2FwZV9kZXBhcnRtZW50KGQucmlzZF9wcm9ncmFtKSxcbiAgICAgICAgICAgICdtb2R1bGVzJzogbW9kdWxlc190b19pbmNsdWRlLFxuICAgICAgICAgICAgJ2NvdmVyJzogcmFuZG9tX2NvdmVyLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IGQuZGV0YWlscy5kZXNjcmlwdGlvbixcbiAgICAgICAgICAgIGF2YXRhcjogZC5vd25lcnNbMF0uaW1hZ2VzWycxMzgnXSxcbiAgICAgICAgICAgIHVybDogZC5vd25lcnNbMF0udXJsXG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIGZvcm1hdHRlZF9kYXRhO1xufVxuXG5mdW5jdGlvbiBzaHVmZmxlIChvKSB7XG4gICAgZm9yKHZhciBqLCB4LCBpID0gby5sZW5ndGg7XG4gICAgICAgIGk7XG4gICAgICAgIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBpKSxcbiAgICAgICAgeCA9IG9bLS1pXSwgb1tpXSA9IG9bal0sIG9bal0gPSB4KTtcbiAgICByZXR1cm4gbztcbn1cblxuZnVuY3Rpb24gZXNjYXBlX2RlcGFydG1lbnQoZCkge1xuICAgIHJldHVybiBkLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgnICcsICctJyk7XG59Il19
