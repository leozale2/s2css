# express-scss
express middleware compile scss file to css , and pure js.

# install
  npm install s2css

# use
```
  var s2css = require("s2css");

  // src and dest is folder
  // auto watch src , when src/xxx.scss file is changed,
  // then compile src/xxx.scss to dest/xxx.css.
  s2css("src","dest");  
```  
