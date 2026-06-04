# СТО «Термотранс» — багатосторінковий сайт

Статичний багатосторінковий сайт для СТО «Термотранс» у Дніпрі. Проєкт зроблений на чистому HTML, CSS і JavaScript без фреймворків. Дизайн розвиває попередній односторінковий сайт: темний hero з майстернею, графітово-помаранчева палітра, компактні картки, sticky header, mobile menu, FAQ і форми заявки.

## Структура сторінок

- `index.html` — головна сторінка.
- `about.html` — про СТО.
- `services.html` — усі послуги.
- `service-diagnostics.html` — комп’ютерна діагностика.
- `service-maintenance.html` — технічне обслуговування.
- `service-suspension.html` — ремонт ходової.
- `service-brakes.html` — ремонт гальмівної системи.
- `service-engine.html` — ремонт двигуна.
- `service-electric.html` — електрика авто.
- `service-commercial.html` — комерційний транспорт.
- `prices.html` — ціни без вигаданих точних сум.
- `reviews.html` — відгуки з placeholder-контентом.
- `contacts.html` — контакти, месенджери, карта placeholder і форма.
- `privacy.html` — політика конфіденційності.

## Файли

- `css/styles.css` — спільні стилі, адаптивність, header, hero, картки, форми, FAQ, footer.
- `js/script.js` — burger menu, dropdown, sticky header, FAQ accordion, form validation, success message, back-to-top, reveal-анімації.
- `assets/images/hero-workshop.png` — поточне hero-зображення майстерні.
- `assets/icons/` — локальні SVG-іконки для послуг і CTA.
- `robots.txt` і `sitemap.xml` — базові SEO-файли.

## Як відкрити локально

Можна відкрити `index.html` у браузері напряму. Для перевірки всіх переходів зручніше запустити простий static server у корені проєкту:

```bash
python -m http.server 8000
```

Після цього відкрити `http://localhost:8000/`.

## Як замінити дані

Перед публікацією знайдіть усі `TODO` у HTML-файлах і замініть:

- точну адресу;
- телефон і `tel:` посилання;
- email;
- графік роботи;
- посилання Telegram, Viber, WhatsApp;
- Google Maps iframe;
- реальні фото СТО, фасаду, боксів, майстрів, обладнання;
- реальні відгуки;
- домен у canonical, Open Graph і sitemap;
- favicon;
- Open Graph image.

## Як додати реальні фото

Покладіть зображення у `assets/images/`, оптимізуйте їх перед завантаженням і замініть placeholder-блоки або hero image у HTML/CSS. Для фото потрібні змістовні `alt`-атрибути.

## Як підключити форму

Зараз форми мають лише frontend-валидацію і показують повідомлення:
`Дякуємо! Ваша заявка підготовлена. Ми зв’яжемося з вами найближчим часом.`

Для реального надсилання можна підключити:

- Netlify Forms;
- Formspree;
- EmailJS;
- власний backend.

Коментарі TODO біля форм підказують місця інтеграції.

## Публікація на Netlify

1. Створіть новий сайт у Netlify.
2. Завантажте всю папку проєкту через drag-and-drop або підключіть Git-репозиторій.
3. Переконайтеся, що `index.html`, папки `css`, `js`, `assets`, `robots.txt` і `sitemap.xml` лежать у корені публікації.
4. Після публікації замініть `https://example.com/` на реальний домен.

## TODO перед публікацією

- Замінити контактні placeholder-дані.
- Додати реальні фото.
- Додати реальні відгуки.
- Уточнити список послуг і фактичні можливості СТО.
- Перевірити текст політики конфіденційності.
- Підключити реальну відправку форм.
- Оновити canonical, `og:url`, sitemap і robots.
- Додати favicon та Open Graph image.
- Перевірити сторінки на 320, 375, 430, 768, 1024 і 1440 px.
