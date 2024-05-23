<?php

$servername = "localhost";
$username = "root";
$password = "";
$database = "site";


$conn = new mysqli($servername, $username, $password, $database);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$category = isset($_GET["category"]) ? $_GET["category"] : null;

if ($category) {
    $sql = "SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id WHERE p.category = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $category);
} else {
    $sql = "SELECT p.*, u.username FROM posts p JOIN users u ON p.user_id = u.id";
    $stmt = $conn->prepare($sql);
}


$stmt->execute();


$result = $stmt->get_result();

$posts = [];
while ($row = $result->fetch_assoc()) {
    $posts[] = array(
        'id' => $row['id'],
        'user_id' => $row['user_id'],
        'username' => $row['username'],
        'title' => $row['title'],
        'post_text' => $row['post_text'],
        'category' => $row['category'],
        'image' => base64_encode($row['image']),
        'created_at' => $row['created_at']
    );
}

$stmt->close();
$conn->close();

header('Content-Type: application/json');
if (count($posts) > 0) {
    echo json_encode($posts);
} else {
    echo json_encode(['message' => 'No posts found']);
}
?>
