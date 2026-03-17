describe('Task Manager - Main Screen Flow', () => {
  // Эта функция запускается ПЕРЕД каждым тестом (it)
  beforeEach(() => {
    // 1. Открываем наше приложение (убедись, что npm run dev запущен!)
    cy.visit('http://localhost:5173/')
    
    // 2. Cypress сам найдет инпуты и введет текст
    cy.get('input[name="username"]').type('TestUser')
    cy.get('input[name="password"]').type('test_pass')
    
    // 3. Кликаем кнопку входа
    cy.get('button[type="submit"]').click()
    
    // 4. Ждем, пока отрендерится инпут для ввода задач (значит мы вошли)
    cy.get('.task-input-main').should('be.visible')
  })

  // ТЕСТ 1: Проверка на пустую строку
  it('повинен показати помилку при спробі створити порожнє завдання', () => {
    cy.get('.task-input-main').type(' ')

    // Просто кликаем добавить, ничего не вводя
    cy.get('.task-submit-btn').click()
    
    // Проверяем, что на экране появился текст ошибки
    cy.contains('Task cannot be empty').should('be.visible')
  })

  // ТЕСТ 2: Успешное создание
  it('повинен успішно створити нове завдання', () => {
    const taskName = 'Тестове завдання Cypress'
    
    // Вводим текст
    cy.get('.task-input-main').type(taskName)
    // Кликаем добавить
    cy.get('.task-submit-btn').click()
    
    // Проверяем, что созданная задача появилась в списке
    cy.contains('.task-title', taskName).should('be.visible')
  })
})