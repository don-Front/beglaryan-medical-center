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
    'home.testimonials.title': 'ԲՈՒԺԱՌՈՒՆԵՐԻ ԿԱՐԾԻՔՆԵՐ',
    'home.testimonials.navAria': 'Հաջորդ և նախորդ կարծիք',
    'home.testimonials.prevAria': 'Նախորդ կարծիք',
    'home.testimonials.nextAria': 'Հաջորդ կարծիք',
    'home.testimonials.slide0.text':
      '«Հղիության ընթացքում շատ հարցեր ու վախեր ունեի, բայց այստեղ փորձառու և հոգատար բժիշկներն ինձ ուղեկցեցին քայլ առ քայլ, ամեն մանրուք բացատրեցին։ Շատ հարմարավետ և ջերմ մթնոլորտ էր։ Հիմա վստահ եմ՝ իմ աղջիկը ճիշտ վայրում է ծնվել։»',
    'home.testimonials.slide0.author': 'Սոնա Գասպարյան',
    'home.testimonials.slide1.text':
      '«Բեգլարյան բժշկական կենտրոնում ծառայությունների որակը գերազանցեց իմ սպասելիքները։ Անգամ վիրահատությունից հետո վերականգնման շրջանը անցավ հանգիստ ու արագ՝ շնորհիվ փորձառու թիմի։»',
    'home.testimonials.slide1.author': 'Նաիրա Չիթչյան',
    'home.testimonials.slide2.text':
      '«Շատ նուրբ և հարգալից վերաբերմունք էր դեռահաս աղջիկների գինեկոլոգիական հարցերում։ Իմ աղջիկը վստահեց բժշկին՝ առանց ամաչելու։ Դա ինձ համար ամենակարևորն էր։»',
    'home.testimonials.slide2.author': 'Անահիտ Գաբրիելյան',
    'home.testimonials.slide3.text':
      '«Նման պրոֆեսիոնալ ու տեխնիկապես հագեցած վայր Երևանում քիչ կգտնես։ Ճիշտ որոշում էր հենց Բեգլարյան կենտրոն դիմելը։»',
    'home.testimonials.slide3.author': 'Անի Հակոբյան',
    'home.testimonials.slide4.text':
      '«Շնորհակալ եմ Բեգլարյանի բոլոր մասնագետներին՝ թե՛ բուժման համար, թե՛ մարդկային վերաբերմունքի համար։»',
    'home.testimonials.slide4.author': 'Շողեր Ալեքսանյան',
    'home.testimonials.slide5.text':
      '«Հղիության երկրորդ եռամսյակում որոշ բարդություններ ի հայտ եկան, և ես շատ էի անհանգստանում։ Բժիշկս կողքիս էր ամեն քայլի, ինչի համար շատ շնորհակալ եմ։ Հիմա առողջ բալիկի մայրիկ եմ։»',
    'home.testimonials.slide5.author': 'Անի Մնացականյան',
    'home.testimonials.slide6.text':
      '«Իմ մայրիկը պրոֆեսիոնալ և հոգատար վերաբերմունք է ստացել Բեգլարյան կենտրոնում։ Դաշտանադադարից հետո առաջացած խնդիրներն են լուծված, և նա իրեն նորից լիարժեք կին է զգում։»',
    'home.testimonials.slide6.author': 'Սարգսյան Զառա',
    'home.cta.title': 'Հարցեր ունե՞ք, գրե՛ք մեզ',
    'home.cta.button': 'Ուղարկել նամակ',
    'footer.copyright': '© 2026 All rights reserved',
    'footer.facebookAria': 'Facebook',
    'footer.instagramAria': 'Instagram',
    'feedback.mapTitle': 'Բեգլարյան բժշկական կենտրոն — քարտեզ',
    'feedback.emailLabel': 'Էլ. փոստի հասցե',
    'feedback.addressLabel': 'Հասցե',
    'feedback.phonesLabel': 'Հեռախոսահամարներ',
    'feedback.addressValue': 'ՀՀ, ք. Երևան, Աբովյան 56',
    'feedback.emailValue': 'beglaryanclinic@gmail.com',
    'feedback.phoneLine1': '+374 41 28 88 10',
    'feedback.phoneLine2': '+374 55 38 88 10',
    'feedback.phoneLine3': '+374 10 56 45 19 (շուրջօրյա)',
    'feedback.formNamePlaceholder': 'Անուն ազգանուն',
    'feedback.formPhonePlaceholder': 'Հեռախոսահամարներ',
    'feedback.formEmailPlaceholder': 'Էլ. փոստի հասցե',
    'feedback.formMessagePlaceholder': 'Նամակ',
    'feedback.formServicePlaceholder': 'Ծառայություններ',
    'feedback.formService1': 'ԳԻՆԵԿՈԼՈԳԻԱ',
    'feedback.formService2': 'ԾՆՆԴՕԳՆՈՒԹՅՈՒՆ',
    'feedback.formService3': 'ՀՂԻՆԵՐԻ ԱԽՏԱԲԱՆՈՒԹՅՈՒՆ',
    'feedback.formService4':
      'ՆՈՐԱԾՆԱՅԻՆ ԲԱԺԱՆՄՈՒՆՔ, ԱՆՀԱՍ ՆՈՐԱԾԻՆՆԵՐԻ ԽՆԱՄՔ',
    'feedback.formService5': 'ՆՈՐԱԾԻՆՆԵՐԻ ԽՆԱՄՔ',
    'feedback.formService6': 'ՄԱՆԿԱԿԱՆ ԳԻՆԵԿՈԼՈԳԻԱ',
    'feedback.formService7': 'ՀԱԿԱՏԱՐԻՔԱՅԻՆ ԳԻՆԵԿՈԼՈԳԻԱ',
    'feedback.formService8': 'ԱՆՈԹԱՅԻՆ ՎԻՐԱԲՈՒԺՈՒԹՅՈՒՆ',
    'feedback.formService9':
      'ԱՆՈԹԱՅԻՆ ՎԻՐԱԲՈՒԺՈՒԹՅՈՒՆ, ՍՏԱՑԻՈՆԱՐ ԲՈՒԺՕԳՆՈՒԹՅՈՒՆ',
    'feedback.formService10': 'ՔԻԹ-ԿՈԿՈՐԴ-ԱԿԱՆՋԱԲԱՆՈՒԹՅՈՒՆ',
    'feedback.formService11': 'ՎԻՐԱՀԱՏԱՐԱՆ',
    'feedback.formService12':
      'ԴԻՄԱԾՆՈՏԱՅԻՆ ԵՎ ՊԼԱՍՏԻԿ ՎԻՐԱԲՈՒԺՈՒԹՅՈՒՆ',
    'feedback.formService13': 'ԱՅԼ',
    'feedback.formMailSubject': 'Հաղորդագրություն կայքից',
    'notFound.message': 'Էջը չի գտնվել։',
    'notFound.home': 'Գլխավոր',
    'stub.message': 'Այս բաժինը պատրաստվում է։',
    'about.hero.alt':
      'Վիրահատարան՝ բժիշկների թիմը գործողության ժամանակ',
    'about.intro.headingLine1': 'ԱՎԵԼԻ ՔԱՆ 100 ՏԱՐՎԱ ՓՈՐՁ,',
    'about.intro.headingLine2': 'ԺԱՄԱՆԱԿԱԿԻՑ ՄԵԹՈԴՆԵՐ,',
    'about.intro.headingLine3': 'ՀՈԳԱՏԱՐ ՎԵՐԱԲԵՐՄՈՒՆՔ',
    'about.intro.p1':
      '«Բեգլարյան» բժշկական կենտրոնը (նախկինում՝ թիվ 2 ծննդատուն, Ընտանիքի պլանվորման և սեռական առողջության կենտրոն) ժամանակակից բազմապրոֆիլ բժշկական կենտրոն է, որը գործում է 1920 թվականից՝ որպես Հայաստանի Հանրապետության առաջին մանկաբարձագինեկոլոգիական ստացիոնար։',
    'about.intro.p2':
      'Շենքի շինարարությունն իրականացվել է ակադեմիկոս Ա. Պ. Թամանյանի նախագծով։ Այն պատկանում է ճարտարապետական կոթողների թվին։ Կենտրոնն ունի հարուստ գրադարան, դասասենյակներ և 180 տեղանոց լսարան։',
    'about.intro.p3':
      'Բեգլարյան ԲԿ-ում աշխատում են բարձր որակավորում ունեցող արհեստավարժ բժիշկներ։ Կենտրոնը կրում է ՀՀ-ում մանկաբարձագինեկոլոգիական դպրոցի հիմնադիրներից մեկի՝ ՀՀ բժշկական գիտությունների ակադեմիայի ակադեմիկոս, գիտության վաստակավոր գործիչ, վաստակավոր բժիշկ, բժշկական գիտությունների դոկտոր, պրոֆեսոր Գագիկ Արտաշեսի Բեգլարյանի անունը։ Նա շուրջ երեք տասնամյակ ղեկավարել է կլինիկան և ԵՊԲՀ մանկաբարձության և գինեկոլոգիայի թիվ 1 ամբիոնը։ Փորձառու պրոֆեսորը տիրապետում էր մանկաբարձագինեկոլոգիական բարդ վիրահատությունների ամբողջ ծավալին։ 1975թ. նա Հայաստանում առաջին անգամ կատարել է ախտորոշիչ-բուժիչ լապարոսկոպիա և հիստերոսկոպիա, որի շնորհիվ հնարավոր է դարձել զարգացման վաղ փուլերում ախտորոշել և բուժել որովայնի խոռոչի օրգանների և էնդոմետրիումի մի շարք ախտաբանական գործընթացներ։',
    'about.intro.p4':
      '1925թ. թիվ 2 ծննդատան բազայի վրա հիմնադրվել է Երևանի պետական բժշկական ինստիտուտի մանկաբարձության և գինեկոլոգիայի ամբիոնը, որը տարբեր տարիներին ղեկավարել են հանրահայտ բժիշկ-գիտնականներ՝ պրոֆեսորներ Գ.Ա. Արեշյանը, Ա.Մ. Ահարոնովը, Բ.Գ. Սայադյանը, Կ.Բ. Ակունցը, Գ.Ա. Բեգլարյանը։ 2022թ. առ այսօր ամբիոնի վարիչը Բեգլարյան ԲԿ-ի գիտության գծով խորհրդատուն է՝ բժշկական գիտությունների դոկտոր, պրոֆեսոր Ա.Գ. Հարությունյանը։',
    'about.intro.p5':
      'Բացի տեղացիներից, ամբիոնում ուսուցում են անցնում նաև արտերկրից ժամանած մեր հայրենակիցները, ինչպես նաև անգլախոս և ռուսախոս ուսանողներ (4-6-րդ կուրս), կազմակերպվում է մանկաբարձ-գինեկոլոգների մասնագիտական պատրաստման գործընթացը կլինիկական օրդինատուրայում։ Շարունակական բժշկական կրթության շրջանակում կենտրոնում վերապատրաստում է անցնում մայրաքաղաքի և հանրապետության տարբեր մարզերի ծննդօգնության հիմնարկներում աշխատող ավագ և միջին բուժանձնակազմը։ Բժշկական կենտրոնը միաժամանակ գիտական կենտրոն է, որտեղ իրականացվում են մանկաբարձագինեկոլոգիական արդի հիմնախնդիրներին նվիրված գիտական հետազոտություններ, պաշտպանվում են թեկնածուական և դոկտորական ատենախոսություններ։',
    'about.heritage.alt':
      'Պատմական լուսանկար՝ բժիշկ բժշկական հանդերձանքով',
    'about.heritage.headingLine1': 'ՁԵՐ ԱՌՈՂՋՈՒԹՅՈՒՆԸ ՄԵՐ',
    'about.heritage.headingLine2': 'ԱՌԱՔԵԼՈՒԹՅՈՒՆՆ Է',
    'about.missionDetail.p1':
      'Մեր առաքելությունն է մատուցել բարձրակարգ և համապարփակ բժշկական ծառայություններ՝ համատեղելով ժամանակակից մեթոդները, տասնամյակների փորձը և հոգատար վերաբերմունքը։ Մենք ձգտում ենք, որ յուրաքանչյուր բուժառու մեզ մոտ գտնի անվտանգ, հոգատար միջավայր՝ ստանալով բարձրակարգ մասնագիտական օգնության ու ջերմ վերաբերմունք։',
    'about.whyChoose.headingLine1': 'ԻՆՉՈՒ ԸՆՏՐԵԼ ՄԵԶ',
    'about.whyChoose.item1.title': '100+ տարվա փորձ',
    'about.whyChoose.item1.body':
      'Հիմնադրված լինելով 1920թ., մենք շարունակաբար հարստացրել ենք մեր փորձն ու արժանացել վստահության։',
    'about.whyChoose.item2.title': 'Բարձր որակավորում ունեցող թիմ',
    'about.whyChoose.item2.body':
      'Մեզ մոտ աշխատում են առաջատար բժիշկներ՝ գիտական աստիճաններով և միջազգային փորձով։',
    'about.whyChoose.item3.title': 'Ժամանակակից մոտեցումներ',
    'about.whyChoose.item3.body':
      'Լապարոսկոպիկ վիրաբուժությունից մինչև անհաս նորածինների խնամք՝ մենք կիրառում ենք նորագույն մեթոդներ։',
    'about.whyChoose.item4.title': 'Հոգատար միջավայր',
    'about.whyChoose.item4.body':
      'Մենք հասկանում ենք բուժառուի հուզական վիճակը և աջակցում ոչ միայն ֆիզիկապես, այլև հոգեպես։',
    'about.whyChoose.item5.title': 'Միջազգային կապեր',
    'about.whyChoose.item5.body':
      'Մեր համագործակցությունը միջազգային հաստատությունների հետ մեզ պահում է գիտության առաջնագծում։',
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
    'home.testimonials.title': 'ОТЗЫВЫ ПАЦИЕНТОВ',
    'home.testimonials.navAria': 'Предыдущий и следующий отзыв',
    'home.testimonials.prevAria': 'Предыдущий отзыв',
    'home.testimonials.nextAria': 'Следующий отзыв',
    'home.testimonials.slide0.text':
      '«Во время беременности у меня было много вопросов и страхов, но здесь опытные и внимательные врачи сопровождали меня шаг за шагом и объясняли каждую мелочь. Было очень комфортно и тепло. Теперь я уверена: моя дочь родилась там, где нужно.»',
    'home.testimonials.slide0.author': 'Сона Гаспарян',
    'home.testimonials.slide1.text':
      '«Качество услуг в медицинском центре Бегларян превзошло мои ожидания. Даже после операции период восстановления прошёл спокойно и быстро — благодаря опытной команде.»',
    'home.testimonials.slide1.author': 'Наира Читчян',
    'home.testimonials.slide2.text':
      '«Очень деликатное и уважительное отношение к гинекологическим вопросам подростков. Моя дочь доверилась врачу без стеснения. Для меня это было главным.»',
    'home.testimonials.slide2.author': 'Анаит Габриелян',
    'home.testimonials.slide3.text':
      '«Таких профессиональных и технически оснащённых мест в Ереване немного. Обратиться именно в центр Бегларян было правильным решением.»',
    'home.testimonials.slide3.author': 'Ани Акобян',
    'home.testimonials.slide4.text':
      '«Благодарю всех специалистов Бегларяна — и за лечение, и за человеческое отношение.»',
    'home.testimonials.slide4.author': 'Шогер Алексанян',
    'home.testimonials.slide5.text':
      '«Во втором триместре беременности появились осложнения, и я очень переживала. Мой врач был рядом на каждом шагу — за это большое спасибо. Теперь я мама здорового малыша.»',
    'home.testimonials.slide5.author': 'Ани Мнацаканян',
    'home.testimonials.slide6.text':
      '«Моя мама получила профессиональное и заботливое отношение в центре Бегларян. Проблемы после менопаузы решены, и она снова чувствует себя полноценной женщиной.»',
    'home.testimonials.slide6.author': 'Зара Саргсян',
    'home.cta.title': 'Есть вопросы? Напишите нам',
    'home.cta.button': 'Отправить сообщение',
    'footer.copyright': '© 2026 All rights reserved',
    'footer.facebookAria': 'Facebook',
    'footer.instagramAria': 'Instagram',
    'feedback.mapTitle': 'Медицинский центр Бегларян — карта',
    'feedback.emailLabel': 'Электронная почта',
    'feedback.addressLabel': 'Адрес',
    'feedback.phonesLabel': 'Телефоны',
    'feedback.addressValue': 'РА, г. Ереван, ул. Абовяна, 56',
    'feedback.emailValue': 'beglaryanclinic@gmail.com',
    'feedback.phoneLine1': '+374 41 28 88 10',
    'feedback.phoneLine2': '+374 55 38 88 10',
    'feedback.phoneLine3': '+374 10 56 45 19 (круглосуточно)',
    'feedback.formNamePlaceholder': 'Имя и фамилия',
    'feedback.formPhonePlaceholder': 'Телефон',
    'feedback.formEmailPlaceholder': 'Электронная почта',
    'feedback.formMessagePlaceholder': 'Сообщение',
    'feedback.formServicePlaceholder': 'Услуги',
    'feedback.formService1': 'Гинекология',
    'feedback.formService2': 'Акушерство',
    'feedback.formService3': 'Патология беременности',
    'feedback.formService4':
      'Неонатальное отделение, уход за недоношенными новорождёнными',
    'feedback.formService5': 'Уход за новорождёнными',
    'feedback.formService6': 'Детская гинекология',
    'feedback.formService7': 'Антивозрастная гинекология',
    'feedback.formService8': 'Сосудистая хирургия',
    'feedback.formService9': 'Сосудистая хирургия, стационарное лечение',
    'feedback.formService10': 'Оториноларингология',
    'feedback.formService11': 'Операционная',
    'feedback.formService12':
      'Челюстно-лицевая и пластическая хирургия',
    'feedback.formService13': 'Другое',
    'feedback.formMailSubject': 'Сообщение с сайта',
    'notFound.message': 'Страница не найдена.',
    'notFound.home': 'На главную',
    'stub.message': 'Раздел в разработке.',
    'about.hero.alt':
      'Операционная: команда врачей во время операции',
    'about.intro.headingLine1': 'БОЛЕЕ 100 ЛЕТ ОПЫТА,',
    'about.intro.headingLine2': 'СОВРЕМЕННЫЕ МЕТОДЫ,',
    'about.intro.headingLine3': 'ВНИМАТЕЛЬНОЕ ОТНОШЕНИЕ',
    'about.intro.p1':
      'Медицинский центр «Бегларян» (ранее — родильный дом № 2, центр планирования семьи и сексуального здоровья) — современный многопрофильный медицинский центр, работающий с 1920 года как первый в Республике Армения стационар по акушерству и гинекологии.',
    'about.intro.p2':
      'Здание построено по проекту академика А. П. Таманяна и относится к числу архитектурных памятников. В центре есть богатая библиотека, учебные аудитории и зал на 180 мест.',
    'about.intro.p3':
      'В Бегларян МЦ работают высококвалифицированные опытные врачи. Центр носит имя одного из основателей армянской школы акушерства и гинекологии — академика НАМН РА, заслуженного деятеля науки, заслуженного врача, доктора медицинских наук, профессора Гагика Арташесовича Бегларяна. Около трёх десятилетий он руководил клиникой и кафедрой акушерства и гинекологии № 1 ЕГМУ. Опытный профессор владел полным объёмом сложных акушерско-гинекологических операций. В 1975 году он впервые в Армении выполнил диагностическую и лечебную лапароскопию и гистероскопию, что позволило на ранних стадиях диагностировать и лечить ряд патологических процессов органов брюшной полости и эндометрия.',
    'about.intro.p4':
      'В 1925 году на базе родильного дома № 2 была основана кафедра акушерства и гинекологии Ереванского государственного медицинского института, которую в разные годы возглавляли известные учёные-врачи: профессора Г. А. Арешян, А. М. Ахаронов, Б. Г. Саядян, К. Б. Акунц, Г. А. Бегларян. С 2022 года по настоящее время заведующим кафедрой является научный консультант Бегларян МЦ, доктор медицинских наук, профессор А. Г. Арутюнян.',
    'about.intro.p5':
      'Наряду с местными обучение на кафедре проходят также соотечественники из-за рубежа, а также англоязычные и русскоязычные студенты (4–6 курсы); организуется профессиональная подготовка акушеров-гинекологов в клинической ординатуре. В рамках непрерывного медицинского образования в центре проходят переподготовку старший и средний медицинский персонал родильных учреждений столицы и различных областей республики. Медицинский центр одновременно является научным центром, где ведутся исследования по актуальным проблемам акушерства и гинекологии, защищаются кандидатские и докторские диссертации.',
    'about.heritage.alt':
      'Исторический снимок: врач в медицинской форме',
    'about.heritage.headingLine1': 'ВАШЕ ЗДОРОВЬЕ',
    'about.heritage.headingLine2': 'НАША МИССИЯ',
    'about.missionDetail.p1':
      'Наша миссия — оказывать качественные и комплексные медицинские услуги, сочетая современные методы, десятилетия опыта и внимательное отношение. Мы стремимся к тому, чтобы каждый пациент у нас находил безопасную, заботливую среду, получая квалифицированную профессиональную помощь и тёплое отношение.',
    'about.whyChoose.headingLine1': 'ПОЧЕМУ ВЫБИРАЮТ НАС',
    'about.whyChoose.item1.title': 'Более 100 лет опыта',
    'about.whyChoose.item1.body':
      'Основанные в 1920 году, мы непрерывно обогащали свой опыт и заслуживали доверие.',
    'about.whyChoose.item2.title': 'Команда высокой квалификации',
    'about.whyChoose.item2.body':
      'У нас работают ведущие врачи с учёными степенями и международным опытом.',
    'about.whyChoose.item3.title': 'Современные подходы',
    'about.whyChoose.item3.body':
      'От лапароскопической хирургии до ухода за недоношенными новорождёнными — мы применяем новейшие методы.',
    'about.whyChoose.item4.title': 'Заботливая среда',
    'about.whyChoose.item4.body':
      'Мы понимаем эмоциональное состояние пациента и поддерживаем не только физически, но и психологически.',
    'about.whyChoose.item5.title': 'Международные связи',
    'about.whyChoose.item5.body':
      'Сотрудничество с международными институтами удерживает нас на передовой науки.',
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
    'home.testimonials.title': 'PATIENT REVIEWS',
    'home.testimonials.navAria': 'Previous and next testimonial',
    'home.testimonials.prevAria': 'Previous testimonial',
    'home.testimonials.nextAria': 'Next testimonial',
    'home.testimonials.slide0.text':
      '"During pregnancy I had many questions and fears, but the experienced and caring doctors here guided me step by step and explained everything. The atmosphere was warm and comfortable. I am confident my daughter was born in the right place."',
    'home.testimonials.slide0.author': 'Sona Gasparyan',
    'home.testimonials.slide1.text':
      '"The quality of care at Beglaryan Medical Center exceeded my expectations. Even after surgery, recovery was calm and fast thanks to an experienced team."',
    'home.testimonials.slide1.author': 'Naira Chitchyan',
    'home.testimonials.slide2.text':
      '"Very delicate and respectful treatment of teenage gynecology questions. My daughter trusted the doctor without embarrassment—that mattered most to me."',
    'home.testimonials.slide2.author': 'Anahit Gabrielyan',
    'home.testimonials.slide3.text':
      '"Few places in Yerevan are this professional and well equipped. Choosing Beglaryan was the right decision."',
    'home.testimonials.slide3.author': 'Ani Hakobyan',
    'home.testimonials.slide4.text':
      '"Thank you to all Beglaryan specialists—for treatment and for a truly human approach."',
    'home.testimonials.slide4.author': 'Shogher Aleksanyan',
    'home.testimonials.slide5.text':
      '"In the second trimester complications appeared and I was very worried. My doctor stood by me at every step—I am deeply grateful. Now I am the mother of a healthy baby."',
    'home.testimonials.slide5.author': 'Ani Mnatsakanyan',
    'home.testimonials.slide6.text':
      '"My mother received professional, caring treatment at Beglaryan. Issues after menopause were resolved, and she feels like a complete woman again."',
    'home.testimonials.slide6.author': 'Zara Sargsyan',
    'home.cta.title': 'Have questions? Write to us',
    'home.cta.button': 'Send a message',
    'footer.copyright': '© 2026 All rights reserved',
    'footer.facebookAria': 'Facebook',
    'footer.instagramAria': 'Instagram',
    'feedback.mapTitle': 'Beglaryan Medical Center — map',
    'feedback.emailLabel': 'Email',
    'feedback.addressLabel': 'Address',
    'feedback.phonesLabel': 'Phone numbers',
    'feedback.addressValue': 'RA, Yerevan, 56 Abovyan St.',
    'feedback.emailValue': 'beglaryanclinic@gmail.com',
    'feedback.phoneLine1': '+374 41 28 88 10',
    'feedback.phoneLine2': '+374 55 38 88 10',
    'feedback.phoneLine3': '+374 10 56 45 19 (24/7)',
    'feedback.formNamePlaceholder': 'Full name',
    'feedback.formPhonePlaceholder': 'Phone number',
    'feedback.formEmailPlaceholder': 'Email address',
    'feedback.formMessagePlaceholder': 'Message',
    'feedback.formServicePlaceholder': 'Services',
    'feedback.formService1': 'Gynecology',
    'feedback.formService2': 'Obstetrics',
    'feedback.formService3': 'Pathology of pregnancy',
    'feedback.formService4':
      'Neonatal department, care of premature newborns',
    'feedback.formService5': 'Newborn care',
    'feedback.formService6': 'Pediatric gynecology',
    'feedback.formService7': 'Anti-aging gynecology',
    'feedback.formService8': 'Vascular surgery',
    'feedback.formService9': 'Vascular surgery, inpatient care',
    'feedback.formService10': 'Otolaryngology (ENT)',
    'feedback.formService11': 'Operating room',
    'feedback.formService12':
      'Maxillofacial and plastic surgery',
    'feedback.formService13': 'Other',
    'feedback.formMailSubject': 'Message from website',
    'notFound.message': 'Page not found.',
    'notFound.home': 'Back to home',
    'stub.message': 'This section is coming soon.',
    'about.hero.alt':
      'Operating room: surgical team during a procedure',
    'about.intro.headingLine1': 'MORE THAN 100 YEARS OF EXPERIENCE,',
    'about.intro.headingLine2': 'MODERN METHODS,',
    'about.intro.headingLine3': 'ATTENTIVE CARE',
    'about.intro.p1':
      'Beglaryan Medical Center (formerly Maternity Hospital No. 2, Family Planning and Sexual Health Center) is a modern multidisciplinary medical center that has operated since 1920 as the Republic of Armenia’s first obstetrics and gynecology inpatient facility.',
    'about.intro.p2':
      'The building was constructed to a design by Academician A. P. Tamanyan and is counted among architectural monuments. The center has a rich library, classrooms, and a 180-seat auditorium.',
    'about.intro.p3':
      'Highly qualified, experienced physicians work at Beglaryan MC. The center is named after one of the founders of the Armenian school of obstetrics and gynecology — Academician of the National Academy of Medical Sciences of Armenia, Honored Scientist, Honored Physician, Doctor of Medical Sciences, Professor Gagik Artashesi Beglaryan. For nearly three decades he led the clinic and the No. 1 Department of Obstetrics and Gynecology at YSMU. The experienced professor mastered the full scope of complex obstetric and gynecologic surgery. In 1975 he was the first in Armenia to perform diagnostic and therapeutic laparoscopy and hysteroscopy, making it possible to diagnose and treat at early stages a range of pathological processes in the abdominal organs and endometrium.',
    'about.intro.p4':
      'In 1925, on the basis of Maternity Hospital No. 2, the Department of Obstetrics and Gynecology of the Yerevan State Medical Institute was founded; it was headed in different years by renowned physician-scientists Professors G. A. Areshyan, A. M. Aharonov, B. G. Sayadyan, K. B. Akunts, and G. A. Beglaryan. From 2022 to the present, the department chair is Science Consultant of Beglaryan MC, Doctor of Medical Sciences, Professor A. G. Harutyunyan.',
    'about.intro.p5':
      'In addition to local trainees, the department teaches compatriots arriving from abroad, as well as English- and Russian-speaking students (years 4–6); professional training of obstetrician-gynecologists is organized in clinical residency. Within continuing medical education, senior and middle medical staff from maternity facilities in the capital and regions of the republic undergo retraining at the center. The medical center is also a scientific hub where research on current issues in obstetrics and gynecology is conducted and candidate and doctoral dissertations are defended.',
    'about.heritage.alt':
      'Historical photograph: physician in medical attire',
    'about.heritage.headingLine1': 'YOUR HEALTH',
    'about.heritage.headingLine2': 'IS OUR MISSION',
    'about.missionDetail.p1':
      'Our mission is to provide high-quality, comprehensive medical care by combining modern methods, decades of experience, and a caring approach. We want every patient who comes to us to find a safe, supportive environment and receive skilled professional help with warmth and respect.',
    'about.whyChoose.headingLine1': 'WHY CHOOSE US',
    'about.whyChoose.item1.title': '100+ years of experience',
    'about.whyChoose.item1.body':
      'Founded in 1920, we have continuously built on our experience and earned trust.',
    'about.whyChoose.item2.title': 'A highly qualified team',
    'about.whyChoose.item2.body':
      'Leading physicians with academic degrees and international experience work with us.',
    'about.whyChoose.item3.title': 'Modern approaches',
    'about.whyChoose.item3.body':
      'From laparoscopic surgery to care for premature newborns, we use the latest methods.',
    'about.whyChoose.item4.title': 'A caring environment',
    'about.whyChoose.item4.body':
      'We understand the patient’s emotional state and offer support not only physically but also psychologically.',
    'about.whyChoose.item5.title': 'International ties',
    'about.whyChoose.item5.body':
      'Our cooperation with international institutions keeps us at the forefront of medical science.',
    'lang.hy': 'Հայերեն',
    'lang.ru': 'Русский',
    'lang.en': 'English',
    'lang.menuAria': 'Language',
  },
}
