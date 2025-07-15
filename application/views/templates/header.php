<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Vanessa Andino | Portfolio</title>

<!-- Bootstrap CSS (CDN) -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
<link href="<?= base_url('assets/style.css') ?>" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair:ital,opsz,wght@0,5..1200,300..900;1,5..1200,300..900&display=swap" rel="stylesheet">
<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>

</head>
<body>

<!-- Navbar -->
<nav class="navbar navbar-expand-lg" style="background-color: transparent;">
  <div class="container">
    <a class="navbar-brand" href="#"><span class="circle-dot"></span>Vanessa's Portfolio</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item"><a class="nav-link active" href="<?= base_url('index.php') ?>">Home</a></li>
        <li class="nav-item"><a class="nav-link" href="<?= base_url('index.php/about') ?>">About</a></li>
        <li class="nav-item"><a class="nav-link" href="<?= base_url('index.php/projects') ?>">Portfolio</a></li>
        <li class="nav-item"><a class="nav-link" href="<?= base_url('index.php/contact') ?>">Contact</a></li>
      </ul>
    </div>
  </div>
</nav>

<div class="container mt-4">
