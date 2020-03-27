#!/usr/local/bin/php
<?php
    ob_start();         // remove duplicate sessions
    session_save_path(dirname(realpath(__FILE__)) . "/sessions/"); // set the directory of the sessions
    session_name('final'); // define the session name to be final
    session_start(); // start the session
    $_SESSION['loggedin'] = false; // the initial log in status is false

    if (isset($_POST['login'])) { // if the user wants to log in
        $username = $_POST['username']; // gets the username user inputs
        $password = $_POST['password']; // gets the password user inputs
        $mydb = new SQLite3('database.db'); // opens the database
        
        $run = $mydb->query("SELECT password FROM register WHERE username='$username'"); // checks if the username exists
        $jump = false; // whether we should jump to timer.php
        if ($run) { // if the command is valid
            while ($row = $run->fetchArray()) { // iterate through all passwords found (there should only be one)
                if ($row['count'] !== 0) { // if we find a username
                    $jump = ($row['password'] === $password); // checks if the password matches
                }
            }
        }
        if ($jump) { // if the username and password matches
            $_SESSION['loggedin'] = true; // we have logged in
            header('Location: timer.php'); // jump to timer.php
        } else {
            ?>
            <script>
                alert('Invalid username and password');
            </script>
            <?php
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Login</title>
    </head>

    <body>
        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="POST">
            <label for="username">Username: </label> <input type="text" id="username" name="username" required> <br>
            <label for="password">Password: </label> <input type="password" id="password" name="password" required> <br>
            <input type="submit" name="login" value="Login">
        </form>
    </body>
</html>