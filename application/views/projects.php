<?php $this->load->view('templates/header'); ?>

<h2>My Projects</h2>
<div class="row mt-5">
  <div class="col-md-4 mb-4 d-flex">
    <div class="card project-card w-100">
      <img src="<?= base_url('assets/images/projects/photobooth.png') ?>" class="card-img-top" alt="Captured by V">
      <div class="card-body">
        <h5 class="card-title">Captured by V</h5>
        <p class="small-text">A strip photobooth website.</p>
        <a href="<?= site_url('portfolio/project/photobooth') ?>" class="stretched-link"></a>
      </div>
    </div>
  </div>

  <div class="col-md-4 mb-4 d-flex">
    <div class="card project-card w-100">
      <img src="<?= base_url('assets/images/projects/f1.png') ?>" class="card-img-top" alt="Online Financial Tracker and Visualizer">
      <div class="card-body">
        <h5 class="card-title">Online Financial Tracker and Visualizer</h5>
        <p class="small-text">A web-based tracker to visualize spending patterns and generate reports.</p>
        <a href="<?= site_url('portfolio/project/financial') ?>" class="stretched-link"></a>
      </div>
    </div>
  </div>

  <div class="col-md-4 mb-4 d-flex">
    <div class="card project-card w-100">
      <img src="<?= base_url('assets/images/projects/capybarush.png') ?>" class="card-img-top" alt="Capybarush">
      <div class="card-body">
        <h5 class="card-title">Capybarush</h5>
        <p class="small-text">A whimsical platformer game where you guide a capybara through jungles, leaping across themed obstacles in a race for survival.</p>
        <a href="<?= site_url('portfolio/project/capybarush') ?>" class="stretched-link"></a>
      </div>
    </div>
  </div>

  <div class="col-md-4 mb-4 d-flex">
    <div class="card project-card w-100">
      <img src="<?= base_url('assets/images/projects/l1.png') ?>" class="card-img-top" alt="Leave Management System">
      <div class="card-body">
        <h5 class="card-title">Leave Management System</h5>
        <p class="small-text">A system that streamlines employee leave requests, approvals, and tracking.</p>
        <a href="<?= site_url('portfolio/project/leave') ?>" class="stretched-link"></a>
      </div>
    </div>
  </div>

  <div class="col-md-4 mb-4 d-flex">
    <div class="card project-card w-100">
      <img src="<?= base_url('assets/images/projects/e1.png') ?>" class="card-img-top" alt="Faculty Evaluation System for the Department of Computer Studies at CvSU-Imus">
      <div class="card-body">
        <h5 class="card-title">Faculty Evaluation System for the Department of Computer Studies at CvSU-Imus</h5>
        <p class="small-text">A platform that enables students to provide feedback and rate faculty members for performance assessment.</p>
        <a href="<?= site_url('portfolio/project/evaluation') ?>" class="stretched-link"></a>
      </div>
    </div>
  </div>

  <div class="col-md-4 mb-4 d-flex">
    <div class="card project-card w-100">
      <img src="<?= base_url('assets/images/projects/t2.png') ?>" class="card-img-top" alt="To-Do List">
      <div class="card-body">
        <h5 class="card-title">To-Do List</h5>
        <p class="small-text">A minimalist task tracker that lets users add, complete, and delete to-do items in real time.</p>
        <a href="<?= site_url('portfolio/project/todo') ?>" class="stretched-link"></a>
      </div>
    </div>
  </div>

  <div class="col-md-4 mb-4 d-flex">
    <div class="card project-card w-100">
      <img src="<?= base_url('assets/images/projects/c2.png') ?>" class="card-img-top" alt="Calculator">
      <div class="card-body">
        <h5 class="card-title">Calculator</h5>
        <p class="small-text">A responsive web-based calculator built using HTML, CSS, and JavaScript.</p>
        <a href="<?= site_url('portfolio/project/calculator') ?>" class="stretched-link"></a>
      </div>
    </div>
  </div>

</div>


<?php $this->load->view('templates/footer'); ?>