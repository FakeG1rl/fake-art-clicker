export const upgrade = [
  {
    title: 'Titile',
    cost: 50,
    modifier: 0.1,
    prop: 'factor',
    text: 'Увеличивает стоимость продажи копий на 10%',
    requirement: ['totalMoneys', 30],
    isOpen: false,
    itPurchased: false
  },
  {
    title: 'Счастливый четвертак',
    cost: 100,
    modifier: 2,
    prop: 'luck',
    text: 'Увеличивает удачу',
    requirement: ['totalPainting', 100],
    isOpen: false,
    itPurchased: false
  },
  {
    title: 'title2',
    cost: 600,
    modifier: 10,
    prop: 'students',
    text: 'Увеличивает вместительность студии',
    requirement: ['totalPainting', 10000],
    isOpen: false,
    itPurchased: false
  },
  {
    title: 'title3',
    cost: 1000,
    modifier: 0.5,
    prop: 'dealer',
    text: 'Уменьшает скорость продажи диллеров',
    requirement: ['totalSales', 5000],
    isOpen: false,
    itPurchased: false
  },
  {
    title: 'Автоматический кнут',
    cost: 1000,
    modifier: 2,
    prop: 'offline',
    text:
      'Ваши работники меньше леняться и пока вас нет скорость продажи и рисования увеличивается вдвое',
    requirement: ['totalSales', 10000],
    isOpen: false,
    itPurchased: false
  },
  {
    title: 'Пустая комната',
    cost: 1500000,
    modifier: 1,
    prop: 'gallery',
    text: 'Дает возможность открыть еще одну экспозицию',
    requirement: ['totalMoneys', 1000000],
    isOpen: false,
    itPurchased: false
  }
]
//при 30$ появление улучшения увеличивающего фактор прожажи на 10%
