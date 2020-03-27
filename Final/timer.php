#!/usr/local/bin/php
<?php
    ob_start();         // remove duplicate sessions
    session_save_path(dirname(realpath(__FILE__)) . "/sessions/"); // set the directory of the sessions
    session_name('final'); // define the session name to be final
    session_start(); // start the session
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Timer</title>
        <link rel="stylesheet" type="text/css" href="page.css" />
        <script src="page.js" defer></script>
    </head>

    <body>
        <?php
            if ($_SESSION['loggedin']) { // if the user has logged in
                ?>
                <form id="controller">
                    <label for="period">Period: </label> <input type="number" id="period" name="period" value=""> <br>
                    <input type="button" name="start" value="Start" onclick="myStart();">
                    <input type="button" name="stop" value="Stop" onclick="myStop();">
                </form>

                <div id="playground">

                </div>
                <?php
            } else { // if the user has not logged in.
                ?>
                <div id="controller">
                    Not Logged In!
                </div>
                <?php
            }
        ?>
    </body>
</html>