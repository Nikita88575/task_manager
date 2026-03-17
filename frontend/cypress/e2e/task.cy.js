describe('Task Manager - Main Screen Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
    
    cy.get('input[name="username"]').type('TestUser')
    cy.get('input[name="password"]').type('test_pass')
    
    cy.get('button[type="submit"]').click()
    
    cy.get('.task-input-main').should('be.visible')
  })

  it('повинен показати помилку при спробі створити порожнє завдання', () => {
    cy.get('.task-input-main').type(' ')

    cy.get('.task-submit-btn').click()
    
    cy.contains('Task cannot be empty').should('be.visible')
  })

  it('повинен успішно створити нове завдання', () => {
    const taskName = 'Тестове завдання Cypress'
    
    cy.get('.task-input-main').type(taskName)

    cy.get('.task-submit-btn').click()
    
    cy.contains('.task-title', taskName).should('be.visible')
  })
})
