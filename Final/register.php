#!/usr/local/bin/php
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Register</title>
    </head>

    <body>
        <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
            <label for="username">Username: </label> <input type="text" id="username" name="username" required> <br>
            <label for="password">Password: </label> <input type="password" id="password" name="password" required> <br>
            <label for="email">Email: </label> <input type="email" id="email" name="email"> <br>
            <input type="submit" name="register" value="Register">
        </form>

        <p>
            <?php
            if (isset($_POST['register'])) { // if the user wants to register
                $email = $_POST['email']; // gets the email
                $username = $_POST['username']; // gets the username
                $password = $_POST['password']; // gets the password

                try { // attempts to open the database
                    $mydb = new SQLite3('database.db'); // opens the database
                    $directory = 'https://' . $_SERVER['HTTP_HOST'] .dirname($_SERVER['PHP_SELF']); // sets the current directory
                    $createCommand = 'CREATE TABLE IF NOT EXISTS validation(token TEXT, username TEXT, password TEXT, email TEXT);'; // creates the table for accounts to be validated
                    $createStatus = $mydb->query($createCommand); // runs the command
                    
                    // the directions for the final do not tell us what if an account already exists

                    if ($createStatus) { // if we successfully creates the table
                        $token = hash('md5', rand(1, 100000)); // gets a random number from 1 to 100000
                        $insertionCommand = "INSERT INTO validation (token, username, password, email) VALUES ('$token', '$username', '$password', '$email');"; // inserts the information
                        $run = $mydb->query($insertionCommand); // runs the command above
                    }

                    $mydb->close(); // closes the database connection
                    $registerDirectory = $directory . "/validate.php?token=$token"; // gets the url to be sent
                    mail($email, 'Validate', "Validate here: $registerDirectory"); // send the url
                    
                    echo 'Validation sent to your email address.'; // tells the user that it has been sent
                }
                catch (Exception $ex) { // if there is an exception
                    echo $ex->getMessage(); // tell the user what the exception is
                }
            }
            ?>
        </p>
    </body>
</html>