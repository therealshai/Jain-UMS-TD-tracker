import { createServer, Response } from 'miragejs';

let users = [
  { id: 1, username: 'user1', password: 'password1', token: 'fake-jwt-token-1' },
  { id: 2, username: 'user2', password: 'password2', token: 'fake-jwt-token-2' },
  // Add more users as needed
];

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,
    routes() {
      this.namespace = '/api';

      this.post('/login', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        let { username, password } = attrs;
        let user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
          return {
            token: user.token,
            usn: user.username,
          };
        } else {
          return new Response(401, {}, { error: 'Unauthorized' });
        }
      });

      this.get('/student-info', (schema, request) => {
        let token = request.requestHeaders.Authorization.replace('Bearer ', '');
        let user = users.find(u => u.token === token);
        
        if (user) {
          return {
            name: 'John Doe', // Replace with actual student data retrieval logic
            studentCode: '123456',
            semester: '5',
            branchCode: 'CSE',
            dob: '1998-01-01',
            parentsName: 'Jane Doe',
            parentsMobile: '1234567890',
            branch: 'Computer Science',
            email: 'john.doe@example.com',
            mobile: '9876543210',
            aadhaar: '1234 5678 9012',
            hobbies: 'Reading, Coding',
            address: '123, Main Street, City',
          };
        } else {
          return new Response(401, {}, { error: 'Unauthorized' });
        }
      });
    },
  });

  return server;
}
