#!/usr/local/bin/php
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Validation</title>
    </head>
    <body>
        <?php
            $hashToken = trim($_GET['token']); // gets the token from the url
            try { // tries to open the database
                $mydb = new SQLite3('database.db'); // opens the database
                $searchCommand = "SELECT username, password, email FROM validation WHERE token='$hashToken';"; // search the database
                $createCommand = "CREATE TABLE IF NOT EXISTS register(username TEXT, password TEXT, email TEXT);"; // creates the table if not exists 
                $temp = $mydb->query($createCommand); // run the command
                $run = $mydb->query($searchCommand); // run the command
    
                if ($run) { // the command is successfully run
                    while ($row = $run->fetchArray()) { // iterate through every account that matches
                        $username = $row['username']; // gets the username
                        $password = $row['password']; // gets the password
                        $email = $row['email']; // gets the email
                        $insertCommand = "INSERT INTO register (username, password, email) VALUES ('$username', '$password', '$email');"; // puts them in register table
                        $deleteCommand = "DELETE FROM validation WHERE token='$hashToken'"; // delete them from the validation table
                        $mydb->query($insertCommand); // run the command
                        $mydb->query($deleteCommand); // run the command
                        echo 'Validated'; // tells users that their accounts are validated.
                    }
                }
                $mydb->close(); // closes the database connection
            }
            catch (Exception $ex) { // if there is an exception
                echo $ex->getMessage(); // tell the user what the exception is
            }
        ?>
    </body>
</html>