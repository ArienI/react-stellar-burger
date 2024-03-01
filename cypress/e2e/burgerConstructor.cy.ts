describe('Тестируем BurgerConstructor', () => {
  const bun = '[data-testid="bun"]';
  const sauce = '[data-testid="sauce"]';
  const main = '[data-testid="main"]';
  const burger = '[data-testid="burger"]';
  const orderButton = '[data-testid="orderButton"]';
  const email = '[data-testid="email"]';
  const password = '[data-testid="password"]';
  const loginButton = '[data-testid="loginButton"]';
  const modalOverlay = '[data-testid="modalOverlay"]';
  const modal = '[data-testid="modal"]';
  const modalCloseButton = '[data-testid="modalCloseButton"]';

  beforeEach(() => {
    cy.viewport(1920, 1080);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredientsResponse.json' }).as('ingredients');
    cy.intercept('POST', 'api/auth/login', { fixture: 'loginResponse.json' }).as('login');
    cy.intercept('GET', 'api/auth/user', { fixture: 'userResponse.json' }).as('getUser');
    cy.intercept('POST', 'api/orders', { fixture: 'orderResponse.json' }).as('order');
    cy.visit('/');
  });

  it('Проверяем открытие и закрытие модального окна ингредиента', () => {
    cy.get(main).first().click();
    // Проверяем открытие модального окна
    cy.get(modalOverlay).should('exist');
    cy.get(modal).should('exist')
      .should('be.visible')
      .contains('Детали ингредиента');
    cy.get(modal).contains('Биокотлета из марсианской Магнолии');
    cy.get(modal).contains(4242);
    // Проверяем закрытие модального окна
    cy.get(modalCloseButton).click();
    cy.get(modalOverlay).should('not.exist');
    cy.get(modal).should('not.exist');
  });

  it('Проверяем что кнопка оформления заказа изначально неактивна', () => {
    cy.get(orderButton).should('be.disabled');
  });

  it('Проверяем конструктор бургера', () => {
    // начинаем перетаскивать первую булочку
    cy.get(bun).first().trigger('dragstart');
    // бросаем её в бургер
    cy.get(burger).trigger('drop');
    // проверяем, что булочка добавилась
    cy.get(burger).should('contain', 'Краторная булка N-200');
    // Проверяем, что кнопка оформления заказа неактивна пока не добавлена булка и один игредиент
    cy.get(orderButton).should('be.disabled');
    // начинаем перетаскивать первый соус
    cy.get(sauce).first().trigger('dragstart');
    // бросаем его в бургер
    cy.get(burger).trigger('drop');
    // проверяем, что соус добавился
    cy.get(burger).should('contain', 'Соус Spicy-X');
    // Проверяем, что кнопка оформления заказа активна после добавления булки и ингредиента
    cy.get(orderButton).should('be.enabled');
    // Нажимаем кнопку оформления заказа
    cy.get(orderButton).click();
    // Проверяем что нас перебросило на страницу авторизации
    cy.contains('Вход');
    // Вводим тестовые логи и пароль
    cy.fixture('loginCredentials.json').then((credentials) => {
      cy.get(email).type(credentials.email);
      cy.get(password).type(credentials.password);
    });
    // Пробуем авторизоваться
    cy.get(loginButton).click();
    // Ждём ответа от сервера и проверяем ответ
    cy.fixture('loginResponse.json').then((loginResponseMock) => {
      cy.wait("@login").its('response.body').should("deep.equal", loginResponseMock);
    });
    // Проверяем что нас перебросило на страницу конструктора бургера после успешной авторизации
    cy.contains('Соберите бургер');
    // Нажимаем кнопку оформления заказа
    cy.get(orderButton).click();
    // Ждём ответа от сервера и проверяем ответ
    cy.fixture('orderResponse.json').then((orderResponseMock) => {
      cy.wait("@order").its('response.body').should("deep.equal", orderResponseMock);
    });
    // Проверяем открытие модального окна
    cy.get(modalOverlay).should('exist');
    cy.get(modal).should('exist').should('be.visible').contains(35532);
    // Проверяем закрытие модального окна
    cy.get(modalCloseButton).click();
    cy.get(modalOverlay).should('not.exist');
    cy.get(modal).should('not.exist');
  });
});
