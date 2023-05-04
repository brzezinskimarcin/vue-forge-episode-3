/// <reference types="cypress" />

describe('example to-do app', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000')
  });

  it('opens the chat box when clicking on the chat icon in the bottom right-hand corner', () => {
    cy.get(`[data-testid="chat-box"]`).should('not.exist');
    cy.get('[data-testid="open-chat-button"]').click();
    cy.get(`[data-testid="chat-box"]`).should('exist');
  });

  it('sends a message to the chatbot when typing in the chat box input and pressing enter', () => {
    const prompt = 'What is social media post generator?';
    cy.get('[data-testid="open-chat-button"]').click();
    cy.intercept('POST', '/api/ai', { fixture: 'ai.json' });
    cy.get('[data-testid="chat-input"]').type(`${prompt}{enter}`);
    cy
      .get('[data-testid="chat-message"]:nth-of-type(1) [data-testid="chat-message-text"]')
      .should("contain.text", prompt);
  });

  it('displays the chatbot response correctly in the chatbox', async () => {
    const chatAnswer = (await cy.fixture('ai.json')).choices[0].message.content;
    cy.get('[data-testid="open-chat-button"]').click();
    cy.intercept('POST', '/api/ai', { fixture: 'ai.json' });
    cy.get('[data-testid="chat-input"]').type(`What is social media post generator?{enter}`);
    cy
      .get('[data-testid="chat-message"]:nth-of-type(2) [data-testid="chat-message-text"]')
      .should("contain.text", chatAnswer);
  });
});
