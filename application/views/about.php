<?php $this->load->view('templates/header'); ?>

<section class="about-section container pt-5 pb-5">
  <div class="row align-items-start">
    <!-- Left: About Me -->
    <div class="col-md-6">
      <h2>About Me</h2>
      <p>
        I’m a 3<sup>rd</sup> year Computer Science student with experience in web development projects and a strong desire to grow in the IT field. Eager to learn in a challenging environment, I aim to develop practical skills and contribute meaningfully to real world solutions, becoming a valuable part of any organization.
      </p>
      <p>
        Aside from web development, I’m also interested in graphic designing. With this, I can showcase my interest in playing with my artistic ability through colors and organization of elements.
      </p>
    </div>

    <!-- Right: Quote -->
    <div class="col-md-6">
      <div class="quote">
        <h1>“always be a work in progress”</h1>
      </div>
    </div>
  </div>
</section>

<section class="skills-section container pt-5 pb-5">
  <h2>My Skillset</h2>

  <!-- Programming Stack -->
  <div class="program mt-4">
    <h3>Programming Stack</h3>
    <div class="skills-grid">
      <?php
        $programming_skills = [
          ['html.png', 'HTML'],
          ['css.png', 'CSS'],
          ['js.webp', 'JavaScript'],
          ['php.png', 'PHP'],
          ['mysql.webp', 'MySQL'],
          ['cpp.png', 'C++'],
          ['java.png', 'Java'],
          ['python.png', 'Python'],
          ['mysqlworkbench.webp', 'Workbench'],
          ['xampp.png', 'XAMPP'],
          ['vscode.png', 'VSCode'],
          ['netbeans.png', 'NetBeans']
        ];
        foreach ($programming_skills as $skill):
      ?>
      <div class="skill-item">
        <div class="skill-card">
          <img src="<?= base_url('assets/images/skills/' . $skill[0]) ?>" alt="<?= $skill[1] ?>">
          <div class="skill-title"><?= $skill[1] ?></div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>

  <!-- Productivity Tools -->
  <div class="technical mt-5">
    <h3>Productivity Tools</h3>
    <div class="skills-grid">
      <?php
        $tools = [
          ['google.png', 'Google Workspace'],
          ['microsoft.png', 'Microsoft Office']
        ];
        foreach ($tools as $tool):
      ?>
      <div class="skill-item">
        <div class="skill-card">
          <img src="<?= base_url('assets/images/skills/' . $tool[0]) ?>" alt="<?= $tool[1] ?>">
          <div class="skill-title"><?= $tool[1] ?></div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>

  <!-- Creative Toolkit -->
  <div class="graphic mt-5">
    <h3>Creative Toolkit</h3>
    <div class="skills-grid">
      <?php
        $graphics = [
          ['canva.png', 'Canva'],
          ['inkscape.png', 'Inkscape'],
          ['aseprite.png', 'Aseprite']
        ];
        foreach ($graphics as $g):
      ?>
      <div class="skill-item">
        <div class="skill-card">
          <img src="<?= base_url('assets/images/skills/' . $g[0]) ?>" alt="<?= $g[1] ?>">
          <div class="skill-title"><?= $g[1] ?></div>
        </div>
      </div>
      <?php endforeach; ?>
    </div>
  </div>

  <!-- Soft Skills -->
  <div class="soft mt-5">
    <h3>Personal Strengths</h3>
    <div class="soft-skill-grid">
      <div class="soft-skill-card">
        <i class="bi bi-search" style="font-size: 2rem;"></i>
        <div class="soft-skill-title">Attention to Detail</div>
      </div>
      <div class="soft-skill-card">
        <i class="bi bi-lightbulb" style="font-size: 2rem;"></i>
        <div class="soft-skill-title">Problem Solving</div>
      </div>
      <div class="soft-skill-card">
        <i class="bi bi-shield-check" style="font-size: 2rem;"></i>
        <div class="soft-skill-title">Dependability</div>
      </div>
      <div class="soft-skill-card">
        <i class="bi bi-ear" style="font-size: 2rem;"></i>
        <div class="soft-skill-title">Active Listening</div>
      </div>
      <div class="soft-skill-card">
        <i class="bi bi-journal-bookmark" style="font-size: 2rem;"></i>
        <div class="soft-skill-title">Willingness to Learn</div>
      </div>
      <div class="soft-skill-card">
        <i class="bi bi-bullseye" style="font-size: 2rem;"></i>
        <div class="soft-skill-title">Goal-Oriented</div>
      </div>
    </div>
  </div>
</section>

<section class="education-section container pt-5 pb-5">
    <h2>Academic Background</h2>
    <?php
    $education = [
    [
        'level' => 'Tertiary',
        'school' => 'Cavite State University - Imus Campus',
        'degree' => 'Bachelor of Science in Computer Science',
        'years' => '2022–Present',
        'location' => 'Imus City, Cavite',
        'logo' => 'assets/images/cvsu.png',
    ],
    [
        'level' => 'Secondary <small>(Senior High School)</small>',
        'school' => 'Unida Christian Colleges Inc.',
        'degree' => 'Science, Technology, Engineering, and Mathematics (STEM)',
        'years' => '2020–2022',
        'location' => 'Imus City, Cavite',
        'logo' => 'assets/images/ucc.png',
    ],
    [
        'level' => 'Secondary <small>(Junior High School)</small>',
        'school' => 'General Emilio Aguinaldo National High School',
        'degree' => '',
        'years' => '2016–2020',
        'location' => 'Imus City, Cavite',
        'logo' => 'assets/images/geanhs.png',
    ],
    [
        'level' => 'Primary',
        'school' => 'Tanzang Luma Elementary School',
        'degree' => '',
        'years' => '2014–2016',
        'location' => 'Imus City, Cavite',
        'logo' => 'assets/images/tles.png',
    ]
    ];

    foreach ($education as $edu): ?>
    <div class="school d-flex justify-content-between align-items-center bg-white p-4 mb-4 shadow-sm rounded-4">
        <div class="w-75">
        <h3>
            <em><?= $edu['level'] ?></em>
        </h3>
        <p class="pink-bold"><?= $edu['school'] ?></p>
        <?php if (!empty($edu['degree'])): ?>
            <p class="fst-italic mb-1" style="color: #545454; margin-bottom: 20px; font-weight: 500;" ><?= $edu['degree'] ?></p>
        <?php endif; ?>
        <p class="mb-1"><?= $edu['years'] ?></p>
        <p class="mb-0"><?= $edu['location'] ?></p>
        </div>
        <div class="ms-3 d-none d-sm-block">
        <img src="<?= base_url($edu['logo']) ?>" alt="logo" style="max-height: 80px;">
        </div>
    </div>
    <?php endforeach; ?>


</section>


<?php $this->load->view('templates/footer'); ?>
