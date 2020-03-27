#!/usr/local/bin/php
<?php
    ob_start();
    session_save_path(dirname(realpath(__FILE__)) . '/sessions/');
    session_name('HW5'); // get the session HW5
    session_start(); // start the session

    $_SESSION['loggedin'] = false; // set the log-in status to be false
    session_destroy();
    header('Location: index.php'); // jump back to the index page.
?>