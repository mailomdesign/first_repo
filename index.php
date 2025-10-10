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
<link rel="icon" type="image/x-icon" href="logo_fav_bw.ico" />

  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Михаил Образцов — Портфолио</title>
  <link href="https://fonts.googleapis.com/css2?family=Alumni+Sans&family=Russo+One&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/responsive.css">


  <meta name="description" content="сайт Портфолио Михаила Образцова — дизайн, реклама, маркетинг, обучение">
  <meta name="keywords" content="дизайнер, портфолио, Михаил Образцов, дизайне Краснодра, реклама Краснодар, маркетинг, графический дизайн, визуал, креатив, обучение дизайну">
  <meta name="author" content="Михаил Образцов">
  <meta property="og:locale" content="ru_RU">
  <meta property="og:title" content="Михаил Образцов — Портфолио">
  <meta property="og:description" content="Дизайнер и основатель Mailom Design. Работы, биография, контакты.">
  <meta property="og:image" content="https://mailomdesign.ru/img/preview.jpg">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://mailomdesign.ru">
  
  <script type="application/ld+json">

  
{
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://mailomdesign.ru#person",
  "name": "Михаил Образцов",
  "jobTitle": "Дизайнер, основатель Mailom Design",
  "url": "https://mailomdesign.ru",
  "sameAs": [
    "https://www.behance.net/mailom",
    "https://www.linkedin.com/in/mailom"
  ],
  "description": "Портфолио дизайнера Михаила Образцова — брендинг, визуальные системы, менторство."
}
</script>

<script src="js/menu.js"></script>


</head>
<body>



  <!-- Hero-блок -->
  <section id="hero" class="hero scroll-fade">
    <div class="hero-subtitle">сайт</div>
    <div class="hero-title">Портфолио</div>
    <div class="hero-caption">не виртуального дизайнера</div>
    <img class="hero-image" src="img/portr-1.png" alt="Портрет Михаила" />
  </section>

<!-- Плавающее меню -->
<nav class="fixed-menu">
  <ul>
  <li><a class="js-nav" href="index.php#hero">Главная</a></li>
  <li><a class="js-nav" href="index.php#bio">Био</a></li>
  <li><a class="js-nav" href="index.php#direction">Направление</a></li>
  <li><a class="js-nav" href="index.php#education">Обучение</a></li>
  <li><a class="js-nav" href="index.php#cases">Кейсы</a></li>
  <li><a class="js-nav" href="index.php#contacts">Контакты</a></li>
  </ul>
</nav>
 

<!-- === Мобильное меню === -->
<div class="mobile-menu">
  <div class="menu-header" id="menuToggle">МЕНЮ</div>

  <div class="menu-overlay" id="menuOverlay">
    <div class="menu-close" id="menuClose">&times;</div>

    <nav class="menu-content">
      <a href="#home">Главная</a>
      <a href="#bio">Био</a>
      <a href="#direction">Направление</a>
      <a href="#edu">Обучение</a>
      <a href="#cases">Кейсы</a>
      <a href="#contacts">Контакты</a>
    </nav>
  </div>
</div>




  <!-- Вертикальная полоса слева -->
  <div class="vertical-bar-left"></div>

  <!-- Bio: блок с именем и описанием -->
  <section id="bio" class="bio scroll-fade">
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
  <section class="stats-numbers scroll-fade">
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
  

  <!-- НАПРАВЛЕНИЕ -->
  <section class="direction-wrapper scroll-fade">

  <div class="direction-block scroll-fade"> <!-- ← scroll-fade должен быть именно здесь -->
   
  <div id="direction" class="direction-bg"></div>

  
  <h2 class="direction-title">НАПРАВЛЕНИЕ</h2>

  <div class="direction-line"></div>

  <p class="direction-list">
      веб дизайн<br>
      полиграфия<br>
      графический дизайн<br>
      наружная реклама<br>
      ретушь
    </p>

    <img class="direction-image" src="img/napr-im-1.png" alt="...">

  <div class="direction-square"></div>
</div>
</section>


<!-- ХАРД-СКИЛЛ -->
<div class="skills-header">
  <span class="skills-text">Хард-скилл</span>
  <span class="skills-line"></span>
</div>
  

<div class="skills-grid scroll-fade">
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

<!-- Обучение 2 -->
<section id="education" class="quote-section scroll-fade">
  <h2 class="quote-title" id="quote">
    Наставник, который сопровождает  <br />
  </h2>
  <p class="quote-text">
    Интересуют базовые навыки или требуется поднять уровень до более уверенного специалиста? <br />
    С удовольствием пройду с Вами этот путь, убрав все лишнее с упором на практику
  </p>
  <a href="education.html" class="quote-button">Перейти к обучению</a>

</section>

<!-- Заголовок "КЕЙСЫ_" -->
<div class="cases-header" >
  <span id="cases" class="cases-text">КЕЙСЫ</span>
  <span class="cases-line"></span>
</div>

<!-- СЕКЦИЯ КЕЙСЫ -->
<div class="cases-container scroll-auto-fade"></div>

<?php
$jsonData = file_get_contents('cases.json');
$cases = json_decode($jsonData, true);

if ($cases && is_array($cases)) {
    echo '<div class="case-row" id="cases">';
    foreach ($cases as $index => $case) {
        echo '<a href="' . htmlspecialchars($case["page"]) . '" class="case-link">';
        echo '<div class="case-block scroll-fade">';

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
        echo isset($case["logo_img"])
            ? '<img src="' . htmlspecialchars($case["logo_img"]) . '" alt="Логотип" class="logo-img">'
            : '';
        echo '<div class="case-title">' . htmlspecialchars($case["title"]) . '</div>';
        echo '<div class="case-label">' . htmlspecialchars($case["label"]) . ':</div>';
        echo '<div class="case-desc">' . htmlspecialchars($case["desc"]) . '</div>';
        echo '<div class="case-site">' . htmlspecialchars($case["site"]) . '</div>';
        echo '<div class="case-tag">' . htmlspecialchars($case["tag"]) . '</div>';
        echo '</div>';

        echo '</div>'; // .case-block
        echo '</a>';   // .case-link

        // Каждые 3 кейса — новая строка
        if (($index + 1) % 3 == 0 && $index + 1 < count($cases)) {
            echo '</div><div class="case-row">';
        }
    }
    echo '</div>'; // Закрытие последнего .case-row
} else {
    echo "<p style='color:red;'>Ошибка: не удалось загрузить данные кейсов.</p>";
}
?>



<!-- ЦИТАТА 2 -->
<section class="quote-section 2 scroll-fade">
  <h2 class="quote-title">
    Дизайн без воплощения — это идея. <br />
  </h2>
  <p class="quote-text">
  Творческие идеи вдохновляют, но эффективность требует конкретных решений. <br />
   Я помогу вам воплотить их в презентацию, которая работает.
  </p>
</section>


<!-- КОНТАКТЫ -->
<section class="contacts-section scroll-fade">

  <div id="contacts" class="contacts-left">
    <img src="img/mikhail-at-work.jpg" alt="Фото в тоне" class="contact-image" />
  </div>

  <div class="contacts-right">

    <!-- Заголовок КОНТАКТЫ_ в едином стиле с кейсами -->
    <div class="contacts-header">
      <span class="contacts-text">КОНТАКТЫ</span>
      <span class="contacts-line"></span>
    </div>

    <div class="contact-subtitle">готов к сотрудничеству</div>
    <div class="contact-phone" id="openModal" role="button" tabindex="0">
  Обратная связь
</div>
  </div>
</section>


<!-- Футер -->
<footer class="footer">
  <div class="footer-content">
    <div class="footer-left">дизайн, прототип, верстка — михаил образцов</div>
    <div class="footer-right">2025</div>
  </div>
</footer>


<button class="scroll-top" onclick="scrollToTop()" aria-label="Подняться наверх">
  ↑
</button>



<div class="custom-scrollbar">
  <div class="scroll-thumb"></div>
</div>

<script src="js/script.js"></script>




<!-- модалка: вставлять перед </body> -->
<div id="feedbackModal" class="modal">
  <div class="modal-content">
    <span class="close" id="closeModal">&times;</span>
    <h2>Обратная связь</h2>
    <form action="php/send.php" method="post" class="feedback-form">
      <label for="name">Ваше имя</label>
      <input type="text" id="name" name="name" placeholder="Как я могу к Вам обращаться" required>
      <label for="phone">Контактный номер телефона</label>
      <input type="tel" id="phone" name="phone" placeholder="Ваш контактный номер" required>
      <label for="subject">Тема сообщения</label>
      <select id="subject" name="subject" required>
        <option value="">Выберите необходимое</option>
        <option value="Сотрудничество">Сотрудничество</option>
        <option value="Обучение">Обучение</option>
      </select>
      <label for="message">Краткое описание</label>
      <textarea id="message" name="message" placeholder="Введите сообщение" required></textarea>
      <button type="submit">Отправить</button>
      
<!-- вставляем внутрь формы, в том же контейнере, где поля и кнопка -->
<div class="consent">
  <input type="checkbox" id="consent" name="consent" required aria-required="true">
  <label for="consent" class="consent-label">
    Я принимаю условия использования и политику конфиденциальности и даю согласие на обработку данных
  </label>
</div>


    </form>
  </div>
</div>


<script src="js/menu.js"></script>
</body>
</html>
