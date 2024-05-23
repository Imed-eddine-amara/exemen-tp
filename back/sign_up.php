<?php

$servername = "localhost";
$user = "root";
$pass = "";
$db = "site";

$conn = new mysqli($servername, $user, $pass, $db);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$username = isset($_POST['username']) ? $_POST['username'] : null;
$email = isset($_POST['email']) ? $_POST['email'] : null;
$password = isset($_POST['password']) ? $_POST['password'] : null;
$gender = isset($_POST['gender']) ? $_POST['gender'] : null;
$birthday = isset($_POST['birthday']) ? $_POST['birthday'] : null;

if ($username && $email && $password && $gender && $birthday) {
  $statement = $conn->prepare("INSERT INTO users (username, password, email, gender, birthday) VALUES (?, ?, ?, ?, ?)");
  $statement->bind_param("sssss", $username, $password, $email, $gender, $birthday);

  if ($statement->execute()) {
    echo "Registration successful";
  } else {
    echo "Registration failed: " . $conn->error;
  }

  $statement->close();
} else {
  echo "Registration failed: Missing required fields";
}

$conn->close();
?>
