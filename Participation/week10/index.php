#!/usr/local/bin/php
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Participation Question</title>
    </head>

    <body>
        <form enctype="multipart/form-data" action="<?php echo $_SERVER['PHP_SELF']?>" method="POST">
            <label for="name">Name: </label>
            <input id="name" type="text" name="name" val="">
            <input type="hidden" name="MAX_FILE_SIZE" value="1000000">
            <input type="file" name="file">
            <input type="submit" name="upload" value="Upload">
            <input type="submit" name="display" value="Display">
        </form>

        <figure>
            <?php
                if (isset($_POST['upload'])) {

                    $db = new SQLite3('pics.db');
                    $name = $_POST['name'];
                    $image = file_get_contents($_FILES['file']['tmp_name']);
                    $sql = "
                    CREATE TABLE IF NOT EXISTS picture
                    (ID     INIT    PRIMARY KEY     NOT NULL,
                     name               TEXT    NOT NULL,
                     file       BLOB    NOT NULL);

                    INSERT INTO PICTURE (name, file)
                    VALUES ('$name', '$image');";

                    $ret = $db->exec($sql);
                    $db->close();
                }

                if (isset($_POST['display'])) {
                    $db = new SQLite3('pics.db');
                    $name = $_POST['name'];
                    $sql = "
                    SELECT name FROM picture;
                    ";
                    $results = $db->query($sql);
                    while ($row = $results->fetchArray()) {
                        $file = $row['FILE'];
                        echo "<img src= $file>";
                    }
                }
            ?>
        </figure>
    </body>
</html>
