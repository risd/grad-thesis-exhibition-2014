module.exports = function fullscreen () {
    var self = {},
        selection,
        img_width = 0,
        img_height = 0;

    self.selection = function (_) {
        if (!arguments.length) return selection;
        selection = _;

        selection.each(function (d, i) {
            this.onload = function () {
                if (img_height < this.naturalHeight) {
                    img_height = this.height;
                }
                if (img_width < this.naturalWidth) {
                    img_width = this.width;
                }
                make_full_screen();
            };
            
        });

        return self;
    };
    self.resize = function () {
        make_full_screen();
        return self;
    };

    self.setup = function () {
        d3.select(window)
            .on('resize.fullscreen', function () {
                make_full_screen();
            });

        return self;
    };


    function make_full_screen () {
        if (!selection) throw "full screen requires a selection";

        var width = window.innerWidth,
            height = window.innerHeight;

        if (height > width) {
            selection
                .style('width',
                    ( width * (img_width/img_height)) +'px');
            selection.style('height', '100%');
        } else {
            selection
                .style('height',
                    ( height * (img_width/img_height)) +'px');
            selection.style('width', '100%');
        }
    }
    return self;
};