const casual = require('casual');
const fs = require('fs');

const generateClients = (count) => {
  const clients = [];

  for (let i = 0; i < count; i++) {
    const client = {
      email: casual.email,
      password: casual.password,
      role: 'client',
      managerID: casual.integer({ min: 1, max: 10 }), // Пример значения ID менеджера
      managerKey: casual.uuid, // Пример UUID
      status: 'new', // Пример статуса
    };

    clients.push(client);
  }

  return clients;
};

const clientsData = generateClients(500);

// Сохраняем сгенерированные данные в файл
fs.writeFileSync('clientsData.json', JSON.stringify(clientsData, null, 2));

console.log('Data generated and saved to clientsData.json');
