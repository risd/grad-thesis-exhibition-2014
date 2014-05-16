module.exports = function router (context) {
    var self = {};
    var previous_type = 'index';

    context.hash.dispatch
        .on('change.router', function (d) {
            set(d);
        });

    self.initialize = function (_) {
        set(context.hash.is());
        return self;
    };

    function set (d) {
        if (d.type === 'index') {
            if (previous_type === 'overlay') {
                // close about overlay
                context.nav.dispatch.close();
            } else if (previous_type === 'project') {
                // close lightbox
                context.lightbox.dispatch.close();
            }
        } else if (d.type === 'overlay') {
            // activate overlay
            context.nav.dispatch.open();
        } else if (d.type === 'project') {
            // activate lightbox
            context.lightbox.dispatch.open(d);
        }

        previous_type = d.type;
    }

    return self;
};