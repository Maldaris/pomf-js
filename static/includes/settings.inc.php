<?php

/**
 * Copyright (c) 2013, 2014 Peter Lejeck <peter.lejeck@gmail.com>
 * Copyright (c) 2015 cenci0 <alchimist94@gmail.com>
 * Copyright (c) 2015 the Pantsu.cat developers <hostmaster@pantsu.cat>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// PDO socket
// mysql.sock path can be different from /tmp/mysql.sock, see /etc/my.cnf
define('POMF_DB_CONN', 'mysql:unix_socket=/tmp/mysql.sock;dbname=pomf');
// MySQL user and password
define('POMF_DB_USER', 'pomf');
define('POMF_DB_PASS', '***');

// Root location of files
define('POMF_FILES_ROOT', '/mnt/pantsu/http/files/');
// Maximum number of iterations while generating a new filename
define('POMF_FILES_RETRIES', 15);
// Number of random characters to use in a new filename
define('POMF_FILES_LENGTH', 6);
// URL to prepend to output (include trailing slash)
define('POMF_URL', 'https://i.pantsu.cat/');

$doubledots = array_map('strrev', array(
    'tar.gz',
    'tar.bz',
    'tar.bz2',
    'tar.xz',
    'user.js',
));
