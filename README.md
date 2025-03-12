This is a re-implementation of the filterable list app from the official React docs:
https://react.dev/learn/thinking-in-react#step-5-add-inverse-data-flow

This app uses Preact + HTM + JSDoc instead of React + TSX + TypeScript. The entire script can be run as is, without any transpilation. This is fully nobuild.
Should you do this in prod? Probably not. With HTM, the template strings are parsed at runtime instead of compile time. Not very efficient for the client.
Also, shipping code that's not been minified or at least stripped of whitespaces and comments isn't respectful of bandwidth in general.
Maybe you're a FOSS fanatic and want your code to be as transparent as possible.
Or maybe you think it's cool that modern JS can run what is essentially JSX directly on the browser. I know I do!

Here's a live version of the app:
https://nimble-smakager-14389f.netlify.app/

I encourage you to inpect that page's source code and marvel at client-side JSX!

Check out HTM: https://github.com/developit/htm
