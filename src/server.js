import { createServer, Response } from 'miragejs';

createServer({
  routes() {
    this.namespace = 'api';

    let users = [
      { usn: '21BTRIS040', password: 'shai' },
      { usn: '21BTRIS022', password: 'moulya' },
      { usn: '21BTRIS034', password: 'swaroop' },
      { usn: '21BTRIS016', password: 'ishra' },
      { usn: '21BTRIS028', password: 'pratham' }
    ];

    let students = [
      {
        usn: '21BTRIS040',
        name: 'Shai',
        studentCode: '21BTRIS040',
        semester: '6th sem',
        branchCode: 'IS',
        dob: '01/01/2004',
        parentsName: 'Syed Fariddudin',
        parentsMobile: '1234567890',
        branch: 'Information Science and Engineering',
        email: 'shai@example.com',
        mobile: '9876543210',
        aadhaar: '123412341234',
        hobbies: 'Music, Sports',
        address: '5678 Secondary St, Othertown, IN'
      },
      {
        usn: '21BTRIS022',
        name: 'Moulya R',
        studentCode: '21BTRIS022',
        semester: '6th sem',
        branchCode: 'IS',
        dob: '02/02/2004',
        parentsName: 'Ravi R',
        parentsMobile: '2728818272677',
        branch: 'Information Science and Engineering',
        email: 'moulya@gmail.com',
        mobile: '1234567890',
        aadhaar: '515529709994',
        hobbies: 'Reading, Coding',
        address: '1234 Main St, Anytown, IN'
      },
      {
        usn: '21BTRIS034',
        name: 'Swaroop',
        studentCode: '21BTRIS034',
        semester: '6th sem',
        branchCode: 'CS',
        dob: '03/03/2004',
        parentsName: 'Richard Roe - Rebecca Roe',
        parentsMobile: '2345678901',
        branch: 'CSE',
        email: 'swarooproe@example.com',
        mobile: '8765432109',
        aadhaar: '234523452345',
        hobbies: 'Painting, Hiking',
        address: '9101 North St, Anothertown, IN'
      },
      {
        usn: '21BTRIS016',
        name: 'Ishra',
        studentCode: '21BTRIS016',
        semester: '6th sem',
        branchCode: 'ME',
        dob: '04/04/2004',
        parentsName: 'Michael Smith - Michelle Smith',
        parentsMobile: '3456789012',
        branch: 'Mechanical Engineering',
        email: 'ishrasmith@example.com',
        mobile: '7654321098',
        aadhaar: '345634563456',
        hobbies: 'Drawing, Swimming',
        address: '1123 South St, Newtown, IN'
      },
      {
        usn: '21BTRIS028',
        name: 'Pratham',
        studentCode: '21BTRIS028',
        semester: '6th sem',
        branchCode: 'EE',
        dob: '05/05/2004',
        parentsName: 'Charles Brown - Charlotte Brown',
        parentsMobile: '4567890123',
        branch: 'Electrical Engineering',
        email: 'prathambrown@example.com',
        mobile: '6543210987',
        aadhaar: '456745674567',
        hobbies: 'Gaming, Traveling',
        address: '1324 East St, Yetanothertown, IN'
      }
    ];let journals = [];

    this.post('/login', (schema, request) => {
      let attrs = JSON.parse(request.requestBody);
      let user = users.find(user => user.usn === attrs.usn && user.password === attrs.password);

      if (user) {
        return { token: user.usn }; // Use the user's USN as the token
      } else {
        return new Response(401, {}, { error: 'Invalid credentials' });
      }
    });

    this.get('/student-info', (schema, request) => {
      let token = request.requestHeaders.Authorization;
      if (token && token.startsWith('Bearer ')) {
        let authToken = token.split(' ')[1]; // Extract token from "Bearer <token>"
        let user = users.find(user => user.usn === authToken); // Find user by token (usn)

        if (user) {
          let student = students.find(student => student.usn === user.usn);
          if (student) {
            return student;
          } else {
            return new Response(404, {}, { error: 'Student data not found' });
          }
        } else {
          return new Response(401, {}, { error: 'Unauthorized' });
        }
      } else {
        return new Response(401, {}, { error: 'Unauthorized' });
      }
    });

    this.post('/upload-journal', (schema, request) => {
      let token = request.requestHeaders.Authorization;
      if (token && token.startsWith('Bearer ')) {
        let authToken = token.split(' ')[1]; // Extract token from "Bearer <token>"
        let user = users.find(user => user.usn === authToken); // Find user by token (usn)

        if (user) {
          try {
            let journal = request.requestBody;
            let fileName = journal.get('file').name; // Get the file name
            let fileUrl = URL.createObjectURL(journal.get('file')); // Create a blob URL
            journals.push({ id: journals.length + 1, name: fileName, url: fileUrl, usn: user.usn });
            return new Response(201, {}, { message: 'Upload successful' });
          } catch (error) {
            return new Response(500, {}, { error: 'Error processing upload' });
          }
        } else {
          return new Response(401, {}, { error: 'Unauthorized' });
        }
      } else {
        return new Response(401, {}, { error: 'Unauthorized' });
      }
    });

    this.get('/journals', (schema, request) => {
      let token = request.requestHeaders.Authorization;
      if (token && token.startsWith('Bearer ')) {
        let authToken = token.split(' ')[1]; // Extract token from "Bearer <token>"
        let user = users.find(user => user.usn === authToken); // Find user by token (usn)

        if (user) {
          let userJournals = journals.filter(journal => journal.usn === user.usn); // Filter journals by user's USN
          return userJournals;
        } else {
          return new Response(401, {}, { error: 'Unauthorized' });
        }
      } else {
        return new Response(401, {}, { error: 'Unauthorized' });
      }
    });

    this.delete('/delete-journal/:id', (schema, request) => {
      let token = request.requestHeaders.Authorization;
      if (token && token.startsWith('Bearer ')) {
        let authToken = token.split(' ')[1]; // Extract token from "Bearer <token>"
        let user = users.find(user => user.usn === authToken); // Find user by token (usn)

        if (user) {
          let journalId = request.params.id;
          journals = journals.filter(journal => journal.id !== parseInt(journalId) || journal.usn !== user.usn); // Delete the journal if it belongs to the user
          return new Response(200, {}, { message: 'Journal deleted successfully' });
        } else {
          return new Response(401, {}, { error: 'Unauthorized' });
        }
      } else {
        return new Response(401, {}, { error: 'Unauthorized' });
      }
    });
  },
});