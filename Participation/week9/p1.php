#!/usr/local/bin/php
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8" />
        <title>Participation</title>
    </head>

    <body>
        <form action='<?php echo $_SERVER['PHP_SELF']; ?>' method="post">
            <fieldset>
                <label for="subject">Subject:</label> <input type="text" id="subject" name="subject"> <br>
                <label for="message">Message:</label> <input type="textarea" id="message" name="message"> <br>
                <label for="email">Email: </label> <input type="email" id="email" name="email"> <br>
                <input type="submit" name="submit" value="Submit">
            </fieldset>
        </form>
    </body>
</html>

<?php
    $email = $_POST["email"];
    $subject = $_POST["subject"];
    $message = $_POST["message"];
    if ($email) {
        mail($email, $subject, $message);
    }
?>
