#!/usr/local/bin/php
<?php
    ob_start();
    session_save_path(dirname(realpath(__FILE__)) . "/sessions/");
    session_name('HW5');
    session_start();
    $_SESSION['loggedin'] = false;
    $_SESSION['database'] = array();
    $_SESSION['account'] = NULL;

    /**
     * Reading the data into the database stored in Session
     * 
     * @param String $filename the name of the file to be read
     * 
     * @return void
     */
    function readDataIn($filename) {
        $fp = fopen($filename, 'r') or die('cannot open the file'); // open the file in read mode and err if not found
        while (!feof($fp)) {
            // while we can read the next line
            $temp = explode(' ', fgets($fp)); // separate the line into two parts
            $_SESSION['database'][$temp[0]] = $temp[1]; // email -> account
        }
        fclose($fp); // close the file pointer
    }
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>HW5</title>
    </head>

    <body>
        <main>
            <form action="<?php echo $_SERVER['PHP_SELF']; ?>" method="post">
                <fieldset>
                    <label for="email">email address: </label> 
                    <input type="email" id="email" name="email" value="" required> <br />
                    <label for="password">password (&ge; 6 characters letters or digits):</label>
                    <input type="password" id="password" name="password" value="" pattern="[A-Za-z0-9]{6}[A-Za-z0-9]*" title="6 character letters or digits" required>
                </fieldset>
                <input type="submit" name="register" value="register">
                <input type="submit" name="login" value="login">
            </form>
            <?php
                $account = $_POST['email']; // store the email address the user enters
                $password = $_POST['password']; // store the password the user enters
                $_SESSION['account'] = $account; // stores the email address
                $directory = 'https://' . $_SERVER['HTTP_HOST'] .dirname($_SERVER['PHP_SELF']); // find the address of the website

                if (isset($_POST['register'])) {
                    // If the user chooses to register
                    readDataIn('database.txt'); // read database.txt into a HashMap
                    if (isset($_SESSION['database']) and array_key_exists($account, $_SESSION['database'])) {
                        // If the email has been registered
                        echo "<p>Already registered, Please log in/validate.</p>";
                    } else {
                        $randomNum = rand(100, 50000); // generate a random token between 100 and 50000
                        $hashRandomNum = hash('sha1', $randomNum); // hash the token
                        $hashPassword = hash('sha1', $password); // hash the password

                        $fp = fopen('validation.txt', 'a+'); // open the validation.txt in append mode
                        fwrite($fp, $hashRandomNum . ' ' . $hashPassword . "\n"); // write the hashed token and password to it
                        fclose($fp); // close the file pointer

                        $registerAddress = $directory . "/validate.php?token=$hashRandomNum&email=$account"; // validation url.
                        mail($account, 'validation', "Validate by clicking here: $registerAddress"); // mail the validation url to the email address
                        echo "<p>A validation email has been sent to $account. Please follow the link.</p>";
                    }
                }
                if (isset($_POST['login'])) {
                    // If the user chooses to log in.
                    readDataIn('database.txt'); // read database.txt into a HashMap
                    if (isset($_SESSION['database']) and array_key_exists($account, $_SESSION['database'])) {
                        // if the account exists
                        if (hash('sha1', $password) === trim($_SESSION['database'][$account])) {
                            // if the password is correct
                            $_SESSION['loggedin'] = true; // log in successfully
                            header('Location: welcome.php'); // jump to the welcome page
                        } else {
                            // Wrong password
                            echo '<p>Your password is invalid.</p>';
                        }
                    } else {
                        // the account does not exists 
                        echo '<p>No such email address. Please register or validate.</p>';
                    }
                }
            ?>
        </main>
    </body>
</html>