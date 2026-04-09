import type { Locale } from './types'
import type { MessageKey } from './types'

export const messages: Record<Locale, Record<MessageKey, string>> = {
  hy: {
    'nav.home': 'ԳԼԽԱՎՈՐ',
    'nav.about': 'ՄԵՐ ՄԱՍԻՆ',
    'nav.departments': 'ԲԱԺԱՆՄՈՒՆՔՆԵՐ',
    'nav.team': 'ԱՆՁՆԱԿԱԶՄ',
    'nav.gallery': 'ՊԱՏԿԵՐԱՍՐԱՀ',
    'nav.news': 'ՆՈՐՈՒԹՅՈՒՆՆԵՐ',
    'nav.contacts': 'ԿԱՊ',
    'nav.aria': 'Հիմնական նավիգացիա',
    'nav.menu': 'ՄԵՆՅՈՒ',
    'nav.close': 'ՓԱԿԵԼ',
    'nav.drawerAria': 'Կայքի ընտրացանց',
    'hero.line1': 'ԱՎԵԼԻ ՔԱՆ 100 ՏԱՐՎԱ ՓՈՐՁ,',
    'hero.line2': 'ՆՈՐԱՐԱՐԱԿԱՆ ՏԵԽՆՈԼՈԳԻԱՆԵՐ,',
    'hero.line3': 'ՀՈԳԱՏԱՐ ՎԵՐԱԲԵՐՄՈՒՆՔ',
    'hero.readMore': 'ԿԱՐԴԱԼ ԱՎԵԼԻՆ',
    'home.intro.title':
      'ԺԱՄԱՆԱԿԱԿԻՑ ԲԺՇԿՈՒԹՅՈՒՆ՝ ՎՍՏԱՀԵԼԻ ԵՎ ՀՈԳԱՏԱՐ ՁԵՐՔԵՐՈՒՄ',
    'home.intro.body':
      'Առողջությունը մարդու կյանքի հիմքն է։ Բեգլարյան բժշկական կենտրոնում մենք առաջարկում ենք ժամանակակից, որակյալ և վստահելի բժշկական ծառայություններ՝ կիրառելով նորագույն տեխնոլոգիաներ և բարձրակարգ մասնագիտական թիմ։ Ձեր առողջությունն ու հանգստությունը մեր առաջնահերթությունն են։',
    'home.carousel.label': 'Բաժինների սլայդեր',
    'home.carousel.prev': '- Նախորդ',
    'home.carousel.next': 'Հաջորդ -',
    'home.carousel.prevAria': 'Նախորդ սլայդ',
    'home.carousel.nextAria': 'Հաջորդ սլայդ',
    'home.carousel.slide.gynecology': 'ԳԻՆԵԿՈԼՈԳԻԱ',
    'home.carousel.slide.cardiology': 'ԿԱՐԴԻՈԼՈԳԻԱ',
    'home.carousel.slide.pediatrics': 'ՄԱՆԿԱԿԱՆ ԲԺՇԿՈՒԹՅՈՒՆ',
    'home.careMoment.kicker': 'ՄԵՐ ՄԱՍԻՆ',
    'home.careMoment.title':
      'Յուրաքանչյուր կյանքի պատմություն սկսվում է վստահությունից և խնամքից',
    'home.careMoment.body':
      'Մենք հավատարիմ ենք այն մտածողությանը, որ բժշկությունը միայն ախտորոշում չէ․ այն նաև ուշադրություն, ջերմություն և անվտանգություն է ձեր ընտանիքի համար։',
    'home.careMoment.imageCaption':
      'Նորածնի ձեռքը մեծահասակի ձեռքերի մեջ',
    'home.news.item1.title':
      'Մեծ քայլ՝ անպտղության դեմ պայքարում. նոր բաժանմունք է ստեղծվել «Բեգլարյան» ԲԿ-ում',
    'home.news.item1.imageCaption': 'Ուլտրաձայնային հետազոտություն',
    'home.news.item2.quote':
      '«Ունեցեք շատ երեխաներ, որակը պահելով՝ պիտի շատանք»։',
    'home.news.item2.byline':
      'մանկաբարձ-գինեկոլոգ ԱՐՄԻՆԵ ՀԱՐՈՒԹՅՈՒՆՅԱՆ',
    'home.news.item3.title':
      'Երկու օրգանիզմի շունչ տվողը. մանկաբարձ-գինեկոլոգ Արմինե Հարությունյանի «Հաջողության նոտան»',
    'home.news.allNews': 'ԲՈԼՈՐ ՆՈՐՈՒԹՅՈՒՆՆԵՐԸ',
    'notFound.message': 'Էջը չի գտնվել։',
    'notFound.home': 'Գլխավոր',
    'stub.message': 'Այս բաժինը պատրաստվում է։',
    'lang.hy': 'Հայերեն',
    'lang.ru': 'Русский',
    'lang.en': 'English',
    'lang.menuAria': 'Լեզու',
  },
  ru: {
    'nav.home': 'Главная',
    'nav.about': 'О нас',
    'nav.departments': 'Отделения',
    'nav.team': 'Сотрудники',
    'nav.gallery': 'Галерея',
    'nav.news': 'Новости',
    'nav.contacts': 'Контакты',
    'nav.aria': 'Основная навигация',
    'nav.menu': 'Меню',
    'nav.close': 'Закрыть',
    'nav.drawerAria': 'Меню сайта',
    'hero.line1': 'Более 100 лет опыта,',
    'hero.line2': 'инновационные технологии,',
    'hero.line3': 'заботливое отношение',
    'hero.readMore': 'ЧИТАТЬ ДАЛЕЕ',
    'home.intro.title':
      'СОВРЕМЕННАЯ МЕДИЦИНА — В НАДЁЖНЫХ И ЗАБОТЛИВЫХ РУКАХ',
    'home.intro.body':
      'Здоровье — основа жизни человека. В медицинском центре Бегларян мы предлагаем современные, качественные и надёжные медицинские услуги с применением передовых технологий и команды высококлассных специалистов. Ваше здоровье и спокойствие — наш приоритет.',
    'home.carousel.label': 'Слайдер отделений',
    'home.carousel.prev': '- Назад',
    'home.carousel.next': 'Далее -',
    'home.carousel.prevAria': 'Предыдущий слайд',
    'home.carousel.nextAria': 'Следующий слайд',
    'home.carousel.slide.gynecology': 'ГИНЕКОЛОГИЯ',
    'home.carousel.slide.cardiology': 'КАРДИОЛОГИЯ',
    'home.carousel.slide.pediatrics': 'ПЕДИАТРИЯ',
    'home.careMoment.kicker': 'О НАС',
    'home.careMoment.title':
      'Каждая история жизни начинается с доверия и заботы',
    'home.careMoment.body':
      'Мы верим, что медицина — это не только диагнозы и процедуры, но и внимание, тепло и спокойствие для всей вашей семьи.',
    'home.careMoment.imageCaption':
      'Рука новорождённого в руках взрослого',
    'home.news.item1.title':
      'Большой шаг в борьбе с бесплодием: в «Бегларян» открыто новое отделение',
    'home.news.item1.imageCaption': 'Ультразвуковое исследование',
    'home.news.item2.quote':
      '«Заводите больше детей — сохраняя качество, мы должны расти численно».',
    'home.news.item2.byline':
      'акушер-гинеколог АРМИНЕ АРУТЮНЯН',
    'home.news.item3.title':
      'Дыхание двух организмов: акушер-гинеколог Армине Арутюнян в программе «Нота успеха»',
    'home.news.allNews': 'ВСЕ НОВОСТИ',
    'notFound.message': 'Страница не найдена.',
    'notFound.home': 'На главную',
    'stub.message': 'Раздел в разработке.',
    'lang.hy': 'Հայերեն',
    'lang.ru': 'Русский',
    'lang.en': 'English',
    'lang.menuAria': 'Язык',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About us',
    'nav.departments': 'Departments',
    'nav.team': 'Staff',
    'nav.gallery': 'Gallery',
    'nav.news': 'News',
    'nav.contacts': 'Contacts',
    'nav.aria': 'Main navigation',
    'nav.menu': 'Menu',
    'nav.close': 'Close',
    'nav.drawerAria': 'Site menu',
    'hero.line1': 'More than 100 years of experience,',
    'hero.line2': 'innovative technologies,',
    'hero.line3': 'a caring approach',
    'hero.readMore': 'READ MORE',
    'home.intro.title':
      'MODERN MEDICINE — IN CAPABLE AND CARING HANDS',
    'home.intro.body':
      'Health is the foundation of human life. At Beglaryan Medical Center we provide modern, high-quality, and reliable medical care using advanced technology and a highly skilled professional team. Your wellbeing and peace of mind are our priority.',
    'home.carousel.label': 'Department slides',
    'home.carousel.prev': '- Previous',
    'home.carousel.next': 'Next -',
    'home.carousel.prevAria': 'Previous slide',
    'home.carousel.nextAria': 'Next slide',
    'home.carousel.slide.gynecology': 'GYNECOLOGY',
    'home.carousel.slide.cardiology': 'CARDIOLOGY',
    'home.carousel.slide.pediatrics': 'PEDIATRICS',
    'home.careMoment.kicker': 'ABOUT US',
    'home.careMoment.title':
      'Every life story begins with trust and care',
    'home.careMoment.body':
      'We believe medicine is more than tests and treatments — it is attention, warmth, and a steady sense of safety for your whole family.',
    'home.careMoment.imageCaption':
      "A newborn's hand held gently by an adult",
    'home.news.item1.title':
      'A major step against infertility: a new department opens at Beglaryan Medical Center',
    'home.news.item1.imageCaption': 'Ultrasound scan',
    'home.news.item2.quote':
      '"Have more children — while keeping quality, we must grow in number."',
    'home.news.item2.byline':
      'Obstetrician-gynecologist ARMINE HARUTYUNYAN',
    'home.news.item3.title':
      'Giving breath to two lives: Dr. Armine Harutyunyan on «The Note of Success»',
    'home.news.allNews': 'ALL NEWS',
    'notFound.message': 'Page not found.',
    'notFound.home': 'Back to home',
    'stub.message': 'This section is coming soon.',
    'lang.hy': 'Հայերեն',
    'lang.ru': 'Русский',
    'lang.en': 'English',
    'lang.menuAria': 'Language',
  },
}
