<?php $this->load->view('templates/header'); ?>

<h2>Contact Me</h2>
<p>Let’s connect! Feel free to reach out for internship opportunities, collaborations, or just to say hi.</p>
<div class="contact-container p-4 shadow-sm rounded-4" style="background-color: white;">
  <div class="row g-3">
    
    <!-- Gmail -->
    <div class="col-12">
      <a href="mailto:andinovanessamaem@gmail.com" class="text-decoration-none" target="_blank">
        <div class="contact d-flex align-items-center rounded-4 p-3" style="background-color: #fff1f4;">
            <i class="bi bi-envelope-fill fs-4 me-3" style="color: #A8B897;"></i>
            <div>
            <p class="mb-0 fw-bold text-pink">Gmail</p>
            <small style="color: #545454;">andinovanessamaem@gmail.com</small>
            </div>
        </div>
      </a>
    </div>

    <!-- LinkedIn -->
    <div class="col-md-6">
      <a href="https://www.linkedin.com/in/vanessa-andino-50629a36a/" class="text-decoration-none" target="_blank">
        <div class="contact d-flex align-items-center rounded-4 p-3" style="background-color: #fff1f4;">
            <i class="bi bi-linkedin fs-4 me-3" style="color: #A8B897;"></i>
            <div>
            <p class="mb-0 fw-bold text-pink">LinkedIn</p>
            <small style="color: #545454;">Vanessa Andino</small>
            </div>
        </div>
      </a>
    </div>

    <!-- GitHub -->
    <div class="col-md-6">
      <a href="https://github.com/ywxvnz" class="text-decoration-none" target="_blank">
        <div class="contact d-flex align-items-center rounded-4 p-3" style="background-color: #fff1f4;">
            <i class="bi bi-github fs-4 me-3" style="color: #A8B897;"></i>
            <div>
            <p class="mb-0 fw-bold text-pink">Github</p>
            <small style="color: #545454;">ywxvnz</small>
            </div>
        </div>
      </a>
    </div>

    <!-- Facebook -->
    <div class="col-md-6">
      <a href="https://www.facebook.com/xw.vann/" class="text-decoration-none" target="_blank">
        <div class="contact d-flex align-items-center rounded-4 p-3" style="background-color: #fff1f4;">
            <i class="bi bi-facebook fs-4 me-3" style="color: #A8B897;"></i>
            <div>
            <p class="mb-0 fw-bold text-pink">Facebook</p>
            <small style="color: #545454;">Vanessa Andino</small>
            </div>
        </div>
      </a>
    </div>

    <!-- Phone Number Card with Tooltip -->
    <div class="col-md-6">
    <div id="phone-card"
        class="d-flex align-items-center rounded-4 p-3"
        style="background-color: #fff1f4; cursor: pointer;"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Click to copy"
        onclick="copyPhone()">
        
        <i class="bi bi-telephone-fill fs-4 me-3" style="color: #A8B897;"></i>
        <div>
        <p class="mb-0 fw-bold text-pink">Phone</p>
        <small id="phone-number">0938 044 6602</small>
        </div>
    </div>
    </div>

    <script>
        // initialize tooltips
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
        const tooltipList = tooltipTriggerList.map(el => new bootstrap.Tooltip(el))

        function copyPhone() {
            const phoneCard = document.getElementById("phone-card");
            const phone = document.getElementById("phone-number").innerText;

            navigator.clipboard.writeText(phone).then(() => {
                let tooltip = bootstrap.Tooltip.getInstance(phoneCard);
                tooltip.setContent({ '.tooltip-inner': 'Copied!' });
                tooltip.show();

                setTimeout(() => {
                    tooltip.hide();
                    tooltip.dispose(); 
                    
                    phoneCard.setAttribute("title", "Click to copy");
                    new bootstrap.Tooltip(phoneCard); 
                    }, 1500);
            });
        }

    </script>

    <!-- Location -->
    <div class="col-12">
      <a href="https://www.google.com/maps/place/Imus,+Cavite/@14.3989979,120.8884825,13z/data=!3m1!4b1!4m6!3m5!1s0x3397d252b84f3c11:0x38b0f2e1f833e8df!8m2!3d14.4276391!4d120.9372429!16zL20vMDR6cmtx!5m1!1e4?entry=ttu&g_ep=EgoyMDI1MDcwNy4wIKXMDSoASAFQAw%3D%3D" class="text-decoration-none" target="_blank">
        <div class="contact d-flex align-items-center rounded-4 p-3" style="background-color: #fff1f4;">
            <i class="bi bi-geo-alt-fill fs-4 me-3" style="color: #A8B897;"></i>
            <div>
            <p class="mb-0 fw-bold text-pink">Location</p>
            <small style="color: #545454;">Imus City, Cavite</small>
            </div>
        </div>
      </a>
    </div>

  </div>
</div>



<?php $this->load->view('templates/footer'); ?>
