# s2css
compile scss file to css , and pure js.

# install
```
  npm install s2css
```

# command use

#### compile src/*.scss to dest/*.css
```
s2css src dest
```

#### watch src/*.scss , and compile to dest/*.css
```
s2css src -w dest
```

#### compile src/a.scss to dest/a.css
```
s2css src/a.scss dest
```

#### compile src/a.scss to dest/b.css
```
s2css src/a.scss dest/b.css
```

# code use
```
  var s2css = require("s2css");

  // src and dest is folder
  // auto watch src , when src/xxx.scss file is changed,
  // then compile src/xxx.scss to dest/xxx.css.
  s2css("src","dest");  
```  
