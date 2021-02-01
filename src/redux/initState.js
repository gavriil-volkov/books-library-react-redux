const initState = () => {
  const init = {
    typeOfSort: '',
    colors: [{
      byTitle: 'btn btn-outline-primary me-3 mb-3 btn-sm',
      byDate: 'btn btn-outline-primary me-3 mb-3 btn-sm',
    }],
    books: [{
      title: 'Квартира в Париже',
      authors:
        [{
          authorName: 'Гийом',
          authorSurname: 'Мюссо'
        }],
      numberOfPages: '300',
      publishingHouse: 'Эксмо',
      publicationYear: 2017,
      releaseDate: '2003-01-01',
      img: 'https://cv4.litres.ru/pub/c/elektronnaya-kniga/cover_330/27063340-giyom-musso-kvartira-v-parizhe.jpg',
      id: '11a12d',
      isbn: '2266111566'
    }, {
      title: 'Дурная кровь',
      authors:
        [{
          authorName: 'Роберт',
          authorSurname: 'Гэлбрейт'
        }],
      numberOfPages: '1100',
      publishingHouse: 'Азбука-Аттикус',
      publicationYear: 2020,
      releaseDate: '1999-01-01',
      img: 'https://cv6.litres.ru/pub/c/elektronnaya-kniga/cover_415/63439561-robert-gelbreyt-durnaya-krov.jpg',
      id: '131a12d',
      isbn: '1262111236'
    }, {
      title: 'Вторая жизнь Уве',
      authors:
        [{
          authorName: 'Фредрик',
          authorSurname: 'Бакман'
        }],
      numberOfPages: '330',
      publishingHouse: 'Синдбад',
      publicationYear: 2012,
      releaseDate: '2015-01-01',
      img: 'https://cv8.litres.ru/pub/c/elektronnaya-kniga/cover_415/20690188-fredrik-bakman-vtoraya-zhizn-uve.jpg',
      id: '11a12dd',
      isbn: '2266111566'
    }, {
      title: 'Тревожные люди',
      authors:
        [{
          authorName: 'Фредрик',
          authorSurname: 'Бакман'
        }],
      numberOfPages: '300',
      publishingHouse: 'Синдбад',
      publicationYear: 2019,
      releaseDate: '2017-01-01',
      img: 'https://cv9.litres.ru/pub/c/elektronnaya-kniga/cover_415/63028197-fredrik-bakman-trevozhnye-ludi.jpg',
      id: '11a3312dd',
      isbn: '2266111566'
    }, {
      title: 'Убийство в «Восточном экспрессе»',
      authors:
        [{
          authorName: 'Агата',
          authorSurname: 'Кристи'
        }],
      numberOfPages: '220',
      publishingHouse: 'Эскмо',
      publicationYear: 1934,
      releaseDate: '1934-01-01',
      img: 'https://cv3.litres.ru/pub/c/elektronnaya-kniga/cover_415/18922333-agata-kristi-ubiystvo-v-vostochnom-ekspresse-18922333.jpg',
      id: '11a3s312dd',
      isbn: '2266111566'
    }]
  }
  return JSON.parse(localStorage.getItem('store')) || init
}

export default initState
