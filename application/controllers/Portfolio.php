<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Portfolio extends CI_Controller {
  public function index() {
    $this->load->view('home');
  }

  public function about() {
  $this->load->view('about');
  }

  public function projects() {
  $this->load->view('projects');
  }

  public function project($slug)
  {
      $allowed = ['photobooth', 'capybarush', 'financial', 'calculator', 'todo', 'evaluation', 'leave'];

      if (!in_array($slug, $allowed)) {
          show_404();
      }

      $this->load->view('templates/header');
      $this->load->view('projects/' . $slug);  // loads views/projects/slug.php
      $this->load->view('templates/footer');
  }

  public function contact() {
  $this->load->view('contact');
  }

}
