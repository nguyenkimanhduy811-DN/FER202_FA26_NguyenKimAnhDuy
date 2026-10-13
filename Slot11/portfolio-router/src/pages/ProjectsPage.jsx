import { Container, Row, Col, Card, Badge } from "react-bootstrap";
import { projects } from "../data/skillsData";

function ProjectsPage() {
  return (
    <Container className="py-5">
      <h2 className="section-title mb-4">Dự án của tôi</h2>

      <Row className="g-4">
        {projects.map((project) => (
          <Col key={project.id} md={4}>
            <Card className="project-card h-100 shadow-sm">
              <Card.Body className="d-flex flex-column">
                <Card.Title>{project.title}</Card.Title>

                <Card.Text className="text-muted">
                  {project.description}
                </Card.Text>

                <div className="mt-auto pt-2">
                  {project.technologies.map((technology) => (
                    <Badge
                      key={technology}
                      bg="primary"
                      className="me-2 mb-2"
                    >
                      {technology}
                    </Badge>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default ProjectsPage;