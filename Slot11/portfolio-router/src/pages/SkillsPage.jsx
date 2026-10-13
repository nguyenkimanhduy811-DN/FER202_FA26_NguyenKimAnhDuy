import { Container, ListGroup, Badge } from "react-bootstrap";
import { skills } from "../data/skillsData";

function SkillsPage() {
  return (
    <Container className="py-5">
      <h2 className="section-title mb-4">Kỹ năng của tôi</h2>

      <ListGroup>
        {skills.map((skill) => (
          <ListGroup.Item
            key={skill.id}
            className="d-flex justify-content-between align-items-center"
          >
            <span>{skill.name}</span>

            <Badge bg="primary" pill>
              {skill.level}
            </Badge>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}

export default SkillsPage;