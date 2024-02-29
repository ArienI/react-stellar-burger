export const bun = {
  _id: '643d69a5c3f7b9001cfa093c',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
  amount: 0
};

export const sauce = {
  _id: '643d69a5c3f7b9001cfa0942',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
  amount: 0
};

export const sauce2 = {
  _id: '643d69a5c3f7b9001cfa0943',
  name: 'Соус фирменный Space Sauce',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
  __v: 0,
  amount: 0
};

export const main = {
  _id: '643d69a5c3f7b9001cfa0941',
  name: 'Биокотлета из марсианской Магнолии',
  type: 'main',
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: 'https://code.s3.yandex.net/react/code/meat-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
  __v: 0,
  amount: 0
};

export const main2 = {
  _id: '643d69a5c3f7b9001cfa093e',
  name: 'Филе Люминесцентного тетраодонтимформа',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
  __v: 0,
  amount: 0
};

export const mockBurger = [sauce, main, main2];

export const mockOrder = {
  success: true,
  name: "Space флюоресцентный spicy традиционный-галактический бургер",
  order: {
    number: 8133
  }
};

export const user = {
  email: 'user@example.com',
  name: 'Test User'
};

export const newUser = {
  email: 'newuser@example.com',
  name: 'New User'
};

export const websocketMessageMock = {
  "success": true,
  "orders":
    [
      {
        "_id": "65e0ff9697ede0001d05f02e",
        "ingredients":
          [
            "643d69a5c3f7b9001cfa093c",
            "643d69a5c3f7b9001cfa0941"
          ],
        "status": "pending",
        "name": "Краторный био-марсианский бургер",
        "createdAt": "2024-02-29T22:05:10.800Z",
        "updatedAt": "2024-02-29T22:05:10.997Z",
        "number": 35518
      }
      ,
      {
        "_id": "65e0fbd197ede0001d05f028",
        "ingredients": [
          "643d69a5c3f7b9001cfa093c",
          "643d69a5c3f7b9001cfa0943",
          "643d69a5c3f7b9001cfa0942",
          "643d69a5c3f7b9001cfa0941"
        ],
        "status": "done",
        "name": "Краторный space spicy био-марсианский бургер",
        "createdAt": "2024-02-29T21:49:05.005Z",
        "updatedAt": "2024-02-29T21:49:05.578Z",
        "number": 35517
      }
    ],
  "total": 35144,
  "totalToday": 64
}
