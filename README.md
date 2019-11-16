# Pomf-JS


Pomf-JS is a simple file uploading and sharing platform.

Forked from [pomf/pomf](https://github.com/pomf/pomf) because holy fuck I hate PHP and everything related to configuring it.


## Features

- One click uploading, no registration required
- A minimal, modern web interface
- Drag & drop supported
- Upload API with multiple response choices
  - JSON
  - HTML
  - Text
  - CSV
- Supports [ShareX](https://getsharex.com/) and other screenshot tools

## Requirements

* NodeJS LTS
* Nginx
* Sqlite3

## Install

For the purposes of this guide, we won't cover setting up Nginx, NodeJS, Sqlite3,
Node, or Yarn. So we'll just assume you already have them all running well.

### Compiling

First you must get a copy of the pomf code.  To do so, clone this git repo.
```bash
git clone https://github.com/Maldaris/pomf-js
```

Assuming you already have Node and NPM working, compilation is easy.

Run the following commands to do so.
```bash
cd pomf-js/
make
#
make install
```
OR
```bash
make install DESTDIR=/desired/path/for/site
```
After this, the pomf site is now compressed and set up inside `dist/`, or, if specified, `DESTDIR`.

## Configuring

Front-end related settings, such as the name of the site, and maximum allowable
file size, are found in `dist.json`.  Changes made here will
only take effect after rebuilding the site pages.  This may be done by running
`make` from the root of the site directory.


If you intend to allow uploading files larger than 2 MB, you may also need to
increase POST size limits in nginx. The configuration
option for nginx webserver is `client_max_body_size`.

Example nginx configs can be found in confs/.

## Setting up SQLite

We need to create the SQLite database before it may be used by pomf.
Fortunately, this is incredibly simple.  

First create a directory for the database, e.g. `mkdir /var/db/pomf`.  
Then, create a new SQLite database from the schema, e.g. `sqlite3 /var/db/pomf/pomf.sq3 -init /home/pomf/sqlite_schema.sql`.
Then, finally, ensure the permissions are correct, e.g.
```bash
chown nginx:nginx /var/db/pomf
chmod 0750 /var/db/pomf
chmod 0640 /var/db/pomf/pomf.sq3
```

*NOTE: The directory where the SQLite database is stored, must be writable by the web server user*


## Getting help

Issues here will be addressed at the earliest convenience of the maintainer. Merge requests will receive priority.

## Contributing

We'd really like if you can take some time to make sure your coding style is
consistent with the project. Pomf-JS [Airbnb JavaScript
(ES5)](https://github.com/airbnb/javascript/tree/es5-deprecated/es5) (`airbnb/legacy`)
coding style guides. We use ESLint to enforce these standards.

You can also help by sending us feature requests or writing documentation and
tests.

Thanks!

## Credits

Pomf was created by Eric Johansson and Peter Lejeck for
[Pomf.se](http://pomf.se/). The software is currently maintained by the
community.

## License

Pomf is free software, and is released under the terms of the Expat license. See
`LICENSE`.
