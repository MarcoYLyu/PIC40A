#!/usr/local/bin/php
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>Validation</title>
    </head>
    <body>
        <?php
            $fp = fopen('validation.txt', 'r') or die('cannot open file'); // open the file in read mode
            $randomNum = $_GET['token']; // get the hashed token from the GET request
            $email = $_GET['email']; // get the email from the GET request (the prompt does not say we need to hash it)
            $hashPassword = null; // set the hashed password initially to be zero.
            $lines = ''; // lines to be written after the validation
            $foundNum = false; // if we have found the token
            while (!feof($fp)) {
                // if we can read the next lien
                $temp = fgets($fp); // get the line
                if ($temp === ' ') { // if the line is empty
                    continue; // continue
                }
                $line = explode(' ', $temp); // separate the line into two parts
                if ($randomNum === $line[0]) { // if the token matches
                    $foundNum = true; // we have found the token
                    $hashPassword = $line[1]; // set the password to be the second item
                } else {
                    $lines .= $line[0] . ' ' . $line[1] . "\n"; // add the line to the lines
                }
            }
            fclose($fp); // close the file pointer

            if ($foundNum) { // if we have found the token
                $fp = fopen('validation.txt', 'w') or die('cannot open file'); // open the file validation.txt
                if (strlen($lines) !== 0) { // if we have lines to be written
                    fwrite($fp, $lines); // add the lines to the file
                }
                fclose($fp); // close the file pointer
            }

            if ($hashPassword !== null) { // if the hashPassword is not empty
                $fp2 = fopen('database.txt', 'a+'); // open the file in append mode
                fwrite($fp2, $email . ' ' . $hashPassword . "\n"); // write it to the database
                fclose($fp2); // close the file pointer
            }
            echo '<p>You are registered!</p>';
        ?>
    </body>
</html>