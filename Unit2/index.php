#!/usr/local/bin/php

<!-- PIC username: marcolyu -->
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Unit Test 2</title>
    </head>

    <body>
        <form action="<?php echo $_SERVER['PHP_SELF']?>" method="post">
            <label for="name">Name:</label> <input id="name" type="text" name="name" value="">
            <label for="time">Time(s):</label> <input id="time" type="text" name="time" value="">
            <input type="submit" name="Record" value="Record">
        </form>

        <form action="<?php echo $_SERVER['PHP_SELF']?>" method="post">
            <label for="email">Email:</label> <input id="email" type="email" name="email" value="">
            <label for="name2">Name: </label> <input id="name2" type="text" name="name2" value="">
            <input type="submit" name="Send" value="Send">
        </form>
    </body>

    <?php
        if (isset($_POST['Record'])) {
            $name = $_POST['name'];
            $time = $_POST['time'];

            $fp = fopen("times.txt", "a+");
            fwrite($fp, "$name\t$time\n");
            fclose($fp);
        }

        if (isset($_POST['Send'])) {
            $name = $_POST['name2'];
            $email = $_POST['email'];
            $emailBody = "";
            $sum = 0;
            $count = 0;

            $fp = fopen("times.txt", "r") or die("cannot open the file");
            while (!feof($fp)) {
                $line = fgets($fp);
                $entries = explode("\t", $line);
                $sum += (float)$entries[1];
                if ($entries[0] === $name) {
                    $emailBody .= $name . ": " . $entries[1] . "\n";
                }
                if (strlen($line) !== 0) {
                    $count += 1;
                }
            }
            $body = $emailBody . "Average: " . (int)($sum / $count);
            mail($email, "Data Query", $body);
        }
    ?>
</html>