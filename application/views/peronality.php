  <!-- Personality Scale -->
  <h3 class="mt-5">Personality Scale</h3>
  <div class="personality-scale">
    <?php
      $traits = [
        ['Closed', 'Open', 'Openness', 80],
        ['Spontaneous', 'Conscientious', 'Conscientiousness', 50],
        ['Introverted', 'Extroverted', 'Extroversion', 20],
        ['Hostile', 'Agreeable', 'Agreeableness', 50],
        ['Stable', 'Neurotic', 'Neuroticism', 60],
      ];
      foreach ($traits as $trait):
    ?>
      <div class="trait-row mb-4">
        <div class="d-flex justify-content-between">
          <span><?= $trait[0] ?></span>
          <span style="color: #738262; font-weight: 600;"><?= $trait[2] ?></span>
          <span><?= $trait[1] ?></span>
        </div>
        <div class="progress bg-pink-light position-relative">
          <div class="indicator" style="left: <?= $trait[3] ?>%;"></div>
        </div>
      </div>
    <?php endforeach; ?>
  </div>
  <style>
    .bg-pink-light {
  background-color: #FFE4EC;
  height: 8px;
  border-radius: 20px;
  position: relative;
}

.indicator {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 16px;
  height: 16px;
  background-color: #FF99AF;
  border-radius: 50%;
  z-index: 1;
}

.personality-scale .trait-row span {
  font-size: 0.9rem;
}
  </style>