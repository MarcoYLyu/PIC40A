#!/usr/local/bin/php
<?php
    ob_start();
    session_save_path(dirname(realpath(__FILE__)) . '/sessions/');
    session_name('HW5');
    session_start();
?>

<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Welcome</title>
    </head>
    <body>
        <main>
            <?php
                if (isset($_SESSION['loggedin']) and $_SESSION['loggedin']) {
                    // if the user has logged in
                    echo '<p>Welcome. Your email address is ' . $_SESSION['account'];
                    echo '<p>Here is a list of all registered addresses: ';
                    foreach ($_SESSION['database'] as $keyItr => $val) { // iterate through every email
                        echo $keyItr . ' ';
                    }
                    echo '</p>';
                    echo '<form action="logout.php"><input type="submit" name="log out" value="log out"/></form>';
                } else {
                    // the user has not logged in but managed to visit the website
                    echo '<p>You are not authorized to see this page. Please log in first.</p>';
                }
            ?>
        </main>
    </body>
</html>