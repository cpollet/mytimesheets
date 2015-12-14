'use strict';

/**
 * Usage:
 *
 * import history from 'history';
 *
 * history.pushState()...
 *
 * source: https://github.com/rackt/react-router/blob/master/docs/guides/advanced/NavigatingOutsideOfComponents.md
 */

import createBrowserHistory from 'history/lib/createBrowserHistory'

export default createBrowserHistory()
