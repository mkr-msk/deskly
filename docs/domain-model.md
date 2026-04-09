# Domain Model — Deskly

## 1. Обзор
Система Deskly построена вокруг заявок (tickets), которые создаются пользователями и обрабатываются исполнителями.

## 2. Сущности

### 2.1 User
Пользователь системы.

Поля:
- id
- email
- passwordHash
- role (USER | AGENT | ADMIN)
- createdAt

Описание:
Используется для аутентификации и авторизации.
Роль определяет доступ к функциям системы.

---

### 2.2 Ticket
Заявка.

Поля:
- id
- title
- description
- status (OPEN | IN_PROGRESS | DONE)
- priority (LOW | MEDIUM | HIGH)
- authorId (User)
- assignedToId (User, nullable)
- createdAt
- updatedAt

Описание:
Основная сущность системы.
Содержит информацию о заявке, её статусе и назначенном исполнителе.

---

### 2.3 Comment
Комментарий к заявке.

Поля:
- id
- content
- ticketId (Ticket)
- authorId (User)
- createdAt

Описание:
Используется для обсуждения заявки между пользователями и исполнителями.

---

## 3. Связи между сущностями

- User → Ticket (author)
  Один пользователь может создать много заявок.

- User → Ticket (assignedTo)
  Один пользователь (исполнитель) может быть назначен на много заявок.

- Ticket → Comment
  Одна заявка может иметь много комментариев.

- User → Comment
  Один пользователь может оставить много комментариев.

---

## 4. Перечисления (Enums)

### Role
- USER
- AGENT
- ADMIN

### TicketStatus
- OPEN
- IN_PROGRESS
- DONE

### Priority
- LOW
- MEDIUM
- HIGH
