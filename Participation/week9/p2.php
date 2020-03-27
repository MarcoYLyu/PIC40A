#!/usr/local/bin/php

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
    </head>

    <body>
        <form action="<?php echo $_SERVER['PHP_SELF']?>" method="post">
            Filename: <input type="text" name="filename" value=""> <br>
            Input: <input type="text" name="text" value=""> <br>
            <input type="submit" name="save" value="save">
            <input type="submit" name="output" value="output">
        </form>

        <?php
            if (isset($_POST['save'])) {
                $fp = fopen(trim($_POST['filename']), "w+");
                fwrite($fp, $_POST['text']);
                fclose($fp);
            }
            if (isset($_POST['output'])) {
                $fp = fopen($_POST['filename'], "r") or die("cannot open the file");
                while (!feof($fp)) {
                    echo fgets($fp);
                }
                fclose($fp);
            }
        ?>
    </body>
</html>