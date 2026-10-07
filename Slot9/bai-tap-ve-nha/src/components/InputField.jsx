import Form from 'react-bootstrap/Form';

function InputField({
  label,
  helpText,
  error,
  ...inputProps
}) {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>

      <Form.Control
        {...inputProps}
        isInvalid={Boolean(error)}
      />

      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>

      {!error && helpText && (
        <Form.Text className="text-muted">
          {helpText}
        </Form.Text>
      )}
    </Form.Group>
  );
}

export default InputField;