import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation & Common
      'nav.home': 'HOME',
      'nav.product': 'PRODUCT',
      'nav.company': 'COMPANY',
      'nav.contact': 'CONTACT',
      'nav.search': 'Search...',
      'nav.login': 'LOGIN',

      // Headers
      'header.interested': 'WHAT ARE YOU INTERESTED IN?',
      'header.partners': 'SOME OF OUR BRAND PARTNERS',
      'header.others': 'OTHERS',

      // Products
      'product.hoses.title': 'Industrial Hoses',
      'product.hoses.description': 'We provide high-quality industrial hoses made from durable materials such as rubber, plastic, and reinforced fabric, ensuring reliable performance in fluid and material transfer across various industries.',
      
      'product.transmission.title': 'Transmission',
      'product.transmission.description': 'We offer robust power transmission solutions such as belts, pulleys, chains, couplings, engineered to maximize efficiency, minimize downtime, and enhance industrial machinery performance.',

      // Footer
      'footer.newsletter': 'JOIN OUR NEWSLETTER',
      'footer.subscribe': 'SUBSCRIBE FOR UPDATES ON OUR INDUSTRIAL PRODUCTS AND EXCLUSIVE OFFERS.',
      'footer.email': 'ENTER YOUR EMAIL',
      'footer.button': 'SUBSCRIBE',
      'footer.useful': 'USEFUL LINKS',
      'footer.services': 'OUR SERVICES',
      'footer.about': 'ABOUT US',
      'footer.brand': 'OUR BRAND PARTNERS',
      'footer.contact': 'CONTACT US',
      'footer.terms': 'TERMS AND CONDITIONS',
      'footer.privacy': 'PRIVACY POLICY',

      // Carousel slides
      'carousel.slide1.title': 'Guan Yiac Hardware',
      'carousel.slide1.subtitle': 'Your Trusted Industrial Partner',
      'carousel.slide2.title': 'Engineered for Excellence',
      'carousel.slide2.subtitle': 'Built to Last',
      'carousel.slide3.title': 'Precision Tools & Solutions',
      'carousel.slide3.subtitle': 'for Every Industry',
      'carousel.slide4.title': 'Innovation in Motion',
      'carousel.slide4.subtitle': 'Reliability in Action',

      'what.interested': 'WHAT ARE YOU INTERESTED IN?',
      'brand.partners': 'SOME OF OUR BRAND PARTNERS',
      'others': 'OTHERS',
      'join.newsletter': 'JOIN OUR NEWSLETTER',
      'subscribe.text': 'SUBSCRIBE FOR UPDATES ON OUR INDUSTRIAL PRODUCTS AND EXCLUSIVE OFFERS.',
      'enter.email': 'ENTER YOUR EMAIL',
      'subscribe': 'SUBSCRIBE',
      'useful.links': 'USEFUL LINKS',
    }
  },
  zh: {
    translation: {
      // Navigation & Common
      'nav.home': '首页',
      'nav.product': '产品',
      'nav.company': '公司',
      'nav.contact': '联系我们',
      'nav.search': '搜索...',
      'nav.login': '登录',

      // Headers
      'header.interested': '您对什么感兴趣？',
      'header.partners': '我们的品牌合作伙伴',
      'header.others': '其他产品',

      // Products
      'product.hoses.title': '工业软管',
      'product.hoses.description': '我们提供由橡胶、塑料和增强织物等耐用材料制成的高质量工业软管，确保在各行业的流体和物料输送中提供可靠性能。',
      
      'product.transmission.title': '传动系统',
      'product.transmission.description': '我们提供强大的动力传输解决方案，如皮带、滑轮、链条、联轴器等，旨在最大化效率，最小化停机时间，提升工业机械性能。',

      // Footer
      'footer.newsletter': '订阅我们的通讯',
      'footer.subscribe': '订阅以获取我们的工业产品更新和独家优惠。',
      'footer.email': '输入您的邮箱',
      'footer.button': '订阅',
      'footer.useful': '实用链接',
      'footer.services': '我们的服务',
      'footer.about': '关于我们',
      'footer.brand': '品牌合作伙伴',
      'footer.contact': '联系我们',
      'footer.terms': '条款和条件',
      'footer.privacy': '隐私政策',

      // Carousel slides
      'carousel.slide1.title': '冠亚五金',
      'carousel.slide1.subtitle': '您值得信赖的工业合作伙伴',
      'carousel.slide2.title': '精工打造',
      'carousel.slide2.subtitle': '持久耐用',
      'carousel.slide3.title': '精密工具与解决方案',
      'carousel.slide3.subtitle': '适用于各个行业',
      'carousel.slide4.title': '创新驱动',
      'carousel.slide4.subtitle': '可靠行动',

      'what.interested': '您对什么感兴趣？',
      'brand.partners': '我们的品牌合作伙伴',
      'others': '其他',
      'join.newsletter': '订阅我们的通讯',
      'subscribe.text': '订阅以获取我们的工业产品更新和独家优惠',
      'enter.email': '输入您的邮箱',
      'subscribe': '订阅',
      'useful.links': '实用链接',
    }
  },
  fil: {
    translation: {
      // Navigation & Common
      'nav.home': 'PAHINA',
      'nav.product': 'PRODUKTO',
      'nav.company': 'KUMPANYA',
      'nav.contact': 'KONTAK',
      'nav.search': 'Maghanap...',
      'nav.login': 'MAG-LOGIN',

      // Headers
      'header.interested': 'ANO ANG IYONG INTERES?',
      'header.partners': 'ANG AMING MGA BRAND PARTNERS',
      'header.others': 'IBA PA',

      // Products
      'product.hoses.title': 'Mga Industrial na Hose',
      'product.hoses.description': 'Nagbibigay kami ng de-kalidad na mga industrial na hose na gawa sa matibay na materyales tulad ng goma, plastik, at pinatibay na tela, na nagtitiyak ng maaasahang pagganap sa paglipat ng likido at materyales sa iba\'t ibang industriya.',
      
      'product.transmission.title': 'Transmission',
      'product.transmission.description': 'Nag-aalok kami ng matibay na power transmission solutions tulad ng mga belt, pulley, chain, coupling, na dinisenyo upang mapahusay ang kahusayan, mabawasan ang downtime, at mapahusay ang pagganap ng mga industriyal na makinarya.',

      // Footer
      'footer.newsletter': 'SUMALI SA AMING NEWSLETTER',
      'footer.subscribe': 'MAG-SUBSCRIBE PARA SA MGA UPDATE SA AMING MGA INDUSTRIYAL NA PRODUKTO AT EKSKLUSIBONG ALOK.',
      'footer.email': 'ILAGAY ANG IYONG EMAIL',
      'footer.button': 'MAG-SUBSCRIBE',
      'footer.useful': 'MGA KAPAKI-PAKINABANG NA LINK',
      'footer.services': 'AMING MGA SERBISYO',
      'footer.about': 'TUNGKOL SA AMIN',
      'footer.brand': 'AMING MGA BRAND PARTNER',
      'footer.contact': 'MAKIPAG-UGNAYAN',
      'footer.terms': 'MGA TUNTUNIN AT KONDISYON',
      'footer.privacy': 'PATAKARAN SA PRIVACY',

      // Carousel slides
      'carousel.slide1.title': 'Guan Yiac Hardware',
      'carousel.slide1.subtitle': 'Ang Inyong Mapagkakatiwalaang Industrial Partner',
      'carousel.slide2.title': 'Mahusay na Pagkakagawa',
      'carousel.slide2.subtitle': 'Matibay at Pangmatagalan',
      'carousel.slide3.title': 'Mga Precision Tools at Solusyon',
      'carousel.slide3.subtitle': 'Para sa Bawat Industriya',
      'carousel.slide4.title': 'Inobasyon sa Kilos',
      'carousel.slide4.subtitle': 'Maaasahang Pagganap',

      'what.interested': 'ANO ANG IYONG INTERES?',
      'brand.partners': 'ANG AMING MGA BRAND PARTNERS',
      'others': 'IBA PA',
      'join.newsletter': 'SUMALI SA AMING NEWSLETTER',
      'subscribe.text': 'MAG-SUBSCRIBE PARA SA MGA UPDATE SA AMING MGA PRODUKTO AT EKSKLUSIBONG ALOK',
      'enter.email': 'ILAGAY ANG IYONG EMAIL',
      'subscribe': 'MAG-SUBSCRIBE',
      'useful.links': 'MGA KAPAKI-PAKINABANG NA LINK',
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage']
    }
  });

export default i18n;
