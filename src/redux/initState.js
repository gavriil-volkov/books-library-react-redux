const initState = () => {
  const init = {
    books: [{
      title: 'Квартира в Париже',
      author: 'Гийом Мюссо',
      numberOfPages: '300',
      publishingHouse: 'Эксмо',
      year: 2017,
      img: 'https://cv4.litres.ru/pub/c/elektronnaya-kniga/cover_330/27063340-giyom-musso-kvartira-v-parizhe.jpg',
      id: '11a12d'
    }, {
      title: 'Дурная кровь',
      author: 'Роберт Гэлбрейт',
      numberOfPages: '1100',
      publishingHouse: 'Азбука-Аттикус',
      year: 2020,
      img: 'https://cv6.litres.ru/pub/c/elektronnaya-kniga/cover_415/63439561-robert-gelbreyt-durnaya-krov.jpg',
      id: '131a12d'
    }, {
      title: 'Вторая жизнь Уве',
      author: 'Фредрик Бакман',
      numberOfPages: '330',
      publishingHouse: 'Синдбад',
      year: 2012,
      img: 'https://cv8.litres.ru/pub/c/elektronnaya-kniga/cover_415/20690188-fredrik-bakman-vtoraya-zhizn-uve.jpg',
      id: '11a12dd'
    }, {
      title: 'Тревожные люди',
      author: 'Фредрик Бакман',
      numberOfPages: '300',
      publishingHouse: 'Синдбад',
      year: 2019,
      img: 'https://cv9.litres.ru/pub/c/elektronnaya-kniga/cover_415/63028197-fredrik-bakman-trevozhnye-ludi.jpg',
      id: '11a3312dd'
    }, {
      title: 'Убийство в «Восточном экспрессе»',
      author: 'Агата Кристи',
      numberOfPages: '220',
      publishingHouse: 'Эскмо',
      year: 1934,
      img: 'https://cv3.litres.ru/pub/c/elektronnaya-kniga/cover_415/18922333-agata-kristi-ubiystvo-v-vostochnom-ekspresse-18922333.jpg',
      id: '11a3s312dd'
    },]
  }
  return JSON.parse(localStorage.getItem('store')) || init
}

export default initState
