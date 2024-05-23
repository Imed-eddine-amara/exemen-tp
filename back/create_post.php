<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "site";


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$title = $_POST['title'];
$post_text = $_POST['post_text'];
$category = $_POST['category'];
$user_id = $_POST['user_id'];

$image = null;
if (isset($_FILES['image']) && $_FILES['image']['size'] > 0) {
    $image = file_get_contents($_FILES['image']['tmp_name']);
}

$stmt = $conn->prepare("INSERT INTO posts (user_id, title, post_text, category, image) VALUES (?, ?, ?, ?, ?)");
$stmt->bind_param("issss", $user_id, $title, $post_text, $category, $image);

if ($stmt->execute()) {
    echo "Post created successfully";
} else {
    echo "Error: " . $stmt->error;
}

$stmt->close();
$conn->close();
?>
