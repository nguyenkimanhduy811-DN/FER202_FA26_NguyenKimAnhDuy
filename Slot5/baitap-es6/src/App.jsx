import StudentCard from './components/StudentCard';
import 'bootstrap/dist/css/bootstrap.min.css';

const student1 = {
  id: 'SE1701',
  name: 'Nguyễn Kim Anh Duy',
  major: 'Software Engineering',
  gpa: 4.0,
  avatar: 'https://i.pravatar.cc/200?img=12',
  contact: {
    email: 'nguyenkimanhduy811@gmail.com',
    phone: '0796683340'
  }
};

const student2 = {
  id: 'SE1702',
  name: 'Trần Minh Anh',
  major: 'Software Engineering',
  gpa: 3.6,
  avatar: 'https://i.pravatar.cc/200?img=32',
  contact: {
    email: 'tranminhanh@example.com',
    phone: '0901 234 568'
  }
};

const student3 = {
  id: 'SE1703',
  name: 'Lê Hoàng Nam',
  major: 'Information Technology',
  gpa: 3.8,
  avatar: 'https://i.pravatar.cc/200?img=51',
  contact: {
    email: 'lehoangnam@example.com',
    phone: '0901 234 569'
  }
};

function App() {
  return (
    <div className="container my-4">
      <h1 className="mb-4">Student Cards</h1>

      <div className="d-flex gap-3 flex-wrap">
        <StudentCard student={student1} />
        <StudentCard student={student2} />
        <StudentCard student={student3} />
      </div>
    </div>
  );
}

export default App;