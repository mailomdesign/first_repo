<?php
$content = file_get_contents('cases.json'); // путь к файлу может отличаться
$cases = json_decode($content, true);

if (!is_array($cases)) {
    echo "<p style='color:red;'>Ошибка: не удалось загрузить cases.json или он содержит неверный JSON.</p>";
    var_dump($content); // покажет что именно считалось
    exit; // останавливаем скрипт, чтобы не было дальнейших ошибок
}
?>


<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Михаил Образцов — Портфолио</title>
  <link href="https://fonts.googleapis.com/css2?family=Alumni+Sans&family=Russo+One&display=swap" rel="stylesheet" />
  <style>
    body {
      margin: 0;
      background: white;
      font-family: 'Russo One', sans-serif;
    }
    

    /* ------------------- Hero-блок ------------------- */
    .hero {
      width: 1700px;
      height: 950px;
      margin: 30px auto;
      border: 1px solid black;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .hero-subtitle {
      font-size: 36px;
      text-transform: uppercase;
      color: #aaa;
      text-align: center;
      margin: 0;
    }

    .hero-title {
      font-size: 128px;
      text-transform: uppercase;
      color: black;
      text-align: center;
      margin: 10px 0;
    }

    .hero-caption {
      font-size: 36px;
      text-transform: uppercase;
      color: black;
      text-align: center;
      margin: 0;
    }

    .hero-image {
      width: 350px;
      height: 350px;
      border-radius: 50%;
      position: absolute;
      bottom: -175px;
      left: 50%;
      transform: translateX(-50%);
    }

    /* ------------------- Bio-блок ------------------- */
    .bio {
      margin-top: 240px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      width: 100%;
      padding: 0 60px;
      box-sizing: border-box;
      position: relative; /* обязательно для абсолютного позиционирования плашки */
    }

    .bio-content {
      max-width: 1149px;
      margin: 0 auto;
      text-align: center;
      flex: 1;
    }

    .bio-label {
      font-size: 32px;
      color: #979797;
      margin: 0 0 20px;
    }

    /* Якорь для точного позиционирования */
    .bio-anchor {
      height: auto;
    }

    .bio-name {
      font-size: 64px;
      color: black;
      text-transform: capitalize;
      margin: 10px 0 0;
    }

    .bio-description {
      font-size: 32px;
      font-family: 'Alumni Sans', sans-serif;
      color: black;
      line-height: 1.5;
    }

    .bio-underline {
  width: 60px;
  height: 6px;
  background-color: #505050;
  margin: 40px auto 0; /* сверху 10px, снизу 0 — выравнивание по центру */
}


    /* ------------------- Плашка "идеология" справа ------------------- */
    .ideology-wrapper {
      position: absolute;
      top: 60px; /* теперь плашка на уровне bio-name */
      right: 0;
      width: 44px;
      height: 243px;
      z-index: 10;
    }

    .side-block-right {
      position: absolute;
      top: 0;
      left: 0;
      width: 44px;
      height: 243px;
      background: black;
      z-index: 1;
    }

    .vertical-text-right {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-90deg);
      transform-origin: center;
      color: white;
      font-size: 30px;
      font-family: 'Russo One', sans-serif;
      font-weight: 400;
      text-transform: uppercase;
      white-space: nowrap;
      z-index: 2;
    }

    /* ------------------- Цифровой блок ------------------- */
    .stats-numbers {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 60px;
  max-width: 1550px;
  margin: 140px auto 100px;
  padding: 0 60px;
  box-sizing: border-box;
  flex-wrap: nowrap;
}

.number-block {
  text-align: center;
  color: black;
  font-family: 'Russo One', sans-serif;
  width: 392px;
}

.number-value {
  font-size: 128px;
  text-transform: uppercase;
  line-height: 1;
}

.number-desc {
  font-size: 14px;
  text-transform: lowercase;
  margin-top: 20px;
  line-height: 1.4;
}

.divider-vertical {
  width: 1px;
  height: 200px;
  background: black;
  align-self: center;
}


/* отключаем абсолютные разделители, если они остались */
.divider {
  display: none;
}



    /* ------------------- НАПРАВЛЕНИЕ ------------------- */

.direction-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
  background: black;
}

.direction-block {
  width: 1920px;
  height: 950px;
  position: relative;
  font-family: 'Russo One', sans-serif;
  overflow: hidden;
}

.direction-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 1920px;
  height: 950px;
  background: black;
}

.direction-title {
  position: absolute;
  top: 214px;
  left: 104px;
  width: 762px;
  font-size: 96px;
  color: #505050;
  text-align: right;
  text-transform: uppercase;
  margin: 0;
}

.direction-line {
  position: absolute;
  top: 338px;
  left: 807px;
  width: 150px;
  height: 0;
  outline: 5px solid white;
  outline-offset: -2.5px;
}

.direction-list {
  position: absolute;
  top: 357px;
  left: 31px;
  width: 835px;
  font-size: 65px;
  color: #8f8f8f;
  text-transform: uppercase;
  text-align: right;
  line-height: 1.35;
  margin: 0;
}

.direction-image {
  position: absolute;
  top: 0;
  left: 957px;
  width: 961.5px;
  height: 950px;
  mix-blend-mode: luminosity;
}

.direction-square {
  position: absolute;
  top: 759px;
  left: 881px;
  width: 15px;
  height: 15px;
  background: white;
}


    /* ------------------- Декор слева ------------------- */
    .vertical-bar-left {
      position: absolute;
      left: 0;
      top: 0;
      width: 31px;
      height: 2200px;
      background: black;
      z-index: 1;
    }

    /* ------------------- Адаптация ------------------- */
    @media (max-width: 768px) {
      .hero {
        width: 100%;
        border: none;
      }

      .hero-title {
        font-size: 64px;
      }

      .hero-image {
        width: 200px;
        height: 200px;
        bottom: -100px;
      }

      .bio {
        flex-direction: column;
        align-items: center;
      }

      .ideology-wrapper {
        position: static;
        margin-top: 40px;
      }
    }
  </style>


<style>
.hard-skill-section {
  width: 100%;
  max-width: 1920px;
  margin: 50px auto 0; /* ⬅ добавлен верхний отступ */
  background: white;
  padding: 120px 60px;
  box-sizing: border-box;
  font-family: 'Russo One', sans-serif;
}


.skills-header {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-family: 'Russo One', sans-serif;
  box-sizing: border-box;
  margin-top: 140px;
  padding-right: 0; /* крепим к правому краю */
}

.skills-text {
  font-size: 96px;
  font-weight: 400;
  color: #505050; /* ВАЖНО: цвет — чёрный */
  text-transform: uppercase;
  line-height: 0.65;
}

.skills-line {
  width: 90px;
  height: 16px;
  background-color: #505050; /* ВАЖНО: цвет — чёрный */
  margin-left: 0px;
}

.skills-grid {
  display: flex;
  justify-content: center; /* Центрирование по горизонтали */
  gap: 20px;
  flex-wrap: nowrap;
  overflow-x: auto;
}


.skill-column {
  min-width: 200px;
  text-align: left;
}

.skill-label {
  font-size: 20px;
  text-transform: lowercase;
  color: #505050;
  margin-bottom: 10px;
  margin-top: 80px;
}

.skill {
  flex: 1 1 230px;
  min-width: 200px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* распределяем tool и dots */
  height: 140px; /* регулируй по вкусу */
  box-sizing: border-box;
}

.tool {
  font-size: 24px;
  color: #AAAAAA;
  text-transform: capitalize;
  margin-bottom: 30px;
  line-height: 1.2;
  height: 50px; /* фиксируем высоту названия, чтобы точки были на одной линии */
  display: flex;
  align-items: center;
  justify-content: left;
}


.dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 11px;
  height: 11px;
  background: black;
  border-radius: 50%;
}

.dot.gray {
  background: #AAAAAA;
}

.quote-section {
  width: 100%;
  max-width: 1227px;
  margin: 200px auto;
  text-align: center;
  padding: 0 20px; /* чтобы не упиралось в края на мобильных */
}

.quote-title {
  font-size: 64px;
  font-family: 'Russo One', sans-serif;
  font-weight: 400;
  color: black;
  line-height: 1.3;
  margin: 0 0 40px;
}

.quote-text {
  font-size: 32px;
  font-family: 'Alumni Sans', sans-serif;
  font-weight: 400;
  color: black;
  line-height: 1.6;
  max-width: 1149px;
  margin: 0 auto;
}

.quote-button {
  display: inline-block;
  margin-top: 40px;
  padding: 12px 24px;
  background: black;
  color: white;
  font-family: 'Russo One', sans-serif;
  font-size: 18px;
  text-transform: uppercase;
  text-decoration: none;
  border: 1px solid black;
  transition: background 0.3s ease, color 0.3s ease;
}

.quote-button:hover {
  background: white;
  color: black;
}


.cases-header {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding-right: 0px; /* как у .ideology-wrapper */
  box-sizing: border-box;
  margin-top: 120px;
  font-family: 'Russo One', sans-serif;
}

.cases-text {
  font-size: 96px;
  font-weight: 400;
  color: #505050;
  text-transform: uppercase;
  line-height: 0.65;
}

.cases-line {
  width: 90px;
  height: 16px;
  background-color: #505050;
  margin-left: 0px; /* расстояние между "КЕЙСЫ" и линией */
}

.case-row {
  display: flex;
  justify-content: center;
  gap: 65px;
  margin: 65px 0;
  flex-wrap: wrap;
}

.case-block {
  width: 530px;
  height: 530px;
  position: relative;
  overflow: hidden;
  border: 1px solid black;
}

.case-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.4s ease;
}

.case-bw {
  z-index: 1;
  background: white; /* <== убрать серый фон и blend */
}

.case-color {
  z-index: 2;
  opacity: 0;
  background: black;
}

.case-block:hover .case-color {
  opacity: 1;
}

.case-block:hover .case-bw {
  opacity: 0;
}

.case-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.54;
}

.logo-img {
  position: absolute;
  top: 27px;
  right: 33px;
  width: 215px;
  height: 125px;
  object-fit: contain;
  z-index: 3;
}


.logo-bg {
  position: absolute;
  top: 27px;
  right: 33px; /* заменили left: 266px */
  width: 215px;
  height: 125px;
  background: #D9D9D9;
}

.logo-img {
  position: absolute;
  top: 27px;
  right: 33px;
  width: 215px;
  height: 125px;
  object-fit: contain;
}

.logo-text {
  position: absolute;
  top: 66px;
  right: 33px; /* заменили left: 326px */
  width: 215px;
  font-size: 20px;
  font-family: 'Russo One', sans-serif;
  color: black;
  text-align: center;
}


  .case-title,
  .case-label,
  .case-desc,
  .case-site,
  .case-tag {
    position: absolute;
    font-family: 'Russo One', sans-serif;
    text-transform: lowercase;
    color: black;
    z-index: 3;
  }

  .case-title {
    font-size: 72px;
    left: 50px;
    right: 33px;
    top: 195px;
    text-align: right;
    text-transform: uppercase;
  }

  .case-label {
    font-size: 20px;
    left: 33px;
    top: 380px;
  }

  .case-desc {
    font-size: 13px;
    left: 33px;
    top: 413px;
    width: 448px;
    color: rgb(121, 121, 121);
  }

  .case-site {
    font-size: 16px;
    left: 33px;
    top: 476px;
  }

  .case-tag {
    font-size: 16px;
    right: 33px;
    top: 476px;
    text-align: right;
    color: rgb(121, 121, 121);
  }

  /* Цветной текст в hover-версии — белый */
  .case-color .case-title,
  .case-color .case-label,
  .case-color .case-desc,
  .case-color .case-site,
  .case-color .case-tag {
    color: white;
  }

  .case-card {
  transition: transform 0.2s ease;
}
.case-card:hover {
  transform: translateY(-5px);
}


  .contacts-section {
  position: relative; /* чтобы .contacts-header мог позиционироваться внутри */
  display: flex;
  width: 100%;
  max-width: 1920px;
  height: 962px;
  background: black;
  color: white;
  font-family: 'Russo One', sans-serif;
}


  .contacts-left {
    width: 50%;
    height: 100%;
  }

  .contact-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .contacts-right {
  width: 50%;
  padding: 0 80px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 500px; /* регулируй по вкусу */
}


  .contacts-header {
  position: absolute;
  top: 160px;
  right: 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  font-family: 'Russo One', sans-serif;
  box-sizing: border-box;
  padding-right: 0;
  width: auto;
}

.contacts-text {
  font-size: 96px;
  font-weight: 400;
  color: #ffffff;
  text-transform: uppercase;
  line-height: 0.65;
}

.contacts-line {
  width: 90px;
  height: 16px;
  background-color: #ffffff;
  margin-left: 0px;
}


  .contact-subtitle {
    font-size: 36px;
    text-transform: uppercase;
    margin-bottom: 30px;
  }

  .contact-phone {
    font-size: 64px;
    text-transform: uppercase;
    margin-bottom: 60px;
  }

  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }

  .contact-label {
    font-size: 36px;
    text-transform: uppercase;
    color: #AAAAAA;
  }

  .contact-dot {
    width: 15px;
    height: 15px;
    background: white;
  }

  .footer {
  width: 100%;
  max-width: 1920px;
  height: 40px;
  background: #212121;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Russo One', sans-serif;
}

.footer-content {
  width: 100%;
  max-width: 1920px; /* или 1920px — зависит от центральной сетки */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 60px;
  box-sizing: border-box;
  color: white;
  font-size: 16px;
  text-transform: uppercase;
}

html {
  scroll-behavior: smooth;
}

.fixed-menu {
  position: fixed;
  top: 40px; /* как у .hero */
  right: 51%;
  transform: translateX(850px); /* 1700px / 2 - точно к правому краю рамки hero */
  z-index: 1000;
}

.fixed-menu ul {
  display: flex;
  gap: 20px;
  background: white;
  border: 1px solid rgb(255, 255, 255);
  padding: 5px 10px;
  margin: 0;
  list-style: none;
}

.fixed-menu li a {
  text-decoration: none;
  color: black;
  font-family: 'Russo One', sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  transition: color 0.3s ease;
}

.fixed-menu li a:hover {
  color: #AAAAAA; /* или любой другой: #505050, #888 — регулируй по вкусу */
}

.fixed-education {
  position: fixed;
  top: 40px; /* как у .hero */
  left: 51%;
  transform: translateX(-850px); /* 1700px / 2 — левый край рамки */
  z-index: 1000;
}

.education-box {
  width: 90px;
  height: 28px;
  background: white;
  border: 1px solid white; /* если нужен бордер */
  color: black;
  font-size: 14px;
  font-family: 'Russo One', sans-serif;
  font-weight: 400;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  padding-left: 10px;
  transition: color 0.3s ease;
}

.education-box:hover {
  color: #AAAAAA; /* регулируй по вкусу */
}

.scroll-top {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 25px;         /* как .ideology-wrapper */
  height: 30px;
  background: black;
  color: white;
  font-size: 16px;
  font-family: 'Russo One', sans-serif;
  border: none;
  cursor: pointer;
  z-index: 1000;
  transition: background 0.3s ease;
}

.scroll-top:hover {
  background: #333;
}





</style>
</head>
<body>

<script src="js/script.js"></script>


  <!-- Hero-блок -->
  <section class="hero" id="hero">
    <div class="hero-subtitle">сайт</div>
    <div class="hero-title">Портфолио</div>
    <div class="hero-caption">не виртуального дизайнер</div>
    <img class="hero-image" src="img/portr-1.png" alt="Портрет Михаила" />
  </section>

  <!-- Плавающее меню -->
  <nav class="fixed-menu">
  <ul>
    <li><a href="#hero">Главная</a></li>
    <li><a href="#bio">Био</a></li>
    <li><a href="#direction">Направление</a></li>
    <li><a href="education.html">Обучение</a></li>
    <li><a href="#cases">Кейсы</a></li>
    <li><a href="#contacts">Контакты</a></li>
  </ul>
</nav>
  
<div class="fixed-education">
  <a href="vacancy.html" style="text-decoration: none; color: inherit;">
    <div class="education-box">
      Вакансия
    </div>
  </a>
</div>

  

  <!-- Вертикальная полоса слева -->
  <div class="vertical-bar-left"></div>

  <!-- Bio: блок с именем и описанием -->
  <section class="bio" id="bio">
    <div class="bio-content">
      <div class="bio-anchor">
        <h1 class="bio-name">михаил образцов</h1>
        <div class="bio-underline"></div> <!-- ← чёрная полоска -->
      </div>
      <p class="bio-description">
        Рад знакомству. В коммерческом дизайне с 2008 года. Нет выдуманных компаний, нет макетов для портфолио — только реальные проекты, разработка с нуля до выхода продукта на рынок, последующее сопровождение.<br><br>
        Ставлю перед собой основной задачу в успешной реализации бренда или продукта своего партнера.
      </p>
    </div>

    <!-- Плашка "идеология" справа -->
    <div class="ideology-wrapper">
      <div class="side-block-right"></div>
      <div class="vertical-text-right">идеология</div>
    </div>
  </section>

  <!-- Цифры -->
  <section class="stats-numbers">
  <div class="number-block">
  <div class="number-value">17</div>
  <div class="number-desc">лет непрерывной коммерческой практики в дизайне</div>
  </div>

  <div class="divider-vertical"></div>  
  <div class="number-block">
  <div class="number-value">30+</div>
  <div class="number-desc">проектов реализовано и завершено в партнёрстве с клиентами</div>
  </div>

  <div class="divider-vertical"></div>
  <div class="number-block">
  <div class="number-value">12</div>
  <div class="number-desc">брендов разработаны с нуля — от концепта до выхода на рынок</div>
  </div>

  <div class="divider-vertical"></div>
  <div class="number-block">
    <div class="number-value">2500+</div>
    <div class="number-desc">выполнено и реализовано <br>рекламных макетов</div>
  </div>
</section>
  

  <!-- 🔻 НАПРАВЛЕНИЕ: Точное соответствие Figma -->
  <section class="direction-wrapper" id="direction">
  <div class="direction-block">

    <!-- Фон -->
    <div class="direction-bg"></div>

    <!-- Заголовок -->
    <h2 class="direction-title">направление</h2>

    <!-- Линия под заголовком -->
    <div class="direction-line"></div>

    <!-- Список направлений -->
    <p class="direction-list">
      веб дизайн<br />
      полиграфия<br />
      графический дизайн<br />
      наружная реклама<br />
      ретушь
    </p>

    <!-- Изображение -->
    <img
      class="direction-image"
      src="img/napr-im-1.png"
      alt="Макет черных папок"
    />

    <!-- Квадрат -->
    <div class="direction-square"></div>
  </div>
</section>

<!-- 🔻 ХАРД-СКИЛЛ -->
<div class="skills-header">
  <span class="skills-text">Хард-скилл</span>
  <span class="skills-line"></span>
</div>
  

<div class="skills-grid">
  <div class="skill-column">
    <div class="skill-label">растр/ретушь</div>
    <div class="tool">Photoshop</div>
    <div class="dots">
      <div class="dot"></div><div class="dot"></div><div class="dot"></div>
      <div class="dot"></div><div class="dot"></div><div class="dot"></div>
    </div>
  </div>

  <div class="skill-column">
    <div class="skill-label">вектор</div>
    <div class="tool">Illustrator</div>
    <div class="dots">
      <div class="dot"></div><div class="dot"></div><div class="dot"></div>
      <div class="dot"></div><div class="dot"></div><div class="dot gray"></div>
    </div>
  </div>

  <div class="skill-column">
    <div class="skill-label">прототип</div>
    <div class="tool">Figma</div>
    <div class="dots">
      <div class="dot"></div><div class="dot"></div><div class="dot"></div>
      <div class="dot"></div><div class="dot"></div><div class="dot gray"></div>
    </div>
  </div>

  <div class="skill-column">
    <div class="skill-label">верстка</div>
    <div class="tool">InDesign</div>
    <div class="dots">
      <div class="dot"></div><div class="dot"></div><div class="dot"></div>
      <div class="dot"></div><div class="dot"></div><div class="dot"></div>
    </div>
  </div>

  <div class="skill-column">
    <div class="skill-label">допечатка</div>
    <div class="tool">Acrobat<br>Distiller</div>
    <div class="dots">
      <div class="dot"></div><div class="dot"></div><div class="dot"></div>
      <div class="dot"></div><div class="dot"></div><div class="dot gray"></div>
    </div>
  </div>

  <div class="skill-column">
    <div class="skill-label">тренд</div>
<div class="tool">Artificial<br>Intelligence</div>
    <div class="dots">

      <div class="dot"></div><div class="dot"></div><div class="dot"></div>
      <div class="dot"></div><div class="dot gray"></div><div class="dot gray"></div>
    </div>
  </div>

  <div class="skill-column">
    <div class="skill-label">изучаю</div>
    <div class="tool">HTML<br>CSS</div>    
    <div class="dots">
      <div class="dot"></div><div class="dot"></div><div class="dot gray"></div>
      <div class="dot gray"></div><div class="dot gray"></div><div class="dot gray"></div>
    </div>
  </div>
</div>
</section>

<!-- 🔻 Обучение 2-->
<section class="quote-section">
  <h2 class="quote-title">
    Наставник, который сопровождает  <br />
  </h2>
  <p class="quote-text">
    Интересуют базовые навыки или требуется поднять уровень до более уверенного специалиста? <br />
    С удовольствием пройду с Вами этот путь, убрав все лишнее с упором на практику
  </p>
  <a href="education.html" class="quote-button">Перейти к обучению</a>

</section>

<!-- 🔻 Заголовок "КЕЙСЫ_" с подчёркиванием по правому краю -->
<div class="cases-header" id="cases">
  <span class="cases-text">КЕЙСЫ</span>
  <span class="cases-line"></span>
</div>

<!-- СЕКЦИЯ КЕЙСЫ -->
<div class="cases-container"></div>

<?php
$jsonData = file_get_contents('cases.json');
$cases = json_decode($jsonData, true);

if ($cases && is_array($cases)) {
    echo '<div class="case-row">';
    foreach ($cases as $index => $case) {
        echo '<div class="case-block">';
        
        // ЧБ слой
        echo '<div class="case-layer case-bw">';
        if (isset($case["logo_bw"])) {
          echo '<img src="' . htmlspecialchars($case["logo_bw"]) . '" alt="Логотип ЧБ" class="logo-img">';
      }
          echo isset($case["logo_img"])
        ? '<img src="' . htmlspecialchars($case["logo_img"]) . '" alt="Логотип" class="logo-img">'
        : '';
        echo '<div class="case-title">' . htmlspecialchars($case["title"]) . '</div>';
        echo '<div class="case-label">' . htmlspecialchars($case["label"]) . ':</div>';
        echo '<div class="case-desc">' . htmlspecialchars($case["desc"]) . '</div>';
        echo '<div class="case-site">' . htmlspecialchars($case["site"]) . '</div>';
        echo '<div class="case-tag">' . htmlspecialchars($case["tag"]) . '</div>';
        echo '</div>';

        // Цветной слой
        echo '<div class="case-layer case-color">';
        if (isset($case["logo_color"])) {
          echo '<img src="' . htmlspecialchars($case["logo_color"]) . '" alt="Логотип цветной" class="logo-img">';
      }
        echo '<img class="case-image" src="' . htmlspecialchars($case["image_color"]) . '" alt="Цветной кейс" />';
        echo '<img src="' . htmlspecialchars($case["logo_img"]) . ' class="logo-img">';
        echo '<div class="case-title">' . htmlspecialchars($case["title"]) . '</div>';
        echo '<div class="case-label">' . htmlspecialchars($case["label"]) . ':</div>';
        echo '<div class="case-desc">' . htmlspecialchars($case["desc"]) . '</div>';
        echo '<div class="case-site">' . htmlspecialchars($case["site"]) . '</div>';
        echo '<div class="case-tag">' . htmlspecialchars($case["tag"]) . '</div>';
        echo '</div>';

        echo '</div>';

        // Каждые 3 кейса — новый .case-row
        if (($index + 1) % 3 == 0 && $index + 1 < count($cases)) {
            echo '</div><div class="case-row">';
        }
    }
    echo '</div>'; // Закрытие последнего case-row
} else {
    echo "<p style='color:red;'>Ошибка: не удалось загрузить данные кейсов.</p>";
}
?>


<!-- ЦИТАТА 2 -->
<section class="quote-section 2">
  <h2 class="quote-title">
    Дизайн без воплощения — это идея. <br />
    Я делаю — чтобы работало
  </h2>
  <p class="quote-text">
    Реализация творческих амбиций — это всегда хорошо, но продукт порой требует практичных решений в рекламе. <br />
    Вместе с вами я смогу найти путь к успешной презентации.
  </p>
</section>


<!-- 🔻 КОНТАКТЫ -->
<section class="contacts-section" id="contacts">
  <div class="contacts-left">
    <img src="img/mikhail-at-work.jpg" alt="Фото в тоне" class="contact-image" />
  </div>

  <div class="contacts-right">
    <!-- Заголовок КОНТАКТЫ_ в едином стиле с кейсами -->
    <div class="contacts-header">
      <span class="contacts-text">КОНТАКТЫ</span>
      <span class="contacts-line"></span>
    </div>

    <div class="contact-subtitle">готов к сотрудничеству</div>
    <div class="contact-phone">+7 (928) 418-35-37</div>

    <div class="contact-links">
      <div class="contact-label">мессенджеры</div>
      <div class="contact-dot"></div>
      <div class="contact-label">почта</div>
    </div>
  </div>
</section>

<!-- 🔻 ФУТЕР -->
<footer class="footer">
  <div class="footer-content">
    <div class="footer-left">дизайн, прототип, верстка — михаил образцов</div>
    <div class="footer-right">2025</div>
  </div>
</footer>

<script>
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
</script>

<button class="scroll-top" onclick="scrollToTop()" aria-label="Подняться наверх">
  ↑
</button>

<script>
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>


</body>
</html>

</body>
</html>
