# make-mobile
Chrome extension to use iphone user agent on a per site basis.

For laptops with small screens, the sidebars of websites often
take up too much screen space. This extension forces Chrome to
use the iPhone's user agent so that sites server up pages that
are friendlier to small screens.

Options:
- Uses the mobile user agent on all sites except for those in
 the mobile blacklist (set black_list_mode = true).
- Only change the user agent for specific sites
  (set black_list_mode = false)
Notes: This extension also removes referer headers (easier than
writinganother extension)

You can see for yourself that the extension is working by going
to [https://httpbin.org/headers](https://httpbin.org/headers)
