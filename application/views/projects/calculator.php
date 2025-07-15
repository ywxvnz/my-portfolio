<h2>My Projects</h2>
  <h3>Calculator</h3>
  <p class="pink-bold">HTML, CSS, JavaScript(jQuery)</p>

  <div class="d-flex justify-content-between align-items-center flex-wrap mb-3">
    <!-- Description -->
     <div class="col-md-9 col-sm-12">
      <p class="mb-0 me-3 flex-grow-1">
        An interactive calculator web app that allows users to perform addition, subtraction, multiplication, and division in a sleek, minimal UI.
      </p>
     </div>

    <!-- Action Buttons -->
    <div class="col-md-3 col-sm-12 text-md-end text-start mt-2 mt-md-0">
      <div class="d-flex flex-wrap justify-content-md-end gap-2">
        <a href="https://github.com/ywxvnz/calculator" target="_blank" class="btn btn-outline-secondary">
          View on GitHub ↗
        </a>
        <a href="https://ywxvnz.github.io/calculator" target="_blank" class="btn btn-outline-secondary">
          Live Site ↗
        </a>
      </div>
    </div>
  </div>

  <div class="row mt-4">
    <div class="col-md-6">
      <img src="<?= base_url('assets/images/projects/c1.png') ?>" class="img-fluid mb-3 project-screenshot" alt="Screenshot 1">
    </div>
    <div class="col-md-6">
      <img src="<?= base_url('assets/images/projects/c2.png') ?>" class="img-fluid mb-3 project-screenshot" alt="Screenshot 2">
    </div>
  </div>

  <p>Features include real-time calculation, input validation, responsive design, and a clear button to reset values — all implemented without any frameworks.</p>
  
  <div class="project-info mt-4 p-4 rounded" style="background-color: #FFF9FC;">
    <p class="small-text" style="font-weight: bold; color: #FF99AF">Project Information</p>
    <p class="small-text" style="font-style: italic;">May 28, 2023</p>
    <p class="small-text">An individual project made for the subject ITEC50A - Web Systems and Technologies.</p>
  </div>

  <a href="<?= site_url('projects') ?>" class="btn btn-outline-secondary mt-4  back-btn-fixed">← Back to Projects</a>

